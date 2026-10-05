document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("toast");
  const dialog = document.getElementById("demo-dialog");
  const input = document.getElementById("dialog-input");
  const form = document.querySelector(".dialog-form");
  const feedList = document.getElementById("feed-list");
  let toastTimer;
  let dialogMode = "post";

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2800);
  }

  function openDialog(mode) {
    dialogMode = mode;
    const isQuestion = mode === "question";
    document.getElementById("dialog-icon").textContent = isQuestion ? "♡" : "✦";
    document.getElementById("dialog-title").textContent = isQuestion ? "Stel je vraag" : "Deel met je collega’s";
    document.getElementById("dialog-description").textContent = isQuestion
      ? "Een RoadMaat Helper of collega denkt met je mee."
      : "Laat je collega’s weten wat je onderweg meemaakt of ontdekt.";
    document.getElementById("dialog-label").textContent = isQuestion ? "Waar kunnen we je mee helpen?" : "Jouw bericht";
    input.placeholder = isQuestion ? "Bijvoorbeeld: waar kan ik mij melden bij..." : "Typ hier je bericht...";
    document.getElementById("dialog-submit").textContent = isQuestion ? "Vraag versturen" : "Bericht plaatsen";
    input.value = "";
    dialog.showModal();
    input.focus();
  }

  document.getElementById("new-post-button").addEventListener("click", () => openDialog("post"));
  document.getElementById("composer-prompt").addEventListener("click", () => openDialog("post"));
  document.getElementById("ask-help-button").addEventListener("click", () => openDialog("question"));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!input.value.trim()) {
      input.focus();
      return;
    }
    if (dialogMode === "question") {
      dialog.close();
      showToast("Je vraag is verstuurd naar de Helpers. Dit is een demo; er wordt niets opgeslagen.");
      return;
    }
    const article = document.createElement("article");
    article.className = "post-card card";
    const header = document.createElement("div");
    header.className = "post-head";
    header.innerHTML = '<span class="avatar avatar-you">JD</span><div class="post-author"><strong>Jan de Vries</strong><span>AB Texel · zojuist</span></div>';
    const copy = document.createElement("p");
    copy.className = "post-copy";
    copy.textContent = input.value.trim();
    const actions = document.createElement("div");
    actions.className = "post-actions";
    actions.innerHTML = '<button class="like-button" type="button" aria-pressed="false"><span>♡</span> <b>0</b> Vind ik leuk</button><button class="comment-button" type="button"><span>▱</span> Reageer</button>';
    article.append(header, copy, actions);
    feedList.prepend(article);
    dialog.close();
    showToast("Je bericht staat in de demo-feed. Het wordt niet online opgeslagen.");
    article.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  document.getElementById("post-form").addEventListener("submit", (event) => {
    event.preventDefault();
    openDialog("post");
  });

  document.addEventListener("click", (event) => {
    const likeButton = event.target.closest(".like-button");
    if (likeButton) {
      const liked = likeButton.getAttribute("aria-pressed") === "true";
      const count = likeButton.querySelector("b");
      count.textContent = Number(count.textContent) + (liked ? -1 : 1);
      likeButton.setAttribute("aria-pressed", String(!liked));
      likeButton.querySelector("span").textContent = liked ? "♡" : "♥";
      return;
    }
    const commentButton = event.target.closest(".comment-button");
    if (commentButton) {
      showToast("Reageren is onderdeel van de interactieve demo.");
      return;
    }
    if (event.target.closest(".share-button")) {
      showToast("Delen is in deze demo nog niet gekoppeld.");
      return;
    }
    if (event.target.closest(".composer-photo")) {
      showToast("Foto toevoegen is in deze demo nog niet gekoppeld.");
      return;
    }
    if (event.target.closest("#join-group-button")) {
      showToast("Groepen ontdekken is in deze demo nog niet gekoppeld.");
      return;
    }
    if (event.target.closest("#feed-filter")) {
      showToast("Je bekijkt berichten van jouw community.");
      return;
    }
    if (event.target.closest(".notification-button")) {
      showToast("Je bent helemaal bij met je meldingen.");
      return;
    }
    if (event.target.closest(".profile-button")) {
      showToast("Dit is het demo-profiel van Jan de Vries.");
    }
  });

  document.querySelectorAll('[data-section]').forEach((link) => {
    link.addEventListener("click", () => {
      const section = link.dataset.section;
      document.querySelectorAll(`[data-section="${section}"]`).forEach((item) => item.classList.add("active"));
      document.querySelectorAll(`[data-section]:not([data-section="${section}"])`).forEach((item) => item.classList.remove("active"));
    });
  });

  document.getElementById("site-search").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.currentTarget.value.trim()) {
      showToast(`Zoeken naar “${event.currentTarget.value.trim()}” is een demo-functie.`);
      event.currentTarget.blur();
    }
  });

  const dateLabel = document.getElementById("today-label");
  dateLabel.textContent = new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date()).toLocaleUpperCase("nl-NL");
});
