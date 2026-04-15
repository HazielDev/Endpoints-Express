const express = require('express');
const router = express.Router();
const { productsService, categoryService, brandService } = require('../services');

router.get('/', (req, res) => {
    res.json(productsService.getAll());
});

router.get('/precio/:price', (req, res) => {
    const { price } = req.params;
    res.status(200).json(productsService.getByPrice(price));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = productsService.getById(id);

    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Enriquecer con datos de categoría y marca
    const category = categoryService.getById(product.categoryId);
    const brand = brandService.getById(product.brandId);

    res.status(200).json({
        ...product,
        category: category || null,
        brand: brand || null
    });
});

router.post('/', (req, res) => {
    const { productName, Price, description, categoryId, brandId } = req.body;

    if (!productName || !Price || !description || !categoryId || !brandId) {
        return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    // Validar que la categoría y marca existan
    if (!categoryService.getById(categoryId)) {
        return res.status(400).json({ message: `Categoría con id ${categoryId} no encontrada` });
    }
    if (!brandService.getById(brandId)) {
        return res.status(400).json({ message: `Marca con id ${brandId} no encontrada` });
    }

    const newProduct = productsService.create({
        productName, Price, description, active: true, Stock: 0, categoryId, brandId
    });

    res.status(201).json({ message: "Producto creado exitosamente", product: newProduct });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { productName, Price, description, categoryId, brandId } = req.body;

    if (!productName || !Price || !description || !categoryId || !brandId) {
        return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const updated = productsService.update(id, { productName, Price, description, categoryId, brandId });

    if (!updated) {
        return res.status(404).json({ message: `Producto con id ${id} no encontrado` });
    }

    res.json({ message: `Producto con ID: ${id} se actualizo de manera exitosa`, product: updated });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const deleted = productsService.delete(id);

    if (!deleted) {
        return res.status(404).json({ message: `Producto con id ${id} no encontrado` });
    }

    res.json({ message: `Producto con ID: ${id} se borro de manera exitosa`, product: deleted });
});

module.exports = router;