import React, { useState, useEffect } from 'react';

// Interface para representar um evento de telemetria
interface TelemetriaEvent {
  id: number;
  veiculo: string; // Nome ou placa do veículo
  timestamp: string; // Data e Hora formatada
  eventType: string; // 'Velocidade', 'Frenagem', 'Aceleração'
  details: string; // Valor da velocidade, intensidade da frenagem, etc.
  location?: string;
}

const TelemetriaList: React.FC = () => {
  const [eventos, setEventos] = useState<TelemetriaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroVeiculo, setFiltroVeiculo] = useState('');
  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');


  // Efeito para buscar dados (simulação)
  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Substituir pela chamada real ao Supabase com filtros
        console.log("Buscando eventos de telemetria...");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay

        // Dados de exemplo
        const dadosExemplo: TelemetriaEvent[] = [
          { id: 1, veiculo: 'Veículo 1 (Exemplo)', timestamp: '2024-07-28 10:30:00', eventType: 'Velocidade', details: '110 km/h', location: 'Rodovia Castelo Branco, km 50' },
          { id: 2, veiculo: 'Veículo 2 (Exemplo)', timestamp: '2024-07-28 11:15:00', eventType: 'Frenagem', details: 'Forte (-0.8g)', location: 'Av. Paulista, 1500' },
           { id: 3, veiculo: 'Veículo 1 (Exemplo)', timestamp: '2024-07-27 15:00:00', eventType: 'Aceleração', details: 'Rápida (+0.6g)', location: 'Rua Augusta, 300' },
        ];

         // Aplicar filtros (simulação básica)
        let dadosFiltrados = dadosExemplo;
        if (filtroVeiculo) {
             dadosFiltrados = dadosFiltrados.filter(e => e.veiculo.toLowerCase().includes(filtroVeiculo.toLowerCase()));
        }
        if (filtroDataInicio) {
            const dataInicio = new Date(filtroDataInicio);
            dadosFiltrados = dadosFiltrados.filter(e => new Date(e.timestamp) >= dataInicio);
        }
         if (filtroDataFim) {
             const dataFim = new Date(filtroDataFim);
             // Adiciona 1 dia à data final para incluir eventos do dia inteiro
             dataFim.setDate(dataFim.getDate() + 1);
            dadosFiltrados = dadosFiltrados.filter(e => new Date(e.timestamp) < dataFim);
        }

        setEventos(dadosFiltrados);

      } catch (err) {
        console.error("Erro ao buscar eventos:", err);
        setError("Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, [filtroVeiculo, filtroDataInicio, filtroDataFim]);


  // Funções para deletar/editar (a implementar se necessário)
  const handleDelete = (id: number) => {
    console.log('Deletar evento ID:', id);
    // TODO: Adicionar lógica de delete no Supabase e atualizar estado
  };

  return (
    <div className="bg-blue-800 p-6 rounded-lg">
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
             <div>
                <label htmlFor="filtroVeiculo" className="block text-sm font-medium mb-1">Filtrar por Veículo</label>
                <input
                type="text"
                id="filtroVeiculo"
                value={filtroVeiculo}
                onChange={(e) => setFiltroVeiculo(e.target.value)}
                placeholder="Digite nome ou placa"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
             <div>
                <label htmlFor="filtroDataInicio" className="block text-sm font-medium mb-1">Data Inicial</label>
                <input
                type="date"
                id="filtroDataInicio"
                value={filtroDataInicio}
                onChange={(e) => setFiltroDataInicio(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
             <div>
                <label htmlFor="filtroDataFim" className="block text-sm font-medium mb-1">Data Final</label>
                <input
                type="date"
                id="filtroDataFim"
                value={filtroDataFim}
                onChange={(e) => setFiltroDataFim(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>

      {loading && <p className="text-center">Carregando...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data/Hora</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Veículo</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Evento</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Detalhes</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Localização</th>
                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-blue-800 divide-y divide-gray-600">
              {eventos.length > 0 ? (
                eventos.map((ev) => (
                  <tr key={ev.id} className="hover:bg-blue-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{ev.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{ev.veiculo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{ev.eventType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{ev.details}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{ev.location ?? '-'}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {/* Ações como visualizar detalhes podem ser adicionadas aqui */}
                      <button onClick={() => handleDelete(ev.id)} className="text-red-500 hover:text-red-400">Excluir</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm">Nenhum evento encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

        {/* TODO: Adicionar botões de exportação PDF/Excel */}
       <div className="mt-6 flex justify-end space-x-3">
           <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                Exportar PDF
           </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                Exportar Excel
           </button>
       </div>
    </div>
  );
};

export default TelemetriaList; 