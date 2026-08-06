# Proyecto final backend III - adopme api

este es el proyecto final para la materia de backend 3. consiste en una api en nodejs y express para la gestion de adopciones de mascotas, usuarios y sesiones. cuenta con documentacion swagger, pruebas funcionales con mocks y una imagen docker optimizada.

## links de la entrega

- repo de github: https://github.com/Mike-Camus223/proyecto-final-backend3
- imagen en dockerhub: https://hub.docker.com/r/mikedev1423/adopme-api

## estructura basica

- src/app.js: entrada principal de la app express y conexion a mongodb.
- src/routes/adoption.router.js: las rutas para ver y crear adopciones.
- src/controllers/: la logica de las peticiones para adopciones, usuarios y mascotas.
- src/services/ y src/repository/: capa de servicios y repositorios.
- src/dao/: acceso a la base de datos con los modelos de mongoose.
- test/adoption.test.js: los tests funcionales hechos con mocha, chai, supertest y sinon.
- Dockerfile: el archivo para armar la imagen ligera del proyecto.

## como ejecutar el proyecto localmente

1. clonar el repo e instalar dependencias:
npm install

2. crear el archivo .env basandote en el .env.example

3. levantar el servidor en modo desarrollo:
npm run dev

la api queda corriendo en http://localhost:8080 y la documentacion de swagger la podes ver en http://localhost:8080/api/docs

## como correr los tests funcionales

para probar las rutas de adopcion con los mocks (sin usar la base de datos real):
npm test

## como construir y correr en docker

1. construir la imagen:
docker build -t mikedev1423/adopme-api:1.0.0 .

2. correr el contenedor:
docker run -d -p 8080:8080 --name adopme-container mikedev1423/adopme-api:1.0.0

3. subir la imagen a dockerhub:
docker push mikedev1423/adopme-api:1.0.0
docker tag mikedev1423/adopme-api:1.0.0 mikedev1423/adopme-api:latest
docker push mikedev1423/adopme-api:latest
