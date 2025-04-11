import { AppDataSource } from "..";
import Exportacao from "../models/Exportacao";

export default class ExportacaoService {
  //Produto por letra
  public static async getProduct(shType: string, letter: string): Promise<string[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select(`exp.${shType}`)
      .where(`exp.${shType} LIKE :letter`, { letter: `${letter}%` })
      .distinct(true)
      .take(15)
      .orderBy(`exp.${shType}`, "ASC")
      .getRawMany();
    return result.map((i) => i[shType]);
  }

  //Principal fator agregado por ano
  public static async getFatByYear(year: number): Promise<number> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_FAT_AGREG", "co_fat_agreg")
      .where("exp.CO_ANO = :year", { year })
      .groupBy("exp.CO_FAT_AGREG")
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();
    return result;
  }
  //Principal fator agreagado por período de ano
  public static async getFatByYearRange(startYear: number, endYear: number): Promise<number> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_FAT_AGREG", "co_fat_agreg")
      .where("exp.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("exp.CO_FAT_AGREG")
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();
    return result;
  }

  //Principal produto sh4 ou sh6 por ano
  public static async getProductByYear(sh: string, year: number): Promise<string> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select(`exp.${sh}`, "no_sh")
      .where("exp.CO_ANO = :year", { year })
      .groupBy(`exp.${sh}`)
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();
    return result;
  }

  //Principal produto sh4 ou sh6 por período de ano a ano
  public static async getProductByYearRange(sh: string, startYear: number, endYear: number): Promise<string> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select(`exp.${sh}`, "no_sh")
      .where("exp.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy(`exp.${sh}`)
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();
    return result;
  }

  //Principais vias utilizadas no ano
  public static async getViaByYear(year: number): Promise<{ NO_VIA: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.NO_VIA", "NO_VIA")
      .addSelect("COUNT(*)", "total")
      .where("exp.CO_ANO = :year", { year })
      .groupBy("exp.NO_VIA")
      .orderBy("total", "DESC")
      .take(3)
      .getRawMany();
    return result;
  }

  //Principais vias utilizadas por período de ano até ano
  public static async getViaByYearRange(startYear: number, endYear: number): Promise<{ NO_VIA: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.NO_VIA", "NO_VIA")
      .addSelect("COUNT(*)", "total")
      .where("exp.CO_ANO BETWEEN :startYear AND :endYear ", { startYear, endYear })
      .groupBy("exp.NO_VIA")
      .orderBy("total", "DESC")
      .take(3)
      .getRawMany();
    return result;
  }
  //Principais urfs utilizadas no ano
  public static async getUrfByYear(year: number): Promise<{ NO_URF: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.NO_URF", "NO_URF")
      .addSelect("COUNT(*)", "total")
      .where("exp.CO_ANO = :year", { year })
      .groupBy("exp.NO_URF")
      .orderBy("total", "DESC")
      .take(3)
      .getRawMany();
    return result;
  }

  //Principais urfs utilizadas por período de ano até ano
  public static async getUrfByYearRange(startYear: number, endYear: number): Promise<{ NO_URF: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.NO_URF", "NO_URF")
      .addSelect("COUNT(*)", "total")
      .where("exp.CO_ANO BETWEEN :startYear AND :endYear ", { startYear, endYear })
      .groupBy("exp.NO_URF")
      .orderBy("total", "DESC")
      .take(3)
      .getRawMany();
    return result;
  }

  //------------------------------ INFO GERAL ----------------------------------------------------------------------//
  //VL_AGREGADO
  public static async getVlAgregadoByYearAndMonth(year: number): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_MES", "CO_MES")
      .addSelect("SUM(VL_AGREGADO)", "total_agregado")
      .where("exp.CO_ANO = :year", { year })
      .groupBy("exp.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlAgregadoByYear(startYear: number, endYear: number): Promise<{ CO_ANO: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_AGREGADO)", "total_agregado")
      .where("exp.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("exp.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlAgregadoByYearAndProduct(shType: string, year: number, productName: string): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_MES", "CO_MES")
      .addSelect("SUM(VL_AGREGADO)", "total_agregado")
      .where(`exp.CO_ANO = :year AND exp.${shType} = :productName`, { year, productName })
      .groupBy("exp.CO_MES")
      .orderBy("exp.CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  //KG_LIQUIDO
  public static async getKgLiquidoByYearAndMonth(year: number): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_MES", "CO_MES")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where("exp.CO_ANO = :year", { year })
      .groupBy("exp.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  public static async getKgLiquidoByYear(startYear: number, endYear: number): Promise<{ CO_ANO: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_ANO", "CO_ANO")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where("exp.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("exp.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
    return result;
  }

  public static async getKgLiquidoByYearAndProduct(shType: string, year: number, productName: string): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_MES", "CO_MES")
      .addSelect("SUM(KG_LIQUIDO)", "total_kg_liquido")
      .where(`exp.CO_ANO = :year AND exp.${shType} = :productName`, { year, productName })
      .groupBy("exp.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  //VL_FOB
  public static async getVlFobByYearAndMonth(year: number): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_MES", "CO_MES")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where("exp.CO_ANO = :year", { year })
      .groupBy("exp.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlFobByYear(startYear: number, endYear: number): Promise<{ CO_ANO: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where("exp.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy("exp.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlFobByYearAndProduct(shType: string, year: number, productName: string): Promise<{ CO_MES: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_MES", "CO_MES")
      .addSelect("SUM(VL_FOB)", "total_kg_liquido")
      .where(`exp.CO_ANO = :year AND exp.${shType} = :productName`, { year, productName })
      .groupBy("exp.CO_MES")
      .orderBy("CO_MES", "ASC")
      .getRawMany();
    return result;
  }

  public static async getVlFobByYearForYearAndProduct(shType: string, startYear: number, endYear: number, productName: string): Promise<{ CO_ANO: string; total: number }[]> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select("exp.CO_ANO", "CO_ANO")
      .addSelect("SUM(VL_FOB)", "total_vl_fob")
      .where(`exp.CO_ANO BETWEEN :startYear AND :endYear AND exp.${shType} = :productName`, {startYear, endYear, productName})
      .groupBy("exp.CO_ANO")
      .orderBy("CO_ANO", "ASC")
      .getRawMany()
      return result
  }

  public static async getKgLiquidoByYearForYearAndProduct(shType: string, startYear: number, endYear: number, productName: string): Promise<{ CO_ANO: string; total: number}[]>{
    const result = await AppDataSource.getRepository(Exportacao)
    .createQueryBuilder('exp')
    .select('exp.CO_ANO', 'CO_ANO')
    .addSelect('SUM(KG_LIQUIDO)', 'total_kg_liquido')
    .where(`exp.CO_ANO BETWEEN :startYear AND :endYear AND exp.${shType} = :productName`, {startYear, endYear, productName})
    .groupBy('exp.CO_ANO')
    .orderBy('CO_ANO', 'ASC')
    .getRawMany()
    return result
  }

  public static async getVlAgregadoByYearForYearAndProduct(shType: string, startYear: number, endYear: number, productName: string): Promise<{ CO_ANO: string; total: number}[]>{
    const result = await AppDataSource.getRepository(Exportacao)
    .createQueryBuilder('exp')
    .select('exp.CO_ANO', 'CO_ANO')
    .addSelect('SUM(VL_AGREGADO)', 'total_vl_agregado')
    .where(`exp.CO_ANO BETWEEN :startYear AND :endYear AND exp.${shType} = :productName`, {startYear, endYear, productName})
    .groupBy('exp.CO_ANO')
    .orderBy('CO_ANO', 'ASC')
    .getRawMany()
    return result
  }

}
