
// Add multer to create + update!
const upload = require('../middleware/multer')
const express = require('express')
const router = express.Router()
const {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment
} = require('../controllers/blogController')
const protect = require('../middleware/authMiddleware')

// public routes
router.get('/', getAllBlogs)
router.get('/:id', getSingleBlog)

// protected routes
router.post('/', protect, createBlog)
router.put('/:id', protect, updateBlog)
router.delete('/:id', protect, deleteBlog)
router.post('/:id/comment', protect, addComment)
router.post('/', protect, upload.single('image'), createBlog)
router.put('/:id', protect, upload.single('image'), updateBlog)

module.exports = router