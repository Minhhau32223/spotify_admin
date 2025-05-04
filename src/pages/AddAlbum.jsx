import React, {useState} from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { API_URL } from '../App'
import { toast } from 'react-toastify'
const AddAlbum = () => {
  const [image,setImage]= useState(false);
  const [name,setName]= useState("");
  const [description,setDescription]= useState("");
  const [bgColor,setBgColor]= useState("#ffffff");
  const [loading,setLoading]= useState(false);
    const onSubmitHanddler = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image','/src/assets/'+ image);
        formData.append('description', description);  
        formData.append('bg_color', bgColor);         // Sửa lại nếu backend dùng "desc"
        const response = await axios.post(`${API_URL}api/albums/create/`, formData);  
        console.log(response.status);
        if(response.status === 201){
          toast.success("Thêm album thành công")
          setName("");
          setDescription("");
          setImage(false);
          setBgColor("#ffffff");   
        }
        else{
          toast.error("Thêm album thất bại")
        }
   
    }catch (error) {
      console.error("Lỗi khi thêm album:", error);
    }
    setLoading(false);
  }

  return  loading? (
    <div className='grid place-items-center min-h-[80vh]'>
    <div className=' w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'>

    </div>
  </div>
  ):(
  <form onSubmit={onSubmitHanddler} className='flex flex-col gap-8 items-start text-gray-600'>
    <div className='flex flex-col gap-4'>
     <p>Thêm mới Album</p>
      <input  onChange={(e)=>setImage((e.target.files[0]))} type='file' id='image' accept='image/*' hidden/>
      <label htmlFor='image'>
        <img src={image? URL.createObjectURL(image):assets.upload_area} className='w-24 cursor-pointer' alt=''/>
      </label> 
    </div>

    <div className='flex flex-col gap-2.5'>
      <label htmlFor='name'>Tên Album</label>
      <input onChange={(e)=>setName(e.target.value)} type='text' value={name} id='name' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Nhập tại đây' />
    </div>
    <div className='flex flex-col gap-2.5'>
      <label htmlFor='name'>Mô tả</label>
      <input onChange={(e)=>setDescription(e.target.value)} type='text' value={description} id='description' className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Nhập tại đây' />
    </div>
    <div className='flex flex-col gap-3'>
      <label htmlFor='name'>Màu nền</label>
      <input onChange={(e)=>setBgColor(e.target.value)} value={bgColor} type='color' id='bg_color' className=''  />
    </div>
    <button  className='text-base bg-black text-white py-5 px-14 cursor-pointer'  type='submit'>Thêm mới</button>

  </form>
  )
}

export default AddAlbum