import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "dim_via" })
export default class DimVia {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @Column({ name: "no_via" })
  readonly nomeVia: string;

  @Column({ name: "co_via" })
  readonly codigoVia: number;
}
