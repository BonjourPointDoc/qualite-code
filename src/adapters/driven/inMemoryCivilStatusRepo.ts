import { CivilStatusRepositoryPort} from '../../ports/driven/repoPort';
import {CivilStatus} from "../../domain/civilStatus";
import {randomInt} from "node:crypto";
import {ProfessionalData} from "../../domain/professionalData";
import civilStatusController from "../driving/civilStatusController";

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
        const newCivilStatus: CivilStatus = { id: store.length, ...civilStatus };
        store.push(civilStatus);
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
}
export default InMemoryCivilStatusRepo