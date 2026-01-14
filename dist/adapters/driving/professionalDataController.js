"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inMemoryProfessionalDataRepo_1 = require("../driven/inMemoryProfessionalDataRepo");
const professionalDataService_1 = require("../../services/professionalDataService");
const professionalData_1 = require("../../domain/professionalData");
const router = express_1.default.Router();
const repo = new inMemoryProfessionalDataRepo_1.InMemoryProfessionalDataRepo();
const service = new professionalDataService_1.ProfessionalDataService(repo);
router.get('/', async (req, res) => {
    const list = await service.listProfessionalData();
    res.json(list);
});
router.post('/', async (req, res) => {
    const { civil_status_id, situation, company, salary, contract, hours_per_day, overtime, paid_overtime } = req.body;
    if (civil_status_id === undefined || situation === undefined || company === undefined || salary === undefined || contract === undefined || hours_per_day === undefined || overtime === undefined || paid_overtime === undefined) {
        return res.status(400).json({ message: ' civil_status_id, situation, company, salary, contract, hours_per_day, overtime and paid_overtime required' });
    }
    const created = await service.createProfessionalData(new professionalData_1.ProfessionalData(civil_status_id, situation, company, salary, contract, hours_per_day, overtime, paid_overtime));
    res.status(201).json(created);
});
router.put('/', async (req, res) => {
    const { civil_status_id, situation, company, salary, contract, hours_per_day, overtime, paid_overtime } = req.body;
    if (civil_status_id === undefined || situation === undefined || company === undefined || salary === undefined || contract === undefined || hours_per_day === undefined || overtime === undefined || paid_overtime === undefined) {
        return res.status(400).json({ message: ' civil_status_id, situation, company, salary, contract, hours_per_day, overtime and paid_overtime required' });
    }
    const updated = await service.updateProfessionalData(new professionalData_1.ProfessionalData(civil_status_id, situation, company, salary, contract, hours_per_day, overtime, paid_overtime));
    res.status(201).json(updated);
});
router.delete('/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const found = await service.deleteProfessionalData(id);
    if (found === null)
        return res.status(404).json({ message: 'Not found' });
    res.json(found);
});
router.get('/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const found = await service.getProfessionalData(id);
    if (found === null) {
        return res.status(404).json({ message: 'Not found' });
    }
    res.json(found);
});
exports.default = router;
