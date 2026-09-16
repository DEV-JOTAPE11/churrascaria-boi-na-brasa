import { InstaIcon, WhatsIcon } from "@/components/Icons";
import Logo from "@/components/Logo";
import {
  ADDRESS_LINE,
  BRAND,
  HOURS,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  NAV_LINKS,
  PHONE_E164,
  PHONE_LABEL,
  WHATSAPP_LABEL,
  whatsapp,
} from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <Logo className="footer__logo" />
          <p>{BRAND.tagline}</p>
        </div>

        <nav className="footer__col" aria-label="Rodapé">
          <p className="footer__label">Navegue</p>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a href="#duvidas">Dúvidas</a>
        </nav>

        <div className="footer__col">
          <p className="footer__label">Funcionamento</p>
          {HOURS.map((h) => (
            <p key={h.day}>
              {h.day}: <b>{h.time}</b>
            </p>
          ))}
          <p>{ADDRESS_LINE}</p>
        </div>

        <div className="footer__col">
          <p className="footer__label">Fale com a gente</p>
          <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
            <WhatsIcon width={16} height={16} /> {WHATSAPP_LABEL}
          </a>
          <a href={`tel:${PHONE_E164}`}>{PHONE_LABEL}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <InstaIcon width={16} height={16} /> {INSTAGRAM_HANDLE}
          </a>
        </div>
      </div>

      <div className="wrap footer__base">
        <p>
          © {new Date().getFullYear()} {BRAND.name} · {BRAND.city} – {BRAND.state}
        </p>
        <p>Há mais de 15 anos servindo o melhor churrasco da cidade.</p>
      </div>
    </footer>
  );
}
