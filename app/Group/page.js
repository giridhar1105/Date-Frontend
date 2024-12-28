'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Header from '../Header/page';

export default function GroupChat() {
    const [messages, setMessages] = useState([
        { id: 1, user: 'Sarah', text: 'Hey everyone! 👋', avatar: '👱‍♀️' },
        { id: 2, user: 'Mike', text: 'Welcome to the group! 🎉', avatar: '👨' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        
        const newMsg = {
            id: Date.now(),
            user: 'You',
            text: newMessage,
            avatar: '😊'
        };
        
        setMessages([...messages, newMsg]);
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
                    <p className="text-sm">12 participants</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400">
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, x: message.user === 'You' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`flex items-start gap-2 mb-4 ${
                                    message.user === 'You' ? 'flex-row-reverse' : ''
                                }`}
                            >
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
                                    {message.avatar}
                                </div>
                                <div
                                    className={`p-3 rounded-lg max-w-[70%] ${
                                        message.user === 'You'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100'
                                    }`}
                                >
                                    <p className="text-xs font-bold mb-1">{message.user}</p>
                                    <p className="text-sm">{message.text}</p>
                                </div>
                            </motion.div>
                        ))}
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
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-purple-600 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"
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