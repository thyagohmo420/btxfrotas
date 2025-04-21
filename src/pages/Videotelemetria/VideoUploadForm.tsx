import React, { useState, useCallback } from 'react';
// Poderíamos usar react-dropzone para uma melhor UX de upload
// import { useDropzone } from 'react-dropzone';

interface VideoFormData {
  veiculoId: string;
  timestamp: string; // Data e Hora do evento
  eventType: 'frenagem' | 'aceleracao' | 'curva_perigosa' | 'distracao' | ''; // Tipos de eventos críticos
  videoFile: File | null;
}

const VideoUploadForm: React.FC = () => {
  const [formData, setFormData] = useState<VideoFormData>({
    veiculoId: '',
    timestamp: '',
    eventType: '',
    videoFile: null,
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, videoFile: e.target.files![0] }));
      setError(null); // Limpa erro ao selecionar novo arquivo
      setSuccess(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
     setError(null);
     setSuccess(null);
  };

   const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      timestamp: e.target.value,
    }));
    setError(null);
    setSuccess(null);
   }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.videoFile) {
      setError("Por favor, selecione um arquivo de vídeo.");
      return;
    }
     if (!formData.veiculoId || !formData.timestamp || !formData.eventType) {
        setError("Por favor, preencha todos os campos obrigatórios.");
        return;
    }


    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      // TODO: Implementar lógica de upload para Supabase Storage
      // 1. Fazer upload do formData.videoFile para o Supabase Storage
      //    - Gerar um nome único para o arquivo (ex: veiculoId_timestamp_evento.mp4)
      //    - Obter a URL pública ou o path do arquivo no Storage
      // 2. Inserir os metadados (veiculoId, timestamp, eventType, url_video) na tabela 'videotelemetria' do Supabase
      console.log('Enviando vídeo e dados:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula upload
      console.log('Upload concluído (simulado).');
      setSuccess(`Vídeo para ${formData.veiculoId} em ${formData.timestamp} enviado com sucesso!`);
      // Limpar formulário opcionalmente após sucesso
       setFormData({ veiculoId: '', timestamp: '', eventType: '', videoFile: null });
       // Resetar input file (requer manipulação do DOM ou uso de key)
       const fileInput = document.getElementById('videoFile') as HTMLInputElement;
       if (fileInput) fileInput.value = '';


    } catch (err) {
      console.error("Erro no upload:", err);
      setError("Falha no upload do vídeo. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-blue-800 p-6 rounded-lg">

       {error && <p className="text-red-400 bg-red-900 p-3 rounded">{error}</p>}
       {success && <p className="text-green-300 bg-green-900 p-3 rounded">{success}</p>}


      {/* Seleção de Veículo */}
      <div>
        <label htmlFor="veiculoId" className="block text-sm font-medium mb-1">Veículo *</label>
        <select
          id="veiculoId"
          name="veiculoId"
          value={formData.veiculoId}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          disabled={uploading}
        >
          <option value="">Selecione um veículo</option>
          {/* TODO: Carregar veículos do Supabase */}
          <option value="veiculo1">Veículo 1 (Exemplo)</option>
          <option value="veiculo2">Veículo 2 (Exemplo)</option>
        </select>
      </div>

      {/* Data e Hora do Evento */}
      <div>
        <label htmlFor="timestamp" className="block text-sm font-medium mb-1">Data e Hora do Evento *</label>
        <input
          type="datetime-local"
          id="timestamp"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleTimestampChange}
          required
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          disabled={uploading}
        />
      </div>

      {/* Tipo de Evento Crítico */}
       <div>
        <label htmlFor="eventType" className="block text-sm font-medium mb-1">Tipo de Evento Crítico *</label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
           disabled={uploading}
        >
          <option value="">Selecione o tipo</option>
          <option value="frenagem">Frenagem Brusca</option>
          <option value="aceleracao">Aceleração Brusca</option>
          <option value="curva_perigosa">Curva Perigosa</option>
          <option value="distracao">Distração</option>
           {/* Adicionar outros tipos conforme necessário */}
        </select>
      </div>

       {/* Input de Arquivo de Vídeo */}
        <div>
            <label htmlFor="videoFile" className="block text-sm font-medium mb-1">Arquivo de Vídeo *</label>
            <input
                type="file"
                id="videoFile"
                name="videoFile"
                accept="video/*" // Aceita qualquer formato de vídeo
                onChange={handleFileChange}
                required
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 disabled:opacity-50"
                 disabled={uploading}
            />
             {formData.videoFile && <p className="text-xs mt-1 text-gray-300">Selecionado: {formData.videoFile.name}</p>}
        </div>


      <button
        type="submit"
        className={`w-full text-white font-bold py-2 px-4 rounded transition duration-300 ${uploading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        disabled={uploading}
      >
        {uploading ? 'Enviando...' : 'Enviar Vídeo'}
      </button>
    </form>
  );
};

export default VideoUploadForm; 