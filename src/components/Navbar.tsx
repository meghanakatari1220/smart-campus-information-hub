import React, { useState } from 'react';
import {
  Compass,
  Search,
  Bell,
  Menu,
  X,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  User,
  ExternalLink,
} from 'lucide-react';
import { ActiveTab, NoticeItem } from '../types';
import { noticesData } from '../data/campusData';
import { campusImages } from '../assets/images';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab, contextQuery?: string) => void;
  onSelectNotice?: (notice: NoticeItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onSelectNotice,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const urgentNotices = noticesData.filter(n => n.priority === 'Important').slice(0, 3);

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search' },
    { id: 'notices', label: 'Notices' },
    { id: 'information', label: 'Information' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (tab: ActiveTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('home')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 shadow-md shadow-indigo-500/20 ring-1 ring-white/20 transition-transform group-hover:scale-105">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                Smart Campus
              </span>
              <span className="text-[10px] font-medium tracking-wide uppercase text-slate-400">
                Information Hub
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Search, Notification, Profile, Mobile toggle) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Search Shortcut */}
          <button
            onClick={() => handleLinkClick('search')}
            title="Search campus info"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              title="Recent alerts"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Toggle notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-[#0b0f17]" />
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-800 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                      Campus Urgent Notices
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setNotificationsOpen(false);
                      onNavigate('notices');
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    View All
                  </button>
                </div>

                <div className="mt-3 space-y-2.5">
                  {urgentNotices.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        setNotificationsOpen(false);
                        if (onSelectNotice) onSelectNotice(n);
                      }}
                      className="w-full text-left p-2.5 rounded-lg border border-slate-800/60 bg-slate-800/40 hover:bg-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="text-xs text-slate-400">
                        <span>{n.sourceDepartment}</span>
                        <span className="mx-1.5 text-slate-600">·</span>
                        <span>{n.publishedDate}</span>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-slate-200 line-clamp-1">
                        {n.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-2">
                        {n.shortDescription}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 rounded-full ring-1 ring-slate-700/60 hover:ring-indigo-500/60 p-0.5 transition-all focus:outline-none"
              aria-label="Student profile"
            >
              <img
                src={campusImages.avatarStudent}
                alt="Student Profile"
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                }}
              />
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-800 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl z-50">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <img
                    src={campusImages.avatarStudent}
                    alt="Alex Rivera"
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-indigo-500/40"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Alex Rivera</h4>
                    <p className="text-xs text-slate-400">Roll: 23CS0418 · B.Tech CSE</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1 text-xs text-slate-300">
                  <div className="flex justify-between py-1.5 px-2 rounded-md hover:bg-slate-800/60">
                    <span className="text-slate-400">Semester</span>
                    <span className="font-semibold text-slate-200">5th Semester (Fall '26)</span>
                  </div>
                  <div className="flex justify-between py-1.5 px-2 rounded-md hover:bg-slate-800/60">
                    <span className="text-slate-400">Attendance</span>
                    <span className="font-semibold text-emerald-400">86.4% (Good)</span>
                  </div>
                  <div className="flex justify-between py-1.5 px-2 rounded-md hover:bg-slate-800/60">
                    <span className="text-slate-400">Exam Hall Ticket</span>
                    <span className="font-semibold text-indigo-300">Verified & Ready</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onNavigate('information');
                    }}
                    className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    My Academic Docs
                  </button>
                  <span className="text-[11px] text-slate-500">Student Portal</span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0b0f17]/98 px-4 pt-3 pb-6 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-300 font-semibold border border-indigo-500/20'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <CheckCircle2 className="h-4 w-4 text-indigo-400" />}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Signed in as Alex Rivera (23CS0418)</span>
            <button
              onClick={() => handleLinkClick('search')}
              className="text-indigo-400 font-medium"
            >
              Search Campus →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
