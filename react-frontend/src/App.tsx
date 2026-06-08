import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Post from './pages/Post'
import PostDetail from './pages/PostDetail'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/post' element={<Post/>}/>
      <Route path='/postDetail/:id' element={<PostDetail/>}/>
    </Routes>
    </BrowserRouter>
  )
 
}

export default App
