import RegisterForm from '../components/RegisterForm';

function RegisterPage({ onRegisterSuccess }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <RegisterForm onRegisterSuccess={onRegisterSuccess} />
    </div>
  );
}

export default RegisterPage;