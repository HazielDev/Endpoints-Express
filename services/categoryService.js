const faker = require("faker");

class CategoryService {
    constructor() {
        this.categories = [];
        this.nextId = 1;
        this.generate();
    }

    generate() {
        for (let i = 1; i <= 10; i++) {
            this.categories.push({
                Id: this.nextId++,
                categoryName: faker.commerce.department(),
                description: faker.lorem.sentence(),
            });
        }
    }

    create(data) {
        const newCategory = {
            Id: this.nextId++,
            ...data
        };
        this.categories.push(newCategory);
        return newCategory;
    }

    getAll() {
        return this.categories;
    }

    getById(id) {
        return this.categories.find(c => c.Id == id);
    }

    update(id, data) {
        const index = this.categories.findIndex(c => c.Id == id);
        if (index === -1) return null;

        this.categories[index] = { ...this.categories[index], ...data };
        return this.categories[index];
    }

    patch(id, data) {
        const index = this.categories.findIndex(c => c.Id == id);
        if (index === -1) return null;

        this.categories[index] = { ...this.categories[index], ...data, Id: Number(id) };
        return this.categories[index];
    }

    delete(id) {
        const index = this.categories.findIndex(c => c.Id == id);
        if (index === -1) return null;

        const deleted = this.categories.splice(index, 1);
        return deleted[0];
    }
}

module.exports = CategoryService;
