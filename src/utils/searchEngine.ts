import {
  noticesData,
  eventsData,
  examsData,
  scholarshipsData,
  documentsData,
  contactsData,
} from '../data/campusData';
import {
  CategoryType,
  SearchResultItem,
  DirectAnswer,
} from '../types';

export interface SearchOutcome {
  directAnswer: DirectAnswer | null;
  results: SearchResultItem[];
  totalMatches: number;
}

export function searchCampus(
  query: string,
  selectedCategory: CategoryType | 'All' = 'All'
): SearchOutcome {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    return { directAnswer: null, results: [], totalMatches: 0 };
  }

  // 1. Check for Natural Language Intent to generate DirectAnswer
  const directAnswer = resolveNaturalLanguageIntent(cleanQuery);

  // 2. Multi-collection indexing and scoring
  const rawResults: SearchResultItem[] = [];

  // Index Notices
  noticesData.forEach((notice) => {
    const textToMatch = `${notice.title} ${notice.shortDescription} ${notice.fullContent} ${notice.category} ${notice.sourceDepartment}`.toLowerCase();
    const score = computeRelevance(cleanQuery, textToMatch, notice.title.toLowerCase());
    if (score > 0) {
      rawResults.push({
        id: notice.id,
        category: 'Notices',
        title: notice.title,
        summary: notice.shortDescription,
        date: notice.publishedDate,
        source: notice.sourceDepartment,
        relevanceScore: score + (notice.isPinned ? 5 : 0),
        metadata: {
          Category: notice.category,
          Priority: notice.priority,
        },
        rawObject: notice,
      });
    }
  });

  // Index Exams
  examsData.forEach((exam) => {
    const textToMatch = `${exam.subjectName} ${exam.subjectCode} ${exam.examType} ${exam.venue} ${exam.guidelines} exam timetable schedule test`.toLowerCase();
    const score = computeRelevance(cleanQuery, textToMatch, exam.subjectName.toLowerCase());
    if (score > 0) {
      rawResults.push({
        id: exam.id,
        category: 'Exams',
        title: `${exam.subjectName} (${exam.subjectCode})`,
        summary: `${exam.examType} on ${exam.formattedDate} at ${exam.time}. Venue: ${exam.venue}`,
        date: exam.formattedDate,
        source: 'Examination Cell',
        relevanceScore: score + 10,
        metadata: {
          Time: exam.time,
          Venue: exam.venue,
          Type: exam.examType,
        },
        rawObject: exam,
      });
    }
  });

  // Index Events
  eventsData.forEach((event) => {
    const textToMatch = `${event.title} ${event.category} ${event.description} ${event.organizer} ${event.tags.join(' ')} competition hackathon workshop`.toLowerCase();
    const score = computeRelevance(cleanQuery, textToMatch, event.title.toLowerCase());
    if (score > 0) {
      rawResults.push({
        id: event.id,
        category: 'Events',
        title: event.title,
        summary: event.description,
        date: event.date,
        source: event.organizer,
        relevanceScore: score,
        metadata: {
          Category: event.category,
          Venue: event.venue,
          Status: event.registrationStatus,
        },
        rawObject: event,
      });
    }
  });

  // Index Scholarships
  scholarshipsData.forEach((sch) => {
    const textToMatch = `${sch.title} ${sch.amount} ${sch.eligibility} ${sch.documentsRequired} scholarship fee financial aid`.toLowerCase();
    const score = computeRelevance(cleanQuery, textToMatch, sch.title.toLowerCase());
    if (score > 0) {
      rawResults.push({
        id: sch.id,
        category: 'Scholarships',
        title: sch.title,
        summary: `Benefit: ${sch.amount}. Eligibility: ${sch.eligibility}`,
        date: `Deadline: ${sch.deadline}`,
        source: sch.department,
        relevanceScore: score,
        metadata: {
          Amount: sch.amount,
          Deadline: sch.deadline,
          Status: sch.status,
        },
        rawObject: sch as any,
      });
    }
  });

  // Index Documents
  documentsData.forEach((doc) => {
    const textToMatch = `${doc.title} ${doc.category} ${doc.description} ${doc.department} form application certificate download`.toLowerCase();
    const score = computeRelevance(cleanQuery, textToMatch, doc.title.toLowerCase());
    if (score > 0) {
      rawResults.push({
        id: doc.id,
        category: 'Documents',
        title: doc.title,
        summary: doc.description,
        date: `Updated ${doc.lastUpdated}`,
        source: doc.department,
        relevanceScore: score,
        metadata: {
          Category: doc.category,
          Size: doc.fileSize,
          Format: doc.format,
        },
        rawObject: doc,
      });
    }
  });

  // Index Contacts
  contactsData.forEach((con) => {
    const textToMatch = `${con.department} ${con.contactPerson} ${con.role} ${con.whatTheyHandle.join(' ')} ${con.commonKeywords.join(' ')} ${con.officeLocation}`.toLowerCase();
    const score = computeRelevance(cleanQuery, textToMatch, con.department.toLowerCase());
    if (score > 0) {
      rawResults.push({
        id: con.id,
        category: 'Contacts',
        title: con.department,
        summary: `Handles: ${con.whatTheyHandle.slice(0, 3).join(', ')}. Contact: ${con.contactPerson} (${con.role}).`,
        source: con.officeLocation,
        relevanceScore: score,
        metadata: {
          Email: con.email,
          Phone: con.phone,
          Hours: con.officeHours,
        },
        rawObject: con,
      });
    }
  });

  // Filter by selected category if not 'All'
  const filteredResults = selectedCategory === 'All'
    ? rawResults
    : rawResults.filter((item) => item.category === selectedCategory);

  // Sort descending by relevance score
  filteredResults.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));

  return {
    directAnswer,
    results: filteredResults,
    totalMatches: filteredResults.length,
  };
}

