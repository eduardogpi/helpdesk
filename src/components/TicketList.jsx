import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Tag,
  Space,
  Input,
  Tooltip,
  Badge,
  Typography,
  Empty
} from 'antd';
import {
  Search,
  Eye,
  AlertCircle,
  Briefcase,
  User,
  Share2,
  Clock,
  CheckCircle2,
  TrendingUp,
  FileText
} from 'lucide-react';

const { Text, Title } = Typography;

const TicketList = ({
  data,
  currentView,
  onViewDetails,
  onAssignTicket
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter(item => 
    item.id.toLowerCase().includes(searchText.toLowerCase()) ||
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'ALTA';
      case 'medium': return 'MÉDIA';
      case 'low': return 'BAIXA';
      default: return priority;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'error';
      case 'in_progress': return 'processing';
      case 'closed': return 'success';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'open': return 'Aberto';
      case 'in_progress': return 'Em Andamento';
      case 'closed': return 'Concluído';
      default: return status;
    }
  };

  const baseColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 90,
      responsive: ['sm'],
      render: (id) => (
        <Text code style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>{id}</Text>
      ),
    },
    {
      title: 'Chamado',
      dataIndex: 'title',
      ellipsis: false,
      render: (title, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontWeight: 600, fontSize: 'clamp(12px, 2.5vw, 14px)', lineHeight: 1.4, wordBreak: 'break-word' }}>{title}</span>
          <Tag color="blue" className="system-tag-mobile" style={{ width: 'fit-content', margin: 0, fontSize: 'clamp(9px, 2vw, 11px)' }}>{record.system}</Tag>
          {record.description && (
            <span className="hidden sm:block" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.3 }}>
              {record.description.length > 50 ? record.description.substring(0, 50) + '...' : record.description}
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'Sistema',
      dataIndex: 'system',
      width: 140,
      responsive: ['md'],
      render: (system) => (
        <Tag className="m-0">{system}</Tag>
      ),
    },
    {
      title: 'Solicitante',
      dataIndex: 'requester',
      width: 130,
      responsive: ['lg'],
      render: (requester) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs text-white font-medium">
            {requester.charAt(0)}
          </div>
          <Text className="text-sm">{requester}</Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 95,
      render: (status) => (
        <Badge 
          status={getStatusColor(status)} 
          text={<Text strong style={{ fontSize: 'clamp(10px, 2vw, 12px)', whiteSpace: 'nowrap' }}>{getStatusLabel(status)}</Text>} 
        />
      ),
    },
    {
      title: 'Criado em',
      dataIndex: 'createdAt',
      width: 130,
      responsive: ['xl'],
      render: (date) => (
        <Text type="secondary" className="text-xs">{date}</Text>
      ),
    },
  ];

  const userColumns = [
    ...baseColumns,
    {
      title: 'Prioridade',
      dataIndex: 'priority',
      width: 85,
      render: (priority) => (
        <Tag color={getPriorityColor(priority)} style={{ fontWeight: 600, fontSize: 'clamp(9px, 2vw, 11px)', margin: 0 }}>
          {getPriorityLabel(priority)}
        </Tag>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 50,
      align: 'center',
      render: (_, record) => (
        <Tooltip title="Ver Detalhes">
           <Button 
              type="text"
              shape="circle"
              size="small"
              icon={<Eye size={14} className="text-blue-400" />}
              onClick={() => onViewDetails(record)}
              className="hover:bg-blue-500/10"
           />
        </Tooltip>
      ),
    },
  ];

  const supportColumns = [
    ...baseColumns,
    {
      title: 'Prioridade',
      dataIndex: 'priority',
      width: 85,
      render: (priority) => (
        <Tag color={getPriorityColor(priority)} style={{ fontWeight: 600, fontSize: 'clamp(9px, 2vw, 11px)', margin: 0 }}>
          {getPriorityLabel(priority)}
        </Tag>
      ),
    },
    {
      title: 'Atribuído',
      dataIndex: 'assignedTo',
      width: 110,
      responsive: ['sm'],
      render: (assignedTo) => assignedTo ? (
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] text-white font-medium">
            {assignedTo.charAt(0)}
          </div>
          <Text style={{ fontSize: '11px' }}>{assignedTo.split(' ')[0]}</Text>
        </div>
      ) : (
        <Text type="secondary" style={{ fontSize: '10px', fontStyle: 'italic' }}>--</Text>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 70,
      align: 'center',
      render: (_, record) => (
        <Space size={2}>
          <Tooltip title="Ver Detalhes">
             <Button 
                type="text"
                shape="circle"
                size="small"
                icon={<Eye size={14} className="text-blue-400" />}
                onClick={() => onViewDetails(record)}
                className="hover:bg-blue-500/10"
             />
          </Tooltip>
          {record.status !== 'closed' && (
            <Tooltip title="Vincular/Atribuir">
               <Button 
                  type="text"
                  shape="circle"
                  size="small"
                  icon={<Share2 size={14} className="text-purple-400" />}
                  onClick={() => onAssignTicket(record)}
                  className="hover:bg-purple-500/10"
               />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Cards Resumo - Responsivos */}
      <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={8}>
          <Card 
            bordered={false} 
            className="stat-card gradient-red border-l-4 border-l-red-500 bg-[#141414] h-full"
            bodyStyle={{ padding: '16px 20px' }}
          >
            <div className="flex justify-between items-center">
              <div>
                <Text type="secondary" className="text-xs sm:text-sm block mb-1">Fila de Espera</Text>
                <div className="flex items-baseline gap-2">
                  <Title level={2} style={{margin:0}} className="!text-2xl sm:!text-3xl">
                    {data.filter(i => i.status === 'open').length}
                  </Title>
                  <Text type="secondary" className="text-xs">abertos</Text>
                </div>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-red-500/10 flex items-center justify-center">
                <AlertCircle size={24} className="text-red-400" />
              </div>
            </div>
          </Card>
        </Col>

        {currentView === 'support' ? (
          <>
            <Col xs={12} sm={12} lg={8}>
              <Card 
                bordered={false} 
                className="stat-card gradient-purple border-l-4 border-l-purple-500 bg-[#141414] h-full"
                bodyStyle={{ padding: '16px 20px' }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <Text type="secondary" className="text-xs sm:text-sm block mb-1">Atribuídos</Text>
                    <div className="flex items-baseline gap-2">
                      <Title level={2} style={{margin:0}} className="!text-2xl sm:!text-3xl">
                        {data.filter(i => i.assignedTo).length}
                      </Title>
                      <Text type="secondary" className="text-xs hidden sm:inline">total</Text>
                    </div>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Briefcase size={24} className="text-purple-400" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={12} sm={12} lg={8}>
              <Card 
                bordered={false} 
                className="stat-card gradient-green border-l-4 border-l-green-500 bg-[#141414] h-full"
                bodyStyle={{ padding: '16px 20px' }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <Text type="secondary" className="text-xs sm:text-sm block mb-1">Concluídos</Text>
                    <div className="flex items-baseline gap-2">
                      <Title level={2} style={{margin:0}} className="!text-2xl sm:!text-3xl">
                        {data.filter(i => i.status === 'closed').length}
                      </Title>
                      <Text type="secondary" className="text-xs hidden sm:inline">total</Text>
                    </div>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-green-400" />
                  </div>
                </div>
              </Card>
            </Col>
          </>
        ) : (
          <>
            <Col xs={12} sm={12} lg={8}>
              <Card 
                bordered={false} 
                className="stat-card gradient-blue border-l-4 border-l-blue-500 bg-[#141414] h-full"
                bodyStyle={{ padding: '16px 20px' }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <Text type="secondary" className="text-xs sm:text-sm block mb-1">Meus Chamados</Text>
                    <div className="flex items-baseline gap-2">
                      <Title level={2} style={{margin:0}} className="!text-2xl sm:!text-3xl">
                        {data.length}
                      </Title>
                      <Text type="secondary" className="text-xs hidden sm:inline">total</Text>
                    </div>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <FileText size={24} className="text-blue-400" />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={12} sm={12} lg={8}>
              <Card 
                bordered={false} 
                className="stat-card gradient-yellow border-l-4 border-l-yellow-500 bg-[#141414] h-full"
                bodyStyle={{ padding: '16px 20px' }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <Text type="secondary" className="text-xs sm:text-sm block mb-1">Em Andamento</Text>
                    <div className="flex items-baseline gap-2">
                      <Title level={2} style={{margin:0}} className="!text-2xl sm:!text-3xl">
                        {data.filter(i => i.status === 'in_progress').length}
                      </Title>
                      <Text type="secondary" className="text-xs hidden sm:inline">tickets</Text>
                    </div>
                  </div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                    <Clock size={24} className="text-yellow-400" />
                  </div>
                </div>
              </Card>
            </Col>
          </>
        )}
      </Row>

      <Card
        className="shadow-lg bg-[#141414] border border-gray-800/50"
        title={
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-blue-400" />
            <span className="text-sm sm:text-base">
              {currentView === 'support' ? "Painel de Atendimentos" : "Meus Chamados Recentes"}
            </span>
          </div>
        }
        extra={
          <Input
            prefix={<Search size={14} className="text-gray-500"/>}
            placeholder="Buscar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            className="w-[140px] sm:w-[200px] lg:w-[250px]"
          />
        }
        styles={{ 
          header: { borderBottom: '1px solid rgba(255,255,255,0.06)' },
          body: { padding: '0' }
        }}
      >
        {filteredData.length === 0 ? (
          <div className="py-12">
            <Empty 
              description={
                <Text type="secondary">
                  {searchText ? 'Nenhum chamado encontrado' : 'Nenhum chamado registrado'}
                </Text>
              }
            />
          </div>
        ) : (
          <Table
            columns={currentView === 'support' ? supportColumns : userColumns}
            dataSource={filteredData}
            pagination={{ 
              pageSize: 6,
              showSizeChanger: false,
              showTotal: (total) => <Text type="secondary" className="text-xs">{total} itens</Text>,
              className: 'px-4 pb-2 mt-3'
            }}
            scroll={{ x: 700 }}
            rowClassName={(record) => 
              `transition-smooth ${record.status === 'closed' ? 'opacity-50' : ''} ${record.priority === 'high' && record.status === 'open' ? 'bg-red-500/5' : ''}`
            }
            size="middle"
          />
        )}
      </Card>
    </div>
  );
};

export default TicketList;