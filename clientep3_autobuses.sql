-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-02-2018 a las 19:53:15
-- Versión del servidor: 5.5.27
-- Versión de PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `clientep3_autobuses`
--
DROP DATABASE IF EXISTS clientep3_autobuses;
CREATE DATABASE clientep3_autobuses;
USE clientep3_autobuses;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquiler`
--

CREATE TABLE IF NOT EXISTS `alquiler` (
  `id` int(9) NOT NULL,
  `horas` int(3) NOT NULL,
  `fecha` date NOT NULL,
  `numpersonas` int(3) NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `origen` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `destino` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `kms` int(4) NOT NULL,
  `cliente` varchar(9) COLLATE utf8_spanish_ci NOT NULL,
  `matricula_autobus` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `dni_conductor` varchar(9) COLLATE utf8_spanish_ci NOT NULL,
  `localidad` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cliente` (`cliente`),
  KEY `fk_conductor` (`dni_conductor`),
  KEY `fk_autobus` (`matricula_autobus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alquiler`
--

INSERT INTO `alquiler` (`id`, `horas`, `fecha`, `numpersonas`, `descripcion`, `origen`, `destino`, `kms`, `cliente`, `matricula_autobus`, `dni_conductor`, `localidad`, `estado`) VALUES
(123, 8, '2018-05-10', 110, 'Excursion', 'Colegio', 'Zoo', 30, '98765432Z', '1234BBB', '09876098Z', 'Sevilla', 1),
(759, 20, '2018-02-24', 45, 'VIAJE', 'ESPAÑA', 'FRANCIA', 500, '12345678Z', '3857KSH', '09872543G', 'San Juan de Aznalfarache', 1),
(955, 4, '2018-02-06', 45, 'Excursion', 'Colegio', 'Teatro', 10, '98765498F', '4321ZAF', '09876589K', 'Dos Hermanas', 1),
(973, 6, '2018-02-21', 25, 'Viaje', 'Sevilla', 'Cadiz', 80, '12345678Z', '3297PQE', '09876098Z', 'Sevilla', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autobus`
--

CREATE TABLE IF NOT EXISTS `autobus` (
  `matricula` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `asientos` int(3) NOT NULL,
  `modelo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `consumo` int(5) NOT NULL,
  `itv` tinyint(1) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `autobus`
--

INSERT INTO `autobus` (`matricula`, `asientos`, `modelo`, `consumo`, `itv`, `estado`) VALUES
('1234BBB', 30, 'Mercedes-Benz', 11, 1, 1),
('1234TTT', 30, 'prueba', 5, 1, 0),
('3297PQE', 40, 'Setra', 13, 0, 1),
('3857KSH', 45, 'Scania', 15, 0, 1),
('4321ZAF', 35, 'Tussam', 11, 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
  `dni` varchar(9) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` int(9) NOT NULL,
  `correo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `sexo` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`dni`, `nombre`, `apellidos`, `telefono`, `correo`, `sexo`, `estado`) VALUES
('12345678A', 'Aabraham', 'Arriola', 688452541, 'Correo001@gmail.com', 'Masculino', 0),
('12345678Z', 'Aada', 'Aldana', 688452555, 'Correo002@gmail.com', 'Femenino', 1),
('98765432A', 'Javier', 'Bermudez', 681245245, 'Correo031@gmail.com', 'Masculino', 1),
('98765432Z', 'Miguel', 'Benitez', 681245097, 'Correo101@gmail.com', 'Masculino', 1),
('98765498F', 'Carlos', 'Costa', 681240097, 'Correo501@gmail.com', 'Masculino', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductor`
--

CREATE TABLE IF NOT EXISTS `conductor` (
  `dni` varchar(9) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `sexo` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` int(9) NOT NULL,
  `email` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `conductor`
--

INSERT INTO `conductor` (`dni`, `nombre`, `apellidos`, `sexo`, `telefono`, `email`, `direccion`, `estado`) VALUES
('09872543G', 'Pepe', 'De leon', 'Masculino', 682552541, 'Correo052@gmail.com', 'C/php', 1),
('09876098Z', 'Maria', 'Espinosa', 'Femenino', 688092541, 'Correo001@gmail.com', 'C/java', 1),
('09876509P', 'Pablo', 'Etxebarria', 'Masculino', 688453141, 'Correo071@gmail.com', 'C/python', 0),
('09876543F', 'Julio', 'Cuellar', 'Masculino', 680752541, 'Correo749@gmail.com', 'C/javascript', 1),
('09876589K', 'Cristina', 'Flores', 'Femenino', 688452001, 'Correo571@gmail.com', 'C/C  ', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidad`
--

CREATE TABLE IF NOT EXISTS `localidad` (
  `nombre` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `localidad`
--

INSERT INTO `localidad` (`nombre`) VALUES
('Dos Hermanas'),
('Alcalá de Guadaira'),
('Utrera'),
('Los Palacios'),
('Camas'),
('San Juan de Aznalfarache'),
('Sevilla');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento`
--

CREATE TABLE IF NOT EXISTS `mantenimiento` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `matricula_autobus` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `importe` float NOT NULL,
  `fecha` date NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `matricula_autobus` (`matricula_autobus`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `mantenimiento`
--

INSERT INTO `mantenimiento` (`id`, `matricula_autobus`, `descripcion`, `importe`, `fecha`, `estado`) VALUES
(1, '1234BBB', 'Pintar', 105, '2018-02-14', 1),
(2, '4321ZAF', 'Fallo de motor', 500, '2018-01-16', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacaciones`
--

CREATE TABLE IF NOT EXISTS `vacaciones` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `dni_conductor` varchar(9) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_ini` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `dni_conductor` (`dni_conductor`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `vacaciones`
--

INSERT INTO `vacaciones` (`id`, `dni_conductor`, `fecha_ini`, `fecha_fin`, `descripcion`, `estado`) VALUES
(1, '09872543G', '2018-02-28', '2018-03-31', 'VIAJE', 0),
(2, '09876098Z', '2018-02-09', '2018-02-22', 'Enfermedad', 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquiler`
--
ALTER TABLE `alquiler`
  ADD CONSTRAINT `alquiler_ibfk_1` FOREIGN KEY (`cliente`) REFERENCES `cliente` (`dni`),
  ADD CONSTRAINT `fk_autobus` FOREIGN KEY (`matricula_autobus`) REFERENCES `autobus` (`matricula`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_conductor` FOREIGN KEY (`dni_conductor`) REFERENCES `conductor` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  ADD CONSTRAINT `mantenimiento_ibfk_1` FOREIGN KEY (`matricula_autobus`) REFERENCES `autobus` (`matricula`);

--
-- Filtros para la tabla `vacaciones`
--
ALTER TABLE `vacaciones`
  ADD CONSTRAINT `vacaciones_ibfk_1` FOREIGN KEY (`dni_conductor`) REFERENCES `conductor` (`dni`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
