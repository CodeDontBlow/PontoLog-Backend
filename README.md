# PontoLog Backend

Este é o projeto backend do PontoLog, um site logístico que fornecerá dados de desempenho do comércio exterior brasileiro, reunindo informações de exportação e importação dos anos de 2014 a 2024, fornecidas pelo Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC).

## Tecnologias Utilizadas

- _Python_: Linguagem usada no backend para tratamento e análise de dados.
- _Google Collab_: Ambiente para executar o tratamento dos dados e compartilhar com o cliente.
- _TypeScript_: Linguagem tipada para tornar o código mais legível e manutenível.
- _PostgreSQL_: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar e consultar grandes volumes de dados.
- _TypeORM_: Integração entre o banco de dados e a aplicação, permitindo manipulação de dados.
- _Redis_: Armazenamento em memória de chave-valor utilizado para cache de dados, aumentando a performance e reduzindo o tempo de resposta das consultas mais frequentes.
- _Axios_: Biblioteca JavaScript para realizar requisições HTTP de forma simples e eficiente, permitindo a comunicação entre o frontend e o backend da aplicação.

## Fonte dos Dados

As informações utilizadas são obtidas da fonte pública do site Comex Stat:

- [Base de Dados Bruta] (https://www.gov.br/mdic/pt-br/assuntos/comercio-exterior/estatisticas/base-de-dados-bruta)

## Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento do backend do PontoLog:

### 1. Pré-requisitos

Certifique-se de ter os seguintes itens instalados em sua máquina:

- [Arquivo `dados.csv`]() – arquivo contendo todos os dados tratados utilizados para alimentar o banco de dados.
- [Node.js (versão 18 ou superior)](https://nodejs.org/)
- [PostgreSQL (versão 13 ou superior)](https://www.postgresql.org/)
- [Redis](https://redis.io/)

### 2. Clone o repositório

```bash
git clone https://github.com/CodeDontBlow/PontoLog-Backend.git
cd pontolog-backend
npm install
```

### 3. Configure o banco de dados

```bash
psql -U postgre
create database pontolog
\q
psql -U postgres -d pontolog -f docs/db.sql
```

### 4. Inície o servidor

```bash
tsc #compile o typescript
node out/app.js #start
```

## Desenvolvido pela equipe Code Don’t Blow!
