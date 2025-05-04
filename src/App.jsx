import React from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Routes, Route} from 'react-router-dom'
import AddSong from './pages/AddSong'
import AddAlbum from './pages/AddAlbum'
import ListAlbum from './pages/ListAlbum'
import ListSong from './pages/ListSong'
import Slidebar from './components/Slidebar'
import "tailwindcss" 
import NavbarAdmin from './components/NavbarAdmin'
import AddUser from './pages/AddUser'
import ListUser from './pages/ListUser'

export const API_URL = 'http://127.0.0.1:8000/'
const App = () => {
  return (
    <div className='flex items-start min- h-screen '>
    <ToastContainer/>
    <Slidebar/>
      <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
      <NavbarAdmin/>
          <div className='pt-8 pl-5 sm:pt-12 sm:pl-12'>
            <Routes>
              <Route path='/add-user' element={<AddUser/>}/>
              <Route path='/list-user' element={<ListUser/>}/>
              <Route path='/add-song' element={<AddSong/>}/>
              <Route path='/add-album' element={<AddAlbum/>}/>
              <Route path='/list-song' element={<ListSong/>}/>
              <Route path='/list-album' element={<ListAlbum/>}/>
            </Routes>
          </div>
      </div>
    </div>
  )
}

export default App