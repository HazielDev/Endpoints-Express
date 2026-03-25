const express = require("express")
const faker = require("faker")
const router = express.Router();

const brandsList = [];

for (let i = 1; i <= 10; i++) {
    brandsList.push({
        Id: i,
        brandName: faker.company.companyName(),
        description: faker.company.catchPhrase(),
    });
}

router.get('/', (req, res) => {
    res.json(brandsList);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const brand = brandsList.find(b => b.Id == id);

    if (!brand) {
        return res.status(404).json({ message: `Brand with id ${id} not found` });
    }

    res.json(brand);
});

router.post('/', (req, res) => {
    const { brandName, description } = req.body;

    if (!brandName || !description) {
        return res.status(400).json({ message: 'brandName and description are required' });
    }

    const newBrand = {
        Id: brandsList.length > 0 ? Math.max(...brandsList.map(b => b.Id)) + 1 : 1,
        brandName,
        description,
    };

    brandsList.push(newBrand);
    res.status(201).json(newBrand);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { brandName, description } = req.body;
    const index = brandsList.findIndex(b => b.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Brand with id ${id} not found` });
    }

    if (!brandName || !description) {
        return res.status(400).json({ message: 'brandName and description are required' });
    }

    brandsList[index] = {
        Id: Number(id),
        brandName,
        description,
    };

    res.json(brandsList[index]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = brandsList.findIndex(b => b.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Brand with id ${id} not found` });
    }

    const deleted = brandsList.splice(index, 1);
    res.json({ message: `Brand con id ${id} borrada con exito.`, brand: deleted[0] });
});

module.exports = router;