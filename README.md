# Aplicação React com Docker

Este projeto é uma aplicação React configurada para rodar dentro de um contêiner Docker. O Docker é utilizado para criar um ambiente isolado e consistente para rodar a aplicação.

## Requisitos

- **Docker**: Certifique-se de que o Docker esteja instalado na sua máquina. Se não tiver, você pode instalar [aqui](https://www.docker.com/get-started).
- **Docker Compose**: O Docker Compose é usado para orquestrar os contêineres e serviços. Normalmente, o Docker Compose já vem com a instalação do Docker.

## Como Rodar a Aplicação

### 1. Clone o Repositório

Primeiro, clone o repositório para sua máquina local:

```bash
git clone <URL do repositório>
cd <diretório do projeto>

2. Construir os Contêineres
Com o Docker e Docker Compose instalados, rode o comando abaixo para construir a imagem e iniciar os contêineres:

bash
docker-compose up --build


3. Acessar a Aplicação
Após o comando acima, a aplicação React será exposta na porta 3000. Você pode acessar a aplicação no seu navegador em:


http://localhost:3000