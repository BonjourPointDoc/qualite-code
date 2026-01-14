import { CivilStatusService } from '../../services/civilStatusService';
import CivilStatusRepo from "../../adapters/driven/civilStatusRepo";
import {CivilStatus} from "../../domain/civilStatus";

describe('CivilStatus Integration Test', () => {
    let repo:CivilStatusRepo = new CivilStatusRepo();
    let service: CivilStatusService = new CivilStatusService(repo);

    it('Test CivilStatus lifecycle', async () => {
        let civilStatus: CivilStatus = new CivilStatus("Doe", "John", "Tours", "12/01/2026")
        let created=await service.createCivilStatus(civilStatus)
        civilStatus.id = created.id;

        expect(created).toEqual(civilStatus);
        let result1 = await service.listCivilStatus()
        expect(result1.some(item => item.id === civilStatus.id)).toBe(true);

        let updatedCivilStatus: CivilStatus = new CivilStatus("Doe", "Jane", "Tours","12/01/2026", civilStatus.id)
        await service.updateCivilStatus(updatedCivilStatus);
        if(civilStatus.id){
            expect(await service.getCivilStatus(civilStatus.id)).toEqual(updatedCivilStatus);
            expect(await service.getCivilStatus(-1)).toBeUndefined()

            expect(await service.deleteCivilStatus(civilStatus.id)).toEqual(civilStatus.id);
        }

    });
});
