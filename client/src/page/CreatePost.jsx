import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide a creative prompt to generate an image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('🎉 Your masterpiece has been shared with the community!');
        navigate('/');
      } catch (err) {
        alert('Oops! Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image first before sharing');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="font-extrabold text-[#222328] text-[40px] mb-4">Create Your Masterpiece</h1>
        <p className="text-[#666e75] text-[18px] max-w-[600px] mx-auto leading-relaxed">
          Transform your imagination into stunning visuals with the power of AI. 
          Share your creations with a community of digital artists and creators.
        </p>
      </div>

      <form className="max-w-4xl mx-auto" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Form Fields */}
          <div className="space-y-6">
            <FormField
              labelName="Artist Name"
              type="text"
              name="name"
              placeholder="Enter your creative name..."
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Creative Prompt"
              type="text"
              name="prompt"
              placeholder="Describe your vision... e.g., A cyberpunk cityscape at sunset with flying cars"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />

            <div className="space-y-4">
              <button
                type="button"
                onClick={generateImage}
                disabled={generatingImg || !form.prompt}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl py-4 px-6 text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {generatingImg ? (
                  <span className="flex items-center justify-center">
                    <Loader />
                    <span className="ml-2">Creating Magic...</span>
                  </span>
                ) : (
                  '✨ Generate Image'
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Image Preview */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#222328] mb-4">Your Creation</h3>
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-2xl w-full aspect-square flex justify-center items-center overflow-hidden transition-all duration-300 hover:border-gray-400">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-center">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-24 h-24 mx-auto mb-4 opacity-40"
                  />
                  <p className="text-gray-500 text-sm">Your AI-generated image will appear here</p>
                </div>
              )}

              {generatingImg && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex justify-center items-center">
                  <div className="text-center">
                    <Loader />
                    <p className="text-white mt-2 text-sm">AI is crafting your vision...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <p className="text-[#666e75] text-[16px] mb-4">
              ✨ Ready to inspire others? Share your creation with the community!
            </p>
            <button
              type="submit"
              disabled={loading || !form.photo}
              className="bg-gradient-to-r from-[#6469ff] to-[#8b5cf6] hover:from-[#5a5fef] hover:to-[#7c3aed] text-white font-semibold rounded-xl py-4 px-8 text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader />
                  <span className="ml-2">Sharing...</span>
                </span>
              ) : (
                '🚀 Share with Community'
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
