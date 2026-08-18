import React from 'react';
import { supabase } from '../config/supabase'

export default function TakeoverButton({chatId, text, newStatus}) {
    
    const handleTakeover = async () => {
        const {data, error} = await supabase.from('sessions').update({status: newStatus}).eq('chat_id', chatId).select();

        if (error) { console.log(error); }
    }

    return (
        <button className={`w-full mb-2 ${newStatus == 2 ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-orange-600 hover:bg-orange-700'} text-white text-sm font-semibold py-2 rounded-lg transition-colors`} onClick={handleTakeover}>
            {text}
        </button>
  );
}