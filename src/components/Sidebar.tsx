import { LayoutDashboard, BarChart, Users, Settings, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BarChart, label: 'Analytics', path: '/analytics' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: FileText, label: 'Documents', path: '/documents' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-[57px] h-[calc(100vh-57px)] bg-white border-r border-gray-200 transition-all duration-300 z-40
        ${isOpen ? 'w-64' : 'w-12'} flex flex-col justify-between`}
    >
      <div className="flex flex-col py-4">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => window.history.pushState(null, '', item.path)}
            className={`flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-100 transition-colors
              ${window.location.pathname === item.path ? 'bg-gray-100' : ''}`}
          >
            <item.icon className="w-5 h-5 min-w-[20px] text-gray-600" />
            {isOpen && (
              <span className="text-sm font-medium whitespace-nowrap transition-all duration-300">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="border-t border-gray-200">
        <button
          onClick={() => window.history.pushState(null, '', '/settings')}
          className={`flex items-center gap-3 px-3 py-3 w-full text-gray-700 hover:bg-gray-100 transition-colors
            ${window.location.pathname === '/settings' ? 'bg-gray-100' : ''}`}
        >
          <Settings className="w-5 h-5 min-w-[20px] text-gray-600" />
          {isOpen && (
            <span className="text-sm font-medium whitespace-nowrap transition-all duration-300">
              Settings
            </span>
          )}
        </button>
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full py-2 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>
    </aside>
  );
}