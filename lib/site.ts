// Store-wide copy and navigation. Edit here to rebrand.
export const SITE = {
  name: "Vape24",
  email: "support@vape24.com", // TODO: real support inbox
  // Completed orders are emailed here via FormSubmit. The first order triggers an activation email to this
  // address; after activating, swap it for the random alias FormSubmit gives you so the address isn't public.
  orderEmail: "orders@vape24.com", // TODO: set the real inbox
  freeShipping: 150,
  announcements: [
    { text: "Vice Weekend: Buy 2 Get 1 Free.", cta: "See deals →", href: "/deals" },
    { text: "New: RAZ VUE 70K Christmas Edition.", cta: "Shop now →", href: "/raz-vue-70k-christmas-edition-kit-vape" },
    { text: "30% off Cookies lifestyle through Dec 31.", cta: "See deals →", href: "/lifestyle" },
    { text: "Free shipping on orders over $150", cta: "", href: "/shipping-policy" },
  ],
  perks: [
    { title: "Fast Shipping", sub: "We ship same day", icon: "truck" },
    { title: "Secure Checkout", sub: "SSL encrypted payments", icon: "lock" },
    { title: "Lower Prices", sub: "Price match guarantee", icon: "tag" },
    { title: "Authentic Products", sub: "100% genuine brands", icon: "check" },
    { title: "Great Customer Service", sub: "Support when you need it", icon: "chat" },
  ],
} as const;

type Link = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  columns?: { title: string; href?: string; links: Link[] }[];
  banner?: { src: string; alt: string; href: string };
};

const l = (label: string, href: string): Link => ({ label, href });

