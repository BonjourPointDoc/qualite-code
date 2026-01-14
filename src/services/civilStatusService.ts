import {CivilStatusPort} from "../ports/driving/civilStatusPort";
import {CivilStatusRepositoryPort} from "../ports/driven/repoPort";
import {CivilStatus} from "../domain/civilStatus";
import {ProfessionalData} from "../domain/professionalData";

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

    async updateCivilStatus(input: CivilStatus): Promise<CivilStatus | null> {
        return this.repo.update(input);
    }

    async deleteCivilStatus(id: number): Promise<number | null> {
        return this.repo.delete(id);
    }

    // async getWorthOfCivilStatus(id: number): Promise<ProfessionalData | null> {
    //     // return this.repo.findWorthOfCivilStatus(id);
    //     return null;
    // }
}