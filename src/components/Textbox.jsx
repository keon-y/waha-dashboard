import React, { useState} from 'react';
import { supabase } from '../config/supabase'
import axios from 'axios';

export default function Textbox({chatId, disabled}) {
    
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setTyping] = useState(false);


    // Precisa digitar antes de enviar mensagens na API do Whatsapp, se não a conta é temporariamente suspensa 
    const handleChange = async (event) => {
        let newValue = event.target.value;
        setInputValue(newValue);

        try {
            if (!isTyping && newValue) { 
                const response = await axios.post("http://localhost:3000/api/startTyping", {
                    "chatId": chatId,
                    "session": "default"
                });
                setTyping(true);
            }
            else if (!newValue && isTyping) { 
                const response = await axios.post("http://localhost:3000/api/stopTyping", {
                    "chatId": chatId,
                    "session": "default"
                });
                setTyping(false);
            }
        }
        catch (error) {
            console.error(error);
            setTyping(false); // caso já esteja digitando e deu erro
        }

    }

    const handleSendMessage = async () => {
        const message = inputValue;
        if (message.trim() !== '') {
            try {

                setInputValue('');

                const response = await axios.post("http://localhost:3000/api/sendText", {
                    "session": "default",
                    "chatId": chatId,
                    "text": message
                })
                .then( async () => {
                    const {data, error} = await supabase.from("messages").insert({
                        content: message,
                        chat_id: chatId,
                        sent_by_me: true,
                        was_read: true
                    });

                });
            } 
            catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="flex gap-2 items-center">
            <input
                type="text"
                placeholder="Digite sua resposta..."
                disabled={disabled}
                onChange={handleChange}
                value={inputValue}
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
  );
}