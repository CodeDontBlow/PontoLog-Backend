import { EntityTarget } from "typeorm";
import { AppDataSource } from "..";

export default abstract class ComexRepository<T> {
  private entity: EntityTarget<T>;

  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
  }

  public async getProductByLetter(shType: string, letter: string): Promise<string[]> {
    const result = await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select(`ent.${shType}`)
      .where(`ent.${shType} LIKE :letter`, { letter: `${letter}%` })
      .distinct(true)
      .take(15)
      .orderBy(`ent.${shType}`, "ASC")
      .getRawMany();
    return result.map((i) => i[shType]);
  }

  // --- ByYear ---
  public async getFatByYear(startYear: number, uf?: string): Promise<number> {
    const repo = AppDataSource.getRepository(this.entity);
    const queryBuilder = repo
      .createQueryBuilder("ent")
      .select("ent.CO_FAT_AGREG", "co_fat_agreg")
      .addSelect("SUM(ent.QTD_REGISTROS)", "total")
      .where("ent.CO_ANO = :startYear", { startYear });
    if (uf) {
      queryBuilder.andWhere("ent.SG_UF = :uf", { uf });
    }
    const result = await queryBuilder.groupBy("ent.CO_FAT_AGREG").orderBy("total", "DESC").getRawOne();

    return result;
  }

  public async getProductByYear(sh: string, year: number, uf?: string): Promise<string> {
    const repo = AppDataSource.getRepository(this.entity);
    const query = repo.createQueryBuilder("ent").select(`ent.${sh}`, "no_sh").where("ent.CO_ANO = :year", { year });
    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }
    const result = await query.addSelect("SUM(ent.QTD_REGISTROS)", "total").groupBy(`ent.${sh}`).orderBy("total", "DESC").getRawOne();
    return result.no_sh;
  }

  public async getViaByYear(year: number, uf?: string): Promise<{ NO_VIA: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_VIA", "NO_VIA")
      .addSelect("SUM(ent.QTD_REGISTROS)", "total")
      .where("ent.CO_ANO = :year", { year });
    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }
    const result = await query.groupBy("ent.NO_VIA").orderBy("total", "DESC").take(3).getRawMany();
    return result;
  }

  public async getUrfByYear(year: number, uf?: string): Promise<{ NO_URF: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_URF", "NO_URF")
      .addSelect("COUNT(*)", "total")
      .where("ent.CO_ANO = :year", { year });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    const result = await query.groupBy("ent.NO_URF").orderBy("total", "DESC").take(3).getRawMany();

    return result;
  }

  public async getVlAgregadoByYear(year: number, uf?: string): Promise<{ CO_MES: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_AGREGADO)", "total_agregado")
      .where("ent.CO_ANO = :year", { year });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    return await query.groupBy("ent.CO_MES").orderBy("CO_MES", "ASC").getRawMany();
  }

  public async getKgLiquidoByYear(year: number, uf?: string): Promise<{ CO_MES: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where("ent.CO_ANO = :year", { year });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    return await query.groupBy("ent.CO_MES").orderBy("CO_MES", "ASC").getRawMany();
  }

  public async getVlFobByYear(year: number, uf?: string): Promise<{ CO_MES: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where("ent.CO_ANO = :year", { year });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    return await query.groupBy("ent.CO_MES").orderBy("CO_MES", "ASC").getRawMany();
  }

  public async getVlAgregadoByYearAndProduct(shType: string, year: number, productName: string, uf?: string): Promise<{ CO_MES: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_AGREGADO)", "total_agregado")
      .where(`ent.CO_ANO = :year AND ent.${shType} = :productName`, { year, productName });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    return await query.groupBy("ent.CO_MES").orderBy("ent.CO_MES", "ASC").getRawMany();
  }

  public async getKgLiquidoByYearAndProduct(shType: string, year: number, productName: string, uf?: string): Promise<{ CO_MES: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where(`ent.CO_ANO = :year AND ent.${shType} = :productName`, { year, productName });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    return await query.groupBy("ent.CO_MES").orderBy("CO_MES", "ASC").getRawMany();
  }

  public async getVlFobByYearAndProduct(shType: string, year: number, productName: string, uf?: string): Promise<{ CO_MES: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where(`ent.CO_ANO = :year AND ent.${shType} = :productName`, { year, productName });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    return await query.groupBy("ent.CO_MES").orderBy("CO_MES", "ASC").getRawMany();
  }

  // --- ByYearRange ---
  public async getFatByYearRange(startYear: number, endYear: number, uf?: string): Promise<number> {
    const repo = AppDataSource.getRepository(this.entity);
    const queryBuilder = repo
      .createQueryBuilder("ent")
      .select("ent.CO_FAT_AGREG", "co_fat_agreg")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear });

    if (uf) {
      queryBuilder.andWhere("ent.SG_UF = :uf", { uf });
    }

    const result = await queryBuilder.groupBy("ent.CO_FAT_AGREG").orderBy("SUM(ent.QTD_REGISTROS)", "DESC").getRawOne();
    return result;
  }

  public async getProductByYearRange(sh: string, startYear: number, endYear: number, uf?: string): Promise<string> {
    const repo = AppDataSource.getRepository(this.entity);
    const query = repo.createQueryBuilder("ent").select(`ent.${sh}`, "no_sh").where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    const result = await query.groupBy(`ent.${sh}`).orderBy("SUM(ent.QTD_REGISTROS)", "DESC").getRawOne();

    return result;
  }

  public async getViaByYearRange(startYear: number, endYear: number, uf?: string): Promise<{ NO_VIA: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_VIA", "NO_VIA")
      .addSelect("SUM(ent.QTD_REGISTROS)", "total")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    const result = await query.groupBy("ent.NO_VIA").orderBy("total", "DESC").take(3).getRawMany();

    return result;
  }

  public async getUrfByYearRange(startYear: number, endYear: number, uf?: string): Promise<{ NO_URF: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_URF", "NO_URF")
      .addSelect("SUM(ent.QTD_REGISTROS)", "total")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    const result = await query.groupBy("ent.NO_URF").orderBy("total", "DESC").take(3).getRawMany();

    return result;
  }

  public async getVlAgregadoByYearRange(startYear: number, endYear: number, uf?: string): Promise<{ CO_ANO: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(ent.VL_AGREGADO)", "total_agregado")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    return await query.groupBy("ent.CO_ANO").orderBy("CO_ANO", "ASC").getRawMany();
  }

  public async getVlAgregadoByYearRangeAndProduct(
    shType: string,
    startYear: number,
    endYear: number,
    productName: string,
    uf?: string,
  ): Promise<{ CO_ANO: string; total_vl_agregado: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(ent.VL_AGREGADO)", "total_vl_agregado")
      .where(`ent.CO_ANO BETWEEN :startYear AND :endYear AND ent.${shType} = :productName`, {
        startYear,
        endYear,
        productName,
      });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    return await query.groupBy("ent.CO_ANO").orderBy("ent.CO_ANO", "ASC").getRawMany();
  }

  public async getKgLiquidoByYearRange(startYear: number, endYear: number, uf?: string): Promise<{ CO_ANO: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    return await query.groupBy("ent.CO_ANO").orderBy("CO_ANO", "ASC").getRawMany();
  }

  public async getKgLiquidoByYearRangeAndProduct(
    shType: string,
    startYear: number,
    endYear: number,
    productName: string,
    uf?: string,
  ): Promise<{ CO_ANO: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where(`ent.CO_ANO BETWEEN :startYear AND :endYear AND ent.${shType} = :productName`, {
        startYear,
        endYear,
        productName,
      });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    return await query.groupBy("ent.CO_ANO").orderBy("CO_ANO", "ASC").getRawMany();
  }

  public async getVlFobByYearRange(startYear: number, endYear: number, uf?: string): Promise<{ CO_ANO: string; total: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear });

    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }

    return await query.groupBy("ent.CO_ANO").orderBy("CO_ANO", "ASC").getRawMany();
  }

