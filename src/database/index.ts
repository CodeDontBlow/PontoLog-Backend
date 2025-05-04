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
import Balanca from "./models/balanca"

const AppDataSource = new DataSource({
  type: "postgres",
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [FatoExportacao, FatoImportacao, DimPais, DimRegiao, DimSh, DimUf, DimUrf, DimVia, Balanca],
  synchronize: false,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export { AppDataSource };
