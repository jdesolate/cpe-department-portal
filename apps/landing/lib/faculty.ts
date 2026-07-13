// Official faculty roster. Sort order: department chair first, then full-time
// faculty alphabetically by surname, then part-time faculty alphabetically.

export interface FacultyMember {
  id: string;
  honorific: string;
  name: string;
  isChair?: boolean;
  employment: "full-time" | "part-time";
  postGraduate: string[];
  undergraduate: string[];
  initials: string;
}

export const FACULTY: FacultyMember[] = [
  {
    id: "roel-lauron",
    honorific: "Engr.",
    name: "Roel Lauron",
    isChair: true,
    employment: "full-time",
    postGraduate: [
      "Master in Engineering with Specialization in Computer Science — Asian Institute of Technology, Bangkok, Thailand (1994)",
    ],
    undergraduate: ["BS in Computer Engineering, CIT-U"],
    initials: "RL",
  },
  {
    id: "nikko-alferez",
    honorific: "Engr.",
    name: "Nikko Alferez",
    employment: "full-time",
    postGraduate: ["Master of Engineering Education Major in Computer Engineering"],
    undergraduate: ["BS in Computer Engineering, CIT-University Batch 2023"],
    initials: "NA",
  },
  {
    id: "jundith-alterado",
    honorific: "Engr.",
    name: "Jundith Alterado",
    employment: "full-time",
    postGraduate: ["Master of Engineering Education Major in Computer Engineering"],
    undergraduate: ["Bachelor of Science in Computer Engineering, CIT-U Batch 2019"],
    initials: "JA",
  },
  {
    id: "stephanie-cortes",
    honorific: "Engr.",
    name: "Stephanie Grace Cortes",
    employment: "full-time",
    postGraduate: ["Master of Science in Management Engineering, UV-Main Batch 2023"],
    undergraduate: ["BS in Computer Engineering, CIT-University Batch 2017"],
    initials: "SC",
  },
  {
    id: "lindl-enario",
    honorific: "Engr.",
    name: "Lindl Michael Enario",
    employment: "full-time",
    postGraduate: ["Master of Engineering Education Major in Computer Engineering (Ongoing)"],
    undergraduate: ["BS in Computer Engineering, CIT-U Batch 2020"],
    initials: "LE",
  },
  {
    id: "johnalyn-figueras",
    honorific: "Engr.",
    name: "Johnalyn Figueras",
    employment: "full-time",
    postGraduate: [
      "Doctor in Information Technology (Dissertation Stage)",
      "Masters in Computer Science",
    ],
    undergraduate: ["Bachelor of Science in Computer Engineering"],
    initials: "JF",
  },
  {
    id: "jermyne-kaquilala",
    honorific: "Engr.",
    name: "Jermyne Josh Kaquilala",
    employment: "full-time",
    postGraduate: ["Masters of Engineering Education Major in Computer Engineering (Ongoing)"],
    undergraduate: ["BS in Computer Engineering, CIT-University Batch 2025"],
    initials: "JK",
  },
  {
    id: "julian-semblante",
    honorific: "Engr.",
    name: "Julian Semblante",
    employment: "full-time",
    postGraduate: ["MST Major in Mathematics"],
    undergraduate: ["BS in Computer Engineering"],
    initials: "JS",
  },
  {
    id: "mervin-tampus",
    honorific: "Engr.",
    name: "Mervin John Tampus",
    employment: "full-time",
    postGraduate: ["Master of Engineering Education Major in Computer Engineering"],
    undergraduate: ["BS in Computer Engineering, CIT-U Batch 2023"],
    initials: "MT",
  },
  {
    id: "nash-tapayan",
    honorific: "Engr.",
    name: "Nash Uriel Tapayan",
    employment: "full-time",
    postGraduate: ["Masters of Engineering Education Major in Computer Engineering"],
    undergraduate: ["BS in Computer Engineering, CIT-University Batch 2023"],
    initials: "NT",
  },
  {
    id: "mhyli-bizares",
    honorific: "Engr.",
    name: "Mhyli Jade Cereneo Bizares",
    employment: "part-time",
    postGraduate: [
      "Master of Engineering Education Major in Computer Engineering, Batch 2021",
    ],
    undergraduate: [
      "BS in Computer Engineering, UC-Main Batch 2015",
      "Diploma of Program Education, CTU-Main Batch 2017",
    ],
    initials: "MB",
  },
  {
    id: "jovelyn-buhawe",
    honorific: "Engr.",
    name: "Jovelyn Buhawe",
    employment: "part-time",
    postGraduate: ["Masters in Computer Science Work"],
    undergraduate: ["BS in Computer Engineering"],
    initials: "JB",
  },
  {
    id: "rex-seadino",
    honorific: "Mr.",
    name: "Rex Seadiño",
    employment: "part-time",
    postGraduate: ["Masters in Information Technology"],
    undergraduate: ["BS in Information Technology"],
    initials: "RS",
  },
];
