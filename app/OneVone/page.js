'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import Header from '../Header/page';

export default function OneVoneChat() {
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeUser, setActiveUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Get current user from localStorage (set during signup/login)
        const userStr = localStorage.getItem('currentUser');
        if (userStr) {
            const user = JSON.parse(userStr);
            setCurrentUser(user);
            
            // Initialize socket
            socketRef.current = io('http://localhost:5000');
            socketRef.current.emit('user-login', user.id);

            // Listen for new messages
            socketRef.current.on('new-private-message', (message) => {
                setMessages(prev => [...prev, message]);
            });

            // Listen for user status changes
            socketRef.current.on('user-status-change', ({ userId, isOnline, lastSeen }) => {
                setUsers(prev => prev.map(user => {
                    if (user.id === userId) {
                        return { ...user, isOnline, lastSeen };
                    }
                    return user;
                }));
            });

            // Fetch users
            fetchUsers();
        }

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/users');
            const data = await response.json();
            setUsers(data.filter(user => user.id !== currentUser.id));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchMessages = async (otherUser) => {
        try {
            const response = await fetch(`http://localhost:5000/messages/${currentUser.id}/${otherUser.id}`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSelectUser = async (user) => {
        setActiveUser(user);
        await fetchMessages(user);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeUser) return;

        socketRef.current.emit('private-message', {
            senderId: currentUser.id,
            receiverId: activeUser.id,
            text: newMessage
        });

        setNewMessage('');
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString();
    };

    const formatLastSeen = (lastSeen) => {
        if (!lastSeen) return 'Never';
        return new Date(lastSeen).toLocaleString();
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
                {/* Left Sidebar - Users */}
                <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="w-1/4 bg-white p-4 shadow-lg rounded-l-xl"
                >
                    <h2 className="text-2xl font-bold mb-4 text-purple-600">Contacts</h2>
                    <div className="space-y-4">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-lg cursor-pointer"
                                onClick={() => handleSelectUser(user)}
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        {user.username[0].toUpperCase()}
                                    </div>
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                                        user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                    }`} />
                                </div>
                                <div>
                                    <p className="font-semibold">{user.username}</p>
                                    <p className="text-sm text-gray-500">{user.place}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Center - Active User Profile */}
                <motion.div 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-1/4 bg-white p-4 border-x border-gray-200"
                >
                    {activeUser && (
                        <div className="text-center">
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4 text-4xl">
                                {activeUser.username[0].toUpperCase()}
                            </div>
                            <h2 className="text-2xl font-bold text-purple-600">{activeUser.username}</h2>
                            <p className={`${activeUser.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                                {activeUser.isOnline ? 'Active Now' : 'Offline'}
                            </p>
                            <div className="mt-4 space-y-2">
                                <p className="text-gray-600">Age: {activeUser.age}</p>
                                <p className="text-gray-600">Gender: {activeUser.gender}</p>
                                <p className="text-gray-600">Location: {activeUser.place}</p>
                                {!activeUser.isOnline && (
                                    <p className="text-gray-600">
                                        Last seen: {formatLastSeen(activeUser.lastSeen)}
                                    </p>
                                )}
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
                                className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[70%] p-3 rounded-lg ${
                                    message.senderId === currentUser.id ? 'bg-purple-600 text-white' : 'bg-gray-200'
                                }`}>
                                    <p>{message.text}</p>
                                    <span className="text-xs opacity-70">
                                        {formatTimestamp(message.timestamp)}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
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
        </div>
    );
}