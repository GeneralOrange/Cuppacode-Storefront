import type {
  CmsPage,
  ContentProvider,
  Page,
  Post,
} from "@/content/core/content-provider";

const pages: CmsPage[] = [
  {
    id: "mock-over-ons",
    slug: "over-ons",
    title: "Over Germat",
    excerpt: "Maak kennis met Germat en de mensen achter het assortiment.",
    content: [
      "<!-- wp:heading --><h2>Praktische kennis voor iedere klus</h2><!-- /wp:heading -->",
      "<!-- wp:paragraph --><p>Germat helpt vakmensen en doe-het-zelvers bij het vinden van gereedschap en installatiematerialen. Deze demonstratiepagina gebruikt voorbeeldtekst; vervang die met de goedgekeurde informatie uit WordPress.</p><!-- /wp:paragraph -->",
      "<!-- wp:paragraph --><p>Bekijk het <a href=\"/shop\">assortiment</a> of neem contact op voor advies.</p><!-- /wp:paragraph -->",
    ].join(""),
    status: "published",
    parentId: null,
    menuOrder: 1,
  },
  {
    id: "mock-contact",
    slug: "contact",
    title: "Contact",
    excerpt: "Neem contact op met Germat voor vragen over het assortiment.",
    content: [
      "<!-- wp:heading --><h2>We helpen je graag verder</h2><!-- /wp:heading -->",
      "<!-- wp:paragraph --><p>Heb je een vraag over gereedschap of een uitvoering? Neem contact op met het Germat-team. Contactgegevens en openingstijden moeten vóór publicatie met Germat worden afgestemd.</p><!-- /wp:paragraph -->",
      "<!-- wp:paragraph --><p>Bekijk intussen het <a href=\"/shop\">assortiment</a>.</p><!-- /wp:paragraph -->",
    ].join(""),
    status: "published",
    parentId: null,
    menuOrder: 2,
  },
  {
    id: "mock-verzending",
    slug: "verzending",
    title: "Verzendinformatie",
    excerpt: "Voorbeeldpagina voor verzendinformatie.",
    content: [
      "<!-- wp:heading --><h2>Verzending en bezorging</h2><!-- /wp:heading -->",
      "<!-- wp:paragraph --><p>De verzendmethoden, kosten en levertijden op deze mockpagina zijn nog niet bevestigd en vormen geen aanbod.</p><!-- /wp:paragraph -->",
      "<!-- wp:list --><ul><li>Verzendopties worden door Germat vastgesteld.</li><li>Actuele informatie wordt vanuit WordPress beheerd.</li></ul><!-- /wp:list -->",
    ].join(""),
    status: "published",
    parentId: null,
    menuOrder: 3,
  },
  {
    id: "mock-garantie",
    slug: "garantie",
    title: "Garantie",
    excerpt: "Voorbeeldpagina voor garantie-informatie.",
    content: [
      "<!-- wp:heading --><h2>Garantie en service</h2><!-- /wp:heading -->",
      "<!-- wp:paragraph --><p>De geldende garantievoorwaarden verschillen per product en moeten door Germat worden bevestigd. Deze voorbeeldtekst is alleen bedoeld om de CMS-rendering te demonstreren.</p><!-- /wp:paragraph -->",
      "<!-- wp:quote --><blockquote><p>Publiceer hier de actuele, door Germat goedgekeurde garantie-informatie.</p></blockquote><!-- /wp:quote -->",
    ].join(""),
    status: "published",
    parentId: null,
    menuOrder: 4,
  },
  {
    id: "mock-verhuur",
    slug: "verhuur",
    title: "Verhuur",
    excerpt: "Voorbeeldpagina voor informatie over verhuur.",
    content: "<!-- wp:paragraph --><p>De verhuurvoorwaarden en beschikbaarheid moeten door Germat worden aangeleverd voordat deze pagina voor klanten wordt gebruikt.</p><!-- /wp:paragraph -->",
    status: "published",
    parentId: null,
    menuOrder: 5,
  },
  {
    id: "mock-algemene-voorwaarden",
    slug: "algemene-voorwaarden",
    title: "Algemene voorwaarden",
    excerpt: "Voorbeeldpagina voor algemene voorwaarden.",
    content: "<!-- wp:paragraph --><p>De definitieve voorwaarden moeten door Germat worden aangeleverd. Deze voorbeeldpagina bevat geen juridisch bindende bepalingen.</p><!-- /wp:paragraph -->",
    status: "published",
    parentId: null,
    menuOrder: 6,
  },
];

export class MockCmsProvider implements ContentProvider {
  async getPageBySlug(slug: string): Promise<CmsPage | null> {
    return pages.find((page) => page.slug === slug) ?? null;
  }

  getPage(slug: string): Promise<Page | null> {
    return this.getPageBySlug(slug);
  }

  async getPages(): Promise<CmsPage[]> {
    return [...pages].sort((a, b) => a.menuOrder - b.menuOrder);
  }

  async getPageById(id: string): Promise<CmsPage | null> {
    return pages.find((page) => page.id === id) ?? null;
  }

  async getPosts(): Promise<Post[]> {
    return [];
  }

  async getPost(slug: string): Promise<Post | null> {
    const posts = await this.getPosts();
    return posts.find((post) => post.slug === slug) ?? null;
  }
}
