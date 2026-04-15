const express = require("express");
const router = express.Router();
const { brandService, productsService } = require('../services');

router.get('/', (req, res) => {
    res.json(brandService.getAll());
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const brand = brandService.getById(id);

    if (!brand) {
        return res.status(404).json({ message: `Marca con id ${id} no encontrada` });
    }

    res.json(brand);
});

router.post('/', (req, res) => {
    const { brandName, description } = req.body;

    if (!brandName || !description) {
        return res.status(400).json({ message: 'brandName y description son obligatorios' });
    }

    const newBrand = brandService.create({ brandName, description });
    res.status(201).json(newBrand);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { brandName, description } = req.body;

    if (!brandName || !description) {
        return res.status(400).json({ message: 'brandName y description son obligatorios' });
    }

    const updatedBrand = brandService.update(id, { brandName, description });

    if (!updatedBrand) {
        return res.status(404).json({ message: `Marca con id ${id} no encontrada` });
    }

    res.json(updatedBrand);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // Verificar si hay productos asociados a esta marca
    if (productsService.hasBrandProducts(id)) {
        return res.status(400).json({ message: `No se puede borrar la marca con id: ${id} porque tiene productos asociados` });
    }

    const deletedBrand = brandService.delete(id);

    if (!deletedBrand) {
        return res.status(404).json({ message: `Marca con id ${id} no encontrada` });
    }

    res.json({ message: `Marca con id ${id} borrada con éxito.`, brand: deletedBrand });
});

module.exports = router;