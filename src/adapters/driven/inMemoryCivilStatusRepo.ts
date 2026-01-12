import { CivilStatusRepositoryPort} from '../../ports/driven/repoPort';
import {CivilStatus} from "../../domain/civilStatus";
import {randomInt} from "node:crypto";
import {ProfessionalData} from "../../domain/professionalData";
import civilStatusController from "../driving/civilStatusController";

const store: CivilStatus[] = [];

export class InMemoryCivilStatusRepo implements CivilStatusRepositoryPort {
    async findAll(): Promise<CivilStatus[]> {
        return store.slice();
    }

    async findById(id: number): Promise<CivilStatus | null> {
        const found = store.find((s) => s.id === id);
        return found ?? null;
    }

    async save(civilStatus: Omit<CivilStatus, 'id'>): Promise<CivilStatus> {
        const newCivilStatus: CivilStatus = { id: randomInt(1, 100), ...civilStatus };
        store.push(newCivilStatus);
        return newCivilStatus;
    }

    async update(civilStatus: CivilStatus): Promise<CivilStatus> {
        const updatedCivilStatus: CivilStatus = {...civilStatus}
        store.push(civilStatus);
        return updatedCivilStatus;
    }

    async delete(id: number): Promise<CivilStatus | null> {
        return null;
    }
}
