import GastosList from '../components/GastosList';

function VisualizarGastosPage({ token }) {
  return (
    <div>
      <h2 style={{ color: 'var(--primary-dark)', fontWeight: 700, marginBottom: 24 }}>Visualizar Gastos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        <div style={{ flex: 1, minWidth: 400 }}>
          <GastosList token={token} />
        </div>
      </div>
    </div>
  );
}
export default VisualizarGastosPage;