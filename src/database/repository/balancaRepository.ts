import { AppDataSource } from "..";
import Balanca from "../models/balanca";
import { RedisClient } from "..";
import { getKey } from "../../utils/cacheFormat";

export default class BalancaRepository {
  public async getBalancoComercial(
    year: number,
    endYear?: number,
    uf?: string,
    region?: string,
    sh?: string,
    productName?: string,
  ): Promise<{ result: string; total: number }[]> {
    const key = getKey("Balanca", "getBalancoComercial", { year, endYear, uf, region, sh, productName });
    const resultCached = await RedisClient.get(key);
    if (resultCached !== null) {
    const parsed = JSON.parse(resultCached);
    return parsed.map((r: any) => ({
      result: r.label,
      total: parseFloat(r.total),
    }));
  }

    const query = AppDataSource.getRepository(Balanca)
      .createQueryBuilder("ent")
      .select("ent.co_mes", "co_mes")
      .addSelect("SUM(ent.balanca_comercial)", "total");

    if (endYear) {
      query.select([
        "ent.co_ano AS label",
        "SUM(ent.balanca_comercial) AS total"
      ])
      .andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear })
      .groupBy("ent.co_ano")
      .orderBy("ent.co_ano", "ASC")
    } else {
      query.select([
        "ent.co_mes AS label",
        "SUM(ent.balanca_comercial) AS total"
      ])
      .andWhere("ent.co_ano = :year", { year })
      .groupBy("ent.co_mes")
      .orderBy("ent.co_mes", "ASC")
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

    const result = await query.getRawMany();
    await RedisClient.set(key, JSON.stringify(result));
    return result.map((r) => ({
      result: r.label,
      total: parseFloat(r.total),
    }));
  }
}
