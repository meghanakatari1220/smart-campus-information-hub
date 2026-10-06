import React from 'react';
import { X, Calendar, Clock, MapPin, Download, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { ExamItem } from '../../types';

interface ExamDetailModalProps {
  exam: ExamItem | null;
  onClose: () => void;
  onDownloadHallTicket?: (subject: string) => void;
}

export const ExamDetailModal: React.FC<ExamDetailModalProps> = ({
  exam,
  onClose,
  onDownloadHallTicket,
}) => {
  if (!exam) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-800 bg-[#0d131f] shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-500/20">
              {exam.subjectCode}
            </span>
            <span className="text-xs text-slate-400">{exam.examType} Examination</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h3 className="text-xl font-bold text-white">
              {exam.subjectName}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Administered by {exam.department}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Examination Date</span>
              <span className="font-semibold text-white mt-0.5 block">{exam.formattedDate}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Reporting & Exam Time</span>
              <span className="font-semibold font-mono text-white mt-0.5 block">{exam.time}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 sm:col-span-2">
              <span className="text-slate-400 block text-[11px]">Allocated Seating Venue</span>
              <span className="font-bold text-indigo-300 mt-0.5 block">{exam.venue}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              Syllabus Scope & Examination Protocols
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {exam.guidelines}
            </p>
            <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1 pt-1">
              <li>Entry into the examination hall closes 15 minutes before slot kickoff.</li>
              <li>Calculators must strictly adhere to university non-programmable norms.</li>
              <li>Barcoded answer booklets must not have any identifying stray marks.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
            <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>Student Hall Ticket Eligibility: Approved</span>
            </div>
            <button
              onClick={() => onDownloadHallTicket && onDownloadHallTicket(exam.subjectName)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-indigo-500"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Hall Ticket</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
