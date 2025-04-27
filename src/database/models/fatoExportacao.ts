import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import DimPais from "./dimPais";
import DimVia from "./dimVia";
import DimUf from "./dimUf";
import DimRegiao from "./dimRegiao";
import DimUrf from "./dimUrf";
import DimSh from "./dimSh";

@Entity({ name: "fato_exportacao" })
export default class FatoExportacao {
  @PrimaryGeneratedColumn({ name: "id" })
  readonly id: number;

  @Column({ name: "co_ano" })
  readonly ano: number;

  @Column({ name: "co_mes" })
  readonly mes: number;

  @Column({ name: "kg_liquido" })
  readonly kg: string;

  @Column({ name: "vl_fob" })
  readonly valorFob: number;

  @Column({ name: "vl_agregado" })
  readonly valorAgregado: string;

  @Column({ name: "co_fat_agreg" })
  readonly fatorAgregado: string;

  @ManyToOne(() => DimPais, (dimPais) => dimPais.codigoPais)
  @JoinColumn({ name: "co_pais" })
  readonly codigoPais: number;

  @ManyToOne(() => DimVia, (dimVia) => dimVia.codigoVia)
  @JoinColumn({ name: "co_via" })
  readonly codigoVia: number;

  @ManyToOne(() => DimUf, (dimUf) => dimUf.codigoUf)
  @JoinColumn({ name: "co_uf" })
  readonly dimUf: DimUf;

  @ManyToOne(() => DimRegiao, (dimRegiao) => dimRegiao.codigoRegiao)
  @JoinColumn({ name: "co_regiao" })
  readonly codigoRegiao: number;

  @ManyToOne(() => DimUrf, (dimUrf) => dimUrf.codigoUrf)
  @JoinColumn({ name: "co_urf" })
  readonly codigoUrf: number;

  @ManyToOne(() => DimSh, (dimSh) => dimSh.codigoSh6)
  @JoinColumn({ name: "co_sh6" })
  readonly codigoSh6: number;
}
