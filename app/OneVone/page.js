'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function OneVoneChat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeUser, setActiveUser] = useState(null); // Track the active user

    const user1 = {
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=John',
        status: 'online'
    };

    const user2 = {
        name: 'Jane Smith',
        avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=Jane',
        status: 'online'
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, {
                id: Date.now(),
                text: newMessage,
                sender: activeUser === user1 ? 'user1' : 'user2', // Determine sender based on active user
                timestamp: new Date().toLocaleTimeString()
            }]);
            setNewMessage('');
        }
    };

    const handleSelectUser = (user) => {
        setActiveUser(user);
        // Clear messages when switching users (optional)
        setMessages([]);
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
            {/* Left Sidebar - Profiles */}
            <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-1/4 bg-white p-4 shadow-lg rounded-l-xl"
            >
                <h2 className="text-2xl font-bold mb-4 text-purple-600">Contacts</h2>
                <div className="space-y-4">
                    {[user1, user2].map((user) => (
                        <div
                            key={user.name}
                            className="flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg cursor-pointer"
                            onClick={() => handleSelectUser(user)} // Set active user on click
                        >
                            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-green-500">{user.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Center - Active Profile and Chat */}
            <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-1/4 bg-white p-4 border-x border-gray-200"
            >
                {activeUser && (
                    <div className="text-center">
                        <img src={activeUser.avatar} alt={activeUser.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-purple-600">{activeUser.name}</h2>
                        <p className="text-green-500">Active Now</p>
                        <div className="mt-4 space-y-2">
                            <p className="text-gray-600">Member since 2023</p>
                            <p className="text-gray-600">Last seen: Just now</p>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Right - Chat Area */}
            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-2/4 bg-white p-4 flex flex-col rounded-r-xl"
            >
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {activeUser && messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.sender === 'user1' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] p-3 rounded-lg ${
                                message.sender === 'user1' ? 'bg-purple-600 text-white' : 'bg-gray-200'
                            }`}>
                                <p>{message.text}</p>
                                <span className="text-xs opacity-70">{message.timestamp}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {/* Message Input Section */}
                {activeUser && (
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                            placeholder="Type your message..."
                        />
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Send
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
