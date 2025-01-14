'use client';

import { useState, useEffect } from 'react';
import Header from '../Header/page';

export default function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    setIsLoaded(true);
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <div className={`profile-container ${isLoaded ? 'loaded' : ''}`}>
        <style jsx>{`
          .profile-container {
            min-height: 100vh;
            padding: 2rem;
            background: linear-gradient(45deg, #6b46c1, #ec4899, #fb923c);
            opacity: 0;
            transform: translateY(20px);
            animation: fadeIn 0.8s ease-out forwards;
            padding-top: 8rem;
          }

          .profile-card {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transform-origin: center;
            animation: pulse 2s infinite;
          }

          .profile-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin: 0 auto;
            display: block;
            border: 5px solid #fff;
            animation: rotate 20s linear infinite;
          }

          .profile-info {
            text-align: center;
            margin-top: 2rem;
          }

          .profile-info h1 {
            color: #333;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            animation: slideIn 0.5s ease-out;
          }

          .stats {
            display: flex;
            justify-content: space-around;
            margin-top: 2rem;
          }

          .stat-item {
            padding: 1rem;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 15px;
            color: white;
            transform: scale(0);
            animation: popIn 0.5s ease-out forwards;
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }

          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes slideIn {
            from { transform: translateX(-50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          @keyframes popIn {
            to { transform: scale(1); }
          }
        `}</style>

        <div className="profile-card">
          <img 
            src="https://img.goodfon.com/original/1920x1080/e/d8/girl-black-devil-girl-red.jpg" 
            alt="Profile" 
            className="profile-image"
          />
          <div className="profile-info">
            <h1>{userData.username}</h1>
            <p className="text-black">{userData.place}</p>

            <div className="stats">
              <div className="stat-item" style={{ animationDelay: '0.2s' }}>
                <pre> Age: </pre>
                <p>{userData.age}</p>
              </div>
              <div className="stat-item" style={{ animationDelay: '0.4s' }}>
                <h3>Gender: </h3>
                <p>{userData.gender}</p>
              </div>
              <div className="stat-item" style={{ animationDelay: '0.6s' }}>
                <h3>Interested: </h3>
                <p>{userData.interested}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
