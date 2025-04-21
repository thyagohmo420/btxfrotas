import React from 'react';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importar L para corrigir ícone
// Importar CSS do Leaflet (se não estiver globalmente)
// import 'leaflet/dist/leaflet.css';

// Corrigir problema do ícone padrão do Leaflet com Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Tracking = () => {
  // Definir tipo para a posição
  type VehiclePosition = [number, number]; 

  // Dados de exemplo para veículos no mapa
  const vehicles = [
    { id: 1, plate: 'ABC-1234', model: 'Fiat Toro', position: [-23.5505, -46.6333] as VehiclePosition, status: 'Online' },
    { id: 2, plate: 'XYZ-5678', model: 'VW Gol', position: [-23.5605, -46.6433] as VehiclePosition, status: 'Online' },
    { id: 3, plate: 'DEF-9012', model: 'Toyota Hilux', position: [-23.5705, -46.6533] as VehiclePosition, status: 'Offline' }
  ];

  const center: L.LatLngExpression = [-23.56, -46.64]; // Coordenada central (ex: São Paulo)

  return (
    <div className="text-white"> {/* Garante texto branco padrão */}
      <div className="flex items-center gap-3 mb-6">
        <MapPin className="w-6 h-6 text-blue-300" />
        <h1 className="text-2xl font-semibold text-white">Rastreamento em Tempo Real</h1>
      </div>

      {/* Container do Mapa e Lista Lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Mapa */}
         <div className="lg:col-span-3 bg-blue-800 rounded-lg shadow p-4">
           {/* Container do mapa precisa de altura definida */}
           <div className="h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
             <MapContainer
               center={center}
               zoom={13}
               style={{ height: '100%', width: '100%' }}
               className="z-0" // Garantir que não sobreponha outros elementos
             >
               <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               />
               {vehicles.map((vehicle) => (
                 <Marker key={vehicle.id} position={L.latLng(vehicle.position[0], vehicle.position[1])}>
                   <Popup>
                      {/* Estilo do Popup para fundo escuro */}
                     <div className="p-1 rounded shadow-lg bg-gray-900 text-white border border-gray-700">
                       <p className="font-medium text-sm">{vehicle.model} ({vehicle.plate})</p>
                       <p className={`text-xs ${vehicle.status === 'Online' ? 'text-green-400' : 'text-red-400'}`}>{vehicle.status}</p>
                     </div>
                   </Popup>
                 </Marker>
               ))}
             </MapContainer>
           </div>
         </div>

         {/* Lista de Veículos */}
         <div className="lg:col-span-1 bg-blue-700 rounded-lg shadow p-6 self-start">
           <h2 className="text-lg font-semibold text-white mb-4">Veículos Monitorados</h2>
           <div className="space-y-3 max-h-[550px] overflow-y-auto pr-2"> 
             {vehicles.map((vehicle) => (
               <div key={vehicle.id} className="flex items-center gap-3 p-3 bg-blue-800 rounded-lg">
                 <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${vehicle.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                 <div>
                   <p className="font-medium text-sm text-white">{vehicle.model}</p>
                   <p className="text-xs text-blue-200">{vehicle.plate}</p>
                 </div>
                 <div className="flex-1 text-right">
                   <p className={`text-xs ${vehicle.status === 'Online' ? 'text-green-400' : 'text-red-400'}`}>{vehicle.status}</p>
                 </div>
               </div>
             ))}
              {vehicles.length === 0 && (
                  <p className="text-blue-200 text-sm">Nenhum veículo sendo rastreado.</p>
             )}
           </div>
         </div>
      </div>
    </div>
  );
};

export default Tracking;