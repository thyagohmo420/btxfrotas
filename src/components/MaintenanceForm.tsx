import React, { useState } from 'react';

interface MaintenanceFormProps {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

// Definir tipos de Status da Manutenção
type MaintenanceStatus = 'Agendada' | 'Em Andamento' | 'Concluída' | 'Cancelada';

const MaintenanceForm: React.FC<MaintenanceFormProps> = ({ onClose, onSubmit }) => {
  // Estados para os campos do formulário
  const [vehicleId, setVehicleId] = useState(''); // Usaremos um select depois
  const [maintenanceType, setMaintenanceType] = useState('Preventiva'); // Preventiva, Corretiva
  const [description, setDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [cost, setCost] = useState<number | ''>('');
  // Adicionar estado para Status
  const [status, setStatus] = useState<MaintenanceStatus>('Agendada');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Incluir Status no formData
    const formData = {
      veiculo_id: vehicleId,
      tipo: maintenanceType,
      descricao: description,
      data: scheduledDate,
      custo: cost || null, // Enviar null se vazio
      status: status
    };
    console.log("Dados da nova manutenção:", formData);
    onSubmit(formData);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-blue-800 p-8 rounded-lg shadow-xl w-full max-w-lg relative text-white" // Aumentei um pouco a largura (max-w-lg)
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-6">Registrar Nova Manutenção</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Veículo (Select) */}
          <div>
            <label htmlFor="vehicleId" className="block text-sm font-medium mb-1 text-blue-200">Veículo *</label>
            <select 
              id="vehicleId"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              required 
              className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="" disabled>Selecione um veículo</option>
              {/* TODO: Carregar lista de veículos dinamicamente */}
              <option value="ABC-1234">Fiat Toro (ABC-1234)</option>
              <option value="XYZ-5678">VW Gol (XYZ-5678)</option>
            </select>
          </div>

          {/* Campo Tipo de Manutenção */}
          <div>
            <label htmlFor="maintenanceType" className="block text-sm font-medium mb-1 text-blue-200">Tipo *</label>
            <select 
              id="maintenanceType"
              value={maintenanceType}
              onChange={(e) => setMaintenanceType(e.target.value)}
              required 
              className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="Preventiva">Preventiva</option>
              <option value="Corretiva">Corretiva</option>
              {/* Adicionar outros tipos se necessário */}
            </select>
          </div>

          {/* Campo Descrição */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1 text-blue-200">Descrição *</label>
            <textarea 
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required 
              className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white"
              placeholder="Descreva o serviço realizado ou a ser realizado..."
            />
          </div>

          {/* Campo Data Agendada/Realizada */}
          <div>
            <label htmlFor="scheduledDate" className="block text-sm font-medium mb-1 text-blue-200">Data Agendada/Realizada *</label>
            <input 
              type="date" 
              id="scheduledDate"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              required 
              className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white"
            />
          </div>

          {/* Campo Custo */}
          <div>
            <label htmlFor="cost" className="block text-sm font-medium mb-1 text-blue-200">Custo (R$)</label>
            <input 
              type="number" 
              id="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value ? parseFloat(e.target.value) : '')}
              step="0.01" // Para permitir centavos
              className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white"
              placeholder="0.00"
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors"
            >
              Salvar Manutenção
            </button>
          </div>
        </form>

        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
             &times;
        </button>
      </div>
    </div>
  );
};

export default MaintenanceForm; 