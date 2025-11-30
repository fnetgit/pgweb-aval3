# GeoPedia - Avaliação 3 de Programação Web

## 📋 Sobre o Projeto

GeoPedia é uma aplicação web desenvolvida como terceira avaliação da disciplina de Programação Web da UESPI. O projeto consiste em uma enciclopédia interativa de países, utilizando a API REST Countries para exibir informações detalhadas sobre nações ao redor do mundo.

**🌐 Site em produção:** https://pgweb-aval3.netlify.app/

## 👥 Equipe de Desenvolvimento

- **Alan Rodrigues** - [@alanrcastro100](https://github.com/alanrcastro100)
- **Fabricio Fontenele** - [@Fabricio-Fontenele](https://github.com/Fabricio-Fontenele)
- **Francisco Neto** - [@fnetgit](https://github.com/fnetgit)
- **Ruan Pedro** - [@oAnjophb](https://github.com/oAnjophb)

## 🚀 Tecnologias Utilizadas

### Core
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server de alta performance

### Estilização
- **Tailwind CSS 4** - Framework CSS utility-first
- **PostCSS** - Processador de CSS com autoprefixer

### Roteamento e Estado
- **React Router DOM** - Gerenciamento de rotas SPA
- **Custom Hooks** - Gerenciamento de estado e lógica reutilizável

### API e Dados
- **REST Countries API** - API pública para dados de países
- **Fetch API** - Requisições HTTP nativas

### Ícones e Assets
- **Lucide React** - Biblioteca de ícones SVG

## ✨ Funcionalidades Implementadas

### Página Principal
- **Listagem de países** com cards responsivos
- **Sistema de busca** por nome do país
- **Filtro por região** (África, Américas, Ásia, Europa, Oceania)
- **Sistema de favoritos** persistente (localStorage)
- **Paginação** com 20 países por página
- **Design responsivo** otimizado para mobile, tablet e desktop

### Página de Detalhes do País
- **Informações completas**: nome oficial, capital, população, área, idiomas, moedas
- **Bandeira em destaque** com proporções originais
- **Mapa interativo** do Google Maps
- **Países fronteiriços** com navegação rápida
- **Botão voltar** para navegação fluida
- **Scroll buttons** para topo/rodapé da página

### Página Sobre a Equipe
- **Apresentação da equipe** com fotos do GitHub
- **Links para perfis** (GitHub, LinkedIn, Email)
- **Descrição do projeto** e tecnologias utilizadas
- **Cards de membros** com informações e biografia

### Features Especiais
- **Tradução automática** - Nomes de países em português quando disponível
- **Color sampling** - Labels pegam cores da bandeira do país
- **Loading states** - Indicadores de carregamento
- **Error handling** - Tratamento de erros com mensagens amigáveis
- **Variáveis CSS** - Sistema de cores centralizado e customizável

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/fnetgit/pgweb-aval3.git

# Entre na pasta
cd pgweb-aval3

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build
```