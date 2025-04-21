import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Interface para representar um registro de abastecimento (ajuste conforme sua tabela Supabase)
interface Abastecimento {
  id: number;
  veiculo: string; // Ou um objeto Veiculo se tiver mais dados
  data: string;
  litros: number;
  valorTotal: number; // Calculado: litros * valorPorLitro
  quilometragem: number;
  posto?: string;
}

const AbastecimentoList: React.FC = () => {
  const [abastecimentos, setAbastecimentos] = useState<Abastecimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroVeiculo, setFiltroVeiculo] = useState('');
  const [filtroDataInicio, setFiltroDataInicio] = useState('');
  const [filtroDataFim, setFiltroDataFim] = useState('');


  // Efeito para buscar dados (simulação por enquanto)
  useEffect(() => {
    const fetchAbastecimentos = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Substituir pela chamada real ao Supabase
        // Exemplo: const { data, error } = await supabase.from('abastecimentos').select('*')... aplicar filtros
        console.log("Buscando abastecimentos...");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da API

        // Dados de exemplo
        const dadosExemplo: Abastecimento[] = [
          { id: 1, veiculo: 'Veículo 1 (Exemplo)', data: '2024-07-25', litros: 50, valorTotal: 250, quilometragem: 10000, posto: 'Posto Exemplo A' },
          { id: 2, veiculo: 'Veículo 2 (Exemplo)', data: '2024-07-26', litros: 45.5, valorTotal: 230, quilometragem: 15500 },
        ];

        // Aplicar filtros (simulação básica)
        let dadosFiltrados = dadosExemplo;
        if (filtroVeiculo) {
            dadosFiltrados = dadosFiltrados.filter(a => a.veiculo.includes(filtroVeiculo));
        }
        if (filtroDataInicio) {
            dadosFiltrados = dadosFiltrados.filter(a => new Date(a.data) >= new Date(filtroDataInicio));
        }
         if (filtroDataFim) {
            dadosFiltrados = dadosFiltrados.filter(a => new Date(a.data) <= new Date(filtroDataFim));
        }


        setAbastecimentos(dadosFiltrados);

      } catch (err) {
        console.error("Erro ao buscar abastecimentos:", err);
        setError("Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchAbastecimentos();
  }, [filtroVeiculo, filtroDataInicio, filtroDataFim]); // Re-executa a busca quando os filtros mudam


  // Funções para deletar/editar (a implementar)
  const handleDelete = (id: number) => {
    console.log('Deletar abastecimento ID:', id);
    // TODO: Adicionar lógica de delete no Supabase e atualizar estado
  };

  const handleEdit = (abastecimento: Abastecimento) => {
    console.log('Editar abastecimento:', abastecimento);
     // TODO: Adicionar lógica de edição (provavelmente preenchendo o formulário)
  };

  return (
    <div className="bg-blue-700 rounded-lg shadow overflow-hidden">
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
              placeholder="Digite parte do nome"
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
            <table className="min-w-full divide-y divide-blue-600">
              <thead className="bg-blue-600">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Veículo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Data</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Litros</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Valor Total (R$)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">KM</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Posto</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-blue-700 divide-y divide-blue-600">
                {abastecimentos.length > 0 ? (
                  abastecimentos.map((ab) => (
                    <tr key={ab.id} className="hover:bg-blue-600 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{ab.veiculo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">{format(new Date(ab.data), 'dd/MM/yyyy', { locale: ptBR })}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100 text-right">{ab.litros.toFixed(2)} L</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100 text-right">{ab.valorTotal.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100 text-right">{ab.quilometragem.toLocaleString('pt-BR')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">{ab.posto ?? '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button onClick={() => handleEdit(ab)} className="text-yellow-400 hover:text-yellow-300">Editar</button>
                        <button onClick={() => handleDelete(ab.id)} className="text-red-500 hover:text-red-400">Excluir</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-blue-200">Nenhum abastecimento encontrado.</td>
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
    </div>
  );
};

export default AbastecimentoList; 