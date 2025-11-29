# Biblioteca de Animes

## Descrição
A **Biblioteca de Animes** é uma aplicação web desenvolvida como parte da disciplina *Frameworks Modernos para Desenvolvimento de Sistemas*. O objetivo do sistema é gerenciar um catálogo de animes, permitindo que os usuários realizem operações de CRUD (criar, listar, atualizar e excluir) em animes, além de autenticação via conta Google.

## Funcionalidades
- **Autenticação com Google**: Login seguro utilizando Firebase Authentication.
- **Gerenciamento de Sessão**: Estado de autenticação mantido com Pinia.
- **CRUD de Animes**: Operações de criação, leitura, atualização e exclusão de animes.
- **Rotas Protegidas**: Apenas usuários autenticados podem acessar as rotas internas.
- **Interface Responsiva**: Desenvolvida com Vuetify, garantindo uma experiência de usuário fluida em diferentes dispositivos.
- **Modo Claro/Escuro**: Alternância entre temas claro e escuro.

## Tecnologias Utilizadas
### Frontend
- **Vue.js 3**
- **Vuetify**
- **Vue Router**
- **Pinia**

### Backend
- **Express.js**
- **Supabase (PostgreSQL)**

## Estrutura do Projeto
```
├── src/
│   ├── assets/         # Arquivos estáticos (CSS, imagens)
│   ├── components/     # Componentes Vue reutilizáveis
│   ├── plugins/        # Configuração do Firebase
│   ├── router/         # Configuração de rotas
│   ├── services/       # Comunicação com a API
│   ├── stores/         # Gerenciamento de estado com Pinia
│   ├── views/          # Páginas principais da aplicação
│   └── App.vue         # Componente raiz
├── server/             # Backend em Express.js
├── public/             # Arquivos públicos
├── README.md           # Documentação do projeto
```

## Instalação e Execução
### Pré-requisitos
- Node.js instalado
- Conta no Supabase configurada

### Passos para executar o projeto
#### Frontend
1. Clone o repositório:
   ```bash
   git clone https://github.com/Salatielbg/biblioteca-animes.git
   ```
2. Navegue até o diretório do frontend:
   ```bash
   cd biblioteca-animes
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

#### Backend
1. Navegue até o diretório do backend:
   ```bash
   cd server
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```
4. Inicie o servidor:
   ```bash
   node index.js
   ```

## Integrantes do Grupo
- **Salatiel Bonfim Gomes**

## Observações
- Certifique-se de que o Supabase está configurado corretamente para persistência de dados.
- Para dúvidas ou problemas, entre em contato com o desenvolvedor.

---
**© 2025 Biblioteca de Animes**
