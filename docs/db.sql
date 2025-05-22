
-- rodar primeiro o create do database
-- create database pontolog;
-- depois, rodar esse comando com -f para executar todo o código. [!!!Atenção, esse processo demora pois estará populando o bd!!!]


-- psql -U postgres -d pontolog -f docs/db.sql


CREATE TABLE fato_exportacao (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  co_ano INTEGER,         
  co_mes INTEGER,         
  kg_liquido NUMERIC,     
  vl_fob NUMERIC,         
  vl_agregado NUMERIC,    
  co_fat_agreg NUMERIC,   
  co_pais INTEGER,        
  co_via INTEGER,         
  co_uf INTEGER,          
  co_regiao INTEGER,      
  co_urf INTEGER,         
  co_sh6 INTEGER          
);


CREATE TABLE fato_importacao (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  
  co_ano INTEGER,         
  co_mes INTEGER,         
  kg_liquido NUMERIC,     
  vl_fob NUMERIC,         
  vl_agregado NUMERIC,    
  co_fat_agreg NUMERIC,   
  co_pais INTEGER,        
  co_via INTEGER,         
  co_uf INTEGER,          
  co_regiao INTEGER,      
  co_urf INTEGER,         
  co_sh6 INTEGER          
);


CREATE TABLE dim_pais (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  co_pais INTEGER,
  no_pais CHARACTER VARYING
);

CREATE TABLE dim_regiao (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  co_regiao INTEGER,
  no_regiao CHARACTER VARYING
);

CREATE TABLE dim_uf (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  co_uf INTEGER,
  sg_uf CHARACTER VARYING,
  no_uf CHARACTER VARYING
);

CREATE TABLE dim_sh (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  co_sh6 INTEGER,
  no_sh6_por TEXT,
  no_sh4_por TEXT,
  no_sh2_por TEXT
);

CREATE TABLE dim_urf (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  co_urf INTEGER,
  no_urf CHARACTER VARYING
);

CREATE TABLE dim_via (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  co_via INTEGER,
  no_via CHARACTER VARYING
);

CREATE TABLE balanca_comercial (
    id SERIAL PRIMARY KEY,
    co_ano INTEGER NOT NULL,
    co_mes INTEGER NOT NULL,
    sg_uf CHAR(2) NOT NULL,
    balanca_comercial NUMERIC NOT NULL
);


CREATE INDEX idx_co_uf                         ON fato_exportacao(co_uf);
CREATE INDEX idx_co_ano                        ON fato_exportacao(co_ano);
CREATE INDEX idx_co_urf                        ON fato_exportacao(co_urf);
CREATE INDEX idx_co_ano_co_sh6                 ON fato_exportacao(co_ano, co_sh6);
CREATE INDEX idx_co_ano_fat_agreg              ON fato_exportacao(co_ano, co_fat_agreg);
CREATE INDEX idx_co_ano_co_via                 ON fato_exportacao(co_ano, co_via);
CREATE INDEX idx_co_ano_co_uf                  ON fato_exportacao(co_ano, co_uf);
CREATE INDEX idx_co_ano_co_mes_vl_agregado     ON fato_exportacao(co_ano, co_mes, vl_agregado);
CREATE INDEX idx_co_ano_co_mes_kg_liquido      ON fato_exportacao(co_ano, co_mes, kg_liquido);
CREATE INDEX idx_co_ano_co_mes_vl_fob          ON fato_exportacao(co_ano, co_mes, vl_fob);
CREATE INDEX idx_co_ano_co_mes                 ON fato_exportacao(co_ano, co_mes);
CREATE INDEX idx_co_ano_co_pais                ON fato_exportacao(co_ano, co_pais);

