import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import Post from './pages/Post'
import PostDetail from './pages/PostDetail'
import Search from './pages/Search'
import SideHeader from './components/SideHeader'
import SideProfile from './components/SideProfile'
import Follows from './pages/Follows'
import Header from './components/Header'
import ProfilePadding from './components/ProfilePadding'
import EditProfile from './pages/EditProfile'

function App() {
  return (
    <BrowserRouter>
    <Header />
    {!localStorage.getItem("token") && 
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    }
    <div className='flex'>
      <SideHeader />
        <Routes>
          <Route path='/' element={<Profile/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/follows' element={<Follows/>}/>
          <Route path='/post' element={<Post/>}/>
          <Route path='/postDetail/:id' element={<PostDetail/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
        </Routes>
      <SideProfile />
      <ProfilePadding />
    </div>
    </BrowserRouter>
  )
 
}

export default App
