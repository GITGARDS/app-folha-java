# Estágio 1: Build do Angular
FROM node:22-alpine as build
ARG DIREF=./frontend
WORKDIR /app
COPY ${DIREF}/package.json ${DIREF}/package-lock.json ./
RUN npm install
COPY ./frontend .
RUN npm run build  -- --output-path=./dist --configuration=production

# Estágio 2: Servindo com Nginx
FROM nginx:alpine
COPY --from=build /app/dist/* /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
