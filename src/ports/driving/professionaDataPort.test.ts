import { ProfessionalDataRepo } from '../../adapters/driven/professionalDataRepo';
import { ProfessionalDataService } from '../../services/professionalDataService';
import {ProfessionalData} from "../../domain/professionalData";

describe('ProfessionalDataService', () => {
    const repo = new ProfessionalDataRepo();
    const service = new ProfessionalDataService(repo);

    it('createProfessionalDataService ', async () => {
        const professionalData = new ProfessionalData(0, "Engineer", "Capgemini", 2300, "CDI", 7, 0, 0, 0);
        const professionalData2 = new ProfessionalData(1, "Taxi driver", "Uber", 1200, "CDI", 7, 15, 0, 1);

        let professionalDataList: ProfessionalData[] = [];

        await expect(service.listProfessionalData()).resolves.toEqual([]);

        professionalDataList.push(professionalData);
        professionalDataList.push(professionalData2);

        await expect(service.createProfessionalData(professionalData)).resolves.toEqual(professionalData);
        await expect(service.createProfessionalData(professionalData2)).resolves.toEqual(professionalData2);

        await expect(service.listProfessionalData()).resolves.toEqual(professionalDataList);
        professionalDataList.pop();

        await expect(service.getProfessionalData(17)).resolves.toEqual(professionalDataList);
        await expect(service.getProfessionalData(99)).resolves.toEqual([]);

        const professionalDataUpdated = new ProfessionalData(0, "Engineer", "Capgemini Engineering", 2400, "CDI", 7, 10, 10, 0);
        await expect(service.updateProfessionalData(professionalDataUpdated)).resolves.toEqual(professionalDataUpdated);

        await expect(service.deleteProfessionalData(1)).resolves.toEqual(1);
    });
});