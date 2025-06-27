import LoginForm from '../components/LoginForm';

function LoginPage({ onLogin }) {
  const handleLogin = (token) => {
    onLogin(token);
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage;
