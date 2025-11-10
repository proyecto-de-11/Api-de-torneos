# Node + Express Service Starter

This is a simple API sample in Node.js with express.js based on [Google Cloud Run Quickstart](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service).

## Getting Started

Server should run automatically when starting a workspace. To run manually, run:
```sh
npm run dev
```

CREATE DATABASE BdTorneos;
use BdTorneos;
-- Tipos de deporte disponibles
CREATE TABLE tipos_deporte (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE, -- 'Fútbol', 'Basketball', 'Volleyball', etc.
    descripcion TEXT,
    icono VARCHAR(500),
    esta_activo BOOLEAN DEFAULT TRUE
);

-- Partidos
CREATE TABLE partidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    creado_por INT  NULL,
    equipo_local_id INT  NULL,
    equipo_visitante_id INT,
    reserva_id INT,
    torneo_id INT, -- NULL si es partido amistoso
    tipo_partido ENUM('amistoso', 'torneo', 'copa') DEFAULT 'amistoso',
    fecha_partido DATETIME NOT NULL,
    hora_inicio TIME,
    duracion_minutos INT DEFAULT 90,
    resultado_local INT,
    resultado_visitante INT,
    estado ENUM('programado', 'en_curso', 'finalizado', 'cancelado', 'pospuesto') DEFAULT 'programado',
    observaciones TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_fecha_partido (fecha_partido, estado)
);

-- Invitaciones a partidos
CREATE TABLE invitaciones_partido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    partido_id INT NULL,
    equipo_invitado_id INT  NULL,
    usuario_invito_id INT  NULL,
    mensaje TEXT,
    estado ENUM('pendiente', 'aceptada', 'rechazada') DEFAULT 'pendiente',
    fecha_respuesta TIMESTAMP NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Torneos
CREATE TABLE torneos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    creado_por INT  NULL,
    nombre VARCHAR(255)  NULL,
    descripcion TEXT,
    tipo_deporte_id INT  NULL,
    categoria ENUM('infantil', 'juvenil', 'adulto', 'senior', 'mixto', 'libre'),
    nivel ENUM('principiante', 'intermedio', 'avanzado', 'profesional'),
    formato ENUM('eliminacion_directa', 'round_robin', 'grupos_eliminacion', 'otro'),
    max_equipos INT NOT NULL,
    min_equipos INT DEFAULT 4,
    premio_descripcion TEXT,
    reglas TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    fecha_inscripcion_inicio DATE NOT NULL,
    fecha_inscripcion_fin DATE NOT NULL,
    costo_inscripcion DECIMAL(10, 2) DEFAULT 0,
    ubicacion VARCHAR(255),
    logo VARCHAR(500),
    estado ENUM('por_iniciar', 'inscripciones_abiertas', 'inscripciones_cerradas', 'en_curso', 'finalizado', 'cancelado') DEFAULT 'por_iniciar',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Equipos inscritos en torneos
CREATE TABLE equipos_torneo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    torneo_id INT  NULL,
    equipo_id INT  NULL,
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    esta_confirmado BOOLEAN DEFAULT FALSE,
    grupo VARCHAR(10), -- Para torneos con grupos: 'A', 'B', 'C', etc.
    posicion_grupo INT,
    posicion_general INT,
    UNIQUE KEY unique_equipo_torneo (torneo_id, equipo_id)
);

-- Invitaciones a torneos
CREATE TABLE invitaciones_torneo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    torneo_id INT NOT NULL,
    equipo_id INT  NULL,
    usuario_remitente_id INT  NULL,
    usuario_respondio_id INT,
    mensaje TEXT,
    estado ENUM('pendiente', 'aceptada', 'rechazada') DEFAULT 'pendiente',
    fecha_respuesta TIMESTAMP NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (torneo_id) REFERENCES torneos(id) ON DELETE CASCADE
);

-- Patrocinadores de torneos
CREATE TABLE patrocinadores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    torneo_id INT NOT NULL,
    empresa_id INT  NULL,
    nivel_patrocinio ENUM('oro', 'plata', 'bronce', 'colaborador'),
    monto_aportado DECIMAL(10, 2),
    logo VARCHAR(500),
    enlace_web VARCHAR(500),
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (torneo_id) REFERENCES torneos(id) ON DELETE CASCADE
);

-- Calificaciones de jugadores (usuario a usuario)
CREATE TABLE calificaciones_jugador (
    id INT PRIMARY KEY AUTO_INCREMENT,
    partido_id INT, -- Partido donde jugaron juntos
    evaluador_id INT  NULL, -- Quien califica
    jugador_evaluado_id INT  NULL, -- Quien recibe la calificación
    puntuacion DECIMAL(2, 1) NOT NULL CHECK (puntuacion >= 1 AND puntuacion <= 5),
    posicion_destacada VARCHAR(100), -- 'Portero', 'Defensa', etc.
    habilidades JSON, -- ['buen_portero', 'rapido', 'buen_pase', etc.]
    comentario TEXT,
    es_anonimo BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_calificacion_jugador (partido_id, evaluador_id, jugador_evaluado_id)
);
