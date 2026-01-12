import { ProfessionalData } from '../../domain/professionalData';

export interface ProfessionalDataPort {
    listProfessionalData(): Promise<ProfessionalData[]>;
    getProfessionalData(id: number): Promise<ProfessionalData | null>;
    createProfessionalData(input: Omit<ProfessionalData, 'id'>): Promise<ProfessionalData>;
}