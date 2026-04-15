const faker = require("faker");

class ProductsService {
    constructor() {
        this.products = [];
        this.nextId = 1;
        this.generate();
    }

    generate() {
        for (let i = 1; i <= 10; i++) {
            this.products.push({
                Id: this.nextId++,
                image: faker.image.imageUrl(),
                productName: faker.commerce.productName(),
                Price: parseInt(faker.commerce.price(), 10),
                description: faker.lorem.sentence(),
                active: true,
                Stock: 12,
                categoryId: i,
                brandId: i
            });
        }
    }

    create(data) {
        const newProduct = {
            Id: this.nextId++,
            ...data
        };
        this.products.push(newProduct);
        return newProduct;
    }

    getAll() {
        return this.products;
    }

    getById(id) {
        return this.products.find(p => p.Id == id);
    }

    getByPrice(price) {
        return this.products.filter(p => p.Price == price);
    }

    getByCategory(categoryId) {
        return this.products.filter(p => p.categoryId == categoryId);
    }

    getByBrand(brandId) {
        return this.products.filter(p => p.brandId == brandId);
    }

    hasCategoryProducts(categoryId) {
        return this.products.some(p => p.categoryId == categoryId);
    }

    hasBrandProducts(brandId) {
        return this.products.some(p => p.brandId == brandId);
    }

    update(id, data) {
        const index = this.products.findIndex(p => p.Id == id);
        if (index === -1) return null;

        this.products[index] = { ...this.products[index], ...data, Id: Number(id) };
        return this.products[index];
    }

    delete(id) {
        const index = this.products.findIndex(p => p.Id == id);
        if (index === -1) return null;

        const deleted = this.products.splice(index, 1);
        return deleted[0];
    }
}

module.exports = ProductsService;
