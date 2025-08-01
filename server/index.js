import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    console.log('Connecting to MongoDB...');
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log('Server started on port 8080');
      console.log('Available routes:');
      console.log('- GET  /api/v1/post');
      console.log('- POST /api/v1/post');
      console.log('- GET  /api/v1/dalle');
      console.log('- POST /api/v1/dalle');
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
