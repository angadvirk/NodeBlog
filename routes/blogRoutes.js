const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/', blogController.getAllBlogs);
router.post('/', blogController.createBlog);
router.get('/create', (req, res) => res.render('blogs/create', { title: "Create" }));
router.get('/:id', blogController.getBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;