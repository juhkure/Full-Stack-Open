const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')
const assert = require('node:assert')




beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    console.log('done')
})



test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('the first blog is about React Patterns', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(e => e.title)
    // is the parameter truthy
    assert(titles.includes('React patterns'))
})

test('blog identifier is named correctly', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
        assert.ok(blog.id)
        assert.ok(!blog._id)
    })
})

test('adding a blog with HTTP POST call', async () => {
    const startingAmount = await Blog.find({})

    const newBlog = {
        _id: '96asd12323gvs231cas31233',
        title: "asdkokoasdk",
        author: "kokokokdd",
        url: "kokokd.com,",
        likes: 30,
        __v: 0
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const endAmount = await Blog.find({})
    assert.strictEqual(endAmount.length, startingAmount.length + 1)

})

test('adding a blog without likes sets it to 0', async () => {
    const newBlog = {
        title: "testtitle",
        author: "testauthor",
        url: "testurl"
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const addedBlog = response.body.find(blog => blog.title === newBlog.title)

    assert.strictEqual(addedBlog.likes, 0)
})

test('adding a blog without title is rejected', async () => {
    const newBlog = {
        author: "asdkaosdk",
        url: "okoaksdok"
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const endAmount = await Blog.find({})
    assert.strictEqual(endAmount.length, helper.initialBlogs.length)
})

test('adding a blog without url is rejected', async () => {
    const newBlog = {
        author: "asdkddk",
        title: "kodkoko"
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const endAmount = await Blog.find({})
    assert.strictEqual(endAmount.length, helper.initialBlogs.length)
})

/* describe('adding a blog', () => {
    test('without author is not added', async () => {
        const newBlog = {
            title: "asd"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, 4)
    })
}) */

after(async () => {
    await mongoose.connection.close()
})