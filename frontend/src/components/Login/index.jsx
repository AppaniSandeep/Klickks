import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cookies from 'js-cookie';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/login";
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
                // Handle successful login
                const data = await response.json();
                console.log('Login successful');
                console.log(data)
                navigate('/home');
            } else {
                const errorData = await response.json();
                console.error('Login error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

  return (
    <div>
      <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <button type="submit">Login</button><br/>
            <span>Don't have an account? <Link to="/register">Register</Link></span>
        </form>
    </div>
  )
}

export default Login
