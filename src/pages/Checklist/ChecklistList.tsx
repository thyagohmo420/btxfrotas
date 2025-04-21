import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'; // Ícones para status
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Interface para representar um checklist salvo
interface ChecklistRegistro {
  id: number;
  veiculo: string;
  motorista: string;
  data: string; // Data formatada
  status: 'Aprovado' | 'Reprovado';
  observacoesGerais?: string;
  mileage: number;
  // Poderia incluir um resumo dos itens reprovados se necessário
}

const ChecklistList: React.FC = () => {
  const [checklists, setChecklists] = useState<ChecklistRegistro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroVeiculo, setFiltroVeiculo] = useState('');
  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'Aprovado' | 'Reprovado' | '' > ('');

  // Efeito para buscar dados (simulação)
  useEffect(() => {
    const fetchChecklists = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Substituir pela chamada real ao Supabase com filtros
        console.log("Buscando checklists...");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay

        // Dados de exemplo
        const dadosExemplo: ChecklistRegistro[] = [
          { id: 1, veiculo: 'Veículo 1', motorista: 'Motorista A', data: '2024-07-28', status: 'Aprovado', mileage: 45150 },
          { id: 2, veiculo: 'Veículo 2', motorista: 'Motorista B', data: '2024-07-28', status: 'Reprovado', mileage: 35300, observacoesGerais: 'Pneu dianteiro direito baixo' },
          { id: 3, veiculo: 'Veículo 1', motorista: 'Motorista A', data: '2024-07-27', status: 'Aprovado', mileage: 45150 },
          { id: 4, veiculo: 'Veículo 3', motorista: 'Motorista C', data: '2024-07-27', status: 'Reprovado', mileage: 35300, observacoesGerais: 'Farol esquerdo queimado' },
        ];

         // Aplicar filtros (simulação básica)
        let dadosFiltrados = dadosExemplo;
         if (filtroVeiculo) {
             dadosFiltrados = dadosFiltrados.filter(c => c.veiculo.toLowerCase().includes(filtroVeiculo.toLowerCase()));
        }
        if (filtroStatus) {
             dadosFiltrados = dadosFiltrados.filter(c => c.status === filtroStatus);
        }
        if (filtroDataInicio) {
            dadosFiltrados = dadosFiltrados.filter(c => new Date(c.data) >= new Date(filtroDataInicio));
        }
         if (filtroDataFim) {
            dadosFiltrados = dadosFiltrados.filter(c => new Date(c.data) <= new Date(filtroDataFim));
        }

        setChecklists(dadosFiltrados);

      } catch (err) {
        console.error("Erro ao buscar checklists:", err);
        setError("Não foi possível carregar os checklists.");
      } finally {
        setLoading(false);
      }
    };

    fetchChecklists();
  }, [filtroVeiculo, filtroDataInicio, filtroDataFim, filtroStatus]);


  const handleDelete = (id: number) => {
    console.log('Deletar checklist ID:', id);
    // TODO: Adicionar lógica de delete no Supabase e atualizar estado
  };

   // Função para obter classe CSS com base no status
   const getStatusClass = (status: 'Aprovado' | 'Reprovado') => {
     return status === 'Aprovado' ? 'text-green-400' : 'text-red-400';
   };

    // Função para obter ícone com base no status
    const getStatusIcon = (status: 'Aprovado' | 'Reprovado') => {
        return status === 'Aprovado'
            ? <CheckCircle className="inline-block mr-1 w-4 h-4" />
            : <XCircle className="inline-block mr-1 w-4 h-4" />;
    }


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
                <label htmlFor="filtroStatus" className="block text-sm font-medium mb-1">Status</label>
                 <select
                    id="filtroStatus"
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value as any)} // Permitir string vazia
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                    >
                    <option value="">Todos</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Reprovado">Reprovado</option>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Veículo</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Motorista</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">KM</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Observações</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ações</th>
                 </tr>
                 </thead>
                 <tbody className="bg-blue-800 divide-y divide-gray-600">
                {checklists.length > 0 ? (
                    checklists.map((cl) => (
                    <tr key={cl.id} className={`hover:bg-blue-700 ${cl.status === 'Reprovado' ? 'bg-red-900/30' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(cl.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{cl.veiculo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{cl.motorista}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{cl.mileage.toLocaleString('pt-BR')}</td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getStatusClass(cl.status)}`}>
                             {getStatusIcon(cl.status)}
                             {cl.status}
                        </td>
                        <td className="px-6 py-4 text-sm max-w-xs truncate" title={cl.observacoesGerais}>{cl.observacoesGerais ?? '-'}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            {/* Ação para visualizar detalhes do checklist */}
                             <button className="text-blue-400 hover:text-blue-300">Detalhes</button>
                            <button onClick={() => handleDelete(cl.id)} className="text-red-500 hover:text-red-400">Excluir</button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm">Nenhum checklist encontrado.</td>
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

export default ChecklistList; 