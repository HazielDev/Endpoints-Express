const express = require('express')
const faker = require('faker')
const router = express.Router();

const usersList = [];

for (let i = 1; i <= 10; i++) {
    usersList.push({
        id: i,
        Name: faker.name.findName(),
        Username: faker.internet.userName(),
        pass: faker.internet.password()
    });
}

router.get('/', (req, res) => {
    res.json(usersList);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = usersList.find(u => u.id == id);

    if (!user) {
        return res.status(404).json({ message: `User with id ${id} not found` });
    }

    res.json(user);
});

router.post('/', (req, res) => {
    const { Name, Username, pass } = req.body;

    if (!Name || !Username || !pass) {
        return res.status(400).json({ message: 'Name, Username and pass are required' });
    }

    const newUser = {
        id: usersList.length > 0 ? Math.max(...usersList.map(u => u.id)) + 1 : 1,
        Name,
        Username,
        pass
    };

    usersList.push(newUser);
    res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Name, Username, pass } = req.body;
    const index = usersList.findIndex(u => u.id == id);

    if (index === -1) {
        return res.status(404).json({ message: `User with id ${id} not found` });
    }

    if (!Name || !Username || !pass) {
        return res.status(400).json({ message: 'Name, Username and pass are required' });
    }

    usersList[index] = { id: Number(id), Name, Username, pass };
    res.json(usersList[index]);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const index = usersList.findIndex(u => u.id == id);

    if (index === -1) {
        return res.status(404).json({ message: `User with id ${id} not found` });
    }

    usersList[index] = { ...usersList[index], ...updates, id: Number(id) };
    res.json(usersList[index]);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = usersList.findIndex(u => u.id == id);

    if (index === -1) {
        return res.status(404).json({ message: `User with id ${id} not found` });
    }

    const deleted = usersList.splice(index, 1);
    res.json({ message: `User with id ${id} deleted successfully`, user: deleted[0] });
});

module.exports = router;