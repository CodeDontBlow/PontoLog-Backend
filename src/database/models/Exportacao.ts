import ComexBase from "./Comex";
import { Entity } from "typeorm";

@Entity({ name: "EXPORTACAO" })
export class Exportacao extends ComexBase {}
