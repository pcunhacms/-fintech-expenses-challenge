# Fintech Expense Corporate Case

Aplicação full stack para controle financeiro com autenticação, categorias, transações e dashboard.

## Stack

* **Backend:** NestJS + TypeScript + TypeORM + JWT
* **Frontend:** React + TypeScript + Vite + Zustand
* **Banco de Dados:** PostgreSQL

## Estrutura do Repositório

* `gf-case-api/` — API backend
* `gf-case-web/` — Frontend React

## Funcionalidades

### Autenticação

* Cadastro de usuário
* Login com JWT
* Rotas protegidas
* Cada usuário acessa apenas seus próprios dados

### Categorias

* Criar categoria
* Listar categorias
* Atualizar categoria
* Excluir categoria

### Transações

* Criar transação
* Editar transação
* Excluir transação
* Paginação
* Filtros por categoria
* Filtros por tipo (entrada e saída)
* Filtros por período

### Dashboard

* Saldo atual
* Total de entradas
* Total de saídas
* Top 3 categorias com maior volume de saídas

## Decisões Técnicas

### Gerenciamento de Estado

Foi utilizado o Zustand para gerenciar o estado de autenticação da aplicação.

A escolha foi feita porque o projeto possui uma complexidade pequena a moderada e essa abordagem mantém a lógica simples, fácil de entender e sem muita configuração. Para este MVP, o Zustand atende bem ao armazenamento do usuário autenticado e do token JWT sem a necessidade de soluções mais robustas.

## Pré-requisitos

* Node.js 18+
* npm
* PostgreSQL

## Configuração de Ambiente

### Backend

Entre na pasta do backend:

```bash
cd gf-case-api
```

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Configure as variáveis:

```env
DATABASE_URL=postgresql://usuario:senha@host:porta/nome_do_banco
FRONTEND_URL=http://localhost:5173
JWT_SECRET=seu_secret
PORT=3000
```

### Frontend

Entre na pasta do frontend:

```bash
cd gf-case-web
```

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Configure a URL da API:

```env
VITE_API_URL=http://localhost:3000
```

## Instalação das Dependências

### Backend

```bash
cd gf-case-api
npm install
```

### Frontend

```bash
cd gf-case-web
npm install
```

## Executando a Aplicação

### Backend

```bash
cd gf-case-api
npm run start:dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

### Frontend

```bash
cd gf-case-web
npm run dev
```

O frontend ficará disponível em:

```text
http://localhost:5173
```

## Build

### Backend

```bash
npm run build
```

### Frontend

```bash
npm run build
```

## Testes

Executa os testes automatizados das funcionalidades da aplicação:

```bash
npm run test
```

Executa os testes de ingestão/população de dados utilizados durante os testes:

```bash
npm run test:seed
```

Scripts disponíveis:

```json
{
  "test": "jest",
  "test:seed": "jest --config ./test/jest-e2e.json"
}
```

## Deploy

### Frontend

https://gf-case-web.onrender.com

### Backend

https://gf-case-api.onrender.com

## Usuário para Teste

Email:

```text
admin@case.com
```

Senha:

```text
123456
```


<<<<<<< HEAD
=======

>>>>>>> 04d75da (fix: ajustando problema de carregamento das transactions depois de limpar os filtros aplicados)
## Observações

* O frontend utiliza Zustand para gerenciamento de autenticação.
* O backend utiliza validação de dados com class-validator.
* O CORS é configurado para permitir acesso do frontend local e também de uma origem configurada através da variável `FRONTEND_URL`.
* O projeto foi desenvolvido utilizando TypeScript em modo strict tanto no backend quanto no frontend.
