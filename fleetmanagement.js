document.addEventListener("DOMContentLoaded", () => {
  const categories = [
    "DAF", "Scania", "Mercedes", "MAN", "Iveco", "Banden locaties",
    "Tank locaties", "Carrier", "Werkplaatsen", "Ultimo",
  ];
  const categoryIcons = ["D", "S", "M", "M", "I", "◉", "⛽", "C", "⚒", "U"];
  const brandLogoUrls = {
    DAF: "https://www.daf.com/-/media/images/daf-global-cross-sites/logos/daf-logo.svg?h=320&w=320",
    Scania: "https://www.scania.com/etc.clientlibs/scania-clientlibs/clientlibs/clientlib-site/resources/favicon/favicon.svg?v=2",
    Mercedes: "https://www.mercedes-benz-trucks.com/etc.clientlibs/brandhub/clientlibs/clientlib-site/resources/images/svgs/MB-trucks-logo.svg",
    MAN: "https://www.man.eu/etc.clientlibs/man-aem/clientlibs/commons/resources/favicon.ico",
    Iveco: "https://www.iveco.com/favicon.ico",
    Carrier: "https://brandportal.carrier.com/m/99b434eac013f6f/webimage-carrier_logo_rgb.png",
    Ultimo: "https://www.ultimo.com/build/assets/ultimo_nav_logo-Co9ExjYZ.svg",
  };
  const sampleLocations = {
    "DAF": [{ name: "Demo DAF servicepunt", address: "Voorbeeldstraat 10, Utrecht" }],
    "Scania": [{ name: "Voorbeeld Scania werkplaats", address: "Demoweg 2, Zwolle" }],
    "Mercedes": [],
    "MAN": [],
    "Iveco": [],
    "Banden locaties": [{ name: "Demo bandenservice Limburg", address: "Voorbeeldlaan 4, Venlo" }],
    "Tank locaties": [],
    "Carrier": [],
    "Werkplaatsen": [{ name: "Demo werkplaats Noord", address: "Testweg 1, Assen" }],
    "Ultimo": [],
  };
  const chats = [
    [
      { text: "Goedemorgen, weet iemand waar ik vandaag kan tanken?", time: "09:41", outgoing: false },
      { text: "Kijk in RoadMap bij Tank locaties.", time: "09:42", outgoing: true },
    ],
    [
      { text: "Is er een werkplaats in de buurt?", time: "08:12", outgoing: false },
      { text: "Bedankt voor de tip!", time: "08:15", outgoing: false },
    ],
  ];
  let activeCategory = categories[0];
  let activeChat = 0;
  const views = [...document.querySelectorAll("[data-panel]")];
  const navButtons = [...document.querySelectorAll("[data-view]")];
  const title = document.getElementById("current-title");
  const toast = document.getElementById("toast");
  let toastTimer;
  const viewTitles = {
    roadmap: "RoadMap",
    maps: "Google Maps",
    suppliers: "Leveranciers",
    whatsapp: "WhatsApp",
    admin: "Beheer demo",
  };

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3200);
  }

  function openView(view) {
    const selected = views.find((panel) => panel.dataset.panel === view);
    if (!selected) return;
    views.forEach((panel) => {
      panel.hidden = panel !== selected;
      panel.classList.toggle("active", panel === selected);
    });
    navButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === view));
    if (title) title.textContent = viewTitles[view] ?? "Wagenparkbeheer";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navButtons.forEach((button) => button.addEventListener("click", () => openView(button.dataset.view)));
  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => openView(button.dataset.open));
  });
  document.querySelector("[data-dismiss]")?.addEventListener("click", () => {
    document.querySelector(".demo-notice")?.remove();
  });

  const today = document.getElementById("today");
  if (today) {
    today.textContent = new Intl.DateTimeFormat("nl-NL", { dateStyle: "full" }).format(new Date());
  }

  function openRoadmap(category) {
    activeCategory = category;
    openView("roadmap");
    renderRoadmap();
  }

  function renderCategories() {
    const tabs = document.getElementById("roadmap-tabs");
    if (tabs) {
      tabs.replaceChildren();
      categories.forEach((category) => {
        const button = document.createElement("button");
        button.type = "button";
        const icon = createBrandIcon(category, categoryIcons[categories.indexOf(category)]);
        const label = document.createElement("span");
        label.textContent = category;
        button.append(icon, label);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(category === activeCategory));
        button.classList.toggle("selected", category === activeCategory);
        button.addEventListener("click", () => openRoadmap(category));
        tabs.append(button);
      });
    }
  }

  function createBrandIcon(category, fallback) {
    const icon = document.createElement("span");
    icon.className = "brand-icon";
    const logoUrl = brandLogoUrls[category];
    if (!logoUrl) {
      icon.textContent = fallback;
      return icon;
    }

    const image = document.createElement("img");
    image.className = "official-logo roadmap-brand-logo";
    image.src = logoUrl;
    image.alt = `${category}-logo`;
    image.loading = "lazy";
    image.addEventListener("error", () => {
      image.remove();
      icon.textContent = fallback;
    }, { once: true });
    icon.append(image);
    return icon;
  }

  function renderRoadmap() {
    const heading = document.getElementById("roadmap-category-title");
    const count = document.getElementById("location-count");
    const list = document.getElementById("locations-list");
    if (!heading || !count || !list) return;
    const locations = sampleLocations[activeCategory] ?? [];
    heading.textContent = activeCategory;
    count.textContent = `${locations.length} demo-adressen`;
    list.replaceChildren();
    if (locations.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = "<span>⌖</span><b>Nog geen voorbeeldlocaties</b><p>Er zijn nog geen servicepunten in deze categorie.</p>";
      list.append(empty);
      return;
    }
    locations.forEach((location) => {
      const row = document.createElement("article");
      const pin = document.createElement("span");
      const copy = document.createElement("span");
      const name = document.createElement("b");
      const address = document.createElement("span");
      row.className = "location-row";
      pin.className = "location-pin";
      pin.textContent = "⌖";
      copy.className = "location-info";
      name.textContent = location.name;
      address.textContent = [location.address, location.city].filter(Boolean).join(", ");
      copy.append(name, address);
      row.append(pin, copy);
      list.append(row);
    });
  }

  renderCategories();
  renderRoadmap();

  document.querySelectorAll("img[data-brand-logo]").forEach((image) => {
    image.addEventListener("error", () => image.remove(), { once: true });
  });

  document.getElementById("map-search")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("map-query");
    const map = document.getElementById("map-frame");
    if (!(query instanceof HTMLInputElement) || !(map instanceof HTMLIFrameElement)) return;
    map.src = `https://maps.google.com/maps?q=${encodeURIComponent(query.value.trim() || "Nederland")}&z=12&output=embed`;
  });

  document.querySelector("[data-open-whatsapp]")?.addEventListener("click", () => {
    const input = document.getElementById("whatsapp-number");
    if (!(input instanceof HTMLInputElement)) return;
    let number = input.value.replace(/\D/g, "");
    if (number.startsWith("0")) number = `31${number.slice(1)}`;
    if (!/^[1-9]\d{7,14}$/.test(number)) {
      showToast("Vul een geldig 06- of internationaal nummer in.");
      return;
    }
    window.open(`https://wa.me/${number}`, "_blank", "noopener,noreferrer");
  });

  function renderChat(index) {
    const messages = document.getElementById("chat-messages");
    const heading = document.querySelector(".chat-heading");
    if (!messages || !heading) return;
    activeChat = index;
    document.querySelectorAll("[data-chat]").forEach((button) => {
      button.classList.toggle("active", Number(button.dataset.chat) === index);
    });
    const avatar = heading.querySelector(".chat-avatar");
    const name = heading.querySelector("b");
    if (avatar) avatar.textContent = index === 0 ? "JD" : "MK";
    if (name) name.textContent = `Voorbeeldchauffeur 0${index + 1}`;
    messages.replaceChildren();
    chats[activeChat].forEach((message) => {
      const bubble = document.createElement("article");
      const text = document.createElement("p");
      const time = document.createElement("time");
      bubble.className = `message-bubble${message.outgoing ? " outgoing" : ""}`;
      text.textContent = message.text;
      time.textContent = message.time;
      bubble.append(text, time);
      messages.append(bubble);
    });
  }

  document.querySelectorAll("[data-chat]").forEach((button) => {
    button.addEventListener("click", () => renderChat(Number(button.dataset.chat)));
  });
  renderChat(0);
});

(() => {
  const gate = document.getElementById("pin-gate");
  const content = document.getElementById("admin-content");
  const input = document.getElementById("pin-input");
  const error = document.getElementById("pin-error");
  if (!gate || !content || !input || !error) return;
  gate.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value === "1791") {
      gate.hidden = true;
      content.hidden = false;
      return;
    }
    error.hidden = false;
    input.value = "";
    input.focus();
  });
})();
