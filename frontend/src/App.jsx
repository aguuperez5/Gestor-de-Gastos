import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddGastoPage from './pages/AddGastoPage';
import EditGastoPage from './pages/EditGastoPage';
import DeleteGastoPage from './pages/DeleteGastoPage';
import VisualizarGastosPage from './pages/VisualizarGastosPage';

function App() {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('login');
  const [menuPage, setMenuPage] = useState('visualizar');

  const handleLogin = async (token) => {
    setToken(token);
    setPage('menu');
    setMenuPage('visualizar');
  };

  const handleRegisterSuccess = () => {
    alert('Registro exitoso, ahora inicia sesión');
    setPage('login');
  };

  if (!token) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none'
      }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          <button
            onClick={() => setPage('login')}
            style={{
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--border-radius)',
              padding: '10px 28px',
              fontWeight: 'bold',
              fontSize: 18,
              boxShadow: '0 2px 8px #a5d6a7',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            Login
          </button>
          <button
            onClick={() => setPage('register')}
            style={{
              background: 'var(--primary-light)',
              color: 'var(--primary-dark)',
              border: 'none',
              borderRadius: 'var(--border-radius)',
              padding: '10px 28px',
              fontWeight: 'bold',
              fontSize: 18,
              boxShadow: '0 2px 8px #a5d6a7',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            Registro
          </button>
        </div>
        {page === 'login' && <LoginPage onLogin={handleLogin} />}
        {page === 'register' && <RegisterPage onRegisterSuccess={handleRegisterSuccess} />}
      </div>
    );
  }

  // Layout con menú lateral o superior (responsive)
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', background: 'none' }}>
      <aside
        className="responsive-aside"
        style={{
          width: 220,
          background: 'var(--surface)',
          borderRight: '2px solid var(--primary-light)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '32px 0 16px 0',
          minHeight: '100vh'
        }}
      >
        <nav>
          <ul className="responsive-menu-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <button
                className="responsive-menu-btn"
                onClick={() => setMenuPage('add')}
                style={{
                  ...menuBtnStyle,
                  background: menuPage === 'add' ? 'var(--primary-light)' : 'transparent',
                  color: menuPage === 'add' ? 'var(--primary-dark)' : 'var(--primary-dark)'
                }}
              >
                Agregar Gasto
              </button>
            </li>
            <li>
              <button
                className="responsive-menu-btn"
                onClick={() => setMenuPage('edit')}
                style={{
                  ...menuBtnStyle,
                  background: menuPage === 'edit' ? 'var(--primary-light)' : 'transparent',
                  color: menuPage === 'edit' ? 'var(--primary-dark)' : 'var(--primary-dark)'
                }}
              >
                Editar Gasto
              </button>
            </li>
            <li>
              <button
                className="responsive-menu-btn"
                onClick={() => setMenuPage('delete')}
                style={{
                  ...menuBtnStyle,
                  background: menuPage === 'delete' ? 'var(--primary-light)' : 'transparent',
                  color: menuPage === 'delete' ? 'var(--primary-dark)' : 'var(--primary-dark)'
                }}
              >
                Eliminar Gasto
              </button>
            </li>
            <li>
              <button
                className="responsive-menu-btn"
                onClick={() => setMenuPage('visualizar')}
                style={{
                  ...menuBtnStyle,
                  background: menuPage === 'visualizar' ? 'var(--primary-light)' : 'transparent',
                  color: menuPage === 'visualizar' ? 'var(--primary-dark)' : 'var(--primary-dark)'
                }}
              >
                Visualizar Gastos
              </button>
            </li>
          </ul>
        </nav>
        <button
          className="responsive-logout-btn"
          onClick={() => { setToken(null); setPage('login'); }}
          style={{
            ...menuBtnStyle,
            background: 'var(--primary-dark)',
            color: 'white',
            marginTop: 32,
            marginLeft: 16,
            marginRight: 16,
            alignSelf: 'flex-end'
          }}
        >
          Cerrar sesión
        </button>
      </aside>
      <main className="responsive-main" style={{ flex: 1, padding: 32 }}>
        {menuPage === 'add' && <AddGastoPage token={token} />}
        {menuPage === 'edit' && <EditGastoPage token={token} />}
        {menuPage === 'delete' && <DeleteGastoPage token={token} />}
        {menuPage === 'visualizar' && <VisualizarGastosPage token={token} />}
      </main>
    </div>
  );
}

const menuBtnStyle = {
  width: '100%',
  padding: '16px 24px',
  border: 'none',
  borderRadius: '0 24px 24px 0',
  textAlign: 'left',
  fontSize: 17,
  fontWeight: 600,
  marginBottom: 8,
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s'
};

export default App;