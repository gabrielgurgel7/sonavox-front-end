# Sonavox 🎸

E-commerce full-stack para instrumentos musicais, desenvolvido como projeto prático da trilha Full-Stack do **TIC Hub 12 (IRede)**.

🔗 **Deploy:** [sonavox-front-end.vercel.app](https://sonavox-front-end.vercel.app)

> ⚠️ Projeto em desenvolvimento ativo.

---

## Sobre o projeto

Sonavox é uma loja virtual fictícia especializada em instrumentos musicais, construída para praticar conceitos de desenvolvimento full-stack: consumo de API REST, gerenciamento de estado, autenticação, formulários validados e uma UI responsiva.

## Tecnologias

**Front-end**
- [Vue 3](https://vuejs.org/) (Composition API)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) — gerenciamento de estado
- [PrimeVue](https://primevue.org/) — biblioteca de componentes
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vuelidate](https://vuelidate-next.netlify.app/) — validação de formulários
- [Axios](https://axios-http.com/) — requisições HTTP

**Back-end**
- Node.js + Express
- MySQL

## Rodando o projeto localmente

### Pré-requisitos
- Node.js (`^20.19.0` ou `>=22.12.0`)
- npm

### Instalação

```bash
git clone https://github.com/gabrielgurgel7/sonavox-front-end.git
cd sonavox-front-end
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias (veja `.env.example`, se disponível, ou consulte a documentação interna).

### Desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

### Lint e formatação

```bash
npm run lint
npm run format
```

## Deploy

O deploy é feito automaticamente via [Vercel](https://vercel.com), a partir da branch `main`.

## Autor

Desenvolvido por [Gabriel Gurgel](https://github.com/gabrielgurgel7) como parte da trilha Full-Stack do TIC Hub 12 (IRede).
