require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDb=require("./utils/db")


const app = express();


const corsOptions={
    origin:"http://localhost:3000",
    methods:"GET,POST,DELETE",
    
}

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Connect to MongoDB
connectDb()

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
});

const Blog = mongoose.model('Blog', blogSchema);

// Routes
app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});



// GET request to fetch all blogs
app.get('/blogs', (req, res) => {
    Blog.find()
      .then(blogs => res.status(200).json(blogs))
      .catch(err => {
        console.error('Error fetching blogs:', err);
        res.status(500).json({ error: 'Internal server error' });
      });
  });
  
  
  // GET request to fetch a single blog by ID
  app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(blog => {
        if (blog) {
          res.json(blog);
        } else {
          res.status(404).json({ error: "Blog not found" });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });
  
  // DELETE request to delete a blog by ID
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then(result => {
        if (result) {
          res.status(200).json({ message: 'Blog deleted successfully' });
        } else {
          res.status(404).json({ error: 'Blog not found' });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  });

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
