import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './pages/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Post from './pages/Post'

function App() {
  return (
    <BrowserRouter>
    <Header/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Post' element={<Post/>}/>
    </Routes>
    </BrowserRouter>
  )
 
}

export default App
