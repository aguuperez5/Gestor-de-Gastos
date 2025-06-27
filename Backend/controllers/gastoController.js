const db = require('../models');

// Crear Gasto
exports.createGasto = async (req, res) => {
  const { monto, categoria, descripcion, fecha } = req.body;

  try {
    const gasto = await db.Gasto.create({
      user_id: req.user.userId,
      monto,
      categoria,
      descripcion,
      fecha
    });
    res.status(201).json({ message: 'Gasto creado', gasto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el gasto' });
  }
};
//Obtener Gastos
exports.getGastos = async (req, res) => {
  const userId = req.user.userId;  // El ID del usuario que viene del JWT
  const { mes, anio, categoria } = req.query;  // Parámetros opcionales de filtro

  const where = { user_id: userId };

  // Si el usuario quiere filtrar por mes y/o año:
  if (mes || anio) {
    where[db.Sequelize.Op.and] = [];
    if (mes) {
      where[db.Sequelize.Op.and].push(
        db.Sequelize.where(
          db.Sequelize.fn('EXTRACT', db.Sequelize.literal('MONTH FROM "fecha"')),
          mes
        )
      );
    }
    if (anio) {
      where[db.Sequelize.Op.and].push(
        db.Sequelize.where(
          db.Sequelize.fn('EXTRACT', db.Sequelize.literal('YEAR FROM "fecha"')),
          anio
        )
      );
    }
  }

  // Si quiere filtrar por categoría:
  if (categoria) {
    where.categoria = categoria;
  }

  try {
    const gastos = await db.Gasto.findAll({
      where,
      include: db.User
    });
    res.status(200).json(gastos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los gastos' });
  }
};  
// Editar Gasto
exports.updateGasto = async (req, res) => {
  const gastoId = req.params.id;
  const userId = req.user.userId;  // Solo puede modificar sus propios gastos
  const { monto, categoria, descripcion, fecha } = req.body;

  try {
    const gasto = await db.Gasto.findOne({ where: { id: gastoId, user_id: userId } });

    if (!gasto) {
      return res.status(404).json({ message: 'Gasto no encontrado o no autorizado' });
    }

    await gasto.update({ monto, categoria, descripcion, fecha });

    res.status(200).json({ message: 'Gasto actualizado', gasto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el gasto' });
  }
};
// Eliminar Gasto
exports.deleteGasto = async (req, res) => {
  const gastoId = req.params.id;
  const userId = req.user.userId;

  try {
    const gasto = await db.Gasto.findOne({ where: { id: gastoId, user_id: userId } });

    if (!gasto) {
      return res.status(404).json({ message: 'Gasto no encontrado o no autorizado' });
    }

    await gasto.destroy();

    res.status(200).json({ message: 'Gasto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el gasto' });
  }
};
// Obtener Total Mensual
exports.getTotalMensual = async (req, res) => {
  const userId = req.user.userId;
  const { mes } = req.query;

  if (!mes) {
    return res.status(400).json({ message: 'Debes proporcionar el número de mes (1-12)' });
  }

  try {
    const total = await db.Gasto.sum('monto', {
      where: {
        user_id: userId,
        [db.Sequelize.Op.and]: db.Sequelize.where(
          db.Sequelize.fn('EXTRACT', db.Sequelize.literal('MONTH FROM "fecha"')),
          mes
        )
      }
    });

    res.status(200).json({ total: total || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al calcular el total mensual' });
  }
};
// Obtener Total por Categoría (ahora acepta año, mes y categoría)
exports.getTotalPorCategoria = async (req, res) => {
  const userId = req.user.userId;
  const { categoria, mes, anio } = req.query;

  if (!categoria) {
    return res.status(400).json({ message: 'Debes proporcionar una categoría' });
  }

  const where = { user_id: userId, categoria };

  if (mes) {
    where[db.Sequelize.Op.and] = [
      db.Sequelize.where(
        db.Sequelize.fn('EXTRACT', db.Sequelize.literal('MONTH FROM "fecha"')),
        mes
      )
    ];
  }

  if (anio) {
    if (!where[db.Sequelize.Op.and]) where[db.Sequelize.Op.and] = [];
    where[db.Sequelize.Op.and].push(
      db.Sequelize.where(
        db.Sequelize.fn('EXTRACT', db.Sequelize.literal('YEAR FROM "fecha"')),
        anio
      )
    );
  }

  try {
    const total = await db.Gasto.sum('monto', { where });
    res.status(200).json({ total: total || 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al calcular el total por categoría' });
  }
};
