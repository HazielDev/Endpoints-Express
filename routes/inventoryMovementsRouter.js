const express = require('express')
const faker = require('faker')
const router = express.Router();

const inventoryMovementsList = [];

const movementTypes = ["IN", "OUT"];

for (let i = 1; i <= 20; i++) {
    inventoryMovementsList.push({
        Id: i,
        productId: i,
        quantity: faker.datatype.number({ min: 1, max: 100 }),
        movementType: movementTypes[faker.datatype.number({ min: 0, max: 1 })],
        date: faker.date.past().toISOString().split("T")[0],
        description: faker.lorem.words(3)
    });
}

router.get('/', (req, res) => {
    res.json(inventoryMovementsList);
});

router.get('/product/:productId', (req, res) => {
    const { productId } = req.params;
    const movements = inventoryMovementsList.filter(im => im.productId == productId);

    if (movements.length === 0) {
        return res.status(404).json({ message: `No movements found for productId ${productId}` });
    }

    res.json(movements);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const movement = inventoryMovementsList.find(im => im.Id == id);

    if (!movement) {
        return res.status(404).json({ message: `Movement with id ${id} not found` });
    }

    res.json(movement);
});

router.post('/', (req, res) => {
    const { productId, quantity, movementType, date, description } = req.body;

    if (!productId || !quantity || !movementType) {
        return res.status(400).json({ message: 'productId, quantity and movementType are required' });
    }

    if (!movementTypes.includes(movementType)) {
        return res.status(400).json({ message: `movementType must be one of: ${movementTypes.join(', ')}` });
    }

    const newMovement = {
        Id: inventoryMovementsList.length > 0 ? Math.max(...inventoryMovementsList.map(im => im.Id)) + 1 : 1,
        productId,
        quantity,
        movementType,
        date: date || new Date().toISOString().split("T")[0],
        description: description || ''
    };

    inventoryMovementsList.push(newMovement);
    res.status(201).json(newMovement);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { productId, quantity, movementType, date, description } = req.body;
    const index = inventoryMovementsList.findIndex(im => im.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Movement with id ${id} not found` });
    }

    if (!productId || !quantity || !movementType) {
        return res.status(400).json({ message: 'productId, quantity and movementType are required' });
    }

    if (!movementTypes.includes(movementType)) {
        return res.status(400).json({ message: `movementType must be one of: ${movementTypes.join(', ')}` });
    }

    inventoryMovementsList[index] = {
        Id: Number(id),
        productId,
        quantity,
        movementType,
        date: date || inventoryMovementsList[index].date,
        description: description || inventoryMovementsList[index].description
    };

    res.json(inventoryMovementsList[index]);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = inventoryMovementsList.findIndex(im => im.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Movement with id ${id} not found` });
    }

    if (updates.movementType && !movementTypes.includes(updates.movementType)) {
        return res.status(400).json({ message: `movementType must be one of: ${movementTypes.join(', ')}` });
    }

    inventoryMovementsList[index] = { ...inventoryMovementsList[index], ...updates, Id: Number(id) };
    res.json(inventoryMovementsList[index]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = inventoryMovementsList.findIndex(im => im.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Movement with id ${id} not found` });
    }

    const deleted = inventoryMovementsList.splice(index, 1);
    res.json({ message: `Movement with id ${id} deleted successfully`, movement: deleted[0] });
});

module.exports = router;