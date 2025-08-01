# �� AI Image Generator - DALL-E Clone

A modern, full-stack web application that allows users to create stunning AI-generated images using OpenAI's DALL-E API and share them with a creative community.

![AI Image Generator](https://img.shields.io/badge/React-18.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![OpenAI](https://img.shields.io/badge/OpenAI-DALL--E-orange)

## ✨ Features

- **🤖 AI Image Generation**: Create unique images using DALL-E 3 with custom prompts
- **🎯 Smart Prompt Suggestions**: Get inspired with random creative prompts
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices
- **🔍 Search & Discover**: Find and explore community creations by artist name or prompt
- **☁️ Cloud Storage**: Images automatically uploaded to Cloudinary for reliable storage
- **💾 Database Integration**: MongoDB Atlas for persistent data storage
- **⬇️ Download Images**: Save your favorite creations locally
- **🎪 Community Gallery**: Browse and get inspired by other artists' work

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### External APIs & Services
- **OpenAI DALL-E 3** - AI image generation
- **Cloudinary** - Cloud image storage
- **MongoDB Atlas** - Cloud database hosting

## 🚀 Quick Start

### Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

### Required Accounts & API Keys

You'll need to create accounts and get API keys from:

1. **OpenAI** - [Get API Key](https://platform.openai.com/api-keys)
2. **MongoDB Atlas** - [Create Database](https://www.mongodb.com/atlas)
3. **Cloudinary** - [Create Account](https://cloudinary.com/)

## �� Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-image-generator.git
cd ai-image-generator
```

### 2. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration

#### Server Environment Variables

Create a `.env` file in the `server` directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-your-openai-api-key-here

# MongoDB Configuration
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=8080
```

#### How to Get Your API Keys

**OpenAI API Key:**
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it in your `.env` file

**MongoDB Atlas:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Get your connection string
6. Replace the placeholder in your `.env` file

**Cloudinary:**
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Go to Dashboard
4. Copy your Cloud Name, API Key, and API Secret
5. Add them to your `.env` file

### 4. Start the Application

#### Start the Backend Server

```bash
# Navigate to server directory
cd server

# Start the server
npm start
```

You should see:

### 🌐 Home Page – Discover & Explore
A beautifully designed landing page showcasing community-generated AI images with a responsive masonry grid, search functionality, and prompt previews.

![AI Image Generator Home Page](./assets/homepage.png)

---

### 🎨 Create Page – Generate with Prompts
An intuitive creation interface where users can input custom prompts or use surprise suggestions to generate stunning visuals using OpenAI's DALL·E. Includes real-time image generation and Cloudinary integration.

![AI Image Generator Creation Page](./assets/createimage.png)

---



**Made by [Jeet Patel](https://github.com/jeetpatel1405)**
