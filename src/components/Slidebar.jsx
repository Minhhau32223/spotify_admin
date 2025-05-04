import React from 'react'
import "tailwindcss" ;
import { assets } from '../../../spotify-admin/src/assets/assets';  
import { NavLink } from 'react-router-dom';
const Slibar = () => {
  return (
    <div className='bg-[#003A10] w-1/4 h-screen pl-[4vw]'>
    <img className='w-[max(10vw,100px)] mt-5 hidden sm:block' src={assets.logo} alt="logo" />
    <img className='w-[max(5vw,40px)] mt-5  mr-5 block sm:hidden' src={assets.logo_small} alt="logo" />
      <div className='flex flex-col gap-5 mt-10'>
         <NavLink to ='add-user' className='flex items-center gap-2.5  text-gray-800 bg-white border border-black  pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font_medium '>
            <img src={assets.logo} className='w-5'/>
            <p className='hidden sm:block'>Thêm người dùng</p>
          </NavLink>
          <NavLink to ='list-user' className='flex items-center gap-2.5  text-gray-800 bg-white border border-black  pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font_medium '>
            <img src={assets.logo_small} className='w-5'/>
            <p className='hidden sm:block'>Danh sách người dùng</p>
          </NavLink>
          <NavLink to ='add-song' className='flex items-center gap-2.5  text-gray-800 bg-white border border-black  pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font_medium '>
            <img src={assets.add_song} className='w-5'/>
            <p className='hidden sm:block'>Thêm bài hát</p>
          </NavLink>

          <NavLink to ='list-song'className='flex items-center gap-2.5  text-gray-800 bg-white border border-black  pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font_medium '>
            <img src={assets.song_icon} className='w-5'/>
            <p className='hidden sm:block'>Danh sách bài hát</p>
          </NavLink>

          <NavLink to ='add-album' className='flex items-center gap-2.5  text-gray-800 bg-white border border-black  pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font_medium '>
            <img src={assets.add_album} className='w-5'/>
            <p className='hidden sm:block'>Thêm Album</p>
          </NavLink>

          <NavLink to ='list-album' className='flex items-center gap-2.5  text-gray-800 bg-white border border-black  pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font_medium '>
            <img src={assets.album_icon} className='w-5'/>
            <p className='hidden sm:block'>Danh sách album</p>
          </NavLink>
      </div>
    </div>
  )
}

export default Slibar