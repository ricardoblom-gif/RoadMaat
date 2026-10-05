document.addEventListener("DOMContentLoaded", () => {
  const panels = [...document.querySelectorAll("[data-panel]")];
  const navigation = [...document.querySelectorAll("[data-view]")];
  const toast = document.getElementById("toast");
  let toastTimer;
  const factoryMapUrl = "https://www.google.com/maps/dir/?api=1&origin=Lamb+Weston+Kruiningen&destination=Agristo+Tilburg&waypoints=Lamb+Weston+Bergen+op+Zoom%7CLamb+Weston+Oosterbierum%7CAviko+Steenderen&output=embed";
  const factoryDirectionsUrl = "https://www.google.com/maps/dir/?api=1&origin=Lamb+Weston+Kruiningen&destination=Agristo+Tilburg&waypoints=Lamb+Weston+Bergen+op+Zoom%7CLamb+Weston+Oosterbierum%7CAviko+Steenderen";

  const locations = [
    { category: "truckstop", name: "Truckstop De Lucht", location: "A2 · Bruchem", query: "Truckstop De Lucht Bruchem", description: "Verzorgingsplaats en stop langs de A2. Bekijk de actuele plek, voorzieningen en toegang voor vrachtwagens op de kaart.", details: "Verzorgingsplaats · A2", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats Lingehorst", location: "A15 · Wadenoijen", query: "Verzorgingsplaats Lingehorst A15", description: "Verzorgingsplaats langs de A15. Controleer de actuele voorzieningen en trucktoegang via Google Maps.", details: "Verzorgingsplaats · A15", symbol: "T" },
    { category: "truckstop", name: "Truckstop Hazeldonk", location: "A16 · Breda/Belgische grens", query: "Truckstop Hazeldonk", description: "Truckstop bij de grensovergang Hazeldonk. Bekijk actuele informatie en bereikbaarheid op Google Maps.", details: "Truckstop · A16", symbol: "T" },
    { category: "truckstop", name: "Truckstop Nobis", location: "A67 · Asten", query: "Truckstop Nobis Asten", description: "Truckstop bij Asten aan de A67. Controleer de actuele voorzieningen, openingstijden en toegang.", details: "Truckstop · A67", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats De Andel", location: "A12 · Gouda", query: "Verzorgingsplaats De Andel A12", description: "Verzorgingsplaats aan de A12. Bekijk de locatie en actuele voorzieningen op de kaart.", details: "Verzorgingsplaats · A12", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats Honswijck", location: "A1 · Muiden", query: "Verzorgingsplaats Honswijck A1", description: "Verzorgingsplaats bij Muiden aan de A1. Controleer voor vertrek de trucktoegang en voorzieningen.", details: "Verzorgingsplaats · A1", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats Haarrijn", location: "A2 · Utrecht", query: "Verzorgingsplaats Haarrijn A2", description: "Verzorgingsplaats langs de A2 bij Utrecht. Bekijk actuele informatie op de kaart.", details: "Verzorgingsplaats · A2", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats De Ruyven", location: "A13 · Delft", query: "Verzorgingsplaats De Ruyven A13", description: "Verzorgingsplaats langs de A13 bij Delft. Controleer actuele bereikbaarheid en voorzieningen.", details: "Verzorgingsplaats · A13", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats Ooiendonk", location: "A67 · Veldhoven", query: "Verzorgingsplaats Ooiendonk A67", description: "Verzorgingsplaats langs de A67. Bekijk locatiegegevens en actuele trucktoegang op Google Maps.", details: "Verzorgingsplaats · A67", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats Maaldrift", location: "A44 · Wassenaar", query: "Verzorgingsplaats Maaldrift A44", description: "Verzorgingsplaats aan de A44 bij Wassenaar. Raadpleeg Google Maps voor actuele voorzieningen.", details: "Verzorgingsplaats · A44", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats De Wouwse Tol", location: "A58 · Bergen op Zoom", query: "Verzorgingsplaats De Wouwse Tol A58", description: "Stopplaats bij Bergen op Zoom aan de A58. Bekijk de actuele locatie en faciliteiten op Maps.", details: "Verzorgingsplaats · A58", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats Den Ruygen Hoek", location: "A4 · Hoofddorp", query: "Verzorgingsplaats Den Ruygen Hoek A4", description: "Verzorgingsplaats aan de A4. Controleer actuele voorzieningen en bereikbaarheid voor je voertuig.", details: "Verzorgingsplaats · A4", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats Aalscholver", location: "A4 · Leiderdorp", query: "Verzorgingsplaats Aalscholver A4", description: "Verzorgingsplaats aan de A4. Bekijk actuele informatie en bereikbaarheid op Google Maps.", details: "Verzorgingsplaats · A4", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats Kloosters", location: "A1 · Deventer", query: "Verzorgingsplaats Kloosters A1", description: "Verzorgingsplaats langs de A1. Raadpleeg de kaart voor actuele locatie-informatie.", details: "Verzorgingsplaats · A1", symbol: "T" },
    { category: "truckstop", name: "Verzorgingsplaats De Paal", location: "A50 · Ekkersrijt", query: "Verzorgingsplaats De Paal A50", description: "Verzorgingsplaats aan de A50. Controleer de actuele toegang en beschikbare voorzieningen.", details: "Verzorgingsplaats · A50", symbol: "T" },
    { category: "factory", name: "Lamb Weston · Kruiningen", location: "Fabriek · Kruiningen", query: "Lamb Weston Kruiningen", description: "Opgegeven laad-/loslocatie. Controleer het juiste terrein en de aanmeldinstructies met je planning.", details: "Fabriek · Kruiningen", symbol: "F" },
    { category: "factory", name: "Lamb Weston · Bergen op Zoom", location: "Fabriek · Bergen op Zoom", query: "Lamb Weston Bergen op Zoom", description: "Opgegeven laad-/loslocatie. Controleer het juiste terrein en de aanmeldinstructies met je planning.", details: "Fabriek · Bergen op Zoom", symbol: "F" },
    { category: "factory", name: "Lamb Weston · Oosterbierum", location: "Fabriek · Oosterbierum", query: "Lamb Weston Oosterbierum", description: "Opgegeven laad-/loslocatie. Controleer het juiste terrein en de aanmeldinstructies met je planning.", details: "Fabriek · Oosterbierum", symbol: "F" },
    { category: "factory", name: "Aviko · Steenderen", location: "Fabriek · Steenderen", query: "Aviko Steenderen", description: "Opgegeven laad-/loslocatie. Controleer het juiste terrein en de aanmeldinstructies met je planning.", details: "Fabriek · Steenderen", symbol: "F" },
    { category: "factory", name: "Agristo · Tilburg", location: "Fabriek · Tilburg", query: "Agristo Tilburg", description: "Opgegeven laad-/loslocatie. Controleer het juiste terrein en de aanmeldinstructies met je planning.", details: "Fabriek · Tilburg", symbol: "F" },
    { category: "tire", name: "Tyreservice AB Texel · gedeelde kaart", location: "756 bandenservicepunten · Google My Maps", query: "Tyreservice AB Texel", mapUrl: "https://www.google.com/maps/d/embed?mid=1KOBUnpQTcD1p5bZD33YAsXwhLPoPh5E&ll=51.48709030058969%2C4.922573800000025&z=7", mapsUrl: "https://www.google.com/maps/d/viewer?mid=1KOBUnpQTcD1p5bZD33YAsXwhLPoPh5E&ll=51.48709030058969%2C4.922573800000025&z=7", description: "De gedeelde kaart met 756 bandenservicepunten van AB Texel. Tik op een marker in de kaart om de locatiegegevens te bekijken.", details: "756 kaartpunten · Bron: gedeelde Google My Maps-kaart", symbol: "B" },
    { category: "tire", name: "Heuver Truck Tyres", location: "Bandenservice · landelijk netwerk", query: "Heuver Truck Tyres Nederland", description: "Zoek vestigingen en services voor truckbanden. Bel de gekozen locatie om beschikbaarheid en eventuele pechhulp te bevestigen.", details: "Truckbanden · Controleer service per vestiging", symbol: "B" },
    { category: "tire", name: "Profile Truck", location: "Bandenservice · landelijk netwerk", query: "Profile Truck bandenservice Nederland", description: "Zoek een Profile Truck-bandenspecialist. Informeer de vestiging vooraf over voertuig, bandenmaat en beschikbaarheid.", details: "Truckbanden · Controleer service per vestiging", symbol: "B" },
    { category: "tire", name: "Euromaster Truck", location: "Bandenservice · landelijk netwerk", query: "Euromaster truck bandenservice Nederland", description: "Zoek truckbandenservice van Euromaster. Neem contact op met de vestiging voor actuele openingstijden en hulp onderweg.", details: "Truckbanden · Controleer service per vestiging", symbol: "B" },
    { category: "workshop", name: "DAF Truck Service", location: "Werkplaats · zoek dichtstbijzijnde locatie", query: "DAF truck werkplaats Nederland", description: "Zoek een DAF-servicepunt of werkplaats. Bel vooraf voor beschikbaarheid, openingstijden en hulp onderweg.", details: "Truckwerkplaats · Service per dealer", symbol: "W" },
    { category: "workshop", name: "Scania Service", location: "Werkplaats · zoek dichtstbijzijnde locatie", query: "Scania truck werkplaats Nederland", description: "Zoek een Scania-werkplaats of servicepunt in de buurt. Controleer vooraf of zij je truck kunnen helpen.", details: "Truckwerkplaats · Service per locatie", symbol: "W" },
    { category: "workshop", name: "Volvo Trucks Service", location: "Werkplaats · zoek dichtstbijzijnde locatie", query: "Volvo Trucks werkplaats Nederland", description: "Zoek een Volvo Trucks-werkplaats. Neem vooraf contact op voor beschikbaarheid en service onderweg.", details: "Truckwerkplaats · Service per dealer", symbol: "W" },
    { category: "workshop", name: "MAN Truck & Bus Service", location: "Werkplaats · zoek dichtstbijzijnde locatie", query: "MAN truck werkplaats Nederland", description: "Zoek een MAN-servicepunt of werkplaats en bel vooraf om hulp en bereikbaarheid te bevestigen.", details: "Truckwerkplaats · Service per dealer", symbol: "W" },
    { category: "workshop", name: "Truckwerkplaats in de buurt", location: "Google Maps · actuele zoekresultaten", query: "truckwerkplaats vrachtwagen reparatie bij mij in de buurt", description: "Zoek lokale truckwerkplaatsen op Google Maps. Controleer of ze jouw voertuigtype aannemen en bel voor vertrek.", details: "Lokale zoekopdracht · Controleer beschikbaarheid", symbol: "W" },
  ];

  const chats = {
    abMentors: {
      name: "AB Texel BV - Mentors",
      avatar: "AB",
      avatarClass: "mentor-avatar",
      status: "Groepschat · 3 Mentors",
      messages: [
        { author: "Monique · Mentor", text: "Goedemorgen Jan! Welkom in de mentorchat. Waar kunnen we je mee helpen?", time: "09:12" },
        { author: "Jan", text: "Ik moet morgen voor het eerst lossen bij een nieuwe klant. Waar kan ik het beste terecht met vragen?", time: "09:14", mine: true },
        { author: "Monique · Mentor", text: "Stuur de naam of locatie maar door, dan kijken we met je mee. Je kunt ook de RoadMap raadplegen voor tips van collega’s.", time: "09:15" },
        { author: "Peter · Mentor", text: "Geen vraag is te klein, Jan. We helpen je graag op weg!", time: "09:16" },
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
    frisian: {
      name: "Fryse Pieper riiders",
      avatar: "",
      avatarClass: "frisian-avatar",
      avatarImage: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Frisian_flag.svg",
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

  function iconClass(category) {
    return category === "truckstop" ? "parking-symbol"
      : category === "factory" ? "factory-symbol"
        : category === "tire" ? "tire-symbol"
          : "workshop-symbol";
  }

  function selectLocation(location, card) {
    document.querySelectorAll(".location-card").forEach((item) => item.classList.toggle("selected", item === card));
    document.getElementById("detail-name").textContent = location.name;
    document.getElementById("detail-kind").textContent = location.location.toLocaleUpperCase("nl-NL");
    document.getElementById("detail-description").textContent = location.description;
    document.getElementById("detail-info").textContent = location.details;
    const symbol = document.getElementById("detail-symbol");
    symbol.textContent = location.symbol;
    symbol.className = `location-symbol ${iconClass(location.category)}`;
    document.getElementById("google-map").src = location.mapUrl || `https://maps.google.com/maps?q=${encodeURIComponent(location.query)}&output=embed`;
    document.getElementById("maps-link").href = location.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.query)}`;
    document.querySelector(".map-caption").textContent = location.category === "tire" && location.mapUrl
      ? "756 bandenservicepunten · AB Texel"
      : location.category === "factory" ? "Fabriekslocatie"
        : "Kaart via Google Maps";
  }

  function renderLocations() {
    const list = document.getElementById("location-list");
    locations.forEach((location, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = `location-card${index === 0 ? " selected" : ""}`;
      card.dataset.category = location.category;
      const symbol = document.createElement("span");
      symbol.className = `location-symbol ${iconClass(location.category)}`;
      symbol.textContent = location.symbol;
      const copy = document.createElement("span");
      copy.className = "location-copy";
      const name = document.createElement("strong");
      name.textContent = location.name;
      const description = document.createElement("small");
      description.textContent = location.location;
      copy.append(name, description);
      const category = document.createElement("span");
      category.className = "location-rating";
      category.textContent = location.category === "truckstop" ? "Stop"
        : location.category === "factory" ? "Fabriek"
          : location.category === "tire" ? "Banden"
            : "Service";
      card.append(symbol, copy, category);
      card.addEventListener("click", () => selectLocation(location, card));
      list.append(card);
    });
    document.getElementById("location-count").textContent = `${locations.length} locaties`;
    selectLocation(locations[0], list.firstElementChild);
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
    avatar.replaceChildren();
    avatar.className = `avatar ${chat.avatarClass}`;
    if (chat.avatarImage) {
      const image = document.createElement("img");
      image.src = chat.avatarImage;
      image.alt = "Friese vlag";
      avatar.append(image);
    } else {
      avatar.textContent = chat.avatar;
    }
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
      const locationCards = [...document.querySelectorAll(".location-card")];
      locationCards.forEach((location) => {
        location.hidden = category !== "all" && location.dataset.category !== category;
      });
      const count = locationCards.filter((location) => !location.hidden).length;
      document.getElementById("location-count").textContent = `${count} ${count === 1 ? "locatie" : "locaties"}`;

      const map = document.getElementById("google-map");
      const mapLink = document.getElementById("maps-link");
      if (category === "tire") {
        const tyreMap = locations.find((location) => location.category === "tire");
        map.src = tyreMap.mapUrl;
        map.title = "Google My Maps met 756 bandenservicepunten van AB Texel";
        mapLink.href = tyreMap.mapsUrl;
        document.querySelector(".map-caption").textContent = "756 bandenservicepunten · AB Texel";
        document.getElementById("detail-name").textContent = "756 bandenservicepunten";
        document.getElementById("detail-kind").textContent = "GEDEELDE GOOGLE MY MAPS-KAART";
        document.getElementById("detail-description").textContent = "De volledige gedeelde kaart met bandenservicepunten staat nu direct in beeld. Tik op een markering voor de locatiegegevens.";
        document.getElementById("detail-info").textContent = "Bron: Tyreservice AB Texel";
      } else if (category === "factory") {
        map.src = factoryMapUrl;
        map.title = "Google Maps met alle vijf fabriekslocaties";
        mapLink.href = factoryDirectionsUrl;
        document.querySelector(".map-caption").textContent = "Alle 5 fabrieken · Google Maps";
        document.getElementById("detail-name").textContent = "Alle 5 fabriekslocaties";
        document.getElementById("detail-kind").textContent = "FABRIEKEN";
        document.getElementById("detail-description").textContent = "Google Maps toont de vijf opgegeven fabrieken als routepunten. Selecteer een locatie in de lijst voor de aparte kaartweergave.";
        document.getElementById("detail-info").textContent = "Kruiningen · Bergen op Zoom · Oosterbierum · Steenderen · Tilburg";
      } else {
        const firstVisible = locationCards.find((location) => !location.hidden);
        const location = locationDataForCard(firstVisible);
        if (location) selectLocation(location, firstVisible);
      }
    });
  });

  function locationDataForCard(card) {
    if (!card) return undefined;
    const name = card.querySelector(".location-copy strong").textContent;
    return locations.find((location) => location.name === name);
  }

  function loadLocalWeather() {
    const button = document.getElementById("weather-button");
    const temperature = document.getElementById("weather-temperature");
    const description = document.getElementById("weather-description");
    const icon = document.getElementById("weather-icon");
    button.disabled = true;
    button.textContent = "Locatie ophalen…";
    temperature.textContent = "Lokaal weer ophalen…";
    description.textContent = "Je locatie wordt alleen gebruikt voor de weeropvraag.";

    if (!navigator.geolocation) {
      temperature.textContent = "Locatie niet beschikbaar";
      description.textContent = "Deze browser biedt geen locatiefunctie aan.";
      button.disabled = false;
      button.textContent = "Opnieuw proberen";
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const url = new URL("https://api.open-meteo.com/v1/forecast");
        url.search = new URLSearchParams({
          latitude: String(latitude),
          longitude: String(longitude),
          current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m",
          timezone: "auto",
        }).toString();
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Weather request failed (${response.status})`);
        const result = await response.json();
        if (!result.current || typeof result.current.temperature_2m !== "number") {
          throw new Error("Weather response did not include current conditions");
        }
        const weatherCodes = {
          0: ["☀", "Helder"], 1: ["🌤", "Overwegend helder"], 2: ["⛅", "Half bewolkt"], 3: ["☁", "Bewolkt"],
          45: ["🌫", "Mist"], 48: ["🌫", "Aanvriezende mist"],
          51: ["🌦", "Lichte motregen"], 53: ["🌦", "Motregen"], 55: ["🌧", "Dichte motregen"],
          56: ["🌧", "Lichte ijzel"], 57: ["🌧", "IJzel"],
          61: ["🌦", "Lichte regen"], 63: ["🌧", "Regen"], 65: ["🌧", "Zware regen"],
          66: ["🌧", "Lichte ijsregen"], 67: ["🌧", "Zware ijsregen"],
          71: ["🌨", "Lichte sneeuw"], 73: ["❄", "Sneeuw"], 75: ["❄", "Zware sneeuw"], 77: ["🌨", "Sneeuwkorrels"],
          80: ["🌦", "Lichte regenbuien"], 81: ["🌧", "Regenbuien"], 82: ["⛈", "Zware regenbuien"],
          85: ["🌨", "Sneeuwbuien"], 86: ["❄", "Zware sneeuwbuien"],
          95: ["⛈", "Onweer"], 96: ["⛈", "Onweer met hagel"], 99: ["⛈", "Zwaar onweer met hagel"],
        };
        const [weatherIcon, weatherText] = weatherCodes[result.current.weather_code] || ["☁", "Weer opgehaald"];
        icon.textContent = weatherIcon;
        temperature.textContent = `${Math.round(result.current.temperature_2m)}°C · ${weatherText}`;
        const windSpeed = result.current.wind_speed_10m;
        const windDirection = result.current.wind_direction_10m;
        const windGusts = result.current.wind_gusts_10m;
        if (typeof windSpeed !== "number" || typeof windDirection !== "number" || typeof windGusts !== "number") {
          throw new Error("Weather response did not include wind conditions");
        }
        const beaufortThresholds = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
        const beaufort = beaufortThresholds.findIndex((threshold) => windSpeed < threshold);
        const windForce = beaufort === -1 ? 12 : beaufort;
        const compassPoints = ["N", "NNO", "NO", "ONO", "O", "OZO", "ZO", "ZZO", "Z", "ZZW", "ZW", "WZW", "W", "WNW", "NW", "NNW"];
        const directionIndex = Math.round(windDirection / 22.5) % compassPoints.length;
        document.getElementById("wind-strength").textContent = `Windkracht ${windForce} Bft · ${Math.round(windSpeed)} km/u`;
        document.getElementById("wind-direction").textContent = `Wind uit ${compassPoints[directionIndex]} · vlagen ${Math.round(windGusts)} km/u`;
        document.getElementById("wind-flag-icon").style.transform = `rotate(${(windDirection + 180) % 360}deg)`;
        document.querySelector(".wind-flag").setAttribute("aria-label", `Windkracht ${windForce} Beaufort, wind uit ${compassPoints[directionIndex]}, ${Math.round(windSpeed)} kilometer per uur`);
        button.textContent = "Vernieuwen";
      } catch (error) {
        console.error("Lokaal weer kon niet worden opgehaald.", error);
        temperature.textContent = "Weer niet beschikbaar";
        description.textContent = "Controleer je internet en probeer het opnieuw.";
        document.getElementById("wind-strength").textContent = "Windkracht —";
        document.getElementById("wind-direction").textContent = "Wind niet beschikbaar";
        button.textContent = "Opnieuw proberen";
      } finally {
        button.disabled = false;
      }
    }, (error) => {
      temperature.textContent = "Lokaal weer inschakelen";
      description.textContent = error.code === error.PERMISSION_DENIED
        ? "Sta locatie toe in je browser om het weer bij jou te tonen."
        : "Je locatie kon niet worden bepaald. Controleer je instellingen.";
      document.getElementById("wind-strength").textContent = "Windkracht —";
      document.getElementById("wind-direction").textContent = "Sta locatie toe voor wind";
      button.disabled = false;
      button.textContent = "Toon weer";
    }, { enableHighAccuracy: false, maximumAge: 600000, timeout: 12000 });
  }

  document.getElementById("weather-button").addEventListener("click", loadLocalWeather);

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
  renderLocations();
  renderChat("abMentors");
  const initialView = window.location.hash.slice(1);
  openView(initialView === "roadmap" || initialView === "chats" || initialView === "groups" ? initialView : "overview");
});
