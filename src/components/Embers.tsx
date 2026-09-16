import type { CSSProperties } from "react";

/* gerador determinístico: servidor e cliente desenham as mesmas brasas */
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

/**
 * Fagulhas subindo da brasa. Só CSS (transform + opacity na GPU), sem JS por
 * quadro — roda liso em celular modesto. Metade delas some em telas pequenas.
 */
export default function Embers({ count = 34, seed = 7, className = "" }: { count?: number; seed?: number; className?: string }) {
  const r = rng(seed);
  const sparks = Array.from({ length: count }, (_, i) => {
    const size = 1.5 + r() * 3.5;
    return {
      i,
      style: {
        left: `${(r() * 100).toFixed(2)}%`,
        width: `${size.toFixed(1)}px`,
        height: `${size.toFixed(1)}px`,
        animationDuration: `${(5 + r() * 7).toFixed(2)}s`,
        animationDelay: `${(-r() * 12).toFixed(2)}s`,
        "--drift": `${((r() - 0.5) * 140).toFixed(0)}px`,
        "--rise": `${(55 + r() * 45).toFixed(0)}vh`,
      } as CSSProperties,
    };
  });

  return (
    <div className={`embers ${className}`} aria-hidden>
      {sparks.map((s) => (
        <span key={s.i} className={`ember${s.i % 2 ? " ember--desk" : ""}`} style={s.style} />
      ))}
    </div>
  );
}
