import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createGasto } from '../services/api';
import { Box, Button, TextField, MenuItem, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const schema = yup.object().shape({
  monto: yup.number().typeError('Debe ser un número').positive('Debe ser mayor a 0').required('El monto es obligatorio'),
  categoria: yup.string().required('La categoría es obligatoria'),
  descripcion: yup.string(),
  fecha: yup.string().required('La fecha es obligatoria'),
});

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

const GastoForm = ({ token, onGastoAdded }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      monto: '',
      categoria: '',
      descripcion: '',
      fecha: ''
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createGasto(data, token);
      enqueueSnackbar('Gasto agregado correctamente', { variant: 'success' });
      onGastoAdded();
      reset();
    } catch (error) {
      enqueueSnackbar('Error al crear gasto', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
        Nuevo Gasto
      </Typography>
      <TextField
        label="Monto"
        type="number"
        fullWidth
        margin="normal"
        required
        {...register('monto')}
        error={!!errors.monto}
        helperText={errors.monto?.message}
        InputProps={{
          style: { background: 'white', borderRadius: 8 }
        }}
      />
      <TextField
        select
        label="Categoría"
        fullWidth
        margin="normal"
        required
        {...register('categoria')}
        error={!!errors.categoria}
        helperText={errors.categoria?.message}
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
        fullWidth
        margin="normal"
        {...register('descripcion')}
        error={!!errors.descripcion}
        helperText={errors.descripcion?.message}
        InputProps={{
          style: { background: 'white', borderRadius: 8 }
        }}
      />
      <TextField
        label="Fecha"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
        {...register('fecha')}
        error={!!errors.fecha}
        helperText={errors.fecha?.message}
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
        {loading ? 'Agregando...' : 'Agregar Gasto'}
      </Button>
    </Box>
  );
};

export default GastoForm;
