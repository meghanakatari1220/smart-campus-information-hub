import React, { useState } from 'react';
import { Search, Filter, Calendar, Bell, ArrowUpDown, Pin } from 'lucide-react';
import { NoticeItem, NoticeCategory, NoticePriority } from '../types';
import { noticesData } from '../data/campusData';
import { NoticeCard } from '../components/NoticeCard';

interface NoticesPageProps {
  onSelectNotice: (notice: NoticeItem) => void;
}

export const NoticesPage: React.FC<NoticesPageProps> = ({ onSelectNotice }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<NoticeCategory | 'All'>('All');
  const [selectedPriority, setSelectedPriority] = useState<NoticePriority | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'priority'>('newest');

  const categories: (NoticeCategory | 'All')[] = [
    'All',
    'Academic',
    'Examination',
    'Administrative',
    'Events',
    'Scholarships',
    'Fees',
    'General',
  ];

  const priorities: (NoticePriority | 'All')[] = ['All', 'Important', 'Upcoming', 'General'];

  // Filter and sort notices
  const filteredNotices = noticesData.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.sourceDepartment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || notice.category === selectedCategory;

    const matchesPriority =
      selectedPriority === 'All' || notice.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Sort
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityWeight: Record<NoticePriority, number> = {
        Important: 3,
        Upcoming: 2,
        General: 1,
      };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
    // Default newest (already chronologically arranged)
    return (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0);
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Official Campus Notices
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Verified institutional bulletins, circulars, exam notices, and regulatory guidelines
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-1.5 text-xs text-slate-300">
            <span>Showing <strong className="text-white font-mono">{sortedNotices.length}</strong> of {noticesData.length} Notices</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 backdrop-blur-sm">
        {/* Search Input */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notices by keyword, department, or subject..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1 hidden lg:inline">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Priority & Sorting */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as any)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="Important">Important</option>
              <option value="Upcoming">Upcoming</option>
              <option value="General">General</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-300 focus:outline-none"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="priority">Sort: By Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notices Grid */}
      {sortedNotices.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
          <Bell className="mx-auto h-8 w-8 text-slate-500" />
          <h3 className="text-base font-bold text-white">No notices match your criteria</h3>
          <p className="text-xs text-slate-400">
            Try adjusting your search terms or resetting category and priority filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedPriority('All');
            }}
            className="mt-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {sortedNotices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onViewDetails={onSelectNotice}
            />
          ))}
        </div>
      )}
    </div>
  );
};
