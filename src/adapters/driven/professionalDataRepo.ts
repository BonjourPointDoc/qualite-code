import { ProfessionalDataRepositoryPort} from '../../ports/driven/repoPort';
import {ProfessionalData} from "../../domain/professionalData";
import {CivilStatus} from "../../domain/civilStatus";
import professionalDataController from "../driving/professionalDataController";
import {RunResult} from "sqlite3";
const db = require('../../../db');

export class ProfessionalDataRepo implements ProfessionalDataRepositoryPort {
    async findAll(): Promise<ProfessionalData[]> {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM ProfessionalData', (err:any, rows:any) => {
                if(err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
    async findById(id: number): Promise<ProfessionalData | null> {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM ProfessionalData where id=(?)',id, (err:any, rows:any) => {
                if(err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    async save(professionalData: Omit<ProfessionalData, 'id'>): Promise<ProfessionalData> {
        let returnValue: ProfessionalData = professionalData;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO ProfessionalData (civil_status_id, situation, company, salary, contract, hours_per_day,
                                               overtime, paid_overtime)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    professionalData.civil_status_id,
                    professionalData.situation,
                    professionalData.company,
                    professionalData.salary,
                    professionalData.contract,
                    professionalData.hours_per_day,
                    professionalData.overtime,
                    professionalData.paid_overtime,
                ],
                function (this: RunResult, err: Error | null) {
                    if (err) {
                        reject(err);
                    } else {
                        returnValue.id = this.lastID
                        resolve(returnValue);
                    }
                }
            );
        });
    }

    async update(newProfessionalData: ProfessionalData): Promise<ProfessionalData | null> {
        let returnValue:ProfessionalData = newProfessionalData;
        return new Promise((resolve, reject) => {
            db.run('UPDATE ProfessionalData SET civil_status_id = (?), situation = (?), company = (?), salary = (?), contract = (?), hours_per_day = (?), overtime = (?), paid_overtime = (?) where id = (?)',
                [newProfessionalData.civil_status_id, newProfessionalData.situation, newProfessionalData.company, newProfessionalData.salary, newProfessionalData.contract, newProfessionalData.hours_per_day, newProfessionalData.overtime, newProfessionalData.paid_overtime, newProfessionalData.id],
                (err:any, rows:any) => {
                    if(err)
                        reject(err);
                    else
                        resolve(newProfessionalData);
                });
        });
    }

    async delete(id: number): Promise<number | null> {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM ProfessionalData WHERE id = (?)', id, (err:any, rows:any) => {
                if(err)
                    reject(err);
                else
                    resolve(id);
            });
        });
    }

    async findByCivilStatusId(id: number): Promise<ProfessionalData | null> {
        return null;
    }
}
export default ProfessionalDataRepo;