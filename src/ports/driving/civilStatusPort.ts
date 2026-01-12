import { CivilStatus } from '../../domain/civilStatus';

export interface CivilStatusPort {
    listCivilStatus(): Promise<CivilStatus[]>;
    getCivilStatus(id: string): Promise<CivilStatus | null>;
    createCivilStatus(input: Omit<CivilStatus, 'id'>): Promise<CivilStatus>;
}