# Testamenteei

> Uma aplicação interativa e dinâmica desenvolvida em React, TypeScript e Vite

---

## 📋 Descrição

Testamenteei é uma aplicação frontend moderna que oferece uma experiência interativa ao usuário através de múltiplas etapas de navegação. Com uma arquitetura bem estruturada em React, o projeto é construído com foco em performance, qualidade de código e escalabilidade.

---

## 🚀 Stack Tecnológico

- **React** 19.2.0 - Biblioteca JavaScript para construção de interfaces
- **TypeScript** 5.9.3 - Tipagem estática para JavaScript
- **Vite** 7.2.4 - Build tool moderno com HMR (Hot Module Replacement)
- **React Router DOM** 7.9.6 - Roteamento de componentes
- **Sass** 1.93.3 - Pré-processador CSS
- **Lucide React** 0.554.0 - Conjunto de ícones
- **ESLint** 9.39.1 - Linter para qualidade de código
- **Vercel Analytics** 1.5.0 - Analytics em tempo real

---

## 📦 Requisitos

Antes de começar, certifique-se de ter os seguintes requisitos instalados:

- **Node.js** (v16 ou superior)
- **npm** ou **yarn**

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd testamenteei-frontend
```

### 2. Instale as dependências

Com npm:
```bash
npm install
```

Ou com yarn:
```bash
yarn install
```

---

## 🎯 Como Usar

### Desenvolvimento

Para iniciar o servidor de desenvolvimento com hot reload:

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5174`

### Build para Produção

Para criar uma build otimizada para produção:

```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/`

### Preview de Produção

Para visualizar a build de produção localmente:

```bash
npm run preview
```

### Linting

Para verificar a qualidade do código:

```bash
npm run lint
```

---

## 📁 Estrutura do Projeto

```
testamenteei-frontend/
├── src/
│   ├── pages/
│   │   ├── Inicio/          # Página inicial da aplicação
│   │   ├── Jogatina/        # Página de interação/jogo
│   │   └── Final/           # Página final/resultado
│   ├── assets/
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   └── Marca/       # Componente de marca/logo
│   │   ├── styles/          # Estilos globais
│   │   └── uteis/           # Utilitários e helpers
│   ├── config/              # Configurações da aplicação
│   │   └── api.ts           # Configuração da API
│   ├── App.tsx              # Componente raiz
│   └── main.tsx             # Ponto de entrada
├── public/                  # Arquivos estáticos
├── vite.config.ts          # Configuração do Vite
├── tsconfig.json           # Configuração do TypeScript
├── eslint.config.js        # Configuração do ESLint
└── package.json            # Dependências e scripts
```

---

## 🎮 Fluxo da Aplicação

A aplicação segue um fluxo de três etapas principais:

1. **Inicio** (`/inicio`) - Página de boas-vindas e início
2. **Jogatina** (`/jogatina`) - Página de interação/jogo principal
3. **Final** (`/final`) - Página de resultado/encerramento

---

## 🛠️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Cria uma build otimizada para produção |
| `npm run preview` | Visualiza a build de produção |
| `npm run lint` | Verifica a qualidade do código com ESLint |

---

## 🌐 Deploy

O projeto está configurado para deploy automático na **Vercel**, como indicado pela presença do arquivo `vercel.json`.

Para fazer deploy:

1. Conecte seu repositório GitHub à conta Vercel
2. A aplicação será automaticamente deployada em cada push para a branch principal

---

## 📄 Configurações Importantes

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (se necessário):

```bash
VITE_API_URL=sua_url_de_api
# Adicione outras variáveis conforme necessário
```

### TypeScript

O projeto utiliza múltiplos arquivos de configuração TypeScript:

- `tsconfig.json` - Configuração base
- `tsconfig.app.json` - Configuração para aplicação
- `tsconfig.node.json` - Configuração para ferramentas de build

---

## 🔒 Qualidade de Código

O projeto implementa:

- **ESLint** para linting de código
- **TypeScript** para tipagem estática
- **Prettier** (opcional) para formatação

Execute `npm run lint` para verificar a qualidade do código.

---

## 📝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📧 Contato & Suporte

Para dúvidas, sugestões ou reportar bugs, abra uma issue no repositório.

---

## 📜 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ em React + TypeScript**
