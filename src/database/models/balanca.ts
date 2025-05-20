import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "balanca_comercial" })
export default class Balanca {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @Column({ name: "co_ano" })
  readonly co_ano: number;

  @Column({ name: "co_mes" })
  readonly co_mes: number;

  @Column({ name: "sg_uf" })
  readonly sg_uf: string;

  @Column({ name: "balanca_comercial", type: "numeric" })
  readonly balanca_comercial: number;
}
