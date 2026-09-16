"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { InstaIcon, WhatsIcon } from "@/components/Icons";
import { EASE } from "@/components/Reveal";
import { ADDRESS_LINE, HOURS, INSTAGRAM_URL, NAV_LINKS, whatsapp } from "@/data/site";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`nav${solid || open ? " nav--solid" : ""}`}>
        <div className="nav__inner">
          <a className="nav__brand" href="#inicio" aria-label="Boi na Brasa — início" onClick={() => setOpen(false)}>
            <Logo className="nav__logo" />
          </a>

          <nav className="nav__links" aria-label="Principal">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="btn btn--red btn--sm nav__cta" href={whatsapp()} target="_blank" rel="noopener noreferrer">
              <WhatsIcon width={16} height={16} />
              Pedir agora
            </a>
            <button
              className={`burger${open ? " is-open" : ""}`}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="sheet"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav className="sheet__links" aria-label="Menu">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.12 + i * 0.05 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="sheet__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p>
                {HOURS[0].day} · {HOURS[0].time}
                <br />
                {ADDRESS_LINE}
              </p>
              <div className="sheet__cta">
                <a className="btn btn--red" href={whatsapp()} target="_blank" rel="noopener noreferrer">
                  <WhatsIcon width={18} height={18} /> Pedir no WhatsApp
                </a>
                <a className="btn btn--ghost" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <InstaIcon width={18} height={18} /> Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
