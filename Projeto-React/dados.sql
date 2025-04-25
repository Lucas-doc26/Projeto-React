ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Corinthi@ns10';
FLUSH PRIVILEGES;

DROP DATABASE IF EXISTS crud;
CREATE DATABASE crud;

USE crud;

CREATE TABLE IF NOT EXISTS Pessoa(
    idusuarios INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    idade int NOT NULL, 
    dataNascimento DATE NOT NULL,
    cpf VARCHAR(11) unique NOT NULL,
    email varchar(100) NOT NULL,
    genero ENUM('Masculino', 'Feminino', 'Não binário', 'Outro') NOT NULL 
);


INSERT INTO Pessoa (idusuarios, nome, idade, dataNascimento, cpf, email, genero) 
VALUES 
    (1, 'Lucas', 20, STR_TO_DATE('26/05/2004', '%d/%m/%Y'), '49816664820', 'lucas@pucpr.edu.br', 'Masculino'),
    (2, 'Lorena', 18, STR_TO_DATE('13/06/2006', '%d/%m/%Y'), '41081859836', 'lorena@pucpr.edu.br', 'Feminino'),
    (3, 'Renan', 19, STR_TO_DATE('23/02/2005', '%d/%m/%Y'), '40565235896', 'degar@gmail.com', 'Outro'),
    (4, 'Edegar', 19, STR_TO_DATE('23/02/2001', '%d/%m/%Y'), '40565235856', 'edegar@gmail.com', 'Masculino'),
    (5, 'Gustavo', 19, STR_TO_DATE('23/02/2003', '%d/%m/%Y'), '49816652895', 'Gus@gmail.com', 'Masculino'),
    (6, 'Gabriel', 19, STR_TO_DATE('23/02/2006', '%d/%m/%Y'), '12365235896', 'mine@gmail.com', 'Não binário');

SELECT * FROM Pessoa;