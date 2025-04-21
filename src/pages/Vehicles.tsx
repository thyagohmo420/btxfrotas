import React, { useState } from 'react';
import { Car, Plus, Filter, Search, MoreVertical, AlertTriangle, Fuel, Activity } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import VehicleForm from '../components/VehicleForm';

const vehicles = [
  {
    id: 1,
    plate: 'ABC-1234',
    model: 'Fiat Toro',
    year: 2022,
    status: 'Ativo',
    mileage: 45000,
    fuelType: 'Diesel',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-04-15',
    fuelEfficiency: 9.5,
    alerts: ['Manutenção preventiva em 15 dias']
  },
  {
    id: 2,
    plate: 'XYZ-5678',
    model: 'VW Gol',
    year: 2021,
    status: 'Em Manutenção',
    mileage: 35000,
    fuelType: 'Flex',
    lastMaintenance: '2024-03-01',
    nextMaintenance: '2024-05-01',
    fuelEfficiency: 12.8,
    alerts: ['IPVA vencendo em 30 dias']
  }
];

const VehicleCard = ({ vehicle }: any) => {
  return (
    <div className="bg-blue-700 rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-black">{vehicle.model}</h3>
          <p className="text-blue-200">{vehicle.plate}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${
          vehicle.status === 'Ativo' ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'
        }`}>
          {vehicle.status}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-blue-200">Quilometragem</p>
          <p className="font-medium text-white">{vehicle.mileage.toLocaleString()} km</p>
        </div>
        <div>
          <p className="text-sm text-blue-200">Ano</p>
          <p className="font-medium text-white">{vehicle.year}</p>
        </div>
        <div>
          <p className="text-sm text-blue-200">Última Manutenção</p>
          <p className="font-medium text-white">
            {format(new Date(vehicle.lastMaintenance), 'dd/MM/yyyy', { locale: ptBR })}
          </p>
        </div>
        <div>
          <p className="text-sm text-blue-200">Próxima Manutenção</p>
          <p className="font-medium text-white">
            {format(new Date(vehicle.nextMaintenance), 'dd/MM/yyyy', { locale: ptBR })}
          </p>
        </div>
      </div>

      <div className="border-t border-blue-600 pt-4">
        <div className="flex items-center gap-2 mb-2">
          <Fuel className="w-4 h-4 text-blue-300" />
          <span className="text-sm text-black">
            Consumo Médio: {vehicle.fuelEfficiency} km/l ({vehicle.fuelType})
          </span>
        </div>
        {vehicle.alerts.map((alert: string, index: number) => (
          <div key={index} className="flex items-center gap-2 text-orange-300">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">{alert}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button className="text-blue-200 hover:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const FuelEfficiencyChart = () => {
  return (
    <div className="bg-blue-700 rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="w-5 h-5 text-blue-300" />
        <h2 className="text-lg font-semibold text-white">Análise de Consumo</h2>
      </div>
      
      <div className="space-y-4">
        <div className="p-4 bg-blue-600 rounded-lg">
          <h3 className="font-medium mb-2 text-white">Insights da IA</h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-300 rounded-full" />
              Consumo médio da frota está 15% acima do esperado
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-300 rounded-full" />
              3 veículos precisam de revisão do sistema de combustível
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-300 rounded-full" />
              Sugestão: Implementar programa de eco-driving
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleAddVehicle = (formData: any) => {
    console.log('Novo veículo adicionado (a ser implementado):', formData);
    handleCloseForm();
  };

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Car className="w-6 h-6 text-blue-300" />
          <h1 className="text-2xl font-semibold text-white">Gestão de Veículos</h1>
        </div>
        <button 
          onClick={handleOpenForm} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Veículo
        </button>
      </div>

      <div className="mb-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-blue-300 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar veículos..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      <div className="mt-8">
        <FuelEfficiencyChart />
      </div>

      {isFormOpen && (
        <VehicleForm 
          onClose={handleCloseForm} 
          onSubmit={handleAddVehicle} 
        />
      )}
    </div>
  );
};

export default Vehicles;