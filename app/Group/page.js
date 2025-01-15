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
        query: { token },
      });

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
    }
  }, [token]);

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
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-4 text-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold">Group Chat</h1>
            <p className="text-sm">{onlineCount} participants online</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 rounded-lg shadow-lg">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.username === 'You' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex items-start gap-3 mb-4 ${message.isSystem ? 'justify-center' : message.username === 'You' ? 'flex-row-reverse justify-end' : 'justify-start'}`}
                >
                  {!message.isSystem && (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md">
                      {message.avatar}
                    </div>
                  )}
                  <div className={`p-4 rounded-lg shadow-lg max-w-[75%] ${message.isSystem ? 'bg-gray-200 text-gray-600 text-sm italic' : message.username === 'You' ? 'bg-purple-600 text-white' : 'bg-white text-black'}`}>
                    {!message.isSystem && <p className="text-xs font-semibold mb-2">{message.username}</p>}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>

          <form onSubmit={sendMessage} className="p-6 border-t bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-lg mt-4 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-4 border rounded-lg focus:outline-none focus:border-purple-600 text-black bg-white shadow-md"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full sm:w-auto shadow-md"
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
