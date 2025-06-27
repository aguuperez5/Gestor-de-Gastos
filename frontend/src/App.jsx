import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GastosPage from './pages/GastosPage';
import { loginUser, registerUser } from './services/api';

function App() {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('login');

  const handleLogin = async (token) => {
    setToken(token);
    setPage('gastos');
  };

  const handleRegisterSuccess = () => {
    alert('Registro exitoso, ahora inicia sesión');
    setPage('login');
  };

  // Navegación simple
  if (!token) {
    return (
      <div>
        <button onClick={() => setPage('login')}>Login</button>
        <button onClick={() => setPage('register')}>Registro</button>
        {page === 'login' && <LoginPage onLogin={handleLogin} />}
        {page === 'register' && <RegisterPage onRegisterSuccess={handleRegisterSuccess} />}
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => { setToken(null); setPage('login'); }}>Cerrar sesión</button>
      <GastosPage token={token} />
    </div>
  );
}

export default App;