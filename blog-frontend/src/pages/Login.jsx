import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await API.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.message || 'Error!')
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-6 pt-20'>
      <div className='w-full max-w-md'>
        <div className='bg-white/5 border border-white/10 rounded-3xl p-10'>
          <h1 className='text-3xl font-black mb-2'>Welcome Back</h1>
          <p className='text-white/40 text-sm mb-8'>Login to continue writing</p>

          <div className='space-y-4'>
            <div>
              <label className='text-xs font-medium text-white/60 block mb-2'>Email</label>
              <input
                type='email'
                placeholder='your@email.com'
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className='w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all'
              />
            </div>
            <div>
              <label className='text-xs font-medium text-white/60 block mb-2'>Password</label>
              <input
                type='password'
                placeholder='••••••••'
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                className='w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all'
              />
            </div>
            <div className='text-right'>
              <Link to='/forgot-password' className='text-xs text-violet-400'>
                Forgot Password?
              </Link>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className='w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium hover:opacity-90 transition-all'
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>
          </div>

          <p className='text-center text-white/40 text-sm mt-6'>
            No account?{' '}
            <Link to='/register' className='text-violet-400 hover:text-violet-300'>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login