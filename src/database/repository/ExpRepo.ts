import { AppDataSource } from "..";
import Exp from "../models/Exp";

export default class ExpRepo {
  public static async getTotalByWeight(): Promise<number> {
    const column = "KG_LIQUIDO";
    return await AppDataSource.getRepository(Exp).createQueryBuilder().select(column).getCount();
  }

  public static async getDataByLetter(column: string, letter: string): Promise<string[]> {
    const result = await AppDataSource.getRepository(Exp)
      .createQueryBuilder()
      .select(column)
      .where(`${column} LIKE :letter`, { letter: `${letter}%` })
      .distinct(true)
      .take(5)
      .addOrderBy(column, "ASC")
      .getRawMany();
    return result.map((i) => i[column]);
  }
}
