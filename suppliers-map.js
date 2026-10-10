(() => {
  const data = (window.SUPPLIERS || []).map(([name, code, phone, street, zip, city, region, country, lat, lon]) => ({
    name, code, phone, street, zip, city, region, country, lat, lon,
    hay: `${name} ${code} ${phone} ${street} ${zip} ${city} ${region} ${country}`.toLocaleLowerCase("nl-NL"),
  }));
  const navButton = document.querySelector('[data-view="suppliers-map"]');
  const mapEl = document.getElementById("supmap");
  const input = document.getElementById("supmap-query");
  const select = document.getElementById("supmap-country");
  const count = document.getElementById("supmap-count");
  const form = document.getElementById("supmap-search");
  const info = document.getElementById("supmap-info");
  const notice = document.getElementById("supmap-notice");
  const zoomBox = document.querySelector(".supmap-zoom");
  if (!navButton || !notice || !mapEl || !input || !select || !count || !form || !info) return;

  const NS = "http://www.w3.org/2000/svg";
  const stop = new Set(["zoek", "een", "voor", "naar", "in", "de", "het", "ik", "met", "bij", "op", "te"]);
  const mercY = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) * (180 / Math.PI);
  // Wereldcoördinaten: x = lengtegraad, y = Mercator-breedte (omgekeerd voor SVG)
  const project = (lon, lat) => [lon, -mercY(lat)];

  let tileErrors = 0, svg, dots, labels, tiles, shapesGroup, ready = false, tileTimer, tilesOk = 0;
  const tiled = new Map();
  const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
  let view = { x: 0, y: 0, w: 1, h: 1 };
  let full = view;
  let current = [];

  [...new Set(data.map((s) => s.country).filter(Boolean))].sort((a, b) => a.localeCompare(b, "nl")).forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    select.append(option);
  });

  function updateTiles() {
    const ppd = mapEl.clientWidth / view.w;
    const z = Math.max(3, Math.min(17, Math.round(Math.log2((360 * ppd) / 256))));
    const size = 360 / 2 ** z;
    const max = 2 ** z - 1;
    const x0 = Math.max(0, Math.floor((view.x + 180) / size)), x1 = Math.min(max, Math.floor((view.x + view.w + 180) / size));
    const y0 = Math.max(0, Math.floor((view.y + 180) / size)), y1 = Math.min(max, Math.floor((view.y + view.h + 180) / size));
    if ((x1 - x0 + 1) * (y1 - y0 + 1) > 60) return;
    const keep = new Set();
    for (let x = x0; x <= x1; x += 1) {
      for (let y = y0; y <= y1; y += 1) {
        const key = `${z}/${x}/${y}`;
        keep.add(key);
        if (tiled.has(key)) continue;
        const img = document.createElementNS(NS, "image");
        img.setAttribute("x", -180 + x * size);
        img.setAttribute("y", -180 + y * size);
        img.setAttribute("width", size + size * 0.004);
        img.setAttribute("height", size + size * 0.004);
        img.setAttribute("href", TILE_URL.replace("{z}", z).replace("{x}", x).replace("{y}", y));
        img.setAttribute("data-z", z);
        img.addEventListener("load", () => { tilesOk += 1; shapesGroup.style.opacity = "0"; });
        img.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        img.addEventListener("error", () => { img.remove(); tileErrors += 1; checkTiles(); });
        tiles.append(img);
        tiled.set(key, img);
      }
    }
    tiled.forEach((img, key) => {
      const iz = Number(key.split("/")[0]);
      if (!keep.has(key) && (iz === z || Math.abs(iz - z) > 1)) { img.remove(); tiled.delete(key); }
    });
  }

  function checkTiles() {
    if (tilesOk || tileErrors < 3) return;
    notice.textContent = location.protocol === "file:"
      ? "Kaarttegels laden niet: de pagina is geopend via file://. Start serve.py en open http://localhost:8000/fleetmanagement.html."
      : "Kaarttegels van OpenStreetMap konden niet geladen worden. Alleen de landsgrenzen en markers zijn zichtbaar.";
    notice.hidden = false;
  }

  const apply = () => {
    svg.setAttribute("viewBox", `${view.x} ${view.y} ${view.w} ${view.h}`);
    clearTimeout(tileTimer);
    tileTimer = setTimeout(updateTiles, 120);
  };

  function fit(points) {
    if (!points.length) return;
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    let minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const pad = Math.max(0.6, (maxX - minX) * 0.08);
    minX -= pad; maxX += pad; minY -= pad; maxY += pad;
    const ratio = mapEl.clientWidth / (mapEl.clientHeight || 1);
    let w = maxX - minX, h = maxY - minY;
    if (w / h > ratio) { const nh = w / ratio; minY -= (nh - h) / 2; h = nh; } else { const nw = h * ratio; minX -= (nw - w) / 2; w = nw; }
    view = { x: minX, y: minY, w, h };
    full = { ...view };
    apply();
    updateDots();
  }

  function updateDots() {
    const scale = view.w / mapEl.clientWidth;
    dots.querySelectorAll("circle").forEach((c) => {
      const n = Number(c.dataset.n);
      c.setAttribute("r", String(Math.min(16, 5 + Math.sqrt(n) * 1.8) * scale));
    });
    const show = view.w / mapEl.clientWidth < 0.012;
    labels.querySelectorAll("text").forEach((l) => {
      l.style.display = show ? "" : "none";
      l.setAttribute("font-size", String(12 * scale));
      l.setAttribute("stroke-width", String(3 * scale));
      l.setAttribute("dy", String(-14 * scale));
    });
  }

  function showInfo(group, node) {
    dots.querySelectorAll(".active").forEach((c) => c.classList.remove("active"));
    node.classList.add("active");
    info.replaceChildren();
    const close = document.createElement("button");
    close.type = "button";
    close.textContent = "×";
    close.setAttribute("aria-label", "Sluiten");
    close.addEventListener("click", () => { info.hidden = true; node.classList.remove("active"); });
    const title = document.createElement("strong");
    title.textContent = `${group.city || "Onbekend"} (${group.items.length})`;
    info.append(close, title);
    group.items.slice(0, 15).forEach((s) => {
      const line = document.createElement("div");
      const name = document.createElement("b");
      name.textContent = s.name;
      const detail = document.createElement("span");
      detail.textContent = [s.street, s.phone].filter(Boolean).join(" · ");
      line.append(name, detail);
      info.append(line);
    });
    if (group.items.length > 15) {
      const rest = document.createElement("em");
      rest.textContent = `+ ${group.items.length - 15} meer — zoek op naam om te verfijnen`;
      info.append(rest);
    }
    info.hidden = false;
  }

  function render(refit) {
    const terms = input.value.toLocaleLowerCase("nl-NL").split(/[^\p{L}\p{N}-]+/u).filter((t) => t && !stop.has(t));
    const filtered = data.filter((s) => (!select.value || s.country === select.value) && terms.every((t) => s.hay.includes(t)));
    const groups = new Map();
    let unplaced = 0;
    filtered.forEach((s) => {
      if (typeof s.lat !== "number") { unplaced += 1; return; }
      const key = `${s.lat},${s.lon}`;
      if (!groups.has(key)) groups.set(key, { city: s.city, p: project(s.lon, s.lat), items: [] });
      groups.get(key).items.push(s);
    });
    dots.replaceChildren();
    labels.replaceChildren();
    info.hidden = true;
    current = [...groups.values()];
    current.sort((a, b) => b.items.length - a.items.length).forEach((group) => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("class", "dot");
      c.setAttribute("cx", group.p[0]);
      c.setAttribute("cy", group.p[1]);
      c.dataset.n = group.items.length;
      const t = document.createElementNS(NS, "title");
      t.textContent = `${group.city} · ${group.items.length}`;
      c.append(t);
      c.addEventListener("click", (event) => { event.stopPropagation(); showInfo(group, c); });
      dots.append(c);
      const label = document.createElementNS(NS, "text");
      label.setAttribute("class", "dot-label");
      label.setAttribute("x", group.p[0]);
      label.setAttribute("y", group.p[1]);
      label.setAttribute("text-anchor", "middle");
      label.textContent = group.city || "";
      labels.append(label);
    });
    count.textContent = `${filtered.length - unplaced} van ${filtered.length} leveranciers op de kaart` + (unplaced ? ` (${unplaced} zonder vindbare plaats)` : "");
    if (refit !== false) fit(current.map((g) => g.p));
    else updateDots();
  }

  function zoom(factor, cx, cy) {
    const nw = Math.min(Math.max(view.w * factor, full.w / 200), 120);
    const k = nw / view.w;
    const px = cx ?? view.x + view.w / 2;
    const py = cy ?? view.y + view.h / 2;
    view = { x: px - (px - view.x) * k, y: py - (py - view.y) * k, w: nw, h: view.h * k };
    apply();
    updateDots();
  }

  function init() {
    if (ready) return;
    ready = true;
    svg = document.createElementNS(NS, "svg");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.style.width = "100%";
    svg.style.height = "100%";
    shapesGroup = document.createElementNS(NS, "g");
    (window.MAP_SHAPES || []).forEach((ring) => {
      const pts = ring.split(" ").map((p) => { const [lo, la] = p.split(",").map(Number); return project(lo, Math.max(-85, Math.min(85, la))); });
      const path = document.createElementNS(NS, "path");
      path.setAttribute("class", "land");
      path.setAttribute("d", "M" + pts.map((p) => `${p[0].toFixed(3)} ${p[1].toFixed(3)}`).join("L") + "Z");
      shapesGroup.append(path);
    });
    tiles = document.createElementNS(NS, "g");
    dots = document.createElementNS(NS, "g");
    labels = document.createElementNS(NS, "g");
    labels.style.pointerEvents = "none";
    svg.append(shapesGroup, tiles, dots, labels);
    mapEl.append(svg);

    const toWorld = (event) => {
      const r = mapEl.getBoundingClientRect();
      const scale = Math.max(view.w / r.width, view.h / r.height);
      const offX = (r.width - view.w / scale) / 2;
      const offY = (r.height - view.h / scale) / 2;
      return [view.x + (event.clientX - r.left - offX) * scale, view.y + (event.clientY - r.top - offY) * scale, scale];
    };
    let drag;
    mapEl.addEventListener("pointerdown", (event) => {
      drag = { x: event.clientX, y: event.clientY, view: { ...view }, moved: false };
    });
    window.addEventListener("pointermove", (event) => {
      if (!drag) return;
      const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 4) return;
      drag.moved = true;
      mapEl.classList.add("dragging");
      const scale = Math.max(drag.view.w / mapEl.clientWidth, drag.view.h / mapEl.clientHeight);
      view = { ...drag.view, x: drag.view.x - dx * scale, y: drag.view.y - dy * scale };
      apply();
    });
    window.addEventListener("pointerup", () => { drag = null; mapEl.classList.remove("dragging"); });
    mapEl.addEventListener("wheel", (event) => {
      event.preventDefault();
      const [x, y] = toWorld(event);
      zoom(event.deltaY < 0 ? 0.8 : 1.25, x, y);
    }, { passive: false });
    mapEl.addEventListener("click", () => { info.hidden = true; dots.querySelectorAll(".active").forEach((c) => c.classList.remove("active")); });
    zoomBox?.addEventListener("click", (event) => {
      const b = event.target.closest("[data-zoom]");
      if (!b) return;
      const z = Number(b.dataset.zoom);
      if (z === 0) { view = { ...full }; apply(); updateDots(); } else zoom(z > 0 ? 0.6 : 1.6);
    });
    render(true);
    setTimeout(() => {
      if (!tilesOk) { tileErrors = Math.max(tileErrors, 3); checkTiles(); }
    }, 6000);
    new ResizeObserver(() => { if (mapEl.clientWidth) { updateDots(); updateTiles(); } }).observe(mapEl);
  }

  navButton.addEventListener("click", () => setTimeout(init, 50));
  form.addEventListener("submit", (event) => { event.preventDefault(); if (ready) render(true); });
  input.addEventListener("input", () => { if (ready) render(true); });
  select.addEventListener("change", () => { if (ready) render(true); });
})();