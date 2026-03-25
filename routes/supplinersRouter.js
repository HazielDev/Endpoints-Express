const express = require('express')
const faker = require('faker')
const router = express.Router();

const supplinersList = [];

for (let i = 1; i <= 10; i++) {
    supplinersList.push({
        Id: i,
        supplierName: faker.company.companyName(),
        contactName: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        active: faker.datatype.boolean(),
        address: faker.address.streetAddress() + ", " + faker.address.city()
    });
}

router.get('/', (req, res) => {
    res.json(supplinersList);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const supplier = supplinersList.find(s => s.Id == id);

    if (!supplier) {
        return res.status(404).json({ message: `Supplier with id ${id} not found` });
    }

    res.json(supplier);
});

router.post('/', (req, res) => {
    const { supplierName, contactName, phone, email, active, address } = req.body;

    if (!supplierName || !contactName || !email) {
        return res.status(400).json({ message: 'supplierName, contactName and email are required' });
    }

    const newSupplier = {
        Id: supplinersList.length > 0 ? Math.max(...supplinersList.map(s => s.Id)) + 1 : 1,
        supplierName,
        contactName,
        phone: phone || '',
        email,
        active: active !== undefined ? active : true,
        address: address || ''
    };

    supplinersList.push(newSupplier);
    res.status(201).json(newSupplier);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { supplierName, contactName, phone, email, active, address } = req.body;
    const index = supplinersList.findIndex(s => s.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Supplier with id ${id} not found` });
    }

    if (!supplierName || !contactName || !email) {
        return res.status(400).json({ message: 'supplierName, contactName and email are required' });
    }

    supplinersList[index] = {
        Id: Number(id),
        supplierName,
        contactName,
        phone: phone || supplinersList[index].phone,
        email,
        active: active !== undefined ? active : supplinersList[index].active,
        address: address || supplinersList[index].address
    };

    res.json(supplinersList[index]);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = supplinersList.findIndex(s => s.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Supplier with id ${id} not found` });
    }

    supplinersList[index] = { ...supplinersList[index], ...updates, Id: Number(id) };
    res.json(supplinersList[index]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = supplinersList.findIndex(s => s.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Supplier with id ${id} not found` });
    }

    const deleted = supplinersList.splice(index, 1);
    res.json({ message: `Supplier with id ${id} deleted successfully`, supplier: deleted[0] });
});

module.exports = router;