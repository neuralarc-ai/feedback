import { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzeKf8Ovr6ybm9nerrfwFtskSJJo41x7ZzON8BstJrjEXMC4jZFAE01ISvkAyIDVBIp/exec';

type Tab = 'website' | 'product';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('website');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="text-center pt-20 pb-10 px-6">
        <h1 className="text-3xl sm:text-4xl font-semibold text-na-white mb-3 tracking-tight">
          Help us build better.
        </h1>
        <p className="text-na-text-muted max-w-md mx-auto text-sm leading-relaxed">
          Your insights shape what we create next. Share your experience with
          our website and product.
        </p>
      </section>

     {/* Tabs */}
<div className="flex justify-center px-3 sm:px-6 mb-6 sm:mb-8">
  <div className="flex bg-[#ececec] rounded-full p-1 gap-1 w-full max-w-[320px] sm:max-w-fit">
    
    {/* Website Tab */}
    <button
      type="button"
      onClick={() => setActiveTab('website')}
      className={`flex items-center justify-center gap-1.5 sm:gap-2.5 
        px-3 sm:px-6 py-2 sm:py-2.5 
        rounded-full text-xs sm:text-sm font-medium 
        transition-all duration-200 cursor-pointer flex-1 sm:flex-none
        ${
          activeTab === 'website'
            ? 'bg-white text-na-white shadow-sm'
            : 'text-na-text-muted hover:text-na-white'
        }`}
    >
      <img
        src="/Neural Arc logomark black.svg"
        alt=""
        className="w-4 h-4 sm:w-8 sm:h-8"
      />
      <span className="truncate">NeuralArc</span>
    </button>

    {/* Product Tab */}
    <button
      type="button"
      onClick={() => setActiveTab('product')}
      className={`flex items-center justify-center gap-1.5 sm:gap-2.5 
        px-3 sm:px-6 py-2 sm:py-2.5 
        rounded-full text-xs sm:text-sm font-medium 
        transition-all duration-200 cursor-pointer flex-1 sm:flex-none
        ${
          activeTab === 'product'
            ? 'bg-white text-na-white shadow-sm'
            : 'text-na-text-muted hover:text-na-white'
        }`}
    >
      <img
        src="/helium ai logo.svg"
        alt=""
        className="w-4 h-4 sm:w-5 sm:h-5"
      />
      <span className="truncate">Helium AI</span>
    </button>

  </div>
</div>

      {/* Centered card + form */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-6 pb-20">
        {/* Card */}
        <div className="rounded-2xl overflow-hidden mb-8 border border-na-border">
          <div className="relative p-6">
            <img
              src={activeTab === 'product' ? '/pink.png' : '/GRADIEN.png'}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center">
                <img
                  src={activeTab === 'website' ? '/Neural Arc logomark black.svg' : '/helium ai logo.svg'}
                  alt={activeTab === 'website' ? 'NeuralArc logo' : 'Helium AI logo'}
                  className={activeTab === 'website' ? 'w-14 h-14' : 'w-10 h-10'}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-na-white">
                  {activeTab === 'website' ? 'NeuralArc Website' : 'Helium AI Product'}
                </h2>
                <p className="text-sm text-na-white">
                  {activeTab === 'website' ? 'neuralarc.ai' : 'he2.ai'}
                </p>
              </div>
            </div>
          </div>
          <a
            href={activeTab === 'website' ? 'https://www.neuralarc.ai' : 'https://he2.ai'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-end gap-2 px-6 py-3 border-t border-na-border bg-na-surface hover:bg-na-surface-hover transition-colors group"
          >
            <span className="text-sm font-medium text-na-text-muted group-hover:text-na-white transition-colors">
              Visit Website
            </span>
            <svg className="w-4 h-4 text-na-text-dim group-hover:text-na-white group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Form — key resets state on tab switch */}
        <FeedbackForm key={activeTab} type={activeTab} scriptUrl={SCRIPT_URL} />
      </main>

      {/* Footer */}
      <footer className="border-t border-na-border py-6 text-center text-xs text-na-text-dim">
        © 2026 NeuralArc Inc. All rights reserved.
      </footer>
    </div>
  );
}
