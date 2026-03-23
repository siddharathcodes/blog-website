import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className='fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10'>
      <div className='max-w-6xl mx-auto px-6 py-4 flex justify-between items-center'>
        <Link to='/' className='text-2xl font-black bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent'>
          ✦ BlogSpace
        </Link>
        <div className='hidden md:flex gap-3 items-center'>
          <Link to='/' className='px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all'>Home</Link>
          {token && <Link to='/create' className='px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all'>Write</Link>}
          {token ? (
            <>
              <Link to='/dashboard' className='px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all'>Dashboard</Link>
              <button onClick={handleLogout} className='px-5 py-2 rounded-full text-sm bg-white/10 hover:bg-white/20 transition-all'>Logout</button>
            </>
          ) : (
            <>
              <Link to='/login' className='px-4 py-2 rounded-full text-sm text-white/70 hover:bg-white/10 transition-all'>Login</Link>
              <Link to='/register' className='px-5 py-2 rounded-full text-sm bg-gradient-to-r from-violet-500 to-pink-500 text-white'>Get Started</Link>
            </>
          )}
        </div>
        <button className='md:hidden text-2xl' onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <div className='md:hidden flex flex-col gap-2 px-6 pb-4 bg-black/90'>
          <Link to='/' onClick={() => setOpen(false)} className='py-2 text-white/70'>Home</Link>
          {token ? (
            <>
              <Link to='/create' onClick={() => setOpen(false)} className='py-2 text-white/70'>Write</Link>
              <Link to='/dashboard' onClick={() => setOpen(false)} className='py-2 text-white/70'>Dashboard</Link>
              <button onClick={handleLogout} className='py-2 text-left text-white/70'>Logout</button>
            </>
          ) : (
            <>
              <Link to='/login' onClick={() => setOpen(false)} className='py-2 text-white/70'>Login</Link>
              <Link to='/register' onClick={() => setOpen(false)} className='py-2 text-violet-400'>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar