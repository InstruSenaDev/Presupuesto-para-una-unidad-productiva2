const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");

// Configuración de CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Configuración de Swagger
const swaggerDocument = yaml.load(fs.readFileSync("./swagger.yaml", "utf-8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configuración de rutas
const userRoutes = require("../backend/src/routes/users.routes");
app.use("/", userRoutes);

// Puerto en el que el servidor escuchará las peticiones
const puerto = 3000;

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
