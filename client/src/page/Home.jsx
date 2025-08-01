import React, { useEffect, useState } from 'react';

import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <div className="text-center py-12">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
        <h2 className="font-bold text-[#6469ff] text-2xl mb-2">{title}</h2>
        <p className="text-gray-500 text-sm">Be the first to create something amazing! 🎨</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert('Unable to load community creations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => 
          item.name.toLowerCase().includes(searchText.toLowerCase()) || 
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="font-extrabold text-[#222328] text-[40px] mb-4">
          🎨 Community Gallery
        </h1>
        <p className="text-[#666e75] text-[18px] max-w-[600px] mx-auto leading-relaxed">
          Discover incredible AI-generated masterpieces from creative minds around the world. 
          Get inspired and share your own artistic vision with the community.
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <FormField
            labelName="🔍 Explore Creations"
            type="text"
            name="text"
            placeholder="Search by artist name or prompt description..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mb-8">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <Loader />
              <p className="text-gray-500 mt-4 text-lg">Loading amazing creations...</p>
            </div>
          </div>
        ) : (
          <>
            {searchText && (
              <div className="mb-8 text-center">
                <h2 className="font-semibold text-[#666e75] text-xl mb-2">
                  🎯 Search Results for <span className="text-[#222328] font-bold">"{searchText}"</span>
                </h2>
                <p className="text-gray-500 text-sm">
                  Found {searchedResults?.length || 0} matching creations
                </p>
              </div>
            )}
            
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No matching creations found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="Gallery is empty"
                />
              )}
            </div>

            {/* Stats Section */}
            {!searchText && allPosts && allPosts.length > 0 && (
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                  <p className="text-[#666e75] text-lg">
                    ✨ <span className="font-bold text-[#222328]">{allPosts.length}</span> amazing creations shared by the community
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
