import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity({ name: "EXP" })
export default class Exp {
  @PrimaryGeneratedColumn({ name: "ID_EXP" })
  readonly id: number;

  @Column({ name: "CO_ANO" })
  readonly year: string;

  @Column({ name: "CO_MES" })
  readonly month: string;

  @Column({ name: "KG_LIQUIDO" })
  readonly netWeight: string;

  @Column({ name: "VL_FOB" })
  readonly fobValue: string;

  @Column({ name: "VL_AGREGADO" })
  readonly addedValue: string;

  @Column({ name: "NO_PAIS" })
  readonly country: string;

  @Column({ name: "NO_VIA" })
  readonly transportMode: string;

  @Column({ name: "SG_UF" })
  readonly stateAbbreviation: string;

  @Column({ name: "NO_UF" })
  readonly state: string;

  @Column({ name: "NO_REGIAO" })
  readonly region: string;

  @Column({ name: "NO_URF" })
  readonly customsOffice: string;

  @Column({ name: "CO_FAT_AGREG" })
  readonly aggregateFactor: string;

  @Column({ name: "NO_SH6_POR" })
  @Index("sh6-idx", ["NO_SH6_POR"])
  readonly sh6Description: string;

  @Column({ name: "NO_SH4_POR" })
  @Index("sh4-idx", ["NO_SH4_POR"])
  readonly sh4Description: string;

  @Column({ name: "NO_SH2_POR" })
  @Index("sh2-idx", ["NO_SH2_POR"])
  readonly sh2Description: string;
}
