import React from 'react'

interface User {
  id: number
  name: string
  email: string
}

interface UserTableProps {
  users: User[]
  loading: boolean
  onDelete: (id: number) => void
}

export default function UserTable({ users, loading, onDelete }: UserTableProps) {
  if (loading) {
    return (
      <div className="card p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-green"></div>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-800/50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-neon-green">ID</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-neon-blue">Nombre</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-neon-purple">Email</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                No hay usuarios disponibles
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                <td className="px-6 py-4 text-sm text-gray-300">
                  <span className="text-neon-green font-mono">#{user.id}</span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{user.email}</td>
                <td className="px-6 py-4 text-sm space-x-3">
                  <button
                    className="px-3 py-2 bg-gray-800 hover:bg-neon-blue/20 text-neon-blue rounded transition-all duration-300"
                  >
                    ✎ Editar
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="px-3 py-2 bg-gray-800 hover:bg-red-500/20 text-red-500 rounded transition-all duration-300"
                  >
                    🗑 Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Footer stats */}
      <div className="px-6 py-4 bg-gray-800/30 border-t border-gray-800 text-sm text-gray-400">
        Total de usuarios: <span className="text-neon-green font-semibold">{users.length}</span>
      </div>
    </div>
  )
}
