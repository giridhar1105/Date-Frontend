'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Header from '../Header/page';

export default function GroupChat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [onlineCount, setOnlineCount] = useState(0);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:5000');

        socketRef.current.emit('join', {
            userId: 1,
            username: 'You',
            avatar: '😊'
        });

        socketRef.current.on('previous-messages', (previousMessages) => {
            setMessages(previousMessages);
        });

        socketRef.current.on('new-message', (message) => {
            setMessages(prev => [...prev, message]);
        });

        socketRef.current.on('user-joined', ({ systemMessage, onlineCount }) => {
            setMessages(prev => [...prev, { id: Date.now(), text: systemMessage, isSystem: true }]);
            setOnlineCount(onlineCount);
        });

        socketRef.current.on('user-left', ({ systemMessage, onlineCount }) => {
            setMessages(prev => [...prev, { id: Date.now(), text: systemMessage, isSystem: true }]);
            setOnlineCount(onlineCount);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        socketRef.current.emit('send-message', {
            userId: 1,
            username: 'You',
            text: newMessage,
            avatar: '😊'
        });

        setNewMessage('');
    };

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-100">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-screen flex flex-col"
                >
                    <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-4 text-white">
                        <h1 className="text-xl font-bold">Group Chat</h1>
                        <p className="text-sm">{onlineCount} participants online</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400">
                        <AnimatePresence>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, x: message.username === 'You' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`flex items-start gap-2 mb-4 ${
                                        message.isSystem 
                                            ? 'justify-center' 
                                            : message.username === 'You' 
                                                ? 'flex-row-reverse' 
                                                : ''
                                    }`}
                                >
                                    {!message.isSystem && (
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white">
                                            {message.avatar}
                                        </div>
                                    )}
                                    <div
                                        className={`p-3 rounded-lg ${
                                            message.isSystem
                                                ? 'bg-gray-200 text-gray-600 text-sm italic'
                                                : message.username === 'You'
                                                    ? 'bg-purple-600 text-white max-w-[70%]'
                                                    : 'bg-white text-black max-w-[70%]'
                                        }`}
                                    >
                                        {!message.isSystem && (
                                            <p className="text-xs font-bold mb-1">{message.username}</p>
                                        )}
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </AnimatePresence>
                    </div>

                    <form onSubmit={sendMessage} className="p-4 border-t bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
                        <div className="flex gap-2">
                            <motion.input
                                whileFocus={{ scale: 1.01 }}
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-purple-600 text-black bg-white"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                            >
                                Send
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}