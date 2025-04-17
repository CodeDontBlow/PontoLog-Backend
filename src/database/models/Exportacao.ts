import ComexBase from "./Comex";
import { Entity, Index } from "typeorm";

@Entity({ name: "EXPORTACAO" })
export class Exportacao extends ComexBase {}
