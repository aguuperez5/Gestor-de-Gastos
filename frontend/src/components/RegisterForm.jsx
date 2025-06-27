import { useState } from 'react';
import { registerUser } from '../services/api';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

const RegisterForm = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      onRegisterSuccess();
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
      <Typography variant="h5" mb={2} sx={{ color: 'var(--primary-dark)', fontWeight: 700 }}>
        Registro
      </Typography>
      <TextField
        label="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        required
        InputProps={{
          style: { background: 'white', borderRadius: 8 }
        }}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        required
        type="email"
        InputProps={{
          style: { background: 'white', borderRadius: 8 }
        }}
      />
      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
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
      >
        Registrar
      </Button>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
};

export default RegisterForm;
