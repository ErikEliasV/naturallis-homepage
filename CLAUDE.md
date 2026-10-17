# Naturallis — Regras do projeto

Estas regras valem para todas as sessões. Leia antes de qualquer alteração.

## 1. Referência de design (Figma)

- Arquivo: https://www.figma.com/design/cX46oA5kqiI5oJFo1FQEeb/SITE-DEVELPMENT?node-id=0-1&p=f&t=m4az0MDoUa4dn4te-0
- Sempre leia o design pelo Figma MCP. Nunca trabalhe de memória nem por suposição.
  - `get_metadata` para listar páginas e frames e identificar as 3 telas base do site.
  - Para cada tela: `get_design_context`, `get_screenshot` e `get_variable_defs`.
  - `download_assets` para baixar imagens, ícones e fontes em `public/`.
- Cores, tipografia, espaçamentos, raios e sombras do Figma viram tokens do tema do Tailwind. Nada de valores soltos repetidos.
- As 3 telas do Figma são implementadas fiéis ao design: layout, proporções, tipografia e hierarquia visual.
- Páginas e seções que não estão no Figma são criadas seguindo o mesmo design system, linguagem visual e tom das 3 telas.
- Se o Figma MCP não responder ou algum frame não puder ser lido: pare e avise o usuário. Não invente o visual.

## 2. Stack obrigatória

- Next.js (versão estável mais recente), App Router, TypeScript
- Tailwind CSS para toda a estilização
- Three.js com WebGL para cenas 3D e efeitos de shader
- GSAP (com ScrollTrigger) para todas as animações
- Lenis para smooth scroll
- ESLint e Prettier (com prettier-plugin-tailwindcss)
- Gerenciador de pacotes: **npm**

Regras:

- Instale a versão estável mais recente de cada biblioteca e confirme compatibilidade com a versão do Next.js.
- Não adicione bibliotecas fora desta lista sem perguntar. Pacotes oficiais do ecossistema GSAP (como `@gsap/react`) são permitidos.
- Sem CSS Modules, styled-components ou outra solução de CSS. O `globals.css` guarda só as diretivas do Tailwind e as variáveis do tema.

## 3. Git Flow (regra permanente)

- `main`: só código pronto para produção. Nunca commitar direto.
- `develop`: branch de integração. Nunca commitar direto.
- `feature/<nome-da-feature>`: uma branch por feature, sempre criada a partir da `develop`.
- `release/<versao>` e `hotfix/<descricao>` quando necessários, conforme o Git Flow padrão.

Fluxo de cada feature:

1. Atualize a `develop`.
2. Crie `feature/<nome>` a partir dela.
3. Implemente só aquela feature, com commits pequenos e frequentes.
4. Rode lint, checagem de tipos e build antes de finalizar.
5. Faça o merge na `develop` e só então comece a próxima feature, em outra branch.

Se um pedido misturar duas features, divida em branches separadas.

