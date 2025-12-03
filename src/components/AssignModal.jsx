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
          <Share2 size={18} className="text-purple-500" />
          <span className="text-sm sm:text-base">Distribuir Chamado</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width="100%"
      style={{ maxWidth: 500 }}
      centered
      className="responsive-modal"
    >
      <p className="mb-3 sm:mb-4 text-gray-400 text-xs sm:text-sm">
        Vincule o chamado <strong>{ticketToAssign?.id}</strong> a uma ação de governança.
      </p>
      <Form form={form} onFinish={onFinish} layout="vertical" size="middle">
        <Form.Item
          name="governanceAction"
          label={
            <Space size={4}>
              <GitBranch size={14} />
              <span className="text-xs sm:text-sm">Ação de Governança</span>
            </Space>
          }
          rules={[{ required: true, message: 'Selecione uma ação' }]}
        >
          <Select placeholder="Vincular a uma iniciativa...">
            {GOVERNANCE_ACTIONS.map(action => (
              <Option key={action.name} value={action.name}>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm truncate">{action.name}</span>
                  <Tag className="ml-2 !text-[10px]">{action.type}</Tag>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item 
          name="dev" 
          label={<span className="text-xs sm:text-sm">Desenvolvedor / Técnico</span>}
          rules={[{ required: true, message: 'Selecione um dev' }]}
        >
          <Select placeholder="Selecione um responsável">
            {DEVS.map(dev => (
              <Option key={dev} value={dev}>
                <Space>
                  <Avatar size="small" style={{ backgroundColor: '#87d068' }}>{dev[0]}</Avatar>
                  <span className="text-xs sm:text-sm">{dev}</span>
                </Space>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-4 pt-3 border-t border-gray-800">
          <Button onClick={onClose} className="w-full sm:w-auto">Cancelar</Button>
          <Button type="primary" htmlType="submit" className="bg-purple-600 w-full sm:w-auto" icon={<LinkIcon size={14}/>}>
            Vincular
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AssignModal;