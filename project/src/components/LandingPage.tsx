import React, { useState } from 'react';
import { Code, Sparkles, Trophy, Zap } from 'lucide-react';

interface LandingPageProps {
  onStart: (name: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsAnimating(true);
      // Save to localStorage with the exact key you specified
      localStorage.setItem('devTatawiUser', name.trim());
      setTimeout(() => {
        onStart(name.trim());
      }, 600);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-all duration-700 ${
      isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
    }`}>
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              dev & tatawi
            </h1>
          </div>
          <p className="text-lg text-blue-200 mb-2">
            Master Development Skills Through Interactive Learning
          </p>
          <p className="text-sm text-blue-300">
            From HTML basics to advanced algorithms - gamified and fun!
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="p-3 bg-white/10 rounded-xl mb-2 mx-auto w-fit">
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <p className="text-xs text-blue-200">Interactive Lessons</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-white/10 rounded-xl mb-2 mx-auto w-fit">
              <Trophy className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-xs text-blue-200">Earn XP & Badges</p>
          </div>
          <div className="text-center">
            <div className="p-3 bg-white/10 rounded-xl mb-2 mx-auto w-fit">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <p className="text-xs text-blue-200">Mini-Games</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-2">
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your name to start learning"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!name.trim()}
          >
            Start Learning
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-blue-400">
          Learn HTML, CSS, JavaScript, React, GitHub, CMD & Algorithms
        </div>
      </div>
    </div>
  );
};

export default LandingPage;