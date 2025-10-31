-- Crear base de datos y tablas para la aplicación de cine
CREATE DATABASE IF NOT EXISTS cine CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE cine;

CREATE TABLE IF NOT EXISTS peliculas (
  id_pelicula INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  anio INT,
  duracion INT
);

CREATE TABLE IF NOT EXISTS salas (
  id_sala INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  capacidad INT
);

CREATE TABLE IF NOT EXISTS funciones (
  id_funcion INT AUTO_INCREMENT PRIMARY KEY,
  id_pelicula INT,
  id_sala INT,
  fecha_hora DATETIME,
  FOREIGN KEY (id_pelicula) REFERENCES peliculas(id_pelicula) ON DELETE SET NULL,
  FOREIGN KEY (id_sala) REFERENCES salas(id_sala) ON DELETE SET NULL
);

-- Nota: importar este archivo en phpMyAdmin o ejecutar con mysql en XAMPP.
