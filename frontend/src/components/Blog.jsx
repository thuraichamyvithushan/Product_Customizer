import { useEffect, useState } from "react";
import blogImg1 from "../assets/blog/1.webp";
import blogImg2 from "../assets/blog/2.webp";
import blogImg3 from "../assets/blog/3.webp";
import blogImg4 from "../assets/blog/4.webp";
import blogImg5 from "../assets/blog/5.webp";
import blogImg6 from "../assets/blog/6.webp";
import blogImg7 from "../assets/blog/7.webp";
import blogImg8 from "../assets/blog/8.webp";

const Blog = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "How Handmade Gifts Create Deeper Emotional Value",
      date: "November 26, 2025",
      author: "Easify",
      excerpt: "Discover why handmade gifts hold more emotional significance and create lasting memories compared to mass-produced items.",
      image: blogImg1
    },
    {
      id: 2,
      title: "Printed vs Handmade Pet Blankets — What's the Difference?",
      date: "November 25, 2025",
      author: "Easify",
      excerpt: "Explore the key differences between printed and handmade pet blankets, and find out which option is best for your furry friend.",
      image: blogImg2
    },
    {
      id: 3,
      title: "Why Pet Portrait Gifts Are the Perfect Birthday Gift in 2025",
      date: "November 24, 2025",
      author: "Easify",
      excerpt: "Learn why personalized pet portrait gifts are becoming the go-to birthday present for pet lovers everywhere.",
      image: blogImg3
    },
    {
      id: 4,
      title: "How to Create a Custom Pet Pillow (Step-by-Step Guide)",
      date: "November 21, 2025",
      author: "Easify",
      excerpt: "A comprehensive guide to creating your own custom pet pillow, from design to completion.",
      image: blogImg4
    },
    {
      id: 5,
      title: "🐶 Best Personalised Pet Gifts for Dog Lovers in 2025",
      date: "November 20, 2025",
      author: "GaoDave",
      excerpt: "Discover the top personalized pet gift ideas that will make any dog lover's day special.",
      image: blogImg5
    },
    {
      id: 6,
      title: "Why Handmade Custom Phone Cases Are Trending in Australia",
      date: "November 19, 2025",
      author: "GaoDave",
      excerpt: "Find out why Australians are embracing handmade custom phone cases and what makes them so popular.",
      image: blogImg6
    },
    {
      id: 7,
      title: "Why Custom Pet Supplies Are the Best Way to Spoil Your Furry Family Member",
      date: "November 18, 2025",
      author: "GaoDave",
      excerpt: "Learn how custom pet supplies can show your pets how much you care while providing them with unique, personalized items.",
      image: blogImg7
    },
    {
      id: 8,
      title: "📱🐾 Why Handmade Custom Phone Cases & Pet Gifts Are Booming in Australia | Alien Snail",
      date: "November 18, 2025",
      author: "GaoDave",
      excerpt: "An in-depth look at the growing trend of handmade custom phone cases and pet gifts in the Australian market.",
      image: blogImg8
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className={`text-center mb-12 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}>
        <h1 className="text-3xl md:text-5xl font-bold text-[#0a214f] mb-4">
          News
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#0a214f] to-transparent mx-auto mb-4 animate-pulse"></div>
        <div className="flex items-center justify-center gap-4 mt-6">
          <button className="px-6 py-2 rounded-lg font-semibold text-sm bg-[#0a214f] text-white border-2 border-[#0a214f] transition-all duration-300 hover:scale-105 shadow-lg">
            All ({blogPosts.length})
          </button>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {blogPosts.map((post, idx) => (
          <article
            key={post.id}
            className={`group bg-white rounded-xl shadow-lg border-2 border-blue-200 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              animationDelay: `${idx * 100}ms`,
              transition: `all 0.5s ease-out ${idx * 100}ms`
            }}
          >
            {/* Blog Image */}
            <div className="w-full h-48 relative overflow-hidden bg-gray-100">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-[#0a214f] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  {post.date}
                </span>
                <span className="text-xs text-gray-500">by {post.author}</span>
              </div>
              
              <h2 className="text-lg md:text-xl font-bold text-[#0a214f] mb-3 transition-colors duration-300 group-hover:text-blue-600 line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-sm font-semibold text-[#0a214f] transition-all duration-300 group-hover:gap-3">
                <span>Read More</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Info Section */}
      <div className={`text-center transition-all duration-700 delay-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-blue-200">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#0a214f] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 animate-pulse">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 transition-all duration-300 hover:text-[#0a214f]">Stay Updated</h3>
          </div>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Keep up with the latest news, tips, and trends about custom phone cases and personalized pet gifts. Check back regularly for new articles and updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;

