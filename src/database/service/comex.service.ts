import { EntityTarget } from "typeorm";
import { AppDataSource } from "..";

export default class ComexService {
  public static async getProductByLetter<T>(entity: EntityTarget<T>, shType: string, letter: string): Promise<string[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select(`ent.${shType}`)
      .where(`ent.${shType} LIKE :letter`, { letter: `${letter}%` })
      .distinct(true)
      .take(15)
      .orderBy(`ent.${shType}`, "ASC")
      .getRawMany();
    return result.map((i) => i[shType]);
  }

  public static async getFatByYear<T>(entity: EntityTarget<T>, year: number): Promise<number> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_FAT_AGREG", "co_fat_agreg")
      .where("ent.CO_ANO = :year", { year })
      .groupBy("ent.CO_FAT_AGREG")
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();
    return result;
  }

  public static async getFatByYearRange<T>(entity: EntityTarget<T>, startYear: number, endYear: number): Promise<number> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_FAT_AGREG", "co_fat_agreg")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("ent.CO_FAT_AGREG")
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();
    return result;
  }

  public static async getProductByYear<T>(entity: EntityTarget<T>, sh: string, year: number): Promise<string> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select(`ent.${sh}`, "no_sh")
      .where("ent.CO_ANO = :year", { year })
      .groupBy(`ent.${sh}`)
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();
    return result;
  }

  public static async getProductByYearRange<T>(entity: EntityTarget<T>, sh: string, startYear: number, endYear: number): Promise<string> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select(`ent.${sh}`, "no_sh")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy(`ent.${sh}`)
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();
    return result;
  }

  public static async getViaByYear<T>(entity: EntityTarget<T>, year: number, applyStateFilter: boolean, state: string): Promise<{ NO_VIA: string; total: number }[]> {
    const query = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.NO_VIA", "NO_VIA")
      .addSelect("COUNT(*)", "total")
      .where("ent.CO_ANO = :year", { year })

    if (applyStateFilter){
      query.andWhere("NO_UF = :state", {state})
    }

    const result = await query
      .groupBy("ent.NO_VIA")
      .orderBy("total", "DESC")
      .take(3)
      .getRawMany();
    return result;
  }

  public static async getViaByYearRange<T>(entity: EntityTarget<T>, startYear: number, endYear: number): Promise<{ NO_VIA: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
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

  public static async getUrfByYear<T>(entity: EntityTarget<T>, year: number): Promise<{ NO_URF: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
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

  public static async getUrfByYearRange<T>(entity: EntityTarget<T>, startYear: number, endYear: number): Promise<{ NO_URF: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
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

  public static async getVlAgregadoByYear<T>(entity: EntityTarget<T>, year: number): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_AGREGADO)", "total_agregado")
      .where("ent.CO_ANO = :year", { year })
      .groupBy("ent.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlAgregadoByYearRange<T>(entity: EntityTarget<T>, startYear: number, endYear: number): Promise<{ CO_ANO: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_AGREGADO)", "total_agregado")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlAgregadoByYearAndProduct<T>(
    entity: EntityTarget<T>,
    shType: string,
    year: number,
    productName: string,
  ): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_AGREGADO)", "total_agregado")
      .where(`ent.CO_ANO = :year AND ent.${shType} = :productName`, { year, productName })
      .groupBy("ent.CO_MES")
      .orderBy("ent.CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlAgregadoByYearRangeAndProduct<T>(
    entity: EntityTarget<T>,
    shType: string,
    startYear: number,
    endYear: number,
    productName: string,
  ): Promise<{ CO_ANO: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_AGREGADO)", "total_vl_agregado")
      .where(`ent.CO_ANO BETWEEN :startYear AND :endYear AND ent.${shType} = :productName`, { startYear, endYear, productName })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
    return result;
  }

  public static async getKgLiquidoByYear<T>(entity: EntityTarget<T>, year: number): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where("ent.CO_ANO = :year", { year })
      .groupBy("ent.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  public static async getKgLiquidoByYearRange<T>(entity: EntityTarget<T>, startYear: number, endYear: number): Promise<{ CO_ANO: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
    return result;
  }

  public static async getKgLiquidoByYearAndProduct<T>(
    entity: EntityTarget<T>,
    shType: string,
    year: number,
    productName: string,
  ): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where(`ent.CO_ANO = :year AND ent.${shType} = :productName`, { year, productName })
      .groupBy("ent.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  public static async getKgLiquidoByYearRangeAndProduct<T>(
    entity: EntityTarget<T>,
    shType: string,
    startYear: number,
    endYear: number,
    productName: string,
  ): Promise<{ CO_ANO: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where(`ent.CO_ANO BETWEEN :startYear AND :endYear AND ent.${shType} = :productName`, { startYear, endYear, productName })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlFobByYear<T>(entity: EntityTarget<T>, year: number): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where("ent.CO_ANO = :year", { year })
      .groupBy("ent.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlFobByYearRange<T>(entity: EntityTarget<T>, startYear: number, endYear: number): Promise<{ CO_ANO: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where("ent.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlFobByYearAndProduct<T>(
    entity: EntityTarget<T>,
    shType: string,
    year: number,
    productName: string,
  ): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_MES", "CO_MES")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where(`ent.CO_ANO = :year AND ent.${shType} = :productName`, { year, productName })
      .groupBy("ent.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlFobByYearRangeAndProduct<T>(
    entity: EntityTarget<T>,
    shType: string,
    startYear: number,
    endYear: number,
    productName: string,
  ): Promise<{ CO_ANO: string; total: number }[]> {
    const result = await AppDataSource.getRepository(entity)
      .createQueryBuilder("ent")
      .select("ent.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where(`ent.CO_ANO BETWEEN :startYear AND :endYear AND ent.${shType} = :productName`, { startYear, endYear, productName })
      .groupBy("ent.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
    return result;
  }
}
