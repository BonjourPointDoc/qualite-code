import { CivilStatusService } from './civilStatusService';
import { CivilStatus } from '../domain/civilStatus';

describe('CivilStatusService', () => {
    let mockRepo: {
        findAll: jest.Mock<Promise<CivilStatus[]>, []>;
        findById: jest.Mock<Promise<CivilStatus | null>, [number]>;
        save: jest.Mock<Promise<CivilStatus>, [Omit<CivilStatus, 'id'>]>;
        update: jest.Mock<Promise<CivilStatus>, [CivilStatus]>;
        delete: jest.Mock<Promise<number | null>, [number]>;
    };
    let service: CivilStatusService;

    beforeEach(() => {
        mockRepo = {
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        service = new CivilStatusService(mockRepo);
    });

    it('listCivilStatus retourne la liste fournie par le repo', async () => {
        const sample: CivilStatus[] = [
            new CivilStatus("Doe", "John", "Tours", "12/01/2026"),
            new CivilStatus("Doe", "Jane", "Alès", "13/01/2026"),
        ];
        mockRepo.findAll.mockResolvedValue(sample);
        await expect(service.listCivilStatus()).resolves.toEqual(sample);
        expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
    });

    it('getCivilStatus retourne l\'état civil quand il existe', async () => {
        const testCivilStatus = new CivilStatus("Doe", "John", "Tours","12/01/2026", 0);
        mockRepo.findById.mockResolvedValue(testCivilStatus);
        await expect(service.getCivilStatus(0)).resolves.toEqual(testCivilStatus);
        expect(mockRepo.findById).toHaveBeenCalledWith(0);
    });

    it('getCivilStatus retourne null quand l\'état civil est introuvable', async () => {
        mockRepo.findById.mockResolvedValue(null);
        await expect(service.getCivilStatus(-1)).resolves.toBeNull();
        expect(mockRepo.findById).toHaveBeenCalledWith(-1);
    });

    it('createCivilStatus appelle save et retourne l\'état civil créé', async () => {
        const input = new CivilStatus("Doe", "John", "Tours", "12/01/2026");
        const { last_name, first_name, birthplace, birthday } = input;
        const saved = new CivilStatus(last_name, first_name, birthplace, birthday, 2);
        expect(saved).toHaveProperty('id');
        mockRepo.save.mockResolvedValue(saved);
        await expect(service.createCivilStatus(input)).resolves.toEqual(saved);
        expect(mockRepo.save).toHaveBeenCalledWith(input);
    });

    it('updateCivilStatus appelle update et retourne l\'état civil mis à jour', async () => {
        const sample: CivilStatus[] = [
            new CivilStatus("Doe", "John", "Tours", "12/01/2026", 0),
            new CivilStatus("Doe", "Jane", "Alès","13/01/2026", 1),
        ];
        const input = new CivilStatus("Doe", "Johnathan", "Toulon", "12/01/2026", 0);

        mockRepo.findAll.mockResolvedValue(sample);
        mockRepo.update.mockResolvedValue(input);

        await expect(service.updateCivilStatus(input)).resolves.toEqual(input);
        expect(mockRepo.update).toHaveBeenCalledTimes(1);
        expect(mockRepo.update).toHaveBeenCalledWith(input);
    });

    it('deleteCivilStatus appelle delete et retourne l\'état civil supprimé', async () => {
        const sample: CivilStatus[] = [
            new CivilStatus("Doe", "John", "Tours", "12/01/2026", 0),
            new CivilStatus("Doe", "Jane", "Alès", "13/01/2026", 1),
        ];
        mockRepo.findAll.mockResolvedValue(sample);
        mockRepo.delete.mockResolvedValue(1);

        await expect(service.deleteCivilStatus(1)).resolves.toEqual(1);
        expect(mockRepo.delete).toHaveBeenCalledTimes(1);
        expect(mockRepo.delete).toHaveBeenCalledWith(1);
    });

    it('deleteCivilStatus retourne null si l\'état civil n\'existe pas', async () => {
        const sample: CivilStatus[] = [
            new CivilStatus("Doe", "John", "Tours","12/01/2026", 0),
            new CivilStatus("Doe", "Jane", "Alès","13/01/2026", 1),
        ];
        mockRepo.findAll.mockResolvedValue(sample);
        mockRepo.delete.mockResolvedValue(null);

        await expect(service.deleteCivilStatus(2)).resolves.toBeNull();
        expect(mockRepo.delete).toHaveBeenCalledWith(2);
    })
});
