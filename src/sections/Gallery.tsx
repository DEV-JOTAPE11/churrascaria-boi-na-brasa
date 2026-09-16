import Image from "next/image";
import { InstaIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { GALLERY, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/site";

/**
 * Fotos reais do @boinabrasabts. No celular vira um carrossel nativo com
 * scroll-snap (arrasta com o dedo, sem biblioteca); no desktop, um mosaico.
 */
export default function Gallery() {
  return (
    <section className="section gallery" aria-label="Nossa casa">
      <div className="wrap">
        <SectionHead
          eyebrow="Nossa gente"
          title={
            <>
              Casa cheia, <em>mesa farta.</em>
            </>
          }
          text="Quem almoça com a gente vira de casa. Um pouco do dia a dia do salão, da equipe e dos clientes."
        />
      </div>

      <ul className="gallery__track">
        {GALLERY.map((g, i) => (
          <Reveal as="li" key={g.src} className={`shot shot--${i + 1}`} delay={i * 0.05}>
            <Image src={g.src} alt={g.alt} fill sizes="(max-width: 900px) 80vw, 33vw" />
            <span className="shot__cap">{g.caption}</span>
          </Reveal>
        ))}
      </ul>

      <div className="wrap gallery__foot">
        <a className="btn btn--ghost" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <InstaIcon width={18} height={18} /> Siga {INSTAGRAM_HANDLE}
        </a>
      </div>
    </section>
  );
}
