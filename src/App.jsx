import React, { useState, useMemo, useEffect } from 'react';
import { 
  Layout, 
  Table, 
  Button, 
  Tag, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Card, 
  Row, 
  Col, 
  Typography, 
  message, 
  Tooltip,
  Badge,
  Timeline,
  Descriptions,
  Divider,
  ConfigProvider,
  theme,
  Avatar,
  Dropdown,
  Segmented,
  Upload,
  Progress,
  Statistic,
  List,
  DatePicker
} from 'antd';
import { 
  Plus, 
  Search, 
  Monitor, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Eye, 
  User,
  Calendar as CalendarIcon,
  UserCog, 
  ArrowRightLeft, 
  Briefcase,
  UploadCloud, 
  Paperclip,    
  FileText,
  GitBranch,    
  Link as LinkIcon, 
  Share2,
  BarChart3, 
  List as ListIcon, 
  PieChart,
  Activity,
  Zap,
  Filter
} from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Importar dados mockados
import { DEVS, GOVERNANCE_ACTIONS, SYSTEMS, INITIAL_DATA } from './data/mockData';

// Importar componentes
import Dashboard from './components/Dashboard';
import TicketList from './components/TicketList';
import CreateTicketModal from './components/CreateTicketModal';
import AssignModal from './components/AssignModal';
import DetailsModal from './components/DetailsModal';

dayjs.locale('pt-br');

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

// --- Constantes e Dados ---
// Movidos para src/data/mockData.js

