import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "dim_regiao" })
export default class DimRegiao {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @Column({ name: "no_regiao" })
  readonly nomeRegiao: string;

  @Column({ name: "co_regiao" })
  readonly codigoRegiao: number;
}
