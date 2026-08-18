import React from 'react';
import ChatWindow from './ChatWindow';

export default function ChatGrid({ sessions, messages }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[80vh]">
      {sessions.sort((a, b) => (b.status === 1) - (a.status === 1) ).map((session) => (
        <ChatWindow 
          key={session.chat_id} 
          session={session} 
          allMessages={messages} 
        />
      ))}
    </div>
  );
}