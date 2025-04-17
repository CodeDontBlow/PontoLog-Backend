-- <mysql --local-infile=1 -u root -p> 

CREATE DATABASE PONTOLOG;
USE PONTOLOG;

CREATE TABLE EXPORTACAO (
    ID BIGINT PRIMARY KEY AUTO_INCREMENT,
    CO_ANO INT,
    CO_MES TINYINT,
    KG_LIQUIDO DECIMAL(15,3),
    VL_FOB DECIMAL(15,2),
    VL_AGREGADO DECIMAL(15,2),
    NO_PAIS VARCHAR(50),
    NO_VIA VARCHAR(50),
    SG_UF CHAR(2),
    NO_UF VARCHAR(30),
    NO_REGIAO VARCHAR(30),
    NO_URF VARCHAR(50),
    CO_FAT_AGREG DECIMAL(5,1),
    NO_SH6_POR VARCHAR(255),
    NO_SH4_POR VARCHAR(255),
    NO_SH2_POR VARCHAR(255)
);

CREATE TABLE IMPORTACAO (
    ID BIGINT PRIMARY KEY AUTO_INCREMENT,
    CO_ANO INT,
    CO_MES TINYINT,
    KG_LIQUIDO DECIMAL(15,3),
    VL_TOTAL DECIMAL(15,2),
    VL_AGREGADO DECIMAL(15,2),
    NO_PAIS VARCHAR(50),
    NO_VIA VARCHAR(50),
    SG_UF CHAR(2),
    NO_UF VARCHAR(30),
    NO_REGIAO VARCHAR(30),
    NO_URF VARCHAR(50),
    CO_FAT_AGREG DECIMAL(5,1),
    NO_SH6_POR VARCHAR(255),
    NO_SH4_POR VARCHAR(255),
    NO_SH2_POR VARCHAR(255)
);


SET GLOBAL local_infile = 1;

LOAD DATA LOCAL INFILE '../exp_tratado_2025-2014.csv'
INTO TABLE EXPORTACAO
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(CO_ANO, CO_MES, KG_LIQUIDO, VL_FOB, VL_AGREGADO, NO_PAIS, NO_VIA, SG_UF, NO_UF, 
 NO_REGIAO, NO_URF, CO_FAT_AGREG, NO_SH6_POR, NO_SH4_POR, NO_SH2_POR);

LOAD DATA LOCAL INFILE '/home/ubuntu/imp_tratado_2025-2014.csv'
INTO TABLE IMPORTACAO
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(CO_ANO, CO_MES, KG_LIQUIDO, VL_TOTAL, VL_AGREGADO, NO_PAIS, NO_VIA, SG_UF, NO_UF, 
 NO_REGIAO, NO_URF, CO_FAT_AGREG, NO_SH6_POR, NO_SH4_POR, NO_SH2_POR);


CREATE INDEX idx_ano_via             ON EXPORTACAO (CO_ANO, NO_VIA);
CREATE INDEX idx_ano_vl_fob_produto  ON EXPORTACAO (CO_ANO, VL_FOB, NO_SH6_POR);
CREATE INDEX idx_ano_fat_agreg       ON EXPORTACAO (CO_ANO, CO_FAT_AGREG);
CREATE INDEX idx_ano_no_sh6_por      ON EXPORTACAO (CO_ANO, NO_SH6_POR);
CREATE INDEX idx_ano_no_sh4_por      ON EXPORTACAO (CO_ANO, NO_SH4_POR);
CREATE INDEX idx_ano_urf             ON EXPORTACAO (CO_ANO, NO_URF);
CREATE INDEX idx_ano_mes_vl_agregado ON EXPORTACAO (CO_ANO, CO_MES, VL_AGREGADO);
CREATE INDEX idx_ano_mes_kg_liquido  ON EXPORTACAO (CO_ANO, CO_MES, KG_LIQUIDO);
CREATE INDEX idx_ano_mes_vl_fob      ON EXPORTACAO (CO_ANO, CO_MES, VL_FOB);
CREATE INDEX idx_ano_vl_agregado     ON EXPORTACAO (CO_ANO, VL_AGREGADO);
CREATE INDEX idx_ano_kg_liquido      ON EXPORTACAO (CO_ANO, KG_LIQUIDO);
CREATE INDEX idx_ano_vl_fob          ON EXPORTACAO (CO_ANO, VL_FOB);
CREATE INDEX idx_no_sh6_por          ON EXPORTACAO (NO_SH6_POR);
CREATE INDEX idx_no_sh4_por          ON EXPORTACAO (NO_SH4_POR);
CREATE INDEX idx_no_sh2_por          ON EXPORTACAO (NO_SH2_POR);
CREATE INDEX idx_ano_uf              ON EXPORTACAO (SG_UF, CO_ANO);
CREATE INDEX idx_ano_pais            ON EXPORTACAO(CO_ANO,NO_PAIS,VL_FOB,VL_AGREGADO,KG_LIQUIDO);


CREATE INDEX idx_ano_via             ON IMPORTACAO (CO_ANO, NO_VIA);
CREATE INDEX idx_ano_vl_total_produto  ON IMPORTACAO (CO_ANO, VL_TOTAL, NO_SH6_POR);
CREATE INDEX idx_ano_fat_agreg       ON IMPORTACAO (CO_ANO, CO_FAT_AGREG);
CREATE INDEX idx_ano_no_sh6_por      ON IMPORTACAO (CO_ANO, NO_SH6_POR);
CREATE INDEX idx_ano_no_sh4_por      ON IMPORTACAO (CO_ANO, NO_SH4_POR);
CREATE INDEX idx_ano_urf             ON IMPORTACAO (CO_ANO, NO_URF);
CREATE INDEX idx_ano_mes_vl_agregado ON IMPORTACAO (CO_ANO, CO_MES, VL_AGREGADO);
CREATE INDEX idx_ano_mes_kg_liquido  ON IMPORTACAO (CO_ANO, CO_MES, KG_LIQUIDO);
CREATE INDEX idx_ano_mes_vl_total    ON IMPORTACAO (CO_ANO, CO_MES, VL_TOTAL);
CREATE INDEX idx_ano_vl_agregado     ON IMPORTACAO (CO_ANO, VL_AGREGADO);
CREATE INDEX idx_ano_kg_liquido      ON IMPORTACAO (CO_ANO, KG_LIQUIDO);
CREATE INDEX idx_ano_vl_total        ON IMPORTACAO (CO_ANO, VL_TOTAL);
CREATE INDEX idx_no_sh6_por          ON IMPORTACAO (NO_SH6_POR);
CREATE INDEX idx_no_sh4_por          ON IMPORTACAO (NO_SH4_POR);
CREATE INDEX idx_no_sh2_por          ON IMPORTACAO (NO_SH2_POR);
CREATE INDEX idx_ano_uf              ON IMPORTACAO (SG_UF, CO_ANO);
CREATE INDEX idx_ano_pais            ON IMPORTACAO (CO_ANO,NO_PAIS,VL_FOB,VL_AGREGADO,KG_LIQUIDO);
