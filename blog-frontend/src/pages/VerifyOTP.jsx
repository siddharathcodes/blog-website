import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const VerifyOTP = () => {
  const [form, setForm] = useState({ email: '', otp: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/auth/verify-otp', form)
      alert('OTP verified!')
      navigate('/reset-password')
    } catch (error) {
      alert(error.response?.data?.message || 'Error!')
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen flex items-center justify-center px-6 pt-20'>
      <div className='w-full max-w-md'>
        <div className='bg-white/5 border border-white/10 rounded-3xl p-10'>
          <div className='text-4xl mb-4'>✉️</div>
          <h1 className='text-3xl font-black mb-2'>Verify OTP</h1>
          <p className='text-white/40 text-sm mb-8'>Enter OTP sent to your email</p>

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
              <label className='text-xs font-medium text-white/60 block mb-2'>OTP Code</label>
              <input
                type='text'
                placeholder='Enter 6 digit OTP'
                value={form.otp}
                onChange={(e) => setForm({...form, otp: e.target.value})}
                className='w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all text-center text-2xl tracking-widest'
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className='w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium hover:opacity-90 transition-all'
            >
              {loading ? 'Verifying...' : 'Verify OTP →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOTP