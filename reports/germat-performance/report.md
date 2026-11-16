# Prestatiebenchmark Germat-webshop

**Onderbouwde nulmeting van de publieke website en voorlopige technische beoordeling van CuppaCode**  
Meetdatum: 16 november 2026 · Lighthouse 13.6.0 · 30 voltooide labmetingen

## Samenvatting

De publieke Germat WooCommerce-webshop heeft op basis van Lighthouse-labmetingen duidelijke aandachtspunten voor visuele stabiliteit en mobiel laden:

- De mediane desktop-**Cumulative Layout Shift (CLS)** is slecht op alle vijf onderzochte paginatypen: **0,83–0,89**.
- De mediane mobiele **Largest Contentful Paint (LCP)** loopt uiteen van **2,47 s** op de contactpagina tot **8,17 s** op de onderzochte productpagina. In dit labprofiel overschrijden de homepage, categorie-, product- en winkelwagenpagina de grens van 4 s voor “slecht”.
- De winkelwagen verdient een afzonderlijk onderzoek: mediane antwoordtijd van het hoofddocument **2,58 s desktop / 2,66 s mobiel**, met **146 / 145 verzoeken** en **2,45 / 2,29 MB** dataverkeer.
- De PageSpeed Insights-API gaf HTTP 429 terug. Er zijn geen CrUX-veldgegevens verkregen; echte Core Web Vitals en INP zijn daarom niet beschikbaar.
- **De productieprestaties van CuppaCode zijn niet gemeten.** De repository beschrijft een demo-webshop met lokale mockdata en een demowinkelwagen/-checkout. Er was geen vergelijkbare publieke productieomgeving beschikbaar; daarom doet dit rapport geen numerieke of procentuele verbeterclaim.

Dit zijn herhaalbare waarnemingen uit drie Lighthouse-labmetingen per pagina en apparaatprofiel, geen diagnose van de Germat-server, het thema, plugins of een specifieke resource. Zie [aanbevelingen.md](./recommendations.md) voor geprioriteerde onderzoeksstappen en [comparison-data.json](./comparison-data.json) / [raw-results.json](./raw-results.json) voor de genormaliseerde medianen en meetgegevens.

## Reikwijdte en methode

| Onderdeel | Details |
|---|---|
| Publieke website | Germat-productiepagina’s op `germat.nl`; alleen-lezen GET-navigaties |
| Paginatypen | Startpagina, categorie, productdetail, contact-/contentpagina, winkelwagen |
| Steekproef | 3 Lighthouse-metingen per pagina × apparaat; 30 voltooid, 0 Lighthouse-runtimefouten |
| Meetvenster | 2026-11-16 20:26:29–20:38:25 UTC |
| Desktopprofiel | 1350 × 940, gesimuleerde RTT 40 ms, 10.240 Kbps, 1× CPU |
| Mobiel profiel | 360 × 800, DPR 2, gesimuleerde RTT 150 ms, 1.638,4 Kbps, 4× CPU; emulatie Android 11 Moto G Power |
| Browser | Lighthouse 13.6.0; host Chrome 157.0.0.0; geëmuleerde Chrome 136-profielen |
| Samenvatting | Mediaan van drie geldige metingen; geen gemiddelden |
| Cache-/locatiebeperking | Lighthouse heeft browseropslag en -cache tussen metingen gewist. De cachetoestand van origin/CDN en de testlocatie zijn niet beheerst. |
| Veldgegevens | PSI-API gaf HTTP 429; er zijn geen URL- of origin-gebonden CrUX-gegevens, waaronder INP, opgehaald. |

Er is geen artikel aan een winkelwagen toegevoegd en er is geen checkout-, betaal- of bestelactie uitgevoerd. De overdracht hieronder is uitgedrukt in decimale MB (1 MB = 1.000.000 bytes) op basis van Lighthouse-netwerkgegevens.

## Lighthouse-resultaten Germat

`LCP` is weergegeven in seconden; `CLS` heeft geen eenheid. Ter referentie: LCP goed ≤2,5 s en slecht >4 s; CLS goed ≤0,10 en slecht >0,25. Deze grenzen maken labmetingen niet tot veldmetingen.

