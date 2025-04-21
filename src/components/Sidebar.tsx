import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  PenTool as Tool, 
  FileText, 
  FileBarChart, 
  MapPin, 
  MessageSquareMore, 
  LogOut,
  Activity, 
  Fuel,
  BarChartHorizontal,
  Video,
  ClipboardCheck,
  CircleDot,
  DollarSign,
  UserCheck
} from 'lucide-react';

function Sidebar() {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Car, label: 'Veículos', path: '/vehicles' },
    { icon: Users, label: 'Motoristas', path: '/drivers' },
    { icon: Tool, label: 'Manutenção', path: '/maintenance' },
    { icon: Fuel, label: 'Abastecimento', path: '/abastecimento' },
    { icon: BarChartHorizontal, label: 'Telemetria', path: '/telemetria' },
    { icon: Video, label: 'Videotelemetria', path: '/videotelemetria' },
    { icon: ClipboardCheck, label: 'Checklist', path: '/checklist' },
    { icon: CircleDot, label: 'Pneus', path: '/pneus' },
    { icon: DollarSign, label: 'TCO / Despesas', path: '/tco' },
    { icon: Activity, label: 'Analytics', path: '/analytics' },
    { icon: UserCheck, label: 'Assistente Condução', path: '/assistente-conducao' },
    { icon: FileText, label: 'Documentos', path: '/documents' },
    { icon: FileBarChart, label: 'Relatórios', path: '/reports' },
    { icon: MapPin, label: 'Rastreamento', path: '/tracking' },
    { icon: MessageSquareMore, label: 'Chat IA', path: '/ai-chat' },
    { icon: LogOut, label: 'Sair', path: '#logout' }
  ];

  const handleLogout = () => {
    console.log("Logout clicked - Implementar lógica de logout");
    // Adicionar lógica de logout aqui
  };

  return (
    <div className="w-64 bg-blue-700 text-white p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Car className="w-8 h-8" />
        <h1 className="text-2xl font-bold">BTx Frotas</h1>
      </div>
      
      <nav className="flex-1 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          if (item.path === '#logout') {
            return (
              <button
                key={item.path}
                onClick={handleLogout}
                className='flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-blue-100 hover:bg-blue-600'
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            )
          } else {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-800 text-white' 
                      : 'text-blue-100 hover:bg-blue-600'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            )
          }
        })}
      </nav>
    </div>
  );
}

export default Sidebar;