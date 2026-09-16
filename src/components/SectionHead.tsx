"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "./Reveal";

/**
 * Cabeçalho das seções: selo em Cinzel (a faixa do logo), título grande que
 * sobe de trás de uma máscara e texto de apoio.
 */
export default function SectionHead({
  eyebrow,
  title,
  text,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const reduce = useReducedMotion();
  const from = reduce ? false : undefined;

  return (
    <motion.div
      className={`head head--${align} head--${tone}`}
      initial={from ?? "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      {eyebrow && (
        <motion.p
          className="eyebrow"
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {eyebrow}
        </motion.p>
      )}
      <h2 className="head__title">
        <motion.span
          variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.05 }}
        >
          {title}
        </motion.span>
      </h2>
      {text && (
        <motion.p
          className="head__text"
          variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}
