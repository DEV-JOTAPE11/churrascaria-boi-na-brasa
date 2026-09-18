/* Fatos da casa: bio do @boinabrasabts, stories de destaque (Cardápio,
 * Delivery, Contato), Google e Tripadvisor. Preços não entram no site porque
 * mudam com frequência — o pedido fecha no WhatsApp. */

export const SITE_URL = "https://boinabrasa.com.br";

export const BRAND = {
  name: "Churrascaria Boi na Brasa",
  short: "Boi na Brasa",
  city: "Buritis",
  state: "MG",
  since: 2010,
  tagline: "Aqui o churrasco é levado a sério.",
};

export const INSTAGRAM_URL = "https://www.instagram.com/boinabrasabts/";
export const INSTAGRAM_HANDLE = "@boinabrasabts";

const WHATSAPP_E164 = "5538998024958";
export const WHATSAPP_LABEL = "(38) 99802-4958";
export const PHONE_E164 = "+553836621361";
export const PHONE_LABEL = "(38) 3662-1361";

/** conversa no WhatsApp com a mensagem já escrita */
export const whatsapp = (text = "Olá, Boi na Brasa! Quero fazer um pedido.") =>
  `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(text)}`;

export const ADDRESS = {
  street: "Av. Pedro Valadares Versiani, 1096",
  district: "Triângulo",
  city: "Buritis",
  state: "MG",
  zip: "38660-000",
};

export const ADDRESS_LINE = `${ADDRESS.street} – ${ADDRESS.district}, ${ADDRESS.city} – ${ADDRESS.state}`;

const MAPS_QUERY = encodeURIComponent(`Churrascaria Boi na Brasa, ${ADDRESS.street}, ${ADDRESS.city} - ${ADDRESS.state}`);
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;

export const HOURS = [
  { day: "Segunda a sábado", time: "10h às 14h", open: true },
  { day: "Domingo", time: "Fechado", open: false },
];

export const RATINGS = {
  google: { score: 4.2, reviews: 1000 },
  tripadvisor: { score: 4.1, rank: "Nº 2 de 9 restaurantes em Buritis" },
};

