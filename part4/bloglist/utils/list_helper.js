const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return (
    blogs.reduce((acc, curr) => acc + curr.likes, 0)
  )
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return (null)
  const likesBlogs = blogs.map(blog => blog.likes)
  const maxIndex = likesBlogs.reduce((iMax, cv, ci, arr) => cv > arr[iMax] ? ci : iMax, 0)
  return (
    blogs[maxIndex]
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
