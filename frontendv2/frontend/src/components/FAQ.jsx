import { useState, useEffect } from "react";

const FAQ = () => {
  const [openSection, setOpenSection] = useState(null);
  const [openQuestions, setOpenQuestions] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const shoppingLocations = {
    sa: [
      "📍City Cross, Rundle Mall (Near the food court)",
      "📍Brickworks Marketplace (In front of Woolworths)",
    ],
    nsw: [
      "📍UTS (BUILDING 5 COURTARD)",
      "📍Westfield Eastgardens (Level 3, lift outside Hoyts)",
      "📍Westfield Hornsby (Level 3, opposite NRMA / Chemist Warehouse)",
      "📍Westfield Parramatta (Level 1 lift lobby, near Medibank)",
      "📍Westfield Sydney (QVBNext to the reception)",
      "📍Westfield Warringah (Level 2 & Behind McDonald's)",
      "📍Wwestfield Miranda (Foot Locker & Cotton On)",
      "📍Castle Towers (Station tunnel, near McDonald's)",
      "📍Westpoint Blacktown (at G floor food core)",
      "📍Tramsheds (On the top floor)",
      "📍Balgowlah Village Centre (B1 to Ground Floor)",
      "📍Pemulwuy Marketplace (At Woolworths entrance)",
      "📍Forestway Shopping Centre",
      "📍Stanhope Village (Near the food court)",
      "📍Emerton Village (At Woolworths entrance)",
      "📍Ed.Square Shopping Centre (B1 parking to G Floor)",
    ],
  };

  const phoneModels = {
    iphone: [
      "iPhone 17, 17Pro, 17Air, 17ProMax",
      "iPhone 16, 16Plus, 16Pro, 16ProMax",
      "iPhone 15, 15Pro, 15Plus, 15ProMax",
      "iPhone 14, 14Pro, 14Plus, 14ProMax",
      "iPhone 13, 13Pro, 13ProMax, 13 Mini",
      "iPhone 12, 12Pro, 12ProMax, 12 Mini",
      "iPhone 11, 11 Pro, 11 Pro Max",
      "iPhone X/XS",
      "iPhone XSMAX",
      "iPhone XR",
    ],
    samsung: [
      "S25, S25+, S25 ULTRA",
      "S24, S24+, S24 ULTRA, S24 Fe",
      "S23, S23+, S23 ULTRA, S23 Fe",
      "S22, S22+, S22 ULTRA",
      "S21, S21+, S21 ULTRA",
      "Samsung Z Flip6",
      "Samsung Z Flip7",
    ],
    google: [
      "Google Pixel 8, 8 Pro",
      "Google Pixel 9/9 Pro, 9 Pro XL",
    ],
    magsafe: {
      iphone: [
        "iPhone 16, 16Plus, 16Pro, 16ProMax",
        "iPhone 15, 15Pro, 15Plus, 15ProMax",
        "iPhone 14, 14Pro, 14Plus, 14ProMax",
        "iPhone 13, 13Pro, 13ProMax",
        "iPhone 12, 12Pro, 12ProMax",
      ],
      samsung: [
        "S25, S25+, S25 ULTRA",
        "S24, S24+, S24 ULTRA",
        "S23, S23+, S23 ULTRA",
      ],
    },
  };

  const faqQuestions = [
    {
      id: 1,
      question: "Not sure how to collage images?",
      answer: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0a214f] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-1">Step 1: Download InCollage</p>
              <p className="text-xs text-gray-600">Completely free app available on app stores</p>
            </div>
            <span className="px-2 py-1 text-xs font-bold text-[#0a214f] bg-white border border-blue-300 rounded-md shadow-sm">FREE</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="font-semibold">THEN</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0a214f] flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-1">Step 2: Adjust Layout Ratio</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs text-gray-600">After completing the collage, click on</span>
                <span className="px-2 py-1 text-xs font-bold text-white bg-[#0a214f] rounded shadow-sm">"Layout"</span>
                <span className="text-xs text-gray-400">→</span>
                <span className="px-2 py-1 text-xs font-bold text-white bg-[#0a214f] rounded shadow-sm">"Ratio"</span>
                <span className="text-xs text-gray-600">to change it to</span>
                <span className="px-2 py-1 text-xs font-bold text-[#0a214f] bg-white border-2 border-[#0a214f] rounded shadow-sm">9:16</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      question: "Print Quality?",
      answer: (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="font-bold text-base text-gray-900">Never Fading HQ Prints</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200">
                <svg className="w-4 h-4 text-[#0a214f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">Premium Print</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200">
                <svg className="w-4 h-4 text-[#0a214f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">Waterproof</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200">
                <svg className="w-4 h-4 text-[#0a214f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">Smooth Matte</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200">
                <svg className="w-4 h-4 text-[#0a214f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xs font-semibold text-gray-700">High Quality</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      question: "Blurry Print?",
      answer: (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0a214f] flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  For the best results, we recommend using high-definition images.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0a214f] flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-gray-900 mb-1.5">💡 Pro Tip</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Always use your image at its <span className="font-semibold text-[#0a214f]">original dimensions</span>. Stretching or zooming too much can reduce print quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      question: "Printing Time?",
      answer: (
        <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">Printing Time</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">4</span>
                <span className="text-lg font-semibold text-gray-700">minutes</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">to print a custom phone case</p>
            </div>
            <div className="flex-shrink-0">
              <span className="px-3 py-1.5 text-xs font-bold text-white bg-[#0a214f] rounded-full border border-blue-300">
                FAST
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      question: "Waterproof?",
      answer: (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">Yes, it is!</span>
                  <span className="px-2 py-0.5 text-xs font-bold text-white bg-[#0a214f] rounded border border-blue-300">
                    WATERPROOF
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  We use professional <span className="font-semibold text-[#0a214f]">UV printing technology</span>, which makes the phone case waterproof and prevents fading.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-white rounded-md border border-blue-200 text-center">
              <svg className="w-5 h-5 text-[#0a214f] mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              <p className="text-xs font-semibold text-gray-700">Water Resistant</p>
            </div>
            <div className="p-2.5 bg-white rounded-md border border-blue-200 text-center">
              <svg className="w-5 h-5 text-[#0a214f] mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <p className="text-xs font-semibold text-gray-700">Fade Resistant</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      question: "MagSafe Compatible?",
      answer: (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0a214f] flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-900">MagSafe Compatible</span>
                  <span className="px-2 py-0.5 text-xs font-bold text-white bg-[#0a214f] rounded border border-blue-300">
                    AVAILABLE
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  Selected in-mall machines provide MagSafe options.
                </p>
                <div className="p-2.5 bg-white rounded-md border border-blue-200">
                  <p className="text-xs text-gray-600 mb-1">For the complete MagSafe model collection:</p>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0a214f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="text-xs font-semibold text-[#0a214f]">Visit our online store</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      question: "What Models Do We Offer?",
      answer: (
        <div className="space-y-4">
          {/* iPhone Section */}
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a214f] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.33-1.09-.58-2.21-.96-3.52-.96-1.3 0-2.43.38-3.52.96-1.03.55-2.1.62-3.08.33-1.54-.5-2.84-2.15-2.84-4.25 0-4.29 3.29-9 7.44-9s7.44 4.71 7.44 9c0 2.1-1.3 3.75-2.84 4.25z"/>
                </svg>
              </div>
              <h4 className="font-bold text-base text-gray-900">iPhone</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {phoneModels.iphone.map((model, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200 hover:border-[#0a214f] transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a214f]"></div>
                  <span className="text-xs text-gray-700">{model}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Samsung Section */}
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a214f] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57l1.43 1.43L14.86 22l1.43-1.43L17.71 22l2.14-2.14L21.29 18.57l-1.43-1.43z"/>
                </svg>
              </div>
              <h4 className="font-bold text-base text-gray-900">Samsung</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {phoneModels.samsung.map((model, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200 hover:border-[#0a214f] transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a214f]"></div>
                  <span className="text-xs text-gray-700">{model}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Pixel Section */}
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a214f] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <h4 className="font-bold text-base text-gray-900">Google Pixel</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {phoneModels.google.map((model, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200 hover:border-[#0a214f] transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0a214f]"></div>
                  <span className="text-xs text-gray-700">{model}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MagSafe Section */}
          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a214f] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h4 className="font-bold text-base text-gray-900">MagSafe Compatible</h4>
              <span className="px-2 py-0.5 text-xs font-bold text-white bg-[#0a214f] rounded border border-blue-300">
                MAGSAFE
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-sm mb-2 text-gray-700 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#0a214f]"></span>
                  iPhone Models
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 ml-3">
                  {phoneModels.magsafe.iphone.map((model, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200 hover:border-[#0a214f] transition-colors">
                      <div className="w-1 h-1 rounded-full bg-[#0a214f]"></div>
                      <span className="text-xs text-gray-700">{model}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-sm mb-2 text-gray-700 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#0a214f]"></span>
                  Samsung Models
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 ml-3">
                  {phoneModels.magsafe.samsung.map((model, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-md border border-blue-200 hover:border-[#0a214f] transition-colors">
                      <div className="w-1 h-1 rounded-full bg-[#0a214f]"></div>
                      <span className="text-xs text-gray-700">{model}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleQuestion = (questionId) => {
    setOpenQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
      {/* Animated Header */}
      <div className={`text-center mb-10 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}>
        <div className="inline-block mb-3">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0a214f]">
            FAQ
          </h1>
        </div>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#0a214f] to-transparent mx-auto mb-3 animate-pulse"></div>
        <p className="text-base md:text-lg text-gray-600 font-medium">Frequently Asked Questions</p>
      </div>

      {/* Shopping Center Section */}
      <section className={`mb-8 transition-all duration-700 delay-100 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}>
        <button
          onClick={() => toggleSection("shopping")}
          className="group w-full text-left bg-gradient-to-r from-[#0a214f] via-[#1a3a6b] to-[#0a214f] bg-[length:200%_auto] text-white p-4 md:p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 flex items-center justify-between relative overflow-hidden transform hover:scale-[1.01]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-bold">SHOPPING CENTER</h2>
          </div>
          <svg
            className={`w-5 h-5 relative z-10 transition-all duration-500 ${openSection === "shopping" ? "rotate-180 scale-110" : "group-hover:scale-110"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
          openSection === "shopping" ? "max-h-[2000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}>
          <div className="space-y-4">
            {/* SA Locations */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg border-2 border-blue-200 transform transition-all duration-500 hover:shadow-xl animate-fade-in">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-blue-300">
                <div className="w-10 h-10 rounded-full bg-[#0a214f] flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0a214f]">
                    Adelaide, SA
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">{shoppingLocations.sa.length} locations available</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold text-white bg-[#0a214f] rounded-full border border-blue-300">
                  SA
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {shoppingLocations.sa.map((location, idx) => (
                  <div 
                    key={idx} 
                    className="group/item flex items-start gap-3 p-2.5 bg-white rounded-lg border border-blue-200 hover:border-[#0a214f] hover:shadow-md transition-all duration-300 hover:translate-x-1"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0a214f] flex items-center justify-center shadow-sm group-hover/item:scale-110 transition-transform">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="flex-1 text-sm text-gray-700 group-hover/item:text-[#0a214f] group-hover/item:font-medium transition-all">
                      {location.replace("📍", "").trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* NSW Locations */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg border-2 border-blue-200 transform transition-all duration-500 hover:shadow-xl animate-fade-in">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-blue-300">
                <div className="w-10 h-10 rounded-full bg-[#0a214f] flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0a214f]">
                    Sydney, NSW
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">{shoppingLocations.nsw.length} locations available</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-bold text-white bg-[#0a214f] rounded-full border border-blue-300">
                  NSW
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {shoppingLocations.nsw.map((location, idx) => (
                  <div 
                    key={idx} 
                    className="group/item flex items-start gap-3 p-2.5 bg-white rounded-lg border border-blue-200 hover:border-[#0a214f] hover:shadow-md transition-all duration-300 hover:translate-x-1"
                    style={{ animationDelay: `${idx * 30}ms` }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0a214f] flex items-center justify-center shadow-sm group-hover/item:scale-110 transition-transform">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="flex-1 text-sm text-gray-700 group-hover/item:text-[#0a214f] group-hover/item:font-medium transition-all">
                      {location.replace("📍", "").trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Phone Case Section */}
      <section className={`transition-all duration-700 delay-200 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      }`}>
        <button
          onClick={() => toggleSection("phone")}
          className="group w-full text-left bg-gradient-to-r from-[#0a214f] via-[#1a3a6b] to-[#0a214f] bg-[length:200%_auto] text-white p-4 md:p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 flex items-center justify-between relative overflow-hidden transform hover:scale-[1.01]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl font-bold">CUSTOM PHONE CASE</h2>
          </div>
          <svg
            className={`w-5 h-5 relative z-10 transition-all duration-500 ${openSection === "phone" ? "rotate-180 scale-110" : "group-hover:scale-110"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
          openSection === "phone" ? "max-h-[5000px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
        }`}>
          <div className="space-y-3">
            {faqQuestions.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:border-[#0a214f]/50 transition-all duration-300 transform hover:scale-[1.005] hover:shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleQuestion(item.id)}
                  className="w-full text-left p-4 hover:bg-blue-50 transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-[#0a214f] flex items-center justify-center text-white font-bold text-xs shadow-sm group-hover:scale-110 transition-transform">
                      {item.id}
                    </div>
                    <span className="text-sm md:text-base font-semibold text-gray-900 group-hover:text-[#0a214f] transition-colors pr-3">
                      {item.question}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full bg-[#0a214f] flex items-center justify-center transition-all duration-500 ${
                      openQuestions.has(item.id) ? "rotate-180 scale-110" : "group-hover:scale-110"
                    }`}>
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openQuestions.has(item.id) ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <div className="px-4 pb-4 pt-2 text-sm text-gray-700 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50">
                    <div className="animate-fade-in">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Online CTA */}
      <div className={`mt-10 text-center transition-all duration-1000 delay-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="relative bg-gradient-to-r from-[#0a214f] via-[#1a3a6b] to-[#0a214f] bg-[length:200%_auto] rounded-xl p-6 md:p-8 shadow-xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
          <div className="relative z-10">
            <div className="inline-block mb-3">
              <svg className="w-10 h-10 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-sm md:text-base text-gray-200 mb-6">Chat with us online for instant support</p>
            <button className="group/btn relative bg-white text-[#0a214f] font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden border-2 border-white">
              <span className="absolute inset-0 bg-[#0a214f] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2 text-sm group-hover/btn:text-white transition-colors">
                <span>Chat Online</span>
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

