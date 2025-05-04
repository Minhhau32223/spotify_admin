import React, { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../App'
import { toast } from 'react-toastify'

const AddUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('username', name)
      formData.append('email', email)

      const response = await axios.post(`${API_URL}api/users/create/`, formData)

      if (response.status === 201) {
        toast.success('Thêm người dùng thành công')
        setName('')
        setEmail('')
     
      } else {
        toast.error('Thêm người dùng thất bại')
      }
    } catch (error) {
      console.error('Lỗi khi thêm người dùng:', error)
      toast.error('Thêm người dùng thất bại')
    } finally {
      setLoading(false)
    }
  }

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 text-gray-600">
      <div className="flex flex-col gap-2.5">
        <label htmlFor="name">Tên người dùng</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nhập tên"
          className="border p-2.5"
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Nhập email"
          className="border p-2.5"
        />
      </div>
     
      
      <button type="submit" className="bg-black text-white py-2.5 px-6">
        Thêm
      </button>
    </form>
  )
}

export default AddUser
