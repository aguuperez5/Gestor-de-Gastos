import GastoForm from '../components/GastoForm';

function AddGastoPage({ token }) {
  return (
    <div>
      <h2 style={{ color: 'var(--primary-dark)', fontWeight: 700, marginBottom: 24 }}>Agregar Gasto</h2>
      <GastoForm token={token} onGastoAdded={() => {}} />
    </div>
  );
}

export default AddGastoPage;
