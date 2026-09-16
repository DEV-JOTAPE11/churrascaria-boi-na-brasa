"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Embers from "@/components/Embers";
import { ArrowIcon, ChevronIcon, StarIcon, WhatsIcon } from "@/components/Icons";
import { EASE } from "@/components/Reveal";
import { DISHES, RATINGS, whatsapp, type Sprite } from "@/data/site";

const N = DISHES.length;
const AUTOPLAY_MS = 6000;
/* a mesma mola macia do Fruity: devagar e com um leve assentamento */
const SPRING = { type: "spring", duration: 1.25, bounce: 0.2 } as const;

const mod = (i: number) => ((i % N) + N) % N;

/* ---------------------------- palavra gigante ---------------------------- */

function BigWord({ word, dir }: { word: string; dir: number }) {
  return (
    <div className="hero__word" aria-hidden>
      <AnimatePresence initial={false} custom={dir}>
        <motion.span
          key={word}
          className="hero__wordText"
          style={{ ["--len" as string]: word.length }}
          custom={dir}
          variants={{
            enter: (d: number) => ({ x: `${d * 70}vw`, opacity: 0 }),
            center: { x: "0vw", opacity: 1 },
            exit: (d: number) => ({ x: `${d * -70}vw`, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ ...SPRING, opacity: { duration: 0.5 } }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* -------------------------- ingredientes soltos -------------------------- */

/* entram pelo topo e saem pelo rodapé (invertido ao voltar), como as frutas
 * do Fruity — só posição, na mesma mola */
function FloatingSprite({ s, dir }: { s: Sprite; dir: number }) {
  const w = `calc(${(s.w / 14.4).toFixed(2)} * var(--su))`;
  return (
    <motion.div
      className={`sprite${s.desktopOnly ? " sprite--desk" : ""}`}
      style={{
        left: `${s.x}%`,
        top: `${s.y}%`,
        width: w,
        marginLeft: `calc(${w} / -2)`,
        marginTop: `calc(${w} / -2)`,
        rotate: s.rot ?? 0,
      }}
      custom={dir}
      variants={{
        enter: (d: number) => ({ y: d >= 0 ? `${-(s.y + 40)}svh` : `${140 - s.y}svh` }),
        center: { y: "0svh" },
        exit: (d: number) => ({ y: d >= 0 ? `${140 - s.y}svh` : `${-(s.y + 40)}svh` }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
      transition={SPRING}
    >
      <div className="sprite__float" style={{ animationDuration: `${s.dur}s` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.src} alt="" draggable={false} style={{ filter: s.blur ? `blur(${s.blur}px)` : undefined }} />
      </div>
    </motion.div>
  );
}

/* --------------------------------- prato --------------------------------- */

function Dish({
  index,
  dir,
  onSwipe,
  px,
  py,
}: {
  index: number;
  dir: number;
  onSwipe: (d: number) => void;
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const dish = DISHES[index];
  return (
    <motion.div className="hero__dishStage" style={{ x: px, y: py }}>
      <motion.div
        className="hero__dishDrag"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.35}
        dragMomentum={false}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50 || info.velocity.x < -400) onSwipe(1);
          else if (info.offset.x > 50 || info.velocity.x > 400) onSwipe(-1);
        }}
      >
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={dish.id}
          className="hero__dish"
          custom={dir}
          variants={{
            enter: (d: number) => ({ x: `${d * 90}vw`, rotate: d * 70, scale: 0.6 }),
            center: { x: "0vw", rotate: 0, scale: dish.scale },
            exit: (d: number) => ({ x: `${d * -90}vw`, rotate: d * -70, scale: 0.6 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={SPRING}
        >
          <div className="hero__dishFloat">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dish.image}
              width={dish.width}
              height={dish.height}
              alt={dish.name}
              draggable={false}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </div>
        </motion.div>
      </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------- hero --------------------------------- */

export default function Hero() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const index = mod(step);
  const dish = DISHES[index];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const lastChange = useRef(0);

  const go = useCallback((d: number) => {
    setDir(d);
    setStep((s) => s + d);
  }, []);

  const goTo = (i: number) => {
    if (i === index) return;
    setDir(i > index ? 1 : -1);
    setStep((s) => s + (i - index));
  };

  // cada troca (manual ou automática) zera o relógio do autoplay
  useEffect(() => {
    lastChange.current = Date.now();
  }, [step, paused]);

  // troca sozinho enquanto o hero está visível e a aba está aberta
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => {
      if (document.hidden) {
        lastChange.current = Date.now();
        return;
      }
      if (Date.now() - lastChange.current >= AUTOPLAY_MS) go(1);
    }, 200);
    return () => clearInterval(id);
  }, [paused, reduce, go]);

  // pré-carrega os outros pratos para a troca não piscar
  useEffect(() => {
    DISHES.forEach((d) => {
      const img = new Image();
      img.src = d.image;
    });
  }, []);

  // setas do teclado enquanto o hero está na tela
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (window.scrollY > window.innerHeight * 0.6) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // pausa quando o hero sai da tela
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // parallax do ponteiro (só mouse) — ingredientes derivam, o prato contra-deriva
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const dishX = useSpring(useTransform(mx, (v) => v * -14), { stiffness: 60, damping: 18 });
  const dishY = useSpring(useTransform(my, (v) => v * -10), { stiffness: 60, damping: 18 });
  const spriteX = useSpring(useTransform(mx, (v) => v * 26), { stiffness: 60, damping: 18 });
  const spriteY = useSpring(useTransform(my, (v) => v * 18), { stiffness: 60, damping: 18 });

  // ao rolar: o prato desce devagar e o palco escurece (transform/opacity apenas)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const shade = useTransform(scrollYProgress, [0, 0.9], [0, 0.7]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="hero"
      aria-roledescription="carrossel"
      aria-label="Destaques da brasa"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      style={{ ["--glow" as string]: dish.glow }}
    >
      <motion.div
        className="hero__bg"
        initial={false}
        animate={{ backgroundColor: dish.bg }}
        transition={{ duration: 1, ease: EASE }}
      />
      <div className="hero__floor" aria-hidden />
      <div className="hero__grain" aria-hidden />

      <motion.div className="hero__scene" style={reduce ? undefined : { y: sceneY, scale: sceneScale }}>
        <BigWord word={dish.word} dir={dir} />

        <motion.div className="hero__sprites hero__sprites--back" style={{ x: spriteX, y: spriteY }}>
          <AnimatePresence initial={false} custom={dir}>
            {dish.sprites.map((s, i) =>
              !s.front ? <FloatingSprite key={`${dish.id}-${i}`} s={s} dir={dir} /> : null,
            )}
          </AnimatePresence>
        </motion.div>
        <div className="hero__glow" aria-hidden />
        <Dish index={index} dir={dir} onSwipe={(d) => go(d)} px={dishX} py={dishY} />

        <motion.div className="hero__sprites hero__sprites--front" style={{ x: spriteX, y: spriteY }}>
          <AnimatePresence initial={false} custom={dir}>
            {dish.sprites.map((s, i) =>
              s.front ? <FloatingSprite key={`${dish.id}-${i}`} s={s} dir={dir} /> : null,
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <Embers count={36} />
      <motion.div className="hero__shade" style={{ opacity: shade }} aria-hidden />

      <div className="hero__top">
        <h1 className="hero__title">
          <span>Churrascaria Boi na Brasa</span>
          <span className="hero__titleDot" aria-hidden>
            ·
          </span>
          <span>O melhor almoço de Buritis</span>
        </h1>
      </div>

      <div className="hero__bottom">
        <div className="hero__caption" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <p className="hero__count">
                {String(index + 1).padStart(2, "0")} <i>/ {String(N).padStart(2, "0")}</i>
              </p>
              <p className="hero__name">{dish.name}</p>
              <p className="hero__detail">{dish.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hero__cta">
          <a className="btn btn--red btn--lg" href={whatsapp()} target="_blank" rel="noopener noreferrer">
            <WhatsIcon width={20} height={20} />
            Pedir no WhatsApp
          </a>
          <a className="btn btn--glass btn--lg" href="#cardapio">
            Ver cardápio
            <ArrowIcon width={18} height={18} />
          </a>
        </div>

        <div className="hero__controls">
          <a className="hero__rating" href="#avaliacoes">
            <StarIcon width={14} height={14} />
            <b>{RATINGS.google.score.toLocaleString("pt-BR")}</b> no Google · +{RATINGS.google.reviews.toLocaleString("pt-BR")} avaliações
          </a>
          <div className="hero__nav">
            <button className="hero__arrow hero__arrow--prev" onClick={() => go(-1)} aria-label="Anterior">
              <ChevronIcon />
            </button>
            <div className="hero__dots" role="tablist">
              {DISHES.map((d, i) => (
                <button
                  key={d.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={d.name}
                  className={`hero__dot${i === index ? " is-on" : ""}`}
                  onClick={() => goTo(i)}
                >
                  {i === index && (
                    <span
                      key={`${step}-${paused}`}
                      className={`hero__dotFill${paused || reduce ? " is-paused" : ""}`}
                      style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
                    />
                  )}
                </button>
              ))}
            </div>
            <button className="hero__arrow" onClick={() => go(1)} aria-label="Próximo">
              <ChevronIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
