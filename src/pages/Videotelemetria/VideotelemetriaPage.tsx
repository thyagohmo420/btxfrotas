import React from 'react';
import VideoUploadForm from './VideoUploadForm';
import VideoList from './VideoList';

const VideotelemetriaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Videotelemetria</h1>

      {/* Formulário de Upload */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Upload de Vídeo de Evento Crítico</h2>
         <VideoUploadForm /> {/* Descomentado */}
      </div>

      {/* Listagem de Vídeos */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Vídeos Registrados</h2>
         <VideoList /> {/* Descomentado */}
      </div>
    </div>
  );
};

export default VideotelemetriaPage; 