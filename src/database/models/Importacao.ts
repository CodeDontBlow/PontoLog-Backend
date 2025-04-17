import ComexBase from "./Comex";
import { Entity, Index } from "typeorm";

@Entity({ name: "IMPORTACAO" })
export class Importacao extends ComexBase {}
