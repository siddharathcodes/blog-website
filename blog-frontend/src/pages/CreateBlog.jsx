import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const CreateBlog = () => {
  const [form, setForm] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/blogs', form)
      alert('Blog created!')
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.message || 'Error!')
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen pt-28 pb-20 px-6'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-white/5 border border-white/10 rounded-3xl p-10'>
          <h1 className='text-3xl font-black mb-2'>Write Something Great</h1>
          <p className='text-white/40 text-sm mb-8'>Share your knowledge with the world</p>

          <div className='space-y-5'>
            <div>
              <label className='text-xs font-medium text-white/60 block mb-2'>Blog Title</label>
              <input
                type='text'
                placeholder='Enter an amazing title...'
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                className='w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all text-lg'
              />
            </div>
            <div>
              <label className='text-xs font-medium text-white/60 block mb-2'>Content</label>
              <textarea
                placeholder='Write your story here...'
                value={form.content}
                onChange={(e) => setForm({...form, content: e.target.value})}
                rows={10}
                className='w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all resize-none leading-relaxed'
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className='w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium hover:opacity-90 transition-all'
            >
              {loading ? 'Publishing...' : 'Publish Blog →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog