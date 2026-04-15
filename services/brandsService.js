const faker = require("faker");

class brandService {
    constructor(){
        this.brands = [];
        this.nextId = 1;
        this.generate();
    }   

    generate(){
       for (let i = 1; i <= 10; i++) {
            this.brands.push({
                Id: this.nextId++,
                brandName: faker.company.companyName(),
                description: faker.company.catchPhrase(),
            });
        }
    }

    create(data){
        const newBrand = {
            Id: this.nextId++,
            ...data
        }

        this.brands.push(newBrand);
        return newBrand;
    }

    getAll(){
        return this.brands;
    }

    getById(id){
        return this.brands.find(b => b.Id == id);
    }

    update(id, data){
        const index = this.brands.findIndex(b => b.Id == id);
        if(index === -1){
            return null;
        }

        const brand = this.brands[index];
        this.brands[index] = {
            ...brand,
            ...data
        }

        return this.brands[index];
    }

    delete(id){
        const index = this.brands.findIndex(b => b.Id == id);
        if(index === -1){
            return null;
        }
        
        const deleted = this.brands.splice(index, 1);
        return deleted[0];
    }
}

module.exports = brandService;
    