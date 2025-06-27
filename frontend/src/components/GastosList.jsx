import { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, Typography, List, ListItem, ListItemText, TextField, MenuItem } from '@mui/material';

const GastosList = ({ token }) => {
  const [gastos, setGastos] = useState([]);
  const [mes, setMes] = useState('');
  const [categoria, setCategoria] = useState('');

  const fetchGastos = async () => {
    try {
      const params = {};
      if (mes) params.mes = mes;
      if (categoria) params.categoria = categoria;

      const res = await api.get('/gastos', {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      setGastos(res.data);
    } catch (error) {
      console.error('Error al obtener gastos', error);
    }
  };

  useEffect(() => {
    fetchGastos();
  }, [token, mes, categoria]);

  const categorias = ['Transporte', 'Comida', 'Alquiler', 'Servicios', 'Ocio', 'Educación', 'Salud'];

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" mb={2}>Mis Gastos</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          type="number"
          label="Mes (1-12)"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          sx={{ flex: 1 }}
        />
        <TextField
          select
          label="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          sx={{ flex: 2 }}
        >
          <MenuItem value="">Todas las categorías</MenuItem>
          {categorias.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
      </Box>
      <List>
        {gastos.map((gasto) => (
          <ListItem key={gasto.id} divider>
            <ListItemText
              primary={`${gasto.categoria} - $${gasto.monto}`}
              secondary={`${gasto.descripcion} - ${gasto.fecha}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GastosList;
