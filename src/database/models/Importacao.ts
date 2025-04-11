import ComexBase from "./ComexBase";
import { Entity, Index } from "typeorm";

@Entity({ name: "IMPORTACAO" })
@Index("idx_ano_fat_agreg", ["ano", "fatorAgregado"])
@Index("idx_ano_no_sh6_por", ["ano", "nomeSh6"])
@Index("idx_ano_no_sh4_por", ["ano", "nomeSh4"])
@Index("idx_ano_via", ["ano", "via"])
@Index("idx_ano_urf", ["ano", "urf"])
@Index("idx_ano_mes_vl_agregado", ["ano", "mes", "valorAgregado"])
@Index("idx_ano_mes_kg_liquido", ["ano", "mes", "kg"])
@Index("idx_ano_mes_vl_fob", ["ano", "mes", "valorFob"])
@Index("idx_ano_vl_agregado", ["ano", "valorAgregado"])
@Index("idx_ano_kg_liquido", ["ano", "kg"])
@Index("idx_ano_vl_fob", ["ano", "valorFob"])
@Index("idx_no_sh6_por", ["nomeSh6"])
@Index("idx_no_sh4_por", ["nomeSh4"])
@Index("idx_no_sh2_por", ["nomeSh2"])
export class Importacao extends ComexBase {}
