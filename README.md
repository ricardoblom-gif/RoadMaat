# RoadMaat

RoadMaat is een white-label digitaal platform voor chauffeurs in de transportsector. Het platform combineert een sociaal netwerk, kennisdeling, begeleiding en praktische locatie-informatie in één centrale ervaring.

Tagline: “Onderweg sta je er nooit alleen voor.”

## Doel

Chauffeurs moeten snel toegang hebben tot:
- praktische info over klanten, parkeerplaatsen, restaurants en voorzieningen
- ervaringen van collega-chauffeurs
- hulp van ervaren mentors
- gesloten groepen en chats voor teams of divisies
- een centrale social feed voor updates en evenementen

## Kernonderdelen

1. Community
2. Help & Mentor
3. RoadMap
4. Groups & Chat
5. Knowledge

## Voorbeeldwebsites

Deze repository bevat twee statische voorbeeldpagina's, geschikt voor GitHub Pages:

- `index.html` — de introductie- en marktpagina voor bedrijven.
- `chauffeur.html` — een compacte chauffeursdemo met vier schermen: Mijn overzicht, RoadMap, Vragen chat/mentor en Chats.

Beide pagina's gebruiken een lichtblauw kleurenthema en bevatten geen AB Texel-logo.

De chauffeursdemo toont lokaal weer, windkracht in Beaufort en windrichting na toestemming voor locatie, naast het actieve bedrijfsaccount. Op mobiel en desktop hebben de account- en weerkaarten dezelfde afmetingen. In de RoadMap opent het filter Bandenservice direct de gedeelde kaart met 756 punten; Fabrieken toont alle vijf locaties als routepunten op Google Maps. Klik een fabriek aan om de andere fabrieken tijdelijk te verbergen en de aankomst- en losinstructies in een uitklapveld te bekijken. Met `Toon alle fabrieken` verschijnt de complete lijst weer. Je kunt inwegen, hekcode, portiermelding en trailer afkoppelen bij het dok of op de parking aanpassen; demo-instructies worden alleen lokaal in de browser opgeslagen en moeten voor echt gebruik bij de planning worden gecontroleerd. Weergegevens komen van [Open-Meteo](https://open-meteo.com/). De Vraagbaak opent direct de WhatsApp-groepschat `AB Texel B.V. - Vraagbaak`; Chat-groepen toont ook een WhatsApp-achtige lijst met chauffeurs en de groep `Fryse Pieper riiders` (met Friese vlag). De overzichtspagina gebruikt een quotevak met aanhalingstekens en herkenbare chatpictogrammen en chatkleuren. De labels `Mijn overzicht`, `RoadMap`, `Vragen & mentor chat` en `Chat-groepen` zijn gelijk op de snelkoppelingen, zijbalk en mobiele navigatie. De privéchat is met Klaas Smit en gebruikt een DAF-logo uit [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:DAF_logo.svg) als demo-avatar. Chatberichten werken tijdelijk in de browser; er is geen backend of echte chauffeursdata.

Beide pagina's zijn bereikbaar via de navigatie op de site.

## Snel starten

Open een terminal in deze map en voer uit:

```bash
python -m http.server 8000
```

Open daarna in de browser:

```text
http://localhost:8000
```

## GitHub Pages

1. Push deze map naar een GitHub-repository.
2. Ga naar de repository-instellingen.
3. Kies `Pages`.
4. Selecteer de branch `main` en de map `/ (root)`.
5. Sla op.

De site is dan beschikbaar via:

```text
https://<jouw-gebruikersnaam>.github.io/<repositorynaam>/
```

## Projectstructuur

```text
.
├── index.html
├── styles.css
├── script.js
├── chauffeur.html
├── chauffeur.js
├── chauffeur.css
├── README.md
├── .gitignore
└── .github/
```

## Uitbreidingsideeën

- login en profielpagina
- chat- en group-functionaliteit
- kaart met markers voor parkeerplaatsen en routes
- moderatie- en admin-dashboard
- white-label configuratie per bedrijf/divisie

## Licentie

Voorbeeldproject, vrij te gebruiken als conceptbasis voor verdere ontwikkeling.
