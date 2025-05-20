import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import FatoExportacao from "./fatoExportacao";

@Entity({ name: "dim_uf" })
export default class DimUf {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @Column({ name: "sg_uf" })
  readonly siglaUf: string;

  @Column({ name: "no_uf" })
  readonly nomeUf: string;

  @Column({ name: "co_uf" })
  readonly codigoUf: number;

  @OneToMany(() => FatoExportacao, (fatoExportacao) => fatoExportacao.dimUf)
  fatoExportacoes: FatoExportacao[];
}
