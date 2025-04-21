import React from 'react';
import PneuForm from './PneuForm';
import PneuList from './PneuList';
import { CircleDot } from 'lucide-react'; // Ícone

const PneusPage: React.FC = () => {
  return (
    // Remover fundo e padding, usar texto branco
    <div className="text-white">
      {/* Título com Ícone */}
      <div className="flex items-center gap-3 mb-6">
        <CircleDot className="w-6 h-6 text-blue-300" />
        <h1 className="text-2xl font-semibold text-white">Gestão de Pneus</h1>
      </div>

      {/* Formulário de Pneu */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Registrar Novo Pneu / Instalação</h2>
        {/* PneuForm precisa ter o tema aplicado internamente */}
         <PneuForm />
      </div>

      {/* Listagem de Pneus */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">Histórico e Status dos Pneus</h2>
        {/* PneuList precisa ter o tema aplicado internamente */}
         <PneuList />
      </div>
    </div>
  );
};

export default PneusPage; 