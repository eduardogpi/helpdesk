import React from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Upload,
  Typography
} from 'antd';
import { UploadCloud, FileText, AlertCircle } from 'lucide-react';
import { SYSTEMS } from '../data/mockData';

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;
const { Text } = Typography;

const CreateTicketModal = ({
  isOpen,
  onClose,
  form,
  onFinish
}) => {
  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <FileText size={16} className="text-blue-400" />
          </div>
          <span className="text-sm sm:text-base">Abrir Novo Chamado</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width="100%"
      style={{ maxWidth: 600 }}
      className="responsive-modal"
      centered
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onFinish} 
        initialValues={{ priority: 'medium', system: SYSTEMS[0] }}
        className="pt-2 sm:pt-4"
        size="middle"
      >
        <Row gutter={[12, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item 
              name="requester" 
              label={<Text className="text-gray-300 text-xs sm:text-sm">Solicitante</Text>}
              rules={[{ required: true, message: 'Informe seu nome' }]}
            >
              <Input placeholder="Seu nome" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item 
              name="system" 
              label={<Text className="text-gray-300 text-xs sm:text-sm">Sistema</Text>}
              rules={[{ required: true }]}
            >
              <Select>
                {SYSTEMS.map(sys => <Option key={sys} value={sys}>{sys}</Option>)}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item 
          name="priority" 
          label={
            <div className="flex items-center gap-1 sm:gap-2">
              <AlertCircle size={12} className="text-gray-400" />
              <Text className="text-gray-300 text-xs sm:text-sm">Urgência</Text>
            </div>
          }
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="low">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Baixa - Pode aguardar
              </div>
            </Option>
            <Option value="medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                Média - Importante
              </div>
            </Option>
            <Option value="high">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Alta - Urgente
              </div>
            </Option>
          </Select>
        </Form.Item>

        <Form.Item 
          name="title" 
          label={<Text className="text-gray-300 text-xs sm:text-sm">Assunto</Text>}
          rules={[{ required: true, message: 'Informe o assunto' }]}
        >
          <Input placeholder="Resumo do problema" />
        </Form.Item>

        <Form.Item 
          name="description" 
          label={<Text className="text-gray-300 text-xs sm:text-sm">Descrição</Text>}
          rules={[{ required: true, message: 'Descreva o problema' }]}
        >
          <TextArea 
            rows={3} 
            placeholder="Detalhe o que aconteceu..." 
            showCount 
            maxLength={500}
            className="text-sm"
          />
        </Form.Item>

        <Form.Item label={<Text className="text-gray-300 text-xs sm:text-sm">Evidências (opcional)</Text>} className="hidden sm:block">
          <Form.Item name="attachments" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Dragger
              name="files"
              action="/upload.do"
              multiple={true}
              beforeUpload={() => false}
              className="bg-[#1a1a1a] hover:border-blue-500/50 transition-colors"
            >
              <div className="py-3">
                <p className="flex justify-center text-blue-400 mb-2">
                  <UploadCloud size={28} strokeWidth={1.5} />
                </p>
                <p className="text-gray-300 text-xs sm:text-sm mb-1">Clique ou arraste arquivos</p>
                <p className="text-gray-500 text-xs">Imagens, PDF ou logs (máx. 10MB)</p>
              </div>
            </Dragger>
          </Form.Item>
        </Form.Item>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-4 pt-3 border-t border-gray-800">
          <Button onClick={onClose} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" className="w-full sm:w-auto">
            Criar Chamado
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateTicketModal;