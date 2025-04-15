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
    const queryBuilder = repo.createQueryBuilder("ent").select("ent.CO_FAT_AGREG", "co_fat_agreg").where("ent.CO_ANO = :startYear", { startYear });
    if (uf) {
      queryBuilder.andWhere("ent.SG_UF = :uf", { uf });
    }
    const result = await queryBuilder.groupBy("ent.CO_FAT_AGREG").orderBy("COUNT(*)", "DESC").getRawOne();
    return result;
  }

  public async getProductByYear(sh: string, year: number): Promise<string> {
    const repo = AppDataSource.getRepository(this.entity);
    const result = await repo
      .createQueryBuilder("ent")
      .select(`ent.${sh}`, "no_sh")
      .where("ent.CO_ANO = :year", { year })
      .groupBy(`ent.${sh}`)
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();
    return result;
  }

  public async getViaByYear(year: number): Promise<{ NO_VIA: string; total: number }[]> {
    const result = await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_VIA", "NO_VIA")
      .addSelect("COUNT(*)", "total")
      .where("ent.CO_ANO = :year", { year })
      .groupBy("ent.NO_VIA")
      .orderBy("total", "DESC")
      .take(3)
      .getRawMany();
    return result;
  }

  public async getUrfByYear(year: number): Promise<{ NO_URF: string; total: number }[]> {
    const result = await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_URF", "NO_URF")
      .addSelect("COUNT(*)", "total")
      .where("ent.CO_ANO = :year", { year })
      .groupBy("ent.NO_URF")
      .orderBy("total", "DESC")
      .take(3)
      .getRawMany();
    return result;
  }

  public async getVlAgregadoByYear(year: number): Promise<{ CO_MES: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_AGREGADO)", "total_agregado")
      .where("ent.CO_ANO = :year", { year })
      .groupBy("ent.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
  }

  public async getKgLiquidoByYear(year: number): Promise<{ CO_MES: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where("ent.CO_ANO = :year", { year })
      .groupBy("ent.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
  }

  public async getVlFobByYear(year: number): Promise<{ CO_MES: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where("ent.CO_ANO = :year", { year })
      .groupBy("ent.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
  }

  public async getVlAgregadoByYearAndProduct(shType: string, year: number, productName: string): Promise<{ CO_MES: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_AGREGADO)", "total_agregado")
      .where(`ent.CO_ANO = :year AND ent.${shType} = :productName`, { year, productName })
      .groupBy("ent.CO_MES")
      .orderBy("ent.CO_MES", "ASC")
      .getRawMany();
  }

  public async getKgLiquidoByYearAndProduct(shType: string, year: number, productName: string): Promise<{ CO_MES: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where(`ent.CO_ANO = :year AND ent.${shType} = :productName`, { year, productName })
      .groupBy("ent.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
  }

  public async getVlFobByYearAndProduct(shType: string, year: number, productName: string): Promise<{ CO_MES: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where(`ent.CO_ANO = :year AND ent.${shType} = :productName`, { year, productName })
      .groupBy("ent.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
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
    const result = await queryBuilder.groupBy("ent.CO_FAT_AGREG").orderBy("COUNT(*)", "DESC").getRawOne();
    return result;
  }

  public async getProductByYearRange(sh: string, startYear: number, endYear: number): Promise<string> {
    const repo = AppDataSource.getRepository(this.entity);
    const result = await repo
      .createQueryBuilder("ent")
      .select(`ent.${sh}`, "no_sh")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy(`ent.${sh}`)
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();

    return result;
  }

  public async getViaByYearRange(startYear: number, endYear: number): Promise<{ NO_VIA: string; total: number }[]> {
    const result = await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_VIA", "NO_VIA")
      .addSelect("COUNT(*)", "total")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("ent.NO_VIA")
      .orderBy("total", "DESC")
      .take(3)
      .getRawMany();
    return result;
  }

  public async getUrfByYearRange(startYear: number, endYear: number): Promise<{ NO_URF: string; total: number }[]> {
    const result = await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.NO_URF", "NO_URF")
      .addSelect("COUNT(*)", "total")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("ent.NO_URF")
      .orderBy("total", "DESC")
      .take(3)
      .getRawMany();
    return result;
  }

  public async getVlAgregadoByYearRange(startYear: number, endYear: number): Promise<{ CO_ANO: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_AGREGADO)", "total_agregado")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
  }

  public async getVlAgregadoByYearRangeAndProduct(
    shType: string,
    startYear: number,
    endYear: number,
    productName: string,
  ): Promise<{ CO_ANO: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_AGREGADO)", "total_vl_agregado")
      .where(`ent.CO_ANO BETWEEN :startYear AND :endYear AND ent.${shType} = :productName`, {
        startYear,
        endYear,
        productName,
      })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
  }

  public async getKgLiquidoByYearRange(startYear: number, endYear: number): Promise<{ CO_ANO: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
  }

  public async getKgLiquidoByYearRangeAndProduct(
    shType: string,
    startYear: number,
    endYear: number,
    productName: string,
  ): Promise<{ CO_ANO: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where(`ent.CO_ANO BETWEEN :startYear AND :endYear AND ent.${shType} = :productName`, {
        startYear,
        endYear,
        productName,
      })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
  }

  public async getVlFobByYearRange(startYear: number, endYear: number): Promise<{ CO_ANO: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
  }

  public async getVlFobByYearRangeAndProduct(
    shType: string,
    startYear: number,
    endYear: number,
    productName: string,
  ): Promise<{ CO_ANO: string; total: number }[]> {
    return await AppDataSource.getRepository(this.entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where(`ent.CO_ANO BETWEEN :startYear AND :endYear AND ent.${shType} = :productName`, {
        startYear,
        endYear,
        productName,
      })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
  }
}
