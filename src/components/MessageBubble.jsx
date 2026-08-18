import React from 'react';

export default function MessageBubble({ message }) {
  const isMine = message.sent_by_me;

  return (
    <div
      className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm ${
        isMine
          ? 'bg-emerald-100 text-emerald-900 self-end rounded-br-none'
          : 'bg-white border border-slate-200 text-slate-700 self-start rounded-bl-none'
      }`}
    >
      {message.content}
    </div>
  );
}