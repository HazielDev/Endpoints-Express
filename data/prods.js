const faker = require('faker')

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

module.exports = prodsList;