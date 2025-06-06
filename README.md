# MagiStore 🧙‍♂️🛒

Bem-vindo à **MagiStore**, sua loja mística online para encontrar os mais raros e poderosos produtos!  
Este é um projeto de e-commerce construído com **Vue.js**, **Tailwind CSS** e **Vue Router**, simulando uma experiência completa de navegação, exibição de produtos, carrinho de compras e funcionalidades de pesquisa e filtragem.

Vídeo Apresentação: https://www.youtube.com/watch?v=4EsnAPLuRnc

---

## 🧾 Visão Geral do Projeto

A **MagiStore** é uma aplicação web de página única (SPA) que oferece uma experiência de compra fluida e responsiva. Ela se conecta à API de produtos [dummyjson.com](https://dummyjson.com) para exibir itens, gerenciar o carrinho de compras e permitir que os usuários pesquisem e filtrem produtos por categoria e critérios de ordenação.

---

## ✨ Funcionalidades

### 🔗 Navegação Completa
- Barra de navegação responsiva com menu hambúrguer para mobile
- Campo de busca com *debounce*
- Dropdown de categorias dinâmico
- Ícone de carrinho com contador de itens

### 🛍️ Listagem de Produtos
- Exibição de produtos com paginação
- Ordenação por título ou preço (crescente/decrescente)
- Filtro por categoria

### 📦 Detalhes do Produto
- Página com informações detalhadas
- Adicionar ao carrinho diretamente da página

### 🛒 Carrinho de Compras
- Visualização clara dos itens
- Ajuste de quantidades, remoção e limpeza do carrinho
- Cálculo automático do total
- Confirmação de compra

### 🔍 Pesquisa de Produtos
- Página de resultados com paginação

### 📱 Design Responsivo
- Adaptação para desktop, tablet e mobile usando **Tailwind CSS**

---

## 🛠️ Tecnologias Utilizadas

- [Vue.js 3](https://vuejs.org/)
- [Vue Router 4](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🗂️ Estrutura do Projeto

```
.
├── public/
├── src/
│ ├── assets/
│ │ └── imgs/
│ │ └── logo.png
│ │ └── bg.png
│ │ └── favicon.png
│ ├── components/
│ │ ├── Cart.vue
│ │ ├── Footer.vue
│ │ ├── Navbar.vue
│ │ ├── ProductCard.vue
│ │ ├── ProductDetail.vue
│ │ └── SearchProducts.vue
│ ├── router/
│ │ └── index.js
│ ├── views/
│ │ ├── Home.vue
│ │ └── ProductsByCategories.vue
│ ├── App.vue
│ └── main.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```
## 🧩 Componentes Chave

### `App.vue`
Componente raiz. Define o layout principal e provê o estado do carrinho globalmente.

### `Navbar.vue`
Barra de navegação com logo, busca, categorias, e carrinho. Responsiva com menu hambúrguer.

### `Home.vue`
Página inicial com listagem paginada de produtos e ordenação.

### `ProductsByCategories.vue`
Exibe produtos de uma categoria com filtros e paginação.

### `Cart.vue`
Exibe os itens no carrinho com controle de quantidades, remoção e totalização.

### `Footer.vue`
Rodapé com informações da loja e contato.

### `ProductCard.vue`
Card reutilizável com imagem, nome e preço do produto.

### `ProductDetail.vue`
Exibe detalhes completos de um produto e botão para adicioná-lo ao carrinho.

### `SearchProducts.vue`
Exibe os resultados da busca com paginação.

### `router/index.js`
Define as rotas da aplicação.

---

## ⚙️ Instalação e Execução

1. Clone o repositório:

```
git clone 'https://github.com/Rodrigo-Shinji/Catalogo-de-E-commerce.git'
cd magistore
Instale as dependências:

npm install
# ou
yarn install
Execute o servidor de desenvolvimento:

npm run dev
# ou
yarn dev
A aplicação estará disponível em http://localhost:5173

Para build de produção:

npm run build
# ou
yarn build
Os arquivos serão gerados na pasta dist/.
```

📸 Capturas de Tela

Página Inicial (Desktop)

![image](https://github.com/user-attachments/assets/cb83a084-7dc5-45cd-b10a-3be815c7818d)

Página Inicial (Mobile - Menu Fechado)

![image](https://github.com/user-attachments/assets/7960d663-a5e7-4a2c-905b-8da72f152784)

Página Inicial (Mobile - Menu Aberto)

![image](https://github.com/user-attachments/assets/88473dbd-bc0d-40f7-864a-6c84db8ec9bf)

Página de Detalhes do Produto

![image](https://github.com/user-attachments/assets/43f57465-553c-4d60-a1b5-dc575202c612)

Página do Carrinho Vazio

![image](https://github.com/user-attachments/assets/fc465551-c596-44dd-ac52-c6ebf1d37eec)

Página do Carrinho com Itens

![image](https://github.com/user-attachments/assets/efdd5555-4212-4406-811c-240cfad62d65)

Página do Carrinho Compra Finalizada

![image](https://github.com/user-attachments/assets/e223884f-193e-4466-9e06-3d5d4e89cdbc)

Página de Resultados da Pesquisa

![image](https://github.com/user-attachments/assets/b574efc3-865f-48d1-90b7-1fc82b94631d)
