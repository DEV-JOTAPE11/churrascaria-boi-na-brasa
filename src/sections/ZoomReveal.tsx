"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { WhatsIcon } from "@/components/Icons";
import { whatsapp } from "@/data/site";

/**
 * O card que cresce até virar a tela: a seção é alta, o palco fica sticky e a
 * foto abre de um card arredondado até a tela cheia enquanto o zoom interno
 * anda ao contrário (a câmera entrando na grelha). No fim, o recado aparece.
 * Tudo em transform/clip-path ligados à rolagem nativa — sem GSAP.
 */
export default function ZoomReveal() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // o card começa como uma janela no meio da tela e abre até as bordas
  const inset = useTransform(p, [0, 0.55], [1, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${(v * 22).toFixed(2)}% ${(v * 12).toFixed(2)}% round ${(v * 36).toFixed(1)}px)`);
  const photoScale = useTransform(p, [0, 0.7], [1.35, 1]);
  const before = useTransform(p, [0, 0.18], [1, 0]);
  const beforeY = useTransform(p, [0, 0.18], [0, -60]);
  const scrim = useTransform(p, [0.45, 0.7], [0.15, 0.65]);
  const content = useTransform(p, [0.58, 0.78], [0, 1]);
  const contentY = useTransform(p, [0.58, 0.8], [50, 0]);

  if (reduce) {
    return (
      <section className="zoom is-static" aria-label="Sabor de verdade, todo dia">
        <div className="zoom__stage">
          <div className="zoom__card">
            <Photo />
            <div className="zoom__scrim" style={{ opacity: 0.6 }} />
          </div>
          <Content />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="zoom" aria-label="Sabor de verdade, todo dia">
      <div className="zoom__stage">
        <motion.p className="zoom__before" style={{ opacity: before, y: beforeY }}>
          Role para chegar
          <br />
          <span>perto da brasa</span>
        </motion.p>

        <motion.div className="zoom__card" style={{ clipPath }}>
          <motion.div className="zoom__photoWrap" style={{ scale: photoScale }}>
            <Photo />
          </motion.div>
          <motion.div className="zoom__scrim" style={{ opacity: scrim }} />
        </motion.div>

        <motion.div className="zoom__contentWrap" style={{ opacity: content, y: contentY }}>
          <Content />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Duas versões da mesma foto: o corte largo nas telas deitadas (pc, notebook e
 * tablet na horizontal) e o corte em pé nas de retrato (celular e tablet em pé).
 * É <picture> e não next/image porque só ele troca o arquivo por media query —
 * o navegador baixa apenas o que a tela pede.
 */
function Photo() {
  return (
    <picture>
      <source media="(min-aspect-ratio: 1 / 1)" srcSet="/images/fotos/picanha-brasa-desktop.webp" width={1672} height={941} />
      <img
        className="zoom__photo"
        src="/images/fotos/picanha-brasa-mobile.webp"
        alt="Espetos de picanha com sal grosso assando sobre a brasa"
        width={941}
        height={1672}
        /* sem lazy: a foto é o fundo da seção e o navegador não a carregava a
           tempo dentro do card em clip-path, deixando a tela preta na subida */
        fetchPriority="low"
        decoding="async"
      />
    </picture>
  );
}

function Content() {
  return (
    <div className="zoom__content">
      <p className="eyebrow eyebrow--light">Todo dia, de segunda a sábado</p>
      <h2 className="zoom__title">
        Sabor de verdade,
        <br />
        <em>todo dia.</em>
      </h2>
      <p className="zoom__sub">
        A brasa acende cedo, a carne descansa no sal grosso e às 10h o salão abre. Venha almoçar ou peça sem sair do lugar.
      </p>
      <div className="zoom__actions">
        <a className="btn btn--red btn--lg" href={whatsapp()} target="_blank" rel="noopener noreferrer">
          <WhatsIcon width={20} height={20} /> Pedir agora
        </a>
        <a className="btn btn--glass btn--lg" href="#visite">
          Como chegar
        </a>
      </div>
    </div>
  );
}
