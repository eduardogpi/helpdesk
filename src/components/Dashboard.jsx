import React from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  List,
  Tag,
  Space,
  Select,
  Typography,
  Empty
} from 'antd';
import {
  List as ListIcon,
  Activity,
  CheckCircle2,
  Zap,
  PieChart,
  Monitor,
  GitBranch,
  Filter,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

const { Text, Title } = Typography;
const { Option } = Select;

const Dashboard = ({
  selectedMonth,
  availableMonths,
  setSelectedMonth,
  totalTickets,
  totalOpen,
  totalInProgress,
  totalClosed,
  totalCritical,
  ticketsBySystem,
  ticketsByGovernance
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Cabeçalho do Filtro - Responsivo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#141414] p-3 sm:p-4 rounded-xl border border-gray-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Filter size={16} className="text-blue-400" />
          </div>
          <Text strong className="text-gray-300 text-sm sm:text-base">Filtro de Período</Text>
        </div>
        <Select
          value={selectedMonth}
          onChange={setSelectedMonth}
          className="w-full sm:w-[180px]"
          placeholder="Selecione o período"
        >
          {availableMonths.map(month => (
            <Option key={month} value={month}>{month}</Option>
          ))}
        </Select>
      </div>

      {/* KPIs Principais - Grid Responsivo */}
      <Row gutter={[12, 12]}>
        <Col xs={12} sm={12} lg={6}>
          <Card 
            bordered={false} 
            className="stat-card gradient-blue bg-[#141414] h-full"
            bodyStyle={{ padding: '16px' }}
          >
            <Statistic
              title={<Text type="secondary" className="text-xs sm:text-sm">Total no Período</Text>}
              value={totalTickets}
              prefix={<ListIcon size={16} className="mr-1 text-blue-400"/>}
              valueStyle={{ color: '#fff', fontSize: '1.5rem' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card 
            bordered={false} 
            className="stat-card gradient-yellow bg-[#141414] h-full"
            bodyStyle={{ padding: '16px' }}
          >
            <Statistic
              title={<Text type="secondary" className="text-xs sm:text-sm">Em Atendimento</Text>}
              value={totalInProgress}
              prefix={<Activity size={16} className="mr-1 text-yellow-400"/>}
              valueStyle={{ color: '#faad14', fontSize: '1.5rem' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card 
            bordered={false} 
            className="stat-card gradient-green bg-[#141414] h-full"
            bodyStyle={{ padding: '16px' }}
          >
            <Statistic
              title={<Text type="secondary" className="text-xs sm:text-sm">Taxa de Resolução</Text>}
              value={totalTickets > 0 ? Math.round((totalClosed / totalTickets) * 100) : 0}
              suffix="%"
              prefix={<TrendingUp size={16} className="mr-1 text-green-400"/>}
              valueStyle={{ color: '#52c41a', fontSize: '1.5rem' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card 
            bordered={false} 
            className="stat-card gradient-red bg-[#141414] h-full border-b-2 border-red-500"
            bodyStyle={{ padding: '16px' }}
          >
            <Statistic
              title={<Text className="text-red-300 text-xs sm:text-sm">Críticos Pendentes</Text>}
              value={totalCritical}
              prefix={<AlertTriangle size={16} className="mr-1 text-red-400"/>}
              valueStyle={{ color: '#ff4d4f', fontSize: '1.5rem' }}
            />
          </Card>
        </Col>
      </Row>

      {totalTickets === 0 ? (
        <Card bordered={false} className="bg-[#141414]">
          <Empty 
            description={<Text type="secondary">Nenhum dado encontrado para o período {selectedMonth}</Text>}
            className="py-8"
          />
        </Card>
      ) : (
        <>
          <Row gutter={[12, 12]}>
            {/* Gráfico de Status */}
            <Col xs={24} lg={12}>
              <Card 
                title={
                  <div className="flex items-center gap-2">
                    <PieChart size={16} className="text-blue-400"/> 
                    <span className="text-sm">Status do Atendimento</span>
                  </div>
                } 
                bordered={false} 
                className="bg-[#141414] h-full"
                styles={{ body: { padding: '16px 20px' } }}
              >
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-gray-400 mb-2 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        Abertos (Fila)
                      </span>
                      <span className="font-semibold text-white">{totalOpen}</span>
                    </div>
                    <Progress 
                      percent={Math.round((totalOpen/totalTickets)*100)} 
                      showInfo={false} 
                      strokeColor={{ from: '#ff4d4f', to: '#ff7875' }}
                      trailColor="#1f1f1f"
                      size="small"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-400 mb-2 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                        Em Andamento
                      </span>
                      <span className="font-semibold text-white">{totalInProgress}</span>
                    </div>
                    <Progress 
                      percent={Math.round((totalInProgress/totalTickets)*100)} 
                      showInfo={false} 
                      strokeColor={{ from: '#faad14', to: '#ffc53d' }}
                      trailColor="#1f1f1f"
                      size="small"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-400 mb-2 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Concluídos
                      </span>
                      <span className="font-semibold text-white">{totalClosed}</span>
                    </div>
                    <Progress 
                      percent={Math.round((totalClosed/totalTickets)*100)} 
                      showInfo={false} 
                      strokeColor={{ from: '#52c41a', to: '#73d13d' }}
                      trailColor="#1f1f1f"
                      size="small"
                    />
                  </div>
                </div>
              </Card>
            </Col>

            {/* Volume por Sistema */}
            <Col xs={24} lg={12}>
              <Card 
                title={
                  <div className="flex items-center gap-2">
                    <Monitor size={16} className="text-purple-400"/> 
                    <span className="text-sm">Volume por Sistema</span>
                  </div>
                } 
                bordered={false} 
                className="bg-[#141414] h-full"
                styles={{ body: { padding: '12px 16px' } }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={ticketsBySystem.slice(0, 4)}
                  renderItem={item => (
                    <List.Item className="!border-b !border-gray-800/50 last:!border-0 !py-3">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <span className="text-blue-400 font-bold text-sm">{item.count}</span>
                          </div>
                          <div>
                            <Text className="text-gray-200 text-sm block">{item.name}</Text>
                            <Text className="text-xs text-gray-500">{item.open} pendentes</Text>
                          </div>
                        </div>
                        <Progress 
                          type="circle" 
                          percent={item.count > 0 ? Math.round((item.open / item.count) * 100) : 0} 
                          width={36} 
                          format={(p) => <span className="text-xs text-gray-400">{p}%</span>} 
                          strokeColor="#8b5cf6" 
                          trailColor="#1f1f1f"
                        />
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>

          {/* Governança */}
          <Card 
            title={
              <div className="flex items-center gap-2">
                <GitBranch size={16} className="text-green-400"/> 
                <span className="text-sm">Governança & Projetos</span>
              </div>
            } 
            bordered={false} 
            className="bg-[#141414]"
            styles={{ body: { padding: '16px 20px' } }}
          >
            {ticketsByGovernance.length > 0 ? (
              <Row gutter={[16, 16]}>
                {ticketsByGovernance.map(g => (
                  <Col xs={24} md={12} key={g.name}>
                    <div className="p-3 bg-[#1a1a1a] rounded-lg border border-gray-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <Text className="text-gray-300 text-sm truncate flex-1">{g.name}</Text>
                        <Tag color="purple" className="ml-2">{g.count}</Tag>
                      </div>
                      <Progress 
                        percent={Math.min((g.count * 10), 100)} 
                        showInfo={false} 
                        strokeColor={{ from: '#722ed1', to: '#9254de' }}
                        trailColor="#1f1f1f"
                        size="small" 
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            ) : (
              <Empty 
                description={<Text type="secondary" className="text-sm">Nenhum chamado vinculado a projetos</Text>}
                className="py-4"
              />
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;