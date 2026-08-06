# 🐾 AdopMe API - Backend III (Proyecto Final)

![Node.js](https://img.shields.io/badge/Node.js-v20.x-green.svg)
![Express](https://img.shields.io/badge/Express-v4.18.2-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)
![Mocha/Chai](https://img.shields.io/badge/Testing-Mocha%20%7C%20Chai%20%7C%20Supertest%20%7C%20Sinon-yellow.svg)

Bienvenido al repositorio del **Proyecto Final de Programación Backend III**. Este proyecto implementa una API RESTful orientada a la gestión de adopciones de mascotas, administración de usuarios y sesiones, documentada con Swagger/OpenAPI, testeada de forma funcional y aislada con mocks, y dockerizada bajo las mejores prácticas de la industria.

---

## 📌 Enlaces Públicos Requeridos

- **URL del Repositorio en GitHub:** [https://github.com/TU_USUARIO/proyecto-final-backend3](https://github.com/TU_USUARIO/proyecto-final-backend3) *(Reemplazar TU_USUARIO por tu nombre de usuario de GitHub)*
- **URL Pública de la Imagen en DockerHub:** [https://hub.docker.com/r/TU_USUARIO/adopme-api](https://hub.docker.com/r/TU_USUARIO/adopme-api) *(Reemplazar TU_USUARIO por tu nombre de usuario de DockerHub)*

---

## 🚀 Arquitectura del Proyecto

El proyecto está construido siguiendo la arquitectura en capas (Layered Architecture):
```
proyecto-final-backend3/
├── src/
│   ├── app.js                   # Servidor Express, Swagger, Middlewares y Conexión DB
│   ├── controllers/             # Controladores HTTP por módulo
│   │   ├── adoptions.controller.js
│   │   ├── pets.controller.js
│   │   ├── sessions.controller.js
│   │   └── users.controller.js
│   ├── dao/                     # Data Access Objects & Modelos Mongoose
│   │   ├── Adoption.js
│   │   ├── Pets.dao.js
│   │   ├── Users.dao.js
│   │   └── models/              # Schemas Mongoose (User, Pet, Adoption)
│   ├── dto/                     # Data Transfer Objects
│   ├── repository/              # Capa de Abstracción de Datos (Repository Pattern)
│   ├── routes/                  # Definición de Routers Express
│   │   ├── adoption.router.js
│   │   ├── pets.router.js
│   │   ├── sessions.router.js
│   │   └── users.router.js
│   ├── services/                # Instanciación e Inyección de Servicios
│   ├── utils/                   # Helpers de Hash (bcryptjs) y Uploader (Multer)
│   └── docs/                    # Documentación OpenAPI / Swagger (.yaml)
├── test/
│   └── adoption.test.js         # Tests Funcionales aislados con Stubs/Mocks
├── Dockerfile                   # Dockerfile optimizado (Multi-stage / Node Alpine)
├── .dockerignore                # Archivos excluidos de la imagen Docker
├── package.json                 # Manifiesto de dependencias y scripts
├── .env.example                 # Plantilla de variables de entorno
└── ENTREGABLE_GOOGLE_DOCS.txt   # Documento preparado para copiar a Google Docs
```

---

## ⚙️ Requisitos Previos

- **Node.js**: v18.x o superior
- **npm**: v9.x o superior
- **Docker Desktop** (opcional para ejecución en contenedor)
- **MongoDB** (opcional para ejecución local en desarrollo)

---

## 🛠️ Instalación y Configuración Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/TU_USUARIO/proyecto-final-backend3.git
   cd proyecto-final-backend3
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copia `.env.example` como `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Iniciar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   *La API estará escuchando en `http://localhost:8080` y Swagger UI en `http://localhost:8080/api/docs`.*

---

## 🧪 Ejecución de Tests Funcionales

Los tests funcionales del router `adoption.router.js` han sido diseñados utilizando **Mocha**, **Chai**, **Supertest** y **Sinon**. Gracias a la técnica de aislación por *Stubs/Mocks*, los tests se ejecutan de forma 100% autónoma sin requerir una conexión activa a MongoDB.

Para ejecutar los tests:
```bash
npm test
```

### Evidencia de Ejecución de Tests:
```
  Suite de Tests Funcionales - Router Adoptions (/api/adoptions)
    GET /api/adoptions
      ✔ Debería retornar un status 200 y la lista completa de adopciones (Caso Exitoso)
      ✔ Debería retornar status 200 y un array vacío cuando no existen adopciones registradas
      ✔ Debería manejar errores del servidor retornando status 500
    GET /api/adoptions/:aid
      ✔ Debería retornar status 200 y el objeto de adopción al enviar un ID válido existente
      ✔ Debería retornar status 404 con error "Adoption not found" si el ID de adopción no existe
      ✔ Debería retornar status 500 ante un error interno en la búsqueda por ID
    POST /api/adoptions/:uid/:pid
      ✔ Debería realizar la adopción con éxito (status 200) cuando el usuario y la mascota existen y la mascota no está adoptada
      ✔ Debería retornar status 404 con "user Not found" si el usuario no existe
      ✔ Debería retornar status 404 con "Pet not found" si la mascota no existe
      ✔ Debería retornar status 400 con "Pet is already adopted" si la mascota ya fue adoptada
      ✔ Debería retornar status 500 ante un fallo durante el proceso de actualización

  11 passing (68ms)
```

---

## 🐳 Docker: Construcción y Ejecución

### 1. Construir la imagen localmente
```bash
docker build -t adopme-api:1.0.0 .
```

### 2. Ejecutar el contenedor
```bash
docker run -d -p 8080:8080 --name adopme-container -e NODE_ENV=production adopme-api:1.0.0
```

### 3. Verificar la ejecución del contenedor
```bash
docker logs adopme-container
```

---

## ☁️ Publicación en DockerHub

1. **Iniciar sesión en DockerHub:**
   ```bash
   docker login
   ```

2. **Etiquetar la imagen con tu usuario de DockerHub:**
   ```bash
   docker tag adopme-api:1.0.0 TU_USUARIO/adopme-api:1.0.0
   docker tag adopme-api:1.0.0 TU_USUARIO/adopme-api:latest
   ```

3. **Subir la imagen al repositorio público:**
   ```bash
   docker push TU_USUARIO/adopme-api:1.0.0
   docker push TU_USUARIO/adopme-api:latest
   ```

---

## 🔒 Escaneo de Seguridad Básica

Se verificaron las capas de la imagen `node:20-alpine` contra vulnerabilidades conocidas utilizando escaneo básico de seguridad de contenedores (`docker scout` / `trivy`):
- Base Image: `node:20-alpine` (0 vulnerabilidades críticas).
- Usuario de ejecución: `node` (no-root).
- Minimización de capas y exclusión de archivos innecesarios vía `.dockerignore`.

---

## 📄 Licencia

ISC - Proyecto Final Backend III.
# proyecto-final-backend3
# proyecto-final-backend3
