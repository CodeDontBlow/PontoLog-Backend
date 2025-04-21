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
        .select("SUM(ent.BALANCA_COMERCIAL)", "balanca_comercial") // ou AVG, MAX etc.
        .where("ent.ano = :startYear", { startYear });
    
      if (uf) {
        queryBuilder.andWhere("ent.siglaUf = :uf", { uf });
      }
    
      const result = await queryBuilder.getRawOne();
      return result?.balanca_comercial ?? 0;
    }

    public async getBalancoComercialByYearRange(startYear: number, endYear: number, uf?: string): Promise<number> {
      const repo = AppDataSource.getRepository(this.entity);
      const queryBuilder = repo
        .createQueryBuilder("ent")
        .select("ent.BALANCA_COMERCIAL", "balanca_comercial")
        .where("ent.ano BETWEEN :startYear AND :endYear", { startYear, endYear });
  
      if (uf) {
        queryBuilder.andWhere("ent.siglaUf = :uf", { uf });
      }
  
      const result = await queryBuilder.getRawOne();
      return result;
    }


    public async getBalancoComercialByMonth(startMonth: number, uf?: string): Promise<number> {
      const repo = AppDataSource.getRepository(this.entity);
      const queryBuilder = repo.createQueryBuilder("ent")
        .select("SUM(ent.BALANCA_COMERCIAL)", "balanca_comercial")
        .where("ent.CO_MES = :startMonth", { startMonth });
    
      if (uf) {
        queryBuilder.andWhere("ent.SG_UF = :uf", { uf });
      }
    
      const result = await queryBuilder.getRawOne();
      return result?.balanca_comercial ?? 0;
    }

    public async getBalancoComercialByMonthRange(year: number, startMonth: number, endMonth: number, uf?: string): Promise<number> {
      const repo = AppDataSource.getRepository(this.entity);
      const queryBuilder = repo
        .createQueryBuilder("ent")
        .select("ent.BALANCA_COMERCIAL", "balanca_comercial")
        .where("ent.mes BETWEEN :startMonth AND :endMonth", { startMonth, endMonth })
        .andWhere("ent.ano = :year", {year});
  
      if (uf) {
        queryBuilder.andWhere("ent.siglaUf = :uf", { uf });
      }
  
      const result = await queryBuilder.getRawOne();
      return result;
    }
    
}