import Image from "next/image";
import Embers from "@/components/Embers";
import { WhatsIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { WHATSAPP_LABEL, whatsapp } from "@/data/site";

const STEPS = [
  { n: "01", title: "Chame no WhatsApp", text: `Mande uma mensagem para ${WHATSAPP_LABEL}.` },
  { n: "02", title: "Escolha a marmita", text: "A gente passa o cardápio do dia e as carnes da brasa." },
  { n: "03", title: "Receba quentinho", text: "Embalado com cuidado e entregue em Buritis." },
];

export default function Delivery() {
  return (
    <section id="delivery" className="delivery">
      <div className="delivery__bg">
        <Image src="/images/fotos/brasa-carvao.webp" alt="" fill sizes="100vw" />
      </div>
      <Embers count={20} seed={31} className="embers--soft" />

      <div className="wrap delivery__grid">
        <div>
          <SectionHead
            eyebrow="Marmitas & delivery"
            tone="light"
            title={
              <>
                O almoço da brasa, <em>na sua porta.</em>
              </>
            }
            text="Sem tempo para sair do trabalho? O mesmo sabor do salão chega até você, de segunda a sábado."
          />

          <ol className="steps">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} className="step" delay={i * 0.08}>
                <span className="step__n">{s.n}</span>
                <div>
                  <b>{s.title}</b>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={0.2}>
            <a
              className="btn btn--red btn--lg"
              href={whatsapp("Olá! Quero pedir marmita para entrega. Qual é o cardápio de hoje?")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsIcon width={20} height={20} /> Pedir marmita agora
            </a>
          </Reveal>
        </div>

        <Reveal className="delivery__phone" y={60}>
          <Image src="/images/casa/delivery-moto.webp" alt="Entregador da Boi na Brasa saindo para entrega" fill sizes="(max-width: 900px) 80vw, 380px" />
          <div className="delivery__badge">
            <WhatsIcon width={18} height={18} />
            <span>
              <b>Pedido confirmado</b>
              <i>Sua marmita já está a caminho</i>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
