const faker = require('faker')

const categoriesList = [];

for (let i = 0; i < 10; i++) {
    categoriesList.push({
        Id: i,
        categoryName: faker.commerce.department(),
        description: faker.lorem.sentence(),
    });
}

module.exports = categoriesList;