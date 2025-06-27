import { useEffect, useState } from 'react';
import api from '../services/api';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

function DeleteGastoPage({ token }) {
  const [gastos, setGastos] = useState([]);
  const [selected, setSelected] = useState(null);
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

  const handleDelete = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      await api.delete(`/gastos/${selected}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      enqueueSnackbar('Gasto eliminado correctamente', { variant: 'success' });
      setSelected(null);
      fetchGastos();
    } catch (error) {
      enqueueSnackbar('Error al eliminar gasto', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ color: 'var(--primary-dark)', fontWeight: 700, marginBottom: 24 }}>Eliminar Gasto</h2>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Selecciona un gasto para eliminar:</Typography>
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
              onClick={() => setSelected(gasto.id)}
            >
              <Typography variant="body2">
                {gasto.categoria} - ${gasto.monto} - {gasto.descripcion} - {gasto.fecha}
              </Typography>
            </Paper>
          ))}
        </Box>
        <Button
          variant="contained"
          color="error"
          disabled={!selected || loading}
          onClick={handleDelete}
        >
          {loading ? 'Eliminando...' : 'Eliminar Gasto'}
        </Button>
      </Box>
    </div>
  );
}

export default DeleteGastoPage;
