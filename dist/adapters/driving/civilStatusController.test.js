"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const express_1 = __importDefault(require("express"));
const civilStatusController_1 = __importDefault(require("./civilStatusController"));
const civilStatusService_1 = require("../../services/civilStatusService");
// 🔴 Mock du service
jest.mock('../../services/civilStatusService');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/civil-status', civilStatusController_1.default);
describe('CivilStatus Controller', () => {
    const mockService = civilStatusService_1.CivilStatusService;
    const sample = [
        { id: 0, last_name: "Doe", first_name: "John", birthplace: "Tours", birthday: (new Date("01/12/2026")).toISOString() },
        { id: 1, last_name: "Doe", first_name: "Jane", birthplace: "Alès", birthday: (new Date("01/13/2026")).toISOString() }
    ];
    beforeEach(() => { jest.clearAllMocks(); });
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
        const newCivilStatus = {
            id: 2,
            last_name: "Winters",
            first_name: "Ethan",
            birthplace: "America",
            birthday: (new Date("01/24/2017")).toISOString()
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
                .send({ last_name: 'Valentine', first_name: 'Jill' });
            expect(res.status).toBe(400);
        });
    });
    describe('PUT /civil-status', () => {
        it('should update professional data', async () => {
            const updatedCivilStatus = {
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
            mockService.prototype.deleteCivilStatus.mockResolvedValue({ id: 1 });
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
