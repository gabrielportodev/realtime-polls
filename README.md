# Realtime Polls

Sistema de enquetes em tempo real desenvolvido como solução para o desafio frontend da **Union Developers**. Permite criar enquetes com múltiplas opções, definir uma janela de votação e acompanhar os votos sendo atualizados em tempo real, sem precisar recarregar a página.

## Stack

- **[Next.js 15](https://nextjs.org/)** (App Router) + **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4** + **shadcn/ui** + **Radix UI**
- **Supabase** (Postgres + Realtime) via `@supabase/ssr`
- **React Hook Form** + **Zod** para formulários e validação
- **Storybook** para documentação dos componentes
- **Vitest** + **Testing Library** + **Playwright** para testes unitários e de browser

## Funcionalidades

- Criar enquete com título, datas de início/fim e no mínimo 3 opções (sem máximo)
- Listar todas as enquetes
- Filtrar enquetes por status (`Não Iniciada`, `Em Andamento`, `Finalizada`)
- Votação com opções e botão desabilitados fora da janela ativa
- Atualização dos votos em tempo real via Supabase Realtime
- Visualização de resultados com barra de proporção

## Como rodar o projeto

### Pré-requisitos

- Node.js 20+
- Uma conta gratuita no [Supabase](https://supabase.com/)

### 1. Schema do banco

Acesse [supabase.com](https://supabase.com/), crie um novo projeto e abra o **SQL Editor**. Execute o script abaixo para criar as tabelas e políticas de acesso:

```sql
-- Enquetes
create table polls (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  start_at timestamptz not null,
  end_at timestamptz not null,
  created_at timestamptz default now()
);

-- Opções
create table poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid references polls(id) on delete cascade,
  text text not null
);

-- Votos
create table votes (
  id uuid primary key default gen_random_uuid(),
  poll_option_id uuid references poll_options(id) on delete cascade,
  created_at timestamptz default now()
);

alter publication supabase_realtime add table votes;

-- Libera leitura e escrita pública nas 3 tabelas

alter table polls enable row level security;
alter table poll_options enable row level security;
alter table votes enable row level security;

-- polls
create policy "permitir leitura publica de polls"
  on polls for select using (true);

create policy "permitir criacao publica de polls"
  on polls for insert with check (true);

-- poll_options
create policy "permitir leitura publica de poll_options"
  on poll_options for select using (true);

create policy "permitir criacao publica de poll_options"
  on poll_options for insert with check (true);

-- votes
create policy "permitir leitura publica de votes"
  on votes for select using (true);

create policy "permitir criacao publica de votes"
  on votes for insert with check (true);
```

### 2. Clonar o repositório

```bash
git clone https://github.com/gabrielportodev/realtime-polls.git
cd realtime-polls
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Variáveis de ambiente

```bash
cp .env.example .env
```

Preencha com a **Project URL** e a **anon/publishable key** do seu projeto Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua-anon-key
```

### 5. Rodar o projeto

```bash
npm run dev           # http://localhost:3000
npm run build         # build de produção
npm run start         # serve o build
```

### Storybook e testes

```bash
npm run storybook         # Storybook em http://localhost:6006
npm run lint              # ESLint
npm run format            # Prettier
```

Os testes Vitest são executados via Storybook (`@storybook/addon-vitest`) e por arquivos `*.test.tsx` na árvore de componentes. Cada componente possui sua story e seu arquivo de teste correspondente.

## Estrutura do projeto

```
src/
├── app/                         # App Router (rotas)
│   ├── layout.tsx               # Layout raiz
│   ├── page.tsx                 # Redireciona para /polls
│   ├── not-found.tsx            # Página 404
│   └── polls/
│       ├── page.tsx             # Listagem com filtro de status
│       ├── new/page.tsx         # Criação de enquete
│       └── [id]/page.tsx        # Detalhe + votação realtime
├── components/
│   ├── poll/                    # Componentes de domínio
│   │   ├── create-poll-form     # Formulário de criação
│   │   ├── header               # Cabeçalho das páginas de enquete
│   │   ├── poll-card            # Card de enquete na listagem
│   │   ├── poll-card-skeleton   # Skeleton do PollCard
│   │   ├── polls-filter         # Filtro por status
│   │   ├── poll-voting          # Votação e resultados em realtime
│   │   ├── poll-voting-skeleton # Skeleton do PollVoting
│   │   └── vote-bar             # Barra de proporção de votos
│   └── ui/                      # Componentes base
│       ├── button
│       ├── card
│       ├── date-input
│       ├── input
│       ├── radio-option
│       ├── select
│       ├── skeleton
│       └── spinner
├── lib/
│   ├── format-date.ts           # Formatação de datas
│   ├── get-poll-status.ts       # Lógica de status (not_started / ongoing / finished)
│   ├── utils.ts
│   └── supabase/
│       ├── client.ts            # Client browser
│       ├── server.ts            # Client server
│       ├── middleware.ts        # Client middleware
│       ├── queries.ts           # Queries client-side
│       └── server-queries.ts   # Queries server-side
├── middleware.ts                # Middleware Next.js (Supabase auth)
├── schemas/
│   └── create-poll-schema.ts   # Schema Zod do formulário
└── types/
    └── index.ts                 # Tipos compartilhados
```
