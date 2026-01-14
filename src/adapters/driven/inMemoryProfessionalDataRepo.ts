import { ProfessionalDataRepositoryPort} from '../../ports/driven/repoPort';
import {ProfessionalData} from "../../domain/professionalData";
import {randomInt} from "node:crypto";
import {ProfessionalDataService} from "../../services/professionalDataService";

const store: ProfessionalData[] = [];

export class InMemoryProfessionalDataRepo implements ProfessionalDataRepositoryPort {
    async findAll(): Promise<ProfessionalData[]> {
        return store.slice();
    }

    async findById(id: number): Promise<ProfessionalData | null> {
        const found = store.find((s) => s.id === id);
        return found ?? null;
    }

    async save(professionalData: Omit<ProfessionalData, 'id'>): Promise<ProfessionalData> {
        const newProfessionalData:ProfessionalData = new ProfessionalData(
            professionalData.civil_status_id as number,
            professionalData.situation,
            professionalData.company,
            professionalData.salary,
            professionalData.contract,
            professionalData.hours_per_day,
            professionalData.overtime,
            professionalData.paid_overtime,
            store.length
        )
        store.push(newProfessionalData);
        return newProfessionalData;
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

    async findByCivilStatusId(id: number): Promise<ProfessionalData | null> {
        return null;
    }
}
