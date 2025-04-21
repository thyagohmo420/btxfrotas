import React from 'react';
import { FileBarChart, Download } from 'lucide-react';

const Reports = () => {

  // Tipos de relatórios (exemplo)
  const reportTypes = [
    { key: 'fleet_summary', title: 'Resumo da Frota', description: 'Status geral, KM total, custo médio.' },
    { key: 'fuel_consumption', title: 'Consumo de Combustível', description: 'Detalhes de consumo por veículo/período.' },
    { key: 'maintenance_history', title: 'Histórico de Manutenção', description: 'Manutenções realizadas, custos e próximas.' },
    { key: 'driver_performance', title: 'Desempenho do Motorista', description: 'Scores, eventos de telemetria, viagens.' },
    { key: 'tco_analysis', title: 'Análise de TCO', description: 'Custo total de propriedade por veículo.' },
    { key: 'checklist_compliance', title: 'Conformidade de Checklist', description: 'Checklists realizados e pendências.' },
  ];

  const handleGenerateReport = (reportKey: string) => {
    alert(`Gerar relatório: ${reportKey} (funcionalidade a implementar)`);
    // TODO: Implementar lógica de geração e download
  };

  return (
    <div className="text-white">
      <div className="flex items-center gap-3 mb-6">
        <FileBarChart className="w-6 h-6 text-blue-300" />
        <h1 className="text-2xl font-semibold text-white">Relatórios</h1>
      </div>

      {/* Seleção de Relatórios */}
      <div className="bg-blue-700 rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-white mb-4">Selecione um Relatório</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((report) => (
            <div key={report.key} className="p-4 bg-blue-800 rounded-lg border border-blue-600 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-white mb-1">{report.title}</h3>
                <p className="text-sm text-blue-200 mb-4">{report.description}</p>
              </div>
              <div className="flex gap-2 mt-auto">
                <button 
                  onClick={() => handleGenerateReport(report.key + '_pdf')}
                  className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                >
                  <Download className="w-3 h-3" />
                  PDF
                </button>
                <button 
                  onClick={() => handleGenerateReport(report.key + '_excel')}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                  >
                  <Download className="w-3 h-3" />
                  Excel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;