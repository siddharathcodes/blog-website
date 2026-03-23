const Blog = require('../models/Blog')

// GET ALL BLOGS - PUBLIC
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
    res.status(200).json({ blogs })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET SINGLE BLOG - PUBLIC
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email')
      .populate('comments.user', 'name')
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    res.status(200).json({ blog })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// CREATE BLOG - PROTECTED
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body
    if (!title || !content) {
      return res.status(400).json({ message: 'All fields required' })
    }
    const image = req.file ? req.file.filename : null
    const blog = await Blog.create({
      title,
      content,
      image,
      author: req.user._id
    })
    res.status(201).json({ message: 'Blog created!', blog })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// UPDATE BLOG - PROTECTED
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized!' })
    }
    const { title, content } = req.body
    blog.title = title || blog.title
    blog.content = content || blog.content
    if (req.file) {
      blog.image = req.file.filename
    }
    await blog.save()
    res.status(200).json({ message: 'Blog updated!', blog })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE BLOG - PROTECTED
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized!' })
    }
    await blog.deleteOne()
    res.status(200).json({ message: 'Blog deleted!' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ADD COMMENT - PROTECTED
const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }
    const { text } = req.body
    if (!text) {
      return res.status(400).json({ message: 'Comment text required' })
    }
    blog.comments.push({
      user: req.user._id,
      text
    })
    await blog.save()
    res.status(200).json({ message: 'Comment added!', blog })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  addComment
}