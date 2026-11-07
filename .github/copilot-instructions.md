# Instruções do Copilot para o projeto DevOps Abacaxi

## Visão geral

Este repositório é um monorepo com dois projetos independentes:

- `abacaxi-backend/`: API em Node.js + Express + Sequelize, com suporte a MySQL local e PostgreSQL em produção.
- `abacaxi-frontend/`: aplicação web em React + Vite para consumir a API.

O deploy é feito no Render com serviços separados: o backend em um `Web Service` e o frontend em um `Static Site`. Os dois projetos compartilham o mesmo repositório, mas cada um tem seu próprio `package.json`, `node_modules` e variáveis de ambiente.

## Estrutura do projeto

- `README.md`: visão geral do projeto, arquitetura e deploy.
- `abacaxi-backend/README.md`: instruções de execução local, banco e deploy da API.
- `abacaxi-frontend/README.md`: instruções de execução local e deploy do frontend.
- `abacaxi-backend/src/`: API, modelos, rotas e middleware.
- `abacaxi-frontend/src/`: páginas, componentes, API client e estilos.

## Convenções importantes

- Trate backend e frontend como projetos distintos. Não misture dependências, scripts ou arquivos de configuração entre as pastas.
- Sempre execute comandos dentro da pasta correta (`abacaxi-backend` ou `abacaxi-frontend`).
- Mantenha a arquitetura atual: backend com Express e Sequelize, frontend com React + Vite.
- Prefira JavaScript simples e direto, conforme o padrão já usado no projeto. Não introduza TypeScript, frameworks extras ou refatorações grandes sem necessidade.
- Evite alterar o comportamento da API ou do frontend sem ajustar o contrato entre ambos.
- Preserve o padrão de nomes em português, conforme o domínio da aplicação (colheitas, vendas, resumo, painel, login).

## Backend (`abacaxi-backend`)

### Tecnologias e padrões

- Node.js com Express.
- Sequelize para acesso ao banco de dados.
- Suporte a duas configurações de banco:
  - local: MySQL usando `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
  - produção: PostgreSQL via `DATABASE_URL`
- Autenticação JWT em rotas protegidas.
- O banco e o usuário administrador são criados automaticamente ao iniciar a API (`sequelize.sync()` e `criarAdmin()`).

### Regras ao editar o backend

- Mantenha a lógica de autenticação em `src/middleware/auth.js` e as rotas em `src/routes/`.
- Se criar ou alterar modelos, ajuste as rotas e o frontend quando necessário.
- Preserve `CORS` configurado com `FRONTEND_URL` ou `*` em desenvolvimento.
- Não hardcodeie valores de produção; use variáveis de ambiente.
- Não incluir `.env` no Git. O projeto já usa `.gitignore` para isso.

### Variáveis de ambiente esperadas

No backend, o arquivo `.env` costuma conter:

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` para MySQL local
- `DATABASE_URL` para PostgreSQL no Render
- `JWT_SECRET`
- `ADMIN_USER`, `ADMIN_PASSWORD`
- `FRONTEND_URL`
- `PORT` (opcional; o Render define isso sozinho)

### Comandos úteis

- `cd abacaxi-backend`
- `npm install`
- `npm run dev` para desenvolvimento
- `npm start` para execução normal

## Frontend (`abacaxi-frontend`)

### Tecnologias e padrões

- React + Vite.
- Requisições à API via `src/api.js`.
- Variável de ambiente `VITE_API_URL` para apontar para a API.
- Persistência do token JWT em `localStorage`.

### Regras ao editar o frontend

- Use `src/api.js` como ponto central para chamadas HTTP.
- Mantenha a lógica de login e proteção de rotas consistente com a API.
- Para mudanças na API, valide que o frontend continua consumindo os mesmos campos e respostas.
- Como o Vite grava `VITE_*` no build, alterações nessa variável exigem rebuild/redeploy.
- Não introduza bibliotecas extras sem necessidade.

### Variáveis de ambiente esperadas

No frontend, o arquivo `.env` costuma conter:

- `VITE_API_URL=http://localhost:3001` para desenvolvimento

### Comandos úteis

- `cd abacaxi-frontend`
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Validação e qualidade

- Antes de concluir uma alteração, valide com o menor comando relevante:
  - backend: `npm run dev` ou `npm start` dentro de `abacaxi-backend`
  - frontend: `npm run build` dentro de `abacaxi-frontend`
- Se a mudança afetar a comunicação entre frontend e backend, teste o fluxo completo localmente.
- Não adicione arquivos temporários, logs de debug ou `node_modules` ao repositório.
- Mantenha as alterações focadas e coerentes com o contexto do projeto.

## Deploy e ambiente de produção

- O backend e o frontend devem ser publicados em serviços separados no Render.
- O `Root Directory` é essencial: `abacaxi-backend` para a API e `abacaxi-frontend` para o site.
- O frontend precisa da URL da API em `VITE_API_URL` no build.
- A API precisa receber a URL do frontend em `FRONTEND_URL` para liberar CORS.
- Respeite a ordem de deploy descrita no README raiz e nos READMEs internos.

## Diretrizes gerais para alterações

- Sempre leia os READMEs antes de propor mudanças de infra/arquitetura.
- Favor evoluir o código sem quebrar a experiência atual do usuário.
- Prefira patches pequenos, bem definidos e compatíveis com o fluxo atual da aplicação.
- Quando houver dúvida sobre comportamento do sistema, siga o padrão já implementado em backend e frontend em vez de criar abstrações novas.

## Commits

- Use mensagens no padrão Conventional Commits: `<tipo>(<escopo>): <descrição>`, com escopo opcional.
- Escolha o tipo conforme a mudança: `feat` para funcionalidade, `fix` para correção, `docs` para documentação, `refactor` para refatoração, `test` para testes e `chore` para manutenção.
- Escreva uma descrição curta e objetiva, iniciando com verbo no imperativo; não termine com ponto.
- Para mudanças incompatíveis, marque o tipo com `!` e explique a quebra no corpo ou em um rodapé `BREAKING CHANGE:`.
- Mantenha cada commit focado nas alterações relacionadas.

## Contexto do domínio

A aplicação controla uma fazenda de abacaxis e envolve:

- login de usuário
- cadastro de colheitas
- cadastro de vendas
- cálculo de estoque
- resumo financeiro e de produção

Ao trabalhar no projeto, mantenha o contexto do domínio e evite renomear campos ou rotas sem considerar impacto no frontend e no backend.
