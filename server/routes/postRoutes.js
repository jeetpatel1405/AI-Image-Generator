import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

// Middleware to parse JSON
router.use(express.json({ limit: '50mb' }));

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    console.log('Fetching posts from database...');
    const posts = await Post.find({}).sort({ createdAt: -1 });
    console.log(`Found ${posts.length} posts`);
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    
    // Input validation
    if (!name || !prompt || !photo) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, prompt, and photo are required' 
      });
    }

    console.log('Uploading image to Cloudinary...');
    const photoUrl = await cloudinary.uploader.upload(photo);

    console.log('Creating post in database...');
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    console.log('Post created successfully:', newPost._id);
    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default router;
