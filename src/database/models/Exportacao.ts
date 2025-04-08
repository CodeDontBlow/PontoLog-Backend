import { Column, Entity, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity({ name: "EXPORTACAO" })
@Index("idx_ano_fat_agreg", ["ano", "fatorAgregado"])
@Index("idx_ano_no_sh6_por", ["ano", "nomeSh6"])
@Index("idx_ano_no_sh4_por", ["ano", "nomeSh4"])
@Index("idx_ano_via", ["ano", "via"])
@Index("idx_ano_urf", ["ano", "urf"])
@Index("idx_ano_mes_vl_agregado", ["ano", "mes", "valorAgregado"])
export default class Exportacao {
  @PrimaryGeneratedColumn({ name: "ID" })
  readonly id: number;

  @Column({ name: "CO_ANO" })
  readonly ano: number;

  @Column({ name: "CO_MES" })
  readonly mes: number;

  @Column({ name: "KG_LIQUIDO" })
  readonly kg: string;

  @Column({ name: "VL_FOB" })
  readonly valorFob: number;

  @Column({ name: "VL_AGREGADO" })
  readonly valorAgregado: string;

  @Column({ name: "NO_PAIS" })
  readonly pais: string;

  @Column({ name: "NO_VIA" })
  readonly via: string;

  @Column({ name: "SG_UF" })
  readonly siglaUf: string;

  @Column({ name: "NO_UF" })
  readonly uf: string;

  @Column({ name: "NO_REGIAO" })
  readonly regiao: string;

  @Column({ name: "NO_URF" })
  readonly urf: string;

  @Column({ name: "CO_FAT_AGREG" })
  readonly fatorAgregado: string;

  @Column({ name: "NO_SH6_POR" })
  @Index("idx_no_sh6_por")
  readonly nomeSh6: string;

  @Column({ name: "NO_SH4_POR" })
  @Index("idx_no_sh4_por")
  readonly nomeSh4: string;

  @Column({ name: "NO_SH2_POR" })
  @Index("idx_no_sh2_por")
  readonly nomeSh2: string;
}
