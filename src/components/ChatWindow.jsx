import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import TakeoverButton from './TakeoverButton';

export default function ChatWindow({ session, allMessages }) {

    const [inputValue, setInputValue] = useState("");

    const handleSendMessage = () => {

    }

    const status_codes = {
        AGENTE: 0,
        AGUARDANDO: 1,
        HUMANO: 2
    }

    const chatMessages = allMessages.filter(
        (msg) => msg.chat_id === session.chat_id
    );

    return (
        <div className="flex flex-col bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden h-full">

            {/* Cabeçalho */}
            <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-sm z-10">
                <h2 className="font-semibold text-lg truncate pr-2">{session.name}</h2>

                <span
                    className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${session.status == status_codes.HUMANO
                            ? 'bg-emerald-500 text-white'
                            : session.status == status_codes.AGUARDANDO
                                ? 'bg-amber-400 text-slate-900 animate-pulse'
                                : 'bg-blue-500 text-white'
                        }`}
                >
                    {session.status_message ? session.status_message : "IA"}
                </span>
            </div>

            {/* Corpo das Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
                {chatMessages.map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))}
            </div>

            {/* Rodapé: Input e Botões */}
            <div className="p-3 bg-white border-t border-slate-200">
                {/* Botão de Takeover (aparece se a IA estiver no controle) */}
                
                <TakeoverButton chatId = { session.chat_id } 
                    text = { session.status == status_codes.AGENTE ? "Assumir controle" : "Devolver para IA"} 
                    newStatus = { session.status == status_codes.AGENTE ? status_codes.HUMANO : status_codes.AGENTE}/>
                
                
                <div className="flex gap-2 items-center">
                    <input
                    type="text"
                    placeholder="Digite sua resposta..."
                    disabled={session.status != status_codes.HUMANO}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-slate-100 border border-transparent focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg px-3 py-2 text-sm outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {inputValue.trim() !== '' && (
                        <button
                        onClick={handleSendMessage}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm animate-fade-in-right">
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="18" 
                            height="18" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="m22 2-7 20-4-9-9-4Z"/>
                            <path d="M22 2 11 13"/>
                        </svg>
                        </button> 
                    )}

                </div>
                
            </div>

        </div>
    );
}   