| Pagina | Apparaat | Prestaties | Toegankelijkheid | Best practices | SEO | LCP | CLS | TTFB | Overdracht | Verzoeken |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Startpagina | Desktop | 75 | 83 | 100 | 92 | 0,75 s | 0,895 | 27 ms | 1,02 MB | 70 |
| Startpagina | Mobiel | 57 | 85 | 96 | 92 | 5,96 s | 0,000 | 31 ms | 1,01 MB | 68 |
| Categorie | Desktop | 73 | 85 | 100 | 92 | 1,20 s | 0,882 | 28 ms | 0,75 MB | 65 |
| Categorie | Mobiel | 81 | 86 | 100 | 92 | 4,06 s | 0,001 | 29 ms | 0,75 MB | 62 |
| Productdetail | Desktop | 68 | 88 | 77 | 100 | 1,76 s | 0,881 | 24 ms | 1,37 MB | 87 |
| Productdetail | Mobiel | 66 | 88 | 77 | 100 | 8,17 s | 0,000 | 33 ms | 1,33 MB | 86 |
| Contact/content | Desktop | 75 | 89 | 100 | 92 | 0,66 s | 0,880 | 24 ms | 0,76 MB | 65 |
| Contact/content | Mobiel | 94 | 89 | 100 | 92 | 2,47 s | 0,000 | 29 ms | 0,76 MB | 64 |
| Winkelwagen | Desktop | 67 | 88 | 73 | 61 | 1,26 s | 0,834 | 2.582 ms | 2,45 MB | 146 |
| Winkelwagen | Mobiel | 66 | 88 | 73 | 61 | 4,51 s | 0,000 | 2.663 ms | 2,29 MB | 145 |

Afgeronde weergavewaarden kunnen licht afwijken van de exacte medianen in het JSON-bestand. De TTFB voor de winkelwagen is de Lighthouse-responstijd van het hoofddocument en bewijst op zichzelf geen oorzaak bij server, plugin, database of netwerk.

## Wat de publieke metingen aantonen

### Visuele stabiliteit

De desktopmedianen voor CLS zijn op alle onderzochte templates slecht; de mobiele medianen liggen in deze metingen rond nul. Lighthouse-layoutverschuivingen wijzen herhaaldelijk op veranderingen in media en paginalay-out. Sommige bronafbeeldingen hebben afmetingen. De bevinding rechtvaardigt daarom onderzoek naar effectieve ruimte-reservering en gedrag van wrappers/lazy loading, maar bewijst **niet** dat alle afbeeldingen breedte- en hoogteattributen missen.

Het verschil tussen desktop en mobiel maakt direct onderzoek van de gerenderde desktoplay-out en media-/containerweergave belangrijk. Controleer de betrokken elementen in een browsertrace voordat markup of CSS wordt aangepast.

### Mobiel laden

De mobiele LCP ligt bij vier van de vijf paginatypen boven 4 s, met 8,17 s op de productpagina. De contactpagina is in dit profiel een uitzondering met 2,47 s. LCP is een zichtbare timing, geen oorzaak: combineer het LCP-element met de resourcewaterval, serverrespons en laadgedrag van afbeeldingen en fonts voordat een oplossing wordt gekozen.

De mobiele homepage heeft daarnaast een mediane Total Blocking Time van 553 ms. TBT is een labdiagnose en **geen vervanging voor INP**.

### Reactietijd en omvang van de winkelwagen

De respons van het hoofddocument van de winkelwagen duurt in beide apparaatprofielen circa 2,6 s, tegenover 24–33 ms bij de andere paginatypen. De winkelwagen heeft ook de grootste gemeten overdracht en het hoogste aantal verzoeken. De herhaalde Lighthouse-gegevens bevatten circa 0,47–0,48 MB van Google Tag Manager en circa 0,30 MB van Stripe op de winkelwagen; op de productdetailpagina is circa 0,30 MB van Stripe gemeten. Dit zijn overdrachten tijdens de meting, geen bewijs dat een leverancier of extensie de trage documentrespons veroorzaakte.

De winkelwagen is de duidelijkste kandidaat voor een afzonderlijk onderzoek naar verzoekstijden. Splits de initiële HTML-/documenttijd uit van winkelwagen-/API-verzoeken, origin-verwerking, redirects en externe scripts. Cache gepersonaliseerde winkelwagenresponses niet als snelle oplossing.

