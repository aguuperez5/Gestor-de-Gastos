import { useEffect, useState } from 'react';
import api from '../services/api';

const Totales = ({ token }) => {
  const [mes, setMes] = useState('');
  const [categoria, setCategoria] = useState('');
  const [totalMes, setTotalMes] = useState(null);
  const [totalCategoria, setTotalCategoria] = useState(null);

  const fetchTotalMes = async () => {
    try {
      const res = await api.get(`/gastos/total-mensual?mes=${mes}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTotalMes(res.data.total);
    } catch (error) {
      console.error('Error total mes', error);
    }
  };

  const fetchTotalCategoria = async () => {
    try {
      const res = await api.get(`/gastos/total-categoria?categoria=${categoria}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTotalCategoria(res.data.total);
    } catch (error) {
      console.error('Error total categoría', error);
    }
  };

  return (
    <div>
      <h3>Totales</h3>

      <div>
        <input
          type="number"
          placeholder="Mes (1-12)"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
        />
        <button onClick={fetchTotalMes}>Ver Total Mensual</button>
        {totalMes !== null && <p>Total del mes: ${totalMes}</p>}
      </div>

      <div>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Seleccione categoría</option>
          <option>Transporte</option>
          <option>Comida</option>
          <option>Alquiler</option>
          <option>Servicios</option>
          <option>Ocio</option>
          <option>Educación</option>
          <option>Salud</option>
        </select>
        <button onClick={fetchTotalCategoria}>Ver Total por Categoría</button>
        {totalCategoria !== null && <p>Total de la categoría: ${totalCategoria}</p>}
      </div>
    </div>
  );
};

export default Totales;