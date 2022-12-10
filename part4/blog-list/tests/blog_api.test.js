const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
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

  expect(response.body).toHaveLength(helper.initialBlogs.length);
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

  expect(titles).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain(newBlog.title);
});

test('a blog without likes should be added with 0 likes', async () => {
  const blogWithoutLikes = {
    title: 'new blog',
    author: 'new author',
    url: 'new:url',
  };

  const postResponse = await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map((blog) => blog.title);

  expect(postResponse.body.likes).toBe(0);
  expect(titles).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain(blogWithoutLikes.title);
});

test('a blog without title is not added', async () => {
  const newBlog = {
    author: 'new author',
    url: 'new:url',
    likes: 10,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDB();
  console.log({ blogsAtEnd });
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('a blog without url is not added', async () => {
  const newBlog = {
    title: 'new blog',
    author: 'new author',
    likes: 10,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
