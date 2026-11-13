export const IDIOMAS = {
  'pt-BR': { bandeira: '🇧🇷', nome: 'Português' },
  'en': { bandeira: '🇺🇸', nome: 'English' },
  'zh-CN': { bandeira: '🇨🇳', nome: '简体中文' },
};

const traducoes = {
  'pt-BR': {
    marca: 'Fazenda de Abacaxis',
    seletorIdioma: 'Idioma',
    painel: 'Painel',
    colheitas: 'Colheitas',
    vendas: 'Vendas',
    sair: 'Sair',
    entrar: 'Entrar',
    entrando: 'Entrando...',
    usuario: 'Usuário',
    senha: 'Senha',
    dicaApi: 'No plano gratuito do Render a API pode levar até 1 minuto para "acordar".',
    totalColhido: 'Total colhido',
    totalVendido: 'Total vendido',
    emEstoque: 'Em estoque',
    faturamento: 'Faturamento',
    carregando: 'Carregando...',
    registrarColheita: 'Registrar colheita',
    registrarVenda: 'Registrar venda',
    data: 'Data',
    quantidade: 'Quantidade',
    observacao: 'Observação',
    precoUnitario: 'Preço unitário (USD)',
    cliente: 'Cliente',
    salvar: 'Salvar',
    excluir: 'Excluir',
    nenhumaColheita: 'Nenhuma colheita registrada.',
    nenhumaVenda: 'Nenhuma venda registrada.',
    quantidadeAbreviada: 'Qtd.',
    precoAbreviado: 'Preço un.',
    total: 'Total',
    falhaConexao: 'Não foi possível conectar à API',
    erroRequisicao: 'Erro na requisição',
  },
  en: {
    marca: 'Pineapple Farm',
    seletorIdioma: 'Language',
    painel: 'Dashboard',
    colheitas: 'Harvests',
    vendas: 'Sales',
    sair: 'Log out',
    entrar: 'Log in',
    entrando: 'Logging in...',
    usuario: 'Username',
    senha: 'Password',
    dicaApi: "On Render's free plan, the API may take up to 1 minute to wake up.",
    totalColhido: 'Total harvested',
    totalVendido: 'Total sold',
    emEstoque: 'In stock',
    faturamento: 'Revenue',
    carregando: 'Loading...',
    registrarColheita: 'Record harvest',
    registrarVenda: 'Record sale',
    data: 'Date',
    quantidade: 'Quantity',
    observacao: 'Notes',
    precoUnitario: 'Unit price (USD)',
    cliente: 'Customer',
    salvar: 'Save',
    excluir: 'Delete',
    nenhumaColheita: 'No harvests recorded.',
    nenhumaVenda: 'No sales recorded.',
    quantidadeAbreviada: 'Qty.',
    precoAbreviado: 'Unit price',
    total: 'Total',
    falhaConexao: 'Could not connect to the API',
    erroRequisicao: 'Request failed',
  },
  'zh-CN': {
    marca: '菠萝农场',
    seletorIdioma: '语言',
    painel: '仪表盘',
    colheitas: '采收记录',
    vendas: '销售记录',
    sair: '退出',
    entrar: '登录',
    entrando: '正在登录...',
    usuario: '用户名',
    senha: '密码',
    dicaApi: 'Render 免费方案中的 API 唤醒可能需要最多 1 分钟。',
    totalColhido: '采收总量',
    totalVendido: '销售总量',
    emEstoque: '库存',
    faturamento: '销售额',
    carregando: '加载中...',
    registrarColheita: '登记采收',
    registrarVenda: '登记销售',
    data: '日期',
    quantidade: '数量',
    observacao: '备注',
    precoUnitario: '单价 (USD)',
    cliente: '客户',
    salvar: '保存',
    excluir: '删除',
    nenhumaColheita: '暂无采收记录。',
    nenhumaVenda: '暂无销售记录。',
    quantidadeAbreviada: '数量',
    precoAbreviado: '单价',
    total: '总计',
    falhaConexao: '无法连接到 API',
    erroRequisicao: '请求失败',
  },
};

const errosApi = {
  'Usuário ou senha inválidos': {
    en: 'Invalid username or password',
    'zh-CN': '用户名或密码无效',
  },
  'Informe a data e uma quantidade maior que zero': {
    en: 'Enter a date and a quantity greater than zero',
    'zh-CN': '请输入日期和大于零的数量',
  },
  'Colheita não encontrada': {
    en: 'Harvest not found',
    'zh-CN': '未找到采收记录',
  },
  'Não é possível excluir: os abacaxis desta colheita já foram vendidos': {
    en: 'Cannot delete: the pineapples from this harvest have already been sold',
    'zh-CN': '无法删除：此次采收的菠萝已售出',
  },
  'Informe data, quantidade e preço maiores que zero': {
    en: 'Enter a date, quantity, and price greater than zero',
    'zh-CN': '请输入日期、数量和大于零的价格',
  },
  'Venda não encontrada': {
    en: 'Sale not found',
    'zh-CN': '未找到销售记录',
  },
  'Erro na requisição': {
    en: 'Request failed',
    'zh-CN': '请求失败',
  },
};

export function traduzir(idioma, chave) {
  return traducoes[idioma]?.[chave] ?? traducoes['pt-BR'][chave] ?? chave;
}

export function traduzirErroApi(erro, idioma) {
  const mensagem = erro?.message || traduzir(idioma, 'erroRequisicao');

  if (mensagem === 'Failed to fetch') {
    return traduzir(idioma, 'falhaConexao');
  }

  const erroEstoque = mensagem.match(/^Estoque insuficiente\. Disponível: (.+)$/);
  if (erroEstoque) {
    const mensagens = {
      'pt-BR': `Estoque insuficiente. Disponível: ${erroEstoque[1]}`,
      en: `Insufficient stock. Available: ${erroEstoque[1]}`,
      'zh-CN': `库存不足。可用数量：${erroEstoque[1]}`,
    };
    return mensagens[idioma];
  }

  return errosApi[mensagem]?.[idioma] || mensagem;
}

export function formatarData(data, idioma) {
  const [ano, mes, dia] = data.split('-').map(Number);
  return new Intl.DateTimeFormat(idioma).format(new Date(ano, mes - 1, dia));
}

export function formatarDolares(valor, idioma) {
  return new Intl.NumberFormat(idioma, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'code',
  }).format(Number(valor));
}
