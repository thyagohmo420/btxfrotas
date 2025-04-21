import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Dados de exemplo para custos mensais
const monthlyCosts = [
  { month: 'Jan', Combustível: 11500, Manutenção: 2500, Seguro: 1200, Impostos: 800, Outros: 500 },
  { month: 'Fev', Combustível: 12000, Manutenção: 1800, Seguro: 1200, Impostos: 800, Outros: 600 },
  { month: 'Mar', Combustível: 13500, Manutenção: 3200, Seguro: 1200, Impostos: 800, Outros: 750 },
  { month: 'Abr', Combustível: 12800, Manutenção: 2100, Seguro: 1200, Impostos: 800, Outros: 550 },
  { month: 'Mai', Combustível: 14000, Manutenção: 2800, Seguro: 1200, Impostos: 800, Outros: 680 },
  { month: 'Jun', Combustível: 13200, Manutenção: 1900, Seguro: 1200, Impostos: 800, Outros: 620 },
];

// Cores para as barras (exemplo)
const COLORS = {
  Combustível: '#3B82F6', // Azul
  Manutenção: '#F59E0B', // Laranja
  Seguro: '#10B981', // Verde
  Impostos: '#EF4444', // Vermelho
  Outros: '#6B7280' // Cinza
};

// Formata valores para moeda
const formatCurrency = (value: number) => `R$ ${value.toLocaleString('pt-BR')}`;

const CustoMensalChart: React.FC = () => {
  // TODO: Carregar dados reais e processar por mês/categoria

  return (
    <div className="h-96"> {/* Altura definida para o container do gráfico */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyCosts}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* Ajustar cores para tema escuro */}
          <CartesianGrid strokeDasharray="3 3" stroke="#4B5568" />
          <XAxis dataKey="month" stroke="#CBD5E0" />
          <YAxis stroke="#CBD5E0" tickFormatter={formatCurrency}/>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} // Fundo escuro, borda arredondada
            labelStyle={{ color: '#A0AEC0', marginBottom: '4px' }} // Cor do label (mês)
            itemStyle={{ color: '#E5E7EB' }} // Cor do texto dos itens
            formatter={(value: number) => formatCurrency(value)} // Formatar valores
            cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} // Fundo leve ao passar o mouse
          />
          {/* Ajustar cor da legenda */}
          <Legend wrapperStyle={{ color: '#CBD5E0', paddingTop: '10px' }} /> 
          
          {/* Barras empilhadas para cada categoria */}
          {Object.entries(COLORS).map(([key, color]) => (
            <Bar key={key} dataKey={key} stackId="a" fill={color} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustoMensalChart; 