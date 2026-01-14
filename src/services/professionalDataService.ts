import {ProfessionalDataPort} from "../ports/driving/professionalDataPort";
import {ProfessionalDataRepositoryPort} from "../ports/driven/repoPort";
import {ProfessionalData} from "../domain/professionalData";

export class ProfessionalDataService implements ProfessionalDataPort {
    constructor(private repo: ProfessionalDataRepositoryPort) {}

    async listProfessionalData(): Promise<ProfessionalData[]> {
        return this.repo.findAll();
    }

    async getProfessionalData(id: number): Promise<ProfessionalData | null> {
        return this.repo.findById(id);
    }

    async createProfessionalData(input: Omit<ProfessionalData, 'id'>): Promise<ProfessionalData> {
        return this.repo.save(input);
    }

    async updateProfessionalData(input: ProfessionalData): Promise<ProfessionalData | null> {
        return this.repo.update(input);
    }

    async deleteProfessionalData(id: number): Promise<number | null> {
        return this.repo.delete(id);
    }

    // async getProfessionalDataByCivilStatus(id: number): Promise<ProfessionalData | null> {
    //     return this.repo.findByCivilStatusId(id);
    // }
}