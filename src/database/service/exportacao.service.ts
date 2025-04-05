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
}
