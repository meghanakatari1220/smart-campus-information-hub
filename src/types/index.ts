export type CategoryType = 
  | 'Notices'
  | 'Exams'
  | 'Academics'
  | 'Events'
  | 'Scholarships'
  | 'Fees'
  | 'Documents'
  | 'Contacts';

export type NoticePriority = 'Important' | 'Upcoming' | 'General';

export type NoticeCategory = 
  | 'Academic'
  | 'Examination'
  | 'Administrative'
  | 'Events'
  | 'Scholarships'
  | 'Fees'
  | 'General';

export interface NoticeItem {
  id: string;
  title: string;
  category: NoticeCategory;
  shortDescription: string;
  fullContent: string;
  publishedDate: string; // e.g., 'Oct 14, 2026'
  sourceDepartment: string;
  priority: NoticePriority;
  attachments?: { name: string; size: string; type: string }[];
  importantDates?: { label: string; date: string }[];
  isPinned?: boolean;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'Technical' | 'Hackathon' | 'Competition' | 'Workshop' | 'Cultural';
  date: string;
  time: string;
  venue: string;
  organizer: string;
  description: string;
  eligibility: string;
  registrationDeadline: string;
  registrationStatus: 'Open' | 'Closing Soon' | 'Closed';
  bannerImage: string;
  tags: string[];
}

export interface ExamItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  examType: 'Mid-1' | 'Mid-2' | 'Semester End' | 'Practical Lab';
  date: string; // e.g., '2026-10-18'
  formattedDate: string; // 'Oct 18, 2026'
  time: string; // '10:00 AM - 12:00 PM'
  venue: string;
  department: string;
  guidelines: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Exam Forms' | 'Scholarship Forms' | 'Certificates' | 'Academic Forms' | 'Administrative';
  description: string;
  lastUpdated: string;
  fileSize: string;
  format: 'PDF' | 'DOCX';
  department: string;
}

export interface ContactDepartment {
  id: string;
  department: string;
  contactPerson: string;
  role: string;
  whatTheyHandle: string[];
  officeLocation: string;
  email: string;
  phone: string;
  officeHours: string;
  commonKeywords: string[];
}

export interface DirectAnswer {
  questionIntent: string;
  headlineAnswer: string;
  keyDetails: { label: string; value: string }[];
  sourceDepartment: string;
  confidence: 'High' | 'Medium';
}

export interface SearchResultItem {
  id: string;
  category: CategoryType;
  title: string;
  summary: string;
  date?: string;
  source: string;
  relevanceScore?: number;
  metadata?: Record<string, string>;
  rawObject?: NoticeItem | CampusEvent | ExamItem | DocumentItem | ContactDepartment;
}

export type ActiveTab = 'home' | 'search' | 'notices' | 'information' | 'contact';