export const NAV: NavItem[] = [
  {
    label: "Shop All",
    href: "/",
    columns: [
      { title: "Shop by Category", links: [l("Disposable Vapes", "/disposable-vapes"), l("E-Liquids", "/e-liquids"), l("Nicotine Pouches", "/nicotine-pouches"), l("Hemp & CBD", "/hemp-thc")] },
      { title: "Popular", links: [l("New Arrivals", "/new-arrivals"), l("Best Sellers", "/disposable-vapes/best-sellers")] },
      { title: "Help & Info", links: [l("Contact Us", "/contact"), l("Shipping Info", "/shipping-policy"), l("Returns", "/return-policy"), l("Age Verification", "/age-verification")] },
    ],
    banner: { src: "/images/wysiwyg/megamenu/banner-shopall-trust.webp", alt: "Same-day dispatch, free shipping $150+, authentic products", href: "/deals" },
  },
  { label: "Deals", href: "/deals" },
  {
    label: "Disposables",
    href: "/disposable-vapes",
    columns: [
      { title: "By Puff Count", links: [l("5,000+ Puffs", "/disposable-vapes/5000-puffs"), l("10,000+ Puffs", "/disposable-vapes/10000-puffs"), l("15,000+ Puffs", "/disposable-vapes/15000-puffs"), l("20,000+ Puffs", "/disposable-vapes/20000-puffs"), l("30,000+ Puffs", "/disposable-vapes/30000-puffs"), l("50,000+ Puffs", "/disposable-vapes/50000-puffs")] },
      { title: "Top Devices", links: [l("RAZ LTX 25000", "/raz-ltx-25000-vape"), l("Beri Crush 50K", "/beri-crush-50k-vape"), l("Lost Mary MT35000 Turbo", "/lost-mary-mt35000-turbo-vape"), l("Juice Bar JB7500", "/juice-bar-jb7500-vape"), l("Foger Switch Pro", "/foger-switch-pro-30k-vape")] },
      { title: "Top Brands", href: "/shop-by-brand", links: [l("RAZ", "/shop-by-brand/raz"), l("Lost Mary", "/shop-by-brand/lost-mary"), l("Foger", "/shop-by-brand/foger"), l("SEA", "/shop-by-brand/sea"), l("Beri", "/shop-by-brand/beri")] },
      { title: "Popular", links: [l("New Arrivals", "/disposable-vapes/new-arrivals"), l("Best Sellers", "/disposable-vapes/best-sellers"), l("Nicotine-Free Vape", "/disposable-vapes/zero-nicotine-vape"), l("Coffee Flavored Vape", "/disposable-vapes/coffee-flavored-vape"), l("Built in the USA", "/disposable-vapes/built-in-the-usa"), l("Shop All Disposables", "/disposable-vapes")] },
    ],
    banner: { src: "/images/wysiwyg/megamenu/beri-crush-winter-edition.webp", alt: "Beri Crush 50K", href: "/beri-crush-50k-vape" },
  },
  {
    label: "E-Liquids",
    href: "/e-liquids",
    columns: [
      { title: "Top Brands", links: [l("Keep It", "/shop-by-brand/keep-it"), l("RAZ", "/shop-by-brand/raz-e-liquid"), l("Oxbar", "/shop-by-brand/oxbar-e-liquid"), l("Urban Tale", "/shop-by-brand/urban-tale"), l("Geek Bar", "/shop-by-brand/geek-bar-e-liquid")] },
      { title: "By Type", links: [l("Nicotine Salt", "/e-liquids/nicotine-salt"), l("Freebase", "/e-liquids/freebase")] },
      { title: "All E-Liquids", links: [l("Shop All E-Liquids", "/e-liquids")] },
    ],
    banner: { src: "/images/wysiwyg/megamenu/raz-e-liquid.webp", alt: "RAZ e-liquid", href: "/shop-by-brand/raz-e-liquid" },
  },
  {
    label: "Nicotine Pouches",
    href: "/nicotine-pouches",
    columns: [
      { title: "Brands", links: [l("ALP", "/shop-by-brand/alp"), l("Juice Head", "/shop-by-brand/juice-head"), l("Lucy", "/shop-by-brand/lucy"), l("Tyson 2.0", "/shop-by-brand/tyson-2-0"), l("Zimo", "/shop-by-brand/zimo"), l("Shop All Nic Pouches", "/nicotine-pouches")] },
    ],
  },
  {
    label: "Hemp & THC",
    href: "/hemp-thc",
    columns: [
      { title: "Hemp & THC", links: [l("All Hemp & THC", "/hemp-thc"), l("THC Disposables", "/hemp-thc/disposable-vapes"), l("THC Gummies", "/hemp-thc/gummies"), l("Cartridges & Carts", "/hemp-thc/cartridges-carts"), l("THC Dabs", "/hemp-thc/dabs")] },
    ],
  },
  {
    label: "Brands",
    href: "/shop-by-brand",
    columns: [
      { title: "Disposable Brands", links: [l("Beri", "/shop-by-brand/beri"), l("Foger", "/shop-by-brand/foger"), l("Lost Mary", "/shop-by-brand/lost-mary"), l("RAZ", "/shop-by-brand/raz"), l("Off-Stamp", "/shop-by-brand/off-stamp")] },
      { title: "E-Liquid Brands", links: [l("Keep It", "/shop-by-brand/keep-it"), l("Oxbar", "/shop-by-brand/oxbar-e-liquid"), l("RAZ", "/shop-by-brand/raz-e-liquid"), l("Urban Tale", "/shop-by-brand/urban-tale")] },
      { title: "Pouch Brands", links: [l("ALP", "/shop-by-brand/alp"), l("Juice Head", "/shop-by-brand/juice-head"), l("Lucy", "/shop-by-brand/lucy"), l("Tyson 2.0", "/shop-by-brand/tyson-2-0"), l("Zimo", "/shop-by-brand/zimo")] },
      { title: "Hemp & THC Brands", links: [l("Geek THCX", "/shop-by-brand/geek-thcx"), l("Jelly", "/shop-by-brand/jelly"), l("View All Brands", "/shop-by-brand")] },
    ],
    banner: { src: "/images/wysiwyg/megamenu/banner-brands-logos.webp", alt: "Top vape brands", href: "/shop-by-brand" },
  },
  {
    label: "Pods & Batteries",
    href: "/vape-accessories",
    columns: [{ title: "Pods & Batteries", links: [l("All Pods & Batteries", "/vape-accessories"), l("Replacement Pods", "/vape-accessories/replacement-pods")] }],
  },
  { label: "Lifestyle", href: "/lifestyle" },
];

