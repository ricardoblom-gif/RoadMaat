document.addEventListener("DOMContentLoaded", () => {
  const panels = [...document.querySelectorAll("[data-panel]")];
  const navigation = [...document.querySelectorAll("[data-view]")];
  const toast = document.getElementById("toast");
  let toastTimer;
  const factoryMapUrl = "https://www.google.com/maps/dir/?api=1&origin=Lamb+Weston+Kruiningen&destination=Agristo+Tilburg&waypoints=Lamb+Weston+Bergen+op+Zoom%7CLamb+Weston+Oosterbierum%7CAviko+Steenderen&output=embed";
  const factoryDirectionsUrl = "https://www.google.com/maps/dir/?api=1&origin=Lamb+Weston+Kruiningen&destination=Agristo+Tilburg&waypoints=Lamb+Weston+Bergen+op+Zoom%7CLamb+Weston+Oosterbierum%7CAviko+Steenderen";

  const locations = [
    { category: "abtexel", name: "AB Texel · Oudeschild", location: "Nederland · hoofdkantoor", query: "AB Texel Schilderweg 263 Oudeschild Netherlands", address: "Schilderweg 263, 1792 CJ Oudeschild", mapCoords: [53.0417498, 4.8468636], sourceUrl: "https://abtexel.com/locaties/7/ab-texel-nederland", description: "Hoofdkantoor en vestiging van AB Texel Nederland. AB Texel meldt dat het bedrijf vanuit vestigingen in Nederland, België, Duitsland, Frankrijk en Groot-Brittannië werkt.", details: "Officieel adres · AB Texel Nederland", symbol: "A" },
    { category: "abtexel", name: "AB Texel · 't Zand", location: "Nederland · Distribution", query: "AB Texel Distribution Kanaalkade 68 t Zand Netherlands", address: "Kanaalkade 68, 1756 AD 't Zand", mapCoords: [52.8436923, 4.7575617], sourceUrl: "https://abtexel.com/locaties/122/ab-texel-distribution", description: "AB Texel Distribution. De kaartpin is bij benadering op plaatsniveau; controleer het adres en de toegang via de officiële vestigingsinformatie.", details: "Officieel adres · AB Texel Distribution", symbol: "A" },
    { category: "abtexel", name: "AB Texel · Heerenveen", location: "Nederland · Liquid Food en Silo", query: "AB Texel Mercurius 6 Heerenveen Netherlands", address: "Mercurius 6, 8448 GX Heerenveen", mapCoords: [52.9666222, 5.9364466], sourceUrl: "https://abtexel.com/locaties/2/ab-texel-liquid-food", description: "Vestigingsadres voor AB Texel Liquid Food en Silo. De kaartpin is bij benadering op plaatsniveau; volg voor bezoek de officiële adres- en routegegevens.", details: "Officieel adres · AB Texel Liquid Food / Silo", symbol: "A" },
    { category: "abtexel", name: "AB Texel Fresh · 's-Hertogenbosch", location: "Nederland · Fresh", query: "AB Texel Fresh Graaf van Solmsweg 52B s-Hertogenbosch Netherlands", address: "Graaf van Solmsweg 52B, 5222 BP 's-Hertogenbosch", mapCoords: [51.6889387, 5.303116], sourceUrl: "https://abtexel.com/locaties/13/ab-texel-fresh", description: "AB Texel Fresh. De kaartpin is bij benadering op plaatsniveau; controleer de exacte locatie en bezoekinstructies vooraf.", details: "Officieel adres · AB Texel Fresh", symbol: "A" },
    { category: "abtexel", name: "Bosman Transport · Nisse", location: "Nederland · werkplaats", query: "Bosman Transport Drieweg 7 Nisse Netherlands", address: "Drieweg 7, 4443 RD Nisse", mapCoords: [51.4560564, 3.8569573], sourceUrl: "https://abtexel.com/locaties/5/bosman-transport", facilityType: "garage", description: "Bosman Transport vermeldt dat de werkplaats op dezelfde locatie zit als de andere bedrijfsafdelingen. Kaartpin bij benadering op plaatsniveau; controleer de actuele toegang vooraf.", details: "Officieel adres · Werkplaats volgens Bosman Transport", symbol: "G" },
    { category: "abtexel", name: "AB Texel Special Transport · Eastermar", location: "Nederland · Special Transport", query: "AB Texel Special Transport Mounekamp 4 Eastermar Netherlands", address: "Mounekamp 4, 9261 XC Eastermar", mapCoords: [53.1742132, 6.0620458], sourceUrl: "https://abtexel.com/locaties/136/ab-texel-special-transport", description: "Nederlandse vestiging van AB Texel Special Transport. Kaartpin bij benadering op plaatsniveau; controleer de officiële route- en toegangsinformatie.", details: "Officieel adres · AB Texel Special Transport", symbol: "A" },
    { category: "abtexel", name: "AB Texel · Broekhuizenvorst", location: "Nederland · nevenvestiging", query: "AB Texel Broekhuizenvorst Netherlands", address: "Broekhuizenvorst", mapCoords: [51.4958387, 6.1566406], sourceUrl: "https://abtexel.com/locaties/40/ab-texel-nederland-broekhuizenvorst", description: "Nevenvestiging vermeld in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer het precieze adres en toegang vooraf.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel Special Transport · Schoonoord", location: "Nederland · Special Transport", query: "AB Texel Special Transport Schoonoord Netherlands", address: "Schoonoord", mapCoords: [52.8478546, 6.7556906], sourceUrl: "https://abtexel.com/locaties/191/ab-texel-special-transport-schoonoord", description: "Vestiging opgenomen in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer voor bezoek de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel Special Transport · Milsbeek", location: "Nederland · Special Transport", query: "AB Texel Special Transport Milsbeek Netherlands", address: "Milsbeek", mapCoords: [51.7243615, 5.9499476], sourceUrl: "https://abtexel.com/locaties/183/ab-texel-special-transport-milsbeek", description: "Vestiging opgenomen in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer voor bezoek de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel Special Transport · Zevenbergen", location: "Nederland · Zevenbergen-Moerdijk", query: "AB Texel Special Transport Zevenbergen Moerdijk Netherlands", address: "Zevenbergen-Moerdijk", mapCoords: [51.6450443, 4.6061538], sourceUrl: "https://abtexel.com/locaties/187/ab-texel-special-transport-zevenbergen-moerdijk", description: "Vestiging opgenomen in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer voor bezoek de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel · Wehe-den Hoorn", location: "Nederland · vestiging", query: "AB Texel Wehe-den Hoorn Netherlands", address: "Wehe-den Hoorn", mapCoords: [53.3610112, 6.4170762], sourceUrl: "https://abtexel.com/locaties/43/ab-texel-wehe-den-hoorn", description: "Vestiging opgenomen in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer voor bezoek de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel Distribution · Andijk", location: "Nederland · Distribution", query: "AB Texel Distribution Andijk Netherlands", address: "Andijk", mapCoords: [52.7467338, 5.2217929], sourceUrl: "https://abtexel.com/locaties/156/ab-texel-distribution-andijk", description: "Distribution-locatie opgenomen in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel Distribution · Swifterbant", location: "Nederland · Distribution", query: "AB Texel Distribution Swifterbant Netherlands", address: "Swifterbant", mapCoords: [52.5696313, 5.6385192], sourceUrl: "https://abtexel.com/locaties/155/ab-texel-distribution-swifterbant", description: "Distribution-locatie opgenomen in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel Distribution · Utrecht", location: "Nederland · warehouse", query: "AB Texel Distribution Utrecht warehouse Netherlands", address: "Utrecht", mapCoords: [52.0907006, 5.1215634], sourceUrl: "https://abtexel.com/locaties/157/ab-texel-distribution-utrecht-warehouse", description: "Warehouse-locatie opgenomen in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel Distribution · Emmer-Compascuum", location: "Nederland · Distribution", query: "AB Texel Distribution Emmer-Compascuum Netherlands", address: "Emmer-Compascuum", mapCoords: [52.8115315, 7.046206], sourceUrl: "https://abtexel.com/locaties/164/ab-texel-distribution-emmer-compascuum", description: "Distribution-locatie opgenomen in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel Distribution · 's-Heerenberg", location: "Nederland · Distribution", query: "AB Texel Distribution s-Heerenberg Netherlands", address: "'s-Heerenberg", mapCoords: [51.8779448, 6.2548363], sourceUrl: "https://abtexel.com/locaties/172/ab-texel-distribution-s-heerenberg", description: "Distribution-locatie opgenomen in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel Fresh · Barendrecht", location: "Nederland · Fresh", query: "AB Texel Fresh Barendrecht Netherlands", address: "Barendrecht", mapCoords: [51.851938, 4.5293835], sourceUrl: "https://abtexel.com/locaties/179/ab-texel-fresh-barendrecht", description: "Fresh-locatie opgenomen in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel GmbH · Helmstedt", location: "Duitsland · hoofdkantoor", query: "AB Texel GmbH Industriestraße 2a Helmstedt Germany", address: "Industriestraße 2a, 38350 Helmstedt", mapCoords: [52.238556, 10.9965411], sourceUrl: "https://abtexel.com/locaties/3/ab-texel-gmbh", description: "Duitse AB Texel-vestiging; ook AB Texel Feed Deutschland wordt vermeld op dit adres. Kaartpin bij benadering op plaatsniveau; controleer de route voor vertrek.", details: "Officieel adres · AB Texel GmbH / Feed Deutschland", symbol: "A" },
    { category: "abtexel", name: "AB Texel Spezialtransporte · Rheinböllen", location: "Duitsland · Special Transport", query: "AB Texel Spezialtransporte Industriepark Soonwald 26-28 Rheinböllen Germany", address: "Industriepark Soonwald 26-28, 55494 Rheinböllen", mapCoords: [49.9947755, 7.6815483], sourceUrl: "https://abtexel.com/locaties/137/ab-texel-spezialtransporte", description: "Duitse vestiging van AB Texel Special Transport. Kaartpin bij benadering op plaatsniveau; controleer de exacte route- en toegangsgegevens vooraf.", details: "Officieel adres · AB Texel Spezialtransporte", symbol: "A" },
    { category: "abtexel", name: "AB Texel UK · Whittlesey", location: "Verenigd Koninkrijk · werkplaats", query: "AB Texel UK 300 Eastrea Road Whittlesey PE7 2AR United Kingdom", address: "300 Eastrea Road, PE7 2AR Whittlesey, Cambridgeshire", mapCoords: [52.5569101, -0.1068751], sourceUrl: "https://abtexel.com/locaties/6/ab-texel-uk", facilityType: "garage", description: "AB Texel UK vermeldt dat de werkplaats zich op de Whittlesey-vestiging bevindt. Kaartpin bij benadering op plaatsniveau; raadpleeg de officiële adresgegevens voor de actuele route.", details: "Officieel adres · Werkplaats volgens AB Texel UK", symbol: "G" },
    { category: "abtexel", name: "AB Texel UK · Greetham", location: "Verenigd Koninkrijk · vestiging", query: "AB Texel UK Greetham United Kingdom", address: "Greetham", mapCoords: [52.7197281, -0.6295232], sourceUrl: "https://abtexel.com/locaties/126/ab-texel-uk-greetham", description: "Vestigingsvermelding in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer voor bezoek de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel France · Neuville-en-Ferrain", location: "Frankrijk · hoofdkantoor", query: "AB Texel France 17a Rue du Vertuquet 59960 Neuville-en-Ferrain France", address: "17a Rue du Vertuquet, 59960 Neuville-en-Ferrain", mapCoords: [50.756398, 3.162879], sourceUrl: "https://abtexel.com/locaties/8/ab-texel-france", description: "Franse vestiging van AB Texel. Kaartpin bij benadering op plaatsniveau; controleer de actuele adres- en routegegevens op de officiële website.", details: "Officieel adres · AB Texel France", symbol: "A" },
    { category: "abtexel", name: "AB Texel France · Péronne", location: "Frankrijk · vestiging", query: "AB Texel France Peronne France", address: "Péronne", mapCoords: [49.9290847, 2.9323535], sourceUrl: "https://abtexel.com/locaties/176/ab-texel-france-peronne", description: "Vestigingsvermelding in het officiële AB Texel-locatieoverzicht. De kaartpin is bij benadering op plaatsniveau; controleer voor bezoek de actuele adresgegevens online.", details: "AB Texel-vestiging · plaatsniveau, locatie bij benadering", symbol: "A" },
    { category: "abtexel", name: "AB Texel België · Wielsbeke", location: "België · vestiging", query: "AB Texel België Vaartstraat 51 Wielsbeke Belgium", address: "Vaartstraat 51, 8710 Wielsbeke (Ooigem)", mapCoords: [50.9094776, 3.3190923], sourceUrl: "https://abtexel.com/locaties/10/ab-texel-belgie", description: "Belgische vestiging; AB Texel Liquid Food België en AB Texel Feed België gebruiken volgens het openbare locatieoverzicht hetzelfde adres. Kaartpin bij benadering op plaatsniveau.", details: "Officieel adres · AB Texel België / Feed / Liquid Food", symbol: "A" },
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
    { category: "factory", name: "Lamb Weston · Kruiningen", location: "Fabriek · Kruiningen", query: "Lamb Weston Kruiningen", description: "Opgegeven laad-/loslocatie. Controleer het juiste terrein en de aanmeldinstructies met je planning.", details: "Fabriek · Kruiningen", symbol: "F", factoryInfo: { weighIn: "yes", gateCode: "2233#", portier: "Ja, melden bij deur 5", trailer: "dock" } },
    { category: "factory", name: "Lamb Weston · Bergen op Zoom", location: "Fabriek · Bergen op Zoom", query: "Lamb Weston Bergen op Zoom", description: "Opgegeven laad-/loslocatie. Controleer het juiste terrein en de aanmeldinstructies met je planning.", details: "Fabriek · Bergen op Zoom", symbol: "F", factoryInfo: { weighIn: "yes", gateCode: "4821#", portier: "Ja, melden bij de hoofdingang", trailer: "parking" } },
    { category: "factory", name: "Lamb Weston · Oosterbierum", location: "Fabriek · Oosterbierum", query: "Lamb Weston Oosterbierum", description: "Opgegeven laad-/loslocatie. Controleer het juiste terrein en de aanmeldinstructies met je planning.", details: "Fabriek · Oosterbierum", symbol: "F", factoryInfo: { weighIn: "yes", gateCode: "7310#", portier: "Ja, melden bij de portiersloge", trailer: "dock" } },
    { category: "factory", name: "Aviko · Steenderen", location: "Fabriek · Steenderen", query: "Aviko Steenderen", description: "Opgegeven laad-/loslocatie. Controleer het juiste terrein en de aanmeldinstructies met je planning.", details: "Fabriek · Steenderen", symbol: "F", factoryInfo: { weighIn: "yes", gateCode: "4407#", portier: "Ja, aanmelden bij deur 3", trailer: "parking" } },
    { category: "factory", name: "Agristo · Tilburg", location: "Fabriek · Tilburg", query: "Agristo Tilburg", description: "Opgegeven laad-/loslocatie. Controleer het juiste terrein en de aanmeldinstructies met je planning.", details: "Fabriek · Tilburg", symbol: "F", factoryInfo: { weighIn: "no", gateCode: "6154#", portier: "Ja, melden bij de portier", trailer: "dock" } },
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
    abQuestion: {
      name: "AB Texel B.V. - Vraagbaak",
      avatar: "AB",
      avatarClass: "mentor-avatar",
      status: "Groepschat · Mentors online",
      messages: [
        { author: "Monique · Vraagbaak", text: "Hoi Jan! Welkom bij de AB Texel Vraagbaak. Waar kan ik je vandaag mee helpen? 🙂", time: "09:12" },
        { author: "Jan", text: "Ik moet morgen voor het eerst lossen bij een nieuwe klant. Waar kan ik het beste terecht met vragen?", time: "09:14", mine: true },
        { author: "Monique · Vraagbaak", text: "Goed dat je het vraagt! Stuur de klant of locatie maar door, dan denken we met je mee.", time: "09:15" },
        { author: "Peter · Chauffeur", text: "Kijk ook even in de RoadMap. Daar vind je handige aankomst- en losinformatie van collega’s.", time: "09:16" },
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
    klaas: {
      name: "Klaas Smit",
      avatar: "",
      avatarClass: "daf-avatar",
      avatarImage: "https://upload.wikimedia.org/wikipedia/commons/1/12/DAF_logo.svg",
      avatarAlt: "DAF-logo",
      status: "Privéchat · Helper",
      messages: [
        { author: "Jan", text: "Bedankt voor je tip over de chauffeursingang.", time: "Gisteren", mine: true },
        { author: "Klaas", text: "Graag gedaan! Tot bij de volgende stop 👋", time: "Gisteren" },
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

  let activeLocationFilter = "all";
  let selectedFactoryName = null;
  let leafletMap;
  const abLocationMarkers = new Map();

  function setMapMode(mode) {
    const googleMap = document.getElementById("google-map");
    const locationMap = document.getElementById("roadmap-map");
    const mapUnavailable = document.getElementById("map-unavailable");
    const showLocationMap = mode === "all" || mode === "abtexel";
    googleMap.hidden = showLocationMap;
    locationMap.hidden = !showLocationMap || !window.L;
    mapUnavailable.hidden = !showLocationMap || Boolean(window.L);
    if (showLocationMap && !window.L) {
      mapUnavailable.textContent = "De kaart kan niet laden. Bekijk alle actuele vestigingen op de officiële AB Texel-website.";
    }
    if (showLocationMap && leafletMap) window.setTimeout(() => leafletMap.invalidateSize(), 0);
  }

  function initializeAbTexelMap() {
    if (!window.L) return;
    const mapElement = document.getElementById("roadmap-map");
    leafletMap = window.L.map(mapElement, { scrollWheelZoom: false }).setView([52.2, 5.3], 7);
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(leafletMap);

    const markers = [];
    locations.filter((location) => location.category === "abtexel").forEach((location) => {
      const marker = window.L.circleMarker(location.mapCoords, {
        radius: location.facilityType === "garage" ? 9 : 7,
        color: "#ffffff",
        weight: 2,
        fillColor: location.facilityType === "garage" ? "#dc8a1d" : "#087b68",
        fillOpacity: 1,
      }).addTo(leafletMap);
      const popup = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = location.name;
      const address = document.createElement("span");
      address.textContent = location.address;
      const directions = document.createElement("a");
      directions.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.query)}`;
      directions.target = "_blank";
      directions.rel = "noopener noreferrer";
      directions.textContent = "Route en locatie openen ↗";
      popup.append(name, address, directions);
      marker.bindPopup(popup);
      abLocationMarkers.set(location.name, marker);
      markers.push(marker);
    });

    if (markers.length) window.L.featureGroup(markers).addTo(leafletMap);
  }

  function showAllOverview() {
    setMapMode("all");
    if (leafletMap) {
      window.setTimeout(() => {
        leafletMap.invalidateSize();
        leafletMap.setView([52.2, 5.3], 7);
      }, 0);
    }
    document.getElementById("map-caption").textContent = "Alle locaties · start Nederland · OpenStreetMap";
    document.getElementById("maps-link").href = "https://www.google.com/maps/search/?api=1&query=Netherlands";
    document.getElementById("source-link").hidden = false;
    document.getElementById("source-link").href = "https://abtexel.com/locaties";
    document.getElementById("detail-symbol").textContent = "A";
    document.getElementById("detail-symbol").className = "location-symbol abtexel-symbol";
    document.getElementById("detail-name").textContent = "Nederland";
    document.getElementById("detail-kind").textContent = "ALLE LOCATIES";
    document.getElementById("detail-description").textContent = "RoadMap opent met alle locatietypen in de lijst en de kaart ingezoomd op Nederland. Kies een tab om alleen dat type locaties te bekijken.";
    document.getElementById("detail-info").textContent = "AB Texel-vestigingen in West-Europa zijn als kaartmarkeringen weergegeven.";
    document.getElementById("factory-info-editor").hidden = true;
  }

  function showAbTexelOverview() {
    setMapMode("abtexel");
    if (leafletMap && abLocationMarkers.size) {
      window.setTimeout(() => {
        leafletMap.invalidateSize();
        leafletMap.fitBounds(window.L.featureGroup([...abLocationMarkers.values()]).getBounds().pad(0.12), { maxZoom: 7 });
      }, 0);
    }
    document.getElementById("map-caption").textContent = "AB Texel-locaties · OpenStreetMap";
    document.getElementById("maps-link").href = "https://www.google.com/maps/search/?api=1&query=AB+Texel+vestigingen";
    document.getElementById("source-link").hidden = false;
    document.getElementById("source-link").href = "https://abtexel.com/locaties";
    document.getElementById("detail-symbol").textContent = "A";
    document.getElementById("detail-symbol").className = "location-symbol abtexel-symbol";
    document.getElementById("detail-name").textContent = "AB Texel-locaties";
    document.getElementById("detail-kind").textContent = "NEDERLAND · BELGIË · DUITSLAND · FRANKRIJK · VERENIGD KONINKRIJK";
    document.getElementById("detail-description").textContent = "De kaart toont vestigingen en locaties uit de openbare AB Texel-locatielijst. Oranje markeringen tonen werkplaatsen die expliciet op de vestigingspagina's worden genoemd. Kies een locatie voor adres en route.";
    document.getElementById("detail-info").textContent = `${locations.filter((location) => location.category === "abtexel").length} vestigings- en locatiepunten · plaatsmarkers kunnen bij benadering zijn`;
    document.getElementById("factory-info-editor").hidden = true;
  }

  function updateLocationVisibility() {
    const cards = [...document.querySelectorAll(".location-card")];
    cards.forEach((card) => {
      const location = locationDataForCard(card);
      const filteredOut = activeLocationFilter !== "all" && card.dataset.category !== activeLocationFilter;
      const anotherFactory = selectedFactoryName && card.dataset.category === "factory" && location?.name !== selectedFactoryName;
      card.hidden = Boolean(filteredOut || anotherFactory);
    });
    const count = cards.filter((card) => !card.hidden).length;
    document.getElementById("location-count").textContent = `${count} ${count === 1 ? "locatie" : "locaties"}`;
    document.getElementById("show-factories").hidden = !selectedFactoryName;
  }

  function showFactoryOverview() {
    const map = document.getElementById("google-map");
    setMapMode("google");
    map.src = factoryMapUrl;
    map.title = "Google Maps met alle vijf fabriekslocaties";
    document.getElementById("maps-link").href = factoryDirectionsUrl;
    document.getElementById("map-caption").textContent = "Alle 5 fabrieken · Google Maps";
    document.getElementById("source-link").hidden = true;
    document.getElementById("detail-symbol").textContent = "F";
    document.getElementById("detail-symbol").className = "location-symbol factory-symbol";
    document.getElementById("detail-name").textContent = "Alle fabrieken";
    document.getElementById("detail-kind").textContent = "FABRIEKEN";
    document.getElementById("detail-description").textContent = "Selecteer een fabriek uit de lijst voor de aankomst- en losinstructies.";
    document.getElementById("detail-info").textContent = "Kruiningen · Bergen op Zoom · Oosterbierum · Steenderen · Tilburg";
    document.getElementById("factory-info-editor").hidden = true;
  }

  document.getElementById("show-factories").addEventListener("click", () => {
    selectedFactoryName = null;
    document.querySelectorAll(".location-card").forEach((card) => card.classList.remove("selected"));
    updateLocationVisibility();
    showFactoryOverview();
  });

  const factoryInfoStorageKey = "roadmaat-factory-info-v1";
  let savedFactoryInfo = {};
  try {
    const storedFactoryInfo = window.localStorage.getItem(factoryInfoStorageKey);
    if (storedFactoryInfo) {
      const parsedFactoryInfo = JSON.parse(storedFactoryInfo);
      if (!parsedFactoryInfo || typeof parsedFactoryInfo !== "object" || Array.isArray(parsedFactoryInfo)) {
        throw new Error("Saved factory information has an invalid format");
      }
      savedFactoryInfo = parsedFactoryInfo;
    }
  } catch (error) {
    console.error("Opgeslagen fabrieksinformatie kon niet worden geladen.", error);
  }

  function factoryInfoFor(location) {
    const saved = savedFactoryInfo[location.name];
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return location.factoryInfo;
    return {
      weighIn: saved.weighIn === "yes" || saved.weighIn === "no" ? saved.weighIn : location.factoryInfo.weighIn,
      gateCode: typeof saved.gateCode === "string" ? saved.gateCode : location.factoryInfo.gateCode,
      portier: typeof saved.portier === "string" ? saved.portier : location.factoryInfo.portier,
      trailer: saved.trailer === "dock" || saved.trailer === "parking" ? saved.trailer : location.factoryInfo.trailer,
    };
  }

  function addFactoryField(form, labelText, name, value, options) {
    const field = document.createElement("label");
    field.className = "factory-field";
    const label = document.createElement("span");
    label.textContent = labelText;
    const input = options
      ? document.createElement("select")
      : document.createElement("input");
    input.name = name;
    if (options) {
      options.forEach(([optionValue, optionLabel]) => {
        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionLabel;
        option.selected = optionValue === value;
        input.append(option);
      });
    } else {
      input.type = "text";
      input.value = value;
    }
    field.append(label, input);
    form.append(field);
  }

  function renderFactoryInfo(location, editor) {
    editor.replaceChildren();
    const info = factoryInfoFor(location);
    const dropdown = document.createElement("details");
    dropdown.className = "factory-instructions";
    const summary = document.createElement("summary");
    summary.textContent = "Bekijk los- en aankomstinstructies";
    const heading = document.createElement("h3");
    heading.textContent = "Praktische losinformatie";
    const notice = document.createElement("p");
    notice.className = "factory-info-notice";
    notice.textContent = "Voorbeeldgegevens — controleer de actuele instructies altijd bij de planning.";
    const form = document.createElement("form");
    form.className = "factory-info-form";
    addFactoryField(form, "Inwegen", "weighIn", info.weighIn, [["yes", "Ja"], ["no", "Nee"]]);
    addFactoryField(form, "Hekcode", "gateCode", info.gateCode);
    addFactoryField(form, "Melden portier", "portier", info.portier);
    addFactoryField(form, "Trailer na aanmelden", "trailer", info.trailer, [["dock", "Afkoppelen bij het dok"], ["parking", "Trailer afkoppelen op de parking"]]);
    const actions = document.createElement("div");
    actions.className = "factory-info-actions";
    const saveButton = document.createElement("button");
    saveButton.className = "button";
    saveButton.type = "submit";
    saveButton.textContent = "Bewaar informatie";
    const status = document.createElement("span");
    status.className = "factory-save-status";
    status.setAttribute("role", "status");
    actions.append(saveButton, status);
    form.append(actions);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const info = {
        weighIn: formData.get("weighIn"),
        gateCode: formData.get("gateCode").trim(),
        portier: formData.get("portier").trim(),
        trailer: formData.get("trailer"),
      };
      const updatedFactoryInfo = { ...savedFactoryInfo, [location.name]: info };
      try {
        window.localStorage.setItem(factoryInfoStorageKey, JSON.stringify(updatedFactoryInfo));
        savedFactoryInfo = updatedFactoryInfo;
        status.textContent = "Opgeslagen op dit apparaat.";
        showToast("Fabrieksinformatie opgeslagen.");
      } catch (error) {
        console.error("Fabrieksinformatie kon niet worden opgeslagen.", error);
        status.textContent = "Opslaan is niet gelukt. Probeer het opnieuw.";
        showToast("Opslaan is niet gelukt.");
      }
    });
    dropdown.append(summary, heading, notice, form);
    editor.append(dropdown);
  }

  function iconClass(category) {
    return category === "abtexel" ? "abtexel-symbol"
      : category === "truckstop" ? "parking-symbol"
      : category === "factory" ? "factory-symbol"
        : category === "tire" ? "tire-symbol"
          : "workshop-symbol";
  }

  function selectLocation(location, card) {
    if (location.category === "factory") {
      selectedFactoryName = location.name;
      updateLocationVisibility();
    } else if (selectedFactoryName) {
      selectedFactoryName = null;
      updateLocationVisibility();
    }
    document.querySelectorAll(".location-card").forEach((item) => item.classList.toggle("selected", item === card));
    document.getElementById("detail-name").textContent = location.name;
    document.getElementById("detail-kind").textContent = location.location.toLocaleUpperCase("nl-NL");
    document.getElementById("detail-description").textContent = location.description;
    document.getElementById("detail-info").textContent = location.category === "abtexel"
      ? `${location.address} · ${location.details}`
      : location.details;
    const factoryEditor = document.getElementById("factory-info-editor");
    factoryEditor.hidden = location.category !== "factory";
    if (location.category === "factory") renderFactoryInfo(location, factoryEditor);
    const symbol = document.getElementById("detail-symbol");
    symbol.textContent = location.symbol;
    symbol.className = `location-symbol ${iconClass(location.category)}`;
    const isAbLocation = location.category === "abtexel";
    setMapMode(isAbLocation ? "abtexel" : "google");
    if (!isAbLocation) {
      document.getElementById("google-map").src = location.mapUrl || `https://maps.google.com/maps?q=${encodeURIComponent(location.query)}&output=embed`;
    } else {
      const marker = abLocationMarkers.get(location.name);
      if (marker && leafletMap) {
        leafletMap.setView(marker.getLatLng(), 13);
        marker.openPopup();
      }
    }
    document.getElementById("maps-link").href = location.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.query)}`;
    document.getElementById("source-link").hidden = !isAbLocation;
    if (isAbLocation) document.getElementById("source-link").href = "https://abtexel.com/locaties";
    document.getElementById("map-caption").textContent = isAbLocation
      ? "AB Texel-locaties · OpenStreetMap"
      : location.category === "tire" && location.mapUrl
      ? "756 bandenservicepunten · AB Texel"
      : location.category === "factory" ? "Fabriekslocatie"
        : "Kaart via Google Maps";
  }

  function renderLocations() {
    const list = document.getElementById("location-list");
    locations.forEach((location) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "location-card";
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
      category.textContent = location.facilityType === "garage" ? "Garage"
        : location.category === "abtexel" ? "AB"
          : location.category === "truckstop" ? "Stop"
        : location.category === "factory" ? "Info"
          : location.category === "tire" ? "Banden"
            : "Service";
      card.append(symbol, copy, category);
      card.addEventListener("click", () => {
        selectLocation(location, card);
        if (location.category === "factory" && window.matchMedia("(max-width: 760px)").matches) {
          document.getElementById("location-detail").scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      list.append(card);
    });
    updateLocationVisibility();
  }

  function setLocationFilter(category) {
    document.querySelectorAll(".filter-button").forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === category);
    });
    activeLocationFilter = category;
    selectedFactoryName = null;
    document.querySelectorAll(".location-card").forEach((card) => card.classList.remove("selected"));
    document.getElementById("factory-info-editor").hidden = true;
    updateLocationVisibility();

    const map = document.getElementById("google-map");
    const mapLink = document.getElementById("maps-link");
    if (category === "all") {
      showAllOverview();
    } else if (category === "abtexel") {
      showAbTexelOverview();
    } else if (category === "tire") {
      const tyreMap = locations.find((location) => location.category === "tire");
      setMapMode("google");
      document.getElementById("source-link").hidden = true;
      map.src = tyreMap.mapUrl;
      map.title = "Google My Maps met 756 bandenservicepunten van AB Texel";
      mapLink.href = tyreMap.mapsUrl;
      document.getElementById("map-caption").textContent = "756 bandenservicepunten · AB Texel";
      document.getElementById("detail-name").textContent = "756 bandenservicepunten";
      document.getElementById("detail-kind").textContent = "GEDEELDE GOOGLE MY MAPS-KAART";
      document.getElementById("detail-description").textContent = "De volledige gedeelde kaart met bandenservicepunten staat nu direct in beeld. Tik op een markering voor de locatiegegevens.";
      document.getElementById("detail-info").textContent = "Bron: Tyreservice AB Texel";
      document.getElementById("detail-symbol").textContent = "B";
      document.getElementById("detail-symbol").className = "location-symbol tire-symbol";
    } else if (category === "factory") {
      showFactoryOverview();
    } else {
      const firstVisible = [...document.querySelectorAll(".location-card")].find((card) =>
        !card.hidden && (category !== "all" || card.dataset.category !== "abtexel"));
      const location = locationDataForCard(firstVisible);
      if (location) selectLocation(location, firstVisible);
    }
  }

  function openView(name) {
    const validName = panels.some((panel) => panel.dataset.panel === name) ? name : "overview";
    panels.forEach((panel) => {
      const active = panel.dataset.panel === validName;
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });
    navigation.forEach((link) => link.classList.toggle("active", link.dataset.view === validName));
    if (validName === "roadmap") setLocationFilter("all");
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
      image.alt = chat.avatarAlt || chat.name;
      image.className = chat.avatarClass;
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
      setLocationFilter(filter.dataset.filter);
    });
  });

  function locationDataForCard(card) {
    if (!card) return undefined;
    const name = card.querySelector(".location-copy strong").textContent;
    return locations.find((location) => location.name === name);
  }

  function loadLocalWeather() {
    const button = document.getElementById("weather-button");
    const buttonLabel = document.getElementById("weather-button-label");
    const temperature = document.getElementById("weather-temperature");
    const description = document.getElementById("weather-description");
    const icon = document.getElementById("weather-icon");
    button.disabled = true;
    buttonLabel.textContent = "Locatie ophalen…";
    temperature.textContent = "Lokaal weer ophalen…";
    description.textContent = "Je locatie wordt alleen gebruikt voor de weeropvraag.";

    if (!navigator.geolocation) {
      temperature.textContent = "Locatie niet beschikbaar";
      description.textContent = "Deze browser biedt geen locatiefunctie aan.";
      button.disabled = false;
      buttonLabel.textContent = "Probeer opnieuw";
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
        description.textContent = "Lokaal weer · Open-Meteo";
        buttonLabel.textContent = "Vernieuwen";
      } catch (error) {
        console.error("Lokaal weer kon niet worden opgehaald.", error);
        temperature.textContent = "Weer niet beschikbaar";
        description.textContent = "Controleer je internet en probeer het opnieuw.";
        document.getElementById("wind-strength").textContent = "Windkracht —";
        document.getElementById("wind-direction").textContent = "Wind niet beschikbaar";
        buttonLabel.textContent = "Probeer opnieuw";
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
      buttonLabel.textContent = "Toon weer";
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
  initializeAbTexelMap();
  renderChat("abQuestion");
  const initialView = window.location.hash.slice(1);
  openView(initialView === "roadmap" || initialView === "chats" || initialView === "groups" ? initialView : "overview");
});
