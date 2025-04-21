import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Dados de exemplo para o gráfico (substituir com dados reais da API/Supabase)
const data = [
  { timestamp: '2024-07-28 08:00', velocidade: 60 },
  { timestamp: '2024-07-28 08:15', velocidade: 65 },
  { timestamp: '2024-07-28 08:30', velocidade: 70 },
  { timestamp: '2024-07-28 08:45', velocidade: 95 }, // Excesso
  { timestamp: '2024-07-28 09:00', velocidade: 80 },
  { timestamp: '2024-07-28 09:15', velocidade: 75 },
  { timestamp: '2024-07-28 09:30', velocidade: 110 }, // Excesso
  { timestamp: '2024-07-28 09:45', velocidade: 85 },
];

// Formatar a data/hora para o eixo X
const formatXAxis = (tickItem: string) => {
  // Extrai apenas a hora:minuto
  return tickItem.split(' ')[1] || tickItem;
};

const VelocidadeChart: React.FC = () => {
  return (
    // ResponsiveContainer ajusta o gráfico ao tamanho do container pai
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* Grid para facilitar a leitura */}
        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" /> {/* Cor do grid ajustada */}

        {/* Eixo X (Tempo) */}
        <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            stroke="#CBD5E0" // Cor do texto do eixo
         />

        {/* Eixo Y (Velocidade) */}
        <YAxis label={{ value: 'Velocidade (km/h)', angle: -90, position: 'insideLeft', fill: '#CBD5E0' }} stroke="#CBD5E0" />

        {/* Tooltip que aparece ao passar o mouse */}
        <Tooltip
            contentStyle={{ backgroundColor: '#2D3748', border: 'none', color: '#E2E8F0' }} // Estilo do tooltip
            itemStyle={{ color: '#E2E8F0' }}
        />

        {/* Legenda (se necessário) */}
        {/* <Legend /> */}

        {/* Linha do gráfico */}
        <Line type="monotone" dataKey="velocidade" stroke="#4299E1" activeDot={{ r: 8 }} /> {/* Cor da linha: azul */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VelocidadeChart; 