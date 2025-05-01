# 🧠 FURIA Fan App - Backend

<details>
<summary>🇧🇷 Versão em Português</summary>

API REST para autenticação e gerenciamento de usuários no FURIA Fan App.  
Desenvolvido com Node.js, Express e Prisma, com banco de dados no Supabase.

## ✨ Funcionalidades

- Registro de usuários
- Login com JWT
- Middleware de autenticação
- Edição de perfil
- Avatar com URL de imagem
- Integração com banco Supabase via Prisma

## 🚀 Tecnologias

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- Supabase (PostgreSQL)
- JWT (jsonwebtoken)
- BcryptJS
- dotenv

## ▶️ Como rodar localmente

1. Clone o repositório:

```bash
1 - clone o projeto
git clone https://github.com/JoaoAndreassa/furia-backend.git
cd furia-backend

2- instale a dependências 
npm install

3- Configure o .env com sua conexão do Supabase e chave JWT:

DATABASE_URL=postgresql://...
JWT_SECRET=sua_chave_secreta

4- Rode as migrations

npx prisma migrate dev

5- Inicie o servidor

npm run dev

```
</details> 
<details> <summary>🇺🇸 English Version</summary>
REST API for authentication and user management in the FURIA Fan App.

Built with Node.js, Express, and Prisma ORM connected to a Supabase database.

## ✨ Features
- User registration
- Login with JWT
- Authentication middleware
- Profile editing
- Avatar image via URL
- Supabase integration using Prisma

## 🚀 Technologies
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- Supabase (PostgreSQL)
- JWT (jsonwebtoken)
- BcryptJS
- dotenv

## ▶️ How to run locally

```bash
1 - Clone the repository:

git clone https://github.com/JoaoAndreassa/furia-backend.git
cd furia-backend

2- Install dependencies: 
npm install

3- Create a .env file with your Supabase connection and JWT secret:

DATABASE_URL=postgresql://...
JWT_SECRET=sua_chave_secreta

4- Run the migrations (if needed):

npx prisma migrate dev

5- Start the server:

npm run dev

```

</details>