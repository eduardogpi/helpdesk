// src/data/mockData.js

// Constantes
export const DEVS = [
  'João Backend',
  'Maria Database',
  'Pedro Frontend',
  'Ana DevOps',
  'Carlos Security'
];

export const GOVERNANCE_ACTIONS = [
  { id: 'ACT-101', name: 'Sustentação Q3 - Correções de Bugs (Sprints)', type: 'Manutenção' },
  { id: 'ACT-102', name: 'Projeto Migração Cloud - Fase 2', type: 'Projeto' },
  { id: 'ACT-103', name: 'Hotfix Crítico - Incidente Produção', type: 'Emergencial' },
  { id: 'ACT-104', name: 'Melhorias de UX - Q4', type: 'Evolutivo' },
  { id: 'ACT-105', name: 'Adequação LGPD - Auditoria', type: 'Regulatório' }
];

export const SYSTEMS = [
  'ERP Financeiro',
  'CRM Vendas',
  'RH System',
  'Infraestrutura',
  'Marketing Tools',
  'Intranet Corporativa'
];

// Função auxiliar para datas recentes (para o filtro funcionar bem com dados novos)
export const getDate = (diffDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - diffDays);
  return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
};

// Dados mockados
export const INITIAL_DATA = [
  {
    key: '1',
    id: 'CH-2024-001',
    title: 'Erro ao gerar nota fiscal',
    description: 'O sistema apresenta erro 500 intermitente ao tentar processar notas fiscais para o estado de SP.',
    system: 'ERP Financeiro',
    requester: 'Ana Silva',
    priority: 'high',
    status: 'open',
    assignedTo: null,
    governanceAction: null,
    createdAt: getDate(0), // Hoje
    attachments: [
      { name: 'erro_tela.png', size: '1.2 MB' },
      { name: 'log_server.txt', size: '45 KB' }
    ],
    history: [
      { date: getDate(0), text: 'Chamado criado por Ana Silva', color: 'blue' },
      { date: getDate(0), text: 'Prioridade definida como ALTA pelo sistema', color: 'red' }
    ]
  },
  {
    key: '2',
    id: 'CH-2024-002',
    title: 'Acesso negado ao CRM',
    description: 'Usuário não consegue logar. Mensagem de "Credenciais Inválidas".',
    system: 'CRM Vendas',
    requester: 'Carlos Souza',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: 'João Backend',
    governanceAction: 'Sustentação Q3 - Correções de Bugs (Sprints)',
    createdAt: getDate(1), // Ontem
    attachments: [],
    history: [
      { date: getDate(1), text: 'Chamado criado por Carlos Souza', color: 'blue' },
      { date: getDate(1), text: 'Atribuído a João Backend (Sustentação Q3)', color: 'purple' }
    ]
  },
  {
    key: '3',
    id: 'CH-2024-003',
    title: 'Solicitação de monitor',
    description: 'Monitor piscando.',
    system: 'Infraestrutura',
    requester: 'Mariana Costa',
    priority: 'low',
    status: 'closed',
    assignedTo: 'Maria Database',
    governanceAction: 'Melhorias de UX - Q4',
    createdAt: getDate(15), // Mês atual ou anterior
    attachments: [],
    history: [
      { date: getDate(15), text: 'Criado por Mariana Costa', color: 'blue' },
      { date: getDate(14), text: 'Chamado Concluído', color: 'green' }
    ]
  },
  {
    key: '4',
    id: 'CH-2024-004',
    title: 'Lentidão no carregamento',
    description: 'Sistema ERP lento.',
    system: 'ERP Financeiro',
    requester: 'Roberto Alves',
    priority: 'high',
    status: 'open',
    assignedTo: null,
    governanceAction: 'Sustentação Q3 - Correções de Bugs (Sprints)',
    createdAt: getDate(45), // Provavelmente mês passado
    attachments: [],
    history: []
  },
  {
    key: '5',
    id: 'CH-2024-005',
    title: 'Novo usuário no AD',
    description: 'Criar conta para estagiário.',
    system: 'Infraestrutura',
    requester: 'Fernanda Lima',
    priority: 'low',
    status: 'open',
    assignedTo: 'Carlos Security',
    governanceAction: null,
    createdAt: getDate(2),
    attachments: [],
    history: []
  }
];