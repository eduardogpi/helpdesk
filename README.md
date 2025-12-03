# 🎫 Service Desk - Sistema de Gerenciamento de Chamados

Sistema de helpdesk interno para gerenciamento de chamados técnicos, desenvolvido em React com interface moderna e responsiva.

![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.x-0170FE?logo=antdesign)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-06B6D4?logo=tailwindcss)

---

## 📋 Descrição do Projeto

O **Service Desk** é uma aplicação web para gerenciamento de chamados técnicos que permite a comunicação eficiente entre usuários solicitantes e a equipe de suporte técnico. O sistema oferece duas visões distintas com funcionalidades específicas para cada perfil.

---

## 🏢 Regras de Negócio

### Visão do Usuário Solicitante
- **Abertura de Chamados**: Usuários podem criar novos chamados informando título, descrição, sistema afetado e prioridade
- **Acompanhamento**: Visualização do status e histórico dos próprios chamados
- **Prioridades**: Classificação em Alta, Média ou Baixa prioridade

### Visão do Técnico de Suporte
- **Painel de Atendimentos**: Lista completa de todos os chamados do sistema
- **Atribuição**: Vinculação de chamados a desenvolvedores/técnicos específicos
- **Dashboard Operacional**: Métricas e indicadores de desempenho

### Ciclo de Vida do Chamado
```
┌─────────┐     ┌──────────────┐     ┌───────────┐
│ Aberto  │ ──► │ Em Andamento │ ──► │ Concluído │
└─────────┘     └──────────────┘     └───────────┘
```

1. **Aberto**: Chamado criado, aguardando atendimento
2. **Em Andamento**: Chamado atribuído e sendo trabalhado
3. **Concluído**: Chamado resolvido e fechado

### Classificação por Sistema
- ERP Financeiro
- CRM Vendas
- Infraestrutura
- RH System

### Indicadores (KPIs)
- Total de chamados no período
- Chamados em atendimento
- Taxa de resolução
- Chamados críticos pendentes
- Volume por sistema
- Governança & Projetos (Sprints)

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| React | 19.x | Biblioteca para construção de interfaces |
| Vite | 7.x | Build tool e dev server |
| Ant Design | 5.x | Biblioteca de componentes UI |
| Tailwind CSS | 4.x | Framework CSS utilitário |
| Lucide React | - | Biblioteca de ícones |
| Day.js | - | Manipulação de datas |

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── TicketList.jsx      # Lista e cards de chamados
│   ├── Dashboard.jsx       # Dashboard operacional (Suporte)
│   ├── CreateTicketModal.jsx   # Modal de criação de chamado
│   ├── DetailsModal.jsx    # Modal de detalhes do chamado
│   └── AssignModal.jsx     # Modal de atribuição (Suporte)
├── App.jsx                 # Componente principal
├── App.css                 # Estilos do App
├── index.css               # Estilos globais e customizações
└── main.jsx                # Entry point
```

---

## ⚙️ Instalação e Execução

```bash
# Clonar o repositório
git clone https://github.com/eduardogpi/helpdesk.git

# Entrar no diretório
cd helpdesk

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

---

## 🖥️ Funcionalidades

### Usuário Solicitante
- [x] Criar novo chamado
- [x] Visualizar lista de chamados
- [x] Filtrar e buscar chamados
- [x] Ver detalhes e histórico
- [x] Acompanhar status

### Técnico de Suporte
- [x] Visualizar todos os chamados
- [x] Atribuir chamados a desenvolvedores
- [x] Alterar prioridade
- [x] Dashboard com métricas
- [x] Filtro por período
- [x] Indicadores por sistema

---

## 🎨 Interface

### Tema
- Dark mode por padrão
- Cores personalizadas por status e prioridade
- Cards com gradientes e bordas coloridas
- Design responsivo (mobile-first)

### Componentes Visuais
- Cards de resumo com ícones
- Tabela com avatares e tags coloridas
- Gráficos de progresso
- Modais responsivos
- Segmented controls para navegação

---

## 🔮 Roadmap (Futuras Implementações)

- [ ] Integração com API backend
- [ ] Autenticação e autorização
- [ ] Notificações em tempo real
- [ ] Anexos e comentários
- [ ] Relatórios exportáveis
- [ ] SLA e métricas avançadas

---

## 👨‍💻 Autor

Desenvolvido por **Eduardo GPI**

---

## 📄 Licença

Este projeto está sob a licença MIT.
