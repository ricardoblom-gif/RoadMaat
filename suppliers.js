(() => {
  const data = (window.SUPPLIERS || []).map(([name, code, phone, street, zip, city, region, country]) => ({
    name, code, phone, street, zip, city, region, country,
    hay: `${name} ${code} ${phone} ${street} ${zip} ${city} ${region} ${country}`.toLocaleLowerCase("nl-NL"),
  }));
  const form = document.getElementById("supplier-search");
  const query = document.getElementById("supplier-query");
  const countrySelect = document.getElementById("supplier-country");
  const list = document.getElementById("supplier-results");
  const count = document.getElementById("supplier-count");
  const more = document.getElementById("supplier-more");
  if (!form || !query || !countrySelect || !list || !count || !more) return;

  const stop = new Set(["zoek", "een", "voor", "naar", "in", "de", "het", "ik", "met", "bij", "op", "te"]);
  const PAGE = 50;
  let matches = [];
  let shown = 0;

  [...new Set(data.map((s) => s.country).filter(Boolean))].sort((a, b) => a.localeCompare(b, "nl")).forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.append(option);
  });

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  function card(s) {
    const row = el("article", "sup-card");
    const head = el("div", "sup-head");
    head.append(el("b", "", s.name));
    if (s.code) head.append(el("span", "sup-code", `#${s.code}`));
    const place = [s.zip, s.city].filter(Boolean).join(" ");
    const where = el("p", "sup-where");
    where.append(el("span", "", s.street || "—"));
    where.append(el("span", "", [place, s.region].filter(Boolean).join(" · ")));
    if (s.country) where.append(el("span", "sup-country", s.country));
    const actions = el("div", "sup-actions");
    if (s.phone) {
      const tel = el("a", "", `☎ ${s.phone}`);
      tel.href = `tel:${s.phone.replace(/[^\d+]/g, "")}`;
      actions.append(tel);
    }
    const mapQuery = [s.name, s.street, s.zip, s.city, s.country].filter(Boolean).join(", ");
    const map = el("a", "", "◉ Kaart");
    map.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
    map.target = "_blank";
    map.rel = "noreferrer";
    actions.append(map);
    row.append(head, where, actions);
    return row;
  }

  function showMore() {
    const frag = document.createDocumentFragment();
    matches.slice(shown, shown + PAGE).forEach((s) => frag.append(card(s)));
    list.append(frag);
    shown = Math.min(shown + PAGE, matches.length);
    more.hidden = shown >= matches.length;
    more.textContent = `Toon meer (${matches.length - shown} resterend)`;
  }

  function run() {
    const terms = query.value.toLocaleLowerCase("nl-NL").split(/[^\p{L}\p{N}-]+/u).filter((t) => t && !stop.has(t));
    const country = countrySelect.value;
    matches = data.filter((s) => (!country || s.country === country) && terms.every((t) => s.hay.includes(t)));
    list.replaceChildren();
    shown = 0;
    count.textContent = `${matches.length} van ${data.length} leveranciers`;
    if (!matches.length) {
      list.append(el("div", "empty-state", "Geen leveranciers gevonden. Probeer een andere plaats of naam."));
      more.hidden = true;
      return;
    }
    showMore();
  }

  form.addEventListener("submit", (event) => { event.preventDefault(); run(); });
  query.addEventListener("input", run);
  countrySelect.addEventListener("change", run);
  more.addEventListener("click", showMore);
  document.querySelectorAll("[data-sup-view]").forEach((button) => {
    button.addEventListener("click", () => {
      list.classList.toggle("as-list", button.dataset.supView === "list");
      document.querySelectorAll("[data-sup-view]").forEach((b) => b.classList.toggle("active", b === button));
    });
  });
  run();
})();
