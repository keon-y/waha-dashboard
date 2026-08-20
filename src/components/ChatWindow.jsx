import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import TakeoverButton from './TakeoverButton';
import Textbox from './Textbox';
import axios from 'axios'

export default function ChatWindow({ session, allMessages }) {

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
                <TakeoverButton chatId = { session.chat_id } 
                    text = { session.status == status_codes.AGENTE ? "Assumir controle" : "Devolver para IA"} 
                    newStatus = { session.status == status_codes.AGENTE ? status_codes.HUMANO : status_codes.AGENTE}/>
                
                
                <Textbox chatId={session.chat_id} disabled={session.status != status_codes.HUMANO}/>
            </div>

        </div>
    );
}   