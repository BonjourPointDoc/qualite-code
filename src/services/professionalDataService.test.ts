import { ProfessionalDataService } from './professionalDataService';
import {ProfessionalData } from "../domain/professionalData";

describe('ProfessionalDataService', () => {
    let mockRepo: {
        findAll: jest.Mock<Promise<ProfessionalData[]>, []>;
        findById: jest.Mock<Promise<ProfessionalData | null>, [number]>;
        save: jest.Mock<Promise<ProfessionalData>, [Omit<ProfessionalData, 'id'>]>;
        update: jest.Mock<Promise<ProfessionalData>, [ProfessionalData]>;
        delete: jest.Mock<Promise<ProfessionalData | null>, [number]>;
    };
    let service: ProfessionalDataService;

    beforeEach(() => {
        mockRepo = {
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        service = new ProfessionalDataService(mockRepo);
    });

    it('listProfessionalData retourne la liste fournie par le repo', async () => {
        const sample: ProfessionalData[] = [new ProfessionalData(0, "Engineer", "Capgemini", "2300", "CDI", 7, 0, 0),
                                            new ProfessionalData(0, "Taxi Driver", "Uber", "1500", "CDI", 7, 0, 0)]
        mockRepo.findAll.mockResolvedValue(sample);
        await expect(service.listProfessionalData()).resolves.toEqual(sample);
        expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
    });

    it('getProfessionalData retourne la donnée professionelle quand elle existe', async () => {
        const addr = new ProfessionalData(0, "Engineer", "Capgemini", "2300", "CDI", 7, 0, 0);
        mockRepo.findById.mockResolvedValue(addr);
        await expect(service.getProfessionalData(0)).resolves.toEqual(addr);
        expect(mockRepo.findById).toHaveBeenCalledWith(0);
    });

    it('getAddress retourne null quand la donnée professionelle est introuvable', async () => {
        mockRepo.findById.mockResolvedValue(null);
        await expect(service.getProfessionalData(0)).resolves.toBeNull();
        expect(mockRepo.findById).toHaveBeenCalledWith(0);
    });

    it('createProfessionalData appelle save et retourne la donnée professionelle créée', async () => {
        const input = new ProfessionalData(0, "Engineer", "Capgemini", "2300", "CDI", 7, 0, 0);
        const { civil_status_id, situation, company, salary, contract, hours_per_day, overtime, paid_overtime } = input;
        const saved = new ProfessionalData(civil_status_id as number, situation, company, salary, contract, hours_per_day, overtime, paid_overtime, 0);
        mockRepo.save.mockResolvedValue(saved);
        await expect(service.createProfessionalData(input)).resolves.toEqual(saved);
        expect(mockRepo.save).toHaveBeenCalledWith(input);
    });

    it('UpdateProfessionalData appelle update et retourne la donnée professionelle supprimer', async () => {
        const sample: ProfessionalData[] = [new ProfessionalData(0, "Engineer", "Capgemini", "2300", "CDI", 7, 0, 0, 0),
                                            new ProfessionalData(0, "Taxi Driver", "Uber", "1500", "CDI", 7, 0, 0, 1)]
        mockRepo.findAll.mockResolvedValue(sample);

        const input = new ProfessionalData(0, "Engineer", "Capgemini", "2300", "CDI", 7, 0, 0, 0);
        const { civil_status_id, situation, company, salary, contract, hours_per_day, overtime, paid_overtime, id } = input;
        const update = new ProfessionalData(civil_status_id as number, situation, company, salary, contract, hours_per_day, overtime, paid_overtime, id);
        mockRepo.update.mockResolvedValue(update);

        await expect(service.updateProfessionalData(input)).resolves.toEqual(update);
        expect(mockRepo.update).toHaveBeenCalledWith(input);
    });

    it('DeleteProfessionalData appelle delete et retourne null si la donnée professionelle n\'existe pas', async () => {
        const sample: ProfessionalData[] = [new ProfessionalData(0, "Engineer", "Capgemini", "2300", "CDI", 7, 0, 0, 0),
                                            new ProfessionalData(0, "Taxi Driver", "Uber", "1500", "CDI", 7, 0, 0, 1)]
        mockRepo.findAll.mockResolvedValue(sample);

        mockRepo.delete.mockResolvedValue(null);
        await expect(service.deleteProfessionalData(2)).resolves.toBeNull();
        expect(mockRepo.delete).toHaveBeenCalledWith(2);
    });
});