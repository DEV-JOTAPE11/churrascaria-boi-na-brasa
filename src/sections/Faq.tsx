"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EASE } from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { FAQ } from "@/data/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="duvidas" className="section faq">
      <div className="wrap faq__grid">
        <SectionHead
          eyebrow="Dúvidas"
          title={
            <>
              Perguntas <em>frequentes.</em>
            </>
          }
          text="Não achou o que procurava? Chama a gente no WhatsApp."
        />

        <ul className="faq__list">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className={`faq__item${isOpen ? " is-open" : ""}`}>
                <h3>
                  <button
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.q}
                    <span className="faq__plus" aria-hidden />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
