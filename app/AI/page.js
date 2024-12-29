'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '../Header/page';

export default function AIChat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { text: input, type: 'user' }]);

            // Make request to backend API
            try {
                const timestamp = new Date().toISOString();
                const response = await fetch('http://localhost:5000/gemini-1.5-flash', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ input, timestamp }),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setMessages(prev => [
                        ...prev,
                        { text: data.aiResponse, type: 'ai' }
                    ]);
                } else {
                    console.error('Error from server:', response.statusText);
                }
            } catch (error) {
                console.error('Error in request:', error);
            }

            setInput('');
        }
    };

    return (
        <div>
            <Header />
            <div className="min-h-screen p-4"
                style={{
                    background: 'linear-gradient(45deg, #6b46c1, #ec4899, #fb923c)',
                    animation: 'gradientAnimation 15s ease infinite',
                }}>
                <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl 
                            shadow-xl overflow-hidden border border-white/20">
                    <div className="h-[600px] overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div key={index}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-4 rounded-2xl ${
                                    message.type === 'user'
                                        ? 'bg-purple-500 text-white ml-auto animate-slideLeft'
                                        : 'bg-white/20 backdrop-blur animate-slideRight'
                                    }`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 border-t border-white/20">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-white/10 backdrop-blur rounded-xl px-4 py-2 
                                           text-white placeholder-white/50 focus:outline-none 
                                           focus:ring-2 focus:ring-purple-500 transition-all"
                                placeholder="Type your message..."
                            />
                            <button
                                type="submit"
                                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 
                                           rounded-xl transition-all transform hover:scale-105 
                                           active:scale-95"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
