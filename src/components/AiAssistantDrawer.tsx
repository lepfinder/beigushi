import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, BookOpen, Lightbulb } from 'lucide-react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: '你好！我是你的【AI诗词学霸小助手】。无论你想了解古诗背景故事、诗人生平、押韵技巧，还是想让小助手推荐学习名篇，都可以问我哦！'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: '综合语文与古诗词答疑',
          author: 'AI国学名师',
          content: '古诗词学习、背诵方法与文学常识解答',
          question: query
        })
      });

      const data = await res.json();
      if (res.ok && data.text) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.text }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: `抱歉，${data.error || '无法获得AI回答'}` }]);
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { sender: 'ai', text: '网络连线失败，请检查设置中的 Gemini API Key。' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-[#FAF9F6] border-l border-[#E5E2D9] h-full shadow-2xl flex flex-col relative text-[#2C2C2C]">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-[#FAF9F6] border-b border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8B4513] text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-serif text-[#2C2C2C] tracking-tight">
                AI 诗词学霸小助手
              </h3>
              <p className="text-[10px] text-gray-500 font-sans uppercase tracking-widest">智能解诗 · 生平故事 · 辅导答疑</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-[#2C2C2C] hover:bg-[#F5F2EA] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompt Recommendations */}
        <div className="p-4 bg-[#F5F2EA] border-b border-[#E5E2D9] text-xs space-y-2">
          <span className="font-bold text-[#8B4513] uppercase tracking-wider flex items-center gap-1.5 text-[10px]">
            <Lightbulb className="w-3.5 h-3.5 text-[#8B4513]" />
            热门大家都在问:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleSend('唐诗和宋词有什么主要区别？')}
              className="px-3 py-1 bg-white hover:bg-[#FAF9F6] text-[#2C2C2C] rounded-full border border-[#E5E2D9] text-left truncate text-xs font-medium transition-colors"
            >
              💡 唐诗和宋词的区别？
            </button>
            <button
              onClick={() => handleSend('怎样背古诗背得快又不容易忘？')}
              className="px-3 py-1 bg-white hover:bg-[#FAF9F6] text-[#2C2C2C] rounded-full border border-[#E5E2D9] text-left truncate text-xs font-medium transition-colors"
            >
              🧠 背古诗的高效记忆技巧
            </button>
            <button
              onClick={() => handleSend('推荐5首关于春天的适合小学生背诵的名诗')}
              className="px-3 py-1 bg-white hover:bg-[#FAF9F6] text-[#2C2C2C] rounded-full border border-[#E5E2D9] text-left truncate text-xs font-medium transition-colors"
            >
              🌸 描写春天的5首经典名句
            </button>
          </div>
        </div>

        {/* Message Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-[#8B4513] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-3.5 rounded-lg leading-relaxed font-serif whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-[#8B4513] text-white font-sans'
                    : 'bg-white border border-[#F0EDE6] text-[#2C2C2C] shadow-2xs'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-[#2C2C2C] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#8B4513] italic font-serif">
              <Sparkles className="w-4 h-4 animate-spin text-[#8B4513]" />
              AI名师正在斟酌回答中...
            </div>
          )}
        </div>

        {/* Bottom Input Area */}
        <div className="p-4 bg-[#FAF9F6] border-t border-[#E5E2D9] flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="输入古诗疑问、背诵难题、文学常识..."
            className="flex-1 px-4 py-2 text-xs sm:text-sm bg-white border border-[#E5E2D9] rounded-full text-[#2C2C2C] focus:outline-none focus:border-[#8B4513]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="p-2.5 bg-[#8B4513] hover:bg-[#72380f] text-white rounded-full disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
