import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/auth/register', form)
      alert('OTP sent to your email!')
     navigate('/verify-email', { state: { email: form.email } })
    } catch (error) {
      alert(error.response?.data?.message || 'Error!')
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-6 pt-20'>
      <div className='w-full max-w-md'>
        <div className='bg-white/5 border border-white/10 rounded-3xl p-10'>
          <h1 className='text-3xl font-black mb-2'>Join BlogSpace</h1>
          <p className='text-white/40 text-sm mb-8'>Start sharing your story today</p>

          <div className='space-y-4'>
            <div>
              <label className='text-xs font-medium text-white/60 block mb-2'>Full Name</label>
              <input
                type='text'
                placeholder='Your name'
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className='w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all'
              />
            </div>
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
                placeholder='Min 6 characters'
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                className='w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all'
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className='w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium hover:opacity-90 transition-all mt-2'
            >
              {loading ? 'Creating...' : 'Create Account →'}
            </button>
          </div>

          <p className='text-center text-white/40 text-sm mt-6'>
            Already have account?{' '}
            <Link to='/login' className='text-violet-400 hover:text-violet-300'>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register