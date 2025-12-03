import React from 'react';
import {
  Modal,
  Form,
  Select,
  Button,
  Space,
  Avatar,
  Tag
} from 'antd';
import { Share2, GitBranch, Link as LinkIcon } from 'lucide-react';
import { DEVS, GOVERNANCE_ACTIONS } from '../data/mockData';

const { Option } = Select;

const AssignModal = ({
  isOpen,
  onClose,
  form,
  onFinish,
  ticketToAssign
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Share2 size={20} className="text-purple-500" />
          <span>Distribuir Chamado & Governança</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={500}
    >
      <p className="mb-4 text-gray-400">Vincule o chamado <strong>{ticketToAssign?.id}</strong> a uma ação de governança e defina o responsável.</p>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="governanceAction"
          label={
            <Space>
              <GitBranch size={16} />
              <span>Ação de Governança (Projeto/Sprint)</span>
            </Space>
          }
          rules={[{ required: true, message: 'Selecione uma ação de governança' }]}
        >
          <Select placeholder="Vincular a uma iniciativa...">
            {GOVERNANCE_ACTIONS.map(action => (
              <Option key={action.name} value={action.name}>
                <div className="flex justify-between">
                  <span>{action.name}</span>
                  <Tag className="ml-2" style={{ fontSize: '10px' }}>{action.type}</Tag>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="dev" label="Desenvolvedor / Técnico" rules={[{ required: true, message: 'Selecione um dev' }]}>
          <Select placeholder="Selecione um responsável">
            {DEVS.map(dev => (
              <Option key={dev} value={dev}>
                <Space>
                  <Avatar size="small" style={{ backgroundColor: '#87d068' }}>{dev[0]}</Avatar>
                  {dev}
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" htmlType="submit" className="bg-purple-600" icon={<LinkIcon size={16}/>}>Vincular e Atribuir</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AssignModal;