import { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, Typography, TextField, Button, MenuItem, Paper } from '@mui/material';

const Totales = ({ token }) => {
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [totalMes, setTotalMes] = useState(null);
  const [totalCategoria, setTotalCategoria] = useState(null);

  const fetchTotalMes = async () => {
    try {
      const res = await api.get(`/gastos/total-mensual?mes=${mes}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTotalMes(res.data.total);
    } catch (error) {
      console.error('Error total mes', error);
    }
  };

  const fetchTotalCategoria = async () => {
    try {
      const params = {};
      if (categoria) params.categoria = categoria;
      if (mes) params.mes = mes;
      if (anio) params.anio = anio;
      const res = await api.get('/gastos/total-categoria', {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      setTotalCategoria(res.data.total);
    } catch (error) {
      console.error('Error total categoría', error);
    }
  };

  // Años para el filtro (últimos 10 años)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => `${currentYear - i}`);

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        boxShadow: 4,
        borderRadius: 'var(--border-radius)',
        bgcolor: 'var(--surface)',
        border: '2px solid var(--primary-light)'
      }}
    >
      <Typography variant="h6" mb={2} sx={{ color: 'var(--primary-dark)', fontWeight: 700 }}>
        Totales
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          type="number"
          label="Mes (1-12)"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          fullWidth
          sx={{ mb: 1, background: 'white', borderRadius: 1 }}
          InputProps={{
            style: { background: 'white', borderRadius: 8 }
          }}
        />
        <Button
          onClick={fetchTotalMes}
          variant="contained"
          sx={{
            bgcolor: 'var(--primary)',
            color: 'white',
            fontWeight: 700,
            mt: 1,
            '&:hover': { bgcolor: 'var(--primary-dark)' }
          }}
          fullWidth
        >
          Ver Total Mensual
        </Button>
        {totalMes !== null && (
          <Typography sx={{ mt: 1, color: 'var(--primary-dark)', fontWeight: 600 }}>
            Total del mes: ${totalMes}
          </Typography>
        )}
      </Box>

      <Box>
        <TextField
          select
          label="Año"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          fullWidth
          sx={{ mb: 1, background: 'white', borderRadius: 1 }}
          InputProps={{
            style: { background: 'white', borderRadius: 8 }
          }}
        >
          <MenuItem value="">Todos los años</MenuItem>
          {years.map((y) => (
            <MenuItem key={y} value={y}>{y}</MenuItem>
          ))}
        </TextField>
        <TextField
          type="number"
          label="Mes (1-12)"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          fullWidth
          sx={{ mb: 1, background: 'white', borderRadius: 1 }}
          InputProps={{
            style: { background: 'white', borderRadius: 8 }
          }}
        />
        <TextField
          select
          label="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          fullWidth
          sx={{ mb: 1, background: 'white', borderRadius: 1 }}
          InputProps={{
            style: { background: 'white', borderRadius: 8 }
          }}
        >
          <MenuItem value="">Seleccione categoría</MenuItem>
          <MenuItem>Transporte</MenuItem>
          <MenuItem>Comida</MenuItem>
          <MenuItem>Alquiler</MenuItem>
          <MenuItem>Servicios</MenuItem>
          <MenuItem>Ocio</MenuItem>
          <MenuItem>Educación</MenuItem>
          <MenuItem>Salud</MenuItem>
        </TextField>
        <Button
          onClick={fetchTotalCategoria}
          variant="contained"
          sx={{
            bgcolor: 'var(--primary)',
            color: 'white',
            fontWeight: 700,
            mt: 1,
            '&:hover': { bgcolor: 'var(--primary-dark)' }
          }}
          fullWidth
        >
          Ver Total por Categoría/Año/Mes
        </Button>
        {totalCategoria !== null && (
          <Typography sx={{ mt: 1, color: 'var(--primary-dark)', fontWeight: 600 }}>
            Total: ${totalCategoria}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default Totales;