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
  const authors = blogs.reduce((acc, { author }) => {
    if (Object.prototype.hasOwnProperty.call(acc, author)) {
      acc[author] += 1;
    } else {
      acc[author] = 1;
    }
    return acc;
  }, {});

  const mostBlogs = Object.entries(authors).reduce((acc, [key, value]) => {
    if (acc === null || value > acc.blogs) {
      return {
        author: key,
        blogs: value,
      };
    }

    return acc;
  }, null);

  return mostBlogs;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
