import { useState } from 'react';
import { createGasto } from '../services/api';
import { Box, Button, TextField, MenuItem, Typography, Alert } from '@mui/material';

const GastoForm = ({ token, onGastoAdded }) => {
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('Transporte');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [error, setError] = useState('');

  const categorias = ['Transporte', 'Comida', 'Alquiler', 'Servicios', 'Ocio', 'Educación', 'Salud'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGasto({ monto, categoria, descripcion, fecha }, token);
      onGastoAdded();
      setMonto('');
      setDescripcion('');
      setFecha('');
      setError('');
    } catch (error) {
      setError('Error al crear gasto');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" mb={2}>Nuevo Gasto</Typography>
      <TextField
        label="Monto"
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        select
        label="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        fullWidth
        margin="normal"
        required
      >
        {categorias.map((cat) => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Fecha"
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Agregar Gasto
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default GastoForm;
