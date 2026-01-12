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

    async createProfessionalData(input: ProfessionalData): Promise<ProfessionalData> {
        return this.repo.save(input);
    }
}