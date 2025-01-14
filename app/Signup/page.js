'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    otp: '',
    password: '',
    place: '',
    age: '',
    gender: '',
    interested: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !formData.username ||
      !formData.email ||
      !formData.otp ||
      !formData.password ||
      !formData.place ||
      !formData.age ||
      !formData.gender ||
      !formData.interested
    ) {
      setError('All fields are required');
      return;
    }

    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (isNaN(formData.age) || formData.age < 18) {
      setError('Age must be a valid number and at least 18');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setFormData({
          username: '',
          email: '',
          otp: '',
          password: '',
          place: '',
          age: '',
          gender: '',
          interested: '',
        });

        localStorage.setItem('userData', JSON.stringify(formData));

        window.alert('Signup successful! Enjoy your journey with us!');
        router.push('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetOtp = async () => {
    setOtpLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/getOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('OTP sent to your email!');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to send OTP. Try again later.');
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-96"
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-center mb-6 text-purple-600"
        >
          Sign Up
        </motion.h1>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {success && (
          <div className="text-green-500 text-center mb-4">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-4"
          >
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 text-black rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              value={formData.username}
            />
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-4"
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 text-black py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-4"
          >
            <input
              type="number"
              placeholder="OTP"
              className="w-full px-4 text-black py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
              value={formData.otp}
            />
            <button
              type="button"
              onClick={handleGetOtp}
              disabled={otpLoading}
              className="mt-2 w-full bg-purple-500 text-white py-2 rounded-lg"
            >
              {otpLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-4"
          >
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 text-black py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-4"
          >
            <input
              type="text"
              placeholder="Place"
              className="w-full px-4 py-2 text-black rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setFormData({ ...formData, place: e.target.value })
              }
              value={formData.place}
            />
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mb-4"
          >
            <input
              type="number"
              placeholder="Age"
              className="w-full px-4 text-black py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              value={formData.age}
            />
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mb-4"
          >
            <select
              className="w-full text-black px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              value={formData.gender}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mb-6"
          >
            <select
              className="w-full px-4 text-black py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) =>
                setFormData({ ...formData, interested: e.target.value })
              }
              value={formData.interested}
            >
              <option value="">Interested In</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="both">Both</option>
            </select>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-all"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
