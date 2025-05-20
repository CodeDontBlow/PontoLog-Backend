import { AppDataSource } from "..";
import Balanca from "../models/balanca";
import { redisClient } from "../../cache/index";
import { getCacheKey } from "../../utils/cacheFormat";

export default class BalancaRepository {
  private readonly seconds: number = 3600;

  public async getBalancoComercialByYear(
    year: number,
    endYear?: number,
    uf?: string,
  ): Promise<{ CO_MES: string; total: number }[]> {
    const cacheKey = getCacheKey("getBalancoComercialByYear", { year, endYear, uf });
    const cached = await redisClient.get(cacheKey);
    if (cached !== null) return JSON.parse(cached);

    const query = AppDataSource.getRepository(Balanca)
      .createQueryBuilder("ent")
      .select("ent.co_mes", "co_mes")
      .addSelect("SUM(ent.balanca_comercial)", "total");
    if (uf) {
      query.andWhere("ent.sg_uf = :uf", { uf });
    }

    if (endYear) {
      query.andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear });
    } else {
      query.andWhere("ent.co_ano = :year", { year });
    }

    const result = await query.groupBy("ent.co_mes").orderBy("co_mes", "DESC").getRawMany();
    await redisClient.setEx(cacheKey, this.seconds, JSON.stringify(result));
    return result.map((r: { co_mes: string; total: string }) => ({
      CO_MES: r.co_mes,
      total: parseFloat(r.total),
    }));
  }
}
