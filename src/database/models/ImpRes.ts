import ComexBase from "./Comex";
import { Entity } from "typeorm";

@Entity({ name: "IMPORTACAO_RES" })
export class ImpRes extends ComexBase {}
