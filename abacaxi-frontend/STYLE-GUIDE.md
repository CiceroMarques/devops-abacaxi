# Style Guide do frontend

Este documento define a referência visual e os padrões de interface do Fazenda de Abacaxis. A implementação atual dos estilos fica em `src/styles.css`; mantenha este guia e o CSS alinhados quando o visual do produto mudar.

## Princípios

- Priorize clareza, leitura rápida e tarefas diretas de gestão.
- Mantenha uma interface simples e consistente entre Login, Painel, Colheitas e Vendas.
- Use textos e rótulos em português, curtos e objetivos.
- Dê destaque visual às ações principais sem confundir ações secundárias ou destrutivas.
- Preserve a identidade existente. Não faça uma reformulação de marca ou introduza dependências visuais sem necessidade.
- Disponibilize Português (padrão), English e chinês simplificado em todas as telas, incluindo o Login.
- Exiba a seleção de idioma por bandeiras no topo e persista a escolha em `localStorage`, sem apagá-la ao sair da conta.
- Use `src/i18n.js` para textos e formatação localizada; mantenha o idioma do documento sincronizado.

## Paleta atual

As cores abaixo refletem os estilos implementados em `src/styles.css`. Reutilize-as por função em vez de criar tons isolados por componente.

| Função | Cor | Uso atual |
|---|---|---|
| Fundo da página | `#fdf8e6` | Fundo geral |
| Cabeçalho | `#de04e1` | Fundo do cabeçalho; mantenha essa cor, salvo pedido explícito de mudança |
| Texto principal | `#333333` | Texto padrão e texto sobre navegação ativa |
| Texto secundário | `#666666` | Indicadores e dicas |
| Superfície | `#ffffff` | Cards |
| Ação primária | `#2e7d32` | Botões padrão, título do Login e valores dos indicadores |
| Ação no cabeçalho | `#1b5e20` | Botão de saída |
| Navegação ativa | `#f9c80e` | Fundo e borda da página selecionada |
| Erro / ação destrutiva | `#c62828` | Mensagens de erro e botões de exclusão |
| Borda de campo | `#cccccc` | Campos de formulário |
| Separador | `#eeeeee` | Linhas de tabelas |

Ao adicionar ou alterar combinações de cores, confira o contraste entre texto, fundo e estados interativos. Uma mudança intencional de paleta deve atualizar este documento e `src/styles.css` juntos.

## Tipografia e espaçamento

- Use `system-ui, sans-serif`, conforme a base atual.
- Preserve a hierarquia de títulos: título do cabeçalho, título de seção e rótulos/valores.
- Prefira espaçamentos existentes de `8px`, `12px`, `16px` e `24px`; use-os como ritmo visual consistente.
- Mantenha textos auxiliares discretos, mas legíveis. Evite excesso de texto em cards e formulários.

## Layout e responsividade

- Centralize o conteúdo principal em até `960px`, com margem vertical e espaçamento lateral.
- O cabeçalho pode quebrar em telas estreitas; mantenha navegação e ações utilizáveis quando isso ocorrer.
- Organize indicadores em grade responsiva com `auto-fit`; evite larguras fixas que causem rolagem da página.
- Tabelas devem ficar em um contêiner com rolagem horizontal quando necessário, sem comprimir excessivamente as colunas.
- Agrupe conteúdo relacionado em cards e preserve alinhamentos e espaçamentos entre seções.

## Componentes e padrões existentes

| Elemento | Padrão |
|---|---|
| Cabeçalho e navegação | `header`, `header nav`; use `.ativo` para a página selecionada |
| Conteúdo | `main`, centralizado e limitado a `960px` |
| Card | `.card`, superfície branca, cantos arredondados, padding e sombra leve |
| Botão primário | `button`, verde com texto branco |
| Ação destrutiva | `button.excluir`, vermelho; reserve para exclusões |
| Formulário | `.formulario`, com campos flexíveis e espaçamento uniforme |
| Campo | `label` empilhado com `input`; preserve rótulo visível e área de interação clara |
| Tabela | `.tabela` para rolagem horizontal; separadores discretos nas linhas |
| Indicador | `.indicadores` em grade; rótulo secundário e valor em destaque |
| Erro e dica | `.erro` para falhas; `.dica` para informação auxiliar |
| Marca | `🍍`, usado pontualmente; `.abacaxi-large` quando ampliado |
| Idioma | `.seletor-idioma`, bandeiras com estado ativo e rótulos acessíveis |

Antes de criar uma classe ou variante, verifique se os padrões existentes podem ser reutilizados. Mantenha os estilos em `src/styles.css`, evite estilos inline e não adicione bibliotecas de UI ou ícones sem uma necessidade concreta.

## Estados e acessibilidade

- Diferencie carregamento, vazio, erro, sucesso e ação desabilitada com mensagens ou estilos claros.
- Não dependa apenas da cor para comunicar erro, seleção ou estado.
- Mantenha rótulos associados aos campos e textos de botão que descrevam a ação.
- Preserve foco visível, uso por teclado e contraste legível nos elementos interativos.
- Use ícones apenas quando ajudarem a reconhecer uma ação; não use decoração que distraia do conteúdo.

## Revisão antes de concluir

- O layout funciona em telas estreitas e largas?
- A hierarquia entre ações principais, secundárias e destrutivas está clara?
- Cores, tipografia, espaçamento e componentes seguem os padrões deste guia?
- Estados de carregamento, vazio e erro são compreensíveis?
- O conteúdo continua legível e acessível por teclado?
- Se o padrão visual mudou, este guia e `src/styles.css` foram atualizados juntos?
