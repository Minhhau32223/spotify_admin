import React, { useState, useEffect } from 'react'
import { assets } from '../../../spotify-admin/src/assets/assets'
import axios from 'axios'
import { API_URL } from '../../../spotify-admin/src/App'
import { toast } from 'react-toastify'
const AddSong = () => {

  const [image,setImage]= useState(false);
  const [song,setSong]= useState(false);
  const [name,setName]= useState("");
  const [description,setDescription]= useState("");
  const [album,setAlbum]= useState("none");
  const [loading,setLoading]= useState(false);
  const [albumsData,setAlbumsData]= useState([]);

  const onSubmitHanddler = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', description);          // Sửa lại nếu backend dùng "desc"
      formData.append('file', 'https://clonespotifysgu2025.s3.ap-southeast-1.amazonaws.com/'+song);                 // Đổi "audio" thành "file" nếu backend mong đợi key này
      formData.append('image','https://clonespotifysgu2025.s3.ap-southeast-1.amazonaws.com/'+ image);
      formData.append('album_id', album);            // Sửa lại key
      formData.append('artist_id', 3);               // Bổ sung ID artist (tạm thời cố định là 3)
      formData.append('duration', "04:08"); 
      
      const response = await axios.post(`${API_URL}api/songs/create/`, formData);
      console.log(response.status);
      if(response.status === 201){

        toast.success("Thêm bài hát thành công")
        setName("");
        setDescription("");
        setImage(false);
        setSong(false);
        setAlbum("none");
      }else{
        toast.error("Thêm bài hát thất bại")

      }
      setLoading(false);

    } catch (error) {
      console.error("Lỗi khi thêm bài hát:", error);
      toast.error("Thêm bài hát thất bại")
    }

  }
  const loadAlbumData = async () => { 
    try {
      const response = await axios.get(`${API_URL}api/albums/`);
      console.log('Data fetched:', response.data);
      if(response.status === 200) {
        setAlbumsData(response.data);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }

  useEffect(() => {
    loadAlbumData();
  }, []);

  return loading ? ( 
  <div className='grid place-items-center min-h-[80vh]'>
    <div className=' w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'>

    </div>
  </div>
  ) :(
    <form onSubmit={onSubmitHanddler}  className='flex flex-col gap-8 items-start text-gray-600'>
      <div className='flex gap-8'>
          <div className='flex flex-col gap-4'>
            <p> Tải nhạc lên</p>
            <input onChange={(e)=>setSong(e.target.files[0])} type='file' id='song' accept='audio/*' hidden />
            <label htmlFor='song'>
              <img src={song?assets.upload_added: assets.upload_song} className='w-24 cursor-pointer' alt=''/>
            </label>
          </div>

          <div className='fex flex-col gap-4'>
            <p> Tải ảnh bìa lên</p>
            <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' accept='image/*' hidden />
            <label htmlFor='image'>
              <img src={image? URL.createObjectURL(image) : assets.upload_area} className='w-24 cursor-pointer' alt=''/>
            </label>  

          </div>
      </div>

      <div className='flex flex-col gap-2.5'>
        <label htmlFor='name'>Tên bài hát</label>
        <input onChange={(e)=>setName(e.target.value)} value={name} type='text' id='name' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Nhập tại đây' />
      </div>

      <div className='flex flex-col gap-2.5'>
        <label htmlFor='name'>Mô tả bài hát</label>
        <input onChange={(e)=>setDescription(e.target.value)} value={description} type='text' id='name' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Nhập tại đây' />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p> Album</p>
        <select onChange={(e)=>setAlbum(e.target.value)}  defaultValue={album} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]'>
          <option value='None'>None</option>
          {albumsData.map((item, index) => {
            return(
              <option key={index} value={item.id}>{item.name}</option>
            )
          })}
         
        
        </select>
      </div>
      <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>Thêm</button>
    </form>
  )
}

export default AddSong