"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const professionalDataController_1 = __importDefault(require("./professionalDataController"));
const professionalDataService_1 = require("../../services/professionalDataService");
const professionalData_1 = require("../../domain/professionalData");
jest.mock('../../services/professionalDataService');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/pro-data', professionalDataController_1.default);
describe('ProfessionalDataController', () => {
    const mockService = professionalDataService_1.ProfessionalDataService;
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('Get /pro-data', () => {
        it('should return a list of professional data', async () => {
            const sample = [new professionalData_1.ProfessionalData(0, "Engineer", "Capgemini", "2300", "CDI", 7, 0, 0),
                new professionalData_1.ProfessionalData(0, "Taxi Driver", "Uber", "1500", "CDI", 7, 0, 0)];
            mockService.prototype.listProfessionalData.mockResolvedValue(sample);
            const res = await (0, supertest_1.default)(app).get('/pro-data');
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(sample);
        });
    });
    describe('GET /pro-data/:id', () => {
        it('should return professional data if found', async () => {
            const sample = [new professionalData_1.ProfessionalData(0, "Engineer", "Capgemini", "2300", "CDI", 7, 0, 0, 0),
                new professionalData_1.ProfessionalData(0, "Taxi Driver", "Uber", "1500", "CDI", 7, 0, 0, 1)];
            mockService.prototype.getProfessionalData.mockResolvedValue(sample[0]);
            const res = await (0, supertest_1.default)(app).get('/pro-data/0');
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(sample[0]);
        });
        it('should return 404 if not found', async () => {
            mockService.prototype.getProfessionalData.mockResolvedValue(null);
            const res = await (0, supertest_1.default)(app).get('/pro-data/99');
            expect(res.status).toEqual(404);
        });
    });
    describe('POST /pro-data', () => {
        it('should create professional data', async () => {
            const input = new professionalData_1.ProfessionalData(0, "Engineer", "Capgemini", "2300", "CDI", 7, 0, 0, 0);
            mockService.prototype.createProfessionalData.mockResolvedValue(input);
            const res = await (0, supertest_1.default)(app).post('/pro-data').send(input);
            expect(res.status).toBe(201);
            expect(res.body).toEqual(input);
        });
        it('should return 400 if missing fields', async () => {
            const res = await (0, supertest_1.default)(app).post('/pro-data').send({ company: 'Capgemini' });
            expect(res.status).toBe(400);
        });
    });
    describe('PUT /pro-data', () => {
        it('should update professional data', async () => {
            mockService.prototype.updateProfessionalData.mockResolvedValue({ id: 0, company: 'Updated Corp' });
            const res = await (0, supertest_1.default)(app).put('/pro-data').send({
                civil_status_id: 1,
                situation: 'Employee',
                company: 'Updated Corp',
                salary: 3500,
                contract: 'CDI',
                hours_per_day: 8,
                overtime: false,
                paid_overtime: false,
                id: 0
            });
            expect(res.status).toBe(201);
            expect(res.body.company).toBe('Updated Corp');
        });
    });
    describe('DELETE /pro-data/:id', () => {
        it('should delete professional data', async () => {
            mockService.prototype.deleteProfessionalData.mockResolvedValue({ id: 1 });
            const res = await (0, supertest_1.default)(app).delete('/pro-data/1');
            expect(res.status).toBe(200);
        });
        it('should return 404 if not found', async () => {
            mockService.prototype.deleteProfessionalData.mockResolvedValue(null);
            const res = await (0, supertest_1.default)(app).delete('/pro-data/99');
            expect(res.status).toBe(404);
        });
    });
});
