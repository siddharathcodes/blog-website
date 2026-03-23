import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios'

const SingleBlog = () => {
  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`)
        setBlog(res.data.blog)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchBlog()
  }, [id])

  const handleComment = async () => {
    if (!token) return navigate('/login')
    try {
      const res = await API.post(`/blogs/${id}/comment`, { text: comment })
      setBlog(res.data.blog)
      setComment('')
    } catch (error) {
      alert(error.response?.data?.message)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this blog?')) return
    try {
      await API.delete(`/blogs/${id}`)
      navigate('/')
    } catch (error) {
      alert(error.response?.data?.message)
    }
  }

  if (loading) return (
    <div className='min-h-screen flex items-center justify-center text-white/40'>
      Loading...
    </div>
  )

  if (!blog) return (
    <div className='min-h-screen flex items-center justify-center text-white/40'>
      Blog not found!
    </div>
  )

  const isOwner = user.id === blog.author?._id

  return (
    <div className='min-h-screen pt-28 pb-20 px-6'>
      <div className='max-w-2xl mx-auto'>

        {/* Header */}
        <div className='mb-8'>
          <div className='text-violet-400 text-xs font-medium uppercase tracking-widest mb-3'>
            Technology
          </div>
          <h1 className='text-4xl font-black leading-tight mb-4'>
            {blog.title}
          </h1>
          <div className='flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <div className='w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center font-bold'>
                {blog.author?.name?.charAt(0)}
              </div>
              <div>
                <div className='font-medium text-sm'>{blog.author?.name}</div>
                <div className='text-white/30 text-xs'>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            {isOwner && (
              <div className='flex gap-2'>
                <button
                  onClick={handleDelete}
                  className='px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-all'
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='h-px bg-white/10 mb-8' />

        {/* Content */}
        <div className='text-white/80 leading-relaxed text-lg mb-12 whitespace-pre-wrap'>
          {blog.content}
        </div>

        <div className='h-px bg-white/10 mb-8' />

        {/* Comments */}
        <div>
          <h2 className='text-xl font-bold mb-6'>
            Comments ({blog.comments?.length || 0})
          </h2>

          {token ? (
            <div className='flex gap-3 mb-8'>
              <div className='w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex-shrink-0 flex items-center justify-center text-sm font-bold'>
                {user.name?.charAt(0)}
              </div>
              <div className='flex-1'>
                <input
                  type='text'
                  placeholder='Write a comment...'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-all mb-2'
                />
                <button
                  onClick={handleComment}
                  className='px-5 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-pink-500 text-white text-sm font-medium'
                >
                  Post Comment
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => navigate('/login')}
              className='mb-8 p-4 rounded-xl bg-white/5 border border-white/10 text-center text-white/40 text-sm cursor-pointer hover:bg-white/8 transition-all'
            >
              Login to add a comment →
            </div>
          )}

          <div className='space-y-4'>
            {blog.comments?.map((c) => (
              <div key={c._id} className='flex gap-3'>
                <div className='w-8 h-8 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center text-xs font-bold'>
                  {c.user?.name?.charAt(0) || 'A'}
                </div>
                <div className='flex-1 bg-white/5 rounded-xl p-4'>
                  <div className='flex justify-between items-center mb-1'>
                    <span className='text-sm font-medium'>{c.user?.name || 'Anonymous'}</span>
                    <span className='text-xs text-white/30'>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className='text-white/60 text-sm'>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleBlog