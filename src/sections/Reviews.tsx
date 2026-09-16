import { StarIcon } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { MAPS_URL, RATINGS, REVIEWS } from "@/data/site";

const Stars = ({ score }: { score: number }) => (
  <span className="stars" style={{ ["--score" as string]: score }} aria-label={`${score} de 5 estrelas`}>
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} width={18} height={18} />
    ))}
  </span>
);

/** autoridade: as notas públicas e o que os clientes mais elogiam */
export default function Reviews() {
  return (
    <section id="avaliacoes" className="section reviews">
      <div className="wrap">
        <SectionHead
          eyebrow="Avaliações"
          title={
            <>
              Quem prova, <em>recomenda.</em>
            </>
          }
          text="Mais de mil avaliações no Google e entre os restaurantes mais bem colocados de Buritis no Tripadvisor."
        />

        <div className="reviews__scores">
          <Reveal className="score">
            <p className="score__brand">Google</p>
            <p className="score__value">{RATINGS.google.score.toLocaleString("pt-BR")}</p>
            <Stars score={RATINGS.google.score} />
            <p className="score__note">+{RATINGS.google.reviews.toLocaleString("pt-BR")} avaliações</p>
          </Reveal>
          <Reveal className="score" delay={0.08}>
            <p className="score__brand">Tripadvisor</p>
            <p className="score__value">{RATINGS.tripadvisor.score.toLocaleString("pt-BR")}</p>
            <Stars score={RATINGS.tripadvisor.score} />
            <p className="score__note">{RATINGS.tripadvisor.rank}</p>
          </Reveal>
        </div>

        <ul className="reviews__list">
          {REVIEWS.map((r, i) => (
            <Reveal as="li" key={i} className="quote" delay={i * 0.08}>
              <span className="quote__mark" aria-hidden>
                “
              </span>
              <p className="quote__text">{r.text}</p>
              <p className="quote__src">{r.source}</p>
            </Reveal>
          ))}
        </ul>

        <p className="reviews__more">
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
            Ver todas as avaliações no Google →
          </a>
        </p>
      </div>
    </section>
  );
}