export const NAV_LINKS = [
  { label: "A casa", href: "#casa" },
  { label: "Cardápio", href: "#cardapio" },
  { label: "Delivery", href: "#delivery" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Visite", href: "#visite" },
];

/* --------------------------------- hero ---------------------------------- */

export interface Sprite {
  src: string;
  /** centro em % do palco */
  x: number;
  y: number;
  /** largura em px de design (palco de 1440) */
  w: number;
  rot?: number;
  blur?: number;
  front?: boolean;
  dur: number;
  /** some no celular para não cobrir o prato */
  desktopOnly?: boolean;
}

export interface Dish {
  id: string;
  word: string;
  name: string;
  detail: string;
  image: string;
  width: number;
  height: number;
  /** tamanho relativo do prato no palco */
  scale: number;
  /** inclinação em graus; negativo joga a ponta do espeto para a direita */
  rot?: number;
  /** fundo do palco e brilho da brasa */
  bg: string;
  glow: string;
  sprites: Sprite[];
}

export const DISHES: Dish[] = [
  {
    id: "picanha",
    word: "Picanha",
    name: "Picanha na brasa",
    detail: "Selada no fogo, fatiada na hora",
    image: "/images/hero/espeto-picanha.webp",
    width: 405,
    height: 1436,
    scale: 1,
    rot: -40,
    bg: "#2a0f09",
    glow: "#ff5a1f",
    sprites: [
      { src: "/images/hero/tomate-1.webp", x: 17, y: 30, w: 120, rot: -12, dur: 6.5 },
      { src: "/images/hero/avelas.webp", x: 84, y: 24, w: 110, rot: 18, dur: 7.5, desktopOnly: true },
      { src: "/images/hero/tomate-2.webp", x: 88, y: 74, w: 190, blur: 5, front: true, dur: 8 },
      { src: "/images/hero/avela.webp", x: 9, y: 78, w: 150, blur: 4, front: true, dur: 7, desktopOnly: true },
    ],
  },
  {
    id: "costela",
    word: "Costela",
    name: "Costela na brasa",
    detail: "Horas na brasa, desmancha no garfo",
    image: "/images/hero/costela.webp",
    width: 1100,
    height: 872,
    scale: 1.08,
    bg: "#1f0c07",
    glow: "#ff7a2a",
    sprites: [
      { src: "/images/hero/avela.webp", x: 20, y: 24, w: 70, rot: 30, dur: 6 },
      { src: "/images/hero/tomate-1.webp", x: 82, y: 30, w: 140, rot: 8, dur: 7, desktopOnly: true },
      { src: "/images/hero/tomate-2.webp", x: 10, y: 72, w: 200, blur: 6, front: true, dur: 8.5 },
      { src: "/images/hero/avelas.webp", x: 90, y: 80, w: 150, blur: 4, front: true, dur: 7.5, desktopOnly: true },
    ],
  },
  {
    id: "linguica",
    word: "Linguiça",
    name: "Linguiça na brasa",
    detail: "Dourada por fora, suculenta por dentro",
    image: "/images/hero/linguica.webp",
    width: 899,
    height: 1100,
    scale: 0.98,
    bg: "#300d0b",
    glow: "#ff4a26",
    sprites: [
      { src: "/images/hero/tomate-2.webp", x: 16, y: 26, w: 110, rot: 20, dur: 6.8 },
      { src: "/images/hero/avelas.webp", x: 86, y: 30, w: 120, rot: -10, dur: 7.2, desktopOnly: true },
      { src: "/images/hero/tomate-1.webp", x: 86, y: 76, w: 180, blur: 5, front: true, dur: 8 },
      { src: "/images/hero/avela.webp", x: 12, y: 80, w: 130, blur: 4, front: true, dur: 6.6, desktopOnly: true },
    ],
  },
  {
    id: "brasa",
    word: "Brasa",
    name: "Churrasco completo",
    detail: "Carne, salada e tempero de casa",
    image: "/images/hero/brasa.webp",
    width: 1100,
    height: 1034,
    scale: 1,
    bg: "#261008",
    glow: "#ff8a1f",
    sprites: [
      { src: "/images/hero/tomate-1.webp", x: 83, y: 26, w: 115, rot: 10, dur: 7 },
      { src: "/images/hero/avela.webp", x: 16, y: 28, w: 80, rot: -20, dur: 6.2, desktopOnly: true },
      { src: "/images/hero/avelas.webp", x: 9, y: 74, w: 170, blur: 5, front: true, dur: 8 },
      { src: "/images/hero/tomate-2.webp", x: 90, y: 78, w: 170, blur: 5, front: true, dur: 7.4, desktopOnly: true },
    ],
  },
];

export const TICKER = [
  `Desde ${BRAND.since}`,
  "Self-service com churrasco",
  "Marmitas & delivery",
  "Segunda a sábado · 10h às 14h",
  "Cozinha à vista",
  "Ambiente climatizado",
  "Buritis · MG",
];

/* -------------------------------- a casa --------------------------------- */

export interface Feature {
  id: string;
  kicker: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  size: "xl" | "tall" | "wide" | "sm";
}

export const FEATURES: Feature[] = [
  {
    id: "brasa",
    kicker: "Churrasco",
    title: "Brasa acesa todo dia.",
    text: "Carnes selecionadas, sal grosso e fogo de verdade. Sai da grelha direto para o seu prato.",
    image: "/images/fotos/espeto-fogo.webp",
    alt: "Espetos de picanha assando sobre o fogo",
    size: "xl",
  },
  {
    id: "buffet",
    kicker: "Self-service",
    title: "Um buffet que faz a salada virar prato principal.",
    text: "Saladas frescas, pratos quentes e comida mineira caprichada.",
    image: "/images/fotos/buffet-cuba-salada.webp",
    alt: "Cuba de salada de brócolis, cenoura e ovos de codorna no buffet",
    size: "tall",
  },
  {
    id: "cozinha",
    kicker: "Cozinha à vista",
    title: "Nada a esconder.",
    text: "Você vê o preparo do balcão. Higiene que os clientes elogiam.",
    image: "/images/fotos/buffet-massa.webp",
    alt: "Cubas do buffet servidas, com a equipe na cozinha ao fundo",
    size: "sm",
  },
  {
    id: "delivery",
    kicker: "Marmitas & delivery",
    title: "O almoço vai até você.",
    text: "Peça pelo WhatsApp e receba quentinho.",
    image: "/images/casa/delivery-moto.webp",
    alt: "Entregador da Boi na Brasa saindo para uma entrega",
    size: "sm",
  },
  {
    id: "salao",
    kicker: "Ambiente",
    title: "Salão amplo, climatizado e acessível.",
    text: "Espaço para a família, para o time do trabalho e para a confraternização.",
    image: "/images/casa/salao-mesas.webp",
    alt: "Salão da churrascaria com mesas postas e telhado de madeira",
    size: "sm",
  },
];

/* -------------------------------- cardápio ------------------------------- */

export interface MenuTab {
  id: string;
  label: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  items: { name: string; note: string }[];
  cta: { label: string; message: string };
}

export const MENU: MenuTab[] = [
  {
    id: "brasa",
    label: "Na brasa",
    title: "Direto da grelha",
    text: "Os cortes variam conforme o dia — o que não muda é o ponto certo e o sal grosso na medida.",
    image: "/images/fotos/carne-recheada.webp",
    alt: "Carne recheada com queijo e presunto saindo da brasa",
    items: [
      { name: "Picanha", note: "O clássico da casa, com a capa de gordura dourada" },
      { name: "Costela", note: "Assada devagar até soltar do osso" },
      { name: "Fraldinha & maminha", note: "Macias e suculentas" },
      { name: "Linguiça", note: "Na brasa, estalando" },
      { name: "Frango", note: "Coxa e sobrecoxa temperadas" },
      { name: "Carne suína", note: "Cortes suínos bem temperados" },
    ],
    cta: { label: "Perguntar os cortes de hoje", message: "Olá! Quais carnes estão saindo na brasa hoje?" },
  },
  {
    id: "buffet",
    label: "Self-service",
    title: "Buffet completo",
    text: "Self-service por quilo, com churrasco. Muita variedade para montar o prato do seu jeito.",
    image: "/images/fotos/buffet-frutas.webp",
    alt: "Buffet de frutas frescas fatiadas sobre folhas verdes",
    items: [
      { name: "Saladas", note: "Folhas, legumes e combinações frescas todos os dias" },
      { name: "Arroz, feijão & tropeiro", note: "O básico mineiro bem feito" },
      { name: "Pratos quentes", note: "Receitas caseiras que mudam durante a semana" },
      { name: "Guarnições", note: "Mandioca, batata, farofa e vinagrete" },
      { name: "Massas & acompanhamentos", note: "Para completar o prato" },
      { name: "Sobremesas", note: "Aquele docinho depois do almoço" },
    ],
    cta: { label: "Ver o cardápio de hoje", message: "Olá! Qual é o cardápio do buffet hoje?" },
  },
  {
    id: "marmitas",
    label: "Marmitas",
    title: "Marmitas & delivery",
    text: "O mesmo almoço do salão, embalado com cuidado e entregue quentinho em Buritis.",
    image: "/images/fotos/bife-acebolado.webp",
    alt: "Carne acebolada na assadeira, pronta para a marmita",
    items: [
      { name: "Marmita com churrasco", note: "Carne da brasa + acompanhamentos do dia" },
      { name: "Marmita tradicional", note: "Arroz, feijão, salada e mistura" },
      { name: "Pedidos para empresas", note: "Almoço para a sua equipe, todos os dias" },
      { name: "Retirada no balcão", note: "Peça antes e só passe para buscar" },
    ],
    cta: { label: "Pedir marmita no WhatsApp", message: "Olá! Quero pedir marmita para entrega." },
  },
];

/* --------------------------------- números ------------------------------- */

export const STATS = [
  { value: 15, prefix: "+", suffix: " anos", label: "servindo churrasco em Buritis" },
  { value: 4.2, decimals: 1, suffix: "★", label: "nota média no Google" },
  { value: 1000, prefix: "+", suffix: "", label: "avaliações de clientes" },
  { value: 6, suffix: " dias", label: "por semana de brasa acesa" },
];

/* ------------------------------- avaliações ------------------------------ */

export const REVIEWS = [
  {
    text: "Comida saborosa, ambiente agradável, excelente atendimento e preço justo.",
    source: "Cliente no Google",
  },
  {
    text: "Excelente self-service com churrasco. Muitas opções e variedade, e a qualidade da comida é excepcional.",
    source: "Cliente no Google",
  },
  {
    text: "Comida excelente! A cozinha fica à vista dos clientes, higiene nota 10 e ótimo ar-condicionado.",
    source: "Cliente no Tripadvisor",
  },
];

/* --------------------------------- galeria ------------------------------- */

export interface Shot {
  src: string;
  alt: string;
  w: number;
  h: number;
  caption: string;
  /** enquadramento do recorte no card (object-position); padrão é o centro */
  pos?: string;
  /** foto horizontal: no mobile o card vira 16/9 em vez de 4/5 */
  flat?: boolean;
}

export const GALLERY: Shot[] = [
  { src: "/images/casa/equipe-sorriso.webp", alt: "Atendente sorrindo no salão", w: 1080, h: 1350, caption: "Atendimento com sorriso" },
  { src: "/images/casa/salao-mesas.webp", alt: "Salão da churrascaria com telhado de madeira e mesas postas", w: 900, h: 1600, caption: "Nosso salão", pos: "50% 32%" },
  { src: "/images/casa/carnes-na-brasa.webp", alt: "Peça de picanha assando no espeto sobre a brasa", w: 739, h: 1315, caption: "Carnes selecionadas" },
  { src: "/images/casa/nossa-equipe.webp", alt: "Equipe da Boi na Brasa reunida no salão", w: 445, h: 237, caption: "Nossa equipe", flat: true },
  { src: "/images/fotos/feijao-tropeiro.webp", alt: "Feijão tropeiro servido no buffet", w: 900, h: 1600, caption: "Tropeiro todo dia" },
  { src: "/images/casa/familia-mesa.webp", alt: "Família almoçando junto na Boi na Brasa", w: 860, h: 423, caption: "Mesa cheia é mesa feliz", pos: "50% 40%", flat: true },
];

/* --------------------------------- dúvidas ------------------------------- */

export const FAQ = [
  {
    q: "Qual é o horário de funcionamento?",
    a: "Abrimos de segunda a sábado, das 10h às 14h, para o almoço. Aos domingos a casa fica fechada.",
  },
  {
    q: "Como funciona o self-service?",
    a: "É por quilo, com churrasco. Você monta o prato no buffet de saladas e pratos quentes e escolhe as carnes que estão saindo na brasa.",
  },
  {
    q: "Vocês fazem entrega?",
    a: `Sim! Marmitas e delivery pelo WhatsApp ${WHATSAPP_LABEL}. Mande sua mensagem e a gente confirma o cardápio do dia e o endereço.`,
  },
  {
    q: "Atendem empresas e confraternizações?",
    a: "Atendemos. Temos salão amplo para grupos e fazemos pedidos de marmitas para equipes. Chame no WhatsApp para combinar.",
  },
  {
    q: "Aceitam vale-refeição?",
    a: "Aceitamos as principais formas de pagamento, incluindo vale-refeição. Na dúvida sobre uma bandeira específica, pergunte pelo WhatsApp.",
  },
  {
    q: "O restaurante é acessível?",
    a: "Sim. O restaurante tem acesso para cadeirantes e o salão é climatizado.",
  },
];
