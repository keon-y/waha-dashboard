import { supabase } from './config/supabase';
import { useState } from 'react'
import { useRealtime } from './hooks/useRealtime'

function App() {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);

  useRealtime(setSessions, 'sessions');
  useRealtime(setMessages, 'messages');

  
  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans">
      
      {/* Título do Dashboard */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Painel de Atendimento</h1>
      </header>

      {/* 
        O GRID: 
        - Telas pequenas (celular): 1 coluna
        - Telas médias (tablet): 2 colunas
        - Telas grandes (monitor): 4 colunas 
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[80vh]">
        
        {
          // Ordenar de forma que os status maiores fiquem na frente
          sessions.sort((a, b) => {return b.status - a.status}).map((session) => (
          // Cartão de cada sessão
          <div key={session.chat_id} className="flex flex-col bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            
            {/* Cabeçalho da Sessão */}
            <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-sm z-10">
              <h2 className="font-semibold text-lg truncate pr-2">{session.name}</h2>

            

              {
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${
                session.status_message ? 'bg-green-500 text-white' : 
                'invisible'}`}>
                {session.status_message}
              </span>

              }
            </div>

            {/* Área de Mensagens (com scroll) */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
              {messages
                .filter((msg) => msg.chat_id === session.chat_id) // Puxa só as mensagens desse chat
                .map((msg, index) => (
                  <div
                    key={index}
                    // A lógica do sent_by_me define a cor e o lado (esquerda ou direita)
                    className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm ${
                      msg.sent_by_me
                        ? 'bg-emerald-100 text-emerald-900 self-end rounded-br-none' // Minhas mensagens (direita/verde)
                        : 'bg-white border border-slate-200 text-slate-700 self-start rounded-bl-none' // Mensagens do cliente (esquerda/branco)
                    }`}
                  >
                    {msg.content}
                  </div>
                ))}
            </div>

            {/* Rodapé (Caixa de digitar - estática por enquanto) */}
            <div className="p-3 bg-white border-t border-slate-200">
              <input 
                type="text" 
                placeholder="Responda aqui..." 
                className="w-full bg-slate-100 border border-transparent focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 text-sm outline-none transition-all"
              />
            </div>
            
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default App