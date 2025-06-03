# MagiStore 🧙‍♂️🛒

Bem-vindo à **MagiStore**, sua loja mística online para encontrar os mais raros e poderosos produtos!  
Este é um projeto de e-commerce construído com **Vue.js**, **Tailwind CSS** e **Vue Router**, simulando uma experiência completa de navegação, exibição de produtos, carrinho de compras e funcionalidades de pesquisa e filtragem.

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

![image](https://github.com/user-attachments/assets/8a361e79-62e1-4d38-b80d-e625632667f6)

![image](https://github.com/user-attachments/assets/265b3143-9ce0-4012-acb2-2ae86626329d)

![image](https://github.com/user-attachments/assets/f4e1aab9-a4fb-4aeb-abb5-ddf7b11c5e82)

Página Inicial (Mobile - Menu Fechado)

![image](https://github.com/user-attachments/assets/b2c33ace-8d91-4e20-84d9-468ce82bdf60)

![image](https://github.com/user-attachments/assets/96339eb6-f61c-42fc-9629-784e9f35e6ac)

Página Inicial (Mobile - Menu Aberto)

![image](https://github.com/user-attachments/assets/092f755d-f4b4-498e-a7b1-371bd32aa42c)

![image](https://github.com/user-attachments/assets/736eedfb-9fe4-4372-ba08-1d7baf710d94)


Página de Detalhes do Produto

![image](https://github.com/user-attachments/assets/1e00e7ca-0375-4675-8078-38e787df6125)

![image](https://github.com/user-attachments/assets/2c5f49af-139c-4381-bff6-2d5263acc89d)

![image](https://github.com/user-attachments/assets/8f9915f1-0aa5-4693-8913-d79e7ed024ec)

Página do Carrinho Vazio

![image](https://github.com/user-attachments/assets/c009f704-82aa-4b72-aafc-8fa5a7a54d96)

![image](https://github.com/user-attachments/assets/b9e3b7a1-0477-40f3-b92c-013cddcdf596)

Página do Carrinho com Itens

![image](https://github.com/user-attachments/assets/ba745c57-24da-4ab9-a705-b41cd0a2ca2c)

![image](https://github.com/user-attachments/assets/86105241-73db-4251-a2b3-d35706acdbe2)

![image](https://github.com/user-attachments/assets/6c9b8ddb-363e-4d35-9efb-7c2001ee8c0c)

Página do Carrinho Compra Finalizada

![image](https://github.com/user-attachments/assets/22e92aad-3676-4925-bb14-419b5c3821ce)

![image](https://github.com/user-attachments/assets/c7a878f7-5435-4d9a-8356-8d468750ed3b)

Página de Resultados da Pesquisa

![image](https://github.com/user-attachments/assets/6e46eec6-881a-45cc-ab82-06ca42d6e713)

![image](https://github.com/user-attachments/assets/2f12d443-5679-44de-86b6-6e44aa79d342)
