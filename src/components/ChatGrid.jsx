import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

function StatusRow({ title, statusCode, sessions, messages, colorClass }) {
 
  const [isGrid, setIsGrid] = useState(false); 
  const rowSessions = sessions.filter((session) => session.status === statusCode);

  if (rowSessions.length === 0) return null;

  return (
    <div className="mb-4 bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      
      {/* Cabeçalho da Linha */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-bold flex items-center gap-2 ${colorClass}`}>
          {title}
          <span className="bg-slate-100 text-slate-700 text-xs font-bold py-1 px-2 rounded-full">
            {rowSessions.length}
          </span>
        </h2>
        
        {/* Botão de Alternância (Toggle) */}
        <button
          onClick={() => setIsGrid(!isGrid)}
          className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100"
        >
          {isGrid ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M21 12H3"/><path d="M12 21V3"/></svg>
              Voltar para Slide
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
              Expandir para Grid
            </>
          )}
        </button>
      </div>

      {/* Container de ChatWindows */}
      <div
        className={
          isGrid
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "flex overflow-x-auto gap-4 pb-4 snap-x" // Tailwind para slider com rolagem horizontal
        }
      >
        {rowSessions.map((session) => (
          <div
            key={session.chat_id}
            className={`transition-all duration-300 ${
              isGrid 
                ? "h-[500px]" 
                : "h-[500px] min-w-[320px] max-w-[320px] shrink-0 snap-start"
            }`}
          >
            <ChatWindow session={session} allMessages={messages} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChatGrid({ sessions, messages }) {
  return (

    <div className="flex flex-col gap-2 pb-10">
      

      <StatusRow 
        title="Aguardando Triagem" 
        statusCode={1} 
        sessions={sessions} 
        messages={messages} 
        colorClass="text-amber-600" 
      />
      
      <StatusRow 
        title="Atendimento Humano" 
        statusCode={2} 
        sessions={sessions} 
        messages={messages} 
        colorClass="text-emerald-600" 
      />
      
      <StatusRow 
        title="Em Atendimento (IA)" 
        statusCode={0} 
        sessions={sessions} 
        messages={messages} 
        colorClass="text-blue-600" 
      />
      
      <StatusRow 
        title="Arquivados" 
        statusCode={3} 
        sessions={sessions} 
        messages={messages} 
        colorClass="text-slate-400" 
      />
      
    </div>
  );
}