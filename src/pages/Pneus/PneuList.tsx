import React, { useState, useEffect } from 'react';
import { CircleDot, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

// Interface para representar um pneu (ajuste conforme sua estrutura)
interface Pneu {
  id: number;
  identificacao: string; // DOT ou número único
  marca: string;
  modelo: string;
  status: 'estoque' | 'em_uso' | 'descartado';
  kmRodado?: number; // KM rodado total do pneu
  limiteKm?: number; // KM esperado de vida útil
  // Informações de instalação (se estiver em uso)
  veiculo?: string; // Placa do veículo
  posicao?: string; // Posição no veículo
  dataInstalacao?: string;
  kmInstalacao?: number;
}

// Dados de exemplo
const samplePneus: Pneu[] = [
  {
    id: 1, identificacao: '4523-A', marca: 'Michelin', modelo: 'Primacy 4', status: 'em_uso',
    kmRodado: 15000, limiteKm: 60000, veiculo: 'ABC-1234', posicao: 'Dianteiro Esquerdo',
    dataInstalacao: '2024-01-10', kmInstalacao: 30000
  },
  {
    id: 2, identificacao: '4523-B', marca: 'Michelin', modelo: 'Primacy 4', status: 'em_uso',
    kmRodado: 15000, limiteKm: 60000, veiculo: 'ABC-1234', posicao: 'Dianteiro Direito',
    dataInstalacao: '2024-01-10', kmInstalacao: 30000
  },
  {
    id: 3, identificacao: '1222-X', marca: 'Pirelli', modelo: 'Cinturato P7', status: 'estoque',
    kmRodado: 0, limiteKm: 55000
  },
   {
    id: 4, identificacao: '3021-Y', marca: 'Goodyear', modelo: 'Eagle Sport', status: 'descartado',
    kmRodado: 65000, limiteKm: 60000 // Exemplo de pneu que passou do limite
  },
];

const PneuList: React.FC = () => {
  // TODO: Lógica para buscar pneus da API/Supabase
  const [pneus, setPneus] = useState<Pneu[]>(samplePneus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStatusInfo = (status: Pneu['status']) => {
    switch (status) {
      case 'estoque':
        return { text: 'Estoque', color: 'bg-blue-200 text-blue-800', icon: <CircleDot className="w-3 h-3 mr-1" /> };
      case 'em_uso':
        return { text: 'Em Uso', color: 'bg-green-200 text-green-800', icon: <CheckCircle className="w-3 h-3 mr-1" /> };
      case 'descartado':
        return { text: 'Descartado', color: 'bg-gray-300 text-gray-800', icon: <XCircle className="w-3 h-3 mr-1" /> };
      default:
        return { text: 'Desconhecido', color: 'bg-gray-200 text-gray-800', icon: null };
    }
  };

  const getLifePercentage = (pneu: Pneu): number | null => {
    if (pneu.status === 'descartado' || !pneu.limiteKm || pneu.limiteKm === 0) return null;
    const kmAtual = pneu.kmRodado || 0;
    const porcentagemRestante = Math.max(0, 100 - (kmAtual / pneu.limiteKm) * 100);
    return porcentagemRestante;
  };

  const getProgressBarColor = (percentage: number | null): string => {
    if (percentage === null) return 'bg-gray-400';
    if (percentage > 50) return 'bg-green-500';
    if (percentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-blue-700 rounded-lg shadow overflow-x-auto"> {/* Tema e overflow */}
      <table className="min-w-full divide-y divide-blue-600"> {/* Divisores azuis */}
        <thead className="bg-blue-600"> {/* Cabeçalho azul */}
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Marca/Modelo</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Veículo/Posição</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">KM Rodado</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Vida Útil (%)</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-blue-700 divide-y divide-blue-600"> {/* Corpo e divisores azuis */}
          {loading && (
            <tr><td colSpan={7} className="text-center py-4 text-blue-200">Carregando...</td></tr>
          )}
          {error && (
            <tr><td colSpan={7} className="text-center py-4 text-red-400">{error}</td></tr>
          )}
          {!loading && !error && pneus.length === 0 && (
            <tr><td colSpan={7} className="text-center py-4 text-blue-200">Nenhum pneu encontrado.</td></tr>
          )}
          {!loading && !error && pneus.map((pneu) => {
            const statusInfo = getStatusInfo(pneu.status);
            const lifePercentage = getLifePercentage(pneu);
            const progressBarColor = getProgressBarColor(lifePercentage);

            return (
              <tr key={pneu.id} className="hover:bg-blue-600 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">{pneu.identificacao}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-100">{pneu.marca} {pneu.modelo}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                    {statusInfo.icon}
                    {statusInfo.text}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-100">
                  {pneu.status === 'em_uso' ? `${pneu.veiculo} (${pneu.posicao})` : '-'}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-100 text-right">
                  {pneu.kmRodado !== undefined ? `${pneu.kmRodado.toLocaleString('pt-BR')} km` : '-'}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-100">
                  {lifePercentage !== null ? (
                    <div className="w-full bg-blue-800 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${progressBarColor}`}
                        style={{ width: `${lifePercentage}%` }}
                        title={`${lifePercentage.toFixed(1)}% restante (Limite: ${pneu.limiteKm} km)`}
                      ></div>
                    </div>
                  ) : (
                    <span className="text-xs">N/A</span>
                  )}
                </td>
                 <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {/* TODO: Adicionar botões de ação (Editar, Mover, Descartar) */}
                    <button className="text-yellow-400 hover:text-yellow-300 text-xs">Editar</button>
                     {pneu.status === 'em_uso' && <button className="text-red-400 hover:text-red-300 text-xs">Remover</button>}
                     {pneu.status === 'estoque' && <button className="text-green-400 hover:text-green-300 text-xs">Instalar</button>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PneuList; 