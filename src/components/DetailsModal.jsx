import React from 'react';
import {
  Modal,
  Button,
  Card,
  Tag,
  Space,
  Badge,
  Descriptions,
  Divider,
  Timeline,
  Typography,
  Row,
  Col
} from 'antd';
import { GitBranch, FileText, Share2, Clock, User, Monitor, AlertTriangle } from 'lucide-react';

const { Text, Title, Paragraph } = Typography;

const DetailsModal = ({
  isOpen,
  onClose,
  selectedTicket,
  currentView,
  onAssignTicket,
  onChangePriority
}) => {
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

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <FileText size={14} className="text-purple-400" />
          </div>
          <span className="text-sm sm:text-base">Detalhes do Chamado</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={
        <div className="flex justify-end">
          <Button onClick={onClose} className="w-full sm:w-auto">
            Fechar
          </Button>
        </div>
      }
      width="100%"
      style={{ maxWidth: 720 }}
      centered
      className="responsive-modal"
    >
      {selectedTicket && (
        <div className="py-1 sm:py-2 space-y-3 sm:space-y-4">
          {/* Header com título e status */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-gray-800">
            <div className="flex-1">
              <Title level={5} style={{ margin: 0 }} className="!text-sm sm:!text-lg">
                {selectedTicket.title}
              </Title>
              <Space className="mt-1.5 sm:mt-2" wrap size={4}>
                <Tag color={getPriorityColor(selectedTicket.priority)} className="font-semibold !text-xs">
                  {getPriorityLabel(selectedTicket.priority)}
                </Tag>
                {selectedTicket.assignedTo && (
                  <Tag color="purple" className="flex items-center gap-1 !text-xs">
                    <User size={10} /> {selectedTicket.assignedTo}
                  </Tag>
                )}
              </Space>
            </div>
            <Badge 
              status={getStatusColor(selectedTicket.status)} 
              text={<Text strong className="text-xs sm:text-sm">{getStatusLabel(selectedTicket.status)}</Text>} 
            />
          </div>

          {/* Descrição */}
          <Card 
            size="small" 
            className="bg-[#1a1a1a] border-gray-800"
            styles={{ body: { padding: '10px 12px' } }}
          >
            <Text type="secondary" className="block mb-1 text-[10px] sm:text-xs uppercase tracking-wider">
              Descrição
            </Text>
            <Paragraph className="mb-0 text-gray-300 text-xs sm:text-sm !leading-relaxed">
              {selectedTicket.description}
            </Paragraph>
          </Card>

          {/* Governança */}
          {selectedTicket.governanceAction && (
            <div className="p-3 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <GitBranch size={14} className="text-blue-400" />
                <Text strong className="text-blue-200 text-sm">Governança</Text>
              </div>
              <Text className="text-gray-300 text-sm">
                Vinculado: <strong className="text-white">{selectedTicket.governanceAction}</strong>
              </Text>
            </div>
          )}

          {/* Anexos */}
          {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
            <div>
              <Text type="secondary" className="block mb-2 text-xs uppercase tracking-wider">
                Anexos / Evidências
              </Text>
              <div className="flex flex-wrap gap-2">
                {selectedTicket.attachments.map((file, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg cursor-pointer hover:bg-[#222] hover:border-blue-800/50 transition-colors"
                  >
                    <FileText size={14} className="text-blue-400" />
                    <div>
                      <Text className="block text-xs text-gray-200">{file.name}</Text>
                      <Text className="block text-xs text-gray-500">{file.size}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informações */}
          <Row gutter={[8, 8]}>
            <Col xs={12} sm={6}>
              <div className="p-2 sm:p-3 bg-[#1a1a1a] rounded-lg text-center">
                <Text type="secondary" style={{ display: 'block', marginBottom: '4px', fontSize: '10px' }}>ID</Text>
                <Text code style={{ display: 'block', fontSize: '10px' }}>{selectedTicket.id}</Text>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="p-2 sm:p-3 bg-[#1a1a1a] rounded-lg text-center">
                <Text type="secondary" style={{ display: 'block', marginBottom: '4px', fontSize: '10px' }}>Sistema</Text>
                <Text style={{ display: 'block', fontSize: '10px' }}>{selectedTicket.system}</Text>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="p-2 sm:p-3 bg-[#1a1a1a] rounded-lg text-center">
                <Text type="secondary" style={{ display: 'block', marginBottom: '4px', fontSize: '10px' }}>Solicitante</Text>
                <Text style={{ display: 'block', fontSize: '10px' }}>{selectedTicket.requester}</Text>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className="p-2 sm:p-3 bg-[#1a1a1a] rounded-lg text-center">
                <Text type="secondary" style={{ display: 'block', marginBottom: '4px', fontSize: '10px' }}>Abertura</Text>
                <Text style={{ display: 'block', fontSize: '10px' }}>{selectedTicket.createdAt}</Text>
              </div>
            </Col>
          </Row>

          {/* Histórico */}
          <div>
            <Divider orientation="left" className="!my-2 sm:!my-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock size={12} className="text-gray-400" />
                <Text className="text-gray-400 text-xs sm:text-sm">Histórico</Text>
              </div>
            </Divider>

            <div className="max-h-[120px] sm:max-h-[200px] overflow-y-auto px-1">
              <Timeline
                items={(selectedTicket.history || []).map((event) => ({
                  color: event.color || 'blue',
                  children: (
                    <div className="pb-1">
                      <Text strong style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }} className="text-gray-300">{event.text}</Text>
                      <Text style={{ display: 'block', fontSize: '12px' }} className="text-gray-500">{event.date}</Text>
                    </div>
                  ),
                }))}
              />
            </div>
          </div>

          {/* Ações de Suporte */}
          {currentView === 'support' && selectedTicket.status !== 'closed' && (
            <div className="p-4 bg-gradient-to-r from-purple-900/10 to-blue-900/10 rounded-lg border border-purple-800/30">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <Text className="text-gray-400 text-sm">Ações de Suporte:</Text>
                <Space wrap>
                  <Button 
                    size="small" 
                    icon={<Share2 size={14}/>} 
                    onClick={() => { onAssignTicket(selectedTicket); onClose(); }}
                    className="flex items-center gap-1"
                  >
                    Vincular/Atribuir
                  </Button>
                  <Button 
                    size="small" 
                    danger 
                    icon={<AlertTriangle size={14}/>}
                    onClick={() => { onChangePriority(selectedTicket.key, 'high'); onClose(); }}
                    className="flex items-center gap-1"
                  >
                    Prioridade Alta
                  </Button>
                </Space>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default DetailsModal;