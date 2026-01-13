import { CivilStatus } from '../../domain/civilStatus';

export interface CivilStatusPort {
    listCivilStatus(): Promise<CivilStatus[]>;
    getCivilStatus(id: number): Promise<CivilStatus | null>;
    createCivilStatus(input: Omit<CivilStatus, 'id'>): Promise<CivilStatus>;
    updateCivilStatus(input: CivilStatus): Promise<CivilStatus | null>;
    deleteCivilStatus(id: number): Promise<CivilStatus | null>;
}