import { DataSource } from "typeorm";
import { db } from "../config";
import { Exportacao } from "./models/Exportacao";
import { Importacao } from "./models/Importacao";

const AppDataSource = new DataSource({
  type: "mysql",
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [Exportacao, Importacao],
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
