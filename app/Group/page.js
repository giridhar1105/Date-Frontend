'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WebSocketClient = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket('ws://localhost:8085');
    
    // Handle connection open event
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      ws.send('Hello from the client!');
    };

    // Handle incoming messages from server
    ws.onmessage = (event) => {
      console.log('Message from server:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Handle WebSocket error event
    ws.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    // Handle WebSocket close event
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    setSocket(ws);

    // Clean up WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
      <div className="h-full flex flex-col p-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col p-8 space-y-6 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-7 text-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold">WebSocket Client</h1>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 rounded-lg shadow-lg">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: 100,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex items-start gap-3 mb-4 justify-start"
                >
                  <div className="text-sm bg-gray-800 text-white p-2 rounded-lg">{msg}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 p-4 bg-gray-800">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-black"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="text-white p-3 rounded-lg bg-gradient-to-r from-blue-500 via-teal-400 to-purple-500"
            >
              Send
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WebSocketClient;
