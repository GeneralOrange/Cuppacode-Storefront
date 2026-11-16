# Aanbevelingen voor prestaties

De aanbevelingen zijn gebaseerd op de gemeten nulmeting van de publieke Germat-website en een broncodebeoordeling van de CuppaCode-demo. Het zijn kwalitatieve prioriteiten, geen schattingen van procentuele winst. Bevestig relevante browser- en netwerkgegevens voordat wijzigingen worden uitgevoerd.

## Hoogste prioriteit — stabiliseer de desktopindeling

**Bewijs:** De desktop-CLS is 0,834–0,895 op alle vijf paginatypen. De mobiele CLS ligt in dezelfde Lighthouse-metingen rond nul.

1. Leg desktop-browsertraces vast voor homepage, categorie, product, contact en winkelwagen. Identificeer exact welke elementen verschuiven en wanneer.
2. Controleer wrappers van afbeeldingen/video, responsive bronwissels, fonts, banners, reviewwidgets en lazy-loaded secties op gereserveerde ruimte en laat geladen CSS/content die de layout verandert.
3. Vergelijk die bevindingen met bestaande breedte-/hoogtemetadata. Voeg niet willekeurig afmetingen toe: de metingen tonen niet aan dat alle bronafbeeldingen afmetingen missen.
4. Los de bevestigde oorzaak op en meet de getroffen desktoproutes opnieuw met hetzelfde profiel. Controleer de zichtbare layout ook op tussenliggende breedtes.

**Acceptatiebewijs:** De vastgestelde verschuivingen komen niet meer terug in herhaalde traces en de betrokken paginatemplates blijven stabiel in meerdere desktopmetingen. Volg CLS tegenover de grens van 0,10 voor “goed”; leid geen sitebreed resultaat af van één route.

## Hoogste prioriteit — onderzoek de responstijd van de winkelwagen

**Bewijs:** De TTFB-medianen van het hoofddocument zijn 2.582 ms desktop en 2.663 ms mobiel; andere paginatypen zitten op 24–33 ms. De winkelwagen draagt 2,29–2,45 MB over in circa 145–146 verzoeken.

1. Verzamel browsertraces en server-side verzoekstijden voor de winkelwagen, inclusief redirects, HTML-response, winkelwagen-/API-verzoeken en origin-verwerking.
2. Vergelijk herhaalde koude en warme metingen met een beheerste testlocatie en origin-/CDN-cachetoestand. Leg response-status, headers en tijden per stap vast.
3. Stel vast of de trage rootresponse wordt veroorzaakt door origin-werk, cache-bypass, middleware, sessiebeheer of een andere laag voordat caching of applicatiecode wordt aangepast.
4. Behoud correcte personalisatie. Plaats winkelwagen-/sessieresponses nooit in een gedeelde cache; controleer cachekeys en `no-store`-gedrag.
5. Onderzoek JavaScript en overdracht door externe partijen afzonderlijk. De captures bevatten circa 0,47–0,48 MB van Google Tag Manager en 0,30 MB van Stripe, maar bewijzen niet dat deze de trage HTML-response veroorzaken.

**Acceptatiebewijs:** Een trace identificeert een reproduceerbare vertragingsoorzaak; elke wijziging wordt opnieuw getest met dezelfde route, apparaatprofielen en winkelwagen-/sessiesemantiek.

## Hoge prioriteit — verbeter mobiele LCP per paginatemplate

**Bewijs:** Mediane mobiele LCP: homepage 5,96 s, categorie 4,06 s, product 8,17 s en winkelwagen 4,51 s. Contact/content is 2,47 s. Dit zijn labmetingen; het LCP-element en kritieke pad moeten nog worden bevestigd.

1. Leg het LCP-element en de verzoekketen voor elke trage template vast. Onderscheid vertraagde HTML, ontdekking/prioriteit van afbeeldingen, responsive afbeeldingskeuze, vertraging door fonts/CSS en client-side rendering.
2. Controleer hero- en productafbeeldingen op geschikte responsive varianten, intrinsieke afmetingen, compressie en juiste laadprioriteit. Geef media onder de vouw geen onnodige prioriteit.
3. Beoordeel render-blocking CSS en fontladen aan de hand van de echte waterval. De publieke bron verwijst naar Inter/IBM Plex; bevestig welke bestanden worden gebruikt en of fallback/fontwissels bijdragen aan layoutverschuiving of LCP.
4. Onderzoek de winkelwagen apart: mobiele LCP van 4,51 s gaat samen met een trage rootresponse en grote overdracht. Pak de bevestigde bottleneck aan, niet zomaar een willekeurig bestand.
5. Herhaal na iedere samenhangende wijziging het mobiele profiel van 360×800, DPR 2, met meerdere metingen en tracegegevens.

