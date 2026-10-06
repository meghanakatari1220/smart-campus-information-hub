import React from 'react';
import { Compass, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  onNavigate: (tab: ActiveTab, contextQuery?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#090d14] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand & Purpose */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-sm shadow-indigo-500/20">
                <Compass className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Smart Campus
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              One campus. One place for the information you need.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Consolidating notices, schedules, scholarships, forms, and department contacts across all colleges and departments into a unified verified index.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('search')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('notices')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Notices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('information')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Information Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Information
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('information', 'Academic')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Academic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('information', 'Exams')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Exams
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('information', 'Events')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('information', 'Scholarships')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Scholarships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('information', 'Documents')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Documents
                </button>
              </li>
            </ul>
          </div>

          {/* Key Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex flex-col">
                <span className="font-medium text-slate-300">Student Support</span>
                <span className="text-[11px] text-slate-500">Student Amenities Center, 1st Floor</span>
                <span className="text-[11px] text-indigo-400">studentservices@smartcampus.edu</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium text-slate-300">Academic Office</span>
                <span className="text-[11px] text-slate-500">Academic Pavilion, Room 208</span>
                <span className="text-[11px] text-indigo-400">academics@smartcampus.edu</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium text-slate-300">Examination Cell</span>
                <span className="text-[11px] text-slate-500">Admin Block, Room 102</span>
                <span className="text-[11px] text-indigo-400">examcell@smartcampus.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-800/80 pt-6 sm:flex-row text-xs text-slate-500">
          <p>© 2026 Smart Campus Information Hub</p>
          <div className="mt-4 flex items-center gap-6 sm:mt-0">
            <span>Verified Campus Information Repository</span>
            <span className="text-slate-700">|</span>
            <span>Presentation Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
