const express = require('express')
const app = express();
const PORT = 3000;
const routerApi = require('./routes/rutas')

app.use(express.json());
routerApi(app);

app.listen(PORT, ()=>{
    console.log(`MI PUERTO ${PORT}`)
});

