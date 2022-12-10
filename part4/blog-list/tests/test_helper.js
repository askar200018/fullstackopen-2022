const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'VS Code',
    author: 'VS CODE',
    url: 'vscode:url',
    likes: 2,
  },
  {
    title: 'Python',
    author: 'Developer',
    url: 'python:url',
    likes: 100,
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDB,
};
