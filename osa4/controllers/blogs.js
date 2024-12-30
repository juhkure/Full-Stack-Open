const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')

const generateRandId = () => {
    const Id = Math.floor(1000 * Math.random()) + 1
    return String(Id)
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    if (!body.title || !body.url) {
        response.status(400).json({ error: 'no title or url' })
    } else {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        })

        blog.save().then((savedBlog) => {
            response.status(201).json(savedBlog)
        }).catch((error) => {
            next(error)
        })
    }


})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const deletableBlog = await Blog.findById(request.params.id)
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json(deletableBlog)
})

module.exports = blogsRouter