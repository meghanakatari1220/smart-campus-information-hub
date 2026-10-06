import React from 'react';
import { ArrowRight, Bell, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { Hero } from '../components/Hero';
import { QuickAccess } from '../components/QuickAccess';
import { NoticeCard } from '../components/NoticeCard';
import { EventCard } from '../components/EventCard';
import { ExamSchedule } from '../components/ExamSchedule';
import { ImportantInfoCards } from '../components/ImportantInfoCards';
import { noticesData, eventsData } from '../data/campusData';
import { ActiveTab, NoticeItem, CampusEvent, ExamItem } from '../types';
import { campusImages } from '../assets/images';

interface HomePageProps {
  onSearch: (query: string) => void;
  onNavigate: (tab: ActiveTab, category?: string) => void;
  onSelectNotice: (notice: NoticeItem) => void;
  onSelectEvent: (event: CampusEvent) => void;
  onSelectExam: (exam: ExamItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSearch,
  onNavigate,
  onSelectNotice,
  onSelectEvent,
  onSelectExam,
}) => {
  // Show 4-5 important notices on home page
  const latestNotices = noticesData.slice(0, 4);
  const featuredEvents = eventsData.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* 1. Hero Section */}
      <Hero
        onSearch={onSearch}
        onExploreNotices={() => onNavigate('notices')}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 2. Quick Access Cards */}
        <QuickAccess onNavigateToCategory={onNavigate} />

        {/* 3. Latest Notices Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Latest Campus Notices
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Official circulars, exam notifications, and institutional advisories
              </p>
            </div>

            <button
              onClick={() => onNavigate('notices')}
              className="self-start sm:self-auto text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <span>View All 9 Notices</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {latestNotices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onViewDetails={onSelectNotice}
              />
            ))}
          </div>
        </section>

        {/* 4. Upcoming Examinations Timeline & Countdown */}
        <ExamSchedule
          onViewAllExams={() => onNavigate('search', 'exam')}
          onSelectExam={onSelectExam}
        />

        {/* 5. Upcoming Events & Competitions */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Upcoming Events & Competitions
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Hackathons, technical contests, workshops, and symposiums
              </p>
            </div>

            <button
              onClick={() => onNavigate('information', 'Events')}
              className="self-start sm:self-auto text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
            >
              <span>Explore All Events</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewEvent={onSelectEvent}
              />
            ))}
          </div>
        </section>

        {/* 6. Important Information (Compact Cards) */}
        <ImportantInfoCards onNavigate={onNavigate} />

        {/* 7. Presentation Proof / Verification Banner */}
        <section className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/30 via-slate-900/60 to-purple-950/20 p-6 sm:p-8 backdrop-blur-md">
          {/* Subtle collegiate study backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <img
              src={campusImages.campusLibraryStudy}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-10 mix-blend-luminosity filter blur-[0.5px]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/80" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Zero Rumors. 100% Institutional Verification.
                </h3>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-2xl">
                  Every notice, syllabus update, exam timetable, and scholarship guideline in this hub is directly synchronized with official administrative desks, eliminating confusing WhatsApp forward rumors and outdated paper PDFs.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="shrink-0 rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2.5 text-xs font-semibold text-white transition-colors"
            >
              Have a Query? Ask Right Department →
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
