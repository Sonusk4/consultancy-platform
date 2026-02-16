
import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Send, 
  Smile, 
  Paperclip, 
  Phone, 
  Video, 
  Info,
  Circle
} from 'lucide-react';
import { consultants } from '../data/mockData';

const MessagesPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState(consultants[0]);
  const [message, setMessage] = useState('');

  const chatHistory = [
    { id: 1, sender: 'expert', text: 'Hi Rahul! I looked at your GS-IV notes. They are quite detailed.', time: '10:15 AM' },
    { id: 2, sender: 'user', text: 'Thank you Arjun sir! I was worried about the case studies section.', time: '10:20 AM' },
    { id: 3, sender: 'expert', text: 'Don\'t be. We will tackle a few live during our 4:00 PM session today.', time: '10:22 AM' },
    { id: 4, sender: 'user', text: 'Perfect! I have the PDF ready to screen share.', time: '10:25 AM' },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex gap-8 animate-in fade-in duration-500">
      {/* Contact List */}
      <aside className="w-96 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 space-y-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Messages</h2>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search chat..." 
              className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {consultants.map((con) => (
            <button
              key={con.id}
              onClick={() => setSelectedContact(con)}
              className={`w-full flex items-center gap-5 p-6 transition-all border-l-4
                ${selectedContact.id === con.id ? 'bg-indigo-50/50 border-indigo-600' : 'bg-transparent border-transparent hover:bg-slate-50'}`}
            >
              <div className="relative shrink-0">
                <img src={con.image} alt={con.name} className="w-14 h-14 rounded-2xl object-cover shadow-md" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="font-black text-slate-900 truncate tracking-tight">{con.name}</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest shrink-0">10:25 AM</span>
                </div>
                <p className="text-xs text-slate-500 truncate font-medium">Sure, I have the PDF ready for share...</p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 bg-white border border-slate-200 rounded-[2.5rem] flex flex-col shadow-sm overflow-hidden">
        {/* Chat Header */}
        <header className="p-6 lg:px-10 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img src={selectedContact.image} alt={selectedContact.name} className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white" />
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">{selectedContact.name}</h3>
              <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest">
                <Circle className="w-2.5 h-2.5 fill-current" /> Online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"><Phone className="w-6 h-6" /></button>
            <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"><Video className="w-6 h-6" /></button>
            <div className="w-px h-8 bg-slate-100 mx-2"></div>
            <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"><Info className="w-6 h-6" /></button>
          </div>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-10 space-y-10 bg-slate-50/30">
          <div className="flex justify-center">
            <span className="px-6 py-2 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] shadow-sm">Today</span>
          </div>

          {chatHistory.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-2 animate-in slide-in-from-bottom-2`}>
              <div className={`max-w-[70%] px-8 py-5 rounded-[2.5rem] shadow-sm text-sm font-medium leading-relaxed
                ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-100' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest px-2">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-8 border-t border-slate-50">
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 text-slate-400">
              <button className="hover:text-indigo-600 transition-colors"><Smile className="w-6 h-6" /></button>
              <button className="hover:text-indigo-600 transition-colors"><Paperclip className="w-6 h-6" /></button>
            </div>
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..." 
              className="w-full pl-28 pr-20 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold text-sm shadow-inner"
            />
            <button 
              className={`absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-2xl transition-all shadow-xl active:scale-95
                ${message.trim() ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-slate-200 text-slate-400'}`}
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;
