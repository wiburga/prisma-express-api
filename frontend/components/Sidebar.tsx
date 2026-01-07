import React from 'react'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <div className="text-2xl font-bold bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
          Dashboard
        </div>
        <p className="text-gray-500 text-sm mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-4 flex-1">
        <NavItem 
          label="Usuarios" 
          icon="👥" 
          active 
        />
        <NavItem 
          label="Dashboard" 
          icon="📊" 
        />
        <NavItem 
          label="Reportes" 
          icon="📈" 
        />
        <NavItem 
          label="Configuración" 
          icon="⚙️" 
        />
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-800 pt-4">
        <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition">
          <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
            👨‍💻
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Desarrollador</p>
            <p className="text-xs text-gray-500">Backend</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

interface NavItemProps {
  label: string
  icon: string
  active?: boolean
}

function NavItem({ label, icon, active = false }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-neon-green/20 to-neon-blue/20 text-neon-green border-l-2 border-neon-green'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  )
}
