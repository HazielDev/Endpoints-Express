const express = require('express')
const faker = require('faker')
const router = express.Router();

const categoriesList = [];

for (let i = 1; i <= 10; i++) {
    categoriesList.push({
        Id: i,
        categoryName: faker.commerce.department(),
        description: faker.lorem.sentence(),
    });
}

router.get('/', (req, res) => {
    res.json(categoriesList);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const category = categoriesList.find(c => c.Id == id);

    if (!category) {
        return res.status(404).json({ message: `Category with id ${id} not found` });
    }

    res.json(category);
});

router.post('/', (req, res) => {
    const { categoryName, description } = req.body;

    if (!categoryName || !description) {
        return res.status(400).json({ message: 'categoryName and description are required' });
    }

    const newCategory = {
        Id: categoriesList.length > 0 ? Math.max(...categoriesList.map(c => c.Id)) + 1 : 1,
        categoryName,
        description
    };

    categoriesList.push(newCategory);
    res.status(201).json(newCategory);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { categoryName, description } = req.body;
    const index = categoriesList.findIndex(c => c.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Category with id ${id} not found` });
    }

    if (!categoryName || !description) {
        return res.status(400).json({ message: 'categoryName and description are required' });
    }

    categoriesList[index] = {
        Id: Number(id),
        categoryName,
        description
    };

    res.json(categoriesList[index]);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = categoriesList.findIndex(c => c.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Category with id ${id} not found` });
    }

    categoriesList[index] = { ...categoriesList[index], ...updates, Id: Number(id) };
    res.json(categoriesList[index]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = categoriesList.findIndex(c => c.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Category with id ${id} not found` });
    }

    const deleted = categoriesList.splice(index, 1);
    res.status(200).json({ message: `Category con id ${id} se borro 👍`, category: deleted[0] });
});

module.exports = router;