# Fintech Expense Corporate Case

Aplicação full stack para controle financeiro com autenticação, categorias, transações e dashboard.

## Stack

- **Backend**: NestJS + TypeScript + TypeORM + JWT
- **Frontend**: React + TypeScript + Vite + Zustand
- **Banco**: PostgreSQL

## Estrutura do repositório

- `gf-case-api/` — API backend
- `gf-case-web/` — frontend

## Requisitos

- Node.js 18+
- npm
- PostgreSQL

## Configuração de ambiente

### Backend

1. Entre na pasta do backend:
   ```bash
   cd gf-case-api
   ```
2. Copie o exemplo de variáveis:
   ```bash
   cp .env.example .env
   ```
3. Ajuste o arquivo `.env` com sua configuração:
   ```env
   DATABASE_URL=postgresql://usuario:senha@host:porta/nome_do_banco
   DB_SSL=true
   DB_SYNCHRONIZE=false
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=seu_secret
   PORT=3000
   ```

> `DATABASE_URL` é a forma preferida de conexão. Os campos `DB_SSL` e `DB_SYNCHRONIZE` ajudam a ajustar o comportamento para ambientes locais ou de produção.

### Frontend

1. Entre na pasta do frontend:
   ```bash
   cd gf-case-web
   ```
2. Copie o exemplo:
   ```bash
   cp .env.example .env
   ```
3. Ajuste a URL da API:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

## Como rodar localmente

### Backend

```bash
cd gf-case-api
npm install
npm run start:dev
```

A API fica disponível em `http://localhost:3000`.

### Frontend

```bash
cd gf-case-web
npm install
npm run dev
```

O frontend fica disponível em `http://localhost:5173`.

## Verificações úteis

- `npm run build` — gera a versão de produção
- `npm run test` — executa os testes automatizados

## Observações importantes

- O frontend usa Zustand para manter autenticação e sessão do usuário.
- O backend valida os dados de entrada com `class-validator`.
- O CORS está configurado para aceitar o frontend local e também uma origem configurável via `FRONTEND_URL`.