Mensagens: Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`, `test:`), curtas e no imperativo.

## 4. Autoria dos commits (regra permanente)

Commits e PRs saem como se fossem 100% do usuário:

- Nunca adicione `Co-Authored-By`, "Generated with ..." ou qualquer menção a assistente ou IA na mensagem, no corpo, em trailers, em PRs, em comentários de código ou em arquivos do projeto.
- Não altere `user.name` nem `user.email` do Git. Use a configuração existente na máquina.
- A atribuição automática de commits e PRs fica vazia (`attribution` com `commit` e `pr` vazios).
- Antes de cada commit, confira a mensagem. Se houver qualquer trailer de autoria, remova.

## 5. Animações e interação

O site deve ter animações modernas e suaves em toda a experiência.

### Base técnica

- Lenis controla o scroll, sincronizado com o GSAP: um único loop via `gsap.ticker`, `lenis.on('scroll', ScrollTrigger.update)` e `gsap.ticker.lagSmoothing(0)`.
- Registro dos plugins do GSAP e provider do Lenis ficam em `src/lib/`; o provider é usado no layout.
- Em componentes React, use `useGSAP` (ou `gsap.context`) para que toda animação seja limpa ao desmontar.

### O que animar

- Preloader de entrada e transições suaves entre páginas.
- Entrada do conteúdo no scroll: reveals de texto (linhas, palavras ou letras), fade e deslocamento em y, com stagger.
- Parallax em imagens e seções.
- Hero e seções-chave com cena 3D em Three.js reagindo ao scroll e ao mouse, com shaders WebGL onde fizer sentido.
- Botões magnéticos, microinterações de hover e cursor personalizado (desktop).
- Header que reage ao scroll (esconde, revela, muda de estilo).

### Padrão de movimento

- Easings suaves (`power3.out`, `expo.out`, `power2.inOut`). Nunca linear em movimento de interface.
- Entradas entre 0,6 s e 1,2 s. Interações curtas entre 0,2 s e 0,4 s.
- O mesmo vocabulário de movimento em todas as páginas.

### Performance e robustez

- Meta de 60 fps. Anime preferencialmente `transform` e `opacity`.
- Three.js: `devicePixelRatio` limitado a 2, render pausado quando a cena está fora da tela, `dispose` de geometrias, materiais, texturas e renderer ao desmontar.
- Cenas 3D carregadas com dynamic import e `ssr: false`.
- Respeite `prefers-reduced-motion`: reduza ou desligue animações e smooth scroll.
- Fallback estático quando WebGL não estiver disponível e versão mais leve para mobile.

## 6. Estrutura de pastas (padrão obrigatório)

```
├── public/                  # imagens, fontes, ícones estáticos
├── src/
│   ├── app/                 # rotas, layouts e páginas (apenas roteamento)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── (nome-da-rota)/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/              # componentes base reutilizáveis (Button, Input, Card)
│   │   ├── layout/          # Header, Footer, Container, Navbar
│   │   └── sections/        # seções de página (Hero, Features, CTA)
│   ├── features/            # código agrupado por funcionalidade
│   │   └── <feature>/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── types.ts
│   ├── hooks/               # hooks globais
│   ├── lib/                 # configuração de bibliotecas e helpers de terceiros
│   ├── services/            # chamadas a APIs externas
│   ├── constants/           # constantes e dados fixos
│   ├── utils/               # funções utilitárias puras
│   ├── types/               # tipos globais
│   └── styles/
│       └── globals.css
├── CLAUDE.md
└── ...arquivos de configuração
```

Convenções:

- Arquivos e pastas em kebab-case. Componentes em PascalCase, um por arquivo.
- Hooks com prefixo `use`. Constantes em `UPPER_SNAKE_CASE`.
- Alias `@/` aponta para `src/`.
- `app/` contém só rotas e composição. A lógica fica em `features/`, `components/` e `hooks/`.
- Server Components por padrão. `"use client"` só onde houver interação, GSAP, Lenis ou Three.js.
- Subpastas dentro desta estrutura são permitidas (ex.: `lib/three/`). Pastas novas no nível raiz ou em `src/` exigem perguntar antes.

## 7. Qualidade

- HTML semântico, `alt` em todas as imagens, contraste adequado e navegação por teclado.
- `next/image`, `next/font` e metadata do Next.js para imagens, fontes e SEO.
- Responsivo, mobile-first.
- Sem `any`. Antes de dar uma feature como pronta: lint, tipos e build sem erros.
- Conteúdo em português do Brasil, a menos que o Figma indique outro idioma.

## 8. Forma de trabalho

- Ordem das features: setup inicial → infraestrutura de animação (`feature/smooth-scroll-gsap`) → layout global → as 3 telas do Figma → demais páginas.
- Ao fim de cada feature, informe em uma ou duas frases o que foi feito.
- Só pare para perguntar se faltar uma informação essencial.

## 9. Referências do projeto

### Figma

O arquivo também guarda outro projeto (página "ELLE FANNING"). As telas da Naturallis são os três últimos frames:

| Tela      | Node        | Observações                                                                       |
| --------- | ----------- | --------------------------------------------------------------------------------- |
| Home      | `2803:3513` | Layout de 1440 ampliado para 1920 (×1,333). Tokens fluidos batem em 1920.         |
| Categoria | `2803:4136` | Tema base com textos em inglês: conteúdo traduzido para PT-BR e preços em R$.     |
| Produto   | `2803:4360` | Imagens do frasco "wellina" (outra marca) substituídas pelo frasco da Naturallis. |

O arquivo não tem variáveis: os tokens de `src/styles/globals.css` foram extraídos dos layers. Em frames grandes, `get_design_context` devolve só metadados; leia por seção.

### Decisões

- Fontes: Nohemi (títulos, `.otf` original, sem conversão por causa da licença), SF Pro Display (texto, arquivos enviados pelo usuário; a licença da Apple não cobre uso web, a troca pela Geist é uma linha em `--font-sans`), Geist e Instrument Serif (páginas de loja) e Montserrat (só no rótulo do frasco).
- O card de produto escala com a própria largura (container queries, base 427px).
- Carrinho no `localStorage`; checkout, formulários e pedidos seguem pelo WhatsApp (sem backend).
- Dados provisórios a substituir: contatos e CNPJ (`src/constants/contact.ts`), catálogo e preços (`src/constants/products.ts`).
- `NEXT_PUBLIC_SITE_URL` define o domínio usado em metadata, sitemap e Open Graph.

### Ambiente

- Se tokens novos do Tailwind não aparecerem no `next dev`, apague `.next/dev` e reinicie (cache do Turbopack). O `next build` gera o CSS corretamente.
