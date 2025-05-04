import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../App'
import { toast } from 'react-toastify'

const ListUser = () => {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}api/users/`)
      if (response.status === 200) {
        setUsers(response.data)
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách người dùng:', error)
    }
  }

  const removeUser = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}api/users/${id}`)
      if (response.status === 200) {
        toast.success('Xóa người dùng thành công')
        fetchUsers()
      }
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div>
      <p>Danh sách người dùng</p>
      <br />
      <div>
        <div className="grid grid-cols-[1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border bg-gray-100 text-sm font-semibold">
          <div>Tên</div>
          <div>Email</div>
          <div>Hành động</div>
        </div>
        {users.map((user, index) => (
          <div key={index} className="grid grid-cols-[1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border-b text-sm">
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p className="cursor-pointer text-red-500" onClick={() => removeUser(user.id)}>
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListUser
