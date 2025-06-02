import { EntityTarget } from "typeorm";
import { AppDataSource } from "..";
import { getKey } from "../../utils/cacheFormat";
import { RedisClient } from "..";

export default abstract class FatoRepository<T> {
  private readonly entity: EntityTarget<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
  }

  protected getEntityName(): string {
    if (typeof this.entity === "string") {
      return this.entity;
    } else if (typeof this.entity === "function") {
      return this.entity.name;
    } else {
      throw new Error("Invalid entity type");
    }
  }

  public async getFat(year: number, endYear?: number, uf?: string): Promise<number> {
    const key = getKey(this.getEntityName(), "getFat", { year, endYear, uf });
    const resultCached = await RedisClient.get(key);
    if (resultCached !== null) return Number(resultCached);

    const repo = AppDataSource.getRepository(this.entity);
    const query = repo
      .createQueryBuilder("ent")
      .select("ent.co_fat_agreg", "co_fat_agreg")
      .addSelect("COUNT(ent.co_fat_agreg)", "count")
      .leftJoin("dim_uf", "du", "ent.co_uf = du.co_uf")
      .where("ent.co_ano = :year", { year });

    if (endYear) query.andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear });
    if (uf) query.andWhere("du.sg_uf = :uf", { uf });

    const result = await query.groupBy("ent.co_fat_agreg").orderBy("count", "DESC").limit(1).getRawOne();
    await RedisClient.set(key, result.co_fat_agreg);
    return Number(result.co_fat_agreg);
  }

  public async getProduct(sh: string, year: number, endYear?: number, uf?: string): Promise<string> {
    const key = getKey(this.getEntityName(), "getProduct", { sh, year, endYear, uf });
    const resultCached = await RedisClient.get(key);
    if (resultCached !== null) return resultCached;

    const repo = AppDataSource.getRepository(this.entity);
    const query = repo
      .createQueryBuilder("ent")
      .select(`du.${sh}`, "no_sh")
      .addSelect(`COUNT(du.${sh})`, "count")
      .leftJoin("dim_sh", "du", "ent.co_sh6 = du.co_sh6")
      .leftJoin("dim_uf", "duf", "ent.co_uf = duf.co_uf");
    if (endYear) {
      query.andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear });
    } else {
      query.where("ent.co_ano = :year", { year });
    }
    if (uf) {
      query.andWhere("duf.sg_uf = :uf", { uf });
    }
    const result = await query.groupBy(`du.${sh}`).orderBy("count", "DESC").getRawOne();
    await RedisClient.set(key, result.no_sh);
    return result.no_sh;
  }

  public async getVia(year: number, endYear?: number, uf?: string): Promise<{ NO_VIA: string; total: number }[]> {
    const key = getKey(this.getEntityName(), "getVia", { year, endYear, uf });
    const resultCached = await RedisClient.get(key);
    if (resultCached !== null) return JSON.parse(resultCached);

    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("du.no_via", "NO_VIA")
      .addSelect("COUNT(du.no_via)", "total")
      .leftJoin("dim_via", "du", "ent.co_via = du.co_via")
      .leftJoin("dim_uf", "duf", "ent.co_uf = duf.co_uf");
    if (endYear) {
      query.andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear });
    } else {
      query.where("ent.co_ano = :year", { year });
    }
    if (uf) {
      query.andWhere("duf.sg_uf = :uf", { uf });
    }
    const result = await query.groupBy("du.no_via").orderBy("total", "DESC").limit(3).getRawMany();
    await RedisClient.set(key, JSON.stringify(result));
    return result;
  }

  public async getUrf(year: number, endYear?: number, uf?: string): Promise<{ NO_URF: string; total: number }[]> {
    const key = getKey(this.getEntityName(), "getUrf", { year, endYear, uf });
    const resultCached = await RedisClient.get(key);
    if (resultCached !== null) return JSON.parse(resultCached);

    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("du.no_urf", "NO_URF")
      .addSelect("COUNT(du.no_urf)", "total")
      .leftJoin("dim_urf", "du", "ent.co_urf = du.co_urf")
      .leftJoin("dim_uf", "duf", "ent.co_uf = duf.co_uf");
    if (endYear) {
      query.andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear });
    } else {
      query.andWhere("ent.co_ano = :year", { year });
    }
    if (uf) {
      query.andWhere("duf.sg_uf = :uf", { uf });
    }
    const result = await query.groupBy("du.no_urf").orderBy("total", "DESC").limit(3).getRawMany();
    await RedisClient.set(key, JSON.stringify(result));
    return result;
  }

 public async getVlAgregado(
  year: number,
  endYear?: number,
  uf?: string,
  region?: string,
  sh?: string,
  productName?: string,
): Promise<{ result: string; total: number }[]> {
  const key = getKey(this.getEntityName(), "getVlAgregado", { year, endYear, uf, region, sh, productName });
  const resultCached = await RedisClient.get(key);

  if (resultCached !== null) {
    const parsed = JSON.parse(resultCached);
    return parsed.map((r: any) => ({
      result: r.label,
      total: parseFloat(r.total),
    }));
  }

  const query = AppDataSource.getRepository(this.entity)
    .createQueryBuilder("ent")
    .leftJoin("dim_sh", "dsh", "ent.co_sh6 = dsh.co_sh6")
    .leftJoin("dim_uf", "duf", "ent.co_uf = duf.co_uf")
    .leftJoin("dim_regiao", "drg", "ent.co_regiao = drg.co_regiao");

  if (endYear) {
    query.select([
      "ent.co_ano AS label",
      "SUM(ent.vl_agregado) AS total"
    ])
    .andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear })
    .groupBy("ent.co_ano")
    .orderBy("ent.co_ano", "ASC");
  } else {
    query.select([
      "ent.co_mes AS label",
      "SUM(ent.vl_agregado) AS total"
    ])
    .andWhere("ent.co_ano = :year", { year })
    .groupBy("ent.co_mes")
    .orderBy("ent.co_mes", "ASC");
  }

  if (region) {
    query.andWhere("drg.no_regiao = :region", { region });
  }
  if (uf) {
    query.andWhere("duf.sg_uf = :uf", { uf });
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

  public async getKgLiquido(
    year: number,
    endYear?: number,
    uf?: string,
    region?: string,
    sh?: string,
    productName?: string,
  ): Promise<{ result: string; total: number }[]> {
    const key = getKey(this.getEntityName(), "getKgLiquido", { year, endYear, uf, region, sh, productName });
    const resultCached = await RedisClient.get(key);

    if (resultCached !== null) {
      const parsed = JSON.parse(resultCached);
      return parsed.map((r: any) => ({
        result: r.label,
        total: parseFloat(r.total),
      }));
    }

    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .leftJoin("dim_sh", "dsh", "ent.co_sh6 = dsh.co_sh6")
      .leftJoin("dim_uf", "duf", "ent.co_uf = duf.co_uf")
      .leftJoin("dim_regiao", "drg", "ent.co_regiao = drg.co_regiao");

    if (endYear) {
      query.select([
        "ent.co_ano AS label",
        "SUM(ent.kg_liquido) AS total"
      ])
      .andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear })
      .groupBy("ent.co_ano")
      .orderBy("ent.co_ano", "ASC");

    } else {
      query.select([
        "ent.co_mes AS label",
        "SUM(ent.kg_liquido) AS total"
      ])
      query.andWhere("ent.co_ano = :year", { year })
      .groupBy("ent.co_mes")
      .orderBy("ent.co_mes", "ASC");
    }
    if (region) {
      query.andWhere("drg.no_regiao = :region", { region });
    }
    if (uf) {
      query.andWhere("duf.sg_uf = :uf", { uf });
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

  public async getVlFob(
  year: number,
  endYear?: number,
  uf?: string,
  region?: string,
  sh?: string,
  productName?: string,
): Promise<{ result: string; total: number }[]> {
  const key = getKey(this.getEntityName(), "getVlFob", { year, endYear, uf, region, sh, productName });
  const resultCached = await RedisClient.get(key);

  if (resultCached !== null) {
    const parsed = JSON.parse(resultCached);
    return parsed.map((r: any) => ({
      result: r.label,
      total: parseFloat(r.total),
    }));
  }

  const query = AppDataSource.getRepository(this.entity)
    .createQueryBuilder("ent")
    .leftJoin("dim_sh", "dsh", "ent.co_sh6 = dsh.co_sh6")
    .leftJoin("dim_uf", "duf", "ent.co_uf = duf.co_uf")
    .leftJoin("dim_regiao", "drg", "ent.co_regiao = drg.co_regiao");

  if (endYear) {
    query
      .select([
        "ent.co_ano AS label",
        "SUM(ent.vl_fob) AS total"
      ])
      .andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear })
      .groupBy("ent.co_ano")
      .orderBy("ent.co_ano", "ASC");
  } else {
    query
      .select([
        "ent.co_mes AS label",
        "SUM(ent.vl_fob) AS total"
      ])
      .andWhere("ent.co_ano = :year", { year })
      .groupBy("ent.co_mes")
      .orderBy("ent.co_mes", "ASC");
  }

  if (region) {
    query.andWhere("drg.no_regiao = :region", { region });
  }
  if (uf) {
    query.andWhere("duf.sg_uf = :uf", { uf });
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

  public async getOverallCountries(
    year: number,
    endYear?: number,
    uf?: string,
    region?: string,
    sh?: string,
    productName?: string,
  ): Promise<{ NO_PAIS: string; TOTAL_REGISTROS: number; TOTAL_VL_AGREGADO: number; TOTAL_KG_LIQUIDO: number }[]> {
    const key = getKey(this.getEntityName(), "getOverallCountries", { year, endYear, uf, region, sh, productName });
    const resultCached = await RedisClient.get(key);
    if (resultCached !== null) {
      const parsed = JSON.parse(resultCached);
      return parsed.map((r: any) => ({
        NO_PAIS: r.NO_PAIS,
        TOTAL_REGISTROS: parseInt(r.TOTAL_REGISTROS, 10),
        TOTAL_VL_AGREGADO: parseFloat(r.TOTAL_VL_AGREGADO),
        TOTAL_KG_LIQUIDO: parseFloat(r.TOTAL_KG_LIQUIDO),
      }));
    }

    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .leftJoin("dim_pais", "dps", "ent.co_pais = dps.co_pais")
      .select("dps.no_pais", "NO_PAIS")
      .addSelect("COUNT(*)", "TOTAL_REGISTROS")
      .addSelect("SUM(ent.vl_agregado)", "TOTAL_VL_AGREGADO")
      .addSelect("SUM(ent.kg_liquido)", "TOTAL_KG_LIQUIDO")
      .leftJoin("dim_sh", "dsh", "ent.co_sh6 = dsh.co_sh6")
      .leftJoin("dim_uf", "duf", "ent.co_uf = duf.co_uf")
      .leftJoin("dim_regiao", "drg", "ent.co_regiao = drg.co_regiao");

    if (endYear) {
      query.andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear });
    } else {
      query.andWhere("ent.co_ano = :year", { year });
    }
    if (region) {
      query.andWhere("drg.no_regiao = :region", { region });
    }

    if (uf) {
      query.andWhere("duf.sg_uf = :uf", { uf });
    }

    if (sh && productName) {
      query.andWhere(`dsh.${sh} = :productName`, { productName });
    }

    const result = await query
      .groupBy("dps.no_pais")
      .orderBy("COUNT(*)", "DESC")
      .addOrderBy("dps.no_pais", "DESC")
      .getRawMany();

    await RedisClient.set(key, JSON.stringify(result));
    return result.map((r) => ({
      NO_PAIS: r.NO_PAIS,
      TOTAL_REGISTROS: parseInt(r.TOTAL_REGISTROS, 10),
      TOTAL_VL_AGREGADO: parseFloat(r.TOTAL_VL_AGREGADO),
      TOTAL_KG_LIQUIDO: parseFloat(r.TOTAL_KG_LIQUIDO),
    }));
  }

  public async getAllData(params: {
    year: number;
    endYear?: number;
    uf?: string;
    region?: string;
    sh?: string;
    productName?: string;
  }): Promise<any> {
    const { year, endYear, uf, region, sh, productName } = params;
    const response: any = { year, endYear, uf, region, sh, productName };
    response.via = await this.getVia(year, endYear, uf);
    response.urf = await this.getUrf(year, endYear, uf);
    response.vlAgregado = await this.getVlAgregado(year, endYear, uf, region, sh, productName);
    response.kgLiquido = await this.getKgLiquido(year, endYear, uf, region, sh, productName);
    response.vlFob = await this.getVlFob(year, endYear, uf, region, sh, productName);
    response.overallCountries = await this.getOverallCountries(year, endYear, uf, region, sh, productName);
    return response;
  }
}
