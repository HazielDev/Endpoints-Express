const express = require('express');
const router = express.Router();
const { inventoryMovementsService, productsService } = require('../services');

router.get('/', (req, res) => {
    res.json(inventoryMovementsService.getAll());
});

router.get('/product/:productId', (req, res) => {
    const { productId } = req.params;
    const movements = inventoryMovementsService.getByProductId(productId);

    if (movements.length === 0) {
        return res.status(404).json({ message: `No se encontraron movimientos para el productId ${productId}` });
    }

    res.json(movements);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const movement = inventoryMovementsService.getById(id);

    if (!movement) {
        return res.status(404).json({ message: `Movimiento con id ${id} no encontrado` });
    }

    res.json(movement);
});

router.post('/', (req, res) => {
    const { productId, quantity, movementType, date, description } = req.body;

    if (!productId || !quantity || !movementType) {
        return res.status(400).json({ message: 'productId, quantity y movementType son obligatorios' });
    }

    if (!inventoryMovementsService.isValidMovementType(movementType)) {
        return res.status(400).json({ message: `movementType debe ser uno de: ${inventoryMovementsService.getMovementTypes().join(', ')}` });
    }

    // Validar que el producto exista
    if (!productsService.getById(productId)) {
        return res.status(400).json({ message: `Producto con id ${productId} no encontrado` });
    }

    const newMovement = inventoryMovementsService.create({ productId, quantity, movementType, date, description });
    res.status(201).json(newMovement);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { productId, quantity, movementType, date, description } = req.body;

    if (!productId || !quantity || !movementType) {
        return res.status(400).json({ message: 'productId, quantity y movementType son obligatorios' });
    }

    if (!inventoryMovementsService.isValidMovementType(movementType)) {
        return res.status(400).json({ message: `movementType debe ser uno de: ${inventoryMovementsService.getMovementTypes().join(', ')}` });
    }

    const updated = inventoryMovementsService.update(id, { productId, quantity, movementType, date, description });

    if (!updated) {
        return res.status(404).json({ message: `Movimiento con id ${id} no encontrado` });
    }

    res.json(updated);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (updates.movementType && !inventoryMovementsService.isValidMovementType(updates.movementType)) {
        return res.status(400).json({ message: `movementType debe ser uno de: ${inventoryMovementsService.getMovementTypes().join(', ')}` });
    }

    const patched = inventoryMovementsService.patch(id, updates);

    if (!patched) {
        return res.status(404).json({ message: `Movimiento con id ${id} no encontrado` });
    }

    res.json(patched);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const deleted = inventoryMovementsService.delete(id);

    if (!deleted) {
        return res.status(404).json({ message: `Movimiento con id ${id} no encontrado` });
    }

    res.json({ message: `Movimiento con id ${id} eliminado exitosamente`, movement: deleted });
});

module.exports = router;