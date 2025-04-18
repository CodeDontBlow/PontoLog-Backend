import ComexBase from "./Comex";
import { Entity } from "typeorm";

@Entity({ name: "IMPORTACAO" })
export class Importacao extends ComexBase {}
