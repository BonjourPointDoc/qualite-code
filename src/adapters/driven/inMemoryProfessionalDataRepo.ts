import { ProfessionalDataRepositoryPort} from '../../ports/driven/repoPort';
import {ProfessionalData} from "../../domain/professionalData";
import {randomInt} from "node:crypto";

const store: ProfessionalData[] = [];

export class InMemoryProfessionalDataRepo implements ProfessionalDataRepositoryPort {
    async findAll(): Promise<ProfessionalData[]> {
        return store.slice();
    }

    async findById(id: number): Promise<ProfessionalData | null> {
        const found = store.find((s) => s.id === id);
        return found ?? null;
    }

    async save(civilStatus: Omit<ProfessionalData, 'id'>): Promise<ProfessionalData> {
        const newCivilStatus: ProfessionalData = { id: store.length, ...civilStatus };
        store.push(newCivilStatus);
        return newCivilStatus;
    }

    async update(professionalData: ProfessionalData): Promise<ProfessionalData | null> {
        const foundIndex = store.findIndex(x => x.id === professionalData.id);
        if (foundIndex > -1) {
            store[foundIndex] = professionalData;
            return professionalData;
        }
        return null;
    }

    async delete(id: number): Promise<ProfessionalData | null> {
        const foundIndex = store.findIndex(x => x.id === id);
        if (foundIndex > -1) {
            let deletedProfessionalData: ProfessionalData = store[foundIndex];
            store.splice(foundIndex, 1);
            return deletedProfessionalData;
        }
        return null;
    }
}
