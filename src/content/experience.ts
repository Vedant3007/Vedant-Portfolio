export type ExperienceItem = {
  id: string;
  role: string;
  organisation: string;
  location?: string;
  period?: string;
  highlights: readonly string[];
  /** e.g. "/images/experience/cargill.jpg". null shows a placeholder (work experience) or no image (community). */
  image: string | null;
  imageAlt: string;
};

export const workExperience: readonly ExperienceItem[] = [
  {
    id: "cargill",
    role: "IT Infrastructure Officer",
    organisation: "Cargill Australia",
    location: "Southbank, Melbourne",
    period: "November 2025 – March 2026",
    highlights: [
      "Delivered L1-L3 support across 16 Australian sites using ServiceNow and BMC Remedy, as the primary point of contact for 88% of tickets.",
      "Resolved 60+ incidents each month within SLA through triage, resolution and escalation.",
      "Provisioned, imaged, deployed, refreshed and decommissioned endpoints across Active Directory, Microsoft 365 and Windows environments.",
      "Managed the IT asset lifecycle, including procurement coordination, tracking and vendor engagement.",
      "Contributed to 99.87% uptime across endpoint, network and server environments supporting critical operations.",
      "Supported and troubleshot Citrix VDI, VPN, desktops, printers and critical harvesting systems across industrial and corporate environments.",
    ],
    image: "/images/experience/cargill.jpg",
    imageAlt: "Illustration representing enterprise IT support and infrastructure operations",
  },
  {
    id: "ganpat-university",
    role: "Student Intern",
    organisation: "Ganpat University",
    location: "Gujarat, India",
    period: "April 2023 – August 2023",
    highlights: [
      "Digitised and catalogued historical documents in collaboration with library staff.",
      "Supported development of a digital database for efficient information retrieval and helped the administration team improve document management workflows.",
    ],
    image: "/images/experience/ganpat-university.jpg",
    imageAlt: "Illustration representing digitised documents and a searchable database",
  },
];

export const communityActivities: readonly ExperienceItem[] = [
  {
    id: "maths-mentor",
    role: "Maths Mentor",
    organisation: "Westall Secondary College",
    period: "March 2026 – September 2026",
    highlights: [
      "Mentored Year 9 students in mathematics over a 24-week placement, running one-on-one and small-group sessions that adapted explanations to different learning styles.",
      "Supported students with concept clarification and problem-solving across multiple curriculum topics, building their confidence in mathematical reasoning.",
    ],
    image: null,
    imageAlt: "",
  },
  {
    id: "dusa-ambassador",
    role: "DUSA Ambassador",
    organisation: "Deakin University Student Association",
    period: "August 2024 – August 2026",
    highlights: [
      "Provided frontline support to students at university events and activities.",
      "Assisted the organising committee in running events such as hackathons, orientation and workshops.",
    ],
    image: null,
    imageAlt: "",
  },
  {
    id: "tech-community",
    role: "Hackathon and tech community",
    organisation: "ACUCyS Hackathon and local meetups",
    highlights: [
      "Competed in the Australian Council of University Cyber Societies (ACUCyS) Hackathon in a team of four, building GridShield, a zero-trust power grid security platform, in under 24 hours using React, Node.js/Express and the AEMO API.",
      "Regular attendee of the Melbourne AWS User Group, Microsoft Student Accelerator, GitHub Melbourne (Hacktoberfest edition) and Sunday Tech walking meetups.",
    ],
    image: null,
    imageAlt: "",
  },
];

// Used by the homepage experience preview.
const cargill = workExperience[0];

export const featuredRole = {
  role: cargill.role,
  company: cargill.organisation,
  location: cargill.location,
  period: cargill.period,
  highlights: cargill.highlights.slice(0, 4),
};