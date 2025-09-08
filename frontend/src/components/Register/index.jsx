import React,{use, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle login logic here
        const url = "http://localhost:5000/register";
        const data = { email, password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });
            if (response.ok) {
                navigate('/login');
                console.log('Registration successful');
            } else {
                const errorData = await response.json();
                console.error('Registration error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div>
      <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <button type="submit">Register</button><br/>
            <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
    </div>
  )
}

export default Register

        