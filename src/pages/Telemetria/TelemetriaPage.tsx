import React from 'react';
import TelemetriaForm from './TelemetriaForm';
import TelemetriaList from './TelemetriaList';
import VelocidadeChart from './VelocidadeChart'; // Importado

const TelemetriaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Telemetria</h1>

      {/* Formulário de Inserção de Evento */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Registrar Evento de Telemetria</h2>
        <TelemetriaForm />
      </div>

       {/* Gráfico de Velocidade */}
       <div className="mb-8">
         <h2 className="text-2xl font-semibold mb-4">Gráfico de Velocidade</h2>
         <div className="bg-blue-800 p-6 rounded-lg">
            <VelocidadeChart />
         </div>
       </div>


      {/* Listagem de Eventos */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Histórico de Eventos</h2>
        <TelemetriaList />
      </div>
    </div>
  );
};

export default TelemetriaPage; 