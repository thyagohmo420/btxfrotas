import React, { useState, useEffect } from 'react';

// Interface para representar um vídeo registrado
interface VideoRegistro {
  id: number;
  veiculo: string;
  timestamp: string; // Data/Hora formatada
  eventType: string; // Tipo do evento
  videoUrl: string; // URL para o vídeo (do Supabase Storage)
  // thumbnail?: string; // Opcional: URL para uma miniatura
}

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<VideoRegistro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroVeiculo, setFiltroVeiculo] = useState('');
  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');
  const [filtroTipoEvento, setFiltroTipoEvento] = useState('');

  // Efeito para buscar dados (simulação)
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Substituir pela chamada real ao Supabase com filtros
        console.log("Buscando vídeos...");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay

        // Dados de exemplo (com URLs de vídeo placeholder)
        const dadosExemplo: VideoRegistro[] = [
          { id: 1, veiculo: 'Veículo 1 (Exemplo)', timestamp: '2024-07-28 11:15:00', eventType: 'Frenagem Brusca', videoUrl: 'placeholder.mp4' },
          { id: 2, veiculo: 'Veículo 2 (Exemplo)', timestamp: '2024-07-27 09:00:00', eventType: 'Distração', videoUrl: 'placeholder.mp4' },
          { id: 3, veiculo: 'Veículo 1 (Exemplo)', timestamp: '2024-07-26 16:45:00', eventType: 'Curva Perigosa', videoUrl: 'placeholder.mp4' },
        ];

         // Aplicar filtros (simulação básica)
        let dadosFiltrados = dadosExemplo;
        if (filtroVeiculo) {
             dadosFiltrados = dadosFiltrados.filter(v => v.veiculo.toLowerCase().includes(filtroVeiculo.toLowerCase()));
        }
         if (filtroTipoEvento) {
             dadosFiltrados = dadosFiltrados.filter(v => v.eventType === filtroTipoEvento);
        }
        if (filtroDataInicio) {
            const dataInicio = new Date(filtroDataInicio);
            dadosFiltrados = dadosFiltrados.filter(v => new Date(v.timestamp) >= dataInicio);
        }
         if (filtroDataFim) {
             const dataFim = new Date(filtroDataFim);
             dataFim.setDate(dataFim.getDate() + 1); // Incluir dia inteiro
            dadosFiltrados = dadosFiltrados.filter(v => new Date(v.timestamp) < dataFim);
        }

        setVideos(dadosFiltrados);

      } catch (err) {
        console.error("Erro ao buscar vídeos:", err);
        setError("Não foi possível carregar os vídeos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [filtroVeiculo, filtroDataInicio, filtroDataFim, filtroTipoEvento]);


  const handleDelete = (id: number) => {
    console.log('Deletar vídeo ID:', id);
    // TODO: Adicionar lógica de delete no Supabase (incluindo Storage) e atualizar estado
  };

  return (
    <div className="bg-blue-800 p-6 rounded-lg">
        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
             <div>
                <label htmlFor="filtroVeiculo" className="block text-sm font-medium mb-1">Veículo</label>
                <input
                type="text"
                id="filtroVeiculo"
                value={filtroVeiculo}
                onChange={(e) => setFiltroVeiculo(e.target.value)}
                placeholder="Nome ou placa"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
             <div>
                <label htmlFor="filtroTipoEvento" className="block text-sm font-medium mb-1">Tipo de Evento</label>
                 <select
                    id="filtroTipoEvento"
                    value={filtroTipoEvento}
                    onChange={(e) => setFiltroTipoEvento(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                    >
                    <option value="">Todos</option>
                    <option value="Frenagem Brusca">Frenagem Brusca</option>
                    <option value="Aceleração Brusca">Aceleração Brusca</option>
                    <option value="Curva Perigosa">Curva Perigosa</option>
                    <option value="Distração">Distração</option>
                     {/* Sincronizar com os tipos do form */}
                </select>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Preview</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Veículo</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data/Hora</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tipo Evento</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
                 </tr>
                 </thead>
                 <tbody className="bg-blue-800 divide-y divide-gray-600">
                {videos.length > 0 ? (
                    videos.map((video) => (
                    <tr key={video.id} className="hover:bg-blue-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                             {/* Idealmente, usar a tag <video> com a URL real e controles */}
                             {/* Usando um placeholder simples por enquanto */}
                             <div className="w-32 h-20 bg-gray-600 flex items-center justify-center text-xs text-gray-300">
                                Vídeo
                                {/* <video width="128" height="80" controls src={video.videoUrl} /> */}
                             </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{video.veiculo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{video.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{video.eventType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            {/* Link para visualizar/baixar o vídeo completo */}
                            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Ver</a>
                            <button onClick={() => handleDelete(video.id)} className="text-red-500 hover:text-red-400">Excluir</button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm">Nenhum vídeo encontrado.</td>
                    </tr>
                )}
                 </tbody>
             </table>
         </div>
      )}

        {/* TODO: Adicionar botões de exportação (talvez não aplicável aqui?) */}
       {/* <div className="mt-6 flex justify-end space-x-3"> ... </div> */}
    </div>
  );
};

export default VideoList; 