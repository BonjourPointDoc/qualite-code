import { CivilStatus } from '../../domain/civilStatus';
import { ProfessionalData } from '../../domain/professionalData';

export interface CivilStatusRepositoryPort {
  findAll(): Promise<CivilStatus[]>;
  findById(id: number): Promise<CivilStatus | null>;
  save(civil_status: Omit<CivilStatus, 'id'>): Promise<CivilStatus>;
  update(civil_status: CivilStatus): Promise<CivilStatus | null>;
  delete(id: number): Promise<CivilStatus | null>;
}

export interface ProfessionalDataRepositoryPort {
  findAll(): Promise<ProfessionalData[]>;
  findById(id: number): Promise<ProfessionalData | null>;
  save(professional_data: Omit<ProfessionalData, 'id'>): Promise<ProfessionalData>;
  update(professional_data: ProfessionalData): Promise<ProfessionalData>;
  delete(id: number): Promise<ProfessionalData | null>;
}