import React, {useState} from 'react'
import { UserAuth } from '../context/AuthContext'
import { useRealtime } from '../hooks/useRealtime'
import ChatGrid from '../components/ChatGrid'

const Dashboard = () => {

    const [sessions, setSessions] = useState([]);
    const [messages, setMessages] = useState([]);
    
      useRealtime(setSessions, 'sessions');
      useRealtime(setMessages, 'messages');
    
      
      return (
        <div className="min-h-screen bg-slate-100 p-4 font-sans">
            <header className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Central de Comando</h1>
                <div className="text-sm text-slate-500">
                Sessões ativas: {sessions.length}
                </div>
            </header>

            <ChatGrid sessions={sessions} messages={messages} />
        </div>
      );
    }

export default Dashboard
