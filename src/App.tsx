import FeedbackForm from './components/FeedbackForm';

// Replace with your deployed Google Apps Script web app URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzeKf8Ovr6ybm9nerrfwFtskSJJo41x7ZzON8BstJrjEXMC4jZFAE01ISvkAyIDVBIp/exec';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-na-border bg-na-bg/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-na-white tracking-tight">
              Neural<span className="text-na-text-muted">Arc</span>
            </span>
            <span className="text-na-text-dim text-sm hidden sm:inline">/ Feedback</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-na-text-dim">
            <a href="https://www.neuralarc.ai" target="_blank" rel="noopener noreferrer" className="hover:text-na-text transition-colors">
              neuralarc.ai
            </a>
            <span className="hidden sm:inline">·</span>
            <a href="https://he2.ai" target="_blank" rel="noopener noreferrer" className="hover:text-he-accent transition-colors hidden sm:inline">
              he2.ai
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center pt-16 pb-12 px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-na-text-dim mb-4">Feedback Portal</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-na-white mb-3 tracking-tight">
          Help us build better.
        </h1>
        <p className="text-na-text-muted max-w-md mx-auto text-sm leading-relaxed">
          Your insights shape what we create next. Share your experience with our website and product.
        </p>
      </section>

      {/* 50/50 Split with Divider */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row">
          {/* Website Feedback - Left */}
          <div className="flex-1 py-2 lg:pr-12 min-w-0 overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-lg bg-na-accent-glow border border-na-accent/10 flex items-center justify-center">
                <img src="/Neural Arc logomark white.svg" alt="NeuralArc logo" className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-na-white">NeuralArc Website</h2>
                <p className="text-sm text-na-text-dim">
                  <a href="https://www.neuralarc.ai" target="_blank" rel="noopener noreferrer" className="hover:text-na-text-muted transition-colors">neuralarc.ai</a>
                </p>
              </div>
            </div>
            <FeedbackForm type="website" scriptUrl={SCRIPT_URL} />
          </div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center mx-2">
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-na-border-light to-transparent" />
          </div>
          <div className="lg:hidden my-10 flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-na-border-light to-transparent" />
            <span className="text-[10px] uppercase tracking-widest text-na-text-dim">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-na-border-light to-transparent" />
          </div>

          {/* Product Feedback - Right */}
          <div className="flex-1 py-2 lg:pl-12 min-w-0 overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-lg bg-he-accent-glow border border-he-accent/10 flex items-center justify-center">
                <img src="/Helium AI.svg" alt="Helium AI logo" className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-na-white">Helium AI Product</h2>
                <p className="text-sm text-na-text-dim">
                  <a href="https://he2.ai" target="_blank" rel="noopener noreferrer" className="hover:text-he-accent-dim transition-colors">he2.ai</a>
                </p>
              </div>
            </div>
            <FeedbackForm type="product" scriptUrl={SCRIPT_URL} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-na-border py-6 text-center text-xs text-na-text-dim">
        © 2026 NeuralArc Inc. All rights reserved.
      </footer>
    </div>
  );
}
