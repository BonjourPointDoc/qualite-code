import { Address } from '../domain/address';
import { AddressRepositoryPort } from '../ports/driven/repoPort';
import { AddressPort } from "../ports/driving/addressPort";

import { CivilStatus } from '../domain/civilStatus';
import { CivilStatusRepositoryPort } from '../ports/driven/repoPort';
import { CivilStatusPort } from "../ports/driving/civilStatusPort";

import { ProfessionalData } from '../domain/professionalData';
import { ProfessionalDataRepositoryPort } from '../ports/driven/repoPort';
import { ProfessionalDataPort } from "../ports/driving/professionalDataPort";

export class AddressService implements AddressPort {
  constructor(private repo: AddressRepositoryPort) {}

  async listAddresses(): Promise<Address[]> {
     return this.repo.findAll();
  }

  async getAddress(id: string): Promise<Address | null> {
    return this.repo.findById(id);
  }

  async createAddress(input: Omit<Address, 'id'>): Promise<Address> {
    // Business rules could be applied here
    return this.repo.save(input);
  }
}

export class CivilStatusService implements CivilStatusPort {
  constructor(private repo: CivilStatusRepositoryPort) {}

  async listCivilStatus(): Promise<CivilStatus[]> {
    return this.repo.findAll();
  }

  async getCivilStatus(id: string): Promise<CivilStatus | null> {
    return this.repo.findById(id);
  }

  async createCivilStatus(input: Omit<CivilStatus, 'id'>): Promise<CivilStatus> {
    return this.repo.save(input);
  }
}

export class ProfessionalDataService implements ProfessionalDataPort {
  constructor(private repo: ProfessionalDataRepositoryPort) {}

  async listProfessionalData(): Promise<ProfessionalData[]> {
    return this.repo.findAll();
  }

  async getProfessionalData(id: string): Promise<ProfessionalData | null> {
    return this.repo.findById(id);
  }

  async createProfessionalData(input: ProfessionalData): Promise<ProfessionalData> {
    return this.repo.save(input);
  }
}
