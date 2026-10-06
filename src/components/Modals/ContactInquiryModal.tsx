import React, { useState } from 'react';
import { X, Send, CheckCircle2, Building2, Phone, Mail } from 'lucide-react';
import { ContactDepartment } from '../../types';

interface ContactInquiryModalProps {
  contact: ContactDepartment | null;
  onClose: () => void;
  onSubmittedToast?: (dept: string) => void;
}

export const ContactInquiryModal: React.FC<ContactInquiryModalProps> = ({
  contact,
  onClose,
  onSubmittedToast,
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!contact) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (onSubmittedToast) onSubmittedToast(contact.department);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-[#0d131f] shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white">{contact.department}</h3>
              <p className="text-[11px] text-slate-400">{contact.officeLocation}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
              <h4 className="text-base font-bold text-white">Inquiry Dispatched</h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Your inquiry has been routed to {contact.contactPerson} at {contact.department}. Typical response time is within 1 business day during office hours ({contact.officeHours}).
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Contact Officer:</span>
                  <span className="font-medium text-slate-200">{contact.contactPerson}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Email:</span>
                  <span className="font-mono text-indigo-300">{contact.email}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Office Hours:</span>
                  <span className="text-slate-300">{contact.officeHours}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Inquiry Topic / Reason
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hall ticket correction / Fee receipt reconciliation"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Detailed Explanation
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain your problem, relevant transaction IDs, subject codes, or dates..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Student ID: 23CS0418 auto-attached
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
