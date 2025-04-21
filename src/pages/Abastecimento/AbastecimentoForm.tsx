import React, { useState } from 'react';

// Interface para as props, se necessário passar algo (ex: onSubmit)
interface AbastecimentoFormProps {
  // onSubmit?: (formData: any) => void; // Remover se o submit for local
}

// Mudar para React.FC<AbastecimentoFormProps> se usar props
const AbastecimentoForm: React.FC = () => { 
  const [vehicleId, setVehicleId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [date, setDate] = useState('');
  const [liters, setLiters] = useState<number | ''>('');
  const [cost, setCost] = useState<number | ''>('');
  const [mileage, setMileage] = useState<number | ''>('');
  const [posto, setPosto] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { 
      veiculo_id: vehicleId,
      motorista_id: driverId,
      data: date,
      km: mileage,
      litros: liters,
      valor_total: cost,
      posto: posto
    };
    console.log("Dados do novo abastecimento (local):", formData);
    // TODO: Implementar lógica de salvar (ex: Supabase)
    // Limpar formulário após salvar (opcional)
    // setVehicleId(''); setDriverId(''); setDate(''); ...
    alert('Abastecimento registrado com sucesso!'); // Feedback
  };

  return (
    // Aplicar fundo azul mais claro e padding ao formulário
    <form onSubmit={handleSubmit} className="space-y-4 bg-blue-700 p-6 rounded-lg shadow">
        {/* Veículo */}
        <div>
          <label htmlFor="vehicleId" className="block text-sm font-medium mb-1 text-blue-200">Veículo *</label>
          <select 
            id="vehicleId" 
            value={vehicleId} 
            onChange={(e) => setVehicleId(e.target.value)} 
            required
            className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"
          >
            <option value="" disabled>Selecione</option>
            {/* TODO: Carregar veículos */}
            <option value="ABC-1234">Fiat Toro (ABC-1234)</option>
          </select>
        </div>

        {/* Motorista */}
        <div>
          <label htmlFor="driverId" className="block text-sm font-medium mb-1 text-blue-200">Motorista *</label>
          <select 
            id="driverId" 
            value={driverId} 
            onChange={(e) => setDriverId(e.target.value)} 
            required
            className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"
          >
            <option value="" disabled>Selecione</option>
            {/* TODO: Carregar motoristas */}
            <option value="1">João Silva</option>
          </select>
        </div>

        {/* Data */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1 text-blue-200">Data *</label>
          <input 
            type="date" 
            id="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required
            className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"
          />
        </div>

        {/* Litros */}
        <div>
          <label htmlFor="liters" className="block text-sm font-medium mb-1 text-blue-200">Litros *</label>
          <input 
            type="number" 
            id="liters" 
            value={liters} 
            onChange={(e) => setLiters(e.target.value ? parseFloat(e.target.value) : '')}
            required 
            step="0.01" 
            className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"
            placeholder="0.00"
          />
        </div>

        {/* Custo Total */}
        <div>
          <label htmlFor="cost" className="block text-sm font-medium mb-1 text-blue-200">Custo Total (R$) *</label>
          <input 
            type="number" 
            id="cost" 
            value={cost} 
            onChange={(e) => setCost(e.target.value ? parseFloat(e.target.value) : '')} 
            required 
            step="0.01"
            className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"
            placeholder="0.00"
          />
        </div>

        {/* Quilometragem */}
        <div>
          <label htmlFor="mileage" className="block text-sm font-medium mb-1 text-blue-200">Quilometragem no Hodômetro *</label>
          <input 
            type="number" 
            id="mileage" 
            value={mileage} 
            onChange={(e) => setMileage(e.target.value ? parseInt(e.target.value) : '')} 
            required 
            className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"
            placeholder="0"
          />
        </div>

        {/* Campo Posto */}
        <div>
          <label htmlFor="posto" className="block text-sm font-medium mb-1 text-blue-200">Posto (Opcional)</label>
          <input 
            type="text" 
            id="posto"
            value={posto}
            onChange={(e) => setPosto(e.target.value)}
            className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"
            placeholder="Nome do posto"
          />
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end pt-2"> {/* Removido gap e botão cancelar */}
          <button type="submit" className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold">
            Salvar Abastecimento
          </button>
        </div>
    </form>
  );
};

export default AbastecimentoForm; 