function computeRelevance(query: string, text: string, title: string): number {
  let score = 0;
  const words = query.split(/\s+/).filter(w => w.length > 2);

  if (title.includes(query)) {
    score += 80;
  }
  if (text.includes(query)) {
    score += 40;
  }

  for (const word of words) {
    if (title.includes(word)) score += 20;
    if (text.includes(word)) score += 8;
  }

  return score;
}

function resolveNaturalLanguageIntent(q: string): DirectAnswer | null {
  // 1. Next exam or specific exam queries
  if (
    q.includes('dsa') ||
    q.includes('data structure') ||
    (q.includes('exam') && (q.includes('when') || q.includes('next') || q.includes('time') || q.includes('schedule') || q.includes('date')))
  ) {
    if (q.includes('dsa') || q.includes('data structure')) {
      return {
        questionIntent: 'When is the DSA exam?',
        headlineAnswer: 'Your DSA Mid-1 Examination is scheduled for October 18, 2026 from 10:00 AM to 12:00 PM.',
        keyDetails: [
          { label: 'Subject', value: 'Data Structures & Algorithms (CS301)' },
          { label: 'Date', value: 'October 18, 2026' },
          { label: 'Time', value: '10:00 AM - 12:00 PM' },
          { label: 'Venue', value: 'Block A - Room 204' },
          { label: 'Coverage', value: 'Units 1 & 2 (Arrays, Stacks, Queues, Linked Lists, Trees)' },
        ],
        sourceDepartment: 'Examination Cell',
        confidence: 'High',
      };
    }

    if (q.includes('ai') || q.includes('artificial intelligence') || q.includes('machine learning')) {
      return {
        questionIntent: 'When is the AI & ML exam?',
        headlineAnswer: 'Your Artificial Intelligence & Machine Learning Mid-1 Examination is scheduled for October 20, 2026 at 10:00 AM in Block B - Room 108.',
        keyDetails: [
          { label: 'Subject', value: 'AI & Machine Learning (CS304)' },
          { label: 'Date', value: 'October 20, 2026' },
          { label: 'Time', value: '10:00 AM - 12:00 PM' },
          { label: 'Venue', value: 'Block B - Room 108' },
        ],
        sourceDepartment: 'Examination Cell',
        confidence: 'High',
      };
    }

    if (q.includes('java')) {
      return {
        questionIntent: 'When is the Java exam?',
        headlineAnswer: 'Your Java Programming Mid-1 Examination is scheduled for October 22, 2026 at 02:00 PM in Block A - Room 202.',
        keyDetails: [
          { label: 'Subject', value: 'Java Programming & OOD (CS302)' },
          { label: 'Date', value: 'October 22, 2026' },
          { label: 'Time', value: '02:00 PM - 04:00 PM' },
          { label: 'Venue', value: 'Block A - Room 202' },
        ],
        sourceDepartment: 'Examination Cell',
        confidence: 'High',
      };
    }

    // Default next exam
    return {
      questionIntent: 'When is the next exam?',
      headlineAnswer: 'The next upcoming examination is Data Structures & Algorithms (CS301) Mid-1 on October 18, 2026 at 10:00 AM.',
      keyDetails: [
        { label: 'Exam', value: 'DSA Mid-1 Examination' },
        { label: 'Date & Time', value: 'October 18, 2026 · 10:00 AM' },
        { label: 'Venue', value: 'Block A - Room 204' },
        { label: 'Subsequent Exam', value: 'AI & ML on Oct 20, 2026' },
      ],
      sourceDepartment: 'Examination Cell',
      confidence: 'High',
    };
  }

  // 2. Competitions and events
  if (
    q.includes('competition') ||
    q.includes('competitions') ||
    q.includes('hackathon') ||
    q.includes('random sprint') ||
    q.includes('upcoming events') ||
    (q.includes('show') && q.includes('event'))
  ) {
    return {
      questionIntent: 'Upcoming Campus Competitions & Events',
      headlineAnswer: 'There are 4 active upcoming student competitions this term, led by Random Sprint 2026 on October 28 and the Annual Hackathon on November 8.',
      keyDetails: [
        { label: 'Flagship Event', value: 'Random Sprint 2026 (Oct 28 · Reg Deadline Oct 22)' },
        { label: 'Major Hackathon', value: 'Smart Campus Annual Hackathon (Nov 08-09)' },
        { label: 'Technical Quiz', value: 'IEEE Quiz Championship (Oct 24)' },
        { label: 'Coding Contest', value: 'Coding Contest Blitz (Oct 30 · HackerEarth)' },
      ],
      sourceDepartment: 'Student Activities Cell',
      confidence: 'High',
    };
  }

  // 3. Contact for Scholarship issues
  if (
    (q.includes('contact') || q.includes('who') || q.includes('where') || q.includes('help')) &&
    (q.includes('scholarship') || q.includes('financial aid') || q.includes('nsp') || q.includes('fee concession'))
  ) {
    return {
      questionIntent: 'Who should I contact for scholarship issues?',
      headlineAnswer: 'For scholarship verification, NSP forms, or fee concession documents, contact the Scholarship Cell.',
      keyDetails: [
        { label: 'Department', value: 'Scholarship Cell' },
        { label: 'Contact Person', value: 'Dr. Anita Deshmukh (Scholarship Nodal Officer)' },
        { label: 'Office Location', value: 'Administrative Block, Ground Floor, Counter 4' },
        { label: 'Email', value: 'scholarships@smartcampus.edu' },
        { label: 'Phone', value: '+91 98765 43211' },
        { label: 'Office Hours', value: 'Mon – Fri: 10:00 AM – 04:00 PM' },
      ],
      sourceDepartment: 'Scholarship Cell',
      confidence: 'High',
    };
  }

  // 4. Contact for Fee issues
  if (
    (q.includes('contact') || q.includes('who') || q.includes('issue') || q.includes('problem') || q.includes('receipt') || q.includes('pay')) &&
    (q.includes('fee') || q.includes('fees') || q.includes('tuition') || q.includes('payment') || q.includes('utr'))
  ) {
    return {
      questionIntent: 'Who should I contact for fee issues?',
      headlineAnswer: 'Fee payments, SBI Collect receipts, and transaction reconciliation are managed by the Accounts Department.',
      keyDetails: [
        { label: 'Department', value: 'Accounts Department' },
        { label: 'Contact Person', value: 'Mr. R. K. Sharma (Senior Finance Officer)' },
        { label: 'Office Location', value: 'Administrative Block, Ground Floor, Counter 2' },
        { label: 'Email', value: 'accounts@smartcampus.edu' },
        { label: 'Phone', value: '+91 98765 43210' },
        { label: 'Office Hours', value: 'Mon – Fri: 09:30 AM – 04:30 PM' },
      ],
      sourceDepartment: 'Accounts Department',
      confidence: 'High',
    };
  }

  // 5. Contact for Hall ticket / Exam issues
  if (
    q.includes('hall ticket') ||
    (q.includes('exam') && (q.includes('issue') || q.includes('problem') || q.includes('contact') || q.includes('correction') || q.includes('admit card')))
  ) {
    return {
      questionIntent: 'I have a problem with my exam hall ticket.',
      headlineAnswer: 'All hall ticket discrepancies, subject code mismatches, and exam seating queries are resolved directly by the Examination Cell.',
      keyDetails: [
        { label: 'Department', value: 'Examination Cell' },
        { label: 'Controller', value: 'Prof. K. V. Ramanathan (Controller of Examinations)' },
        { label: 'Office Location', value: 'Administrative Block, First Floor, Room 102' },
        { label: 'Handles', value: 'Hall tickets, exam schedules, exam forms, retotaling' },
        { label: 'Email', value: 'examcell@smartcampus.edu' },
        { label: 'Phone', value: '+91 98765 43212' },
      ],
      sourceDepartment: 'Examination Cell',
      confidence: 'High',
    };
  }

  // 6. Wi-Fi / IT / Login issues
  if (q.includes('wifi') || q.includes('wi-fi') || q.includes('internet') || q.includes('password') || q.includes('portal') || q.includes('lms')) {
    return {
      questionIntent: 'Campus Wi-Fi or portal access assistance',
      headlineAnswer: 'Campus network login, college email accounts, and LMS authentication are handled by IT Support & Infrastructure.',
      keyDetails: [
        { label: 'Department', value: 'IT Support & Infrastructure' },
        { label: 'Lead', value: 'Mr. Arvind Saxena (Systems Administrator)' },
        { label: 'Location', value: 'Computer Center Building, Ground Floor, Server Room A' },
        { label: 'Email', value: 'itsupport@smartcampus.edu' },
        { label: 'Hours', value: 'Mon – Sat: 08:30 AM – 06:00 PM' },
      ],
      sourceDepartment: 'IT Support & Infrastructure',
      confidence: 'High',
    };
  }

  // 7. ID Card or Bonafide certificate
  if (q.includes('id card') || q.includes('identity card') || q.includes('bonafide') || q.includes('bus pass')) {
    return {
      questionIntent: 'Student ID card replacement and Bonafide certificates',
      headlineAnswer: 'Student Services issues replacement RFID identity cards and verifies bonafide applications within 2 business days.',
      keyDetails: [
        { label: 'Department', value: 'Student Services' },
        { label: 'Coordinator', value: 'Ms. Priyadarshini Roy (Student Welfare Coordinator)' },
        { label: 'Location', value: 'Student Amenities Center, First Floor' },
        { label: 'Email', value: 'studentservices@smartcampus.edu' },
        { label: 'Processing Time', value: '48 Hours upon submitting Form Doc-03/05' },
      ],
      sourceDepartment: 'Student Services',
      confidence: 'High',
    };
  }

  // 8. Hostel queries
  if (q.includes('hostel') || q.includes('room') || q.includes('mess') || q.includes('warden')) {
    return {
      questionIntent: 'Hostel accommodation, mess and maintenance',
      headlineAnswer: 'Hostel room allocations, maintenance requests, and night outpass approvals are managed by the Hostel Central Office.',
      keyDetails: [
        { label: 'Department', value: 'Hostel & Residence Office' },
        { label: 'Chief Warden', value: 'Col. (Retd.) B. Singh' },
        { label: 'Location', value: 'Hostel Central Office, Near Dining Hall 1' },
        { label: 'Email', value: 'hosteloffice@smartcampus.edu' },
        { label: 'Hours', value: 'Daily: 08:00 AM – 08:00 PM' },
      ],
      sourceDepartment: 'Hostel & Residence Office',
      confidence: 'High',
    };
  }

  return null;
}
