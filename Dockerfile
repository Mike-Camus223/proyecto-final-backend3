# ==============================================================================
# Dockerfile Optimizado para AdopMe API - Backend III
# Base Image: Node 20 Alpine (ultra ligera y orientada a producción)
# ==============================================================================

FROM node:20-alpine AS base

# Definición del directorio de trabajo
WORKDIR /app

# Copia previa de manifiestos de dependencias para maximizar el uso de la caché de Docker
COPY package*.json ./

# Instalación limpia de únicamente las dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copia del código fuente del proyecto
COPY . .

# Cambio a usuario no privilegiado (node) por mejores prácticas de seguridad
USER node

# Exposición del puerto de escucha de la aplicación
EXPOSE 8080

# Definición de variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=8080

# Comando de inicio del contenedor
CMD ["node", "src/app.js"]
