const express = require('express');
const router = express.Router();
const { usersService } = require('../services');

router.get('/', (req, res) => {
    res.json(usersService.getAll());
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = usersService.getById(id);

    if (!user) {
        return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
    }

    res.json(user);
});

router.post('/', (req, res) => {
    const { Name, Username, pass } = req.body;

    if (!Name || !Username || !pass) {
        return res.status(400).json({ message: 'Name, Username y pass son obligatorios' });
    }

    const newUser = usersService.create({ Name, Username, pass });
    res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Name, Username, pass } = req.body;

    if (!Name || !Username || !pass) {
        return res.status(400).json({ message: 'Name, Username y pass son obligatorios' });
    }

    const updated = usersService.update(id, { Name, Username, pass });

    if (!updated) {
        return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
    }

    res.json(updated);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const patched = usersService.patch(id, updates);

    if (!patched) {
        return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
    }

    res.json(patched);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const deleted = usersService.delete(id);

    if (!deleted) {
        return res.status(404).json({ message: `Usuario con id ${id} no encontrado` });
    }

    res.json({ message: `Usuario con id ${id} eliminado exitosamente`, user: deleted });
});

module.exports = router;