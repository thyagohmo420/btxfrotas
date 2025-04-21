import React from 'react';
import ChecklistForm from './ChecklistForm';
import ChecklistList from './ChecklistList';
import { ClipboardCheck } from 'lucide-react';

const ChecklistPage: React.FC = () => {
  return (
    <div className="text-white">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardCheck className="w-6 h-6 text-blue-300" />
        <h1 className="text-2xl font-semibold text-white">Checklist de Veículos</h1>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Realizar Novo Checklist</h2>
        <ChecklistForm />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">Histórico de Checklists</h2>
         <ChecklistList />
      </div>
    </div>
  );
};

export default ChecklistPage; 