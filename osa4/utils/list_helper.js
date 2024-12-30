const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const bestBlog = blogs.reduce((highest, current) => {
        if (current.likes > highest.likes) {
            return current
        } else {
            return highest
        }
    })

    return { title: bestBlog.title, author: bestBlog.author, likes: bestBlog.likes }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}