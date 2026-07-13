// Official faculty roster. Sort order: department chair first, then full-time
// faculty alphabetically by surname, then part-time faculty alphabetically.
// Emails follow the department convention: firstname.lastname@cit.edu
// (multi-word first/middle names are joined with no separator, e.g. Mervin John -> mervinjohn).

export interface FacultyMember {
  id: string;
  honorific: string;
  name: string;
  email: string;
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
    email: "roel.lauron@cit.edu",
    isChair: true,
    employment: "full-time",
    postGraduate: [
      "Master in Engineering with Specialization in Computer Science — Asian Institute of Technology, Bangkok, Thailand (1994)",
    ],
    undergraduate: ["Bachelor of Science in Computer Engineering, CIT-U"],
    initials: "RL",
  },
  {
    id: "nikko-alferez",
    honorific: "Engr.",
    name: "Nikko Alferez",
    email: "nikko.alferez@cit.edu",
    employment: "full-time",
    postGraduate: ["Master of Engineering Education Major in Computer Engineering, Batch 2025"],
    undergraduate: ["Bachelor of Science in Computer Engineering, CIT-University Batch 2023"],
    initials: "NA",
  },
  {
    id: "jundith-alterado",
    honorific: "Engr.",
    name: "Jundith Alterado",
    email: "jundith.alterado@cit.edu",
    employment: "full-time",
    postGraduate: ["Master of Engineering Education Major in Computer Engineering, Batch 2025"],
    undergraduate: ["Bachelor of Science in Computer Engineering, CIT-U Batch 2019"],
    initials: "JA",
  },
  {
    id: "stephanie-cortes",
    honorific: "Engr.",
    name: "Stephanie Grace Cortes",
    email: "stephaniegrace.cortes@cit.edu",
    employment: "full-time",
    postGraduate: ["Master of Science in Management Engineering, UV-Main Batch 2023"],
    undergraduate: ["Bachelor of Science in Computer Engineering, CIT-University Batch 2017"],
    initials: "SC",
  },
  {
    id: "lindl-enario",
    honorific: "Engr.",
    name: "Lindl Michael Enario",
    email: "lindlmichael.enario@cit.edu",
    employment: "full-time",
    postGraduate: ["Master of Engineering Education Major in Computer Engineering (Ongoing)"],
    undergraduate: ["Bachelor of Science in Computer Engineering, CIT-U Batch 2020"],
    initials: "LE",
  },
  {
    id: "johnalyn-figueras",
    honorific: "Engr.",
    name: "Johnalyn Figueras",
    email: "johnalyn.figueras@cit.edu",
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
    email: "jermynejosh.kaquilala@cit.edu",
    employment: "full-time",
    postGraduate: ["Masters of Engineering Education Major in Computer Engineering (Ongoing)"],
    undergraduate: ["Bachelor of Science in Computer Engineering, CIT-University Batch 2025"],
    initials: "JK",
  },
  {
    id: "julian-semblante",
    honorific: "Engr.",
    name: "Julian Semblante",
    email: "julian.semblante@cit.edu",
    employment: "full-time",
    postGraduate: ["Master of Science in Teaching Major in Mathematics"],
    undergraduate: ["Bachelor of Science in Computer Engineering"],
    initials: "JS",
  },
  {
    id: "mervin-tampus",
    honorific: "Engr.",
    name: "Mervin John Tampus",
    email: "mervinjohn.tampus@cit.edu",
    employment: "full-time",
    postGraduate: ["Master of Engineering Education Major in Computer Engineering, Batch 2025"],
    undergraduate: ["Bachelor of Science in Computer Engineering, CIT-U Batch 2023"],
    initials: "MT",
  },
  {
    id: "nash-tapayan",
    honorific: "Engr.",
    name: "Nash Uriel Tapayan",
    email: "nashuriel.tapayan@cit.edu",
    employment: "full-time",
    postGraduate: ["Masters of Engineering Education Major in Computer Engineering, Batch 2025"],
    undergraduate: ["Bachelor of Science in Computer Engineering, CIT-University Batch 2023"],
    initials: "NT",
  },
  {
    id: "mhyli-bizares",
    honorific: "Engr.",
    name: "Mhyli Jade Bizares",
    email: "mhylijade.bizares@cit.edu",
    employment: "part-time",
    postGraduate: [
      "Master of Engineering Education Major in Computer Engineering, Batch 2021",
    ],
    undergraduate: [
      "Bachelor of Science in Computer Engineering, UC-Main Batch 2015",
      "Diploma of Program Education, CTU-Main Batch 2017",
    ],
    initials: "MB",
  },
  {
    id: "jovelyn-buhawe",
    honorific: "Engr.",
    name: "Jovelyn Buhawe",
    email: "jovelyn.buhawe@cit.edu",
    employment: "part-time",
    postGraduate: ["Masters in Computer Science Work"],
    undergraduate: ["Bachelor of Science in Computer Engineering"],
    initials: "JB",
  },
  {
    id: "rex-seadino",
    honorific: "Mr.",
    name: "Rex Seadiño",
    email: "rex.seadino@cit.edu",
    employment: "part-time",
    postGraduate: ["Masters in Information Technology"],
    undergraduate: ["Bachelor of Science in Information Technology"],
    initials: "RS",
  },
];
