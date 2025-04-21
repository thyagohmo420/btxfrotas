import React from 'react';
import AbastecimentoForm from './AbastecimentoForm';
import AbastecimentoList from './AbastecimentoList';
import { Fuel } from 'lucide-react';

const AbastecimentoPage: React.FC = () => {
  return (
    <div className="text-white">
      <div className="flex items-center gap-3 mb-6">
        <Fuel className="w-6 h-6 text-blue-300" />
        <h1 className="text-2xl font-semibold text-white">Gestão de Abastecimento</h1>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Registrar Novo Abastecimento</h2>
        <AbastecimentoForm />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">Histórico de Abastecimentos</h2>
        <AbastecimentoList />
      </div>
    </div>
  );
};

export default AbastecimentoPage; 