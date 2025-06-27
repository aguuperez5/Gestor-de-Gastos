import LoginForm from '../components/LoginForm';

function LoginPage({ onLogin }) {
  const handleLogin = (token) => {
    onLogin(token);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage;