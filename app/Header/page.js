'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const Header = () => {
  const [isHovered, setIsHovered] = useState(null);
  const router = useRouter();

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'One V One Chat', path: '/OneVone' },
    { title: 'Group Chat', path: '/Group' },
    { title: 'AI Chat', path: '/AI' },
    { title: 'Feedback', path: '/Feedback' },
    { title: 'Profile', path: '/Profile' }
  ];

  const handleLogin = () => {
    router.push('/Login');
  };

  const handleSignUp = () => {
    router.push('/Signup');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full top-0 z-50 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <Link href="/" className="text-white text-2xl font-bold">
              Logo
            </Link>
          </motion.div>

          <div className="flex items-center space-x-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                onHoverStart={() => setIsHovered(index)}
                onHoverEnd={() => setIsHovered(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={item.path}
                  className="relative px-3 py-2 rounded-md text-white font-medium hover:text-gray-100"
                >
                  {item.title}
                  {
                  isHovered === index && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            <div className="flex items-center space-x-3 ml-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-white border border-white rounded-md hover:bg-white hover:text-purple-600 transition-colors duration-300"
                onClick={handleLogin}
              >
                Login
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-opacity-90 transition-colors duration-300"
                onClick={handleSignUp}
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;