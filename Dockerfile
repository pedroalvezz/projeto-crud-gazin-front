# Imagem base do Node.js
FROM node:alpine

# Criar diretório de trabalho
WORKDIR /usr/app

# Copiar arquivos e instalar dependências
COPY package*.json ./
# Instalar pacotes
RUN npm install

# Copiar todo o projeto
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

