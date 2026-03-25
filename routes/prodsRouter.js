const express = require('express')
const router = express.Router();
const prodsList = require('../data/prods');
const catsList = require('../data/cats');

router.get('/', (req, res) => {
    res.json(prodsList);
});

router.get('/precio/:price', (req, res) => {
    const {price} = req.params;
    res.json(prodsList.filter(p => p.Price == price))
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const findProd = prodsList.find(p => p.Id == id);
    
    if(findProd){
        const cat = catsList.find(i => i.id == findProd.id )
        console.log(cat);
        
        findProd.brandName = cat.categoryName;
        res.status(200).json(prodsList.find(p => p.Id == id))
    }else{
        res.status(404).json({ message: "producto, no encontrado" })
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = prodsList.findIndex(s => s.Id == id);

    if (index === -1) {
        return res.status(404).json({ message: `Supplier with id ${id} not found` });
    }

    const deleted = prodsList.splice(index, 1);
    res.json({ message: `Producto con ID: ${id} se borro de manera exitosa`, supplier: deleted[0] });
});

module.exports = router;