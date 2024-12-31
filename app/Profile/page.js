// 'use client';

// import { useState, useEffect } from 'react';
// import Header from '../Header/page';


// export default function ProfilePage() {
//     const [isLoaded, setIsLoaded] = useState(false);

//     useEffect(() => {
//         setIsLoaded(true);
//     }, []);

//     return (
//         <div>
//             <Header />
//         <div className={`profile-container ${isLoaded ? 'loaded' : ''}`}>
//             <style jsx>{`
//                 .profile-container {
//                     min-height: 100vh;
//                     padding: 2rem;
//                     background: linear-gradient(45deg, #6b46c1, #ec4899, #fb923c);
//                     opacity: 0;
//                     transform: translateY(20px);
//                     animation: fadeIn 0.8s ease-out forwards;
//                     padding-top: 8rem;
//                 }

//                 .profile-card {
//                     background: rgba(255, 255, 255, 0.9);
//                     border-radius: 20px;
//                     padding: 2rem;
//                     box-shadow: 0 10px 30px rgba(0,0,0,0.1);
//                     transform-origin: center;
//                     animation: pulse 2s infinite;
//                 }

//                 .profile-image {
//                     width: 150px;
//                     height: 150px;
//                     border-radius: 50%;
//                     margin: 0 auto;
//                     display: block;
//                     border: 5px solid #fff;
//                     animation: rotate 20s linear infinite;
//                 }

//                 .profile-info {
//                     text-align: center;
//                     margin-top: 2rem;
//                 }

//                 .profile-info h1 {
//                     color: #333;
//                     font-size: 2.5rem;
//                     margin-bottom: 1rem;
//                     animation: slideIn 0.5s ease-out;
//                 }

//                 .stats {
//                     display: flex;
//                     justify-content: space-around;
//                     margin-top: 2rem;
//                 }

//                 .stat-item {
//                     padding: 1rem;
//                     background: linear-gradient(135deg, #667eea, #764ba2);
//                     border-radius: 15px;
//                     color: white;
//                     transform: scale(0);
//                     animation: popIn 0.5s ease-out forwards;
//                 }

//                 @keyframes fadeIn {
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }

//                 @keyframes pulse {
//                     0% { transform: scale(1); }
//                     50% { transform: scale(1.02); }
//                     100% { transform: scale(1); }
//                 }

//                 @keyframes rotate {
//                     from { transform: rotate(0deg); }
//                     to { transform: rotate(360deg); }
//                 }

//                 @keyframes slideIn {
//                     from { transform: translateX(-50px); opacity: 0; }
//                     to { transform: translateX(0); opacity: 1; }
//                 }

//                 @keyframes popIn {
//                     to { transform: scale(1); }
//                 }
//             `}</style>

//             <div className="profile-card">
//                 <img 
//                     src="https://img.goodfon.com/original/1920x1080/e/d8/girl-black-devil-girl-red.jpg" 
//                     // src='https://i.pinimg.com/736x/52/4c/dd/524cdd59c013b05ee8df408073ab2b42.jpg'
//                     alt="Profile" 
//                     className="profile-image"
//                 />
//                 <div className="profile-info">
//                     <h1>John Doe</h1>
//                     <p className='text-black' >Bengalore, Karnataka</p>
                    
//                     <div className="stats">
//                         <div className="stat-item" style={{ animationDelay: '0.2s' }}>
//                             <pre> Age: </pre>
//                             <p>25</p>
//                         </div>
//                         <div className="stat-item" style={{ animationDelay: '0.4s' }}>
//                             <h3>Gender: </h3>
//                             <p>Male</p>
//                         </div>
//                         <div className="stat-item" style={{ animationDelay: '0.6s' }}>
//                             <h3>Intrested:</h3>
//                             <p>Female</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </div>
//     );
// }



'use client';

import { useState, useEffect } from 'react';
import Header from '../Header/page';

export default function ProfilePage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('http://localhost:5000/profile', { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user); 
                } else {
                    console.error('Error fetching user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoaded(true);
            }
        }

        fetchUserData();
    }, []); 

    if (!isLoaded) {
        return (
            <div className="loading">
                <p>Signup Please</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="error">
                <p>User data could not be loaded.</p>
            </div>
        );
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
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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
                        src={user.profileImage || "https://img.goodfon.com/original/1920x1080/e/d8/girl-black-devil-girl-red.jpg"} // Default image
                        alt="Profile" 
                        className="profile-image"
                    />
                    <div className="profile-info">
                        <h1>{user.username || 'Giridhar'}</h1>
                        <p className='text-black'>{user.place || 'Bengalore, Karnataka'}</p>
                        
                        <div className="stats">
                            <div className="stat-item" style={{ animationDelay: '0.2s' }}>
                                <pre> Age: </pre>
                                <p>{users.age || '20'}</p>
                            </div>
                            <div className="stat-item" style={{ animationDelay: '0.4s' }}>
                                <h3>Gender: </h3>
                                <p>{users.gender || 'Male'}</p>
                            </div>
                            <div className="stat-item" style={{ animationDelay: '0.6s' }}>
                                <h3>Interested In:</h3>
                                <p>{users.interested || 'Female'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
