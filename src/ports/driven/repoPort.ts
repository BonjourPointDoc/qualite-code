import { Address } from '../../domain/address';
import { CivilStatus } from '../../domain/civilStatus';
import { ProfessionalData } from '../../domain/professionalData';

export interface AddressRepositoryPort {
  findAll(): Promise<Address[]>;
  findById(id: string): Promise<Address | null>;
  save(address: Omit<Address, 'id'>): Promise<Address>;
}

export interface CivilStatusRepositoryPort {
  findAll(): Promise<CivilStatus[]>;
  findById(id: number): Promise<CivilStatus | null>;
  save(civil_status: Omit<CivilStatus, 'id'>): Promise<CivilStatus>;
}

export interface ProfessionalDataRepositoryPort {
  findAll(): Promise<ProfessionalData[]>;
  findById(id: number): Promise<ProfessionalData | null>;
  save(professional_data: Omit<ProfessionalData, 'id'>): Promise<ProfessionalData>;
}