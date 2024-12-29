'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

export default function FeedbackPage() {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [feedback, setFeedback] = useState('')

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 p-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8"
            >
                <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-center text-purple-800 mb-8"
                >
                    Give us your Feedback
                </motion.h1>

                <div className="flex justify-center space-x-2 mb-8">
                    {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1
                        return (
                            <motion.label
                                key={index}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <input
                                    type="radio"
                                    name="rating"
                                    className="hidden"
                                    value={currentRating}
                                    onClick={() => setRating(currentRating)}
                                />
                                <FaStar
                                    className="cursor-pointer"
                                    size={40}
                                    color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </motion.label>
                        )
                    })}
                </div>

                <motion.textarea
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Tell us about your experience..."
                    rows="4"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                    Submit Feedback
                </motion.button>
            </motion.div>
        </div>
    )
}
