"use client";

import { useState } from "react";
import Tag from "@/components/ui/Tag";
import TraceDivider from "@/components/ui/TraceDivider";
import { FEATURED_PROJECTS, type Project } from "@/lib/projects";

const COURSES = ["All", ...Array.from(new Set(FEATURED_PROJECTS.map((p) => p.course)))];

function ProjectLinks({ project }: { project: Project }) {
  const links = [
    { label: "GitHub", href: project.githubUrl },
    { label: "SRS", href: project.srsUrl },
    { label: "Slides", href: project.presentationUrl },
  ].filter((l): l is { label: string; href: string } => Boolean(l.href));

  if (links.length === 0) return null;

  return (
    <div className="flex items-center gap-3 pt-1">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-mono text-gold-text hover:text-maroon-bright transition-colors"
        >
          {link.label} →
        </a>
      ))}
    </div>
  );
}

export default function FeaturedProjects() {
  const [activeCourse, setActiveCourse] = useState("All");
  const projects =
    activeCourse === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.course === activeCourse);

  return (
    <section id="featured-projects" className="max-w-7xl mx-auto px-4 md:px-6 py-16 scroll-mt-20">
      <TraceDivider label="Featured Student Projects" as="h2" className="mb-6" />
      <p className="text-gray max-w-2xl mb-8 leading-relaxed">
        The work our students actually build — evidence of the software and embedded systems
        engineering that makes them industry-ready.
      </p>

      {COURSES.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {COURSES.map((course) => (
            <button
              key={course}
              onClick={() => setActiveCourse(course)}
              className={`font-mono text-[11px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-[4px] border transition-colors duration-200 cursor-pointer ${
                activeCourse === course
                  ? "border-maroon-bright text-maroon-bright bg-maroon-bright/5"
                  : "border-line text-gray hover:text-foreground hover:border-gold/40"
              }`}
            >
              {course}
            </button>
          ))}
        </div>
      )}

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="via-card overflow-hidden flex flex-col group hover:border-gold/40 transition-all duration-300"
            >
              {/* Screenshot */}
              <div className="aspect-video w-full bg-background border-b border-line overflow-hidden">
                {project.screenshot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.screenshot}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-gray bg-card px-3 py-1 rounded-[2px] border border-line">
                      Screenshot coming soon
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag tone="gold">{project.course}</Tag>
                  {project.academicYear && <Tag tone="muted">AY {project.academicYear}</Tag>}
                  {project.isSample && <Tag tone="muted">Sample</Tag>}
                </div>

                <h3 className="font-display font-semibold text-base text-foreground group-hover:text-gold-text transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-sm text-gray font-light leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono text-gray bg-background border border-line rounded-[2px] px-2 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.teamMembers.length > 0 && (
                  <p className="text-[11px] text-gray font-mono">
                    {project.teamMembers.join(" · ")}
                  </p>
                )}

                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-line rounded-[4px]">
          <p className="text-sm text-gray font-mono italic">No projects in this course yet.</p>
        </div>
      )}
    </section>
  );
}
