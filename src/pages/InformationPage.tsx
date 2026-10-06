import React, { useState } from 'react';
import {
  BookOpen,
  Coins,
  Trophy,
  FileText,
  Calendar,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  GraduationCap,
  Clock,
  ArrowRight,
} from 'lucide-react';
import {
  documentsData,
  scholarshipsData,
  eventsData,
  examsData,
} from '../data/campusData';
import { DocumentItem, CampusEvent, ExamItem } from '../types';
import { EventCard } from '../components/EventCard';

interface InformationPageProps {
  initialSection?: string;
  onSelectEvent: (event: CampusEvent) => void;
  onSelectExam: (exam: ExamItem) => void;
  onDownloadDoc: (docName: string) => void;
}

export const InformationPage: React.FC<InformationPageProps> = ({
  initialSection = 'Academics',
  onSelectEvent,
  onSelectExam,
  onDownloadDoc,
}) => {
  const [activeSection, setActiveSection] = useState<'Academics' | 'Fees & Scholarships' | 'Events & Competitions' | 'Forms & Documents'>(
    initialSection === 'Scholarships'
      ? 'Fees & Scholarships'
      : initialSection === 'Events'
      ? 'Events & Competitions'
      : initialSection === 'Documents'
      ? 'Forms & Documents'
      : 'Academics'
  );

  const [documentCategoryFilter, setDocumentCategoryFilter] = useState<string>('All');

  // Academic calendar data
  const academicCalendarItems = [
    { period: 'Aug 01 - Dec 15, 2026', title: 'Fall Semester Instruction Window', status: 'Ongoing' },
    { period: 'Oct 18 - Oct 26, 2026', title: 'Mid-1 Continuous Evaluation Exams', status: 'Upcoming' },
    { period: 'Oct 31 - Nov 04, 2026', title: 'Diwali & Dussehra Vacation Break', status: 'Scheduled' },
    { period: 'Nov 23 - Nov 28, 2026', title: 'Mid-2 Final Assessment Period', status: 'Scheduled' },
    { period: 'Dec 18 - Jan 06, 2027', title: 'End Semester University Examinations', status: 'Scheduled' },
  ];

  const departmentsList = [
    { code: 'CSE', name: 'Computer Science & Engineering', hod: 'Dr. V. Srinivasan', intake: '240 Students', labs: '8 High Performance Computing Labs' },
    { code: 'AI&DS', name: 'Artificial Intelligence & Data Science', hod: 'Dr. Shalini Gupta', intake: '120 Students', labs: 'NVIDIA GPU Research Center' },
    { code: 'ECE', name: 'Electronics & Communication Engineering', hod: 'Dr. P. Rajeshwar', intake: '180 Students', labs: 'VLSI & Embedded Systems Suite' },
    { code: 'MECH', name: 'Mechanical & Automation Engineering', hod: 'Dr. Anil K. Joshi', intake: '120 Students', labs: 'Robotics & Rapid Prototyping Workshop' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Campus Information Repository
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Structured reference directory covering academics, financial aid, competitions, and downloadable forms
        </p>
      </div>

      {/* Primary Section Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-2 scrollbar-none">
        {[
          { id: 'Academics', label: 'Academics', icon: BookOpen },
          { id: 'Fees & Scholarships', label: 'Fees & Scholarships', icon: Coins },
          { id: 'Events & Competitions', label: 'Events & Competitions', icon: Trophy },
          { id: 'Forms & Documents', label: 'Forms & Documents', icon: FileText },
        ].map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= SECTION 1: ACADEMICS ================= */}
      {activeSection === 'Academics' && (
        <div className="space-y-8">
          {/* Academic Calendar Grid */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-400" />
                  <span>Fall 2026 Academic Calendar</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Approved by College Academic Council</p>
              </div>
              <span className="text-xs font-mono text-indigo-300">Semester 2026-I</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {academicCalendarItems.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-indigo-400 block">{item.period}</span>
                    <h4 className="text-xs font-bold text-white mt-1">{item.title}</h4>
                  </div>
                  <div className="mt-3 text-[11px] font-semibold text-slate-400">
                    Status: <span className={item.status === 'Ongoing' ? 'text-emerald-400' : 'text-slate-300'}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Departments */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">
              Undergraduate Engineering Departments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departmentsList.map((dept, idx) => (
                <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-500/20">
                      {dept.code}
                    </span>
                    <span className="text-xs text-slate-400">{dept.intake}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{dept.name}</h4>
                  <div className="text-xs text-slate-400 space-y-1 pt-1">
                    <p>Head of Department: <strong className="text-slate-200">{dept.hod}</strong></p>
                    <p>Key Facility: <span className="text-slate-300">{dept.labs}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Examination Guidelines */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-rose-400" />
              <span>Examination Regulations & Attendance Requirement</span>
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Students must maintain a minimum of 75% aggregate attendance in each registered theory and laboratory course to be eligible for Mid and Semester End examinations. Condonation up to 10% is granted solely on approved medical grounds submitted within 3 days of discharge.
            </p>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: FEES & SCHOLARSHIPS ================= */}
      {activeSection === 'Fees & Scholarships' && (
        <div className="space-y-8">
          {/* Fee Payment Guidelines */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  Semester Fee Payment Information
                </h3>
                <p className="text-xs text-slate-400">Official SBI Collect & Campus ERP Payment Portal</p>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">Payment Deadline: October 25, 2026</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Tuition Fee Slab</span>
                <span className="font-bold text-white text-sm mt-0.5 block">₹45,000 / Semester</span>
                <span className="text-[11px] text-slate-500 mt-1 block">Government quota category A</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Lab & Library Dues</span>
                <span className="font-bold text-white text-sm mt-0.5 block">₹8,500 / Semester</span>
                <span className="text-[11px] text-slate-500 mt-1 block">Includes high-speed Wi-Fi access</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Online Payment Method</span>
                <span className="font-bold text-emerald-400 text-sm mt-0.5 block">Net Banking / UPI / Cards</span>
                <span className="text-[11px] text-slate-500 mt-1 block">Instant verified PDF receipt</span>
              </div>
            </div>
          </div>

          {/* Scholarship Opportunities */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                Verified Scholarship Opportunities (5 Available)
              </h3>
              <span className="text-xs text-indigo-400 font-semibold">Administered by Scholarship Cell</span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {scholarshipsData.map((sch) => (
                <div
                  key={sch.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold text-emerald-400">
                        {sch.amount}
                      </span>
                      <span className="text-[11px] font-mono text-rose-400">
                        Deadline: {sch.deadline}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mt-1">
                      {sch.title}
                    </h4>

                    <div className="mt-2 text-xs text-slate-300 space-y-1.5">
                      <p><strong className="text-slate-400">Eligibility:</strong> {sch.eligibility}</p>
                      <p><strong className="text-slate-400">Required Documents:</strong> {sch.documentsRequired}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Office: Counter 4, Admin Block</span>
                    <button
                      onClick={() => onDownloadDoc(`Application_${sch.title.replace(/\s+/g, '_')}.pdf`)}
                      className="flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Form</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: EVENTS & COMPETITIONS ================= */}
      {activeSection === 'Events & Competitions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white">
                All Campus Technical & Cultural Competitions
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Register with your student roll number for cash prizes, trophies, and attendance exemption
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eventsData.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewEvent={onSelectEvent}
              />
            ))}
          </div>
        </div>
      )}

      {/* ================= SECTION 4: FORMS & DOCUMENTS ================= */}
      {activeSection === 'Forms & Documents' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Official Institutional Forms & Application Templates
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Standard PDF templates. Download, fill out, and submit to the designated counter.
              </p>
            </div>

            {/* Filter by Form category */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Exam Forms', 'Scholarship Forms', 'Certificates', 'Academic Forms', 'Administrative'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setDocumentCategoryFilter(cat)}
                  className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    documentCategoryFilter === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Documents Table / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentsData
              .filter((doc) => documentCategoryFilter === 'All' || doc.category === documentCategoryFilter)
              .map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur-sm flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-indigo-400">{doc.category}</span>
                      <span className="font-mono text-[11px]">{doc.format} · {doc.fileSize}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white">
                      {doc.title}
                    </h4>

                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      {doc.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">Dept: {doc.department}</span>
                    <button
                      onClick={() => onDownloadDoc(doc.title)}
                      className="flex items-center gap-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 px-3 py-1.5 font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
