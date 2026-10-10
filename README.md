# RoadMaat

RoadMaat is een white-label digitaal platform voor chauffeurs in de transportsector. Het platform combineert een sociaal netwerk, kennisdeling, begeleiding en praktische locatie-informatie in één centrale ervaring.

Deze versie is opnieuw opgebouwd als moderne Next.js-app met Next.js API-routes, Prisma en PostgreSQL.

## Deployen naar Vercel met GoDaddy domein

Deze app is gebouwd voor deploys op Vercel. Dat is de juiste keuze voor een Next.js-app met auth, API-routes en database.

### 1. Code naar GitHub

```bash
git init
git add .
git commit -m "RoadMaat app foundation"
git branch -M main
git remote add origin https://github.com/<jouw-gebruikersnaam>/<jouw-repo>.git
git push -u origin main
```

### 2. Deploy op Vercel

1. Ga naar https://vercel.com
2. Klik op "Add New Project"
3. Kies je GitHub repo
4. Vercel detecteert automatisch Next.js
5. Klik op "Deploy"

### 3. Domein koppelen via GoDaddy

In Vercel:
- Ga naar je project
- Open "Settings" > "Domains"
- Voeg toe: `roadmaat.nl`
- Voeg ook toe: `www.roadmaat.nl`

Vercel geeft je daarna de DNS-records. Voor de meest gangbare setup:

- `A` record voor `@` -> `76.76.21.21`
- `CNAME` record voor `www` -> `cname.vercel-dns.com`

In GoDaddy:
1. Open je domein
2. Ga naar "DNS Management"
3. Verwijder eventuele oude records die conflicteren
4. Voeg bovenstaande records toe
5. Sla op

Na enkele minuten tot 48 uur is de domain doorgegaan.

### 4. Production environment variables

Maak in Vercel een Environment Variable aan met:

```env
DATABASE_URL="postgresql://..."
SESSION_SECRET="een-lang-random-geheim"
NEXT_PUBLIC_APP_URL="https://roadmaat.nl"
```

De Vercel Prisma Postgres-database levert `DATABASE_URL`. De sessiesleutel moet een geheime willekeurige waarde van minstens 32 tekens zijn. Stel beide alleen in Vercel in; commit geen geheimen.

### 5. Lokale ontwikkeling

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

Maak voor lokaal gebruik eerst een PostgreSQL-database en zet de connection string in `.env.local` als `DATABASE_URL`. Productieschema-migraties worden vóór de Vercel-production-build uitgevoerd. Preview builds draaien geen productiemigraties.

Open daarna:

```text
http://localhost:3000
```

### 6. Alternatief: GitHub Pages

GitHub Pages werkt alleen voor statische websites. Voor deze app is Vercel de juiste keuze, omdat Next.js API-routes, auth en backend-logic niet goed op GitHub Pages draaien.

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
- `chauffeur.html` — een compacte chauffeursdemo met Mijn overzicht, RoadMap, Activiteiten, Vragen en advies, Chat-groepen en de vaste chat Planning.

Beide pagina's gebruiken een donker kleurenthema met groene chataccenten en gele RoadMap-accenten en bevatten geen AB Texel-logo. Het eenvoudige RoadMaat-beeldmerk staat in `roadmaat-icon.svg`; `roadmaat-touch-icon.png` is het 180 × 180 startschermicoon voor iPhone/iPad.

De chauffeursdemo bevat ook `Activiteiten`: een interactieve Leaflet-kaart met zeven voorbeeldactiviteiten, zoek- en categorie-filters, deelnemers en een detailkaart. Het bedrijfsfilter is alleen in deze module beschikbaar en biedt `Mijn bedrijf`, `Toon alle bedrijven` en een bedrijfskeuze; elke activiteit toont het gekoppelde bedrijf en nieuwe activiteiten krijgen automatisch het bedrijf van het actieve profiel. Locatietoegang wordt alleen gebruikt na een expliciete klik; deelname is geblokkeerd op meer dan 25 km en zolang de afstand niet kan worden bepaald. Eén aangeleverde activiteit heeft in de voorbeelddata de status `too_far`. Nieuw aangemaakte activiteiten worden lokaal in de browser opgeslagen. Koelmotorvriendelijke parkeerplekken en stroompalen worden als onbekend getoond; er zijn geen betrouwbare locatiegegevens meegeleverd. Aanmelden, verzoeken en voicechat zijn uitsluitend demo-interacties: er is geen backend, echte audio of gekoppelde chauffeurschat.

De chauffeursdemo start op RoadMap en toont lokaal weer, windkracht in Beaufort en windrichting na toestemming voor locatie, naast het actieve bedrijfsaccount. RoadMap begint met de tab `Alles` en een kaartweergave ingezoomd op Nederland. De lijst bevat de openbare [AB Texel-locaties](https://abtexel.com/locaties) en de bestaande locatiecategorieën; kies een andere tab om de locaties te filteren. De AB Texel-markeringen omvatten vestigingen in Nederland, België, Duitsland, Frankrijk en het Verenigd Koninkrijk; waar geen publiek straatadres is gevonden, staat een pin bij benadering op plaatsniveau. De officiële pagina's van Bosman Transport (Nisse) en AB Texel UK (Whittlesey) noemen expliciet een werkplaats; beide zijn als garage/werkplaats gemarkeerd. Controleer routes en actuele toegang altijd via de bronlink en planning. Het filter Bandenservice toont direct de gedeelde kaart met 756 punten; Fabrieken toont alle vijf locaties als routepunten op Google Maps. Klik een fabriek aan om de andere fabrieken tijdelijk te verbergen en de aankomst- en losinstructies in een uitklapveld te bekijken. Met `Toon alle fabrieken` verschijnt de complete lijst weer. Je kunt inwegen, hekcode, portiermelding en trailer afkoppelen bij het dok of op de parking aanpassen; demo-instructies worden alleen lokaal in de browser opgeslagen en moeten voor echt gebruik bij de planning worden gecontroleerd. De kaart gebruikt Leaflet en OpenStreetMap-tegels met zichtbare bronvermelding. Weergegevens komen van [Open-Meteo](https://open-meteo.com/). De Vraagbaak opent direct de WhatsApp-groepschat `AB Texel B.V. - Vraagbaak`; Chat-groepen toont ook een WhatsApp-achtige lijst met chauffeurs en de groep `Fryse Pieper riiders` (met Friese vlag). Het tabblad `Planning` bevat één vaste WhatsApp-achtige voorbeeldchat met `Planning Texel` en een voorbeeldritupdate; het is nadrukkelijk geen echte ritplanning en ontvangt geen live berichten. De overzichtspagina gebruikt een quotevak met aanhalingstekens en herkenbare chatpictogrammen en chatkleuren. De privéchat is met Klaas Smit en gebruikt een DAF-logo uit [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:DAF_logo.svg) als demo-avatar. Chatberichten werken tijdelijk in de browser; er is geen backend of echte chauffeursdata.

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
