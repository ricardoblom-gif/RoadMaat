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
- `chauffeur.html` — een compacte chauffeursdemo met vier schermen: Mijn overzicht, RoadMap, Hulp & Mentor en Mijn groepen.

De RoadMap gebruikt Google Maps-zoekresultaten met filters voor truckstops, fabrieken, bandenservice en werkplaatsen. Onder Bandenservice staat de gedeelde Google My Maps-kaart Tyreservice AB Texel met 756 bandenservicepunten. De fabriekslocaties zijn Lamb Weston in Kruiningen, Bergen op Zoom en Oosterbierum, Aviko in Steenderen en Agristo in Tilburg. Locaties zijn zoekverwijzingen: controleer trucktoegang, openingstijden en laad-/losinstructies voor vertrek. Lokaal weer wordt opgehaald via [Open-Meteo](https://open-meteo.com/) nadat de gebruiker toestemming geeft voor locatie. Hulp & Mentor bevat een Mentor-chat, twee privéchats en een groepschat. Chatberichten werken tijdelijk in de browser; er is geen backend of echte chauffeursdata.

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
