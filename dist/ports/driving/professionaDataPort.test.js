"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inMemoryProfessionalDataRepo_1 = require("../../adapters/driven/inMemoryProfessionalDataRepo");
const professionalDataService_1 = require("../../services/professionalDataService");
const professionalData_1 = require("../../domain/professionalData");
describe('ProfessionalDataService', () => {
    const repo = new inMemoryProfessionalDataRepo_1.InMemoryProfessionalDataRepo();
    const service = new professionalDataService_1.ProfessionalDataService(repo);
    it('createProfessionalDataService ', async () => {
        const professionalData = new professionalData_1.ProfessionalData(0, "Engineer", "Capgemini", "2300", "CDI", 7, 0, 0, 0);
        const professionalData2 = new professionalData_1.ProfessionalData(1, "Taxi driver", "Uber", "1200", "CDI", 7, 15, 0, 1);
        let professionalDataList = [];
        await expect(service.listProfessionalData()).resolves.toEqual([]);
        professionalDataList.push(professionalData);
        professionalDataList.push(professionalData2);
        await expect(service.createProfessionalData(professionalData)).resolves.toEqual(professionalData);
        await expect(service.createProfessionalData(professionalData2)).resolves.toEqual(professionalData2);
        await expect(service.listProfessionalData()).resolves.toEqual(professionalDataList);
        await expect(service.getProfessionalData(0)).resolves.toEqual(professionalData);
        await expect(service.getProfessionalData(9)).resolves.toBeNull();
        const professionalDataUpdated = new professionalData_1.ProfessionalData(0, "Engineer", "Capgemini Engineering", "2400", "CDI", 7, 10, 10, 0);
        await expect(service.updateProfessionalData(professionalDataUpdated)).resolves.toEqual(professionalDataUpdated);
        await expect(service.deleteProfessionalData(1)).resolves.toEqual(professionalData2);
        await expect(service.deleteProfessionalData(1)).resolves.toBeNull();
    });
});
