(() => {
  const form = document.getElementById("rdw-search");
  const input = document.getElementById("rdw-plate");
  const result = document.getElementById("rdw-result");
  if (!(form instanceof HTMLFormElement) || !(input instanceof HTMLInputElement) || !(result instanceof HTMLElement)) return;

  const formatDate = (value) => value && /^\d{8}$/.test(value)
    ? `${value.slice(6, 8)}-${value.slice(4, 6)}-${value.slice(0, 4)}` : "Niet beschikbaar";
  const formatWeight = (value) => value ? `${Number(value).toLocaleString("nl-NL")} kg` : "Niet beschikbaar";

  function closeResult() {
    result.hidden = true;
    result.replaceChildren();
    input.value = "";
    input.focus();
  }

  function showMessage(className, text) {
    result.hidden = false;
    result.className = `rdw-result ${className}`.trim();
    result.textContent = text;
  }

  function renderVehicle(plate, vehicle, axles) {
    const facts = [
      ["Merk", [vehicle.merk, vehicle.handelsbenaming].filter(Boolean).join(" ") || "Niet beschikbaar"],
      ["Vervaldatum APK", formatDate(vehicle.vervaldatum_apk)],
      ["Vervaldatum tachograaf", formatDate(vehicle.vervaldatum_tachograaf)],
      ["Eerste tenaamstelling in Nederland", formatDate(vehicle.datum_eerste_tenaamstelling_in_nederland)],
      ["Laatste tenaamstelling", formatDate(vehicle.datum_tenaamstelling)],
      ["Massa rijklaar", formatWeight(vehicle.massa_rijklaar)],
      ["Aantal assen", axles.length ? String(axles.length) : "Niet beschikbaar"],
      ["Aantal wielen", vehicle.aantal_wielen || "Niet beschikbaar"],
    ];
    const header = document.createElement("div");
    header.className = "rdw-result-header";
    const title = document.createElement("div");
    const kind = document.createElement("small");
    const heading = document.createElement("b");
    kind.textContent = vehicle.voertuigsoort ?? "Voertuig";
    heading.textContent = plate.replace(/^(.{2})(.{2})(.{2})$/, "$1-$2-$3");
    title.append(kind, heading);
    const oviLink = document.createElement("a");
    oviLink.href = "https://ovi.rdw.nl/";
    oviLink.target = "_blank";
    oviLink.rel = "noreferrer";
    oviLink.textContent = "Bekijk in RDW OVI ↗";
    const close = document.createElement("button");
    close.type = "button";
    close.className = "rdw-close";
    close.setAttribute("aria-label", "Sluit voertuiggegevens");
    close.title = "Sluiten";
    close.textContent = "×";
    close.addEventListener("click", closeResult);
    header.append(title, oviLink, close);

    const list = document.createElement("dl");
    list.className = "rdw-facts";
    facts.forEach(([label, value]) => {
      const item = document.createElement("div");
      const term = document.createElement("dt");
      const detail = document.createElement("dd");
      term.textContent = label;
      detail.textContent = value;
      item.append(term, detail);
      list.append(item);
    });
    const source = document.createElement("small");
    source.className = "rdw-source";
    source.textContent = "Bron: Open Data RDW · gegevens kunnen afwijken van OVI.";
    result.replaceChildren(header, list, source);
    result.className = "rdw-result";
    result.hidden = false;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const plate = input.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!/^[A-Z0-9]{6}$/.test(plate)) {
      showMessage("error", "Vul een Nederlands kenteken in (6 letters en/of cijfers).");
      input.focus();
      return;
    }

    const submit = form.querySelector("button[type=submit]");
    submit.disabled = true;
    submit.setAttribute("aria-label", "Kenteken wordt opgezocht");
    showMessage("loading", "Voertuiggegevens ophalen bij RDW…");
    try {
      const [response, axleResponse] = await Promise.all([
        fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${encodeURIComponent(plate)}&$limit=1`),
        fetch(`https://opendata.rdw.nl/resource/3huj-srit.json?kenteken=${encodeURIComponent(plate)}`).catch(() => null),
      ]);
      if (!response.ok) throw new Error("RDW zoekdienst is tijdelijk niet bereikbaar.");
      const vehicles = await response.json();
      const axles = axleResponse && axleResponse.ok ? await axleResponse.json() : [];
      if (!vehicles.length) showMessage("error", "Geen voertuig gevonden. Controleer het kenteken en probeer opnieuw.");
      else renderVehicle(plate, vehicles[0], axles);
    } catch (error) {
      showMessage("error", error instanceof Error ? error.message : "RDW zoekdienst is tijdelijk niet bereikbaar.");
    } finally {
      submit.disabled = false;
      submit.setAttribute("aria-label", "Zoek kenteken");
    }
  });
})();