const faker = require("faker")
const brandsList = [];

for (let i = 1; i <= 10; i++) {
    brandsList.push({
        Id: i,
        brandName: faker.company.companyName(),
        description: faker.company.catchPhrase(),
    });
}

module.exports = brandsList;