import { Column, PrimaryGeneratedColumn } from "typeorm";

export default abstract class BalancoCom {
  @PrimaryGeneratedColumn({ name: "ID" })
  readonly id: number;

  @Column({ name: "CO_ANO" })
  readonly ano: number;

  @Column({ name: "CO_MES" })
  readonly mes: number;

  @Column({ name: "SG_UF" })
  readonly siglaUf: string;

  @Column({ name: "BALANCA_COMERCIAL" })
  readonly balanca_comercial: number;
}
