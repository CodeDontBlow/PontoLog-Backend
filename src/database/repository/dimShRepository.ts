import { AppDataSource } from "..";
import DimSh from "../models/dimSh";

export default class DimShRepository {

  public async getProductByLetter(sh: string, letter: string): Promise<string[]> {
    const result = await AppDataSource.getRepository(DimSh)
      .createQueryBuilder("ent")
      .select(`ent.${sh}`)
      .where(`ent.${sh} LIKE :letter`, { letter: `${letter}%` })
      .distinct(true)
      .take(15)
      .orderBy(`ent.${sh}`, "ASC")
      .getRawMany();
    return result.map((i) => i[sh]);
  }
}
