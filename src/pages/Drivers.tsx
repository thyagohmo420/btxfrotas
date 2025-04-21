import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Clock, AlertTriangle, Award } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DriverForm from '../components/DriverForm';

const drivers = [
  {
    id: 1,
    name: 'João Silva',
    cnh: '12345678900',
    cnhExpiry: '2025-06-15',
    status: 'Disponível',
    phone: '(11) 98765-4321',
    assignedVehicle: 'Fiat Toro (ABC-1234)',
    lastTrip: '2024-03-15',
    score: 92,
    trips: 150,
    alerts: []
  },
  {
    id: 2,
    name: 'Maria Santos',
    cnh: '09876543211',
    cnhExpiry: '2024-08-20',
    status: 'Em Viagem',
    phone: '(11) 98765-1234',
    assignedVehicle: 'VW Gol (XYZ-5678)',
    lastTrip: '2024-03-16',
    score: 88,
    trips: 120,
    alerts: ['CNH vencendo em 60 dias']
  }
];

const DriverCard = ({ driver }: any) => {
  return (
    <div className="bg-blue-700 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-black">{driver.name}</h3>
          <p className="text-black">CNH: {driver.cnh}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${
          driver.status === 'Disponível' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
        }`}>
          {driver.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-blue-200">Validade CNH</p>
          <p className="font-medium text-black">
            {format(new Date(driver.cnhExpiry), 'dd/MM/yyyy', { locale: ptBR })}
          </p>
        </div>
        <div>
          <p className="text-sm text-blue-200">Telefone</p>
          <p className="font-medium text-black">{driver.phone}</p>
        </div>
        <div>
          <p className="text-sm text-blue-200">Veículo Atual</p>
          <p className="font-medium text-black">{driver.assignedVehicle}</p>
        </div>
        <div>
          <p className="text-sm text-blue-200">Última Viagem</p>
          <p className="font-medium text-black">
            {format(new Date(driver.lastTrip), 'dd/MM/yyyy', { locale: ptBR })}
          </p>
        </div>
      </div>

      <div className="border-t border-blue-600 pt-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-300" />
            <span className="text-sm text-black">Score: {driver.score}/100</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-300" />
            <span className="text-sm text-black">{driver.trips} viagens</span>
          </div>
        </div>
        {driver.alerts.map((alert: string, index: number) => (
          <div key={index} className="flex items-center gap-2 text-orange-300">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">{alert}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIInsights = () => {
  return (
    <div className="bg-blue-700 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4 text-white">Insights da IA</h2>
      <div className="space-y-4">
        <div className="p-4 bg-blue-600 rounded-lg">
          <ul className="space-y-2 text-sm text-blue-100">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-300 rounded-full" />
              85% dos motoristas mantêm score acima de 85/100
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-300 rounded-full" />
              Necessidade de renovação de CNH para 2 motoristas nos próximos 90 dias
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-300 rounded-full" />
              Sugestão: Programa de reconhecimento para motoristas com alto desempenho
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleAddDriver = (formData: any) => {
    console.log('Novo motorista adicionado (a ser implementado):', formData);
    handleCloseForm();
  };

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-blue-300" />
          <h1 className="text-2xl font-semibold text-white">Gestão de Motoristas</h1>
        </div>
        <button 
          onClick={handleOpenForm}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Motorista
        </button>
      </div>

      <div className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-blue-300 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar motoristas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-blue-700 border border-blue-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-blue-300 text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 border border-blue-600 rounded-lg hover:bg-blue-600 transition-colors text-white">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {drivers.map(driver => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>

      <AIInsights />

      {isFormOpen && (
        <DriverForm 
          onClose={handleCloseForm} 
          onSubmit={handleAddDriver} 
        />
      )}
    </div>
  );
};

export default Drivers;