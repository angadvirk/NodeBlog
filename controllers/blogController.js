const Blog = require('../models/blog');

const getAllBlogs = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
  .then((result) => {
    res.render('blogs/index', { title: "Blogs", blogs: result } )
  })
  .catch((err) => {
    console.log(err);
    res.status(404).render('404', { title: '404 - Not Found' });
  });
};
const getBlog = (req, res) => {
  Blog.findById(req.params.id)
  .then((result) => {
    res.render('blogs/details', { blog: result, title: 'Blog Details' } )
  })
  .catch((err) => {
    console.log(err);
    res.status(404).render('404', { title: '404 - Not Found' });
  })
};
const createBlog = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
  .then(result => {
    res.redirect('/blogs');
  })
  .catch(err => {
    console.log(err);
  })
};
const deleteBlog = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
  .then(result => {
    res.json({redirect: '/blogs'});
  })
  .catch(err => {
    console.log(err);
  })
};

module.exports = {
  getAllBlogs,
  getBlog,
  createBlog,
  deleteBlog
};