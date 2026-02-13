# Etapa 1: Construcción (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código y generar el build
COPY . .
RUN npm run build

# Etapa 2: Servidor de Producción (Runtime)
FROM nginx:stable-alpine

# Copiar los archivos estáticos desde la etapa de build al directorio de Nginx
# NOTA: Si usas Vite, la carpeta suele ser /app/dist. Si usas CRA, es /app/build.
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]