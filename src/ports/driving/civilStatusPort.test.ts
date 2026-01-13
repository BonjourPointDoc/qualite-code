import { CivilStatusService } from '../../services/civilStatusService';
import InMemoryCivilStatusRepo from "../../adapters/driven/inMemoryCivilStatusRepo";
import {CivilStatus} from "../../domain/civilStatus";

describe('CivilStatus Integration Test', () => {
    let repo:InMemoryCivilStatusRepo = new InMemoryCivilStatusRepo();
    let service: CivilStatusService = new CivilStatusService(repo);
    const birthday = new Date('12/01/2026')

    it('Test CivilStatus lifecycle', async () => {
        let civilStatus: CivilStatus = new CivilStatus("Doe", "John", "Tours", birthday)
        civilStatus.id = 0
        await expect(service.createCivilStatus(civilStatus)).resolves.toEqual(civilStatus);

        let result1 = await service.listCivilStatus()
        expect(result1.length).toBe(1);
        expect(result1[0]).toEqual(civilStatus);

        let updatedCivilStatus: CivilStatus = new CivilStatus("Doe", "Jane", "Tours", birthday, 0)
        await service.updateCivilStatus(updatedCivilStatus);

        expect(await service.getCivilStatus(0)).toEqual(updatedCivilStatus);
        expect(await service.getCivilStatus(5)).toBeNull();

        expect(await service.deleteCivilStatus(0)).toEqual(updatedCivilStatus);
        expect(await service.deleteCivilStatus(5)).toBeNull();
    });
});
