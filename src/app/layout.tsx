import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Cinzel, Inter } from "next/font/google";
import {
  ADDRESS,
  BRAND,
  INSTAGRAM_URL,
  PHONE_E164,
  RATINGS,
  SITE_URL,
} from "@/data/site";
import "./globals.css";
import "../styles/hero.css";
import "../styles/sections.css";

/* tipografia tirada da identidade: a slab pesada do "BOI NA BRASA", a
 * serifada de caixa-alta da faixa "CHURRASCARIA" e uma sans limpa (Inter)
 * para o texto corrido — o lado "Apple" do site */
const slab = Alfa_Slab_One({ variable: "--font-slab", weight: "400", subsets: ["latin"] });
const cinzel = Cinzel({ variable: "--font-cinzel", weight: ["500", "600", "700"], subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const title = "Churrascaria Boi na Brasa — O melhor almoço de Buritis";
const description =
  "Há mais de 15 anos servindo o melhor churrasco de Buritis – MG. Self-service com churrasco, marmitas e delivery. Segunda a sábado, das 10h às 14h.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: ["churrascaria Buritis", "restaurante Buritis MG", "self-service", "marmita Buritis", "delivery Buritis", "Boi na Brasa"],
  openGraph: {
    title,
    description,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Picanha no espeto sobre a brasa na Churrascaria Boi na Brasa" }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0d0806",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: BRAND.name,
  image: `${SITE_URL}/images/og.jpg`,
  servesCuisine: ["Churrasco", "Brasileira", "Mineira"],
  priceRange: "$$",
  telephone: PHONE_E164,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.state,
    postalCode: ADDRESS.zip,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "14:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: RATINGS.google.score,
    reviewCount: RATINGS.google.reviews,
  },
  sameAs: [INSTAGRAM_URL],
  foundingDate: String(BRAND.since),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${slab.variable} ${cinzel.variable} ${inter.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
