
import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MoreVertical, Phone, Video, Search, MessageSquare } from 'lucide-react';
import { useConsultantDashboard } from '../hooks/useConsultantDashboard';

const ChatPage: React.FC = () => {
  const { messages, addMessage } = useConsultantDashboard();
  const [activeChat, setActiveChat] = useState(messages[0]);
  const [inputText, setInputText] = useState('');
  const [localHistory, setLocalHistory] = useState<{sender: 'me' | 'them', text: string, time: string}[]>([
    { sender: 'them', text: messages[0]?.lastMessage || '', time: '10:15 AM' }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localHistory]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChat) return;

    const newMessage = {
      sender: 'me' as const,
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setLocalHistory([...localHistory, newMessage]);
    addMessage(activeChat.id, inputText);
    setInputText('');

    // Simulated reply
    setTimeout(() => {
      setLocalHistory(prev => [...prev, {
        sender: 'them',
        text: "Thanks! I'll check that out and get back to you.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-140px)] bg-white rounded-2xl border border-slate-200 overflow-hidden flex shadow-sm">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-100 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              onClick={() => setActiveChat(msg)}
              className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-50 border-l-4 transition-colors ${activeChat?.id === msg.id ? 'bg-indigo-50/50 border-indigo-600' : 'border-transparent'}`}
            >
              <img src={msg.avatar} alt={msg.senderName} className="w-12 h-12 rounded-full border border-white shadow-sm" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <p className="text-sm font-bold text-slate-900 truncate">{msg.senderName}</p>
                  <span className="text-[10px] text-slate-400 font-medium">{msg.timestamp}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{msg.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {activeChat ? (
          <>
            <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={activeChat.avatar} className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{activeChat.senderName}</h3>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><Phone size={18} /></button>
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><Video size={18} /></button>
                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><MoreVertical size={18} /></button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex justify-center">
                <span className="px-3 py-1 bg-slate-200/50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-full">Today</span>
              </div>
              
              {localHistory.map((msg, i) => (
                <div key={i} className={`flex gap-3 max-w-[80%] ${msg.sender === 'me' ? 'ml-auto flex-row-reverse' : ''}`}>
                  {msg.sender === 'them' && <img src={activeChat.avatar} className="w-8 h-8 rounded-full self-end" />}
                  <div className={`p-3 rounded-2xl shadow-sm border ${msg.sender === 'me' ? 'bg-indigo-600 border-indigo-500 text-white rounded-br-none' : 'bg-white border-slate-200 text-slate-700 rounded-bl-none'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-[10px] mt-1.5 font-medium ${msg.sender === 'me' ? 'text-indigo-200' : 'text-slate-400'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button type="button" className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><Paperclip size={20} /></button>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Type a message..." 
                  className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
            <MessageSquare size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
