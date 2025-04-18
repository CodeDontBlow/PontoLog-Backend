import { Entity } from "typeorm";
import Comex from "./Comex";

@Entity({ name: "EXPORTACAO_RES" })
export class ExpRes extends Comex {}
