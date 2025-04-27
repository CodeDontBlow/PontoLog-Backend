import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "dim_pais" })
export default class DimPais {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @Column({ name: "NO_PAIS" })
  readonly pais: string;

  @Column({ name: "CO_PAIS" })
  readonly codigoPais: number;
}
