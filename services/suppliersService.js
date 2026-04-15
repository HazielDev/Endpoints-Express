const faker = require("faker");

class SuppliersService {
    constructor() {
        this.suppliers = [];
        this.nextId = 1;
        this.generate();
    }

    generate() {
        for (let i = 1; i <= 10; i++) {
            this.suppliers.push({
                Id: this.nextId++,
                supplierName: faker.company.companyName(),
                contactName: faker.name.findName(),
                phone: faker.phone.phoneNumber(),
                email: faker.internet.email(),
                active: faker.datatype.boolean(),
                address: faker.address.streetAddress() + ", " + faker.address.city()
            });
        }
    }

    create(data) {
        const newSupplier = {
            Id: this.nextId++,
            phone: '',
            active: true,
            address: '',
            ...data
        };
        this.suppliers.push(newSupplier);
        return newSupplier;
    }

    getAll() {
        return this.suppliers;
    }

    getById(id) {
        return this.suppliers.find(s => s.Id == id);
    }

    update(id, data) {
        const index = this.suppliers.findIndex(s => s.Id == id);
        if (index === -1) return null;

        const current = this.suppliers[index];
        this.suppliers[index] = {
            Id: Number(id),
            supplierName: data.supplierName,
            contactName: data.contactName,
            phone: data.phone || current.phone,
            email: data.email,
            active: data.active !== undefined ? data.active : current.active,
            address: data.address || current.address
        };
        return this.suppliers[index];
    }

    patch(id, data) {
        const index = this.suppliers.findIndex(s => s.Id == id);
        if (index === -1) return null;

        this.suppliers[index] = { ...this.suppliers[index], ...data, Id: Number(id) };
        return this.suppliers[index];
    }

    delete(id) {
        const index = this.suppliers.findIndex(s => s.Id == id);
        if (index === -1) return null;

        const deleted = this.suppliers.splice(index, 1);
        return deleted[0];
    }
}

module.exports = SuppliersService;
