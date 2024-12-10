import { useAuth } from '../context/AuthContext';
import { Mail, User as UserIcon } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[57px]">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">User Profile</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="relative">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {user?.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <UserIcon className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-medium text-gray-900">{user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-lg font-medium text-gray-900">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}