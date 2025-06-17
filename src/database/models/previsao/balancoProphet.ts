// src/models/previsao/balancoProphet.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'prophet_balanca' }) // NOME CORRETO DA TABELA
export default class BalancoProphet {
  @PrimaryColumn({ type: 'date', name: 'data' }) // Nome da coluna no banco
  data: Date;

  @Column({ type: 'numeric', name: 'previsao' })
  previsao: number;

  @Column({ type: 'numeric', name: 'limite_inferior' })
  limiteInferior: number;

  @Column({ type: 'numeric', name: 'limite_superior' })
  limiteSuperior: number;

  @Column({ type: 'numeric', name: 'tendencia' })
  tendencia: number;
}