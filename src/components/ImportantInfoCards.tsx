import React from 'react';
import { Coins, CreditCard, FileText, Calendar, ArrowRight, Clock } from 'lucide-react';
import { ActiveTab } from '../types';

interface ImportantInfoCardsProps {
  onNavigate: (tab: ActiveTab, category?: string) => void;
}

export const ImportantInfoCards: React.FC<ImportantInfoCardsProps> = ({ onNavigate }) => {
  const cards = [
    {
      title: 'Scholarship Deadline',
      highlight: 'Nov 05, 2026',
      subtext: 'State & National Merit post-matric submissions closing in Counter 4.',
      status: 'Active Submissions',
      statusColor: 'text-emerald-400',
      icon: Coins,
      category: 'Scholarships',
      tab: 'information' as ActiveTab,
    },
    {
      title: 'Even Semester Fee Payment',
      highlight: 'Oct 25, 2026',
      subtext: 'Avoid late registration penalty. SBI Collect reference upload required.',
      status: 'Due Soon',
      statusColor: 'text-amber-400',
      icon: CreditCard,
      category: 'Scholarships',
      tab: 'information' as ActiveTab,
    },
    {
      title: 'Mandatory Exam Forms',
      highlight: 'Oct 16, 2026',
      subtext: 'Download and verify Mid-1 seating slip & subject code confirmation.',
      status: 'Download Active',
      statusColor: 'text-sky-400',
      icon: FileText,
      category: 'Documents',
      tab: 'information' as ActiveTab,
    },
    {
      title: 'Fall 2026 Academic Calendar',
      highlight: 'Holiday: Oct 31',
      subtext: 'Semester break & continuous evaluation milestone dates approved.',
      status: 'Official Schedule',
      statusColor: 'text-indigo-400',
      icon: Calendar,
      category: 'Academics',
      tab: 'information' as ActiveTab,
    },
  ];

  return (
    <section className="my-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Critical Campus Milestones
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Immediate deadlines, institutional forms, and scheduled financial windows
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm transition-all duration-200 hover:border-slate-700 hover:bg-slate-800/50 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 border border-slate-700/60">
                    <Icon className="h-4 w-4 text-indigo-400" />
                  </div>
                  <span className={`text-[11px] font-semibold ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">
                  {item.title}
                </h3>

                <div className="mt-2 text-base font-bold font-mono text-indigo-300">
                  {item.highlight}
                </div>

                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {item.subtext}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                <button
                  onClick={() => onNavigate(item.tab, item.category)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
