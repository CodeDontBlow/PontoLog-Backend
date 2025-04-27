import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "dim_sh" })
export default class DimSh {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @Column({ name: "no_sh6_por" })
  readonly nomeSh6: string;

  @Column({ name: "co_sh6" })
  readonly codigoSh6: number;

  @Column({ name: "no_sh4_por" })
  readonly nomeSh4: string;

  @Column({ name: "no_sh2_por" })
  readonly nomeSh2: string;
}
