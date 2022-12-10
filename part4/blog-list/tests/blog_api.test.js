const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');

const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('should return all blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('unique identifier id should be defined in blog', async () => {
  const response = await api.get('/api/blogs');
  const blog = response.body[0];

  expect(blog.id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'new author',
    url: 'new:url',
    likes: 10,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map((blog) => blog.title);

  expect(titles).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain(newBlog.title);
});

afterAll(() => {
  mongoose.connection.close();
});