### Aanwijzingen uit de publieke website

De geïnspecteerde homepage-response identificeert WordPress, WooCommerce, Elementor, Hello Elementor en nginx. De gedecodeerde HTML-response van de homepage was circa 1,84 MB, met 54 stylesheetlinktags en 45 scriptverwijzingen. Dit zijn observaties aan de bron, niet de Lighthouse-overdrachtsom of het aantal unieke geïnstalleerde plugins. De response vermeldde `Cache-Control: max-age=0, no-cache, no-store, must-revalidate`; onderzoek de daadwerkelijke cachelagen en responses voordat conclusies over hosting worden getrokken.

De Lighthouse-netwerkgegevens tonen onder meer responsive WebP-/vooraf geladen afbeeldingen, externe Inter-/IBM Plex-fonts, Trustpilot en Stripe op product-/winkelwagenroutes. Scripts en resources kunnen vertraagd of na interactie worden geladen; hun aanwezigheid in de capture bewijst niet dat ze de eerste weergave blokkeren.

## CuppaCode: voorlopige technische beoordeling

**Status: alleen broncode beoordeeld; productiemeting niet beschikbaar.** Het Germat-thema in deze repository is nadrukkelijk een showcase: het gebruikt `local-mock`, demoproducten en demo-beschikbaarheid, en een winkelwagen in het geheugen. De checkout verstuurt geen WooCommerce-bestelling en verwerkt geen betaling. De publieke Germat-website en deze lokale demo zijn verschillende systemen en omgevingen; een vergelijking van Lighthouse-metingen zou misleidend zijn.

Technische bevindingen en afwegingen:

- De Germat-demo kiest `MockCommerceProvider` (`src/config/theme.ts`, `src/commerce/provider.ts`). Er bestaat ook een WooCommerce-provider voor geconfigureerde storefronts, maar dat maakt de Germat-demo niet tot een productie-integratie.
- De commerce-homepage-, categorie- en productroutes zijn ingesteld op `force-dynamic` (`src/app/page.tsx`, `src/app/category/[slug]/page.tsx`, `src/app/product/[slug]/page.tsx`). Hun huidige gedrag mag niet als statisch gecachet worden beschreven.
- WordPress-CMS-verzoeken gebruiken tijdgebaseerde revalidatie van één uur (`src/content/wordpress/wordpress-content-provider.ts`). CMS-caching staat los van de commerceroutes en is afhankelijk van productieconfiguratie en -deployment.
- Next.js-afbeeldingsoptimalisatie gebruikt een expliciete allowlist van externe origins (`next.config.ts` en `src/config/cms-media.ts`). De rootlayout laadt Manrope via `next/font/google` (`src/app/layout.tsx`).
- De rootlayout bevat een client-side `CartProvider`, die na het laden `/api/cart` opvraagt. De categorie-/productinterface bevat eveneens client-side interactiegrenzen (`src/components/cart/cart-provider.tsx`, `src/components/product/product-catalog.tsx`). Deze grenzen ondersteunen functionaliteit, maar de kosten voor JavaScript en netwerk moeten in een productieachtige build worden gemeten.
- Productverzoeken aan WooCommerce gebruiken in de clientwrapper een revalidatie van 60 seconden; winkelwagenverzoeken gebruiken expliciet `no-store` (`src/commerce/providers/woocommerce/woocommerce-client.ts`). Controleer runtime- en cachegedrag, vooral de scheiding tussen publieke catalogus en gepersonaliseerde winkelwagen.

De bronarchitectuur biedt bruikbare mogelijkheden—server-gerenderde routes, een contentprovider-abstractie, afbeeldingsoptimalisatie en zelf gehoste fonts—maar garandeert geen snellere productie-ervaring zonder vergelijkbare metingen. De dynamische routes, clientbundel, providerverzoeken, hosting, cacheheaders en externe integraties zijn nog niet gemeten.

## Beperkingen en volgende meting

