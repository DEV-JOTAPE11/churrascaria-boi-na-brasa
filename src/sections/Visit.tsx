import { ClockIcon, PhoneIcon, PinIcon, RouteIcon, WhatsIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import {
  ADDRESS,
  DIRECTIONS_URL,
  HOURS,
  MAPS_EMBED,
  PHONE_E164,
  PHONE_LABEL,
  WHATSAPP_LABEL,
  whatsapp,
} from "@/data/site";

export default function Visit() {
  return (
    <section id="visite" className="section visit">
      <div className="wrap">
        <SectionHead
          eyebrow="Visite"
          title={
            <>
              A brasa está acesa. <em>Vem almoçar.</em>
            </>
          }
        />

        <div className="visit__grid">
          <Reveal className="visit__map">
            <iframe
              title="Mapa: Churrascaria Boi na Brasa em Buritis"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <div className="visit__cards">
            <Reveal className="info" delay={0.05}>
              <PinIcon className="info__icon" />
              <div>
                <p className="info__label">Endereço</p>
                <p className="info__big">{ADDRESS.street}</p>
                <p>
                  {ADDRESS.district}, {ADDRESS.city} – {ADDRESS.state} · {ADDRESS.zip}
                </p>
                <a className="btn btn--dark btn--sm" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                  <RouteIcon width={16} height={16} /> Traçar rota
                </a>
              </div>
            </Reveal>

            <Reveal className="info" delay={0.1}>
              <ClockIcon className="info__icon" />
              <div>
                <p className="info__label">Horário</p>
                <ul className="hours">
                  {HOURS.map((h) => (
                    <li key={h.day} className={h.open ? "" : "is-closed"}>
                      <span>{h.day}</span>
                      <b>{h.time}</b>
                    </li>
                  ))}
                </ul>
                <p className="info__note">Self-service com churrasco no almoço.</p>
              </div>
            </Reveal>

            <Reveal className="info" delay={0.15}>
              <PhoneIcon className="info__icon" />
              <div>
                <p className="info__label">Contato</p>
                <p className="info__big">{WHATSAPP_LABEL}</p>
                <p>WhatsApp · Fixo {PHONE_LABEL}</p>
                <div className="info__row">
                  <a className="btn btn--red btn--sm" href={whatsapp()} target="_blank" rel="noopener noreferrer">
                    <WhatsIcon width={16} height={16} /> WhatsApp
                  </a>
                  <a className="btn btn--dark btn--sm" href={`tel:${PHONE_E164}`}>
                    <PhoneIcon width={16} height={16} /> Ligar
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
