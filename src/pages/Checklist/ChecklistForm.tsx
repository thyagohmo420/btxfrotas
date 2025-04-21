import React, { useState } from 'react';

// Definindo os itens padrão do checklist
const checklistItemsDefinition = [
    { id: 'pneus', label: 'Pneus (Calibragem/Estado)' },
    { id: 'oleo', label: 'Nível de Óleo' },
    { id: 'agua', label: 'Nível de Água/Arrefecimento' },
    { id: 'freios', label: 'Freios (Funcionamento/Ruídos)' },
    { id: 'luzes', label: 'Luzes (Faróis, Lanternas, Setas)' },
    { id: 'documentos', label: 'Documentos (CRLV, CNH)' },
    { id: 'limpeza', label: 'Limpeza Interna/Externa' },
    { id: 'equipamentos', label: 'Equipamentos Obrigatórios (Estepe, Macaco, Triângulo)' },
];

// Interface para o estado de cada item
interface ChecklistItemState {
    status: 'ok' | 'nok' | 'na' | ''; // OK, Não OK, Não Aplicável, Não selecionado
    observacao?: string;
}

// Interface para os dados gerais do formulário
interface ChecklistFormData {
    veiculoId: string;
    motoristaId: string;
    data: string;
    quilometragem: number | '';
    observacoesGerais?: string;
    itens: Record<string, ChecklistItemState>; // Usando um Record para mapear id do item para seu estado
}

const ChecklistForm: React.FC = () => {
    // Inicializa o estado dos itens com base na definição
    const initialItemsState = checklistItemsDefinition.reduce((acc, item) => {
        acc[item.id] = { status: '', observacao: '' };
        return acc;
    }, {} as Record<string, ChecklistItemState>);

    const [formData, setFormData] = useState<ChecklistFormData>({
        veiculoId: '',
        motoristaId: '',
        data: '',
        quilometragem: '',
        observacoesGerais: '',
        itens: initialItemsState,
    });

    const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? (value ? parseInt(value, 10) : '') : value,
        }));
    };

    const handleItemChange = (itemId: string, field: keyof ChecklistItemState, value: string) => {
        setFormData(prev => ({
            ...prev,
            itens: {
                ...prev.itens,
                [itemId]: {
                    ...prev.itens[itemId],
                    [field]: value,
                },
            },
        }));
    };

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validação básica: verificar se todos os itens foram preenchidos
        const algumItemNaoPreenchido = Object.values(formData.itens).some(item => item.status === '');
        if (algumItemNaoPreenchido || !formData.veiculoId || !formData.motoristaId || !formData.data || formData.quilometragem === '') {
            alert('Por favor, preencha todos os campos obrigatórios e verifique todos os itens do checklist.');
            return;
        }

        // Determinar status geral (Reprovado se algum item for 'nok')
        const statusGeral = Object.values(formData.itens).some(item => item.status === 'nok') ? 'Reprovado' : 'Aprovado';

        console.log('Dados do Checklist:', { ...formData, statusGeral });
        // TODO: Adicionar lógica de inserção no Supabase aqui
        // (Salvar dados gerais e o estado de cada item, talvez como JSON ou em tabela separada)
         alert(`Checklist ${statusGeral} enviado com sucesso!`);
         // Limpar form (opcional)
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-blue-800 p-6 rounded-lg">
            {/* Informações Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <div>
                    <label htmlFor="veiculoId" className="block text-sm font-medium mb-1">Veículo *</label>
                    <select id="veiculoId" name="veiculoId" value={formData.veiculoId} onChange={handleGeneralChange} required className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Selecione</option>
                        {/* TODO: Carregar veículos */}
                        <option value="veiculo1">Veículo 1</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="motoristaId" className="block text-sm font-medium mb-1">Motorista *</label>
                     <select id="motoristaId" name="motoristaId" value={formData.motoristaId} onChange={handleGeneralChange} required className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Selecione</option>
                         {/* TODO: Carregar motoristas */}
                        <option value="motorista1">Motorista 1</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="data" className="block text-sm font-medium mb-1">Data *</label>
                    <input type="date" id="data" name="data" value={formData.data} onChange={handleGeneralChange} required className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                 <div>
                    <label htmlFor="quilometragem" className="block text-sm font-medium mb-1">Quilometragem *</label>
                    <input type="number" id="quilometragem" name="quilometragem" value={formData.quilometragem} onChange={handleGeneralChange} required className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500" />
                </div>
            </div>

            {/* Itens do Checklist */}
            <div className="space-y-4">
                 <h3 className="text-xl font-semibold border-b border-blue-700 pb-2">Itens de Verificação</h3>
                {checklistItemsDefinition.map(itemDef => (
                    <div key={itemDef.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b border-blue-700 pb-4 last:border-b-0">
                        <label className="text-sm font-medium md:col-span-1">{itemDef.label} *</label>
                        {/* Status */}
                        <div className="flex space-x-4 md:col-span-1">
                            <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="radio" name={`status-${itemDef.id}`} value="ok" checked={formData.itens[itemDef.id]?.status === 'ok'} onChange={() => handleItemChange(itemDef.id, 'status', 'ok')} className="form-radio text-green-500 bg-gray-700 border-gray-600 focus:ring-green-500" />
                                <span>OK</span>
                            </label>
                             <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="radio" name={`status-${itemDef.id}`} value="nok" checked={formData.itens[itemDef.id]?.status === 'nok'} onChange={() => handleItemChange(itemDef.id, 'status', 'nok')} className="form-radio text-red-500 bg-gray-700 border-gray-600 focus:ring-red-500" />
                                <span>Não OK</span>
                            </label>
                            <label className="flex items-center space-x-1 cursor-pointer">
                                <input type="radio" name={`status-${itemDef.id}`} value="na" checked={formData.itens[itemDef.id]?.status === 'na'} onChange={() => handleItemChange(itemDef.id, 'status', 'na')} className="form-radio text-yellow-500 bg-gray-700 border-gray-600 focus:ring-yellow-500" />
                                <span>N/A</span>
                            </label>
                        </div>
                        {/* Observação (aparece se Não OK) */}
                         <div className="md:col-span-1">
                             {formData.itens[itemDef.id]?.status === 'nok' && (
                                <input
                                    type="text"
                                    placeholder="Observação (obrigatória se Não OK)"
                                    value={formData.itens[itemDef.id]?.observacao || ''}
                                    onChange={(e) => handleItemChange(itemDef.id, 'observacao', e.target.value)}
                                    required // Torna obrigatório se 'nok' estiver marcado
                                    className="w-full p-1.5 text-sm rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                                />
                             )}
                        </div>
                    </div>
                ))}
            </div>

             {/* Observações Gerais */}
             <div>
                <label htmlFor="observacoesGerais" className="block text-sm font-medium mb-1">Observações Gerais</label>
                <textarea
                    id="observacoesGerais"
                    name="observacoesGerais"
                    rows={3}
                    value={formData.observacoesGerais}
                    onChange={handleGeneralChange}
                    className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Alguma observação adicional sobre o checklist?"
                ></textarea>
            </div>


            <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
                Salvar Checklist
            </button>
        </form>
    );
};

export default ChecklistForm; 