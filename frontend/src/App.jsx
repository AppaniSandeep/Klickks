import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import './App.css'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './components/Register'

function App() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/home' element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default App
