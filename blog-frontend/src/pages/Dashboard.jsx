import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/auth/me')
        setUser(res.data.user)
      } catch (error) {
        navigate('/login')
      }
    }
    fetchUser()
  }, [])

  if (!user) return (
    <div className='min-h-screen flex items-center justify-center text-white/40'>
      Loading...
    </div>
  )

  return (
    <div className='min-h-screen pt-28 pb-20 px-6'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white/5 border border-white/10 rounded-3xl p-10'>

          {/* Avatar */}
          <div className='w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-3xl font-black mb-6'>
            {user.name?.charAt(0)}
          </div>

          <h1 className='text-3xl font-black mb-1'>{user.name}</h1>
          <p className='text-white/40 mb-8'>{user.email}</p>

          {/* Info */}
          <div className='grid grid-cols-2 gap-4 mb-8'>
            <div className='bg-white/5 rounded-2xl p-4'>
              <div className='text-xs text-white/40 mb-1'>Role</div>
              <div className='font-medium capitalize'>{user.role}</div>
            </div>
            <div className='bg-white/5 rounded-2xl p-4'>
              <div className='text-xs text-white/40 mb-1'>Verified</div>
              <div className='font-medium'>{user.isVerified ? '✅ Yes' : '❌ No'}</div>
            </div>
          </div>

          {/* Actions */}
          <div className='flex gap-3'>
            <button
              onClick={() => navigate('/create')}
              className='flex-1 py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium hover:opacity-90 transition-all'
            >
              Write Blog ✍️
            </button>
            <button
              onClick={() => { localStorage.clear(); navigate('/login') }}
              className='flex-1 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard