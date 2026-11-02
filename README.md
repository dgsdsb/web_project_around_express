# Projeto 16 - EUA Afora (API RESTful + MongoDB)

## Descrição do Projeto
Este projeto evolui a API back-end da aplicação "EUA Afora", substituindo o armazenamento em arquivos JSON por um banco de dados MongoDB. A API gerencia usuários e cartões através de rotas RESTful, com esquemas e modelos criados com Mongoose, validação de dados e tratamento padronizado de erros HTTP.

## Tecnologias e Técnicas Utilizadas
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express.js**: Framework para criação de rotas e gerenciamento da API HTTP.
- **MongoDB**: Banco de dados NoSQL para persistência de usuários e cartões.
- **Mongoose**: ODM para modelagem de esquemas, validação de dados e consultas ao MongoDB.
- **ESLint (Airbnb Style Guide)**: Ferramenta de análise estática para padronização e garantia da qualidade do código.
- **Nodemon**: Utilitário para recarga automática do servidor (*Hot Reload*) durante o desenvolvimento.
- **EditorConfig**: Padronização da formatação do código entre diferentes editores.

## Estrutura do Projeto
```
controllers/   # Lógica de negócio das rotas (usuários e cartões)
models/        # Esquemas e modelos do Mongoose (usuário e cartão)
routes/        # Definição das rotas Express
utils/         # Constantes auxiliares (códigos de status HTTP)
app.js         # Ponto de entrada da aplicação e conexão com o MongoDB
```

## Rotas da API

### Usuários
| Método | Endereço | Descrição |
| :--- | :--- | :--- |
| **GET** | `/users` | Retorna todos os usuários |
| **GET** | `/users/:userId` | Retorna um usuário pelo `_id` |
| **POST** | `/users` | Cria um novo usuário |
| **PATCH** | `/users/me` | Atualiza o perfil (nome e descrição) do usuário autenticado |
| **PATCH** | `/users/me/avatar` | Atualiza o avatar do usuário autenticado |

### Cartões
| Método | Endereço | Descrição |
| :--- | :--- | :--- |
| **GET** | `/cards` | Retorna todos os cartões |
| **POST** | `/cards` | Cria um novo cartão |
| **DELETE** | `/cards/:cardId` | Remove um cartão pelo `_id` |
| **PUT** | `/cards/:cardId/likes` | Curte um cartão |
| **DELETE** | `/cards/:cardId/likes` | Remove a curtida de um cartão |

### Tratamento de Erros
- **400**: Dados inválidos ao criar/atualizar usuário, cartão, perfil ou avatar.
- **404**: Usuário ou cartão não encontrado, ou endereço inexistente.
- **500**: Erro interno do servidor.

> **Nota:** como a autenticação ainda não foi implementada, o `app.js` utiliza um middleware temporário que associa um `_id` de usuário fixo a cada requisição (`req.user._id`). Essa solução provisória será substituída pela autenticação real no próximo sprint.

## Como Executar o Projeto

1. Instale as dependências do projeto:
```bash
   npm install
```

2. Certifique-se de que o MongoDB esteja em execução localmente (`mongodb://localhost:27017`).

3. Inicie o servidor em modo de produção:
```bash
   npm run start
```

4. Inicie o servidor em modo de desenvolvimento (com recarga automática):
```bash
   npm run dev
```

5. Execute a validação do linter (ESLint):
```bash
   npm run lint
```
