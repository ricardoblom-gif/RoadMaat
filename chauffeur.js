document.addEventListener("DOMContentLoaded", () => {
  const panels = [...document.querySelectorAll("[data-panel]")];
  const navigation = [...document.querySelectorAll("[data-view]")];
  const toast = document.getElementById("toast");
  let toastTimer;

  const chats = {
    mentor: {
      name: "Mentor chauffeurs",
      avatar: "RM",
      avatarClass: "mentor-avatar",
      status: '<i></i> 3 Helpers beschikbaar',
      messages: [
        { author: "Monique · RoadMaat Helper", text: "Hoi Jan! Welkom bij Mentor chauffeurs. Waar loop je tegenaan?", time: "09:12" },
        { author: "Jan", text: "Ik moet morgen voor het eerst lossen bij een nieuwe klant. Waar kan ik het beste terecht met vragen?", time: "09:14", mine: true },
        { author: "Monique · RoadMaat Helper", text: "Stuur de naam of locatie maar door, dan kijken we met je mee. Je kunt ook de RoadMap raadplegen voor tips van collega’s.", time: "09:15" },
      ],
    },
    pieter: {
      name: "Pieter van Dijk",
      avatar: "PV",
      avatarClass: "pieter-avatar",
      status: "Privéchat",
      messages: [
        { author: "Pieter", text: "Ik heb je de routebeschrijving naar de laadplaats gestuurd.", time: "08:46" },
        { author: "Jan", text: "Dank je, dat helpt!", time: "08:51", mine: true },
      ],
    },
    monique: {
      name: "Monique Smit",
      avatar: "MS",
      avatarClass: "monique-avatar",
      status: "Privéchat · Helper",
      messages: [
        { author: "Jan", text: "Bedankt voor je tip over de chauffeursingang.", time: "Gisteren", mine: true },
        { author: "Monique", text: "Graag gedaan! Tot bij de volgende stop 👋", time: "Gisteren" },
      ],
    },
    friends: {
      name: "Bevriende chauffeurs",
      avatar: "👥",
      avatarClass: "friends-avatar",
      status: "Groepschat · 8 chauffeurs",
      messages: [
        { author: "Klaas", text: "Wie rijdt er vandaag richting Utrecht?", time: "09:02" },
        { author: "Pieter", text: "Ik kom rond 11 uur langs de A2.", time: "09:05" },
        { author: "Jan", text: "Ik ben onderweg naar Barneveld, misschien later!", time: "09:08", mine: true },
      ],
    },
  };

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
  }

  function openView(name) {
    const validName = panels.some((panel) => panel.dataset.panel === name) ? name : "overview";
    panels.forEach((panel) => {
      const active = panel.dataset.panel === validName;
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });
    navigation.forEach((link) => link.classList.toggle("active", link.dataset.view === validName));
    history.replaceState(null, "", `#${validName === "overview" ? "overview" : validName}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderChat(chatId) {
    const chat = chats[chatId];
    if (!chat) return;
    document.querySelectorAll(".chat-choice").forEach((choice) => {
      choice.classList.toggle("active", choice.dataset.chat === chatId);
    });
    const avatar = document.getElementById("conversation-avatar");
    avatar.textContent = chat.avatar;
    avatar.className = `avatar ${chat.avatarClass}`;
    document.getElementById("conversation-name").textContent = chat.name;
    document.getElementById("conversation-status").innerHTML = chat.status;
    const messageList = document.getElementById("messages");
    messageList.replaceChildren();
    chat.messages.forEach((message) => appendMessage(messageList, message));
    messageList.scrollTop = messageList.scrollHeight;
    document.getElementById("message-input").placeholder = `Bericht aan ${chat.name}...`;
    document.getElementById("message-input").dataset.chat = chatId;
  }

  function appendMessage(messageList, message) {
    const wrapper = document.createElement("article");
    wrapper.className = `message${message.mine ? " mine" : ""}`;
    const author = document.createElement("strong");
    author.textContent = message.author;
    const text = document.createElement("p");
    text.textContent = message.text;
    const time = document.createElement("time");
    time.textContent = message.time;
    wrapper.append(author, text, time);
    messageList.append(wrapper);
  }

  navigation.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openView(link.dataset.view);
    });
  });

  window.addEventListener("hashchange", () => {
    const requested = window.location.hash.slice(1);
    const view = requested === "chats" || requested === "groups" || requested === "roadmap" ? requested : "overview";
    if (!document.getElementById(`view-${view}`).classList.contains("active")) openView(view);
  });

  document.querySelectorAll(".filter-button").forEach((filter) => {
    filter.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach((button) => button.classList.toggle("active", button === filter));
      const category = filter.dataset.filter;
      const locations = [...document.querySelectorAll(".location-card")];
      locations.forEach((location) => {
        location.hidden = category !== "all" && location.dataset.category !== category;
      });
      const count = locations.filter((location) => !location.hidden).length;
      document.getElementById("location-count").textContent = `${count} ${count === 1 ? "plek" : "plekken"}`;
    });
  });

  document.querySelectorAll(".location-card").forEach((location) => {
    location.addEventListener("click", () => {
      document.querySelectorAll(".location-card").forEach((card) => card.classList.toggle("selected", card === location));
      document.getElementById("detail-name").textContent = location.dataset.name;
      document.getElementById("detail-kind").textContent = location.dataset.kind.toLocaleUpperCase("nl-NL");
      document.getElementById("detail-description").textContent = location.dataset.description;
      document.getElementById("detail-info").textContent = location.dataset.details;
      const symbol = document.getElementById("detail-symbol");
      symbol.textContent = location.querySelector(".location-symbol").textContent;
      symbol.className = `location-symbol ${location.querySelector(".location-symbol").classList[1]}`;
      document.getElementById("google-map").src = `https://maps.google.com/maps?q=${encodeURIComponent(location.dataset.query)}&output=embed`;
      document.getElementById("maps-link").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.dataset.query)}`;
    });
  });

  document.querySelectorAll(".chat-choice").forEach((choice) => {
    choice.addEventListener("click", () => renderChat(choice.dataset.chat));
  });

  document.querySelectorAll("[data-open-chat]").forEach((button) => {
    button.addEventListener("click", () => {
      openView("chats");
      renderChat(button.dataset.openChat);
    });
  });

  document.getElementById("message-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("message-input");
    const text = input.value.trim();
    const chat = chats[input.dataset.chat];
    if (!text || !chat) return;
    const message = { author: "Jan", text, time: new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit" }).format(new Date()), mine: true };
    chat.messages.push(message);
    appendMessage(document.getElementById("messages"), message);
    input.value = "";
    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
  });

  document.querySelector(".conversation-menu").addEventListener("click", () => showToast("Gespreksopties zijn in deze demo nog niet gekoppeld."));

  const today = new Intl.DateTimeFormat("nl-NL", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
  document.getElementById("today-label").textContent = today.toLocaleUpperCase("nl-NL");
  renderChat("mentor");
  const initialView = window.location.hash.slice(1);
  openView(initialView === "roadmap" || initialView === "chats" || initialView === "groups" ? initialView : "overview");
});