const App = () => {
  // Estado Global
  const [data, setData] = useState(INITIAL_DATA);
  const [currentView, setCurrentView] = useState('user'); 
  const [supportSubView, setSupportSubView] = useState('list'); 
  
  // Estado do Filtro de Dashboard
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MM/YYYY'));

  // Estados de Modais
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  
  // Estado de Seleção
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketToAssign, setTicketToAssign] = useState(null);

  const [form] = Form.useForm();
  const [assignForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // --- Helpers ---
  const getCurrentDate = () => new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

  // Extrai meses únicos disponíveis nos dados
  const availableMonths = useMemo(() => {
    const months = new Set();
    data.forEach(item => {
        // Formato esperado DD/MM/YYYY HH:mm ou similar. 
        // Vamos extrair MM/YYYY. Regex simples para garantir.
        const match = item.createdAt.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (match) {
            months.add(`${match[2]}/${match[3]}`); // MM/YYYY
        }
    });
    // Adiciona o mês atual caso não tenha dados, para sempre ter opção
    months.add(dayjs().format('MM/YYYY'));
    
    // Ordena decrescente (mais recente primeiro)
    return Array.from(months).sort((a, b) => {
        const [m1, y1] = a.split('/');
        const [m2, y2] = b.split('/');
        return new Date(y2, m2 - 1) - new Date(y1, m1 - 1);
    });
  }, [data]);

  // Garante que o filtro selecionado é válido ao carregar dados
  useEffect(() => {
    if (!availableMonths.includes(selectedMonth) && availableMonths.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths, selectedMonth]);

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  // --- Ações de Negócio ---

  const handleCreateTicket = (values) => {
    const attachedFiles = values.attachments ? values.attachments.map(file => ({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB'
    })) : [];

    const newTicket = {
      key: Date.now().toString(),
      id: `CH-2024-${Math.floor(Math.random() * 1000)}`,
      title: values.title,
      description: values.description,
      system: values.system,
      requester: values.requester,
      priority: values.priority,
      status: 'open',
      assignedTo: null,
      governanceAction: null,
      attachments: attachedFiles,
      createdAt: getCurrentDate(),
      history: [
        { date: getCurrentDate(), text: `Chamado criado por ${values.requester}`, color: 'blue' }
      ]
    };
    setData([newTicket, ...data]);
    messageApi.success('Chamado criado com sucesso!');
    setIsCreateModalOpen(false);
    form.resetFields();
  };

  const handleChangePriority = (key, newPriority) => {
    const label = getPriorityLabel(newPriority);
    updateTicket(key, { priority: newPriority }, `Prioridade alterada para: ${label}`, 'red');
    messageApi.success(`Prioridade alterada para ${label}`);
  };

  const handleAssignDev = (values) => {
    if (!ticketToAssign) return;
    updateTicket(
        ticketToAssign.key, 
        { 
            assignedTo: values.dev,
            governanceAction: values.governanceAction
        }, 
        `Atribuído a: ${values.dev} | Vinculado à Ação: ${values.governanceAction}`, 
        'purple'
    );
    messageApi.success(`Chamado vinculado e atribuído a ${values.dev}`);
    setIsAssignModalOpen(false);
    setTicketToAssign(null);
    assignForm.resetFields();
  };

  const updateTicket = (key, updates, logText, logColor) => {
    const newData = data.map((item) => {
      if (item.key === key) {
        const newHistoryItem = {
            date: getCurrentDate(),
            text: logText,
            color: logColor
        };
        const updatedItem = { 
            ...item, 
            ...updates,
            history: [...(item.history || []), newHistoryItem] 
        };
        if (selectedTicket && selectedTicket.key === key) {
            setSelectedTicket(updatedItem);
        }
        return updatedItem;
      }
      return item;
    });
    setData(newData);
  };

  // --- Definição de Colunas ---
// Movidas para TicketList.jsx

  // Handlers para os componentes
  const handleViewDetails = (record) => {
    setSelectedTicket(record);
    setIsDetailsModalOpen(true);
  };

  const handleAssignTicket = (record) => {
    setTicketToAssign(record);
    setIsAssignModalOpen(true);
  };

  // --- Lógica do Dashboard ---
  
  // 1. Filtra os dados com base no mês selecionado
  const dashboardData = useMemo(() => {
    return data.filter(item => item.createdAt.includes(selectedMonth));
  }, [data, selectedMonth]);

  const totalTickets = dashboardData.length;
  const totalOpen = dashboardData.filter(i => i.status === 'open').length;
  const totalInProgress = dashboardData.filter(i => i.status === 'in_progress').length;
  const totalClosed = dashboardData.filter(i => i.status === 'closed').length;
  const totalCritical = dashboardData.filter(i => i.priority === 'high' && i.status !== 'closed').length;
  
  // Agrupamento por Sistema
  const ticketsBySystem = SYSTEMS.map(sys => ({
      name: sys,
      count: dashboardData.filter(i => i.system === sys).length,
      open: dashboardData.filter(i => i.system === sys && i.status !== 'closed').length
  })).sort((a, b) => b.count - a.count);

  // Agrupamento por Governança
  const ticketsByGovernance = GOVERNANCE_ACTIONS.map(action => ({
      name: action.name,
      count: dashboardData.filter(i => i.governanceAction === action.name).length
  })).filter(a => a.count > 0);



  return (
    <ConfigProvider
        theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorBgContainer: '#141414',
                colorBgLayout: '#0a0a0a',
                colorPrimary: currentView === 'support' ? '#8b5cf6' : '#3b82f6',
                borderRadius: 8,
            },
            components: {
              Card: {
                colorBgContainer: '#141414',
              },
              Table: {
                colorBgContainer: '#141414',
                headerBg: '#1a1a1a',
              },
              Modal: {
                contentBg: '#141414',
                headerBg: '#141414',
              }
            }
        }}
    >
        <Layout className="min-h-screen">
          {contextHolder}
          
          {/* Header Responsivo */}
          <Header 
            className="sticky top-0 z-10 border-b border-gray-800/50"
            style={{ 
              background: 'rgba(20, 20, 20, 0.95)', 
              backdropFilter: 'blur(10px)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              height: 'auto',
              minHeight: '64px',
              padding: '12px 16px',
              lineHeight: 'normal'
            }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg ${currentView === 'support' ? 'bg-gradient-to-br from-purple-600 to-purple-800' : 'bg-gradient-to-br from-blue-600 to-blue-800'}`}>
                {currentView === 'support' ? 'SD' : 'US'}
              </div>
              <div>
                  <Title level={5} style={{ margin: 0, lineHeight: '1.3' }}>Service Desk</Title>
                  <Text type="secondary" className="text-xs hidden sm:block">
                      {currentView === 'support' ? 'Técnico de Suporte' : 'Usuário Solicitante'}
                  </Text>
              </div>
            </div>

            <Space size="small">
                <Segmented
                    options={[
                        { label: <span className="hidden sm:inline">Usuário</span>, value: 'user', icon: <User size={14}/> },
                        { label: <span className="hidden sm:inline">Suporte</span>, value: 'support', icon: <UserCog size={14}/> },
                    ]}
                    value={currentView}
                    onChange={(val) => {
                        setCurrentView(val);
                        if (val === 'user') setSupportSubView('list');
                    }}
                    className="bg-[#1a1a1a]"
                />

                {currentView === 'user' && (
                    <Button 
                      type="primary" 
                      icon={<Plus size={16} />} 
                      onClick={() => setIsCreateModalOpen(true)}
                      className="shadow-lg"
                    >
                        <span className="hidden sm:inline">Novo Chamado</span>
                    </Button>
                )}
            </Space>
          </Header>
    
          <Content className="px-6 py-4 bg-zinc-950 sm:px-8 sm:py-6 lg:px-12 lg:py-8 max-w-7xl mx-auto w-full">
            
            {/* Barra de Ferramentas do Suporte */}
            {currentView === 'support' && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                    <Title level={4} className="!text-lg sm:!text-xl lg:!text-2xl !mb-0">
                        {supportSubView === 'dashboard' ? 'Dashboard Operacional' : 'Gerenciamento de Chamados'}
                    </Title>
                    <Segmented 
                        value={supportSubView}
                        onChange={setSupportSubView}
                        options={[
                            { label: <span className="hidden sm:inline">Lista</span>, value: 'list', icon: <ListIcon size={16} /> },
                            { label: <span className="hidden sm:inline">Dashboard</span>, value: 'dashboard', icon: <BarChart3 size={16} /> }
                        ]}
                        className="bg-[#1a1a1a]"
                    />
                </div>
            )}

            {currentView === 'support' && supportSubView === 'dashboard' ? (
                // RENDERIZA O DASHBOARD
                <Dashboard
                  selectedMonth={selectedMonth}
                  availableMonths={availableMonths}
                  setSelectedMonth={setSelectedMonth}
                  totalTickets={totalTickets}
                  totalOpen={totalOpen}
                  totalInProgress={totalInProgress}
                  totalClosed={totalClosed}
                  totalCritical={totalCritical}
                  ticketsBySystem={ticketsBySystem}
                  ticketsByGovernance={ticketsByGovernance}
                />
            ) : (
                // RENDERIZA A LISTA PADRÃO
                <TicketList
                  data={data}
                  currentView={currentView}
                  onViewDetails={handleViewDetails}
                  onAssignTicket={handleAssignTicket}
                  onChangePriority={handleChangePriority}
                />
            )}

          </Content>
    
          <CreateTicketModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            form={form}
            onFinish={handleCreateTicket}
          />

          <AssignModal
            isOpen={isAssignModalOpen}
            onClose={() => setIsAssignModalOpen(false)}
            form={assignForm}
            onFinish={handleAssignDev}
            ticketToAssign={ticketToAssign}
          />
    
          <DetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            selectedTicket={selectedTicket}
            currentView={currentView}
            onAssignTicket={(record) => { handleAssignTicket(record); setIsDetailsModalOpen(false); }}
            onChangePriority={(key, priority) => { handleChangePriority(key, priority); setIsDetailsModalOpen(false); }}
          />
    
        </Layout>
    </ConfigProvider>
  );
};

export default App;