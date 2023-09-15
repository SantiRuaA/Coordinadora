-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-09-2023 a las 23:43:05
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reto4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ahorcados`
--

CREATE TABLE `ahorcados` (
  `id` int(11) NOT NULL,
  `puntaje` int(11) DEFAULT NULL,
  `numIntentos` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `usuarioId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ahorcados`
--

INSERT INTO `ahorcados` (`id`, `puntaje`, `numIntentos`, `fecha`, `usuarioId`) VALUES
(1, 8, 4, '2023-09-14 23:56:34', 1),
(2, 5, 4, '2023-09-14 23:57:05', 2),
(3, 6, 3, '2023-09-15 00:04:56', 2),
(4, 19, 11, '2023-09-15 00:13:46', 2),
(5, -5, 5, '2023-09-15 18:45:32', 123),
(6, -3, 6, '2023-09-15 19:24:40', 45),
(7, 16, 17, '2023-09-15 19:24:40', 45),
(8, 8, 4, '2023-09-15 19:59:53', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'Deportes'),
(2, 'Comida'),
(3, 'Videojuegos'),
(4, 'TV');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `palabras`
--

CREATE TABLE `palabras` (
  `id` int(11) NOT NULL,
  `palabra` varchar(255) DEFAULT NULL,
  `categoriaId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `palabras`
--

INSERT INTO `palabras` (`id`, `palabra`, `categoriaId`) VALUES
(3, 'Pasion de gavilanes', 4),
(4, 'Tetris', 3),
(5, 'Futbol', 1),
(6, 'Pasta', 2),
(7, 'Mulan', 4),
(8, 'pinga', 4),
(9, 'PINGA', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ppts`
--

CREATE TABLE `ppts` (
  `id` int(11) NOT NULL,
  `puntaje` int(11) DEFAULT NULL,
  `numIntentos` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `usuarioId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ppts`
--

INSERT INTO `ppts` (`id`, `puntaje`, `numIntentos`, `fecha`, `usuarioId`) VALUES
(1, -1, 5, '2023-09-14 21:28:00', 1),
(2, 1, 3, '2023-09-15 00:12:07', 2),
(3, 3, 4, '2023-09-15 18:19:03', 123),
(4, 1, 6, '2023-09-15 19:23:39', 45),
(5, -4, 11, '2023-09-15 19:59:27', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `contrasena`) VALUES
(1, 'Pedro', '12345'),
(2, 'Santiago', '123'),
(3, 'Juan', '12345'),
(45, 'coordinadora', '123'),
(123, 'Silvia', '123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ahorcados`
--
ALTER TABLE `ahorcados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `palabras`
--
ALTER TABLE `palabras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoriaId` (`categoriaId`);

--
-- Indices de la tabla `ppts`
--
ALTER TABLE `ppts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ahorcados`
--
ALTER TABLE `ahorcados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `palabras`
--
ALTER TABLE `palabras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `ppts`
--
ALTER TABLE `ppts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ahorcados`
--
ALTER TABLE `ahorcados`
  ADD CONSTRAINT `ahorcados_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `palabras`
--
ALTER TABLE `palabras`
  ADD CONSTRAINT `palabras_ibfk_1` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`id`);

--
-- Filtros para la tabla `ppts`
--
ALTER TABLE `ppts`
  ADD CONSTRAINT `ppts_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
