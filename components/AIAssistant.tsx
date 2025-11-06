import React, { useState, useRef, useEffect } from 'react';
import Icon from './Icon';
import { getAnalyticsResponse } from '../services/geminiService';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface AIAssistantProps {
  analyticsType: string;
  suggestedPrompts: string[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ analyticsType, suggestedPrompts }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  // Reset chat when analyticsType changes
  useEffect(() => {
    setMessages([]);
  }, [analyticsType]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    const aiResponseText = await getAnalyticsResponse(currentInput);
    const aiMessage: Message = { sender: 'ai', text: aiResponseText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };
  
  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
  }

  if (isClosed) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-full max-h-[calc(100vh-250px)]">
      <header className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
            <div className="bg-blue-500 p-1 rounded-md mr-2"><Icon name="code" /></div>
            <div>
                <h3 className="font-semibold text-gray-800">AI Assistant</h3>
                <p className="text-xs text-gray-500">Ask questions about claims, trends and insights</p>
            </div>
            <span className="ml-2 text-xs bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded-full">{analyticsType}</span>
        </div>
        <button onClick={() => setIsClosed(true)} className="text-gray-400 hover:text-gray-600">
            <Icon name="close" />
        </button>
      </header>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isLoading && (
            <div className="space-y-2">
                {suggestedPrompts.map((prompt, i) => (
                    <button key={i} onClick={() => handleSuggestionClick(prompt)}
                    className="w-full text-left text-sm p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 text-gray-700 flex items-center">
                        <span className="text-blue-500 mr-2">✨</span>
                        {prompt}
                    </button>
                ))}
            </div>
        )}

        {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0 text-sm">AI</div>}
                <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
            </div>
        ))}

        {isLoading && (
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0 text-sm">AI</div>
                <div className="max-w-xl p-3 rounded-lg bg-gray-100 text-gray-800">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="relative">
            <div className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5 absolute -top-2.5 left-2.5">Searching in: <span className="font-semibold">{analyticsType}</span></div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask about ${analyticsType}...`}
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isLoading}
            />
            <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400" disabled={isLoading}>
                <Icon name="send"/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
