import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "dim_urf" })
export default class DimUrf {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @Column({ name: "no_urf" })
  readonly nomeUrf: string;

  @Column({ name: "co_urf" })
  readonly codigoUrf: number;
}
