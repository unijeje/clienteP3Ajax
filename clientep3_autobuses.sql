-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-02-2018 a las 18:44:27
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
(1111, 5, '2018-02-28', 5, 'comentario', 'origen', 'destino', 5, '12345678A', '1234TTT', '49032440M', 'Camas', 1);

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
('1234TTT', 35, 'LOOOL', 5, 1, 0);

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
('12345678A', 'nombreMODIFICADO', 'ape', 975757575, 'ccror2@gmail.com', 'Femenino', 1),
('12345678H', 'PEPE', 'PEPE', 955555555, 'correo@gmail.es', 'Masculino', 1),
('12345678k', 'nombre', 'ape', 955555555, 'corrr@gmail.co', 'Masculino', 1),
('12345678Q', 'nombres', 'apes', 955555555, 'corrr@gmail.com', 'Masculino', 1),
('98765432F', 'Test', 'apeTest', 950000000, 'corr@gmail.es', 'Femenino', 1);

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
('49032440M', 'Alejandro', 'Nunez', 'Femenino', 954120369, 'ale@gmail.com', 'C/ Adriano', 1),
('59896936E', 'Aitor', 'Menta', 'Masculino', 658969874, 'rayosycentellas@gmail.com', 'C/ Antonio Banderas', 0);

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
  `id` int(9) NOT NULL,
  `matricula_autobus` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `importe` float NOT NULL,
  `fecha` date NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `matricula_autobus` (`matricula_autobus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=1 ;

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
