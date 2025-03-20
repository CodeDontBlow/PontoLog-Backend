SHOW databases;
CREATE database LogisTrade;
DROP DATABASE LogisTrade;
USE LogisTrade;

DROP TABLE importacao;
DROP TABLE exportacao;

CREATE TABLE exportacao(
	CO_ANO varchar(4),
    CO_MES varchar(4),
    KG_LIQUIDO varchar(20),
    VL_FOB varchar(50),
    NO_PAIS varchar(50),
    NO_VIA varchar(80),
    SG_UF varchar(5),
    NO_UF varchar(20),
    NO_REGIAO varchar(30),
    NO_URF varchar(100),
    CO_FAT_AGREG varchar(30),
    NO_SH6_POR varchar(1000),
    NO_SH4_POR varchar(1000),
    NO_SH2_POR varchar(1000)
);

CREATE TABLE importacao(
	CO_ANO varchar(4),
    CO_MES varchar(4),
    KG_LIQUIDO varchar(20),
    VL_FOB varchar(50),
    VL_FRETE varchar(50),
    VL_SEGURO varchar(50),
    NO_PAIS varchar(50),
    NO_VIA varchar(80),
    SG_UF varchar(5),
    NO_UF varchar(20),
    NO_REGIAO varchar(30),
    NO_URF varchar(100),
    CO_FAT_AGREG varchar(30),
    NO_SH6_POR varchar(1000),
    NO_SH4_POR varchar(1000),
    NO_SH2_POR varchar(1000)
);

SET GLOBAL local_infile = 1;
SET GLOBAL net_buffer_length = 33554432;


SHOW VARIABLES LIKE 'local_infile';
SHOW VARIABLES LIKE 'interactive_timeout';
SHOW VARIABLES LIKE 'net_read_timeout';
SHOW VARIABLES LIKE 'net_write_timeout';
SHOW VARIABLES LIKE 'wait_timeout';
SHOW VARIABLES LIKE 'max_allowed_packet';
SHOW VARIABLES LIKE 'innodb_buffer_pool_size';

/*Serve pra implementar o arquivo CSV nas tabelas*/
LOAD DATA LOCAL INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\exp_tratado_2025-2014.csv'
INTO TABLE exportacao
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(CO_ANO,CO_MES,KG_LIQUIDO,VL_FOB,NO_PAIS,NO_VIA,SG_UF,NO_UF,NO_REGIAO,NO_URF,CO_FAT_AGREG,NO_SH6_POR,NO_SH4_POR,NO_SH2_POR);


LOAD DATA LOCAL INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\imp_tratado_2025-2014.csv'
INTO TABLE importacao
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(CO_ANO,CO_MES,KG_LIQUIDO,VL_FOB,VL_FRETE,VL_SEGURO,NO_PAIS,NO_VIA,SG_UF,NO_UF,NO_REGIAO,NO_URF,CO_FAT_AGREG,NO_SH6_POR,NO_SH4_POR,NO_SH2_POR);




SELECT COUNT(CO_ANO) AS NumerosDeAnos FROM exportacao;
SELECT COUNT(CO_ANO) AS NumerosDeAnos FROM importacao;
SELECT * FROM exportacao;
SELECT * FROM importacao;



