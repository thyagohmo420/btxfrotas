import React, { useState } from 'react';

// TODO: Definir interface mais detalhada baseada na tabela Supabase
interface TelemetriaEventData {
  veiculoId: string;
  timestamp: string; // Data e Hora
  eventType: 'velocidade' | 'frenagem' | 'aceleracao' | '';
  value: number | null; // Ex: velocidade em km/h
  location?: string; // Opcional: coordenadas ou endereço
}

const TelemetriaForm: React.FC = () => {
  const [formData, setFormData] = useState<TelemetriaEventData>({
    veiculoId: '',
    timestamp: '',
    eventType: '',
    value: null,
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? parseFloat(value) : null) : value,
    }));
  };

   const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      timestamp: e.target.value, // O input datetime-local retorna string no formato ISO
    }));
   }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do evento de telemetria:', formData);
    // TODO: Adicionar lógica de inserção no Supabase aqui
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-blue-800 p-6 rounded-lg">
      {/* Seleção de Veículo */}
      <div>
        <label htmlFor="veiculoId" className="block text-sm font-medium mb-1">Veículo</label>
        <select
          id="veiculoId"
          name="veiculoId"
          value={formData.veiculoId}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Selecione um veículo</option>
          {/* TODO: Carregar veículos do Supabase */}
          <option value="veiculo1">Veículo 1 (Exemplo)</option>
          <option value="veiculo2">Veículo 2 (Exemplo)</option>
        </select>
      </div>

        {/* Data e Hora */}
      <div>
        <label htmlFor="timestamp" className="block text-sm font-medium mb-1">Data e Hora</label>
        <input
          type="datetime-local"
          id="timestamp"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleTimestampChange} // Usar handler específico
          required
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Tipo de Evento */}
       <div>
        <label htmlFor="eventType" className="block text-sm font-medium mb-1">Tipo de Evento</label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Selecione o tipo</option>
          <option value="velocidade">Excesso de Velocidade</option>
          <option value="frenagem">Frenagem Brusca</option>
          <option value="aceleracao">Aceleração Brusca</option>
           {/* Adicionar outros tipos conforme necessário */}
        </select>
      </div>

      {/* Valor (ex: Velocidade) */}
      {formData.eventType === 'velocidade' && ( // Mostrar apenas se for evento de velocidade
         <div>
            <label htmlFor="value" className="block text-sm font-medium mb-1">Velocidade (km/h)</label>
            <input
            type="number"
            id="value"
            name="value"
            value={formData.value ?? ''}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
      )}
        {/* Outros campos condicionais podem ser adicionados aqui para frenagem/aceleração se necessário */}

      {/* Localização (Opcional) */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-1">Localização (Opcional)</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Ex: -23.5505, -46.6333 ou Endereço"
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>


      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Salvar Evento
      </button>
    </form>
  );
};

export default TelemetriaForm; 