CREATE INDEX idx_co_uf_imp                     ON fato_importacao(co_uf);
CREATE INDEX idx_co_ano_imp                    ON fato_importacao(co_ano);
CREATE INDEX idx_co_urf_imp                    ON fato_importacao(co_urf);
CREATE INDEX idx_co_ano_co_sh6_imp             ON fato_importacao(co_ano, co_sh6);
CREATE INDEX idx_co_ano_fat_agreg_imp          ON fato_importacao(co_ano, co_fat_agreg);
CREATE INDEX idx_co_ano_co_via_imp             ON fato_importacao(co_ano, co_via);
CREATE INDEX idx_co_ano_co_uf_imp              ON fato_importacao(co_ano, co_uf);
CREATE INDEX idx_co_ano_co_mes_vl_agregado_imp ON fato_importacao(co_ano, co_mes, vl_agregado);
CREATE INDEX idx_co_ano_co_mes_kg_liquido_imp  ON fato_importacao(co_ano, co_mes, kg_liquido);
CREATE INDEX idx_co_ano_co_mes_vl_fob_imp      ON fato_importacao(co_ano, co_mes, vl_fob);
CREATE INDEX idx_co_ano_co_mes_imp             ON fato_importacao(co_ano, co_mes);
CREATE INDEX idx_co_ano_co_pais_imp            ON fato_importacao(co_ano, co_pais);

CREATE INDEX idx_co_via                        ON dim_via(co_via);
CREATE INDEX idx_no_via                        ON dim_via(no_via);
CREATE INDEX idx_co_sh6                        ON dim_sh (co_sh6);
CREATE INDEX idx_sg_uf                         ON dim_uf (sg_uf);
CREATE INDEX idx_co_uf_sg_uf                   ON dim_uf (co_uf, sg_uf);
CREATE INDEX idx_no_urf                        ON dim_urf(no_urf);


-----------------------------------------------------------

-- \COPY fato_importacao  (co_ano, co_mes, kg_liquido, vl_fob, vl_agregado, co_fat_agreg, co_pais, co_via, co_uf, co_regiao, co_urf, co_sh6) FROM 'docs\dados\fato_imp\fato_importacao.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
-- \COPY fato_exportacao  (co_ano, co_mes, kg_liquido, vl_fob, vl_agregado, co_fat_agreg, co_pais, co_via, co_uf, co_regiao, co_urf, co_sh6) FROM 'docs\dados\fato_exp\fato_exportacao.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
-- \COPY balanca_comercial(co_ano, co_mes, sg_uf, balanca_comercial)   FROM 'docs\dados\balanca_comercial_uf.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
-- \COPY dim_sh           (no_sh6_por, no_sh4_por, no_sh2_por, co_sh6) FROM 'docs\dados\dim_sh.csv'               WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"', ENCODING 'UTF8');
-- \COPY dim_regiao       (no_regiao, co_regiao)FROM 'docs\dados\dim_regiao.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
-- \COPY dim_uf           (sg_uf, no_uf, co_uf) FROM 'docs\dados\dim_uf.csv'     WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
-- \COPY dim_pais         (no_pais, co_pais)    FROM 'docs\dados\dim_pais.csv'   WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
-- \COPY dim_urf          (no_urf, co_urf)      FROM 'docs\dados\dim_urf.csv'    WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"', ENCODING 'UTF8');
-- \COPY dim_via          (no_via, co_via)      FROM 'docs\dados\dim_via.csv'    WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');

\COPY fato_importacao  (co_ano, co_mes, kg_liquido, vl_fob, vl_agregado, co_fat_agreg, co_pais, co_via, co_uf, co_regiao, co_urf, co_sh6) FROM 'docs/dados/fato_imp/fato_importacao.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
\COPY fato_exportacao  (co_ano, co_mes, kg_liquido, vl_fob, vl_agregado, co_fat_agreg, co_pais, co_via, co_uf, co_regiao, co_urf, co_sh6) FROM 'docs/dados/fato_exp/fato_exportacao.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
\COPY balanca_comercial(co_ano, co_mes, sg_uf, balanca_comercial) FROM 'docs/dados/balanca_comercial_uf.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
\COPY dim_sh           (no_sh6_por, no_sh4_por, no_sh2_por, co_sh6) FROM 'docs/dados/dim_sh.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"', ENCODING 'UTF8');
\COPY dim_regiao       (no_regiao, co_regiao) FROM 'docs/dados/dim_regiao.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
\COPY dim_uf           (sg_uf, no_uf, co_uf) FROM 'docs/dados/dim_uf.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
\COPY dim_pais         (no_pais, co_pais) FROM 'docs/dados/dim_pais.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');
\COPY dim_urf          (no_urf, co_urf) FROM 'docs/dados/dim_urf.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"', ENCODING 'UTF8');
\COPY dim_via          (no_via, co_via) FROM 'docs/dados/dim_via.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE '"');

