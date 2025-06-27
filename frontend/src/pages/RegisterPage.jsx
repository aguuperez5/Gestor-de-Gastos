import RegisterForm from '../components/RegisterForm';

function RegisterPage({ onRegisterSuccess }) {
  return (
    <div>
      <h1>Registro</h1>
      <RegisterForm onRegisterSuccess={onRegisterSuccess} />
    </div>
  );
}

export default RegisterPage;
