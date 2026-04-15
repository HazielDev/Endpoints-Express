const faker = require("faker");

class UsersService {
    constructor() {
        this.users = [];
        this.nextId = 1;
        this.generate();
    }

    generate() {
        for (let i = 1; i <= 10; i++) {
            this.users.push({
                id: this.nextId++,
                Name: faker.name.findName(),
                Username: faker.internet.userName(),
                pass: faker.internet.password()
            });
        }
    }

    create(data) {
        const newUser = {
            id: this.nextId++,
            ...data
        };
        this.users.push(newUser);
        return newUser;
    }

    getAll() {
        return this.users;
    }

    getById(id) {
        return this.users.find(u => u.id == id);
    }

    update(id, data) {
        const index = this.users.findIndex(u => u.id == id);
        if (index === -1) return null;

        this.users[index] = { id: Number(id), ...data };
        return this.users[index];
    }

    patch(id, data) {
        const index = this.users.findIndex(u => u.id == id);
        if (index === -1) return null;

        this.users[index] = { ...this.users[index], ...data, id: Number(id) };
        return this.users[index];
    }

    delete(id) {
        const index = this.users.findIndex(u => u.id == id);
        if (index === -1) return null;

        const deleted = this.users.splice(index, 1);
        return deleted[0];
    }
}

module.exports = UsersService;
