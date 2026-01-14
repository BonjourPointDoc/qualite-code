"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inMemoryCivilStatusRepo_1 = __importDefault(require("../driven/inMemoryCivilStatusRepo"));
const civilStatusService_1 = require("../../services/civilStatusService");
const civilStatus_1 = require("../../domain/civilStatus");
const router = express_1.default.Router();
const repo = new inMemoryCivilStatusRepo_1.default();
const service = new civilStatusService_1.CivilStatusService(repo);
router.get('/', async (req, res) => {
    const list = await service.listCivilStatus();
    res.json(list);
});
router.post('/', async (req, res) => {
    const { last_name, first_name, birthplace, birthday } = req.body;
    if (!last_name || !first_name || !birthplace || !birthday) {
        return res.status(400).json({ message: 'last_name, first_name, birthplace and birthday required' });
    }
    const created = await service.createCivilStatus(new civilStatus_1.CivilStatus(last_name, first_name, birthplace, birthday));
    res.status(201).json(created);
});
router.put('/', async (req, res) => {
    const { id, last_name, first_name, birthplace, birthday } = req.body;
    if (last_name === undefined || first_name === undefined || birthplace === undefined || birthday === undefined) {
        return res.status(400).json({ message: 'last_name, first_name, birthplace and birthday required' });
    }
    const updated = await service.updateCivilStatus(new civilStatus_1.CivilStatus(last_name, first_name, birthplace, birthday, id));
    res.status(201).json(updated);
});
router.delete('/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const found = await service.deleteCivilStatus(id);
    if (found === null)
        return res.status(404).json({ message: 'Not found' });
    res.json(found);
});
router.get('/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const found = await service.getCivilStatus(id);
    if (found === null)
        return res.status(404).json({ message: 'Not found' });
    res.json(found);
});
// router.get('/how-much/:id', async (req, res) => {
//     const id = Number.parseInt(req.params.id);
//     const found = await service.getWorthOfCivilStatus(id);
//     if (!found) return res.status(404).json({ message: 'Not found' });
//     res.json(found);
// });
exports.default = router;
