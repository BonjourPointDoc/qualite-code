import express from 'express';
import { InMemoryCivilStatusRepo } from '../driven/inMemoryCivilStatusRepo';
import { CivilStatusService } from '../../services/civilStatusService';
import { CivilStatus } from "../../domain/civilStatus";

const router = express.Router();

const repo = new InMemoryCivilStatusRepo();
const service = new CivilStatusService(repo);

router.get('/', async (req, res) => {
    const list = await service.listCivilStatus();
    res.json(list);
});

router.post('/', async (req, res) => {
    const { last_name, first_name, birthplace, birthday } = req.body;
    if (!last_name || !first_name || !birthplace || !birthday) {
        return res.status(400).json({ message: 'last_name, first_name, birthplace and birthday required' });
    }
    const created = await service.createCivilStatus(new CivilStatus(last_name, first_name, birthplace, birthday));
    res.status(201).json(created);
});

router.put('/', async (req, res) => {
    const { last_name, first_name, birthplace, birthday } = req.body;
    if (!last_name || !first_name || !birthplace || !birthday) {
        return res.status(400).json({ message: 'last_name, first_name, birthplace and birthday required' });
    }
    const updated = await service.updateCivilStatus(new CivilStatus(last_name, first_name, birthplace, birthday));
    res.status(201).json(updated);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const found = await service.deleteCivilStatus(id);
    if (!found) return res.status(404).json({ message: 'Not found' });
    res.json(found);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const found = await service.getCivilStatus(id);
    if (!found) return res.status(404).json({ message: 'Not found' });
    res.json(found);
});

export default router;
