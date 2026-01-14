import { CivilStatusRepositoryPort} from '../../ports/driven/repoPort';
import {CivilStatus} from "../../domain/civilStatus";
import {RunResult} from "sqlite3";
const db = require('../../../db');

class CivilStatusRepo implements CivilStatusRepositoryPort {
    async findAll(): Promise<CivilStatus[]> {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM CivilStatus', (err:any, rows:any) => {
                if(err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    async findById(id: number): Promise<CivilStatus | null> {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM CivilStatus where id=(?)',id, (err:any, rows:any) => {
                if(err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    async save(civilStatus: Omit<CivilStatus, 'id'>): Promise<CivilStatus> {
        let returnValue:CivilStatus = civilStatus;
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO CivilStatus (last_name, first_name, birthplace, birthday) VALUES (?, ?, ?, ?)`,
                [
                    civilStatus.last_name,
                    civilStatus.first_name,
                    civilStatus.birthplace,
                    civilStatus.birthday
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

    async update(newCivilStatus: CivilStatus): Promise<CivilStatus | null> {
        return new Promise((resolve, reject) => {
            db.run('UPDATE CivilStatus SET last_name = (?), first_name = (?), birthplace = (?), birthday = (?) where id = (?)',
                [newCivilStatus.last_name, newCivilStatus.first_name, newCivilStatus.birthplace, newCivilStatus.birthday, newCivilStatus.id],
                (err:any) => {
                if(err)
                    reject(err);
                else
                    resolve(newCivilStatus);
            });
        })
    }

    async delete(id: number): Promise<number | null> {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM CivilStatus WHERE id = (?)', id, (err:any) => {
                if(err)
                    reject(err);
                else
                    resolve(id);
            });
        });
    }

    async findWorthOfCivilStatus(id: number): Promise<number | null> {
        // const found = store.find((s) => s.id === id);
        // if(found !== undefined){
        //     let ageDifMs = Date.now() - found.birthday.getTime();
        //     let ageDate = new Date(ageDifMs);
        //     const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        //     return age;
        // }
        return null
    }
}
export default CivilStatusRepo