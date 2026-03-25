
const productsRouter = require('./prodsRouter')
const usersRouter = require('./usersRouter')
const supplinersRouter = require('./supplinersRouter')
const categoryRouter = require('./categoryRouter')
const brandsRouter = require('./brandsRouter')
const inventoryRouter = require('./inventoryMovementsRouter')

function routerApi(app){
    app.use('/products', productsRouter)
    app.use('/suppliers', supplinersRouter)
    app.use('/users', usersRouter)
    app.use('/categories', categoryRouter)
    app.use('/brands', brandsRouter)
    app.use('/inventory', inventoryRouter)
}

module.exports = routerApi;