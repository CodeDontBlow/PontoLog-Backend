import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'kgliquidoexportacao' })
export class kgLiquidoExportacao {
  @PrimaryColumn({ type: 'date' })
  data: Date; 

  @Column({ type: 'numeric', precision: 20, scale: 5 })
  previsao: number;

  @Column({ type: 'numeric', precision: 20, scale: 5, name: 'limite_inferior' })
  limiteInferior: number;

  @Column({ type: 'numeric', precision: 20, scale: 5, name: 'limite_superior' })
  limiteSuperior: number;

  @Column({ type: 'numeric', precision: 20, scale: 5 })
  tendencia: number;
}