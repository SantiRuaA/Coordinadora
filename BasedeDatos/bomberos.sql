CREATE DATABASE bomberos

USE bomberos

CREATE TABLE Incendios (
  idIncendio INT AUTO_INCREMENT PRIMARY KEY,
  fechaIncendio DATE,
  horaIncendio TIME,
  zonaIncendio VARCHAR(255),
  areaIncendio DECIMAL(10, 2),
  causaGeneral VARCHAR(200),
  causaEspecifica VARCHAR(200)
);

CREATE TABLE Reportes (
  idReporte INT AUTO_INCREMENT PRIMARY KEY,
  idIncendio INT,
  nameInformante VARCHAR(255),
  telInformante VARCHAR(20),
  FOREIGN KEY (idIncendio) REFERENCES Incendios(idIncendio)
);

CREATE TABLE Equipos (
  idEquipo INT AUTO_INCREMENT PRIMARY KEY,
  nameEquipo VARCHAR(255),
  telEquipo VARCHAR(20)
);

CREATE TABLE Participaciones (
  idParticipacion INT AUTO_INCREMENT PRIMARY KEY,
  idIncendio INT,
  idEquipo INT,
  FOREIGN KEY (idIncendio) REFERENCES Incendios(idIncendio),
  FOREIGN KEY (idEquipo) REFERENCES Equipos(idEquipo)
);



-- Incendios
INSERT INTO Incendios (fechaIncendio, horaIncendio, zonaIncendio, areaIncendio, causaGeneral, causaEspecifica) VALUES ('2022-08-10', '10:30:00', 'Bello', 100.1, 'trueno', 'el trueno prendió un arbol');
INSERT INTO Incendios (fechaIncendio, horaIncendio, zonaIncendio, areaIncendio, causaGeneral, causaEspecifica) VALUES ('2023-02-19', '11:30:00', 'Manrique', 121.0, 'bandidos', 'echaron gasolina al bosque');
INSERT INTO Incendios (fechaIncendio, horaIncendio, zonaIncendio, areaIncendio, causaGeneral, causaEspecifica) VALUES ('2000-01-09', '12:00:00', 'Popular', 56.0, 'flecha de fuego' , 'hubo una flecha de fuego que cayó en el bosque');
INSERT INTO Incendios (fechaIncendio, horaIncendio, zonaIncendio, areaIncendio, causaGeneral, causaEspecifica) VALUES ('2005-09-01', '02:12:00', 'San Javier', 32.9, 'nada', 'el bosque se prendió solo');
INSERT INTO Incendios (fechaIncendio, horaIncendio, zonaIncendio, areaIncendio, causaGeneral, causaEspecifica) VALUES ('2020-12-30', '04:04:00', 'Sabaneta', 65.7, 'no sabemos' , 'no sabemos que pasó');


UPDATE Incendios SET zonaIncendio = 'Santo Domingo' WHERE idIncendio = 4;
UPDATE Incendios SET horaIncendio = '06:00:00' WHERE causaGeneral = 'no sabemos';

DELETE FROM Incendios WHERE idIncendio = 2;




-- Reportes
INSERT INTO Reportes (idIncendio, nameInformante, telInformante) VALUES (3, 'miltrus friedman', '3013784849');
INSERT INTO Reportes (idIncendio, nameInformante, telInformante) VALUES (1, 'chespirito', '3117990362');
INSERT INTO Reportes (idIncendio, nameInformante, telInformante) VALUES (5, 'carl sagan', '3206121312');
INSERT INTO Reportes (idIncendio, nameInformante, telInformante) VALUES (3, 'walter white', '3158373649');
INSERT INTO Reportes (idIncendio, nameInformante, telInformante) VALUES (1, 'joseph cooper', '3003654848');

UPDATE Reportes SET nameInformante = 'yeison' WHERE nameInformante = 'chespirito';
UPDATE Reportes SET telInformante = '3213459087' WHERE idIncendio = 3;

DELETE FROM Reportes WHERE idReporte = 4;




-- Equipos
INSERT INTO Equipos (nameEquipo, telEquipo) VALUES ('el equipo de la muerte', '12872387');
INSERT INTO Equipos (nameEquipo, telEquipo) VALUES ('los reyes', '984938');
INSERT INTO Equipos (nameEquipo, telEquipo) VALUES ('seti', '12981982');
INSERT INTO Equipos (nameEquipo, telEquipo) VALUES ('ante las llamas', '102912');
INSERT INTO Equipos (nameEquipo, telEquipo) VALUES ('encuentra humo', '23219337');

UPDATE Equipos SET nameEquipo = 'ante el fuego no me quemo' WHERE idEquipo = 3;
UPDATE Equipos SET telEquipo = '31349087' WHERE nameEquipo = 'los reyes';

DELETE FROM Equipos WHERE telEquipo = '23219337';




-- Participaciones
INSERT INTO Participaciones (idIncendio, idEquipo) VALUES (1, 3);
INSERT INTO Participaciones (idIncendio, idEquipo) VALUES (3, 4);
INSERT INTO Participaciones (idIncendio, idEquipo) VALUES (4, 4);
INSERT INTO Participaciones (idIncendio, idEquipo) VALUES (5, 2);
INSERT INTO Participaciones (idIncendio, idEquipo) VALUES (1, 1);

UPDATE Participaciones SET idIncendio = 5 WHERE idEquipo = 3;
UPDATE Participaciones SET idEquipo = 4 WHERE idIncendio = 1;

DELETE FROM Participaciones WHERE telEquipo = '23219337';