import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get('/blogs')
        setBlogs(res.data.blogs)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  const gradients = [
    'from-violet-900 to-purple-600',
    'from-pink-900 to-rose-500',
    'from-emerald-900 to-teal-500',
    'from-blue-900 to-cyan-500',
  ]

  return (
    <div className='min-h-screen'>
      {/* Hero */}
      <div className='pt-32 pb-20 px-6 text-center relative overflow-hidden'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-500/20 blur-3xl pointer-events-none' />
        <div className='inline-block px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm mb-6'>
          ✦ Where Ideas Come Alive
        </div>
        <h1 className='text-5xl md:text-7xl font-black mb-5 leading-tight'>
          Share Your{' '}
          <span className='bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent'>
            Story
          </span>
          <br />With The World
        </h1>
        <p className='text-white/50 text-lg max-w-md mx-auto mb-10 leading-relaxed'>
          A beautiful space for developers and creators to share their ideas.
        </p>
        <div className='flex gap-3 justify-center'>
          <button
            onClick={() => navigate('/register')}
            className='px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-medium hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg shadow-violet-500/30'
          >
            Start Writing →
          </button>
          <button className='px-8 py-3.5 rounded-full border border-white/20 text-white/80 hover:bg-white/5 transition-all'>
            Explore Blogs
          </button>
        </div>
      </div>

      {/* Blogs */}
      <div className='max-w-6xl mx-auto px-6 pb-20'>
        <h2 className='text-3xl font-bold mb-10'>Latest Articles</h2>

        {loading ? (
          <div className='text-center text-white/40 py-20'>Loading...</div>
        ) : blogs.length === 0 ? (
          <div className='text-center text-white/40 py-20'>
            No blogs yet! Be first! ✍️
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {blogs.map((blog, i) => (
              <div
                key={blog._id}
                onClick={() => navigate(`/blog/${blog._id}`)}
                className='bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-violet-500/30 transition-all duration-300'
              >
                <div className={`h-44 bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-5xl`}>
                  📝
                </div>
                <div className='p-6'>
                  <div className='text-violet-400 text-xs font-medium uppercase tracking-widest mb-2'>
                    Technology
                  </div>
                  <h3 className='font-bold text-lg leading-snug mb-2'>
                    {blog.title}
                  </h3>
                  <p className='text-white/40 text-sm leading-relaxed mb-5 line-clamp-2'>
                    {blog.content}
                  </p>
                  <div className='flex justify-between items-center pt-4 border-t border-white/10'>
                    <div className='flex gap-2.5 items-center'>
                      <div className='w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold'>
                        {blog.author?.name?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <div className='text-xs font-medium'>{blog.author?.name}</div>
                        <div className='text-xs text-white/30'>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className='text-xs text-white/30'>
                      💬 {blog.comments?.length || 0}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home