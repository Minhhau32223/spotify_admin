import React ,{useState} from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { API_URL } from '../App';
import { toast } from 'react-toastify';
const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${API_URL}api/songs/`);
     
      console.log('Data fetched:', response.data);
      if(response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };
  const removeSong = async (id) => {
    try{
      const response = await axios.delete(`${API_URL}api/songs/${id}`);
      console.log('Song removed:', response.data);
      if(response.status === 200) {
        toast.success("Xóa bài hát thành công")
        await fetchSongs(); // Refresh the list after deletion
      }
    } catch (error) {
      console.error('Error removing song:', error);
    }
  }

  useEffect(()  => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p> Danh sách các bài hát</p>
      <br/>
      <div>
          <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100 '>
            <b>Hình ảnh</b>
            <b>Tên</b>
            <b>Album</b>
            <b>Thời lượng</b>
            <b>Trạng thái </b>
          </div>
          {data.map((item, index) => {
            return(
              <div key={index}  className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr]   gap-2.5 p-3 border-b border-gray-300 text-sm mr-5 bg-gray-100'>
              <img className='w-12' src={item.image}/>
              <p>{item.name}</p>
              <p>{item.album_id}</p>
              <p>{item.duration}</p>
              <p className='cursor-pointer' onClick={()=> removeSong(item.id)}>x</p>
              </div>
            )
          })
}
      </div>
    </div>
  )
}

export default ListSong