export const BRANDS = [
  { name: "Geek Bar", tag: "#1 Best-Selling Pulse Disposables", logo: "geek-bar", href: "/shop-by-brand/geek-bar" },
  { name: "Lost Mary", tag: "Premium Disposables by Elf Bar", logo: "lost-mary", href: "/shop-by-brand/lost-mary" },
  { name: "RAZ", tag: "Bold Flavors Powered by GeekVape", logo: "raz", href: "/shop-by-brand/raz" },
  { name: "Fifty Bar", tag: "USA-Made Disposable Vapes by Beard", logo: "fifty-bar", href: "/shop-by-brand/fifty-bar" },
  { name: "Off Stamp", tag: "Smart Reusable Battery Disposables", logo: "off-stamp", href: "/shop-by-brand/off-stamp" },
  { name: "OXBAR", tag: "Adjustable Wattage Magic Maze Series", logo: "oxbar", href: "/shop-by-brand/oxbar" },
  { name: "Adjust", tag: "Customizable 40K Puff Disposables", logo: "adjust", href: "/shop-by-brand/adjust" },
  { name: "Beri", tag: "50K Puffs with Crush Mode Power", logo: "beri", href: "/shop-by-brand/beri" },
  { name: "NEXA", tag: "Crystal Tank Tech, Up to 50K Puffs", logo: "nexa", href: "/shop-by-brand/nexa" },
  { name: "Foger", tag: "Eco-Friendly Modular Disposables", logo: "foger", href: "/shop-by-brand/foger" },
  { name: "VIHO", tag: "Nexcore Mesh Coil Disposables", logo: "viho", href: "/shop-by-brand/viho" },
  { name: "SEA", tag: "World's Slimmest 15K Puff Disposable", logo: "sea", href: "/shop-by-brand/sea" },
].map((b) => ({ ...b, logo: `/images/thrivexis/brands/${b.logo}-vapes-logo.png` }));

export const FOOTER = [
  { title: "Shop", links: [l("Deals", "/deals"), l("Disposables", "/disposable-vapes"), l("E-Liquids", "/e-liquids"), l("Nicotine Pouches", "/nicotine-pouches"), l("Hemp & CBD", "/hemp-thc"), l("New Arrivals", "/new-arrivals"), l("Best Sellers", "/disposable-vapes/best-sellers")] },
  { title: "Customer Service", links: [l("Shipping Information", "/shipping-policy"), l("Returns & Exchanges", "/return-policy"), l("FAQ", "/faqs"), l("Contact Us", "/contact")] },
  { title: "About Us", links: [l("About Vape24", "/about-us"), l("Blog", "/blog"), l("Age Verification", "/age-verification")] },
];

export const LEGAL = [l("Terms & Conditions", "/terms-and-conditions"), l("Privacy Policy", "/privacy-policy"), l("Shipping Policy", "/shipping-policy"), l("Cookie Policy", "/cookie-policy")];

const STATE_NAMES =
  "AL Alabama|AK Alaska|AZ Arizona|AR Arkansas|CA California|CO Colorado|CT Connecticut|DE Delaware|DC District of Columbia|FL Florida|GA Georgia|HI Hawaii|ID Idaho|IL Illinois|IN Indiana|IA Iowa|KS Kansas|KY Kentucky|LA Louisiana|ME Maine|MD Maryland|MA Massachusetts|MI Michigan|MN Minnesota|MS Mississippi|MO Missouri|MT Montana|NE Nebraska|NV Nevada|NH New Hampshire|NJ New Jersey|NM New Mexico|NY New York|NC North Carolina|ND North Dakota|OH Ohio|OK Oklahoma|OR Oregon|PA Pennsylvania|RI Rhode Island|SC South Carolina|SD South Dakota|TN Tennessee|TX Texas|UT Utah|VT Vermont|VA Virginia|WA Washington|WV West Virginia|WI Wisconsin|WY Wyoming";
export const US_STATES = STATE_NAMES.split("|").map((s) => [s.slice(0, 2), s.slice(3)] as const);
