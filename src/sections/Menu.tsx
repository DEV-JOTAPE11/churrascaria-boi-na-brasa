"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { WhatsIcon } from "@/components/Icons";
import { EASE } from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { MENU, whatsapp } from "@/data/site";

/** cardápio em abas — o seletor segmentado da Apple, com a pílula deslizando */
export default function Menu() {
  const [active, setActive] = useState(MENU[0].id);
  const tab = MENU.find((m) => m.id === active)!;

  return (
    <section id="cardapio" className="section menu">
      <div className="wrap">
        <SectionHead
          eyebrow="Cardápio"
          align="center"
          title={
            <>
              Farto, caseiro e <em>na brasa.</em>
            </>
          }
          text="Self-service por quilo com churrasco, de segunda a sábado. O cardápio do dia sai no nosso Instagram e no WhatsApp."
        />

        <div className="segmented" role="tablist" aria-label="Categorias do cardápio">
          {MENU.map((m) => (
            <button
              key={m.id}
              role="tab"
              id={`tab-${m.id}`}
              aria-selected={m.id === active}
              aria-controls={`painel-${m.id}`}
              className={`segmented__btn${m.id === active ? " is-on" : ""}`}
              onClick={() => setActive(m.id)}
            >
              {m.id === active && (
                <motion.span layoutId="segmented-pill" className="segmented__pill" transition={{ type: "spring", bounce: 0.18, duration: 0.6 }} />
              )}
              <span className="segmented__label">{m.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab.id}
            id={`painel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className="menu__panel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="menu__photo">
              <Image src={tab.image} alt={tab.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
              <div className="menu__photoTag">
                <span>{tab.label}</span>
              </div>
            </div>

            <div className="menu__list">
              <h3 className="menu__title">{tab.title}</h3>
              <p className="menu__text">{tab.text}</p>
              <ul>
                {tab.items.map((it, i) => (
                  <motion.li
                    key={it.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.05 }}
                  >
                    <b>{it.name}</b>
                    <span className="menu__dots" aria-hidden />
                    <i>{it.note}</i>
                  </motion.li>
                ))}
              </ul>
              <a className="btn btn--red" href={whatsapp(tab.cta.message)} target="_blank" rel="noopener noreferrer">
                <WhatsIcon width={18} height={18} /> {tab.cta.label}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
