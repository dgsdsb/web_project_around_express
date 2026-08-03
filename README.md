# Projeto 15 - EUA Afora (Back-end)

## Descrição do Projeto
Este projeto consiste na criação da API back-end inicial para a aplicação "EUA Afora". O servidor foi desenvolvido utilizando Node.js e Express, permitindo o gerenciamento e a disponibilização de dados de usuários e cartões através de rotas RESTful.

O objetivo principal desta etapa é estabelecer a estrutura base de rotas, manipulação de arquivos JSON de forma assíncrona, tratamento rigoroso de erros HTTP e padronização do código-fonte.

## Tecnologias e Técnicas Utilizadas
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express.js**: Framework para criação de rotas e gerenciamento da API HTTP.
- **ESLint (Airbnb Style Guide)**: Ferramenta de análise estática para padronização e garantia da qualidade do código.
- **Módulos nativos (`fs` / `path`)**: Leitura assíncrona de arquivos do sistema de arquivos e manipulação segura de caminhos de diretório.
- **Nodemon**: Utilitário para recarga automática do servidor (*Hot Reload*) durante o desenvolvimento.
- **EditorConfig**: Padronização da formatação do código entre diferentes editores.

## Rotas da API
| Método | Endereço | Descrição |
| :--- | :--- | :--- |
| **GET** | `/users` | Retorna o JSON com a lista completa de usuários |
| **GET** | `/cards` | Retorna o JSON com a lista completa de cartões |
| **GET** | `/users/:id` | Retorna o JSON com os dados do usuário correspondente ao ID informado |

### Tratamento de Erros
- **404**: Retornado quando um ID de usuário não é encontrado ou a requisição é feita para um endereço inexistente.
- **500**: Retornado em caso de falha interna do servidor ou na leitura dos arquivos de dados.

## Como Executar o Projeto

1. Instale as dependências do projeto:
```bash
   npm install
```

2. Inicie o servidor em modo de produção:
```bash
   npm run start
```

3. Inicie o servidor em modo de desenvolvimento (com recarga automática):
```bash
   npm run dev
```

4. Execute a validação do linter (ESLint):
```bash
   npm run lint
```
