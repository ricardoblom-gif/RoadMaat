(() => {
  const KEY = "roadmaat-pin-ok";
  if (sessionStorage.getItem(KEY) === "1") return;
  const overlay = document.createElement("div");
  overlay.className = "pin-overlay";
  overlay.innerHTML = '<form class="pin-box" autocomplete="off"><h2>Pincode</h2><p>Voer de pincode in om verder te gaan.</p><input type="password" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" placeholder="••••" aria-label="Pincode" required /><button type="submit">Ontgrendel</button><p class="pin-err" role="alert" hidden>Onjuiste pincode.</p></form>';
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
  const input = overlay.querySelector("input");
  const err = overlay.querySelector(".pin-err");
  input.focus();
  overlay.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value === "1599") {
      sessionStorage.setItem(KEY, "1");
      overlay.remove();
      document.body.style.overflow = "";
      return;
    }
    err.hidden = false;
    input.value = "";
    input.focus();
  });
})();
