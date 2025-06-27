import { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, Typography, TextField, MenuItem, Button, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';

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
  'Otros'
];

function EditGastoPage({ token }) {
  const [gastos, setGastos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ monto: '', categoria: '', descripcion: '', fecha: '' });
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGastos();
  }, [token]);

  const fetchGastos = async () => {
    try {
      const res = await api.get('/gastos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGastos(res.data);
    } catch (error) {
      enqueueSnackbar('Error al obtener gastos', { variant: 'error' });
    }
  };

  const handleSelect = (gasto) => {
    setSelected(gasto.id);
    setForm({
      monto: gasto.monto,
      categoria: gasto.categoria,
      descripcion: gasto.descripcion || '',
      fecha: gasto.fecha
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put(`/gastos/${selected}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      enqueueSnackbar('Gasto actualizado correctamente', { variant: 'success' });
      setSelected(null);
      setForm({ monto: '', categoria: '', descripcion: '', fecha: '' });
      fetchGastos();
    } catch (error) {
      enqueueSnackbar('Error al actualizar gasto', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'var(--primary-dark)', fontWeight: 700, marginBottom: 24 }}>Editar Gasto</h2>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Selecciona un gasto para editar:</Typography>
        <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 2 }}>
          {gastos.map((gasto) => (
            <Paper
              key={gasto.id}
              sx={{
                mb: 1,
                p: 1,
                bgcolor: selected === gasto.id ? 'var(--primary-light)' : 'white',
                cursor: 'pointer',
                borderLeft: selected === gasto.id ? '4px solid var(--primary-dark)' : '4px solid transparent'
              }}
              onClick={() => handleSelect(gasto)}
            >
              <Typography variant="body2">
                {gasto.categoria} - ${gasto.monto} - {gasto.descripcion} - {gasto.fecha}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
      {selected && (
        <Box
          component="form"
          onSubmit={handleUpdate}
          sx={{
            maxWidth: 400,
            p: 3,
            boxShadow: 4,
            borderRadius: 'var(--border-radius)',
            bgcolor: 'var(--surface)',
            border: '2px solid var(--primary-light)'
          }}
        >
          <TextField
            label="Monto"
            name="monto"
            type="number"
            value={form.monto}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              style: { background: 'white', borderRadius: 8 }
            }}
          />
          <TextField
            select
            label="Categoría"
            name="categoria"
            value={form.categoria || ''}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              style: { background: 'white', borderRadius: 8 }
            }}
          >
            <MenuItem value="">Seleccione categoría</MenuItem>
            {categorias.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Descripción"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              style: { background: 'white', borderRadius: 8 }
            }}
          />
          <TextField
            label="Fecha"
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
            InputProps={{
              style: { background: 'white', borderRadius: 8 }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: 'var(--primary)',
              color: 'white',
              fontWeight: 700,
              '&:hover': { bgcolor: 'var(--primary-dark)' }
            }}
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </Box>
      )}
    </div>
  );
}

export default EditGastoPage;
