import React, { useState } from 'react';
import { PenTool as Tool, AlertTriangle, Calendar, Plus } from 'lucide-react';
import MaintenanceForm from '../components/MaintenanceForm';

const Maintenance = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  const handleAddMaintenance = (formData: any) => {
    console.log('Nova manutenção adicionada (a ser implementado):', formData);
    handleCloseForm();
  };

  return (
    <div className="text-white">
      <div className="flex items-center gap-3 mb-6">
        <Tool className="w-6 h-6 text-blue-300" />
        <h1 className="text-2xl font-semibold text-white">Manutenção</h1>
      </div>

      <div className="grid gap-6">
        <div className="bg-blue-700 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Manutenções Programadas</h2>
            <button 
              onClick={handleOpenForm}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nova Manutenção
            </button>
          </div>

          <div className="space-y-4">
            {[
              { icon: Calendar, vehicle: 'Fiat Toro (ABC-1234)', type: 'Preventiva', date: '15/04/2024', status: 'Agendada' },
              { icon: AlertTriangle, vehicle: 'VW Gol (XYZ-5678)', type: 'Corretiva', date: '22/04/2024', status: 'Urgente' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-blue-600 rounded-lg">
                <item.icon className="w-5 h-5 text-blue-300" />
                <div className="flex-1">
                  <p className="font-medium text-black">{item.vehicle}</p>
                  <p className="text-sm text-blue-200">{item.type} - {item.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.status === 'Urgente' ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-700 rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-white mb-4">Histórico de Manutenções</h2>
          <p className="text-blue-200">Nenhum registro encontrado.</p>
        </div>
      </div>

      {isFormOpen && (
        <MaintenanceForm 
          onClose={handleCloseForm} 
          onSubmit={handleAddMaintenance} 
        />
      )}
    </div>
  );
};

export default Maintenance;