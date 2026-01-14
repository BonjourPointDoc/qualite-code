import { CivilStatusRepositoryPort} from '../../ports/driven/repoPort';
import {CivilStatus} from "../../domain/civilStatus";

const store: CivilStatus[] = [];

class InMemoryCivilStatusRepo implements CivilStatusRepositoryPort {
    async findAll(): Promise<CivilStatus[]> {
        return store.slice();
    }

    async findById(id: number): Promise<CivilStatus | null> {
        const found = store.find((s) => s.id === id);
        return found ?? null;
    }

    async save(civilStatus: Omit<CivilStatus, 'id'>): Promise<CivilStatus> {
        const newCivilStatus:CivilStatus = new CivilStatus(
            civilStatus.last_name,
            civilStatus.first_name,
            civilStatus.birthplace,
            civilStatus.birthday,
            store.length
        );
        store.push(newCivilStatus);
        return newCivilStatus;
    }

    async update(newCivilStatus: CivilStatus): Promise<CivilStatus | null> {
        const foundIndex = store.findIndex(x => x.id == newCivilStatus.id);
        if(foundIndex > -1) {
            store[foundIndex] = newCivilStatus;
            return newCivilStatus;
        }
        return null
    }

    async delete(id: number): Promise<CivilStatus | null> {
        const foundIndex = store.findIndex(x => x.id == id);
        if(foundIndex > -1) {
            let deletedCivilStatus: CivilStatus = store[foundIndex];
            store.splice(foundIndex, 1);
            return deletedCivilStatus;
        }
        return null
    }

    async findWorthOfCivilStatus(id: number): Promise<number | null> {
        const found = store.find((s) => s.id === id);
        if(found !== undefined){
            let ageDifMs = Date.now() - found.birthday.getTime();
            let ageDate = new Date(ageDifMs);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);
            return age;
        }
        return null
    }
}
export default InMemoryCivilStatusRepo