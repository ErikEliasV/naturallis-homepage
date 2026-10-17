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
| `npm run build`     | Gera o site estático em `out/`        |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | Checagem de tipos                     |
| `npm run format`    | Formata o projeto com Prettier        |
| `npm run check`     | Lint, tipos e formatação em sequência |

## Variáveis de ambiente

| Variável                | Uso                                                              |
| ----------------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Domínio público (URLs canônicas, sitemap, robots e Open Graph)   |
| `NEXT_PUBLIC_BASE_PATH` | Subcaminho do site (ex.: `/naturallis-homepage` no GitHub Pages) |

Sem elas, o site usa `http://localhost:3000` na raiz.

## Deploy (GitHub Pages)

O site é exportado como HTML estático (`output: "export"`). A cada push na `main`, o workflow
`.github/workflows/deploy-pages.yml` valida o código, gera o build com o `basePath` do repositório e
publica a pasta `out/` no GitHub Pages.

Configuração única no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Para pré-visualizar o build estático localmente, sirva a pasta `out/` com qualquer servidor de
arquivos estáticos.

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
