import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  FileText,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { examsData } from '../data/campusData';
import { ExamItem } from '../types';
import { campusImages } from '../assets/images';

interface ExamScheduleProps {
  onViewAllExams?: () => void;
  onSelectExam?: (exam: ExamItem) => void;
}

export const ExamSchedule: React.FC<ExamScheduleProps> = ({
  onViewAllExams,
  onSelectExam,
}) => {
  // Nearest exam is DSA Mid-1 on Oct 18, 2026 at 10:00 AM
  const nearestExam = examsData[0];

  // Calculate live countdown to target date
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 11,
    minutes: 29,
    seconds: 42,
  });

  useEffect(() => {
    const targetDate = new Date('2026-10-18T10:00:00');

    const updateTimer = () => {
      const now = new Date();
      // If current system date is before Oct 2026 or differing, use reference difference
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Fallback realistic prototype display
        setTimeLeft({ days: 3, hours: 6, minutes: 24, seconds: 15 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="exams-section" className="my-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Upcoming Examinations
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mid-1 Semester Timetable & Verified Hall Seating Allocations
          </p>
        </div>

        {onViewAllExams && (
          <button
            onClick={onViewAllExams}
            className="self-start sm:self-auto text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            <span>View Full Exam Schedule</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Featured Countdown Box */}
        <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-900/90 p-6 backdrop-blur-md shadow-xl lg:col-span-1 flex flex-col justify-between">
          {/* Subtle examination hall photo backdrop */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <img
              src={campusImages.academicExamHall}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-10 mix-blend-luminosity filter blur-[0.5px]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/80 to-transparent" />
          </div>

          <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-indigo-500/15 blur-2xl" />

          <div>
            <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold uppercase tracking-wider mb-2">
              <span>Next Immediate Exam</span>
              <span className="text-rose-400 font-bold animate-pulse">Mid-1</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white">
              {nearestExam.subjectName}
            </h3>
            <p className="text-xs font-mono text-indigo-300 mt-0.5">
              Code: {nearestExam.subjectCode} · {nearestExam.department}
            </p>

            {/* Countdown Display with tabular figures */}
            <div className="mt-6 rounded-xl border border-indigo-500/20 bg-slate-950/70 p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Countdown to Examination
              </span>
              <div className="mt-2 grid grid-cols-4 gap-2 text-center font-mono">
                <div className="rounded-lg bg-slate-900/90 p-2 border border-slate-800">
                  <span className="text-xl font-bold text-white tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-slate-400 uppercase mt-0.5">Days</span>
                </div>
                <div className="rounded-lg bg-slate-900/90 p-2 border border-slate-800">
                  <span className="text-xl font-bold text-white tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-slate-400 uppercase mt-0.5">Hours</span>
                </div>
                <div className="rounded-lg bg-slate-900/90 p-2 border border-slate-800">
                  <span className="text-xl font-bold text-white tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-slate-400 uppercase mt-0.5">Min</span>
                </div>
                <div className="rounded-lg bg-slate-900/90 p-2 border border-slate-800">
                  <span className="text-xl font-bold text-indigo-400 tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] text-slate-400 uppercase mt-0.5">Sec</span>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-400 shrink-0" />
                <span className="font-semibold text-white">{nearestExam.formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>{nearestExam.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
                <span className="text-indigo-200 font-medium">{nearestExam.venue}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Source: Examination Cell</span>
            <button
              onClick={() => onSelectExam && onSelectExam(nearestExam)}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Guidelines & Hall Ticket →
            </button>
          </div>
        </div>

        {/* Clean Timetable Card & Mobile Responsive List */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Examination Timetable
              </span>
              <span className="text-xs font-mono text-slate-400">B.Tech 3rd Year · Fall 2026</span>
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto mt-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800/80 text-slate-400 uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-3">Type</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Time</th>
                    <th className="py-2.5 px-3">Venue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {examsData.map((ex, idx) => (
                    <tr
                      key={ex.id}
                      onClick={() => onSelectExam && onSelectExam(ex)}
                      className="cursor-pointer hover:bg-slate-800/50 transition-colors group"
                    >
                      <td className="py-3 px-3">
                        <span className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {ex.subjectName}
                        </span>
                        <span className="block text-[11px] font-mono text-slate-400">
                          {ex.subjectCode}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-300">{ex.examType}</td>
                      <td className="py-3 px-3 font-mono text-slate-200">{ex.formattedDate}</td>
                      <td className="py-3 px-3 font-mono text-slate-300">{ex.time}</td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-indigo-300">{ex.venue}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards for Timetable */}
            <div className="sm:hidden space-y-3 mt-3">
              {examsData.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => onSelectExam && onSelectExam(ex)}
                  className="rounded-xl border border-slate-800 bg-slate-800/40 p-3.5 space-y-1.5"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-semibold text-white">{ex.subjectName}</h4>
                    <span className="text-[11px] font-mono text-indigo-400">{ex.examType}</span>
                  </div>
                  <div className="text-xs text-slate-400 flex flex-wrap gap-x-3 gap-y-1">
                    <span>{ex.formattedDate}</span>
                    <span>·</span>
                    <span>{ex.time}</span>
                  </div>
                  <div className="text-xs text-indigo-300 font-medium">
                    Venue: {ex.venue}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-amber-400" />
              <span>Mandatory: Carry physical student ID & printed hall ticket.</span>
            </div>
            <span className="text-slate-500 hidden sm:inline">Exam Cell Authorized</span>
          </div>
        </div>
      </div>
    </section>
  );
};
