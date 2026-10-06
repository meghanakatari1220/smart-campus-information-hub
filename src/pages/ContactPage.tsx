import React, { useState } from 'react';
import {
  Search,
  Building2,
  Mail,
  Phone,
  Clock,
  MapPin,
  Send,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { contactsData } from '../data/campusData';
import { ContactDepartment } from '../types';
import { campusImages } from '../assets/images';

interface ContactPageProps {
  onSelectContact: (contact: ContactDepartment) => void;
  onCopyToast?: (text: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onSelectContact,
  onCopyToast,
}) => {
  const [problemQuery, setProblemQuery] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const quickProblemExamples = [
    'I have a problem with my exam hall ticket',
    'Scholarship verification pending at counter',
    'Fee payment receipt not generated online',
    'Need replacement for lost student ID card',
    'Hostel Wi-Fi router connectivity is down',
    'Course attendance condonation letter',
  ];

  // Resolve matching department for problemQuery
  const getProblemMatch = (): ContactDepartment | null => {
    const q = problemQuery.trim().toLowerCase();
    if (!q) return null;

    if (q.includes('exam') || q.includes('hall ticket') || q.includes('timetable') || q.includes('retotaling') || q.includes('marksheet')) {
      return contactsData.find((c) => c.id === 'con-03') || null;
    }
    if (q.includes('scholarship') || q.includes('nsp') || q.includes('grant') || q.includes('fellowship') || q.includes('concession')) {
      return contactsData.find((c) => c.id === 'con-02') || null;
    }
    if (q.includes('fee') || q.includes('payment') || q.includes('receipt') || q.includes('utr') || q.includes('dues') || q.includes('tuition')) {
      return contactsData.find((c) => c.id === 'con-01') || null;
    }
    if (q.includes('id card') || q.includes('identity') || q.includes('bonafide') || q.includes('bus pass') || q.includes('grievance')) {
      return contactsData.find((c) => c.id === 'con-05') || null;
    }
    if (q.includes('wifi') || q.includes('wi-fi') || q.includes('internet') || q.includes('password') || q.includes('portal') || q.includes('lms')) {
      return contactsData.find((c) => c.id === 'con-06') || null;
    }
    if (q.includes('hostel') || q.includes('room') || q.includes('mess') || q.includes('warden') || q.includes('outpass')) {
      return contactsData.find((c) => c.id === 'con-08') || null;
    }
    if (q.includes('academic') || q.includes('attendance') || q.includes('proctor') || q.includes('elective') || q.includes('leave')) {
      return contactsData.find((c) => c.id === 'con-04') || null;
    }
    if (q.includes('event') || q.includes('hackathon') || q.includes('competition') || q.includes('club') || q.includes('sprint')) {
      return contactsData.find((c) => c.id === 'con-07') || null;
    }

    // Default fallback search by text match
    return (
      contactsData.find((c) =>
        c.whatTheyHandle.some((item) => item.toLowerCase().includes(q)) ||
        c.commonKeywords.some((kw) => kw.includes(q))
      ) || null
    );
  };

  const activeProblemMatch = getProblemMatch();

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    if (onCopyToast) onCopyToast(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-6 text-center max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Who Should I Contact?
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          Stop getting redirected from office to office. Search your issue below or browse verified campus departments.
        </p>
      </div>

      {/* Interactive Problem Routing Section */}
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/90 to-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        {/* Subtle student helpdesk photo backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <img
            src={campusImages.studentHelpdesk}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-10 mix-blend-luminosity filter blur-[0.5px]"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/85 to-slate-900/95" />
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Intelligent Issue Dispatcher</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white">
            Describe your problem in plain language:
          </h3>

          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400" />
            <input
              type="text"
              value={problemQuery}
              onChange={(e) => setProblemQuery(e.target.value)}
              placeholder="e.g., I have a problem with my exam hall ticket"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 pl-12 pr-4 py-3.5 text-sm sm:text-base text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Quick Problem Queries */}
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">
              Common Student Questions:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickProblemExamples.map((ex, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setProblemQuery(ex)}
                  className="rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-300 hover:border-indigo-500/40 hover:bg-slate-800 hover:text-white transition-colors text-left"
                >
                  &ldquo;{ex}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Matched Department Result Box */}
          {activeProblemMatch && (
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Recommended Department:
                </span>
                <span className="text-xs font-mono text-slate-400">{activeProblemMatch.officeLocation}</span>
              </div>

              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {activeProblemMatch.department}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Contact Officer: <strong className="text-white">{activeProblemMatch.contactPerson}</strong> ({activeProblemMatch.role})
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Handles: {activeProblemMatch.whatTheyHandle.join(' · ')}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => onSelectContact(activeProblemMatch)}
                    className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-md transition-colors flex items-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Inquire Now</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Complete Department Directory */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Official Campus Department Directory
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified office locations, official email addresses, and direct phone lines
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">8 Offices Indexed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactsData.map((contact) => (
            <div
              key={contact.id}
              className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700/60 text-indigo-400">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {contact.department}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {contact.contactPerson} · <span className="text-slate-500">{contact.role}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* What they handle */}
                <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/50 p-3.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                    What They Handle:
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {contact.whatTheyHandle.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-indigo-400">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Details list */}
                <div className="mt-4 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span className="text-slate-300 font-medium">{contact.officeLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>{contact.officeHours}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-slate-300">
                      <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                      <span>{contact.email}</span>
                    </div>
                    <button
                      onClick={() => handleCopyEmail(contact.email)}
                      className="text-[11px] text-slate-400 hover:text-indigo-300 flex items-center gap-1"
                      title="Copy email address"
                    >
                      {copiedEmail === contact.email ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-slate-300">
                    <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>{contact.phone}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-medium">
                  Official Verification Counter
                </span>
                <button
                  onClick={() => onSelectContact(contact)}
                  className="rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white px-4 py-2 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Contact Department</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
