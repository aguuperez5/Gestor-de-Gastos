const express = require('express');
const cors = require('cors'); // <-- agrega esto
const app = express();
const db = require('./models');

require('dotenv').config();

app.use(cors()); // <-- y esto
app.use(express.json());

// Importar rutas
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/gastos', require('./routes/gastoRoutes'));

// Sincronizar modelos
db.sequelize.sync()
  .then(() => console.log('🟢 Base de datos conectada y sincronizada'))
  .catch(err => console.error('Error al sincronizar:', err));

module.exports = app;
