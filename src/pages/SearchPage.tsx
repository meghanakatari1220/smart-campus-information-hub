import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  Clock,
  TrendingUp,
  ArrowRight,
  X,
  SlidersHorizontal,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Calendar,
  Building2,
  FileText,
} from 'lucide-react';
import {
  CategoryType,
  SearchResultItem,
  NoticeItem,
  CampusEvent,
  ExamItem,
  DocumentItem,
  ContactDepartment,
} from '../types';
import { searchCampus } from '../utils/searchEngine';

interface SearchPageProps {
  initialQuery?: string;
  onSelectNotice: (notice: NoticeItem) => void;
  onSelectEvent: (event: CampusEvent) => void;
  onSelectExam: (exam: ExamItem) => void;
  onSelectContact: (contact: ContactDepartment) => void;
  onDownloadDoc?: (docName: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  initialQuery = '',
  onSelectNotice,
  onSelectEvent,
  onSelectExam,
  onSelectContact,
  onDownloadDoc,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'When is the next exam?',
    'Show upcoming competitions',
    'Who should I contact for fee issues?',
    'Scholarship deadline',
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Suggested searches from spec
  const suggestedSearches = [
    'When is the DSA exam?',
    'Show upcoming competitions',
    'Who should I contact for scholarship issues?',
    'I have a problem with my exam hall ticket',
    'Mid-1 Examination schedule',
    'Bonafide certificate request',
  ];

  const categories: (CategoryType | 'All')[] = [
    'All',
    'Notices',
    'Exams',
    'Academics',
    'Events',
    'Scholarships',
    'Fees',
    'Documents',
    'Contacts',
  ];

  // Execute search
  const searchOutcome = query.trim()
    ? searchCampus(query, selectedCategory)
    : { directAnswer: null, results: [], totalMatches: 0 };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    // Simulate snappy search transition
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Add to recent searches if not present
      if (!recentSearches.includes(query.trim())) {
        setRecentSearches([query.trim(), ...recentSearches.slice(0, 5)]);
      }
    }, 150);
  };

  const handleQuerySelect = (q: string) => {
    setQuery(q);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (!recentSearches.includes(q)) {
        setRecentSearches([q, ...recentSearches.slice(0, 5)]);
      }
    }, 120);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
  };

  const handleCardAction = (item: SearchResultItem) => {
    if (item.category === 'Notices' && item.rawObject) {
      onSelectNotice(item.rawObject as NoticeItem);
    } else if (item.category === 'Events' && item.rawObject) {
      onSelectEvent(item.rawObject as CampusEvent);
    } else if (item.category === 'Exams' && item.rawObject) {
      onSelectExam(item.rawObject as ExamItem);
    } else if (item.category === 'Contacts' && item.rawObject) {
      onSelectContact(item.rawObject as ContactDepartment);
    } else if (item.category === 'Documents' && onDownloadDoc) {
      onDownloadDoc(item.title);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3 py-1 text-xs text-indigo-300">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Intent-Aware Semantic Search</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Search Campus Information
        </h1>
        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-400">
          Ask questions in plain English or search by subject, department, deadline, or form type.
        </p>
      </div>

      {/* Main Search Bar */}
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center rounded-2xl border border-slate-700/80 bg-slate-900/90 p-2 shadow-2xl backdrop-blur-xl transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20"
        >
          <div className="flex h-12 w-12 items-center justify-center pl-2 text-slate-400">
            <Search className="h-5 w-5 text-indigo-400" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Ask anything about exams, fees, scholarships, contacts, or forms..."
            className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
            autoFocus
          />

          <div className="flex items-center gap-2 pr-1">
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                title="Clear input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all active:scale-95"
            >
              Search
            </button>
          </div>
        </form>

        {/* Category Filters (Segmented Functional Buttons) */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'bg-slate-900/70 border border-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* When NO query is entered: Show Recent Searches, Suggested Searches, & Popular Categories */}
      {!query.trim() && (
        <div className="mx-auto max-w-3xl space-y-8 pt-4">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  Recent Searches
                </span>
                <button
                  onClick={handleClearRecent}
                  className="text-slate-500 hover:text-slate-300"
                >
                  Clear History
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuerySelect(term)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:border-indigo-500/40 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <span>{term}</span>
                    <ArrowRight className="h-3 w-3 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Searches */}
          <div className="space-y-3">
            <span className="font-semibold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              Suggested Questions (Try One-Click)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {suggestedSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuerySelect(item)}
                  className="text-left p-3 rounded-xl border border-slate-800/80 bg-slate-900/50 hover:border-indigo-500/40 hover:bg-slate-800/60 transition-all group flex items-center justify-between"
                >
                  <span className="text-xs text-slate-300 group-hover:text-white">
                    &ldquo;{item}&rdquo;
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:translate-x-1 group-hover:text-indigo-400 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3 pt-2">
            <span className="font-semibold text-xs uppercase tracking-wider text-slate-300">
              Popular Search Domains
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <button
                onClick={() => {
                  setSelectedCategory('Exams');
                  setQuery('Mid-1 Exam');
                }}
                className="p-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-left"
              >
                <span className="font-bold text-white block">Exams & Timetables</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Fall 2026 slots</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Scholarships');
                  setQuery('Scholarship');
                }}
                className="p-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-left"
              >
                <span className="font-bold text-white block">Scholarships & Grants</span>
                <span className="text-[11px] text-slate-400 mt-1 block">NSP & Merit aid</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Events');
                  setQuery('Competition');
                }}
                className="p-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-left"
              >
                <span className="font-bold text-white block">Competitions</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Sprint & Hackathons</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Contacts');
                  setQuery('issue');
                }}
                className="p-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-left"
              >
                <span className="font-bold text-white block">Who to Contact</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Department directory</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Skeleton State */}
      {isLoading && (
        <div className="mx-auto max-w-3xl space-y-4 animate-pulse">
          <div className="h-32 rounded-2xl bg-slate-800/60" />
          <div className="h-24 rounded-xl bg-slate-800/40" />
          <div className="h-24 rounded-xl bg-slate-800/40" />
        </div>
      )}

      {/* ACTIVE SEARCH RESULTS */}
      {!isLoading && query.trim() && (
        <div className="mx-auto max-w-3xl space-y-6">
          {/* 1. DIRECT ANSWER SECTION (When Natural Language Intent Matches) */}
          {searchOutcome.directAnswer && (
            <div className="overflow-hidden rounded-2xl border border-indigo-500/40 bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-900/90 p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20 text-xs text-indigo-300">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="font-semibold uppercase tracking-wider">
                    Instant Campus Answer
                  </span>
                </div>
                <span className="text-slate-400">
                  Verified by {searchOutcome.directAnswer.sourceDepartment}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                  Question: &ldquo;{searchOutcome.directAnswer.questionIntent}&rdquo;
                </p>
                <h3 className="mt-1 text-base sm:text-lg font-bold text-white leading-relaxed">
                  {searchOutcome.directAnswer.headlineAnswer}
                </h3>
              </div>

              {/* Key Details Grid */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {searchOutcome.directAnswer.keyDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2"
                  >
                    <span className="text-slate-400">{detail.label}</span>
                    <span className="font-semibold text-slate-200 text-right">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. RELATED RESULTS SECTION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-slate-300">
                {searchOutcome.directAnswer ? 'Related Campus Records' : 'Search Results'} ({searchOutcome.totalMatches})
              </span>
              <span>Category filter: {selectedCategory}</span>
            </div>

            {/* Zero Results State */}
            {searchOutcome.results.length === 0 && !searchOutcome.directAnswer && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center space-y-3">
                <AlertCircle className="mx-auto h-10 w-10 text-slate-500" />
                <h3 className="text-base font-bold text-white">No results found for &ldquo;{query}&rdquo;</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  We couldn&apos;t find matching notices, exams, or forms for that search. Try one of our suggested questions or select a broader category.
                </p>
                <div className="pt-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleQuerySelect('When is the next exam?')}
                    className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-indigo-300 hover:text-white"
                  >
                    Try: &ldquo;When is the next exam?&rdquo;
                  </button>
                  <button
                    onClick={() => handleQuerySelect('Scholarship')}
                    className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-indigo-300 hover:text-white"
                  >
                    Try: &ldquo;Scholarship&rdquo;
                  </button>
                </div>
              </div>
            )}

            {/* Result Cards */}
            <div className="space-y-3">
              {searchOutcome.results.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-800/50 hover:shadow-md"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-indigo-400">{item.category}</span>
                      <span className="text-slate-600">·</span>
                      <span>Source: {item.source}</span>
                    </div>
                    {item.date && <span className="font-mono text-slate-400">{item.date}</span>}
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>

                  {/* Metadata Chips if available */}
                  {item.metadata && (
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-400">
                      {Object.entries(item.metadata).map(([k, v]) => (
                        <span key={k} className="bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60">
                          {k}: <strong className="text-slate-300">{v}</strong>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">Campus Index ID: {item.id}</span>
                    <button
                      onClick={() => handleCardAction(item)}
                      className="flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
