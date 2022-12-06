const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => {
    return acc + curr.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const blog = blogs.reduce((acc, curr) => {
    return curr.likes > acc.likes ? curr : acc;
  });

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const authors = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({
      author: key,
      blogs: value.length,
    }))
    .value();

  const withMostBlogs = authors.reduce((acc, curr) => {
    return curr.blogs > acc.blogs ? curr : acc;
  });

  return withMostBlogs;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const authors = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({
      author: key,
      likes: value.reduce((acc, curr) => acc + curr.likes, 0),
    }))
    .value();

  const withMostLikes = authors.reduce((acc, curr) => {
    return curr.likes > acc.likes ? curr : acc;
  });

  return withMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
