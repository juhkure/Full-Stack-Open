const blogsRouter = require('express').Router()
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

    const blog = new Blog({
        id: generateRandId(),
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
})

module.exports = blogsRouter