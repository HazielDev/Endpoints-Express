const express = require('express')
const faker = require('faker')
const router = express.Router();

const prodsList = [];

for (let c = 0; c < 10; c++) {
    prodsList.push({
        Id: prodsList.length + 1,
        image: faker.image.imageUrl(),
        productName: faker.commerce.productName(),
        Price: parseInt(faker.commerce.price(), 10),
        description: faker.lorem.sentence(),
        active: true,
        Stock: 12,
        categoryId: c+1,
        brandId: c+1
    });
}

router.get('/', (req, res) => {
    res.json(prodsList);
});

router.get('/precio/:price', (req, res) => {
    const {price} = req.params;
    res.json(prodsList.filter(p => p.Price == price))
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    res.json(prodsList.filter(p => p.Id == id))
});

module.exports = router;