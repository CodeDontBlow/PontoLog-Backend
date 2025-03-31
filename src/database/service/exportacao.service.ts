import { AppDataSource } from "..";
import Exportacao from "../models/Exportacao";

export default class ExportacaoService {
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

  //-------------        PRINCIPAL FATOR AGREGADO
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

  //-------------        PRINCIPAL PRODUTO
  public static async getProductByYear(sh: string, year: number): Promise<number> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select(`exp.${sh}`, "no_sh")
      .where("exp.CO_ANO = :year", { year })
      .groupBy(`exp.${sh}`)
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();
    return result;
  }

  public static async getProductByYearRange(sh: string, startYear: number, endYear: number): Promise<number> {
    const result = await AppDataSource.getRepository(Exportacao)
      .createQueryBuilder("exp")
      .select(`exp.${sh}`, "no_sh")
      .where("exp.CO_ANO BETWEEN :startYear AND :endYear", { startYear, endYear })
      .groupBy(`exp.${sh}`)
      .orderBy("COUNT(*)", "DESC")
      .getRawOne();
    return result;
  }
}
