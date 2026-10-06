import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Building2,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { CampusEvent } from '../../types';

interface EventDetailModalProps {
  event: CampusEvent | null;
  onClose: () => void;
  onRegisteredToast?: (eventName: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onRegisteredToast,
}) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [teamName, setTeamName] = useState('Campus Innovators');
  const [teamSize, setTeamSize] = useState('2');
  const [studentRoll, setStudentRoll] = useState('23CS0418 (Alex Rivera)');

  if (!event) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredSuccess(true);
    setTimeout(() => {
      if (onRegisteredToast) onRegisteredToast(event.title);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-[#0d131f] shadow-2xl">
        {/* Banner with Scrim */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-950">
          <img
            src={event.bannerImage}
            alt={event.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d131f] via-[#0d131f]/40 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white hover:bg-black/90 transition-colors backdrop-blur-sm"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Back button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/90 transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Events</span>
          </button>

          {/* Category & Status */}
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-indigo-300">
                {event.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {event.title}
              </h2>
            </div>
            <span
              className={`rounded-md px-2.5 py-1 text-xs font-semibold backdrop-blur-md ${
                event.registrationStatus === 'Open'
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
              }`}
            >
              {event.registrationStatus}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Calendar className="h-4 w-4 text-indigo-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Date</span>
                <span className="font-semibold text-white">{event.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Clock className="h-4 w-4 text-indigo-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Time</span>
                <span className="font-semibold text-white">{event.time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Venue</span>
                <span className="font-semibold text-white">{event.venue}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Building2 className="h-4 w-4 text-indigo-400 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Organizer</span>
                <span className="font-semibold text-white">{event.organizer}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Event Overview
            </h4>
            <p className="text-sm leading-relaxed text-slate-300">
              {event.description}
            </p>
          </div>

          {/* Eligibility & Deadlines */}
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Eligibility</span>
              <span className="font-semibold text-slate-200 text-right">{event.eligibility}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Registration Deadline</span>
              <span className="font-semibold text-rose-400">{event.registrationDeadline}</span>
            </div>
          </div>

          {/* Registration Form / Status */}
          {registeredSuccess ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-center">
              <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400 mb-2" />
              <h4 className="text-sm font-bold text-white">Registration Confirmed!</h4>
              <p className="mt-1 text-xs text-emerald-300">
                You are successfully registered for {event.title}. Confirmation ticket has been dispatched to your student email.
              </p>
              <div className="mt-3 text-[11px] font-mono text-slate-400">
                Ticket Reference: CMP-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>
          ) : showRegisterForm ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-3 rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Instant Student Registration
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Student Primary Participant</label>
                  <input
                    type="text"
                    disabled
                    value={studentRoll}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-2 text-slate-300 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Team / Entry Name</label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Team Size</label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white text-xs focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="1">1 (Solo)</option>
                    <option value="2">2 Members</option>
                    <option value="3">3 Members</option>
                    <option value="4">4 Members (Max)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterForm(false)}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500"
                >
                  Confirm & Submit Registration
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">
                Participation certificate & attendance exemption credited.
              </span>
              <button
                onClick={() => setShowRegisterForm(true)}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-purple-500 transition-all active:scale-95"
              >
                Register Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
