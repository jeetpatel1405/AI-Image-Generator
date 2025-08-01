import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();


// Initialize OpenAI with new API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware to parse JSON
router.use(express.json({ limit: '10mb' }));

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    console.log('Received POST request to /dalle');
    const { prompt } = req.body;
    console.log('Prompt received:', prompt);

    // Input validation
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (prompt.length > 1000) {
      return res.status(400).json({ error: 'Prompt is too long. Maximum 1000 characters allowed.' });
    }

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.log('API Key not found in environment');
      return res.status(500).json({ error: 'OpenAI API key is not configured' });
    }

    console.log('Making request to OpenAI API...');
    const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    console.log('OpenAI response received');
    const image = aiResponse.data[0].b64_json;
    
    if (!image) {
      return res.status(500).json({ error: 'Failed to generate image' });
    }

    console.log('Sending image response');
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error('DALL-E API Error:', error);
    console.error('Error details:', error.message);
    
    // Handle specific OpenAI errors
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.error?.message || 'OpenAI API error';
      return res.status(statusCode).json({ error: errorMessage });
    }
    
    // Handle network or other errors
    res.status(500).json({ error: 'Something went wrong while generating the image' });
  }
});

export default router;
