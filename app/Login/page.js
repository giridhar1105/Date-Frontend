'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Call the backend login API
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the JWT token and user data in localStorage
                localStorage.setItem('token', data.token); // Store the token
                localStorage.setItem('currentUser', JSON.stringify(data.user)); // Store user data

                // Redirect to the chat/dashboard page or any other protected page
                router.push('/');
            } else {
                // Display error if login fails
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
            >
                <motion.h1 
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-3xl font-bold text-center mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
                >
                    Welcome Back
                </motion.h1>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-lg text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <motion.form 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </motion.button>
                </motion.form>

                <div className="mt-6 text-center space-y-2">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/Signup" className="text-purple-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                    <Link 
                        href="/forgot-password"
                        className="block text-sm text-purple-600 hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
