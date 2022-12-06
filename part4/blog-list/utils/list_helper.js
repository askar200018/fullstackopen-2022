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

  const withMostBlogs = Object.entries(authors).reduce((acc, [key, value]) => {
    if (acc === null || value > acc.blogs) {
      return {
        author: key,
        blogs: value,
      };
    }

    return acc;
  }, null);

  return withMostBlogs;
};

const mostLikes = (blogs) => {
  const authors = blogs.reduce((acc, { author, likes }) => {
    if (Object.prototype.hasOwnProperty.call(acc, author)) {
      acc[author] += likes;
    } else {
      acc[author] = likes;
    }
    return acc;
  }, {});

  const withMostLikes = Object.entries(authors).reduce((acc, [key, value]) => {
    if (acc === null || value > acc.likes) {
      return {
        author: key,
        likes: value,
      };
    }

    return acc;
  }, null);

  return withMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
