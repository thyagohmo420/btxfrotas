import React, { useState } from 'react';
import { MessageSquareMore, Send } from 'lucide-react';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Olá! Como posso ajudar você com a gestão da sua frota hoje?' }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Adiciona a mensagem do usuário
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);

    // TODO: Implementar chamada para a API de IA aqui
    // - Enviar `input` (ou `newMessages` para contexto)
    // - Receber a resposta da IA
    // - Adicionar a resposta da IA ao estado `messages`:
    //   setMessages(prev => [...prev, { role: 'assistant', content: respostaDaIA }]);

    // Limpa o input
    setInput('');
  };

  return (
    // Adicionado container com fundo azul e texto branco
    <div className="min-h-screen bg-blue-900 text-white p-8 flex flex-col">
      <div className="flex items-center gap-3 mb-6 flex-shrink-0">
        {/* Ajuste na cor do ícone */}
        <MessageSquareMore className="w-8 h-8" />
         {/* Título principal */}
        <h1 className="text-3xl font-bold">Chat IA</h1>
      </div>

      {/* Container do Chat - Fundo e altura ajustados */}
      <div className="flex-1 bg-blue-800 rounded-lg shadow p-6 flex flex-col overflow-hidden">
          {/* Área de Mensagens - Scroll e cores ajustadas */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg shadow ${ // Adicionado shadow
                    message.role === 'user'
                      ? 'bg-blue-600 text-white' // Usuário: fundo azul, texto branco
                      : 'bg-gray-200 text-gray-900' // Assistente: fundo cinza claro, texto escuro
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Formulário de Input - Cores ajustadas */}
          <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t border-blue-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua pergunta sobre a frota..."
              className="flex-1 px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
    </div>
  );
};

export default AIChat;