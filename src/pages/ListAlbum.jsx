import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../App'
import { toast } from 'react-toastify'
const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${API_URL}api/albums/`);
      console.log('Data fetched:', response.data);
      if(response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };
  const removeAlbum = async (id) => {
    try{
      const response = await axios.delete(`${API_URL}api/albums/${id}`);
      console.log('Album removed:', response.data);
      if(response.status === 200) {
        toast.success("Xóa album thành công")
        await fetchAlbums(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error removing album:', error);
    }
  }
  useEffect(() => {
    fetchAlbums();
  }, []);
  return (
    <div>
      <p> Danh sách các album</p>
      <br/>
      <div>
          <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100 '>
            <b>Hình ảnh</b>
            <b>Tên</b>
            <b>Mô tả</b>
            <b>Màu nền</b>
            <b>Chức năng</b>
          </div>
          {loading ? (
            <div className='grid place-items-center min-h-[80vh]'>
              <div className=' w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
            </div>
          ) : (
            data.map((item, index) => {
              return(
                <div key={index}  className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr]   gap-2.5 p-3 border-b border-gray-300 text-sm mr-5 bg-gray-100'>
                  <img className='w-12' src={item.image}/>
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                  <input type='color' value={item.bg_color} className='w-12 h-8 ' readOnly/>
                  <p className='cursor-pointer' onClick={()=> removeAlbum(item.id)}>x</p>
                </div>
              )
            })
          )}
      </div>
    </div>
  )
}

export default ListAlbum