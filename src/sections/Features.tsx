import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { FEATURES } from "@/data/site";

/** bento de experiências — os blocos da página de produto da Apple */
export default function Features() {
  return (
    <section id="casa" className="section features">
      <div className="wrap">
        <SectionHead
          eyebrow="A casa"
          title={
            <>
              Tudo que um bom almoço <em>precisa ter.</em>
            </>
          }
          text="Churrasco na brasa, buffet completo, marmitas e um salão para receber bem. Do jeito mineiro: farto, caprichado e sem frescura."
        />

        <div className="bento">
          {FEATURES.map((f, i) => (
            <Reveal key={f.id} className={`tile tile--${f.size}`} delay={i * 0.06}>
              <Image
                className="tile__img"
                src={f.image}
                alt={f.alt}
                fill
                sizes={f.size === "xl" ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 900px) 100vw, 33vw"}
              />
              <div className="tile__scrim" />
              <div className="tile__body">
                <p className="tile__kicker">{f.kicker}</p>
                <h3 className="tile__title">{f.title}</h3>
                <p className="tile__text">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
