import {CivilStatusPort} from "../ports/driving/civilStatusPort";
import {CivilStatusRepositoryPort} from "../ports/driven/repoPort";
import {CivilStatus} from "../domain/civilStatus";

export class CivilStatusService implements CivilStatusPort {
    constructor(private repo: CivilStatusRepositoryPort) {}

    async listCivilStatus(): Promise<CivilStatus[]> {
        return this.repo.findAll();
    }

    async getCivilStatus(id: number): Promise<CivilStatus | null> {
        return this.repo.findById(id);
    }

    async createCivilStatus(input: Omit<CivilStatus, 'id'>): Promise<CivilStatus> {
        return this.repo.save(input);
    }
}