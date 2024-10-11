const express = require("express");
const session = require("express-session");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");

const app = express();

// Configuración de sesiones
app.use(session({
    secret: 'una-clave-secreta-generica-para-la-app', // Esta es la clave general para las sesiones
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false,httpOnly: true, maxAge: 1000 * 60 * 60 } // Configuración de la cookie de la sesión (1 hora de duración)
}));

// Configuración de CORS
app.use(cors({
  origin: "http://localhost:5173",
    // origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Permite el envío de cookies
}));

// Middleware para parsear JSON
app.use(express.json());

// Configuración de Swagger
const swaggerDocument = yaml.load(fs.readFileSync("./swagger.yaml", "utf-8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configuración de rutas
const userRoutes = require("../Backend/src/routes/users.routes");
app.use("/", userRoutes);

// Puerto en el que el servidor escuchará las peticiones
const puerto = 3000;

app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
