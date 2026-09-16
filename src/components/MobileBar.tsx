"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { PhoneIcon, RouteIcon, WhatsIcon } from "./Icons";
import { EASE } from "./Reveal";
import { DIRECTIONS_URL, PHONE_E164, whatsapp } from "@/data/site";

/**
 * Barra de ação fixa no rodapé do celular: aparece depois do hero (que já tem
 * os próprios botões) — pedir, ligar e traçar rota ficam sempre a um toque.
 */
export default function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 520;
      setShow(window.scrollY > window.innerHeight * 0.85 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          className="mbar"
          aria-label="Ações rápidas"
          initial={{ y: "140%" }}
          animate={{ y: "0%" }}
          exit={{ y: "140%" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <a className="mbar__main" href={whatsapp()} target="_blank" rel="noopener noreferrer">
            <WhatsIcon width={20} height={20} /> Pedir agora
          </a>
          <a className="mbar__icon" href={`tel:${PHONE_E164}`} aria-label="Ligar">
            <PhoneIcon />
          </a>
          <a className="mbar__icon" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" aria-label="Traçar rota">
            <RouteIcon />
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
