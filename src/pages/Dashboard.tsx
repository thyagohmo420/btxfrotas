import React from 'react';
import { Car, PenTool as Tool, AlertTriangle, Calendar, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', value: 12 },
  { name: 'Fev', value: 19 },
  { name: 'Mar', value: 15 },
  { name: 'Abr', value: 22 },
  { name: 'Mai', value: 18 },
  { name: 'Jun', value: 25 }
];

function DashboardCard({ icon: Icon, title, value, color }: any) {
  return (
    <div className="bg-blue-700 p-6 rounded-xl shadow-sm text-white">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-blue-200 text-sm">{title}</h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-blue-200">Última atualização: há 5 minutos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          icon={Car}
          title="Total de Veículos"
          value="48"
          color="bg-blue-500"
        />
        <DashboardCard
          icon={Tool}
          title="Em Manutenção"
          value="5"
          color="bg-orange-500"
        />
        <DashboardCard
          icon={AlertTriangle}
          title="Alertas Pendentes"
          value="3"
          color="bg-red-500"
        />
        <DashboardCard
          icon={Users}
          title="Motoristas Ativos"
          value="32"
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-700 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-white">Uso da Frota</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
              <XAxis dataKey="name" stroke="#D1D5DB" />
              <YAxis stroke="#D1D5DB" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                itemStyle={{ color: '#E5E7EB' }}
                cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
              />
              <Bar dataKey="value" fill="#60A5FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-blue-700 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-white">Próximos Vencimentos</h2>
          <div className="space-y-4">
            {[
              { icon: Calendar, text: 'IPVA - Fiat Toro (ABC-1234)', date: '15/04/2024' },
              { icon: Clock, text: 'Licenciamento - VW Gol (XYZ-5678)', date: '22/04/2024' },
              { icon: AlertTriangle, text: 'Seguro - Toyota Hilux (DEF-9012)', date: '30/04/2024' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-blue-600 rounded-lg">
                <item.icon className="w-5 h-5 text-blue-300" />
                <span className="flex-1 text-white">{item.text}</span>
                <span className="text-blue-200">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-700 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-white">Status da Frota</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: CheckCircle, text: 'Em Operação', value: '38', color: 'text-green-400' },
            { icon: Tool, text: 'Em Manutenção', value: '5', color: 'text-orange-400' },
            { icon: AlertTriangle, text: 'Inativos', value: '5', color: 'text-red-400' }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-blue-600 rounded-lg">
              <item.icon className={`w-8 h-8 ${item.color}`} />
              <div>
                <p className="text-blue-200">{item.text}</p>
                <p className="text-2xl font-semibold text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;