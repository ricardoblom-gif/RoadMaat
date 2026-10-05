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
- `chauffeur.html` — een interactieve demo van RoadMaat zoals een chauffeur die kan zien en gebruiken.

De chauffeursdemo bevat voorbeeldberichten, een ritoverzicht, een kaartillustratie met handige plekken, groepen en hulp van Helpers. De demo gebruikt geen echte chauffeursgegevens of backend. Likes, het plaatsen van een bericht en het stellen van een vraag werken alleen tijdelijk in de browser.

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
├── chauffeur.css
├── chauffeur.js
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