**Acceptatiebewijs:** LCP verbetert consistent op routeniveau en het gekozen LCP-element is bekend. De contactpagina is een interne referentie, geen garantie voor andere routes.

## Hoge prioriteit — beperk onnodig werk op de winkelwagenpagina

**Bewijs:** De winkelwagenmeting heeft de grootste overdracht en het hoogste aantal verzoeken; JavaScript-overdracht is circa 1,35 MB. Ook GTM- en Stripe-verzoeken zijn gemeten.

1. Splits overgedragen bytes en uitvoeringskosten uit per first-party script, tagmanager, betaalbibliotheek en andere externe code. Controleer of elke resource nodig is bij de eerste weergave van de winkelwagen.
2. Stel optionele tags uit of beperk hun scope alleen als toestemming, analyticsvereisten en betaalgedrag dit toelaten. Behoud betaalveiligheid en correcte checkout.
3. Inspecteer de initiële verzoekketen en herhaalde assetlading van de winkelwagen; onderscheid document-/API-verzoeken van statische resources.
4. Leg de interactietoestand van de Lighthouse-capture vast: vertraagde resources kunnen tijdens de capture alsnog laden. Vergelijk een verse navigatie met een gedocumenteerd, reproduceerbaar interactiepad.

**Acceptatiebewijs:** Een inventaris per resource legt vast wat behouden blijft, wanneer het laadt en waarom. Controleer dat winkelwagen- en betaalfunctionaliteit intact blijven.

## Middelhoge prioriteit — valideer CuppaCode als productieomgeving

**Bewijs:** Het Germat-thema in de repository is een lokale mock-webshop; de routes vormen geen productie-equivalente deployment. CuppaCode-metrieken zijn niet beschikbaar.

1. Deploy eerst naar een representatieve productieachtige host, verbind geverifieerde product-/contentgegevens en documenteer provider-, cache-, afbeeldings-, font- en externe configuratie.
2. Houd caching van de publieke catalogus gescheiden van de gepersonaliseerde winkelwagen. De repository heeft commerce-routes met `force-dynamic`, WordPress-CMS-revalidatie na één uur en winkelwagenverzoeken met `no-store` in de WooCommerce-client. Controleer het gedrag van de deployment; neem niet aan dat codesettings één-op-één overeenkomen met iedere hostinglaag.
3. Meet routes en bundelkosten voor `/`, een categorie, een product, `/contact` en `/cart` met gelijkwaardige viewports, netwerk-/CPU-profielen, aantallen metingen en cachecondities.
4. Beoordeel of het verzoek van de root-`CartProvider` nodig is op routes waar geen winkelwagen wordt gebruikt en houd client-side catalogusinteracties gericht. Wijzig dit pas na controle van gebruikerservaring en dataconsistentie.
5. Rapporteer geen prestatiewinst of percentage voordat beide systemen vergelijkbaar in productie zijn gemeten en veldgegevens beschikbaar zijn waar van toepassing.

**Acceptatiebewijs:** Een gedocumenteerde productiemeetset met overeenkomstige routes, herhaalde metingen, cache-/omgevingsmetadata, ruwe resultaten en waar mogelijk CrUX-veldgegevens.

## Zorgvuldigheid bij metingen

- Houd labgegevens (Lighthouse) gescheiden van veldgegevens (CrUX); TBT is geen INP.
- Bewaar ruwe meetbestanden en noteer toolversie, browser, apparaatprofiel, cachestatus, datum en testlocatie.
- Trek geen causale conclusies uit correlaties, zoals een groot script of een pluginlijst, zonder trace of gecontroleerde test.
- Meet desktop en mobiel opnieuw na wijzigingen aan layout, assets, caching, providers of JavaScript.
- Controleer toegankelijkheid en winkelwagen-/checkoutgedrag naast prestaties; lever geen juistheid of toegankelijkheid in voor een score.
