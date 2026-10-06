import React from 'react';
import { X, Calendar, Building2, Download, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { NoticeItem } from '../../types';
import { noticesData } from '../../data/campusData';

interface NoticeDetailModalProps {
  notice: NoticeItem | null;
  onClose: () => void;
  onSelectRelated?: (notice: NoticeItem) => void;
  onDownloadAttachment?: (fileName: string) => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({
  notice,
  onClose,
  onSelectRelated,
  onDownloadAttachment,
}) => {
  if (!notice) return null;

  const relatedNotices = noticesData
    .filter((n) => n.id !== notice.id && (n.category === notice.category || n.sourceDepartment === notice.sourceDepartment))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-[#0d131f] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Notices</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-indigo-400">{notice.category}</span>
            <span className="text-slate-600">·</span>
            <span>Published {notice.publishedDate}</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300 font-medium">{notice.sourceDepartment}</span>
            <span className="text-slate-600">·</span>
            <span
              className={`font-semibold ${
                notice.priority === 'Important'
                  ? 'text-rose-400'
                  : notice.priority === 'Upcoming'
                  ? 'text-amber-400'
                  : 'text-slate-400'
              }`}
            >
              Priority: {notice.priority}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {notice.title}
          </h2>

          {/* Important Dates Box if any */}
          {notice.importantDates && notice.importantDates.length > 0 && (
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-2">
                Key Deadlines & Milestones
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {notice.importantDates.map((item, idx) => (
                  <div key={idx} className="flex justify-between p-2 rounded-lg bg-slate-900/60">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-semibold font-mono text-white">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Full Content */}
          <div className="space-y-4 text-sm leading-relaxed text-slate-200">
            <p className="font-medium text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              {notice.shortDescription}
            </p>
            <p className="whitespace-pre-line text-slate-300">
              {notice.fullContent}
            </p>
          </div>

          {/* Attachments Section */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                Official Document Attachments ({notice.attachments.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {notice.attachments.map((att, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <FileText className="h-5 w-5 text-indigo-400 shrink-0" />
                      <div className="truncate">
                        <p className="text-xs font-medium text-white truncate">{att.name}</p>
                        <p className="text-[11px] text-slate-400">{att.size} · {att.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onDownloadAttachment && onDownloadAttachment(att.name)}
                      className="ml-2 flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors shrink-0"
                      title="Download file"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Notices */}
          {relatedNotices.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Related Notices from {notice.sourceDepartment}
              </h4>
              <div className="space-y-2">
                {relatedNotices.map((rn) => (
                  <button
                    key={rn.id}
                    onClick={() => onSelectRelated && onSelectRelated(rn)}
                    className="w-full text-left p-3 rounded-lg border border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/60 hover:border-slate-700 transition-colors flex items-center justify-between"
                  >
                    <div className="truncate">
                      <p className="text-xs font-semibold text-slate-200 truncate">{rn.title}</p>
                      <p className="text-[11px] text-slate-400">{rn.publishedDate}</p>
                    </div>
                    <span className="text-xs text-indigo-400 font-medium shrink-0 ml-4">
                      View →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-slate-900/90 px-6 py-4 flex items-center justify-between text-xs text-slate-400">
          <span>Department Stamp: Verified by {notice.sourceDepartment}</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-white hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
