const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const dotenv = require('dotenv');

// Express app
const app = express();
dotenv.config();

// MongoDB connection 
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
.then((result) => {
  console.log("connected to MongoDB")
  app.listen(3000, 'localhost', () => console.log("listening on port 3000"));
})
.catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

// routes & route handlers
app.get('/', (req, res) => res.redirect('/blogs'));
app.get('/about', (req, res) => res.render('about', { title: "About" }));
app.use('/blogs', blogRoutes);
app.use((req, res) => res.status(404).render('404', { title: '404 - Not Found' }));