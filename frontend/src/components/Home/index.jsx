import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const url = "http://localhost:5000/logout";
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                console.log('Logout successful');
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error('Logout error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home
