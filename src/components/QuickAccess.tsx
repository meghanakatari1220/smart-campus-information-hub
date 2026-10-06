import React from 'react';
import {
  Bell,
  FileCheck2,
  BookOpen,
  Trophy,
  Coins,
  FileText,
  PhoneCall,
  ArrowUpRight,
} from 'lucide-react';
import { ActiveTab, CategoryType } from '../types';

interface QuickAccessProps {
  onNavigateToCategory: (tab: ActiveTab, category?: string) => void;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({ onNavigateToCategory }) => {
  const quickCards = [
    {
      id: 'notices',
      tab: 'notices' as ActiveTab,
      category: 'Notices',
      title: 'Notices',
      desc: 'Official administrative & circular announcements',
      updates: '9 active updates',
      icon: Bell,
      color: 'text-amber-400',
      glow: 'group-hover:border-amber-500/40',
    },
    {
      id: 'exams',
      tab: 'home' as ActiveTab,
      category: 'Exams',
      title: 'Exams',
      desc: 'Mid-1 timetables, venues & hall ticket guidelines',
      updates: '5 upcoming slots',
      icon: FileCheck2,
      color: 'text-rose-400',
      glow: 'group-hover:border-rose-500/40',
      actionAnchor: '#exams-section',
    },
    {
      id: 'academics',
      tab: 'information' as ActiveTab,
      category: 'Academics',
      title: 'Academics',
      desc: 'Syllabus, academic calendar & regulations',
      updates: 'Fall 2026 active',
      icon: BookOpen,
      color: 'text-sky-400',
      glow: 'group-hover:border-sky-500/40',
    },
    {
      id: 'events',
      tab: 'information' as ActiveTab,
      category: 'Events',
      title: 'Events & Competitions',
      desc: 'Hackathons, coding sprint & workshops',
      updates: '4 open registrations',
      icon: Trophy,
      color: 'text-indigo-400',
      glow: 'group-hover:border-indigo-500/40',
    },
    {
      id: 'fees',
      tab: 'information' as ActiveTab,
      category: 'Scholarships',
      title: 'Fees & Scholarships',
      desc: 'Merit grants, deadlines & online receipts',
      updates: '2 urgent deadlines',
      icon: Coins,
      color: 'text-emerald-400',
      glow: 'group-hover:border-emerald-500/40',
    },
    {
      id: 'documents',
      tab: 'information' as ActiveTab,
      category: 'Documents',
      title: 'Forms & Documents',
      desc: 'Bonafide, exam forms & clearance templates',
      updates: '8 verified templates',
      icon: FileText,
      color: 'text-purple-400',
      glow: 'group-hover:border-purple-500/40',
    },
    {
      id: 'contacts',
      tab: 'contact' as ActiveTab,
      category: 'Contacts',
      title: 'Campus Contacts',
      desc: 'Verified offices, emails & problem routing',
      updates: '8 offices indexed',
      icon: PhoneCall,
      color: 'text-cyan-400',
      glow: 'group-hover:border-cyan-500/40',
    },
  ];

  return (
    <section className="mt-8 mb-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Quick Access
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Direct shortcuts to critical campus departments and repositories
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {quickCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => {
                if (card.actionAnchor) {
                  const el = document.getElementById(card.actionAnchor.replace('#', ''));
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    return;
                  }
                }
                onNavigateToCategory(card.tab, card.category);
              }}
              className={`group relative flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 text-left backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-slate-950/40 ${card.glow}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800/80 border border-slate-700/60 transition-transform group-hover:scale-105">
                  <IconComponent className={`h-5 w-5 ${card.color}`} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-300" />
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">
                  {card.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] font-medium text-slate-400 group-hover:text-slate-300">
                {card.updates}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
