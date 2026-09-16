import Image from "next/image";
import Embers from "@/components/Embers";
import { RouteIcon, WhatsIcon } from "@/components/Icons";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { BRAND, DIRECTIONS_URL, whatsapp } from "@/data/site";

export default function FinalCta() {
  return (
    <section className="final" aria-label="Faça seu pedido">
      <div className="final__bg">
        <Image src="/images/fotos/brasa-faiscas.webp" alt="" fill sizes="100vw" />
      </div>
      <Embers count={30} seed={99} />
      <div className="wrap final__inner">
        <Reveal>
          <Logo className="final__logo" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="final__tag">{BRAND.tagline}</p>
        </Reveal>
        <Reveal delay={0.2} className="final__actions">
          <a className="btn btn--red btn--lg" href={whatsapp()} target="_blank" rel="noopener noreferrer">
            <WhatsIcon width={20} height={20} /> Pedir no WhatsApp
          </a>
          <a className="btn btn--glass btn--lg" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
            <RouteIcon width={18} height={18} /> Como chegar
          </a>
        </Reveal>
      </div>
    </section>
  );
}
