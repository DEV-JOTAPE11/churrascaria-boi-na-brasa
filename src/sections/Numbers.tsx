"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE } from "@/components/Reveal";
import { STATS } from "@/data/site";

type Stat = (typeof STATS)[number];

const fmt = (v: number, decimals = 0) =>
  v.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

function Counter({ s, delay }: { s: Stat; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const decimals = "decimals" in s ? s.decimals : 0;

  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const el = ref.current;
    const c = animate(0, s.value, {
      duration: 1.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = fmt(v, decimals)),
    });
    return () => c.stop();
  }, [inView, reduce, s.value, decimals, delay]);

  return <span ref={ref}>{fmt(s.value, decimals)}</span>;
}

/** a casa em números — contadores correm quando entram na tela */
export default function Numbers() {
  return (
    <section className="numbers" aria-label="A Boi na Brasa em números">
      <p className="numbers__word" aria-hidden>
        Boi na Brasa
      </p>
      <div className="wrap numbers__grid">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
          >
            <p className="stat__value">
              {"prefix" in s && s.prefix && <small>{s.prefix}</small>}
              <Counter s={s} delay={i * 0.08} />
              {s.suffix && <small>{s.suffix}</small>}
            </p>
            <p className="stat__label">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
