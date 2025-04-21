import React, { useState } from 'react';
// Importar cliente Supabase
import { supabase } from '../lib/supabaseClient'; 

interface DriverFormProps {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

// Definir tipos de Turno
type Turno = 'Manhã' | 'Tarde' | 'Noite' | 'Integral' | '';

const DriverForm: React.FC<DriverFormProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [cnh, setCnh] = useState('');
  const [cnhExpiry, setCnhExpiry] = useState('');
  const [phone, setPhone] = useState('');
  // Adicionar estado para Turno
  const [turno, setTurno] = useState<Turno>('');
  // Adicionar outros estados necessários (status, veículo associado?)

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
      nome: name, 
      cnh: cnh, 
      validade_cnh: cnhExpiry || null, // Enviar null se vazio
      turno: turno || null, // Enviar null se vazio
      // telefone: phone || null // Adicionar se criar coluna
    };

    try {
      // Inserir na tabela 'motoristas'
      const { error: insertError } = await supabase
        .from('motoristas')
        .insert([formData]);

      if (insertError) {
        if (insertError.code === '23505') { // Erro de chave única (CNH)
          setError(`Erro: A CNH ${cnh} já está cadastrada.`);
        } else {
          setError(`Erro ao salvar motorista: ${insertError.message}`);
        }
        console.error('Supabase insert error:', insertError);
        setLoading(false);
        return;
      }

      // Sucesso
      setSuccess('Motorista salvo com sucesso!');
      console.log("Motorista salvo com sucesso:", formData);
      onSubmit(formData);
      
      // Limpar form
      setName('');
      setCnh('');
      setCnhExpiry('');
      setPhone('');
      setTurno('');

      // Fechar modal
      setTimeout(() => {
        onClose();
      }, 1500); 

    } catch (generalError) {
      console.error('Erro inesperado:', generalError);
      setError('Ocorreu um erro inesperado. Tente novamente.');
    } 
    // Não setamos setLoading(false) aqui para mostrar mensagem de sucesso
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={loading ? undefined : onClose}
    >
      <div 
        className="bg-blue-800 p-8 rounded-lg shadow-xl w-full max-w-md relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-6">Adicionar Novo Motorista</h2>
        
        {/* Feedback */}
        {error && <p className="bg-red-900 text-red-300 p-3 rounded mb-4 text-sm">{error}</p>}
        {success && <p className="bg-green-900 text-green-300 p-3 rounded mb-4 text-sm">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campos desabilitados durante loading */}
          <fieldset disabled={loading} className="space-y-4">
            {/* Campo Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 text-blue-200">Nome Completo *</label>
              <input 
                type="text" 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
                className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"
              />
            </div>

            {/* Campo CNH */}
            <div>
              <label htmlFor="cnh" className="block text-sm font-medium mb-1 text-blue-200">Nº CNH *</label>
              <input 
                type="text" 
                id="cnh"
                value={cnh}
                onChange={(e) => setCnh(e.target.value)}
                required 
                className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"
              />
            </div>

            {/* Campo Validade CNH */}
            <div>
              <label htmlFor="cnhExpiry" className="block text-sm font-medium mb-1 text-blue-200">Validade CNH *</label>
              <input 
                type="date" 
                id="cnhExpiry"
                value={cnhExpiry}
                onChange={(e) => setCnhExpiry(e.target.value)}
                required 
                className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"
              />
            </div>

             {/* Campo Telefone */}
             <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1 text-blue-200">Telefone</label>
              <input 
                type="tel" // Usar tipo tel para semântica
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                // Adicionar máscara/formatação se necessário
                className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"
              />
            </div>

            {/* Campo Turno */}
            <div>
              <label htmlFor="turno" className="block text-sm font-medium mb-1 text-blue-200">Turno</label>
              <select 
                id="turno"
                value={turno}
                onChange={(e) => setTurno(e.target.value as Turno)}
                className="w-full p-2 rounded bg-blue-700 border border-blue-600 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white disabled:opacity-50"
              >
                <option value="">Não Definido</option>
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
                <option value="Integral">Integral</option>
              </select>
            </div>
          </fieldset>

          {/* Botões */}
          <div className="flex justify-end gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading || success !== null}
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : (success ? 'Salvo!' : 'Salvar Motorista')}
            </button>
          </div>
        </form>

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

export default DriverForm; 