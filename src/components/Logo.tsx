import { BULL_PATH, WORD_PATH } from "./logoPaths";

/**
 * Logo da Boi na Brasa redesenhado em vetor: o touro no espeto e o "BOI NA
 * BRASA" vêm do traçado do logo original; a faixa é desenhada e o
 * "CHURRASCARIA" usa a Cinzel, a serifada mais próxima da original.
 */
export default function Logo({
  variant = "full",
  ink = "var(--cream)",
  ribbon = "var(--red)",
  ribbonText = "var(--cream)",
  className,
  title = "Churrascaria Boi na Brasa",
}: {
  variant?: "full" | "mark";
  ink?: string;
  ribbon?: string;
  ribbonText?: string;
  className?: string;
  title?: string;
}) {
  if (variant === "mark") {
    return (
      <svg className={className} viewBox="520 125 960 340" role="img" aria-label={title}>
        <path d={BULL_PATH} fill={ink} fillRule="evenodd" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="170 120 1660 800" role="img" aria-label={title}>
      <g fill={ink} fillRule="evenodd">
        <path d={BULL_PATH} />
        <path d={WORD_PATH} />
      </g>
      <g fill={ribbon}>
        <path d="M304 476h1390v180H304z" />
        <path d="M288 500H182l47 67-47 67h106z" />
        <path d="M1710 500h104l-47 67 47 67h-104z" />
      </g>
      <text
        x="999"
        y="603"
        textAnchor="middle"
        fontFamily="var(--font-cinzel), Georgia, serif"
        fontSize="104"
        fontWeight="600"
        textLength="1180"
        lengthAdjust="spacing"
        fill={ribbonText}
      >
        CHURRASCARIA
      </text>
    </svg>
  );
}
