import React, { useState } from 'react';
import DespesaForm from './DespesaForm';
import DespesaList from './DespesaList';
import CustoMensalChart from './CustoMensalChart';
import { DollarSign, Plus } from 'lucide-react';

const TCOPage: React.FC = () => {
  // Descomentar se usar modal
  // const [isFormOpen, setIsFormOpen] = useState(false);
  // const handleOpenForm = () => setIsFormOpen(true);
  // const handleCloseForm = () => setIsFormOpen(false);
  // const handleAddDespesa = (formData: any) => {
  //   console.log('Nova despesa (a ser implementado):', formData);
  //   handleCloseForm();
  // };

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-blue-300" />
          <h1 className="text-2xl font-semibold text-white">Custo Total de Propriedade (TCO)</h1>
        </div>
        {/* Botão para abrir modal (se usar modal) */}
        {/* 
        <button 
          onClick={handleOpenForm}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Despesa
        </button> 
        */}
      </div>

      {/* Formulário de Despesa (renderizado diretamente) */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Registrar Nova Despesa</h2>
         <DespesaForm />
      </div>

       {/* Gráfico de Custos Mensais */}
       <div className="mb-8">
         <h2 className="text-xl font-semibold mb-4 text-white">Evolução Mensal dos Custos</h2>
         <div className="bg-blue-700 p-6 rounded-lg shadow">
             <CustoMensalChart />
         </div>
       </div>

      {/* Listagem de Despesas e Totais */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">Histórico de Despesas</h2>
         <DespesaList />
      </div>

      {/* Modal (se usar) */}
      {/* 
      {isFormOpen && (
        <DespesaForm 
          onClose={handleCloseForm} 
          onSubmit={handleAddDespesa} 
        />
      )}
      */}
    </div>
  );
};

export default TCOPage; 