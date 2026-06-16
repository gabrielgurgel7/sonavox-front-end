# 🎵 Sonavox — E-commerce de Instrumentos Musicais

Plataforma de e-commerce completa para venda de instrumentos musicais e acessórios, desenvolvida como projeto prático de curso com Vue 3, TypeScript e integração com Stripe.

🔗 **[Ver projeto ao vivo](https://sonavox-front-end.vercel.app)**

---

## ✨ Funcionalidades

- 🛒 Catálogo de produtos com filtro por categoria
- 🔍 Busca de produtos
- 🛍️ Carrinho de compras com drawer lateral
- 💳 Checkout em 4 etapas com pagamento via Stripe
- 📦 Histórico de pedidos
- 🌙 Modo escuro / claro
- 📱 Layout responsivo
- 🔐 Autenticação com JWT (login, registro, refresh token)
- ⚙️ Painel administrativo com CRUD de produtos

---

## 🚀 Stack

**Frontend**
- Vue 3 (Options API)
- TypeScript
- Tailwind CSS
- PrimeVue (Lara theme, unstyled + PassThrough)
- Vue Router
- Pinia
- Axios
- Vuelidate

**Backend**
- Node.js + Express
- TypeScript
- PostgreSQL
- Stripe
- Cloudinary
- JWT

---

## 🖥️ Rodando localmente

### Pré-requisitos
- Node.js 18+
- Docker (para o banco de dados)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gabrielgurgel7/sonavox-front-end.git
cd sonavox-front-end

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas configurações
```

### Variáveis de ambiente

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_URL=http://localhost:5173
```

### Rodando

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Lint
npm run lint
```

---

## 📁 Estrutura do projeto

```
src/
├── assets/          # Imagens e estilos globais
├── components/      # Componentes reutilizáveis
│   ├── cart/        # Carrinho
│   ├── checkout/    # Etapas do checkout
│   ├── common/      # Componentes genéricos
│   ├── layout/      # Header, Footer, Banner
│   └── promo/       # Barra promocional
├── composables/     # Lógica reutilizável (useTheme)
├── guards/          # Navigation guards
├── layouts/         # CustomerLayout, AdminLayout
├── models/          # Classes de domínio
├── services/        # Camada de serviços e REST
├── stores/          # Pinia stores (auth, cart)
├── types/           # Interfaces TypeScript
└── views/           # Páginas da aplicação
```

---

## 🌐 Deploy

| Serviço | Plataforma |
|---------|-----------|
| Frontend | Vercel |
| Backend | Railway |
| Banco de dados | Railway PostgreSQL |
| Imagens | Cloudinary |
| Pagamentos | Stripe (modo teste) |
