# Produx Admin

## Descrição
Produx Admin é uma aplicação web desenvolvida para o gerenciamento e monitoramento de processos industriais. A aplicação utiliza React como framework principal e é configurada para ser uma Progressive Web App (PWA), permitindo funcionalidades offline e maior desempenho.

## Estrutura do Projeto
O projeto segue uma estrutura modular e organizada, com os principais diretórios e arquivos descritos abaixo:

### Diretórios Principais
- **`public/`**: Contém arquivos estáticos que são servidos diretamente, como `index.html`, ícones e o manifesto da PWA.
- **`src/`**: Contém o código-fonte da aplicação, incluindo componentes, páginas, estilos e utilitários.
- **`build/`**: Diretório gerado após o processo de build, contendo os arquivos otimizados para produção.

### Principais Arquivos
- **`src/index.js`**: Ponto de entrada da aplicação. Renderiza o componente principal `App` e registra o service worker.
- **`src/App.jsx`**: Componente principal que define o layout e as rotas da aplicação.
- **`src/setupProxy.js`**: Configuração de proxy para redirecionar chamadas de API durante o desenvolvimento.
- **`src/serviceWorkerRegistration.js`**: Configuração do service worker para suporte a PWA.
- **`src/utils/utils.js`**: Contém funções utilitárias, como `formatMinutesToHours` para formatar minutos em horas.

## Tecnologias Utilizadas
- **React**: Framework principal para construção da interface.
- **Material-UI (MUI)**: Biblioteca de componentes para estilização e design responsivo.
- **React Router**: Gerenciamento de rotas.
- **ECharts**: Biblioteca para gráficos interativos.
- **Workbox**: Utilizado para configurar o service worker e funcionalidades de PWA.

## Funcionalidades
- **Dashboard de Produção**: Exibe gráficos e tabelas com dados de produção e paradas.
- **Status da Indústria**: Mostra o status em tempo real das estações de trabalho.
- **PWA**: Suporte offline e carregamento rápido com service workers.
- **Temas**: Utiliza o sistema de temas do Material-UI para um design consistente.

## Estrutura de Componentes
Os componentes estão organizados em diretórios dentro de `src/components/`. Alguns dos principais componentes incluem:
- **`AppBarComponent`**: Barra de navegação com links e opções de tela cheia.
- **`Footer`**: Rodapé fixo com o logotipo da empresa.
- **`CompDashGeralParadaTrabalho`**: Gráficos de percentual de trabalho e paradas.
- **`CompDashProducao`**: Tabela com resumo de produção.
- **`CompDashProducaoGeral`**: Relatório geral de produtividade diária.

## Configuração de Proxy
O arquivo [`src/setupProxy.js`](src/setupProxy.js) configura um proxy para redirecionar chamadas para a API backend. Ele utiliza o pacote `http-proxy-middleware` e adiciona cabeçalhos personalizados, como o token de autenticação.

## Rotas
As rotas são definidas no componente [`App.jsx`](src/App.jsx) utilizando o `react-router-dom`. As principais rotas incluem:
- `/`: Página inicial com indicadores de status.
- `/dashboardprod`: Dashboard de produção.
- `/statusindustria`: Status em tempo real das estações.

## Scripts Disponíveis
Os scripts podem ser executados utilizando `npm` ou `yarn`:
- **`start`**: Inicia o servidor de desenvolvimento.
- **`build`**: Gera os arquivos otimizados para produção.
- **`test`**: Executa os testes.
- **`eject`**: Ejeta a configuração padrão do Create React App.

## Como Executar
1. Clone o repositório.
2. Instale as dependências:
   ```sh
   npm install