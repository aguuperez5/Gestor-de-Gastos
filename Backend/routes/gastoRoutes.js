const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gastoController');
const authMiddleware = require('../middleware/authMiddleware');

// Crear gasto (requiere token)
router.post('/', authMiddleware, gastoController.createGasto);

// Obtener gastos (requiere token)
router.get('/', authMiddleware, gastoController.getGastos);

// Editar gasto (requiere token)
router.put('/:id', authMiddleware, gastoController.updateGasto);

// Eliminar gasto (requiere token)
router.delete('/:id', authMiddleware, gastoController.deleteGasto);

// Obtener total mensual (requiere token)
router.get('/total-mensual', authMiddleware, gastoController.getTotalMensual);

// Obtener total por categoría (requiere token)
router.get('/total-categoria', authMiddleware, gastoController.getTotalPorCategoria);


module.exports = router;