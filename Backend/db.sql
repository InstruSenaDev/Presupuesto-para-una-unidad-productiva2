CREATE TABLE IF NOT EXISTS usuarios (
    idUsuarios SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    estado BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS tipoPresupuesto (
    idTipoPresupuesto SERIAL PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL,
    estado BOOLEAN NOT NULL,
    idUsuarios INTEGER,
    FOREIGN KEY (idUsuarios) REFERENCES usuarios (idUsuarios)
);

CREATE TABLE IF NOT EXISTS presupuesto (
    idPresupuesto SERIAL PRIMARY KEY,
    fecha VARCHAR(255) NOT NULL,
    valor VARCHAR(255) NOT NULL,
    estado BOOLEAN NOT NULL,
    idUsuarios INTEGER,
    FOREIGN KEY (idUsuarios) REFERENCES usuarios (idUsuarios)
);

CREATE TABLE IF NOT EXISTS movimientos (
    idMovimientos SERIAL PRIMARY KEY,
    idPresupuesto INTEGER,
    descripcion VARCHAR(255) NOT NULL,
    estado BOOLEAN NOT NULL,
    FOREIGN KEY (idPresupuesto) REFERENCES presupuesto (idPresupuesto)
);
