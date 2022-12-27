const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  console.log('here wea re');
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

  const user = request.user;
  console.log({ user });
  const blog = new Blog({ ...body, user: user._id });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(400).json({
        error: 'wrong owner id',
      });
    }
    await blog.remove();
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
