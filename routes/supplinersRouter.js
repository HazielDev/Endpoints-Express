const express = require('express');
const router = express.Router();
const { suppliersService } = require('../services');

router.get('/', (req, res) => {
    res.json(suppliersService.getAll());
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const supplier = suppliersService.getById(id);

    if (!supplier) {
        return res.status(404).json({ message: `Proveedor con id ${id} no encontrado` });
    }

    res.json(supplier);
});

router.post('/', (req, res) => {
    const { supplierName, contactName, phone, email, active, address } = req.body;

    if (!supplierName || !contactName || !email) {
        return res.status(400).json({ message: 'supplierName, contactName y email son obligatorios' });
    }

    const newSupplier = suppliersService.create({ supplierName, contactName, phone, email, active, address });
    res.status(201).json(newSupplier);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { supplierName, contactName, phone, email, active, address } = req.body;

    if (!supplierName || !contactName || !email) {
        return res.status(400).json({ message: 'supplierName, contactName y email son obligatorios' });
    }

    const updated = suppliersService.update(id, { supplierName, contactName, phone, email, active, address });

    if (!updated) {
        return res.status(404).json({ message: `Proveedor con id ${id} no encontrado` });
    }

    res.json(updated);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const patched = suppliersService.patch(id, updates);

    if (!patched) {
        return res.status(404).json({ message: `Proveedor con id ${id} no encontrado` });
    }

    res.json(patched);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const deleted = suppliersService.delete(id);

    if (!deleted) {
        return res.status(404).json({ message: `Proveedor con id ${id} no encontrado` });
    }

    res.json({ message: `Proveedor con id ${id} eliminado exitosamente`, supplier: deleted });
});

module.exports = router;