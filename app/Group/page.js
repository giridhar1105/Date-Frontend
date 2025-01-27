'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Header from '../Header/page';
import axios from 'axios';

export default function GroupChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineCount, setOnlineCount] = useState(0);
  const [token, setToken] = useState(null);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth-token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      socketRef.current = io('http://localhost:5000', {
        query: { token }
      });

      socketRef.current.emit('join', {
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
    }
  }, [token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const tempMessage = {
      id: Date.now(),
      username: 'You',
      text: newMessage,
      avatar: '😊',
      isTemp: true,  // Flag to identify the temporary message
    };

    setMessages(prev => [...prev, tempMessage]);  // Add temporary message for animation

    socketRef.current.emit('send-message', {
      userId: 1,
      username: 'You',
      text: newMessage,
      avatar: '😊'
    });

    setNewMessage('');
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('auth-token', token);
      setToken(token);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
      <Header />
      <div className="h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col p-8 space-y-6 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-7 text-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold">Group Chat</h1>
            <p className="text-sm">{onlineCount} participants online</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 rounded-lg shadow-lg">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{
                    opacity: 0,
                    x: 100,  // All messages slide in from the right (for both you and others)
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`flex items-start gap-3 mb-4 ${message.isSystem ? 'justify-center' : message.username === 'You' ? 'flex-row-reverse justify-end' : 'justify-start'}`}
                >
                  <div className="flex flex-col">
                    <div className="text-sm text-white">{message.username}</div>
                    <div className="text-sm bg-gray-800 text-white p-2 rounded-lg">{message.text}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2 p-4 bg-gray-800">
            <form onSubmit={sendMessage} className="w-full flex items-center gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-3 rounded-lg bg-white text-black"
                placeholder="Type your message..."
              />
              <button type="submit" className="text-white p-3 rounded-lg bg-gradient-to-r from-blue-500 via-teal-400 to-purple-500">Send</button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
