import express from 'express';
import { InMemoryProfessionalDataRepo } from '../driven/inMemoryProfessionalDataRepo';
import { ProfessionalDataService } from '../../services/professionalDataService';
import { ProfessionalData } from "../../domain/professionalData";

const router = express.Router();

const repo = new InMemoryProfessionalDataRepo();
const service = new ProfessionalDataService(repo);

router.get('/', async (req, res) => {
    const list = await service.listProfessionalData();
    res.json(list);
});

router.post('/', async (req, res) => {
    const { civil_status_id, situation, company, salary, contract, hours_per_day, overtime, paid_overtime  } = req.body;
    if (!civil_status_id || !situation || !company || !salary || !contract || !hours_per_day || !overtime || !paid_overtime) {
        return res.status(400).json({ message: ' civil_status_id, situation, company, salary, contract, hours_per_day, overtime and paid_overtime required' });
    }
    const created = await service.createProfessionalData(new ProfessionalData( civil_status_id, situation, company, salary, contract, hours_per_day, overtime, paid_overtime));
    res.status(201).json(created);
});

router.put('/', async (req, res) => {
    const { civil_status_id, situation, company, salary, contract, hours_per_day, overtime, paid_overtime  } = req.body;
    if (!civil_status_id || !situation || !company || !salary || !contract || !hours_per_day || !overtime || !paid_overtime) {
        return res.status(400).json({ message: ' civil_status_id, situation, company, salary, contract, hours_per_day, overtime and paid_overtime required' });
    }
    const updated = await service.updateProfessionalData(new ProfessionalData(civil_status_id, situation, company, salary, contract, hours_per_day, overtime, paid_overtime));
    res.status(201).json(updated);
});

router.delete('/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const found = await service.deleteProfessionalData(id);
    if (!found) return res.status(404).json({ message: 'Not found' });
    res.json(found);
});

router.get('/:id', async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const found = await service.getProfessionalData(id);
    if (!found) return res.status(404).json({ message: 'Not found' });
    res.json(found);
});

export default router;