public async getVlFobByYearRangeAndProduct(
  shType: string,
  startYear: number,
  endYear: number,
  productName: string,
  uf?: string,
): Promise<{ CO_ANO: string; total: number }[]> {
  const query = AppDataSource.getRepository(this.entity)
    .createQueryBuilder("ent")
    .select("ent.CO_ANO", "CO_ANO")
    .addSelect("SUM(VL_FOB)", "total_vl_fob")
    .where(`ent.CO_ANO BETWEEN :startYear AND :endYear AND ent.${shType} = :productName`, {
      startYear,
      endYear,
      productName,
    });

  if (uf) {
    query.andWhere("ent.SG_UF = :uf", { uf });
  }

  return await query
    .groupBy("ent.CO_ANO")
    .orderBy("CO_ANO", "ASC")
    .getRawMany();
} 

  public async getOverallCountriesByYear(
    year: number, 
    uf?: string
  ): Promise<{ NO_PAIS: string; total_registros: number; TOTAL_VL_AGREGADO: number; TOTAL_KG_LIQUIDO: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_PAIS", "NO_PAIS")
      .addSelect("COUNT(*)", "TOTAL_REGISTROS")
      .addSelect("SUM(ent.VL_AGREGADO)", "TOTAL_VL_AGREGADO")
      .addSelect("SUM(ent.KG_LIQUIDO)", "TOTAL_KG_LIQUIDO")
      .where("ent.CO_ANO = :year", { year });
  
    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }
  
    const result = await query
      .groupBy("ent.NO_PAIS")
      .addGroupBy("ent.CO_ANO")
      .orderBy("total_registros", "DESC")
      .addOrderBy("ent.NO_PAIS", "DESC")
      .getRawMany();
  
    return result;
  }
  
  public async getOverallCountriesByYearRange(
    startYear: number, 
    endYear: number,
    uf?: string
  ): Promise<{ NO_PAIS: string; total_registros: number; TOTAL_VL_AGREGADO: number; TOTAL_KG_LIQUIDO: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_PAIS", "NO_PAIS")
      .addSelect("COUNT(*)", "TOTAL_REGISTROS")
      .addSelect("SUM(ent.VL_AGREGADO)", "TOTAL_VL_AGREGADO")
      .addSelect("SUM(ent.KG_LIQUIDO)", "TOTAL_KG_LIQUIDO")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear });
  
    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }
  
    const result = await query
      .groupBy("ent.NO_PAIS")
      .addGroupBy("ent.CO_ANO")
      .orderBy("total_registros", "DESC")
      .addOrderBy("ent.NO_PAIS", "DESC")
      .getRawMany();
  
    return result;
  }

  public async getOverallCountriesByYearAndProduct(
    year: number, 
    shType: string,
    productName: string,
    uf?: string
  ): Promise<{ NO_PAIS: string; total_registros: number; TOTAL_VL_AGREGADO: number; TOTAL_KG_LIQUIDO: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_PAIS", "NO_PAIS")
      .addSelect("COUNT(*)", "TOTAL_REGISTROS")
      .addSelect("SUM(ent.VL_AGREGADO)", "TOTAL_VL_AGREGADO")
      .addSelect("SUM(ent.KG_LIQUIDO)", "TOTAL_KG_LIQUIDO")
      .where(`ent.CO_ANO = :year AND ent.${shType} = :productName`, { year, productName });
  
    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }
  
    const result = await query
      .groupBy("ent.NO_PAIS")
      .addGroupBy("ent.CO_ANO")
      .orderBy("total_registros", "DESC")
      .addOrderBy("ent.NO_PAIS", "DESC")
      .getRawMany();
  
    return result;
  }

  public async getOverallCountriesByYearRangeAndProduct(
    startYear: number,
    endYear: number, 
    shType: string,
    productName: string,
    uf?: string
  ): Promise<{ NO_PAIS: string; total_registros: number; TOTAL_VL_AGREGADO: number; TOTAL_KG_LIQUIDO: number }[]> {
    const query = AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_PAIS", "NO_PAIS")
      .addSelect("COUNT(*)", "TOTAL_REGISTROS")
      .addSelect("SUM(ent.VL_AGREGADO)", "TOTAL_VL_AGREGADO")
      .addSelect("SUM(ent.KG_LIQUIDO)", "TOTAL_KG_LIQUIDO")
      .where(`ent.CO_ANO BETWEEN :startYear AND :endYear AND ent.${shType} = :productName`, { startYear, endYear, productName });
  
    if (uf) {
      query.andWhere("ent.SG_UF = :uf", { uf });
    }
  
    const result = await query
      .groupBy("ent.NO_PAIS")
      .addGroupBy("ent.CO_ANO")
      .orderBy("total_registros", "DESC")
      .addOrderBy("ent.NO_PAIS", "DESC")
      .getRawMany();
  
    return result;
  }
}
