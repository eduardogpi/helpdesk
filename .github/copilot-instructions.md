# Instruções do Projeto Service Desk

## Idioma e Comunicação
- **Idioma Principal**: Português (Brasil).
- **Código**: Comentários, variáveis e commits devem ser em inglês (padrão de mercado), mas textos de UI e documentação em Português.
- **Interação**: O assistente deve sempre responder em Português.

## Stack Tecnológico e Arquitetura
- **Core**: React 19, Vite 7.
- **Biblioteca UI**: Ant Design 5 (Tema Escuro).
- **Estilização**: Tailwind CSS 4 + CSS Personalizado (`src/index.css`).
- **Ícones**: `lucide-react`.
- **Estado**: Estado local centralizado em `App.jsx` (padrão de dados mockados). Sem gerenciamento de estado externo.

## Estilização e Temas
- **Abordagem Híbrida**: Use Tailwind para layout/espaçamento (`flex`, `grid`, `p-4`) e Ant Design para componentes complexos.
- **Overrides Globais**: CRÍTICO - Verifique `src/index.css` antes de estilizar componentes Ant. Ele gerencia:
  - Ajustes do modo escuro.
  - Scrollbars personalizadas.
  - Bordas com gradiente (`.gradient-red`, `.gradient-blue`).
  - Overrides de tabela para mobile.
- **Gradientes**: Use classes de gradiente específicas para cards de status (ex: `bg-gradient-to-br from-blue-500 to-purple-500` para avatares).

## Padrões de Design Responsivo
- **Mobile-First**: Projete para mobile, escale para telas maiores.
- **Tabelas (`TicketList.jsx`)**:
  - Use a prop `responsive: ['sm', 'md']` nas colunas da Tabela Ant Design para ocultar dados menos importantes.
  - **Visão Mobile**: Oculte "ID", "Sistema", "Solicitante". Mostre "Título" (com tag do sistema inline), "Status", "Prioridade".
  - **Hacks CSS**: Use `.system-tag-mobile` em `index.css` para alternar a visibilidade de elementos dentro das células da tabela com base no tamanho da tela.
  - **Tipografia**: Use `clamp()` para tamanhos de fonte (ex: `fontSize: 'clamp(12px, 2.5vw, 14px)'`).
- **Layout**: `App.jsx` usa `Layout`, `Header`, `Content` do Antd. O Header usa estilos flex inline para evitar overrides do Antd.

## Convenções de Componentes
- **TicketList**:
  - Layout da coluna "Chamado": Título (negrito) -> Tag do Sistema (azul) -> Descrição (cinza, truncada).
  - Status/Prioridade: Use `Badge` e `Tag` com mapeamento de cores consistente (`getPriorityColor`).
- **Modais**: Controlados pelo estado do `App.jsx` (`isCreateModalOpen`, etc.).
- **Dashboard**: Cards de KPI com progresso circular e bordas com gradiente.

## Fluxo de Desenvolvimento
- **Executar**: `npm run dev` (Vite).
- **Lint**: ESLint configurado.
- **Dados**: Dados mockados estão no array `initialData` em `App.jsx`. Ao adicionar funcionalidades, atualize essa estrutura de mock.
