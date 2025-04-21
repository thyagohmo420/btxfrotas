import React from 'react';
import { FileText, Upload } from 'lucide-react';

const Documents = () => {
  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-300" />
          <h1 className="text-2xl font-semibold text-white">Gestão de Documentos</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Upload className="w-4 h-4" />
          Novo Upload
        </button>
      </div>

      <div className="bg-blue-700 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-medium text-white mb-4">Fazer Upload</h2>
        <div className="border-2 border-dashed border-blue-600 rounded-lg p-8 text-center bg-blue-800">
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-10 h-10 text-blue-400" />
            <p className="text-blue-200">Arraste arquivos aqui ou clique no botão "Novo Upload"</p>
            <p className="text-sm text-blue-300">Suporta PDF, JPG, PNG, etc.</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-700 rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-white mb-4">Documentos Armazenados</h2>
        <div className="overflow-x-auto">
           <table className="min-w-full divide-y divide-blue-600">
               <thead className="bg-blue-600">
                 <tr>
                   <th className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Nome / Tipo</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Veículo</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Validade</th>
                   <th className="px-6 py-3 text-left text-xs font-medium text-blue-100 uppercase tracking-wider">Ações</th>
                 </tr>
               </thead>
               <tbody className="bg-blue-700 divide-y divide-blue-600">
                 <tr>
                   <td colSpan={4} className="text-center py-4 text-blue-200">Nenhum documento encontrado.</td>
                 </tr>
               </tbody>
             </table>
        </div>
      </div>
    </div>
  );
};

export default Documents;