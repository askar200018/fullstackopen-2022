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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
