import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, TrendingUp, Fuel, Calendar, AlertTriangle, Brain } from 'lucide-react';

const fuelData = [
  { month: 'Jan', consumo: 2500, custo: 12500 },
  { month: 'Fev', consumo: 2300, custo: 11500 },
  { month: 'Mar', consumo: 2800, custo: 14000 },
  { month: 'Abr', consumo: 2400, custo: 12000 },
  { month: 'Mai', consumo: 2600, custo: 13000 },
  { month: 'Jun', consumo: 2200, custo: 11000 }
];

const kmData = [
  { month: 'Jan', km: 45000 },
  { month: 'Fev', km: 42000 },
  { month: 'Mar', km: 48000 },
  { month: 'Abr', km: 44000 },
  { month: 'Mai', km: 46000 },
  { month: 'Jun', km: 43000 }
];

const vehicleMetrics = [
  {
    id: 1,
    plate: 'ABC-1234',
    model: 'Fiat Toro',
    avgConsumption: 9.5,
    monthlyKm: 3200,
    fuelCost: 1600,
    prediction: {
      nextMonth: 1750,
      nextQuarter: 5400
    }
  },
  {
    id: 2,
    plate: 'XYZ-5678',
    model: 'VW Gol',
    avgConsumption: 12.8,
    monthlyKm: 2800,
    fuelCost: 1200,
    prediction: {
      nextMonth: 1300,
      nextQuarter: 4000
    }
  }
];

// Formata moeda para tooltips e eixos
const formatCurrency = (value: number) => `R$ ${value.toLocaleString('pt-BR')}`;

const ConsumptionTrends = () => (
  <div className="bg-blue-800 rounded-lg shadow-sm p-6">
    <div className="flex items-center gap-3 mb-6">
      <Fuel className="w-6 h-6 text-blue-300" />
      <h2 className="text-xl font-semibold">Consumo e Custo de Combustível</h2>
    </div>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={fuelData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="month" stroke="#CBD5E0" />
          <YAxis yAxisId="left" stroke="#CBD5E0" label={{ value: 'Consumo (L)', angle: -90, position: 'insideLeft', fill:'#CBD5E0' }} />
          <YAxis yAxisId="right" orientation="right" stroke="#CBD5E0" tickFormatter={formatCurrency} label={{ value: 'Custo (R$)', angle: -90, position: 'insideRight', fill:'#CBD5E0' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1A202C', border: 'none', color: '#E2E8F0' }}
            formatter={(value, name) => name === 'Custo (R$)' ? formatCurrency(value as number) : `${value} L`}
            labelStyle={{ color: '#A0AEC0' }}
          />
          <Bar yAxisId="left" dataKey="consumo" fill="#63B3ED" name="Consumo (L)" />
          <Bar yAxisId="right" dataKey="custo" fill="#4299E1" name="Custo (R$)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const KilometrageAnalysis = () => (
  <div className="bg-blue-800 rounded-lg shadow-sm p-6">
    <div className="flex items-center gap-3 mb-6">
      <TrendingUp className="w-6 h-6 text-blue-300" />
      <h2 className="text-xl font-semibold">Análise de Quilometragem</h2>
    </div>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={kmData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="month" stroke="#CBD5E0" />
          <YAxis stroke="#CBD5E0" label={{ value: 'KM Rodado', angle: -90, position: 'insideLeft', fill:'#CBD5E0' }}/>
          <Tooltip
             contentStyle={{ backgroundColor: '#1A202C', border: 'none', color: '#E2E8F0' }}
             formatter={(value) => `${(value as number).toLocaleString('pt-BR')} km`}
             labelStyle={{ color: '#A0AEC0' }}
           />
          <Line type="monotone" dataKey="km" stroke="#63B3ED" name="KM Rodado" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const VehicleMetricsCard = ({ vehicle }: { vehicle: typeof vehicleMetrics[0] }) => (
  <div className="bg-blue-800 rounded-lg shadow-sm p-6 text-white">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold">{vehicle.model}</h3>
        <p className="text-blue-200 text-sm">{vehicle.plate}</p>
      </div>
      <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
        {vehicle.avgConsumption} km/l
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <p className="text-sm text-blue-300">KM Mensal</p>
        <p className="font-medium">{vehicle.monthlyKm} km</p>
      </div>
      <div>
        <p className="text-sm text-blue-300">Custo Combustível</p>
        <p className="font-medium">{formatCurrency(vehicle.fuelCost)}</p>
      </div>
    </div>

    <div className="border-t border-blue-700 pt-4">
      <h4 className="text-sm font-medium mb-2">Previsão de Gastos (IA)</h4>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-blue-300">Próximo Mês:</span>
          <span className="font-medium">{formatCurrency(vehicle.prediction.nextMonth)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-blue-300">Próximo Trimestre:</span>
          <span className="font-medium">{formatCurrency(vehicle.prediction.nextQuarter)}</span>
        </div>
      </div>
    </div>
  </div>
);

const AIRecommendations = () => (
  <div className="bg-blue-800 rounded-lg shadow-sm p-6">
    <div className="flex items-center gap-3 mb-4">
      <Brain className="w-6 h-6 text-blue-300" />
      <h2 className="text-xl font-semibold text-white">Recomendações da IA</h2>
    </div>
    <div className="space-y-4">
      <div className="p-4 bg-blue-700 rounded-lg text-black">
        <h3 className="font-medium mb-2">Otimização de Custos</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
            Consumo 15% acima do esperado para Fiat Toro (ABC-1234)
          </li>
          <li className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
            Agendar manutenção preventiva para 2 veículos
          </li>
          <li className="flex items-center gap-2">
            <Fuel className="w-4 h-4 text-green-500 flex-shrink-0" />
            Potencial economia de R$ 2.500 no próximo trimestre
          </li>
        </ul>
      </div>
      
      <div className="p-4 bg-blue-700 rounded-lg text-black">
        <h3 className="font-medium mb-2">Previsões</h3>
        <ul className="space-y-2 text-sm list-disc list-inside">
          <li>Aumento previsto de 8% no consumo para o próximo mês</li>
          <li>Tendência de redução de 5% na quilometragem média</li>
          <li>Sugestão de revisão da política de abastecimento</li>
        </ul>
      </div>
    </div>
  </div>
);

const Analytics = () => {
  return (
    <div className="min-h-screen bg-blue-900 text-white p-8">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="w-8 h-8" />
        <h1 className="text-3xl font-bold">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ConsumptionTrends />
        <KilometrageAnalysis />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {vehicleMetrics.map(vehicle => (
          <VehicleMetricsCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      <AIRecommendations />
    </div>
  );
};

export default Analytics;