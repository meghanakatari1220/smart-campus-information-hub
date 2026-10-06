import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Clock,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HeroProps {
  onSearch: (query: string) => void;
  onExploreNotices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onExploreNotices }) => {
  const [inputVal, setInputVal] = useState('');

  const exampleQueries = [
    'When is the next exam?',
    'Show upcoming competitions',
    'Where can I find scholarship information?',
    'Who should I contact for fee issues?',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    } else {
      onSearch('exam');
    }
  };

  const handleExampleClick = (ex: string) => {
    setInputVal(ex);
    onSearch(ex);
  };

  return (
    <div className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background ambient mesh and glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[550px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-600/10 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-20 -z-10 h-80 w-80 rounded-full bg-purple-600/10 blur-2xl"
        aria-hidden="true"
      />

      {/* Subtle architectural grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Subtle AI-Powered Search label / Prototype indicator */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs text-indigo-300 backdrop-blur-md shadow-sm mb-6">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
          <span className="font-medium">Smart Campus Intent Engine</span>
          <span className="text-indigo-400/50">·</span>
          <span className="text-[11px] text-slate-400">Natural-Language Search Prototype</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
          Everything Your Campus Has to Say.{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
            In One Place.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base sm:leading-relaxed text-balance">
          Find announcements, exam updates, academic information, events, scholarships, forms and campus contacts — without searching through multiple groups and notices.
        </p>

        {/* Large Smart Search Bar */}
        <div className="mx-auto mt-8 max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="group relative flex items-center rounded-2xl border border-slate-700/80 bg-slate-900/90 p-2 shadow-2xl backdrop-blur-xl transition-all duration-200 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20 hover:border-slate-600"
          >
            <div className="flex h-12 w-12 items-center justify-center pl-2 text-slate-400 group-focus-within:text-indigo-400 transition-colors">
              <Search className="h-5 w-5" />
            </div>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about your campus..."
              className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
            />

            <div className="flex items-center gap-2 pr-1">
              {inputVal && (
                <button
                  type="button"
                  onClick={() => setInputVal('')}
                  className="px-2 py-1 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40 active:scale-95"
              >
                <span>Search</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Natural Language Search Prompts */}
          <div className="mt-4 flex flex-col items-start sm:items-center text-xs text-slate-400">
            <div className="flex items-center gap-1.5 mb-2 text-slate-400 font-medium">
              <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
              <span>Try asking natural questions:</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {exampleQueries.map((query, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleExampleClick(query)}
                  className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-slate-800/80 hover:text-white active:scale-95 text-left"
                >
                  &ldquo;{query}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Primary and Secondary CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onSearch(inputVal || 'DSA exam')}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:from-indigo-500 hover:to-indigo-400 active:scale-95"
          >
            <Search className="h-4 w-4" />
            <span>Search Campus</span>
          </button>

          <button
            onClick={onExploreNotices}
            className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-slate-600 hover:bg-slate-800 hover:text-white active:scale-95"
          >
            <span>Explore Notices</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
