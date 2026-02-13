import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I can help analyze your market data deeper. Ask me anything about competitors or pricing.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const reply = await sendChatMessage(history, userMsg);
      if (reply) {
        setMessages(prev => [...prev, { role: 'model', text: reply }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="print:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 p-4 rounded-full shadow-2xl transition-all duration-300 z-50 hover:scale-105 active:scale-95 border border-white/10 ${
          isOpen 
            ? 'bg-slate-800 text-white rotate-90' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-600/30'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-80 md:w-96 h-[600px] max-h-[80vh] bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden animate-fade-in-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-5 border-b border-white/5 flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shrink-0 shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f172a]"></div>
            </div>
            <div>
              <h3 className="font-bold text-white tracking-tight">Market Assistant</h3>
              <div className="flex items-center gap-1.5">
                 <Sparkles className="w-3 h-3 text-blue-400" />
                 <p className="text-[10px] text-blue-200 font-medium uppercase tracking-wider">Gemini Live</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-sm'
                      : 'bg-slate-800/80 border border-white/5 text-slate-200 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center shrink-0 mt-1">
                   <Bot className="w-4 h-4 text-blue-400" />
                </div>
                <div className="bg-slate-800/80 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-[#020617]/50 border-t border-white/5 backdrop-blur-sm">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-slate-900/80 border border-white/10 rounded-2xl pl-5 pr-12 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder-slate-500 shadow-inner"
                placeholder="Ask follow-up questions..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="absolute right-2 top-2 p-2 rounded-xl bg-blue-600 text-white disabled:opacity-50 disabled:bg-slate-700 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;