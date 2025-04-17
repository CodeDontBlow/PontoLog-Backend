import { EntityTarget } from "typeorm";
import { AppDataSource } from "..";
import BalancoComercial from "../models/BalancoComercial";

export default class BalancoRepository{

    private entity: EntityTarget<BalancoComercial>;

    constructor(entity: EntityTarget<BalancoComercial>) {
      this.entity = entity;
    }

    
    public async getBalancoComercialByYear(startYear: number, uf?: string): Promise<number> {
      const repo = AppDataSource.getRepository(this.entity);
      const queryBuilder = repo.createQueryBuilder("ent")
        .select("SUM(ent.balanca_comercial)", "balanca_comercial") // ou AVG, MAX etc.
        .where("ent.ano = :startYear", { startYear });
    
      if (uf) {
        queryBuilder.andWhere("ent.siglaUf = :uf", { uf });
      }
    
      const result = await queryBuilder.getRawOne();
      return result?.balanca_comercial ?? 0;
    }
}