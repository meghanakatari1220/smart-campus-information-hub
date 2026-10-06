import React, { useState, useEffect } from 'react';
import {
  ActiveTab,
  NoticeItem,
  CampusEvent,
  ExamItem,
  ContactDepartment,
} from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { NoticesPage } from './pages/NoticesPage';
import { InformationPage } from './pages/InformationPage';
import { ContactPage } from './pages/ContactPage';
import { NoticeDetailModal } from './components/Modals/NoticeDetailModal';
import { EventDetailModal } from './components/Modals/EventDetailModal';
import { ExamDetailModal } from './components/Modals/ExamDetailModal';
import { ContactInquiryModal } from './components/Modals/ContactInquiryModal';
import { CheckCircle2, Download, Copy, Send } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [searchContextQuery, setSearchContextQuery] = useState<string>('');
  const [infoInitialSection, setInfoInitialSection] = useState<string>('Academics');

  // Modal States
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactDepartment | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    description: string;
    icon?: 'download' | 'success' | 'copy' | 'send';
  } | null>(null);

  const showToast = (
    title: string,
    description: string,
    icon: 'download' | 'success' | 'copy' | 'send' = 'success'
  ) => {
    setToastMessage({ title, description, icon });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleNavigate = (tab: ActiveTab, context?: string) => {
    setActiveTab(tab);
    if (tab === 'search' && context) {
      setSearchContextQuery(context);
    } else if (tab === 'information' && context) {
      setInfoInitialSection(context);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeroSearch = (query: string) => {
    setSearchContextQuery(query);
    setActiveTab('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadDoc = (docName: string) => {
    showToast('Document Download Initiated', `${docName} saved to downloads.`, 'download');
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sticky Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onSelectNotice={(notice) => setSelectedNotice(notice)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onSearch={handleHeroSearch}
            onNavigate={handleNavigate}
            onSelectNotice={(n) => setSelectedNotice(n)}
            onSelectEvent={(e) => setSelectedEvent(e)}
            onSelectExam={(ex) => setSelectedExam(ex)}
          />
        )}

        {activeTab === 'search' && (
          <SearchPage
            initialQuery={searchContextQuery}
            onSelectNotice={(n) => setSelectedNotice(n)}
            onSelectEvent={(e) => setSelectedEvent(e)}
            onSelectExam={(ex) => setSelectedExam(ex)}
            onSelectContact={(c) => setSelectedContact(c)}
            onDownloadDoc={handleDownloadDoc}
          />
        )}

        {activeTab === 'notices' && (
          <NoticesPage
            onSelectNotice={(n) => setSelectedNotice(n)}
          />
        )}

        {activeTab === 'information' && (
          <InformationPage
            initialSection={infoInitialSection}
            onSelectEvent={(e) => setSelectedEvent(e)}
            onSelectExam={(ex) => setSelectedExam(ex)}
            onDownloadDoc={handleDownloadDoc}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            onSelectContact={(c) => setSelectedContact(c)}
            onCopyToast={(email) =>
              showToast('Copied to Clipboard', `Email ${email} copied.`, 'copy')
            }
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Notice Detail Modal */}
      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
        onSelectRelated={(n) => setSelectedNotice(n)}
        onDownloadAttachment={(fileName) =>
          showToast('Attachment Downloaded', `${fileName} saved.`, 'download')
        }
      />

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegisteredToast={(eventName) =>
          showToast(
            'Registration Successful!',
            `You are registered for ${eventName}. Ticket sent to your student email.`,
            'success'
          )
        }
      />

      {/* Exam Detail Modal */}
      <ExamDetailModal
        exam={selectedExam}
        onClose={() => setSelectedExam(null)}
        onDownloadHallTicket={(subject) =>
          showToast(
            'Hall Ticket Downloaded',
            `Official Mid-1 admit slip for ${subject} downloaded.`,
            'download'
          )
        }
      />

      {/* Contact Inquiry Modal */}
      <ContactInquiryModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onSubmittedToast={(dept) =>
          showToast(
            'Inquiry Submitted',
            `Your query has been routed to ${dept}.`,
            'send'
          )
        }
      />

      {/* Global Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-indigo-500/30 bg-[#0e1626]/95 px-4 py-3 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400">
            {toastMessage.icon === 'download' && <Download className="h-4 w-4" />}
            {toastMessage.icon === 'copy' && <Copy className="h-4 w-4" />}
            {toastMessage.icon === 'send' && <Send className="h-4 w-4" />}
            {toastMessage.icon === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">{toastMessage.title}</h5>
            <p className="text-[11px] text-slate-300">{toastMessage.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
