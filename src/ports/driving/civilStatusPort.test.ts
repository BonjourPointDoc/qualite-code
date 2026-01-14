import { CivilStatusService } from '../../services/civilStatusService';
import CivilStatusRepo from "../../adapters/driven/civilStatusRepo";
import {CivilStatus} from "../../domain/civilStatus";

describe('CivilStatus Integration Test', () => {
    let repo:CivilStatusRepo = new CivilStatusRepo();
    let service: CivilStatusService = new CivilStatusService(repo);

    it('Test CivilStatus lifecycle', async () => {
        let civilStatus: CivilStatus = new CivilStatus("Doe", "John", "Tours", "12/01/2026")
        let tmp = await service.createCivilStatus(civilStatus)
        console.log(tmp)

        let response = await service.listCivilStatus()
        let result1 = response[response.length -1]
        civilStatus.id = result1.id;
        expect(result1).toEqual(civilStatus);

        let updatedCivilStatus: CivilStatus = new CivilStatus("Doe", "Jane", "Tours","12/01/2026", civilStatus.id)
        await service.updateCivilStatus(updatedCivilStatus);
        await service.deleteCivilStatus(civilStatus.id as number)
    });
});