1. Beschouw de Germat-resultaten als een Lighthouse-labnulmeting, niet als veldgegevens van echte gebruikers of een causale audit.
2. CrUX-/PSI-veldgegevens en INP ontbreken; de PSI-endpoint gaf HTTP 429 terug.
3. Het wissen van browsercache was beheerst; de cachewarmte van origin/CDN en de testlocatie niet.
4. Er was geen CuppaCode-productiedeployment, productieprovider of overeenkomstig publiek verkeer beschikbaar. Er wordt geen CuppaCode-metriek of meetbaar verschil gerapporteerd.
5. Voor een vergelijking: deploy CuppaCode naar een productieachtige omgeving met geverifieerde data/provider, overeenkomstige routes en gelijkwaardige apparaat-/netwerkprofielen. Voer minstens drie metingen per route/apparaat uit, leg response-/cachecondities vast en verzamel veldgegevens wanneer beschikbaar.
6. Bewaar exacte meetgegevens en gebruik browsertraces per route om oorzaken te bevestigen voordat prestatieaanpassingen worden uitgevoerd.

## Offerte CuppaCode × Germat

### Investering en dienstverlening

Met de CuppaCode-storefront krijgt Germat een moderne, snelle en gebruiksvriendelijke webshopfrontend, terwijl de bestaande WooCommerce-omgeving behouden blijft voor productbeheer, voorraad en bestellingen. De onderstaande prijsopgave is een afzonderlijk commercieel voorstel en geen gemeten resultaat of prestatieclaim.

#### 1. Eenmalige implementatie — € 3.250 exclusief btw

Inbegrepen:

- Ontwerp en realisatie van de Germat-storefront.
- Responsive weergave voor desktop, tablet en mobiel.
- Integratie met de bestaande WooCommerce-omgeving.
- Producten, categorieën en productvarianten.
- Winkelwagen en het afgesproken bestelproces.
- Integratie van WordPress-pagina’s.
- Technische optimalisatie en kwaliteitscontrole.
- Configuratie en livegang op Vercel.

#### 2. Maandelijkse dienstverlening — € 149 exclusief btw per maand

Inbegrepen:

- Hosting en deployment via Vercel.
- SSL-certificaat en CDN.
- Uptime- en technische monitoring.
- Kleine technische updates en correcties.
- Onderhoud van de storefront.
- Ondersteuning bij technische problemen.
- Tot 30 minuten kleine aanpassingen per maand.

Grotere wijzigingen, nieuwe functionaliteiten en uitbreidingen worden vooraf besproken en apart geoffreerd.

#### 3. Contractvoorwaarden

- Initiële looptijd: 3 maanden; daarna maandelijks opzegbaar.
- Opzegtermijn: 2 kalendermaanden.
- Implementatiekosten: 50% bij opdracht en 50% bij oplevering (€ 1.625 per termijn, exclusief btw).
- Maandelijkse dienstverlening wordt vooraf gefactureerd.
- Eventueel extra infrastructuurverbruik wordt vooraf besproken.
- Bestaande WooCommerce-hosting, domeinregistratie en externe licenties vallen buiten deze offerte.

#### 4. Financieel overzicht

| Onderdeel | Bedrag exclusief btw |
|---|---:|
| Eenmalige implementatie | € 3.250 |
| Maandelijkse dienstverlening | € 149 |
| Jaarlijkse dienstverlening (12 × € 149) | € 1.788 |
| **Totale investering eerste jaar** | **€ 5.038** |

Het totaal voor het eerste jaar is de implementatie plus twaalf maanden dienstverlening. Btw en de expliciet uitgesloten kosten zijn niet inbegrepen.

#### 5. Wat levert dit Germat op?

- Een vernieuwde webshopervaring zonder de bestaande WooCommerce-backend te vervangen.
- Behoud van de vertrouwde WordPress-beheeromgeving.
- Een flexibele frontend die verder ontwikkeld kan worden.
- Een architectuur die voorbereid is op toekomstige uitbreidingen.
- Technisch beheer en ondersteuning door CuppaCode.

**CuppaCode – Modern storefronts, without replacing what already works.**

## Bestanden

- [HTML-rapport](./report.html) — responsieve presentatie met grafieken en vergelijking.
- [Aanbevelingen](./recommendations.md) — geprioriteerde acties zonder ongefundeerde verbeterpercentages.
- [Vergelijkingsgegevens](./comparison-data.json) — medianen en expliciete meetstatus van CuppaCode.
- [Ruwe resultaten](./raw-results.json) — 30 genormaliseerde Lighthouse-metingen.
