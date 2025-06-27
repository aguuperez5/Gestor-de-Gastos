import { useState } from 'react';
import GastoForm from '../components/GastoForm';
import GastosList from '../components/GastosList';

function GastosPage({ token }) {
  return (
    <div>
      <h1>Mis Gastos</h1>
      <GastoForm token={token} onGastoAdded={() => {}} />
      <GastosList token={token} />
    </div>
  );
}

export default GastosPage;
