import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import Maintenance from './pages/Maintenance';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Tracking from './pages/Tracking';
import AIChat from './pages/AIChat';
import Analytics from './pages/Analytics';
import AbastecimentoPage from './pages/Abastecimento/AbastecimentoPage';
import TelemetriaPage from './pages/Telemetria/TelemetriaPage';
import VideotelemetriaPage from './pages/Videotelemetria/VideotelemetriaPage';
import ChecklistPage from './pages/Checklist/ChecklistPage';
import PneusPage from './pages/Pneus/PneusPage';
import TCOPage from './pages/TCO/TCOPage';
import DrivingAssistant from './pages/DrivingAssistant';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-blue-900">
        <Sidebar />
        <div className="flex-1 overflow-auto bg-blue-900 text-white min-h-screen p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/abastecimento" element={<AbastecimentoPage />} />
            <Route path="/telemetria" element={<TelemetriaPage />} />
            <Route path="/videotelemetria" element={<VideotelemetriaPage />} />
            <Route path="/checklist" element={<ChecklistPage />} />
            <Route path="/pneus" element={<PneusPage />} />
            <Route path="/tco" element={<TCOPage />} />
            <Route path="/assistente-conducao" element={<DrivingAssistant />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App