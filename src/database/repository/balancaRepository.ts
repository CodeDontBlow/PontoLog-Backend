import { Entity } from "typeorm";
import { AppDataSource } from "..";
import Balanca from "../models/balanca"

export default class BalancaRepository {
  public async getBalancoComercialByYear(
    year: number,
    month?: number,
    uf?: string
  ): Promise<{ total: number }> {
    const query = AppDataSource.getRepository(Balanca)
      .createQueryBuilder("ent")
      .select("SUM(ent.balanca_comercial)", "total")
      .where("ent.co_ano = :year", { year });
  
    if (uf) {
      query.andWhere("ent.sg_uf = :uf", { uf });
    }
  
    if (month) {
      query.andWhere("ent.co_mes = :month", { month });
    }
  
    const result = await query.getRawOne();
  
    return result;
  }
}