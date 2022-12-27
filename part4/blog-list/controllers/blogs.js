const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  if (!body.title || !body.url) {
    return response.status(400).send({
      error: ' title or url is missing',
    });
  }
  const users = await User.find({});
  const blog = new Blog({ ...body, user: users[0]._id });

  const savedBlog = await blog.save();
  users[0].blogs = users[0].blogs.concat(savedBlog._id);
  await users[0].save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    response.status(400).send();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
