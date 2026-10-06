import React from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { CampusEvent } from '../types';

interface EventCardProps {
  event: CampusEvent;
  onViewEvent: (event: CampusEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewEvent }) => {
  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm transition-all duration-200 hover:border-slate-700 hover:bg-slate-800/50 hover:shadow-lg">
      {/* Banner Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
        <img
          src={event.bannerImage}
          alt={event.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="100%" height="100%" fill="%230f172a"/><text x="50%" y="50%" fill="%2364748b" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">Campus Event Preview</text></svg>';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

        {/* Status Badge in corner */}
        <div className="absolute top-3 right-3">
          <span
            className={`rounded-md px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md shadow-sm ${
              event.registrationStatus === 'Open'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                : event.registrationStatus === 'Closing Soon'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                : 'bg-slate-900/80 text-slate-400 border border-slate-700'
            }`}
          >
            {event.registrationStatus}
          </span>
        </div>

        {/* Category & Organizer */}
        <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 flex items-center justify-between">
          <span className="font-semibold text-indigo-300">{event.category}</span>
          <span className="text-[11px] text-slate-400">{event.organizer}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
            {event.title}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-2">
            {event.description}
          </p>

          <div className="mt-4 space-y-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Deadline: {event.registrationDeadline}
          </span>

          <button
            onClick={() => onViewEvent(event)}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>View Event</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
