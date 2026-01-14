import request from 'supertest';
import express from 'express';
import router from './professionalDataController';
import { ProfessionalDataService } from '../../services/professionalDataService';
import {ProfessionalData} from "../../domain/professionalData";

jest.mock('../../services/professionalDataService');

const app = express();
app.use(express.json());
app.use('/pro-data', router);

describe ('ProfessionalDataController', () => {
    const mockService = ProfessionalDataService as jest.MockedClass<typeof ProfessionalDataService>;

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('Get /pro-data', () => {
        it('should return a list of professional data', async () => {
            const sample: ProfessionalData[] = [new ProfessionalData(0, "Engineer", "Capgemini", 2300, "CDI", 7, 0, 0),
                                                new ProfessionalData(0, "Taxi Driver", "Uber", 1500, "CDI", 7, 0, 0)]
            mockService.prototype.listProfessionalData.mockResolvedValue(sample);

            const res = await request(app).get('/pro-data');

            expect(res.status).toEqual(200);
            expect(res.body).toEqual(sample);
        });
    });

    describe('GET /pro-data/:id', () => {
        it('should return professional data if found', async () => {
            const sample: ProfessionalData[] = [new ProfessionalData(0, "Engineer", "Capgemini", 2300, "CDI", 7, 0, 0, 0),
                                                new ProfessionalData(0, "Taxi Driver", "Uber", 1500, "CDI", 7, 0, 0, 1)]
            mockService.prototype.getProfessionalData.mockResolvedValue(sample[0]);

            const res = await request(app).get('/pro-data/0');

            expect(res.status).toEqual(200);
            expect(res.body).toEqual(sample[0]);
        });

        it('should return 404 if not found', async () => {
            mockService.prototype.getProfessionalData.mockResolvedValue(null);

            const res = await request(app).get('/pro-data/99');

            expect(res.status).toEqual(404);
        });
    });

    describe('POST /pro-data', () => {
       it('should create professional data', async () => {
           const input = new ProfessionalData(0, "Engineer", "Capgemini", 2300, "CDI", 7, 0, 0, 0);
           mockService.prototype.createProfessionalData.mockResolvedValue(input);
           const res = await request(app).post('/pro-data').send(input);

           expect(res.status).toBe(201);
           expect(res.body).toEqual(input);
       });

        it('should return 400 if missing fields', async () => {
            const res = await request(app).post('/pro-data').send({company: 'Capgemini'});

            expect(res.status).toBe(400);
        });
    });

    describe('PUT /pro-data', () => {
        it('should update professional data', async () => {
            mockService.prototype.updateProfessionalData.mockResolvedValue({id:0, company: 'Updated Corp'} as any);

           const res = await request(app).put('/pro-data').send({
               civil_status_id: 1,
               situation: 'Employee',
               company: 'Updated Corp',
               salary: 3500,
               contract: 'CDI',
               hours_per_day: 8,
               overtime: false,
               paid_overtime: false,
               id:0
           });

           expect(res.status).toBe(201);
           expect(res.body.company).toBe('Updated Corp');
        });
    });

    describe('DELETE /pro-data/:id', () => {
       it('should delete professional data', async () => {
           mockService.prototype.deleteProfessionalData.mockResolvedValue({id: 1} as any);

           const res = await request(app).delete('/pro-data/1');

           expect(res.status).toBe(200);
       })

        it('should return 404 if not found', async () => {
            mockService.prototype.deleteProfessionalData.mockResolvedValue(null);
            const res = await request(app).delete('/pro-data/99');

            expect(res.status).toBe(404);
        })
    });
})