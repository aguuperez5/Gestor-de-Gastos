module.exports = (sequelize, DataTypes) => {
  const Gasto = sequelize.define('Gasto', {
    monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    categoria: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT },
    fecha: { type: DataTypes.DATEONLY, allowNull: false }
  }, { tableName: 'gastos', timestamps: false });
  return Gasto;
};
