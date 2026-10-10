# RoadMaat

RoadMaat is een white-label digitaal platform voor chauffeurs in de transportsector. Het platform combineert een sociaal netwerk, kennisdeling, begeleiding en praktische locatie-informatie in één centrale ervaring.

Deze versie is opnieuw opgebouwd als moderne Next.js-app met Next.js API-routes, Prisma en PostgreSQL.

## Publiceren via GitHub Pages

De statische demo-pagina's (`index.html`, `fleetmanagement.html`, `chauffeur.html`) draaien op GitHub Pages vanaf de `main`-branch en zijn bereikbaar op https://www.roadmaat.nl (domein via het `CNAME`-bestand en een DNS-CNAME `www` -> `ricardoblom-gif.github.io`). Er is geen build nodig.

Lokaal bekijken (nodig voor de OpenStreetMap-kaart):

```bash
py serve.py
```

Open daarna http://localhost:8000/fleetmanagement.html.

De Next.js-bestanden (`app/`, `lib/`, `prisma/`) zijn niet onderdeel van de gepubliceerde site. Lokaal draaien kan met `npm install`, `npx prisma generate` en `npm run dev`, met een eigen PostgreSQL-database in `.env.local` (`DATABASE_URL`, `SESSION_SECRET`).
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

Deze repository bevat statische voorbeeldpagina's, geschikt voor GitHub Pages:

- `index.html` — de introductie- en marktpagina voor bedrijven.
- `chauffeur.html` — een compacte chauffeursdemo met Mijn overzicht, RoadMap, Activiteiten, Vragen en advies, Chat-groepen en de vaste chat Planning.
- `fleetmanagement.html` — een donkere Fleetmanagement-demo met RoadMap-tabbladen, Google Maps, voorbeeldleveranciers, een voorbeeldinbox en snelle links.

Fleetmanagement is op GitHub Pages alleen een visuele demo: er is geen beveiligde admin-login, WhatsApp Cloud API, AI-koppeling, Excel-import of gedeelde opslag. Demo-wijzigingen zijn tijdelijk in de browser. Gebruik geen echte persoonsgegevens of geheimen op deze pagina.

De chauffeurs- en Fleetmanagement-demo gebruiken een donker thema met groene accenten; RoadMap gebruikt ook gele accenten. De Fleetmanagement-demo gebruikt uitsluitend fictieve voorbeeldgegevens. Het eenvoudige RoadMaat-beeldmerk staat in `roadmaat-icon.svg`; `roadmaat-touch-icon.png` is het 180 × 180 startschermicoon voor iPhone/iPad.

De chauffeursdemo bevat ook `Activiteiten`: een interactieve Leaflet-kaart met zeven voorbeeldactiviteiten, zoek- en categorie-filters, deelnemers en een detailkaart. Het bedrijfsfilter is alleen in deze module beschikbaar en biedt `Mijn bedrijf`, `Toon alle bedrijven` en een bedrijfskeuze; elke activiteit toont het gekoppelde bedrijf en nieuwe activiteiten krijgen automatisch het bedrijf van het actieve profiel. Locatietoegang wordt alleen gebruikt na een expliciete klik; deelname is geblokkeerd op meer dan 25 km en zolang de afstand niet kan worden bepaald. Eén aangeleverde activiteit heeft in de voorbeelddata de status `too_far`. Nieuw aangemaakte activiteiten worden lokaal in de browser opgeslagen. Koelmotorvriendelijke parkeerplekken en stroompalen worden als onbekend getoond; er zijn geen betrouwbare locatiegegevens meegeleverd. Aanmelden, verzoeken en voicechat zijn uitsluitend demo-interacties: er is geen backend, echte audio of gekoppelde chauffeurschat.

De chauffeursdemo start op RoadMap en toont lokaal weer, windkracht in Beaufort en windrichting na toestemming voor locatie, naast het actieve bedrijfsaccount. RoadMap begint met de tab `Alles` en een kaartweergave ingezoomd op Nederland. De lijst bevat de openbare [AB Texel-locaties](https://abtexel.com/locaties) en de bestaande locatiecategorieën; kies een andere tab om de locaties te filteren. De AB Texel-markeringen omvatten vestigingen in Nederland, België, Duitsland, Frankrijk en het Verenigd Koninkrijk; waar geen publiek straatadres is gevonden, staat een pin bij benadering op plaatsniveau. De officiële pagina's van Bosman Transport (Nisse) en AB Texel UK (Whittlesey) noemen expliciet een werkplaats; beide zijn als garage/werkplaats gemarkeerd. Controleer routes en actuele toegang altijd via de bronlink en planning. Het filter Bandenservice toont direct de gedeelde kaart met 756 punten; Fabrieken toont alle vijf locaties als routepunten op Google Maps. Klik een fabriek aan om de andere fabrieken tijdelijk te verbergen en de aankomst- en losinstructies in een uitklapveld te bekijken. Met `Toon alle fabrieken` verschijnt de complete lijst weer. Je kunt inwegen, hekcode, portiermelding en trailer afkoppelen bij het dok of op de parking aanpassen; demo-instructies worden alleen lokaal in de browser opgeslagen en moeten voor echt gebruik bij de planning worden gecontroleerd. De kaart gebruikt Leaflet en OpenStreetMap-tegels met zichtbare bronvermelding. Weergegevens komen van [Open-Meteo](https://open-meteo.com/). De Vraagbaak opent direct de WhatsApp-groepschat `AB Texel B.V. - Vraagbaak`; Chat-groepen toont ook een WhatsApp-achtige lijst met chauffeurs en de groep `Fryse Pieper riiders` (met Friese vlag). Het tabblad `Planning` bevat één vaste WhatsApp-achtige voorbeeldchat met `Planning Texel` en een voorbeeldritupdate; het is nadrukkelijk geen echte ritplanning en ontvangt geen live berichten. De overzichtspagina gebruikt een quotevak met aanhalingstekens en herkenbare chatpictogrammen en chatkleuren. De privéchat is met Klaas Smit en gebruikt een DAF-logo uit [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:DAF_logo.svg) als demo-avatar. Chatberichten werken tijdelijk in de browser; er is geen backend of echte chauffeursdata.

De drie voorbeeldpagina's zijn via de navigatie aan elkaar gekoppeld.

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
├── fleetmanagement.html
├── fleetmanagement.js
├── fleetmanagement.css
├── roadmaat-icon.svg
├── roadmaat-touch-icon.png
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
