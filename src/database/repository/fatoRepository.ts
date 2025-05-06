import { EntityTarget } from "typeorm";
import { AppDataSource } from "..";

export default abstract class FatoRepository<T> {
  private entity: EntityTarget<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
  }

  public async getFat(year: number, endYear?: number, uf?: string): Promise<number> {
    const repo = AppDataSource.getRepository(this.entity);
    const query = repo
      .createQueryBuilder("ent")
      .select("ent.co_fat_agreg", "co_fat_agreg")
      .addSelect("COUNT(ent.co_fat_agreg)", "count")
      .leftJoin("dim_uf", "du", "ent.co_uf = du.co_uf")
      .where("ent.co_ano = :year", { year });
    if (endYear) {
      query.andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear });
    } else {
      query.where("ent.co_ano = :year", { year });
    }
    if (uf) {
      query.andWhere("duf.sg_uf = :uf", { uf });
    }
    const result = await query.groupBy("ent.co_fat_agreg").orderBy("count", "DESC").limit(1).getRawOne();
    return result.co_fat_agreg;
  }

  public async getProduct(sh: string, year: number, endYear?: number, uf?: string): Promise<string> {
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
    return result.no_sh;
  }

  public async getVia(year: number, endYear?: number, uf?: string): Promise<{ NO_VIA: string; total: number }[]> {
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
    return result;
  }

  public async getUrf(year: number, endYear?: number, uf?: string): Promise<{ NO_URF: string; total: number }[]> {
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
    return result;
  }

  public async getVlAgregado(
    year: number,
    month?: number,
    uf?: string,
    region?: string,
    sh?: string,
    productName?: string,
  ): Promise<{ total: number }> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("SUM(ent.vl_agregado)", "total")
      .leftJoin("dim_sh", "dsh", "ent.co_sh6 = dsh.co_sh6")
      .leftJoin("dim_uf", "duf", "ent.co_uf = duf.co_uf")
      .leftJoin("dim_regiao", "drg", "ent.co_regiao = drg.co_regiao")
      .where("ent.co_ano = :year", { year });
      
    if (month) {
      query.andWhere("ent.co_mes = :month", { month });
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

    const result = await query.getRawOne();

    return result
  }

  public async getKgLiquido(
    year: number,
    month?: number,
    uf?: string,
    region?: string,
    sh?: string,
    productName?: string,
  ): Promise<{ total: number }> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("SUM(ent.kg_liquido)", "total")
      .leftJoin("dim_sh", "dsh", "ent.co_sh6 = dsh.co_sh6")
      .leftJoin("dim_uf", "duf", "ent.co_uf = duf.co_uf")
      .leftJoin("dim_regiao", "drg", "ent.co_regiao = drg.co_regiao")
      .where("ent.co_ano = :year", { year });
    
    if (month) {
      query.andWhere("ent.co_mes = :month", { month });
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

    const result = await query.getRawOne();

    return result
  }

  public async getVlFob(
    year: number,
    month: number,
    uf?: string,
    region?: string,
    sh?: string,
    productName?: string,
  ): Promise<{ total: string }> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("SUM(ent.vl_fob)", "total")
      .leftJoin("dim_sh", "dsh", "ent.co_sh6 = dsh.co_sh6")
      .leftJoin("dim_uf", "duf", "ent.co_uf = duf.co_uf")
      .leftJoin("dim_regiao", "drg", "ent.co_regiao = drg.co_regiao")
      .where("ent.co_ano = :year", { year });
  
    if (month) {
      query.andWhere("ent.co_mes = :month", { month });
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

    const result = await query.getRawOne();

    return result
  }

  public async getOverallCountries(
    year: number,
    endYear?: number,
    uf?: string,
    sh?: string,
    productName?: string,
  ): Promise<{ NO_PAIS: string; TOTAL_REGISTROS: number; TOTAL_VL_AGREGADO: number; TOTAL_KG_LIQUIDO: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .leftJoin("dim_pais", "dps", "ent.co_pais = dps.co_pais")
      .select("dps.no_pais", "NO_PAIS")
      .addSelect("COUNT(*)", "TOTAL_REGISTROS")
      .addSelect("SUM(ent.vl_agregado)", "TOTAL_VL_AGREGADO")
      .addSelect("SUM(ent.kg_liquido)", "TOTAL_KG_LIQUIDO")
      .leftJoin("dim_sh", "dsh", "ent.co_sh6 = dsh.co_sh6")
      .leftJoin("dim_uf", "duf", "ent.co_uf = duf.co_uf");
    if (endYear) {
      query.andWhere("ent.co_ano BETWEEN :year AND :endYear", { year, endYear });
    } else {
      query.andWhere("ent.co_ano = :year", { year });
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
  
    return result;
  }
}
