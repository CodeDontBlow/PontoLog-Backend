import { AppDataSource } from "..";
import Balanca from "../models/balanca";
import redisClient from "../../utils/cache";  
export default class BalancaRepository {
  private async getCacheKey(methodName: string, params: object): Promise<string> {
    return `${methodName}:${JSON.stringify(params)}`;
  }

  public async getBalancoComercialByYear(
    year: number,
    endYear?: number,
    uf?: string,
    region?: string,
    sh?: string,
    productName?: string,
  ): Promise<{ CO_MES: string; total: number }[]> {
    const params = { year, endYear, uf, region, sh, productName };
    const cacheKey = await this.getCacheKey('getBalancoComercialByYear', params);
    
    const cached = await redisClient.get(cacheKey);
    if (cached !== null) return JSON.parse(cached);

    const query = AppDataSource.getRepository(Balanca)
      .createQueryBuilder("ent")
      .select("ent.co_mes", "co_mes")
      .addSelect("SUM(ent.balanca_comercial)", "total");

    if (endYear) {
      query.andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear });
    } else {
      query.andWhere("ent.co_ano = :year", { year });
    }

    if (region) {
      query.andWhere("drg.no_regiao = :region", { region });
    }

    if (uf) {
      query.andWhere("ent.sg_uf = :uf", { uf });
    }

    if (sh && productName) {
      query.andWhere(`dsh.${sh} = :productName`, { productName });
    }

    const result = await query
      .groupBy("ent.co_mes")
      .orderBy("co_mes", "DESC")
      .getRawMany();

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(result));

    return result.map((r: { co_mes: string; total: string; }) => ({
      CO_MES: r.co_mes,
      total: parseFloat(r.total),
    }));
  }
}
