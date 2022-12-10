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

afterAll(() => {
  mongoose.connection.close();
});
