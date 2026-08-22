import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TakeoverButton from './TakeoverButton';
import Textbox from './Textbox';
import axios from 'axios'
import { supabase } from '../config/supabase';

export default function ChatWindow({ session, allMessages, onFocus }) {

    const status_codes = {
        AGENTE: 0,
        AGUARDANDO: 1,
        HUMANO: 2,
        ARQUIVADA: 3
    }

    const chatMessages = allMessages.filter(
        (msg) => msg.chat_id === session.chat_id
    ).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    const unreadMessages = chatMessages.filter(
        (msg) => msg.was_read === false && msg.sent_by_me === false
    )

    let first_unread = false;


    // Descer a tela para a mensagem mais recente
    const scrollContainerRef = useRef(null);
    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: scrollContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    const handleClick = async (event) => {

        onFocus(event);
        //marca as mensagens como lidas.
        const { data, error } = await supabase.from('messages').update({ was_read: true }).in('id', unreadMessages.map((val) => val.id));
        if (error) {
            console.error(error);
            return;
        }


    }


    return (
        <div className="flex flex-col bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden h-full" onClick={handleClick}>

            {/* Cabeçalho */}
            <div className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-sm z-10">
                <h2 className="font-semibold text-lg truncate pr-2">{session.name}</h2>
                {unreadMessages.length > 0 && session.status === status_codes.HUMANO &&
                    <span
                        className='text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap animate-pulse bg-blue-500 text-white'
                    >
                        {unreadMessages.length}
                    </span>
                }
            </div>

            {/* Corpo das Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3 mt-auto" ref={scrollContainerRef}>
                {chatMessages.map((msg, index) => {
                    const showUnreadDivider = !first_unread && msg.was_read === false && msg.sent_by_me === false;

                    if (showUnreadDivider) {
                        first_unread = true;
                        return (
                            <React.Fragment key={index}>
                                {/* Divisor de mensagens */}
                                <div className="flex items-center my-4">
                                    <div className="flex-1 border-t border-emerald-600"></div>
                                    <span className="px-3 text-xs font-bold text-emerald-600 bg-slate-50 uppercase tracking-widest rounded-full">
                                        {unreadMessages.length} {unreadMessages.length === 1 ? 'nova mensagem' : 'novas mensagens'}
                                    </span>
                                    <div className="flex-1 border-t border-emerald-600"></div>
                                </div>
                                <MessageBubble message={msg} />
                            </React.Fragment>
                        );
                    }

                    return <MessageBubble key={index} message={msg} />;
                })}
            </div>

            {/* Rodapé: Input e Botões */}
            <div className="p-3 bg-white border-t border-slate-200">
                <TakeoverButton chatId={session.chat_id}
                    text={session.status == status_codes.AGENTE || session.status == status_codes.AGUARDANDO ? "Assumir controle" : "Devolver para IA"}
                    newStatus={session.status == status_codes.AGENTE || session.status == status_codes.AGUARDANDO ? status_codes.HUMANO : status_codes.AGENTE} />


                <Textbox chatId={session.chat_id} disabled={session.status != status_codes.HUMANO} />
            </div>

        </div>
    );
}   