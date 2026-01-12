import { ProfessionalData } from '../../domain/professionalData';

export interface ProfessionalDataPort {
    listProfessionalData(): Promise<ProfessionalData[]>;
    getProfessionalData(id: string): Promise<ProfessionalData | null>;
    createProfessionalData(input: Omit<ProfessionalData, 'id'>): Promise<ProfessionalData>;
}