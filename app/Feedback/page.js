'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import Header from '../Header/page'


export default function FeedbackPage() {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [feedback, setFeedback] = useState('')

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
            <Header />
            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10"
                >
                    <motion.h1
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-10"
                    >
                        How Was Your Experience?
                    </motion.h1>

                    <motion.div 
                        className="flex justify-center space-x-4 mb-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {[...Array(5)].map((star, index) => {
                            const currentRating = index + 1
                            return (
                                <motion.label
                                    key={index}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <input
                                        type="radio"
                                        name="rating"
                                        className="hidden"
                                        value={currentRating}
                                        onClick={() => setRating(currentRating)}
                                    />
                                    <FaStar
                                        className="cursor-pointer transition-colors duration-200"
                                        size={45}
                                        color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                </motion.label>
                            )
                        })}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <textarea
                            className="w-full p-5 border-2 border-purple-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-700 text-lg"
                            placeholder="Share your thoughts with us..."
                            rows="5"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                        >
                            Submit Feedback
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}