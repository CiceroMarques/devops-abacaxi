module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'API da Fazenda de Abacaxis',
    description: 'API para autenticação, registro de colheitas e vendas e consulta do resumo da fazenda.',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/',
      description: 'Servidor atual',
    },
  ],
  tags: [
    { name: 'Status', description: 'Disponibilidade da API' },
    { name: 'Autenticação', description: 'Login e geração de token JWT' },
    { name: 'Colheitas', description: 'Registro e consulta de colheitas' },
    { name: 'Vendas', description: 'Registro e consulta de vendas' },
    { name: 'Resumo', description: 'Totais de produção, estoque e faturamento' },
  ],
  paths: {
    '/': {
      get: {
        tags: ['Status'],
        summary: 'Verifica se a API está disponível',
        responses: {
          200: {
            description: 'API disponível',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    mensagem: { type: 'string', example: 'API da Fazenda de Abacaxis 🍍' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Autenticação'],
        summary: 'Autentica um usuário e retorna um token JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Login efetuado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginResponse' },
              },
            },
          },
          401: {
            description: 'Usuário ou senha inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/colheitas': {
      get: {
        tags: ['Colheitas'],
        summary: 'Lista as colheitas',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Colheitas ordenadas da mais recente para a mais antiga',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Colheita' },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Colheitas'],
        summary: 'Registra uma colheita',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NovaColheita' },
            },
          },
        },
        responses: {
          201: {
            description: 'Colheita criada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Colheita' },
              },
            },
          },
          400: {
            description: 'Data ausente ou quantidade menor ou igual a zero',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/colheitas/{id}': {
      delete: {
        tags: ['Colheitas'],
        summary: 'Exclui uma colheita',
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Colheita excluída' },
          400: {
            description: 'A exclusão deixaria o estoque negativo',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: {
            description: 'Colheita não encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/vendas': {
      get: {
        tags: ['Vendas'],
        summary: 'Lista as vendas',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Vendas ordenadas da mais recente para a mais antiga',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Venda' },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Vendas'],
        summary: 'Registra uma venda',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NovaVenda' },
            },
          },
        },
        responses: {
          201: {
            description: 'Venda criada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Venda' },
              },
            },
          },
          400: {
            description: 'Dados inválidos ou estoque insuficiente',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/vendas/{id}': {
      delete: {
        tags: ['Vendas'],
        summary: 'Exclui uma venda',
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Venda excluída' },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: {
            description: 'Venda não encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/resumo': {
      get: {
        tags: ['Resumo'],
        summary: 'Consulta totais de produção, estoque e faturamento',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Resumo da fazenda',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Resumo' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Informe o token JWT obtido em POST /auth/login.',
      },
    },
    parameters: {
      Id: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Identificador do registro',
        schema: { type: 'integer', minimum: 1 },
        example: 1,
      },
    },
    responses: {
      Unauthorized: {
        description: 'Token ausente, inválido ou expirado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
    schemas: {
      LoginRequest: {
        type: 'object',
        required: ['usuario', 'senha'],
        properties: {
          usuario: { type: 'string', example: 'admin' },
          senha: { type: 'string', format: 'password', example: 'admin123' },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', description: 'JWT válido por 8 horas' },
          usuario: { type: 'string', example: 'admin' },
        },
      },
      NovaColheita: {
        type: 'object',
        required: ['data', 'quantidade'],
        properties: {
          data: { type: 'string', format: 'date', example: '2026-11-06' },
          quantidade: { type: 'integer', minimum: 1, example: 120 },
          observacao: { type: 'string', nullable: true, example: 'Lote da manhã' },
        },
      },
      Colheita: {
        allOf: [
          { $ref: '#/components/schemas/NovaColheita' },
          {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        ],
      },
      NovaVenda: {
        type: 'object',
        required: ['data', 'quantidade', 'preco_unitario'],
        properties: {
          data: { type: 'string', format: 'date', example: '2026-11-06' },
          quantidade: { type: 'integer', minimum: 1, example: 25 },
          preco_unitario: { type: 'number', format: 'double', minimum: 0, exclusiveMinimum: true, example: 3.5 },
          cliente: { type: 'string', nullable: true, example: 'Mercado Central' },
        },
      },
      Venda: {
        allOf: [
          { $ref: '#/components/schemas/NovaVenda' },
          {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        ],
      },
      Resumo: {
        type: 'object',
        properties: {
          colhido: { type: 'integer', example: 500 },
          vendido: { type: 'integer', example: 125 },
          estoque: { type: 'integer', example: 375 },
          faturamento: { type: 'number', format: 'double', example: 437.5 },
        },
      },
      Error: {
        type: 'object',
        properties: {
          erro: { type: 'string', example: 'Token não informado' },
        },
      },
    },
  },
};
