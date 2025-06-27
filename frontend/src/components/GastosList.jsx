import { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, Typography, List, ListItem, ListItemText, TextField, MenuItem, Paper, Alert } from '@mui/material';

const categorias = [
  'Transporte',
  'Comida',
  'Alquiler',
  'Servicios',
  'Ocio',
  'Educación',
  'Salud',
  'Supermercado',
  'Mascotas',
  'Ropa',
  'Tecnología',
  'Viajes',
  'Impuestos',
  'Otro'
];

const GastosList = ({ token }) => {
  const [gastos, setGastos] = useState([]);
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [total, setTotal] = useState(null);
  const [mesError, setMesError] = useState('');
  const [anioError, setAnioError] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => `${currentYear - i}`);

  const fetchGastos = async () => {
    // Validación de mes
    if (mes && (isNaN(Number(mes)) || Number(mes) < 1 || Number(mes) > 12)) {
      setMesError('El mes debe ser un número entre 1 y 12');
      setGastos([]);
      setTotal(0);
      return;
    } else {
      setMesError('');
    }
    // Validación de año
    if (anio && (isNaN(Number(anio)) || Number(anio) < currentYear - 9 || Number(anio) > currentYear)) {
      setAnioError(`El año debe estar entre ${currentYear - 9} y ${currentYear}`);
      setGastos([]);
      setTotal(0);
      return;
    } else {
      setAnioError('');
    }
    try {
      const params = {};
      if (mes) params.mes = String(mes);
      if (anio) params.anio = String(anio);
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

  const fetchTotal = async () => {
    if (mes && (isNaN(Number(mes)) || Number(mes) < 1 || Number(mes) > 12)) {
      setTotal(0);
      return;
    }
    if (anio && (isNaN(Number(anio)) || Number(anio) < currentYear - 9 || Number(anio) > currentYear)) {
      setTotal(0);
      return;
    }
    try {
      const params = {};
      if (categoria) params.categoria = categoria;
      if (mes) params.mes = String(mes);
      if (anio) params.anio = String(anio);
      if (!categoria) {
        // Si no hay categoría, sumar el total de los gastos filtrados localmente
        const sum = gastos.reduce((acc, g) => acc + Number(g.monto), 0);
        setTotal(sum);
        return;
      }
      const res = await api.get('/gastos/total-categoria', {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      setTotal(res.data.total);
    } catch (error) {
      setTotal(null);
    }
  };

  useEffect(() => {
    fetchGastos();
    // eslint-disable-next-line
  }, [token, mes, anio, categoria]);

  useEffect(() => {
    fetchTotal();
    // eslint-disable-next-line
  }, [gastos, mes, anio, categoria]);

  return (
    <Box
      sx={{
        maxWidth: 600,
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
        Mis Gastos
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField
          select
          label="Año"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          sx={{ flex: 1, background: 'white', borderRadius: 1, minWidth: 100 }}
          InputProps={{
            style: { background: 'white', borderRadius: 8 }
          }}
          error={!!anioError}
          helperText={anioError}
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
          sx={{ flex: 1, background: 'white', borderRadius: 1, minWidth: 100 }}
          InputProps={{
            style: { background: 'white', borderRadius: 8 }
          }}
          error={!!mesError}
          helperText={mesError}
        />
        <TextField
          select
          label="Categoría"
          value={categoria || ''}
          onChange={(e) => setCategoria(e.target.value)}
          sx={{ flex: 2, background: 'white', borderRadius: 1, minWidth: 120 }}
          InputProps={{
            style: { background: 'white', borderRadius: 8 }
          }}
        >
          <MenuItem value="">Todas las categorías</MenuItem>
          {categorias.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ color: 'var(--primary-dark)', fontWeight: 600 }}>
          Total: ${total !== null ? total : 0}
        </Typography>
      </Box>
      {mesError && (
        <Alert severity="error" sx={{ mb: 2 }}>{mesError}</Alert>
      )}
      {anioError && (
        <Alert severity="error" sx={{ mb: 2 }}>{anioError}</Alert>
      )}
      <List>
        {gastos.length === 0 && !mesError && !anioError && (
          <Typography sx={{ color: '#888', textAlign: 'center', mt: 2 }}>
            No hay gastos para los filtros seleccionados.
          </Typography>
        )}
        {gastos.map((gasto) => (
          <Paper
            key={gasto.id}
            elevation={2}
            sx={{
              mb: 2,
              borderRadius: 'var(--border-radius)',
              bgcolor: 'white',
              borderLeft: '6px solid var(--primary-light)'
            }}
          >
            <ListItem divider={false}>
              <ListItemText
                primary={
                  <span style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>
                    {gasto.categoria} - ${gasto.monto}
                  </span>
                }
                secondary={
                  <span style={{ color: '#555' }}>
                    {gasto.descripcion} - {gasto.fecha}
                  </span>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default GastosList;
