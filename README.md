# Churrascaria Boi na Brasa — site

Next.js 16 (App Router) + TypeScript + Motion (Framer Motion). Sem GSAP/ScrollTrigger:
as animações de rolagem usam `position: sticky` + `useScroll` do Motion, que funcionam
igual no celular.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Onde mexer

- `src/data/site.ts` — **todo o conteúdo**: telefone, endereço, horário, pratos do hero,
  cardápio, números, avaliações, galeria e dúvidas.
- `src/sections/*` — uma seção por arquivo, na ordem de `src/app/page.tsx`.
- `src/styles/hero.css` e `src/styles/sections.css` — visual; tokens de cor em `src/app/globals.css`.
- `src/components/Logo.tsx` — logo vetorizado (touro + "BOI NA BRASA" traçados do logo original).

## Imagens

- `public/images/casa` — fotos reais do Instagram @boinabrasabts.
- `public/images/fotos` e `public/images/hero` — fotos do Unsplash (licença livre). Os
  pratos do hero foram recortados automaticamente. Troque por fotos reais da casa quando
  houver (mesmo nome de arquivo = nada para mudar no código).
