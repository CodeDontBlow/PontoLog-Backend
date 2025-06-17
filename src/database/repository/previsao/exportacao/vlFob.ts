import { Between, Repository } from 'typeorm';
import { AppDataSource } from "../../..";
import  VlFobExportacao  from '../../../models/previsao/exportacao/vlFob';
import { RedisClient } from "../../..";
import { getKey } from "../../../../utils/cacheFormat";

export default class VlFobProphetRepository {
  private repository: Repository<VlFobExportacao>;

  constructor() {
    this.repository = AppDataSource.getRepository(VlFobExportacao);
  }

  public async getPrevisoesByYear(
    year: number
  ): Promise<{ data: string; previsao: number; limiteInferior: number; limiteSuperior: number; tendencia: number }[]> {
    // Gerar chave de cache usando o padrão do sistema
    const key = getKey("vlFob", "getPrevisoesByYear", { year });

    // Tentar obter do cache
    const resultCached = await RedisClient.get(key);
    if (resultCached !== null) {
      return JSON.parse(resultCached);
    }

    // Calcular datas de início e fim do ano
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    // Buscar no banco de dados
    const previsoes = await this.repository.find({
      where: {
        data: Between(startDate, endDate)
      },
      order: {
        data: 'ASC'
      }
    });

    // Formatar resultado para serialização
    // Corrija a formatação da data
    const result = previsoes.map(p => ({
      data: new Date(p.data).toISOString().split('T')[0], // Converta para Date primeiro
      previsao: p.previsao,
      limiteInferior: p.limiteInferior,
      limiteSuperior: p.limiteSuperior,
      tendencia: p.tendencia
    }));


    await RedisClient.set(key, JSON.stringify(result));

    return result;
  }
}