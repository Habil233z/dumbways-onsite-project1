import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Post from './pages/Post'
import PostDetail from './pages/PostDetail'
import Search from './pages/Search'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/post' element={<Post/>}/>
      <Route path='/postDetail/:id' element={<PostDetail/>}/>
    </Routes>
    </BrowserRouter>
  )
 
}

export default App
