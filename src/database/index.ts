import { DataSource } from "typeorm";
import { db } from "../config";
import FatoExportacao from "./models/fatoExportacao";
import DimPais from "./models/dimPais";
import DimRegiao from "./models/dimRegiao";
import DimSh from "./models/dimSh";
import DimUf from "./models/dimUf";
import DimVia from "./models/dimVia";
import DimUrf from "./models/dimUrf";

const AppDataSource = new DataSource({
  type: "postgres",
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [FatoExportacao, DimPais, DimRegiao, DimSh, DimUf, DimUrf, DimVia],
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
