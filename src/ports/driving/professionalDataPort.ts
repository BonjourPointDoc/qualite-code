import { ProfessionalData } from '../../domain/professionalData';

export interface ProfessionalDataPort {
    listProfessionalData(): Promise<ProfessionalData[]>;
    getProfessionalData(id: number): Promise<ProfessionalData | null>;
    createProfessionalData(input: Omit<ProfessionalData, 'id'>): Promise<ProfessionalData>;
    updateProfessionalData(input: ProfessionalData): Promise<ProfessionalData | null>;
    deleteProfessionalData(id: number): Promise<number | null>;
}