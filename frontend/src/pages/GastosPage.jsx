import { useState } from 'react';
import GastoForm from '../components/GastoForm';
import GastosList from '../components/GastosList';

function GastosPage({ token }) {
  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1 style={{
        color: 'var(--primary-dark)',
        textAlign: 'center',
        fontWeight: 800,
        marginBottom: 32,
        letterSpacing: 1
      }}>
        Mis Gastos
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
        <div style={{ flex: 1, minWidth: 350 }}>
          <GastoForm token={token} onGastoAdded={() => {}} />
        </div>
        <div style={{ flex: 2, minWidth: 400 }}>
          <GastosList token={token} />
        </div>
      </div>
    </div>
  );
}

export default GastosPage;
