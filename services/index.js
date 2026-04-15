const BrandService = require('./brandsService');
const CategoryService = require('./categoryService');
const ProductsService = require('./productsService');
const SuppliersService = require('./suppliersService');
const UsersService = require('./usersService');
const InventoryMovementsService = require('./inventoryMovementsService');

// Instancias compartidas — así los routers pueden interactuar entre sí
const brandService = new BrandService();
const categoryService = new CategoryService();
const productsService = new ProductsService();
const suppliersService = new SuppliersService();
const usersService = new UsersService();
const inventoryMovementsService = new InventoryMovementsService();

module.exports = {
    brandService,
    categoryService,
    productsService,
    suppliersService,
    usersService,
    inventoryMovementsService
};
