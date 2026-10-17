# Naturallis

Site institucional e vitrine da Naturallis: fórmulas manipuladas, suplementos e produtos de cuidado.

## Stack

- Next.js 16 (App Router) e TypeScript
- Tailwind CSS 4 (tokens em `src/styles/globals.css`)
- GSAP com ScrollTrigger e Lenis para animações e smooth scroll
- Three.js para as cenas WebGL
- ESLint e Prettier (com `prettier-plugin-tailwindcss`)

## Scripts

| Comando             | Descrição                             |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento           |
| `npm run build`     | Build de produção                     |
| `npm run start`     | Servidor de produção                  |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | Checagem de tipos                     |
| `npm run format`    | Formata o projeto com Prettier        |
| `npm run check`     | Lint, tipos e formatação em sequência |

## Estrutura

```
src/
├── app/          rotas, layouts e páginas
├── components/   ui, layout e sections
├── features/     código agrupado por funcionalidade
├── hooks/        hooks globais
├── lib/          configuração de bibliotecas
├── services/     chamadas a APIs externas
├── constants/    constantes e dados fixos
├── utils/        funções utilitárias puras
├── types/        tipos globais
└── styles/       globals.css (Tailwind e tokens do tema)
```

## Fluxo de trabalho

Git Flow: `main` (produção), `develop` (integração) e `feature/<nome>` a partir da `develop`.
Mensagens no padrão Conventional Commits.

## Fontes

- Nohemi, de Rajesh Rajput: freeware para uso pessoal e comercial. Os arquivos não podem ser modificados.
- SF Pro Display, da Apple: a licença restringe o uso a interfaces nas plataformas Apple. Confirme a licença antes de publicar.
- Geist e Instrument Serif: Google Fonts (SIL Open Font License).
