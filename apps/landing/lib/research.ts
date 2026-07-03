// Featured research shown on the landing page. The landing page only HIGHLIGHTS research and
// links out to the Research Portal, which owns and manages the full research catalog.
// Content here is provided by the Research Portal developer (titles, summaries, portal links).

export type Research = {
  id: string;
  title: string;
  // 1-2 sentence plain-language summary of the work.
  summary: string;
  authors?: string[];
  year?: string;
  area?: string; // research area, e.g. "Embedded Systems", "Software Engineering"
  url?: string; // deep link into the Research Portal
  featured?: boolean;
  // Placeholder seed data — remove once real research details are supplied.
  isSample?: boolean;
};

// SAMPLE DATA — replace with real featured research from the Research Portal developer.
export const RESEARCH: Research[] = [
  {
    id: "low-power-sensor-networks",
    title: "Low-Power Sensor Networks for Precision Agriculture",
    summary:
      "An energy-efficient wireless sensor design that extends field deployment time while reliably reporting soil and climate data.",
    area: "Embedded Systems",
    year: "2024",
    featured: true,
    isSample: true,
  },
  {
    id: "ml-automated-code-review",
    title: "Machine Learning for Automated Code Review",
    summary:
      "A model that flags likely defects in student submissions to support faster, more consistent feedback in programming courses.",
    area: "Software Engineering",
    year: "2024",
    featured: true,
    isSample: true,
  },
  {
    id: "fpga-real-time-image-processing",
    title: "FPGA-Accelerated Real-Time Image Processing",
    summary:
      "A hardware pipeline that offloads image filtering to an FPGA for low-latency processing on embedded vision systems.",
    area: "Embedded Systems",
    year: "2023",
    featured: true,
    isSample: true,
  },
];

export const FEATURED_RESEARCH: Research[] = RESEARCH.filter((r) => r.featured);
