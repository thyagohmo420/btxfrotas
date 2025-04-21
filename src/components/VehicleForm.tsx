import React, { useState } from 'react';
// Importar cliente Supabase
import { supabase } from '../lib/supabaseClient';

interface VehicleFormProps {
  onClose: () => void; // Função para fechar o modal
  onSubmit: (formData: any) => void; // Função para lidar com o envio (por enquanto, só log)
}

// Definir tipos de status permitidos
type VehicleStatus = 'Ativo' | 'Em Manutenção' | 'Inativo';

const VehicleForm: React.FC<VehicleFormProps> = ({ onClose, onSubmit }) => {
  // TODO: Definir estado para os campos do formulário (placa, modelo, ano, etc.)
  const [plate, setPlate] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState<number | ''>('');
  // Adicionar estado para os novos campos
  const [status, setStatus] = useState<VehicleStatus>('Ativo'); // Status inicial padrão
  const [currentMileage, setCurrentMileage] = useState<number | ''>('');

  // Estados para feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = { 
      placa: plate, 
      modelo: model, 
      ano: year || null, // Enviar null se não preenchido
      status: status, 
      km_atual: currentMileage || 0 
    };

    try {
      // Inserir dados na tabela 'veiculos' do Supabase
      const { error: insertError } = await supabase
        .from('veiculos')
        .insert([formData]); 

      if (insertError) {
        // Tratar erro específico do Supabase (ex: placa duplicada)
        if (insertError.code === '23505') { // Código de violação de constraint unique
           setError(`Erro: A placa ${plate} já está cadastrada.`);
        } else {
          setError(`Erro ao salvar veículo: ${insertError.message}`);
        }
        console.error('Supabase insert error:', insertError);
        setLoading(false);
        return; // Não continua se deu erro
      }

      // Sucesso!
      setSuccess('Veículo salvo com sucesso!');
      console.log("Veículo salvo com sucesso:", formData);
      onSubmit(formData); // Chama a função original (pode ser removida depois)
      
      // Limpar formulário após sucesso
      setPlate('');
      setModel('');
      setYear('');
      setStatus('Ativo');
      setCurrentMileage('');

      // Fechar modal após um pequeno delay para mostrar mensagem de sucesso
      setTimeout(() => {
        onClose();
      }, 1500); 

    } catch (generalError) {
      console.error('Erro inesperado:', generalError);
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
       // Garante que loading seja false mesmo se fechar antes do timeout
       // Não setamos aqui para permitir que a mensagem de sucesso seja vista
       // setLoading(false); 
    }
  };

  return (
    // Estrutura básica do modal/formulário
    // Usaremos um fundo semi-transparente para o overlay e um card centralizado para o form
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      // Não fechar ao clicar fora enquanto estiver carregando
      onClick={loading ? undefined : onClose} 
    >
      <div 
        className="bg-blue-800 p-8 rounded-lg shadow-xl w-full max-w-md relative text-white"
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro feche o modal
      >
        <h2 className="text-2xl font-semibold mb-6">Adicionar Novo Veículo</h2>
        
        {/* Exibir mensagens de erro/sucesso */}
        {error && <p className="bg-red-900 text-red-300 p-3 rounded mb-4 text-sm">{error}</p>}
        {success && <p className="bg-green-900 text-green-300 p-3 rounded mb-4 text-sm">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo Placa */}
          <div>
            <label htmlFor="plate" className="block text-sm font-medium mb-1 text-blue-200">Placa *</label>
            <input 
              type="text" 
              id="plate"
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase())} // Converter para maiúsculas
              required 
              maxLength={8} // Limitar tamanho da placa (ex: ABC-1234 ou ABC1D23)
              className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"
            />
          </div>

          {/* Campo Modelo */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium mb-1 text-blue-200">Modelo *</label>
            <input 
              type="text" 
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required 
              className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"
            />
          </div>

          {/* Campo Ano */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium mb-1 text-blue-200">Ano *</label>
            <input 
              type="number" 
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : '')}
              required 
              min={1980} // Definir ano mínimo
              max={new Date().getFullYear() + 1} // Definir ano máximo
              className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"
            />
          </div>

          {/* Campo Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1 text-blue-200">Status *</label>
            <select 
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as VehicleStatus)}
              required 
              className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"
            >
              <option value="Ativo">Ativo</option>
              <option value="Em Manutenção">Em Manutenção</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>

          {/* Campo KM Atual */}
          <div>
            <label htmlFor="currentMileage" className="block text-sm font-medium mb-1 text-blue-200">KM Atual</label>
            <input 
              type="number" 
              id="currentMileage"
              value={currentMileage}
              onChange={(e) => setCurrentMileage(e.target.value ? parseInt(e.target.value) : '')}
              min={0} // KM não pode ser negativo
              className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"
              placeholder="0"
            />
          </div>

          {/* TODO: Adicionar outros campos (Status, Quilometragem, Tipo Combustível, etc.) */}

          {/* Inputs desabilitados durante o loading */}
          <fieldset disabled={loading} className="space-y-4">
             <div>
                <label htmlFor="plate" className="block text-sm font-medium mb-1 text-blue-200">Placa *</label>
                <input type="text" id="plate" value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} required maxLength={8} className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"/>
             </div>
             <div>
                <label htmlFor="model" className="block text-sm font-medium mb-1 text-blue-200">Modelo *</label>
                <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} required className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"/>
             </div>
             <div>
                <label htmlFor="year" className="block text-sm font-medium mb-1 text-blue-200">Ano *</label>
                <input type="number" id="year" value={year} onChange={(e) => setYear(e.target.value ? parseInt(e.target.value) : '')} required min={1980} max={new Date().getFullYear() + 1} className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"/>
             </div>
             <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1 text-blue-200">Status *</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value as VehicleStatus)} required className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50">
                  <option value="Ativo">Ativo</option>
                  <option value="Em Manutenção">Em Manutenção</option>
                  <option value="Inativo">Inativo</option>
                </select>
             </div>
             <div>
                <label htmlFor="currentMileage" className="block text-sm font-medium mb-1 text-blue-200">KM Atual</label>
                <input type="number" id="currentMileage" value={currentMileage} onChange={(e) => setCurrentMileage(e.target.value ? parseInt(e.target.value) : '')} min={0} className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50" placeholder="0"/>
              </div>
          </fieldset>

          {/* Botões */}
          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              disabled={loading} // Desabilitar enquanto carrega
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading || success !== null} // Desabilitar se carregando ou se já deu sucesso
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : (success ? 'Salvo!' : 'Salvar Veículo')}
            </button>
          </div>
        </form>

        {/* Botão fechar desabilitado durante loading */} 
        <button 
            onClick={onClose} 
            disabled={loading}
            className="absolute top-4 right-4 text-gray-400 hover:text-white disabled:opacity-50"
        >
             &times;
        </button>
      </div>
    </div>
  );
};

export default VehicleForm; 