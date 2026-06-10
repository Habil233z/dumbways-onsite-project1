import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import Post from './pages/Post'
import PostDetail from './pages/PostDetail'
import Search from './pages/Search'
import Header from './components/Header'
import SideProfile from './components/SideProfile'
import Follow from './pages/Follow'

function App() {
  return (
    <BrowserRouter>
    {!localStorage.getItem("token") && 
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    }
    <div className='flex'>
      <Header />
        <Routes>
          <Route path='/' element={<Profile/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/follow' element={<Follow/>}/>
          <Route path='/post' element={<Post/>}/>
          <Route path='/postDetail/:id' element={<PostDetail/>}/>
        </Routes>
      <SideProfile />
    </div>
    </BrowserRouter>
  )
 
}

export default App
