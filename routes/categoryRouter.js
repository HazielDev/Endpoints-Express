const express = require('express');
const router = express.Router();
const { categoryService, productsService } = require('../services');

router.get('/', (req, res) => {
    res.json(categoryService.getAll());
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const category = categoryService.getById(id);

    if (!category) {
        return res.status(404).json({ message: `Categoría con id ${id} no encontrada` });
    }

    res.json(category);
});

router.post('/', (req, res) => {
    const { categoryName, description } = req.body;

    if (!categoryName || !description) {
        return res.status(400).json({ message: 'categoryName y description son obligatorios' });
    }

    const newCategory = categoryService.create({ categoryName, description });
    res.status(201).json(newCategory);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { categoryName, description } = req.body;

    if (!categoryName || !description) {
        return res.status(400).json({ message: 'categoryName y description son obligatorios' });
    }

    const updated = categoryService.update(id, { categoryName, description });

    if (!updated) {
        return res.status(404).json({ message: `Categoría con id ${id} no encontrada` });
    }

    res.json(updated);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const patched = categoryService.patch(id, updates);

    if (!patched) {
        return res.status(404).json({ message: `Categoría con id ${id} no encontrada` });
    }

    res.json(patched);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // Verificar si hay productos asociados a esta categoría
    if (productsService.hasCategoryProducts(id)) {
        return res.status(400).json({ message: `No se puede eliminar la categoría con id ${id} porque tiene productos asociados` });
    }

    const deleted = categoryService.delete(id);

    if (!deleted) {
        return res.status(404).json({ message: `Categoría con id ${id} no encontrada` });
    }

    res.status(200).json({ message: `Categoría con id ${id} se borró 👍`, category: deleted });
});

module.exports = router;