# 🚀 Produx Admin

## 📌 Descrição
Produx Admin é uma aplicação web desenvolvida para o gerenciamento e monitoramento de processos industriais. A aplicação utiliza **React** como framework principal e é configurada para ser uma **Progressive Web App (PWA)**, permitindo funcionalidades **offline** e maior desempenho. ⚡

## 📂 Estrutura do Projeto
O projeto segue uma estrutura modular e organizada, com os principais diretórios e arquivos descritos abaixo:

### 📁 Diretórios Principais
- **`public/`** 🏗️: Contém arquivos estáticos como `index.html`, ícones e o manifesto da PWA.
- **`src/`** 🛠️: Contém o código-fonte da aplicação, incluindo componentes, páginas, estilos e utilitários.
- **`build/`** 📦: Diretório gerado após o processo de build, contendo os arquivos otimizados para produção.

### 🌐 Configuração de Deploy
No ambiente de produção, o arquivo `src/setupProxy.js` não é utilizado. Em vez disso, o proxy para redirecionar chamadas de `/api` para a URL da API backend deve ser configurado no servidor web, como o **Nginx**. 

Abaixo está um exemplo de configuração no arquivo `nginx.conf`:

```nginx
server {
   listen 80;
   server_name produxadmin.com;

   location / {
      root /usr/share/nginx/html;
      index index.html;
      try_files $uri /index.html;
   }

   location /api/ {
      proxy_pass http://backend-api-url.com/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
   }
}
```

Certifique-se de substituir `http://backend-api-url.com/` pela URL real da API backend. Após configurar o Nginx, reinicie o serviço para aplicar as alterações.

## 🛠️ Tecnologias Utilizadas
- **⚛️ React**: Framework principal para construção da interface.
- **🎨 Material-UI (MUI)**: Biblioteca de componentes para estilização e design responsivo.
- **🔀 React Router**: Gerenciamento de rotas.
- **📊 ECharts**: Biblioteca para criação de gráficos interativos.
- **🔧 Workbox**: Utilizado para configurar o service worker e funcionalidades de PWA.

## 🌟 Funcionalidades
✅ **Dashboard de Produção**: Exibe gráficos e tabelas com dados de produção e paradas.
✅ **Status da Indústria**: Mostra o status em tempo real das estações de trabalho.
✅ **PWA**: Suporte offline e carregamento rápido com service workers.
✅ **Temas**: Utiliza o sistema de temas do Material-UI para um design consistente.

## 🏗️ Estrutura de Componentes
Os componentes estão organizados dentro de `src/components/`. Alguns dos principais incluem:
- **`AppBarComponent`** 📌: Barra de navegação com links e opções de tela cheia.
- **`Footer`** 🔽: Rodapé fixo com o logotipo da empresa.
- **`CompDashGeralParadaTrabalho`** 📊: Gráficos de percentual de trabalho e paradas.
- **`CompDashProducao`** 📋: Tabela com resumo de produção.
- **`CompDashProducaoGeral`** 📈: Relatório geral de produtividade diária.

## 🔄 Configuração de Proxy
O arquivo [`src/setupProxy.js`](src/setupProxy.js) configura um proxy para redirecionar chamadas para a API backend, utilizando `http-proxy-middleware` e adicionando cabeçalhos personalizados, como o token de autenticação. 🔐

## 🗺️ Rotas
As rotas são definidas no componente [`App.jsx`](src/App.jsx) utilizando `react-router-dom`. Algumas das principais rotas incluem:
- 🏠 `/` - Página inicial com indicadores de status.
- 📊 `/dashboardprod` - Dashboard de produção.
- 🏭 `/statusindustria` - Status em tempo real das estações.

## 📜 Scripts Disponíveis
Os scripts podem ser executados utilizando `npm` ou `yarn`:
- **`start`** ▶️: Inicia o servidor de desenvolvimento.
- **`build`** 🏗️: Gera os arquivos otimizados para produção.
- **`test`** 🧪: Executa os testes.
- **`eject`** 🚀: Ejeta a configuração padrão do Create React App.

## 🏁 Como Executar
1. Clone o repositório. 📥
2. Instale as dependências: 🛠️
   ```sh
   npm install
   ```
3. Execute a aplicação: ▶️
   ```sh
   npm start
   ```

🚀 **Agora é só explorar o Produx Admin!** 🎉