import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Interface para representar uma despesa registrada
interface DespesaRegistro {
    id: number;
    descricao: string;
    categoria: string; // Manter como string para exibição
    valor: number;
    data: string; // Data formatada
    veiculo?: string; // Nome/Placa do veículo ou 'Geral'
}

// Mapeamento de categorias para exibição (opcional, mas melhora a leitura)
const categoriasMap: Record<string, string> = {
    combustivel: 'Combustível', manutencao: 'Manutenção', seguro: 'Seguro',
    imposto: 'Impostos/Taxas', pneu: 'Pneus', multa: 'Multas',
    depreciacao: 'Depreciação', salario: 'Salário', outro: 'Outro'
};


const DespesaList: React.FC = () => {
    const [despesas, setDespesas] = useState<DespesaRegistro[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filtroVeiculo, setFiltroVeiculo] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');
    const [filtroDataInicio, setFiltroDataInicio] = useState('');
    const [filtroDataFim, setFiltroDataFim] = useState('');

    // Efeito para buscar dados (simulação)
    useEffect(() => {
        const fetchDespesas = async () => {
            setLoading(true);
            setError(null);
            try {
                // TODO: Substituir pela chamada real ao Supabase com filtros
                console.log("Buscando despesas...");
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Dados de exemplo
                const dadosExemplo: DespesaRegistro[] = [
                    { id: 1, descricao: 'Troca de óleo + Filtro', categoria: 'manutencao', valor: 250.50, data: '2024-07-25', veiculo: 'Veículo 1' },
                    { id: 2, descricao: 'Diesel S10', categoria: 'combustivel', valor: 310.00, data: '2024-07-26', veiculo: 'Veículo 2' },
                    { id: 3, descricao: 'IPVA 2024', categoria: 'imposto', valor: 1200.00, data: '2024-07-20', veiculo: 'Veículo 1' },
                    { id: 4, descricao: 'Seguro Anual', categoria: 'seguro', valor: 2500.00, data: '2024-07-15', veiculo: 'Geral' }, // Despesa geral
                     { id: 5, descricao: 'Gasolina Comum', categoria: 'combustivel', valor: 180.75, data: '2024-07-28', veiculo: 'Veículo 1' },
                ];

                setDespesas(dadosExemplo);

            } catch (err) {
                console.error("Erro ao buscar despesas:", err);
                setError("Não foi possível carregar as despesas.");
            } finally {
                setLoading(false);
            }
        };
        fetchDespesas();
    }, []); // Executa apenas uma vez ao montar

    // Memoização para filtrar e calcular totais apenas quando necessário
     const { despesasFiltradas, totaisPorVeiculo, totalGeral } = useMemo(() => {
        let filtradas = despesas;
         if (filtroVeiculo) {
            filtradas = filtradas.filter(d => d.veiculo?.toLowerCase().includes(filtroVeiculo.toLowerCase()));
        }
        if (filtroCategoria) {
            filtradas = filtradas.filter(d => d.categoria === filtroCategoria);
        }
         if (filtroDataInicio) {
            filtradas = filtradas.filter(d => new Date(d.data) >= new Date(filtroDataInicio));
        }
         if (filtroDataFim) {
            filtradas = filtradas.filter(d => new Date(d.data) <= new Date(filtroDataFim));
        }

        // Calcular totais
        const totais: Record<string, number> = {};
        let geral = 0;
        filtradas.forEach(d => {
            geral += d.valor;
            const veiculoKey = d.veiculo || 'Geral'; // Agrupa despesas sem veículo como 'Geral'
            totais[veiculoKey] = (totais[veiculoKey] || 0) + d.valor;
        });

        return { despesasFiltradas: filtradas, totaisPorVeiculo: totais, totalGeral: geral };

     }, [despesas, filtroVeiculo, filtroCategoria, filtroDataInicio, filtroDataFim]);


    const handleDelete = (id: number) => {
        console.log('Deletar despesa ID:', id);
        // TODO: Adicionar lógica de delete no Supabase e atualizar estado 'despesas'
         setDespesas(prev => prev.filter(d => d.id !== id)); // Simula remoção
         alert('Despesa removida (simulação)');
    };

    const handleEdit = (despesa: DespesaRegistro) => {
         console.log('Editar despesa:', despesa);
         // TODO: Implementar edição (ex: preencher formulário, abrir modal)
         alert(`Editar despesa ID ${despesa.id} (não implementado)`);
    };


    return (
        <div className="bg-blue-700 rounded-lg shadow overflow-x-auto">
            {/* Filtros */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                    <label htmlFor="filtroVeiculo" className="block text-sm font-medium mb-1">Veículo</label>
                    <input
                        type="text"
                        id="filtroVeiculo"
                        value={filtroVeiculo}
                        onChange={(e) => setFiltroVeiculo(e.target.value)}
                        placeholder="Nome, placa ou 'Geral'"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    />
                </div>
                 <div>
                    <label htmlFor="filtroCategoria" className="block text-sm font-medium mb-1">Categoria</label>
                    <select
                        id="filtroCategoria"
                        value={filtroCategoria}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    >
                        <option value="">Todas</option>
                         {Object.entries(categoriasMap).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                         ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="filtroDataInicio" className="block text-sm font-medium mb-1">Data Inicial</label>
                    <input
                        type="date"
                        id="filtroDataInicio"
                        value={filtroDataInicio}
                        onChange={(e) => setFiltroDataInicio(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    />
                </div>
                <div>
                    <label htmlFor="filtroDataFim" className="block text-sm font-medium mb-1">Data Final</label>
                    <input
                        type="date"
                        id="filtroDataFim"
                        value={filtroDataFim}
                        onChange={(e) => setFiltroDataFim(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                    />
                </div>
            </div>

            {loading && <p className="text-center">Carregando...</p>}
            {error && <p className="text-center text-red-400">{error}</p>}

            {!loading && !error && (
                <>
                 {/* Tabela de Despesas */}
                 <div className="overflow-x-auto mb-6">
                        <table className="min-w-full divide-y divide-blue-600">
                            <thead className="bg-blue-600">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Descrição</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Categoria</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Data</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Veículo</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-blue-100 uppercase tracking-wider">Valor (R$)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-blue-700 divide-y divide-blue-600">
                                {despesasFiltradas.length > 0 ? (
                                    despesasFiltradas.map((despesa) => (
                                        <tr key={despesa.id} className="hover:bg-blue-600 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{despesa.descricao}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">{categoriasMap[despesa.categoria] ?? despesa.categoria}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">
                                                {format(new Date(despesa.data), 'dd/MM/yyyy', { locale: ptBR })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100">{despesa.veiculo ?? 'Geral'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-100 text-right">{despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <button onClick={() => handleEdit(despesa)} className="text-yellow-400 hover:text-yellow-300" title="Editar Despesa"><Edit size={16}/></button>
                                                <button onClick={() => handleDelete(despesa.id)} className="text-red-500 hover:text-red-400" title="Excluir Despesa"><Trash2 size={16}/></button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-center text-sm">Nenhuma despesa encontrada para os filtros selecionados.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                     {/* Tabela de Totais */}
                    <div className="bg-blue-700 p-4 rounded-lg">
                         <h3 className="text-lg font-semibold mb-3">Totais por Veículo (Filtro Atual)</h3>
                         <div className="overflow-x-auto">
                             <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b border-blue-600">
                                         <th className="py-2 text-left font-medium">Veículo / Geral</th>
                                         <th className="py-2 text-right font-medium">Total Despesas (R$)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(totaisPorVeiculo).map(([veiculo, total]) => (
                                         <tr key={veiculo} className="border-b border-blue-800 last:border-b-0">
                                             <td className="py-2">{veiculo}</td>
                                             <td className="py-2 text-right">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                         </tr>
                                     ))}
                                     {/* Linha Total Geral */}
                                     <tr className="border-t-2 border-blue-500 mt-2 font-bold">
                                        <td className="py-2">TOTAL GERAL (FILTRADO)</td>
                                        <td className="py-2 text-right">{totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                     </tr>
                                </tbody>
                             </table>
                         </div>
                    </div>
                </>
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

export default DespesaList; 