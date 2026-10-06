import React from 'react';
import { ArrowRight, Calendar, Building2, Pin } from 'lucide-react';
import { NoticeItem } from '../types';

interface NoticeCardProps {
  notice: NoticeItem;
  onViewDetails: (notice: NoticeItem) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({ notice, onViewDetails }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm transition-all duration-200 hover:border-slate-700 hover:bg-slate-800/50 hover:shadow-md">
      <div>
        {/* Top Unboxed Metadata */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
          <div className="flex items-center gap-2">
            {notice.isPinned && (
              <span className="flex items-center gap-1 text-indigo-400 font-medium">
                <Pin className="h-3 w-3" /> Pinned
              </span>
            )}
            {notice.isPinned && <span className="text-slate-600">·</span>}
            <span className="font-medium text-indigo-300">{notice.category}</span>
            <span className="text-slate-600">·</span>
            <span>{notice.sourceDepartment}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            {notice.priority === 'Important' && (
              <span className="text-rose-400 font-medium">Important</span>
            )}
            {notice.priority === 'Upcoming' && (
              <span className="text-amber-400 font-medium">Upcoming</span>
            )}
            {notice.priority === 'General' && (
              <span className="text-slate-400">Notice</span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors line-clamp-2">
          {notice.title}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-2">
          {notice.shortDescription}
        </p>
      </div>

      {/* Bottom Footer Details */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-slate-400">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span>{notice.publishedDate}</span>
        </div>

        <button
          onClick={() => onViewDetails(notice)}
          className="flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
