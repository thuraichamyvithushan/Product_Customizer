import { useEffect, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Proudly Australian",
      description: "As a local company, we're committed to delivering products that resonate with the Aussie spirit—bold, creative, and built to last.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Preserve Your Memories",
      description: "We're here to help you transform your favourite moments into tangible keepsakes, whether it's a phone case from one of our vending machines or a custom creation from our online store.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Unmatched Quality",
      description: "With cutting-edge technology, intuitive interfaces, and a focus on vibrant, durable prints, Alien Snail ensures a seamless experience and a premium product every time.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: "Perfect for Gifting",
      description: "Our personalised products make thoughtful, one-of-a-kind gifts that capture the moments that matter most.",
    },
  ];

  const whatWeDo = [
    {
      title: "Offline Innovation",
      description: "Our Alien Snail vending machines, found in prime locations like City Cross in Rundle Mall, Westfield Warringah Mall, and more, provide a fast, user-friendly experience for creating personalised phone cases on the spot.",
      details: "Simply scan a QR code, upload your image, and watch your custom case come to life in minutes!",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
    },
    {
      title: "Online Customisation",
      description: "Our newly upgraded website, snapshell.com.au, brings you a broader range of personalised products.",
      details: "From phone cases to unique gift items, we make it easy to design something truly special for yourself or your loved ones.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      title: "Gift-Ready Solutions",
      description: "Looking for the perfect gift? Alien Snail's custom products are designed to make every occasion memorable.",
      details: "Whether it's a heartfelt photo for a birthday, anniversary, or just because, our products are the ideal way to show you care.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className={`text-center mb-16 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}>
        <h1 className="text-3xl md:text-5xl font-bold text-[#0a214f] mb-4">
          About Alien Snail
        </h1>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#0a214f] to-transparent mx-auto mb-4 animate-pulse"></div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Custom Phone Case Printing in Australia
        </p>
      </div>

      {/* Welcome Section */}
      <div className={`mb-16 transition-all duration-1000 delay-100 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="bg-blue-50 rounded-xl p-8 md:p-10 border-2 border-blue-200 shadow-lg">
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center">
            Welcome to Alien Snail, Australia's proudly homegrown leader in custom phone case vending machines and personalised product solutions. Born right here in Australia, we're passionate about helping you capture and preserve your most cherished moments through innovative, high-quality, and fully customised products.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className={`mb-16 transition-all duration-700 delay-200 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a214f]">Our Story</h2>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            At Alien Snail, we believe that every memory deserves to be celebrated. From our state-of-the-art custom phone case vending machines located in the heart of Adelaide and Sydney to our exciting new range of online personalised products, we're dedicated to making self-expression effortless and meaningful. As a local Australian company, we take pride in understanding what Aussies love—unique, high-quality products that reflect individuality and creativity.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our journey began with our revolutionary vending machines, allowing customers to create vibrant, durable phone cases using any photo from their camera roll in just 4-5 minutes. Now, we've expanded our vision to offer an even wider range of customisable products online, giving you endless ways to turn your favourite moments into keepsakes or thoughtful gifts.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className={`mb-16 transition-all duration-700 delay-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a214f]">What We Do</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {whatWeDo.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform group"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-[#0a214f] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
                <div className="text-white">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0a214f] transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-700 mb-3 leading-relaxed">
                {item.description}
              </p>
              <p className="text-sm text-gray-600 italic">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose SnapShell Section */}
      <section className={`mb-16 transition-all duration-700 delay-400 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a214f]">Why Choose Alien Snail?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 transform group"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0a214f] transition-colors">
                  <div className="text-[#0a214f] group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#0a214f] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Mission Section */}
      <section className={`mb-16 transition-all duration-700 delay-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 md:p-10 border-2 border-blue-200 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a214f]">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-800 leading-relaxed">
            At Alien Snail, our mission is simple: to empower you to express your individuality and preserve your memories in any moment you choose. Whether you're visiting one of our vending machines or exploring our online customisation options, we're here to make every experience fun, fast, and unforgettable.
          </p>
        </div>
      </section>

      {/* Join the Community Section */}
      <section className={`transition-all duration-700 delay-600 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 border-2 border-blue-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a214f] mb-4">
              Join the Alien Snail Community
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              We're more than just a brand we're a community of Aussies who love to celebrate life's moments, big and small. Follow us on Instagram and TikTok to see how our customers are creating their own Alien Snail stories, and visit our website to start designing your personalised products today.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              className="flex items-center gap-2 px-6 py-3 bg-blue-50 rounded-lg border-2 border-blue-200 hover:border-[#0a214f] hover:bg-[#0a214f] hover:text-white transition-all duration-300 transform hover:scale-105 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
              <span className="font-semibold">Instagram</span>
            </button>
            <button
              className="flex items-center gap-2 px-6 py-3 bg-blue-50 rounded-lg border-2 border-blue-200 hover:border-[#0a214f] hover:bg-[#0a214f] hover:text-white transition-all duration-300 transform hover:scale-105 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
              <span className="font-semibold">TikTok</span>
            </button>
            <button
              className="flex items-center gap-2 px-6 py-3 bg-[#0a214f] text-white rounded-lg border-2 border-[#0a214f] hover:bg-white hover:text-[#0a214f] transition-all duration-300 transform hover:scale-105 group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="font-semibold">Visit Website</span>
            </button>
          </div>

          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-lg text-gray-800 font-medium">
              Thank you for choosing Alien Snail, where your memories become extraordinary.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

