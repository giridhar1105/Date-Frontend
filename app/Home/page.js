'use client';

import { motion } from 'framer-motion';
export default function Home() {
    const fadeInUp = {
        initial: { y: 60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400">
            
            <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
            >
                <motion.div 
                    variants={fadeInUp}
                    className="text-center text-white mt-20"
                >
                    <motion.h1 
                        className="text-5xl md:text-7xl font-bold mb-6"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        Find Your Perfect Match
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl mb-8"
                        variants={fadeInUp}
                    >
                        Connect with like-minded people and start your journey
                    </motion.p>
                    
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-opacity-90 transition-colors duration-300"
                    >
                        Get Started
                    </motion.button>
                </motion.div>

                <motion.div 
                    variants={staggerContainer}
                    className="grid md:grid-cols-3 gap-8 mt-20"
                >
                    {[ 
                        { title: 'Smart Matching', icon: '🎯', description: 'Our AI-powered algorithm finds your perfect match' },
                        { title: 'Safe & Secure', icon: '🔒', description: 'Your privacy and security is our top priority' },
                        { title: 'Real Connections', icon: '❤️', description: 'Make meaningful connections that last' }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ y: -10 }}
                            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white text-center"
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="text-4xl mb-4"
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div 
                    variants={fadeInUp}
                    className="mt-20 grid md:grid-cols-3 gap-8 text-white text-center"
                >
                    {[ 
                        { number: '1M+', label: 'Active Users' },
                        { number: '500K+', label: 'Matches Made' },
                        { number: '100K+', label: 'Success Stories' }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            className="p-6"
                        >
                            <motion.h4 
                                className="text-4xl font-bold mb-2"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {stat.number}
                            </motion.h4>
                            <p className="text-lg">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </main>
    );
}
