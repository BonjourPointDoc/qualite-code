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
        const newCivilStatus: ProfessionalData = { id: randomInt(1, 100), ...civilStatus };
        store.push(newCivilStatus);
        return newCivilStatus;
    }
}
