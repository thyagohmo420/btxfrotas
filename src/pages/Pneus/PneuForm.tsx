import React, { useState } from 'react';

// Interface para os dados do pneu
interface PneuFormData {
    identificacao: string; // Código único, DOT, etc.
    marca: string;
    modelo: string;
    dataAquisicao: string;
    status: 'estoque' | 'em_uso' | 'descartado' | '';
    // Dados de instalação (preenchidos quando status muda para 'em_uso')
    veiculoId?: string;
    posicao?: 'DE' | 'DD' | 'TE' | 'TD' | 'ESTEPE_1' | 'ESTEPE_2' | ''; // Dianteiro Esq/Dir, Traseiro Esq/Dir, Estepe
    dataInstalacao?: string;
    kmInstalacao?: number | '';
    limiteKm?: number | ''; // KM esperado para troca
    observacoes?: string;
}

// Interface se precisar de props
interface PneuFormProps {
  // onSubmit?: (formData: any) => void;
}

const PneuForm: React.FC<PneuFormProps> = () => {
    const [formData, setFormData] = useState<PneuFormData>({
        identificacao: '',
        marca: '',
        modelo: '',
        dataAquisicao: '',
        status: '',
        veiculoId: '',
        posicao: '',
        dataInstalacao: '',
        kmInstalacao: '',
        limiteKm: '',
        observacoes: '',
    });
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (value ? parseInt(value, 10) : '') : value,
        }));
         setError(null);
         setSuccess(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validação básica
        if (!formData.identificacao || !formData.marca || !formData.modelo || !formData.dataAquisicao || !formData.status) {
            setError("Preencha todos os campos obrigatórios do pneu (Identificação, Marca, Modelo, Data Aquisição, Status).");
            return;
        }

        // Validação adicional se estiver 'em_uso'
        if (formData.status === 'em_uso' && (!formData.veiculoId || !formData.posicao || !formData.dataInstalacao || formData.kmInstalacao === '' || formData.limiteKm === '')) {
            setError("Para pneus 'Em Uso', preencha também Veículo, Posição, Data Instalação, KM Instalação e Limite KM.");
            return;
        }

        setIsSubmitting(true);
        try {
            // TODO: Lógica para salvar/atualizar no Supabase
            // - Verificar se 'identificacao' já existe.
            // - Se novo, inserir. Se existente, atualizar (ex: mudar status, adicionar dados de instalação).
            // - Pode envolver múltiplas tabelas (pneus, historico_pneus).
            console.log("Salvando dados do pneu:", formData);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simula API call
            setSuccess(`Pneu ${formData.identificacao} salvo com sucesso!`);
            // Limpar form (opcional)
            // setFormData({ ... initialState ... });

        } catch (err) {
            console.error("Erro ao salvar pneu:", err);
            setError("Falha ao salvar o pneu. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-blue-700 p-6 rounded-lg shadow">
            {error && <p className="text-red-400 bg-red-900 p-3 rounded mb-4">{error}</p>}
            {success && <p className="text-green-300 bg-green-900 p-3 rounded mb-4">{success}</p>}

            <h3 className="text-lg font-semibold text-white col-span-full mb-2">Dados do Pneu</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b border-blue-600 pb-6 mb-6">
                <div>
                    <label htmlFor="identificacao" className="block text-sm font-medium mb-1 text-blue-200">Identificação *</label>
                    <input type="text" id="identificacao" name="identificacao" value={formData.identificacao} onChange={handleChange} required className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white" placeholder="Ex: 4523"/>
                </div>
                <div>
                    <label htmlFor="marca" className="block text-sm font-medium mb-1 text-blue-200">Marca *</label>
                    <input type="text" id="marca" name="marca" value={formData.marca} onChange={handleChange} required className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"/>
                </div>
                <div>
                    <label htmlFor="modelo" className="block text-sm font-medium mb-1 text-blue-200">Modelo *</label>
                    <input type="text" id="modelo" name="modelo" value={formData.modelo} onChange={handleChange} required className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"/>
                </div>
                <div>
                    <label htmlFor="dataAquisicao" className="block text-sm font-medium mb-1 text-blue-200">Data Aquisição *</label>
                    <input type="date" id="dataAquisicao" name="dataAquisicao" value={formData.dataAquisicao} onChange={handleChange} required className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"/>
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium mb-1 text-blue-200">Status Inicial *</label>
                    <select id="status" name="status" value={formData.status} onChange={handleChange} required className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white">
                        <option value="estoque">Em Estoque</option>
                        <option value="em_uso">Em Uso</option>
                        <option value="descartado">Descartado</option>
                    </select>
                </div>
            </div>

            {/* Informações da Instalação (Condicional) */}
            {formData.status === 'em_uso' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <h3 className="text-lg font-semibold text-white col-span-full mb-2">Dados da Instalação</h3>
                    <div>
                        <label htmlFor="veiculoId" className="block text-sm font-medium mb-1 text-blue-200">Veículo *</label>
                        <select id="veiculoId" name="veiculoId" value={formData.veiculoId} onChange={handleChange} required className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white">
                            <option value="">Selecione</option>
                            {/* TODO: Carregar Veículos */}
                            <option value="veiculo1">Veículo 1</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="posicao" className="block text-sm font-medium mb-1 text-blue-200">Posição *</label>
                        <select id="posicao" name="posicao" value={formData.posicao} onChange={handleChange} required className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white">
                            <option value="">Selecione</option>
                            <option value="DE">Dianteiro Esquerdo</option>
                            <option value="DD">Dianteiro Direito</option>
                            <option value="TE">Traseiro Esquerdo</option>
                            <option value="TD">Traseiro Direito</option>
                            <option value="ESTEPE_1">Estepe 1</option>
                            <option value="ESTEPE_2">Estepe 2</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="dataInstalacao" className="block text-sm font-medium mb-1 text-blue-200">Data Instalação *</label>
                        <input type="date" id="dataInstalacao" name="dataInstalacao" value={formData.dataInstalacao} onChange={handleChange} required className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"/>
                    </div>
                    <div>
                        <label htmlFor="kmInstalacao" className="block text-sm font-medium mb-1 text-blue-200">KM Instalação *</label>
                        <input type="number" id="kmInstalacao" name="kmInstalacao" value={formData.kmInstalacao} onChange={handleChange} required className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white" placeholder="0"/>
                    </div>
                    <div>
                        <label htmlFor="limiteKm" className="block text-sm font-medium mb-1 text-blue-200">Limite KM Esperado *</label>
                        <input type="number" id="limiteKm" name="limiteKm" value={formData.limiteKm} onChange={handleChange} required className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white" placeholder="KM total de vida útil"/>
                    </div>
                </div>
            )}

            {/* Observações Gerais */}
            <div className="pt-4">
                <label htmlFor="observacoes" className="block text-sm font-medium mb-1 text-blue-200">Observações</label>
                <textarea
                    id="observacoes"
                    name="observacoes"
                    rows={3}
                    value={formData.observacoes}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-blue-600 border border-blue-500 focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-white"
                ></textarea>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className={`px-6 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Salvando...' : 'Salvar Pneu'}
                </button>
            </div>
        </form>
    );
};

export default PneuForm; 