"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import Logo from "@/components/Logo";

/** palavras entre *asteriscos* acendem na cor da brasa */
const TEXT =
  "Há mais de *quinze* *anos* a gente acende a brasa cedo para servir o *melhor* *almoço* de Buritis. Carne selecionada, tempero de casa e o sabor que só o *fogo* *de* *verdade* dá.";

const WORDS = TEXT.split(" ").map((w) => ({ word: w.replace(/\*/g, ""), hot: w.startsWith("*") }));

function Word({ word, hot, progress, range }: { word: string; hot: boolean; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.span className={`manifesto__word${hot ? " is-hot" : ""}`} style={{ opacity, y }}>
      {word}{" "}
    </motion.span>
  );
}

/**
 * Manifesto em tipo grande que acende palavra por palavra enquanto a seção
 * fica presa na tela (position: sticky + useScroll — nativo, funciona igual
 * no celular).
 */
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const sign = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);
  const signY = useTransform(scrollYProgress, [0.78, 0.92], [24, 0]);

  return (
    <section ref={ref} id="historia" className={`manifesto${reduce ? " is-static" : ""}`} aria-label="Nossa história">
      <div className="manifesto__pin">
        <p className="eyebrow">Desde 2010</p>
        <h2 className="manifesto__text">
          {WORDS.map((w, i) => {
            const start = (i / WORDS.length) * 0.75;
            const end = start + 0.75 / WORDS.length + 0.04;
            return reduce ? (
              <span key={i} className={`manifesto__word${w.hot ? " is-hot" : ""}`}>
                {w.word}{" "}
              </span>
            ) : (
              <Word key={i} word={w.word} hot={w.hot} progress={scrollYProgress} range={[start, end]} />
            );
          })}
        </h2>
        <motion.div className="manifesto__sign" style={reduce ? undefined : { opacity: sign, y: signY }}>
          <Logo variant="mark" className="manifesto__bull" ink="var(--red)" title="" />
          <span>
            <b>Família Boi na Brasa</b>
            <i>Buritis · Minas Gerais</i>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
