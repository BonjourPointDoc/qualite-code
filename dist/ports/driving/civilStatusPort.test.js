"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const civilStatusService_1 = require("../../services/civilStatusService");
const inMemoryCivilStatusRepo_1 = __importDefault(require("../../adapters/driven/inMemoryCivilStatusRepo"));
const civilStatus_1 = require("../../domain/civilStatus");
describe('CivilStatus Integration Test', () => {
    let repo = new inMemoryCivilStatusRepo_1.default();
    let service = new civilStatusService_1.CivilStatusService(repo);
    const birthday = new Date('12/01/2026');
    it('Test CivilStatus lifecycle', async () => {
        let civilStatus = new civilStatus_1.CivilStatus("Doe", "John", "Tours", birthday);
        civilStatus.id = 0;
        await expect(service.createCivilStatus(civilStatus)).resolves.toEqual(civilStatus);
        let result1 = await service.listCivilStatus();
        expect(result1.length).toBe(1);
        expect(result1[0]).toEqual(civilStatus);
        let updatedCivilStatus = new civilStatus_1.CivilStatus("Doe", "Jane", "Tours", birthday, 0);
        await service.updateCivilStatus(updatedCivilStatus);
        expect(await service.getCivilStatus(0)).toEqual(updatedCivilStatus);
        expect(await service.getCivilStatus(5)).toBeNull();
        expect(await service.deleteCivilStatus(0)).toEqual(updatedCivilStatus);
        expect(await service.deleteCivilStatus(5)).toBeNull();
    });
});
