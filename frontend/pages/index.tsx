import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import UserTable from '../components/UserTable'
import UserModal from '../components/UserModal'

interface User {
  id: number
  name: string
  email: string
}

const API_URL = 'http://localhost:3000/api/users'

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_URL)
      setUsers(response.data.data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (data: { name: string; email: string }) => {
    try {
      await axios.post(API_URL, data)
      setIsModalOpen(false)
      fetchUsers()
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        fetchUsers()
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Gestión de Usuarios</h1>
              <p className="text-gray-400">Administra y visualiza todos tus usuarios</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-neon-green to-neon-blue hover:shadow-lg hover:shadow-neon-green/50 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              + Agregar Usuario
            </button>
          </div>

          {/* User Table */}
          <UserTable 
            users={users} 
            loading={loading}
            onDelete={handleDeleteUser}
          />
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddUser}
        />
      )}
    </div>
  )
}
