---
applyTo: "abacaxi-frontend/**/*.{js,jsx,css,html,md}"
description: "Use when: working on frontend screens, styling, layout, components, colors, buttons, icons, forms, or documentation in the Abacaxi UI."
---

# Guia de estilo visual do frontend

## Referência oficial

Consulte o [Style Guide do frontend](../../abacaxi-frontend/STYLE-GUIDE.md) como referência central para paleta, tipografia, layout, componentes, estados e acessibilidade. Ao alterar um padrão visual reutilizável, atualize também esse documento e `abacaxi-frontend/src/styles.css`.

## Visão geral do frontend

O frontend do projeto está em `abacaxi-frontend/` e foi construído com React + Vite. Ele é a camada de interface da aplicação da fazenda de abacaxis e deve manter um visual simples, funcional e consistente com o restante do sistema.

### Estrutura principal

```text
abacaxi-frontend/
├── README.md
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── api.js
    ├── main.jsx
    ├── styles.css
    └── pages/
        ├── Colheitas.jsx
        ├── Login.jsx
        ├── Painel.jsx
        └── Vendas.jsx
```

## Objetivo visual

A interface deve seguir um estilo:

- limpo
- direto
- fácil de ler
- profissional, mas sem exageros
- orientado à produtividade e ao uso de dashboard

A aplicação está focada em gestão da fazenda, então a UI deve transmitir clareza, organização e confiança, sem ficar visualmente poluída ou ornamental.

## Documentação de interface

Ao alterar a interface, mantenha os seguintes pontos em mente:

- O frontend é a representação do sistema para o usuário final.
- A interface deve oferecer Português (`pt-BR`, padrão), inglês (`en`) e chinês simplificado (`zh-CN`).
- Todo texto novo visível ao usuário deve ser adicionado às traduções em `abacaxi-frontend/src/i18n.js`; não deixe rótulos ou mensagens de interface fixos em um único idioma.
- Use o seletor de bandeiras existente e preserve a preferência `idioma` no `localStorage`, inclusive ao sair da conta.
- Formate datas, números e valores monetários com a localidade selecionada.
- Os nomes de telas e ações devem refletir o domínio da aplicação: login, painel, colheitas, vendas, resumo, estoque.
- Documente mudanças relevantes de visual em `abacaxi-frontend/README.md` quando houver ajuste de fluxo, tela ou comportamento de interação.
- Sempre que uma alteração alterar a experiência de uso, revise se o README e a intenção do projeto continuam coerentes.

## Estilo visual recomendado

### Layout

- Use espaçamento consistente entre blocos, cards e seções.
- Mantenha linhas e alinhamentos limpos.
- Priorize leitura em telas de desktop e também em telas menores.
- Agrupe informações relacionadas em blocos visuais bem definidos.

### Tipografia

- Use textos em português, curtos e objetivos.
- Evite excesso de legendas, explicações longas ou frases repetidas.
- Prefira títulos curtos e informações objetivas em cards, indicadores e formulários.

### Ícones

- Use ícones de maneira discreta e funcional, nunca como decoração excessiva.
- O ícone principal do projeto é o abacaxi (`🍍`) e pode ser usado para reforçar identidade visual do sistema.
- Para ações de usuário, priorize ícones simples e reconhecíveis quando houver benefício claro à compreensão.
- Se não houver necessidade real, mantenha a interface sem preencher o layout com ícones demais.

### Botões

- Botões devem ser claros, com texto curto e ação direta.
- Mantém consistência entre ações primárias e secundárias.
- Para ações principais, use destaque visual mais forte.
- Para ações secundárias, menos peso visual.
- Evite vários padrões diferentes de botão em uma mesma tela.

### Cores: referência única do frontend

`abacaxi-frontend/src/styles.css` é a fonte de verdade para os estilos efetivamente aplicados. A paleta atual do projeto é:

| Uso | Cor atual | Aplicação |
|---|---|---|
| Fundo da página | `#fdf8e6` | Fundo geral |
| Cabeçalho | `#de04e1` | Fundo do `header` |
| Texto principal | `#333333` | Texto padrão e texto sobre botões amarelos |
| Texto secundário | `#666666` | Indicadores e dicas |
| Superfície | `#ffffff` | Cards e texto sobre áreas escuras |
| Ação primária | `#2e7d32` | Botões padrão, título do login e valores dos indicadores |
| Ação no cabeçalho | `#1b5e20` | Botão de saída |
| Navegação ativa | `#f9c80e` | Fundo e borda da página selecionada |
| Erro / exclusão | `#c62828` | Mensagens de erro e botões de excluir |
| Borda de campos | `#cccccc` | Inputs |
| Separadores | `#eeeeee` | Borda inferior das células da tabela |

O cabeçalho magenta (`#de04e1`) faz parte do estilo atualmente implementado; não o substitua nem introduza outra cor de marca sem uma solicitação explícita. Mantenha o uso de cores coerente com a função, legível e com contraste adequado. Evite adicionar novas cores quando uma cor existente já atende ao propósito.

Ao alterar a paleta:

1. Atualize esta referência e `abacaxi-frontend/src/styles.css` na mesma mudança.
2. Reutilize cores por função, em vez de escolher tons semelhantes diferentes em cada tela.
3. Confira contraste para texto, botões, estados e elementos interativos.

### Modelos de componentes do frontend

Use estes padrões existentes como referência ao criar ou alterar telas. Os estilos estão centralizados em `abacaxi-frontend/src/styles.css`.

| Elemento | Modelo visual existente |
|---|---|
| Cabeçalho e navegação | `header`, `header nav`, `header nav button`, `button.ativo` |
| Conteúdo da página | `main`, largura máxima de `960px`, centralizado e com espaçamento lateral |
| Superfície/cartão | `.card`, fundo branco, cantos arredondados, padding e sombra leve |
| Botão primário | `button`, verde `#2e7d32`, texto branco e cantos arredondados |
| Navegação selecionada | `button.ativo`, amarelo `#f9c80e` com texto escuro |
| Ação destrutiva | `button.excluir`, vermelho `#c62828` |
| Formulários | `.formulario`, com campos flexíveis e espaçamento consistente |
| Campos | `label` empilhado e `input` com borda cinza e cantos arredondados |
| Tabelas | `.tabela` com rolagem horizontal e separadores discretos |
| Indicadores | `.indicadores` em grade responsiva; cada `.card` contém rótulo e valor em destaque |
| Erros e dicas | `.erro` para erro; `.dica` para informação auxiliar |
| Marca | Emoji `🍍`, usado pontualmente no título e com `.abacaxi-large` quando ampliado |

Regras para manter os modelos:

- Reutilize as classes existentes antes de criar estilos ou variantes novos.
- Preserve a hierarquia entre ações primárias, secundárias e destrutivas.
- Mantenha dimensões, espaçamentos, bordas e arredondamentos consistentes entre as telas.
- Novos padrões visuais reutilizáveis devem ser adicionados ao `styles.css` e documentados nesta tabela.
- Evite estilos inline e cores isoladas em componentes; mantenha a apresentação centralizada no CSS.
- Para ícones, não adicione dependências sem necessidade; priorize o emoji de abacaxi existente e ícones simples que tenham função clara.

### Cards e indicadores

- Cards devem ter aparência uniforme.
- Títulos, valores e pequenos textos devem manter consistência visual.
- Use espaçamento e alinhamento padronizados para facilitar leitura rápida de painel e métricas.

## Estado visual dos componentes

Ao criar ou alterar componentes, considere:

- estado vazio
- carregamento
- erro
- sucesso
- ação inativa

Esses estados devem ser visualmente distintos, mas sempre mantendo a mesma linguagem visual do projeto.

## Exemplos de compatibilidade esperada

- Login: visual simples, direto, centrado, com destaque para usuário e senha.
- Painel: blocos com métricas visíveis e rápidas de entender.
- Colheitas: campos e tabela com leitura clara.
- Vendas: formulário objetivo com foco em quantidade, valor e cliente.

## Regras para edição de UI

- Mantenha o padrão atual em vez de criar um visual completamente diferente sem justificativa.
- Prefira pequenas melhorias visuais compatíveis com a identidade atual.
- Não introduza CSS excessivamente complexo, frameworks de UI ou estilos de terceiros desnecessários.
- Preserve a consistência visual entre Login, Painel, Colheitas e Vendas.
- Não remova ou sobrecarregue a hierarquia visual sem necessidade.

## Checklist de revisão visual

Antes de concluir uma mudança no frontend, verifique:

- a tela continua clara e legível?
- o contraste entre texto e fundo está adequado?
- os botões têm hierarquia visual clara?
- os ícones são úteis e não distraem?
- o uso de cores é consistente e funcional?
- o layout é simples e consistente com o restante do sistema?
- a mudança preserva a identidade do projeto e a experiência do usuário?
