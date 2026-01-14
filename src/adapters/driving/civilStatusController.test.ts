const request = require("supertest");
import express from 'express';
import router from './civilStatusController';
import { CivilStatusService } from '../../services/civilStatusService';
import {CivilStatus} from "../../domain/civilStatus";

// 🔴 Mock du service
jest.mock('../../services/civilStatusService');

const app = express();
app.use(express.json());
app.use('/civil-status', router);

describe('CivilStatus Controller', () => {

    const mockService = CivilStatusService as jest.MockedClass<typeof CivilStatusService>;
    const sample: any = [
        {id:0, last_name:"Doe", first_name:"John", birthplace:"Tours", birthday:"01/12/2026"},
        {id:1, last_name:"Doe", first_name:"Jane", birthplace:"Alès", birthday:"01/13/2026"}
    ];

    beforeEach(() => {jest.clearAllMocks();});

    describe('GET /civil-status', () => {
        it('should return a list of civil status', async () => {
            mockService.prototype.listCivilStatus.mockResolvedValue(sample);

            const res = await request(app).get('/civil-status');
            expect(res.status).toBe(200);
            expect(res.body).toEqual(sample);
        });
    });

    describe('GET /civil-status/:id', () => {
        it('should return a civil status if found', async () => {
            mockService.prototype.getCivilStatus.mockResolvedValue(sample[1]);

            const res = await request(app).get('/civil-status/1');

            expect(res.status).toBe(200);
            expect(res.body).toEqual(sample[1]);
        });

        it('should return 404 if not found', async () => {
            mockService.prototype.getCivilStatus.mockResolvedValue(null);

            const res = await request(app).get('/civil-status/99');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /civil-status', () => {
        const newCivilStatus: any = {
            id: 2,
            last_name:"Winters",
            first_name:"Ethan",
            birthplace:"America",
            birthday: "01/24/2017"
        };

        it('should create a civil status', async () => {
            mockService.prototype.createCivilStatus.mockResolvedValue(newCivilStatus);

            const res = await request(app)
                .post('/civil-status')
                .send(newCivilStatus);

            expect(res.status).toBe(201);
            expect(res.body).toEqual(newCivilStatus);
        });

        it('should return 400 if missing fields', async () => {
            const res = await request(app)
                .post('/civil-status')
                .send({ last_name: 'Valentine', first_name:'Jill' });

            expect(res.status).toBe(400);
        });
    });

    describe('PUT /civil-status', () => {
        it('should update professional data', async () => {
            const updatedCivilStatus: any = {
                id: sample[1].id,
                last_name: "Valentine",
                first_name: "Jill",
                birthplace: sample[1].birthplace,
                birthday: sample[1].birthday
            };
            mockService.prototype.updateCivilStatus.mockResolvedValue(updatedCivilStatus);

            const res = await request(app)
                .put('/civil-status')
                .send(updatedCivilStatus);

            expect(res.status).toBe(201);
            expect(res.body).toEqual(updatedCivilStatus);
        });
    });

    describe('DELETE /civil-status/:id', () => {
        it('should delete civil status data', async () => {
            mockService.prototype.deleteCivilStatus.mockResolvedValue({id: 1} as any);

            const res = await request(app).delete('/civil-status/1');
            expect(res.status).toBe(200);
        });

        it('should return 404 if not found', async () => {
            mockService.prototype.deleteCivilStatus.mockResolvedValue(null);

            const res = await request(app).delete('/civil-status/99');
            expect(res.status).toBe(404);
        });
    });
});