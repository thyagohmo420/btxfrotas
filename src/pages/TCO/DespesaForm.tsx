import React, { useState } from 'react';

// Renomeado para DespesaFormProps (ou remover se não usar props)
interface DespesaFormProps {
  // onSubmit?: (formData: any) => void;
}

// Renomeado para DespesaForm
const DespesaForm: React.FC<DespesaFormProps> = () => {
  const [vehicleId, setVehicleId] = useState('');
  const [expenseType, setExpenseType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [cost, setCost] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { vehicleId, expenseType, description, date, cost };
    console.log("Dados da nova despesa (local):", formData);
    // TODO: Lógica para salvar despesa
    alert('Despesa registrada com sucesso!');
  };

  return (
    // Aplicar tema escuro ao formulário
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

        {/* Tipo de Despesa */}
         <div>
          <label htmlFor="expenseType" className="block text-sm font-medium mb-1 text-blue-200">Tipo de Despesa *</label>
          <select 
            id="expenseType" 
            value={expenseType} 
            onChange={(e) => setExpenseType(e.target.value)} 
            required
            className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"
          >
            <option value="" disabled>Selecione</option>
            <option value="Combustível">Combustível</option>
            <option value="Manutenção Preventiva">Manutenção Preventiva</option>
            <option value="Manutenção Corretiva">Manutenção Corretiva</option>
            <option value="Seguro">Seguro</option>
            <option value="IPVA">IPVA</option>
            <option value="Licenciamento">Licenciamento</option>
            <option value="Multas">Multas</option>
            <option value="Pneus">Pneus</option>
            <option value="Depreciação">Depreciação (Manual)</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1 text-blue-200">Descrição</label>
          <input 
            type="text" 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"
            placeholder="Detalhes adicionais (opcional)"
          />
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

        {/* Custo */}
        <div>
          <label htmlFor="cost" className="block text-sm font-medium mb-1 text-blue-200">Valor (R$) *</label>
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

        {/* Botão Salvar */}
        <div className="flex justify-end pt-2">
          <button type="submit" className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold">
            Salvar Despesa
          </button>
        </div>
    </form>
  );
};

// Exportar como DespesaForm
export default DespesaForm; 