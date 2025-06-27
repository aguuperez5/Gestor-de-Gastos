const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Gasto = require('./gasto')(sequelize, DataTypes);

// Relación: Un usuario tiene muchos gastos
db.User.hasMany(db.Gasto, { foreignKey: 'user_id' });
db.Gasto.belongsTo(db.User, { foreignKey: 'user_id' });

module.exports = db;
