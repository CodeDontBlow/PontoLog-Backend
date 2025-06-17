import { redis } from "../config";
import { createClient } from "redis";
import { DataSource } from "typeorm";
import { db } from "../config";
import FatoExportacao from "./models/fatoExportacao";
import FatoImportacao from "./models/fatoImportacao";
import DimPais from "./models/dimPais";
import DimRegiao from "./models/dimRegiao";
import DimSh from "./models/dimSh";
import DimUf from "./models/dimUf";
import DimVia from "./models/dimVia";
import DimUrf from "./models/dimUrf";
import Balanca from "./models/balanca";
import { preloadAll } from "../utils/preload";
import BalancoProphet from "./models/previsao/balancoProphet";
import { kgLiquidoExportacao } from "./models/previsao/exportacao/kgLiquido";
import VlFobExportacao from "./models/previsao/exportacao/vlFob";
import { vlAgregadoExportacao } from "./models/previsao/exportacao/vlAgregado";

const AppDataSource = new DataSource({
  type: "postgres",
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [FatoExportacao, FatoImportacao, DimPais, DimRegiao, DimSh, DimUf, DimUrf, DimVia, Balanca, BalancoProphet,kgLiquidoExportacao,VlFobExportacao,vlAgregadoExportacao],
  synchronize: false,
  logging: true,
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
    // await preloadAll();

  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const RedisClient = createClient({
  socket: {
    host: redis.host,
    port: redis.port,
  },
});

RedisClient.connect()
  .then(() => {
    console.log("Redis has been initialized!");
  })
  .catch((err) => {
    console.log("Error during Redis initialization", err);
  });

export { AppDataSource, RedisClient };
