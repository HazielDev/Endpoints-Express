const faker = require("faker");

const MOVEMENT_TYPES = ["IN", "OUT"];

class InventoryMovementsService {
    constructor() {
        this.movements = [];
        this.nextId = 1;
        this.generate();
    }

    generate() {
        for (let i = 1; i <= 20; i++) {
            this.movements.push({
                Id: this.nextId++,
                productId: i,
                quantity: faker.datatype.number({ min: 1, max: 100 }),
                movementType: MOVEMENT_TYPES[faker.datatype.number({ min: 0, max: 1 })],
                date: faker.date.past().toISOString().split("T")[0],
                description: faker.lorem.words(3)
            });
        }
    }

    isValidMovementType(type) {
        return MOVEMENT_TYPES.includes(type);
    }

    getMovementTypes() {
        return MOVEMENT_TYPES;
    }

    create(data) {
        const newMovement = {
            Id: this.nextId++,
            date: new Date().toISOString().split("T")[0],
            description: '',
            ...data
        };
        this.movements.push(newMovement);
        return newMovement;
    }

    getAll() {
        return this.movements;
    }

    getById(id) {
        return this.movements.find(m => m.Id == id);
    }

    getByProductId(productId) {
        return this.movements.filter(m => m.productId == productId);
    }

    update(id, data) {
        const index = this.movements.findIndex(m => m.Id == id);
        if (index === -1) return null;

        const current = this.movements[index];
        this.movements[index] = {
            Id: Number(id),
            productId: data.productId,
            quantity: data.quantity,
            movementType: data.movementType,
            date: data.date || current.date,
            description: data.description !== undefined ? data.description : current.description
        };
        return this.movements[index];
    }

    patch(id, data) {
        const index = this.movements.findIndex(m => m.Id == id);
        if (index === -1) return null;

        this.movements[index] = { ...this.movements[index], ...data, Id: Number(id) };
        return this.movements[index];
    }

    delete(id) {
        const index = this.movements.findIndex(m => m.Id == id);
        if (index === -1) return null;

        const deleted = this.movements.splice(index, 1);
        return deleted[0];
    }
}

module.exports = InventoryMovementsService;
