import Logo from "@/components/Logo";
import { TICKER } from "@/data/site";

/** faixa vermelha correndo — a fita "CHURRASCARIA" do logo virando letreiro */
export default function Ticker() {
  const row = (hidden: boolean) => (
    <ul className="ticker__row" aria-hidden={hidden}>
      {TICKER.map((t) => (
        <li key={t}>
          <span>{t}</span>
          <Logo variant="mark" className="ticker__bull" ink="currentColor" title="" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="ticker">
      <div className="ticker__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
