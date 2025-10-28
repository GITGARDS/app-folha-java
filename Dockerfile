# Estágio de build (se necessário, para compilar o código)
# FROM maven:3.8.7-openjdk-17 AS build
# WORKDIR /app
# COPY . .
# RUN mvn clean package

# Estágio de execução
FROM openjdk:21-jdk-slim 
# Imagem base leve com JDK
ARG JAR_FILE=target/appFolha-0.0.1-SNAPSHOT.jar 
# Nome do seu JAR após a compilação
WORKDIR /app
COPY ${JAR_FILE} app.jar 
# Copia o JAR para o contêiner
EXPOSE 8080 
# Porta que sua aplicação expõe (ex: Spring Boot)
ENTRYPOINT ["java", "-jar", "app.jar"] 
# Comando para iniciar a aplicação