"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const civilStatusService_1 = require("./civilStatusService");
const civilStatus_1 = require("../domain/civilStatus");
describe('CivilStatusService', () => {
    let mockRepo;
    let service;
    beforeEach(() => {
        mockRepo = {
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        service = new civilStatusService_1.CivilStatusService(mockRepo);
    });
    it('listCivilStatus retourne la liste fournie par le repo', async () => {
        const sample = [
            new civilStatus_1.CivilStatus("Doe", "John", "Tours", new Date("12/01/2026")),
            new civilStatus_1.CivilStatus("Doe", "Jane", "Alès", new Date("13/01/2026")),
        ];
        mockRepo.findAll.mockResolvedValue(sample);
        await expect(service.listCivilStatus()).resolves.toEqual(sample);
        expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
    });
    it('getCivilStatus retourne l\'état civil quand il existe', async () => {
        const testCivilStatus = new civilStatus_1.CivilStatus("Doe", "John", "Tours", new Date("12/01/2026"), 0);
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
        const input = new civilStatus_1.CivilStatus("Doe", "John", "Tours", new Date("12/01/2026"));
        const { last_name, first_name, birthplace, birthday } = input;
        const saved = new civilStatus_1.CivilStatus(last_name, first_name, birthplace, birthday, 2);
        expect(saved).toHaveProperty('id');
        mockRepo.save.mockResolvedValue(saved);
        await expect(service.createCivilStatus(input)).resolves.toEqual(saved);
        expect(mockRepo.save).toHaveBeenCalledWith(input);
    });
    it('updateCivilStatus appelle update et retourne l\'état civil mis à jour', async () => {
        const sample = [
            new civilStatus_1.CivilStatus("Doe", "John", "Tours", new Date("12/01/2026"), 0),
            new civilStatus_1.CivilStatus("Doe", "Jane", "Alès", new Date("13/01/2026"), 1),
        ];
        const input = new civilStatus_1.CivilStatus("Doe", "Johnathan", "Toulon", new Date("12/01/2026"), 0);
        mockRepo.findAll.mockResolvedValue(sample);
        mockRepo.update.mockResolvedValue(input);
        await expect(service.updateCivilStatus(input)).resolves.toEqual(input);
        expect(mockRepo.update).toHaveBeenCalledTimes(1);
        expect(mockRepo.update).toHaveBeenCalledWith(input);
    });
    it('deleteCivilStatus appelle delete et retourne l\'état civil supprimé', async () => {
        const sample = [
            new civilStatus_1.CivilStatus("Doe", "John", "Tours", new Date("12/01/2026"), 0),
            new civilStatus_1.CivilStatus("Doe", "Jane", "Alès", new Date("13/01/2026"), 1),
        ];
        mockRepo.findAll.mockResolvedValue(sample);
        mockRepo.delete.mockResolvedValue(sample[1]);
        await expect(service.deleteCivilStatus(1)).resolves.toEqual(sample[1]);
        expect(mockRepo.delete).toHaveBeenCalledTimes(1);
        expect(mockRepo.delete).toHaveBeenCalledWith(1);
    });
    it('deleteCivilStatus retourne null si l\'état civil n\'existe pas', async () => {
        const sample = [
            new civilStatus_1.CivilStatus("Doe", "John", "Tours", new Date("12/01/2026"), 0),
            new civilStatus_1.CivilStatus("Doe", "Jane", "Alès", new Date("13/01/2026"), 1),
        ];
        mockRepo.findAll.mockResolvedValue(sample);
        mockRepo.delete.mockResolvedValue(null);
        await expect(service.deleteCivilStatus(2)).resolves.toBeNull();
        expect(mockRepo.delete).toHaveBeenCalledWith(2);
    });
});
