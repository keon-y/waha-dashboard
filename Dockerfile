# Etapa 1: Construção (Build)
FROM node:18-alpine as build
WORKDIR /app
# Copia os arquivos de dependências
COPY package.json package-lock.json* ./
# Instala as dependências
RUN npm install
# Copia o resto do código do projeto
COPY . .
# Faz o build do projeto (Gera os arquivos estáticos)
# Nota: Se estiver usando Create React App, o comando de saída geralmente é 'build'
# Se estiver usando Vite, a pasta de saída é 'dist'
RUN npm run build

# Etapa 2: Servidor Web (Nginx)
FROM nginx:alpine
# Copia os arquivos compilados da Etapa 1 para a pasta pública do Nginx
# Mude '/app/dist' para '/app/build' se não estiver usando Vite
COPY --from=build /app/build /usr/share/nginx/html
# Expõe a porta 80 do container
EXPOSE 80
# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]