"use client";
import React, { useState } from "react";
import Navbar from "./components/NavBar";
import ProjectCard from "./components/ProjectCard";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { usePortfolio, Project } from "./context/PortfolioContext";
import RollingText from "./components/RollingText";
import StackSelector from "./components/StackSelector";
import FadeInOnScroll from "./components/FadeInOnScroll";
import FloatingBubbles from "./components/FloatingBubbles";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// project data for the Featured Projects section
const sampleProjects = [
  {
    id: "1",
    title: "Portfolio Website (hosted on Vercel)",
    description:
      "A modern, animated portfolio built with Next.js, TypeScript and Material UI. Features dark/light mode, custom theming, smooth section navigation, and a responsive design.",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    githubUrl: "https://github.com/paalHagen/portfolio-site",
    liveUrl: "#",
    stack: ["Next.js", "TypeScript", "Material UI", "React", "Vercel"],
    problem:
      "I needed a professional portfolio to showcase my transition from social work to computer science, demonstrating both technical skills and the human-centered approach I bring to development.",
    solution:
      "Built a modern, accessible portfolio using Next.js App Router with TypeScript for type safety, Material UI for consistent design, and custom animations that respect user preferences for reduced motion.",
    role: "Full-stack developer - Designed, developed, and deployed the entire application with focus on accessibility, performance, and user experience.",
    challenges: [
      "Migrating from Next.js Pages Router to App Router while maintaining functionality",
      "Implementing dark/light mode without flash of wrong theme on page load",
      "Ensuring accessibility compliance with WCAG 2.2 standards",
      "Optimizing performance with next/image and font optimization",
    ],
    takeaways: [
      "Advanced Next.js routing patterns and server-side rendering best practices",
      "How to implement accessible animations that respect user preferences",
      "Performance optimization techniques for modern web applications",
      "The importance of semantic HTML and proper focus management",
    ],
    impact:
      "Created a portfolio that loads in under 2 seconds, achieves 95+ Lighthouse scores, and provides an accessible experience for all users.",
  },
  {
    id: "2",
    title: "Project coming soon...",
    description: "...",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    githubUrl: "#",
    liveUrl: "#",
    stack: ["React", "MDX", "Tailwind", "Vercel"],
    problem:
      "",
    solution:
      "",
    role: "",
    challenges: [
    ],
    takeaways: [
    ],
    impact:
      "",
  },
  {
    id: "3",
    title: "Project coming soon...",
    description: "...",
    imageUrl:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    githubUrl: "#",
    liveUrl: "#",
    stack: ["React", "Material UI", "TypeScript", "Storybook"],
    problem:
      "",
    solution:
      "",
    role: "",
    challenges: [
    ],
    takeaways: [
    ],
    impact:
      "",
  },
];

// Main page component for the portfolio site.
// It manages all the state and renders the different sections:
// --- hero, about, stack, featured projects, and contact.
// It also handles things like filtering projects, opening modals, and smooth scrolling anchors.
const Index: React.FC = () => {
  usePortfolio(); // use context
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const mainTechs = ["Python", "Next.js", "TypeScript", "React"];
  const allTechnologies = Array.from(
    new Set(sampleProjects.flatMap((p) => p.stack))
  );
  const extraTechs = allTechnologies.filter((t) => !mainTechs.includes(t));
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // filter projects based on selected technologies
  const filteredProjects =
    selectedTechs.length === 0
      ? sampleProjects
      : sampleProjects.filter((project) =>
          selectedTechs.every((tech) => project.stack.includes(tech))
        );

  // open modal with project details
  const handleProjectView = (project: Project) => {
    // checks if the project has a problem description
    if (project.problem) {
      setModalProject(project);
      setModalOpen(true);
    }
  };

  // close modal and clear selected project
  const handleModalClose = () => {
    setModalOpen(false);
    setModalProject(null);
  };

  // copy email to clipboard and show feedback icon
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("pal.hagen.s@gmail.com");
    const icon = document.getElementById("copy-icon");
    if (icon) {
      icon.innerText = "✔";
      icon.style.color = "#bdbdbd";
      icon.style.fontSize = "1em";
      setTimeout(() => {
        icon.innerText = "⧉";
        icon.style.color = "";
        icon.style.fontSize = "";
      }, 1200);
    }
  };

  return (
    <>
      {/* Background animation */}
      <FloatingBubbles />
      {/* Navigation bar */}
      <Navbar />
      {/* Hero section */}
      <header
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 16px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontWeight: 700,
            color: "inherit",
            fontSize: "clamp(3rem, 7vw, 4.5rem)",
            marginBottom: 0,
            lineHeight: 1.1,
          }}
        >
          Hi, I&apos;m Pål Hagen Størksen
        </h1>
        <div style={{ marginBottom: 0 }}>
          <div
            style={{ fontSize: "clamp(1.7rem, 4vw, 2.5rem)", fontWeight: 600 }}
          >
            <RollingText />
          </div>
        </div>
      </header>

      <main>
        {/* About Me and My Stack section */}
        <section
          id="about-my-stack"
          style={{
            minHeight: "100vh",
            maxWidth: 800,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            padding: "64px 16px",
          }}
        >
          {/* About Me */}
          <div id="about" style={{ height: 0, scrollMarginTop: "80px" }} />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 28,
              marginBottom: 32,
              flexWrap: "wrap",
            }}
          >
            {/* circular profile image with shadow and hover animation */}
            <span
              style={{
                display: "inline-block",
                borderRadius: "50%",
                boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
                transition:
                  "box-shadow 0.2s cubic-bezier(.4,2,.6,1), transform 0.2s cubic-bezier(.4,2,.6,1)",
              }}
              className="profile-img-hover"
            >
              <img
                src="/profile_img.png"
                alt="Pål Hagen Størksen profile photo"
                style={{
                  width: "160px",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  display: "block",
                  transition: "transform 0.2s cubic-bezier(.4,2,.6,1)",
                }}
              />
            </span>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div
                style={{
                  fontSize: "1.45rem",
                  color: "var(--phs-foreground)",
                  marginBottom: 18,
                  fontWeight: 400,
                  textAlign: "left",
                  lineHeight: 1.25,
                }}
              >
                I want to find solutions that are easy to use and adapted to
                real needs in the workday. I also want to work with technology
                that creates practical value for both users and businesses.
              </div>
              <Divider
                sx={{
                  my: 3,
                  borderColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.10)" // white in dark mode
                      : "rgba(0,0,0,0.12)", // black in light mode
                  borderBottomWidth: 1,
                  maxWidth: 800,
                  width: "100%",
                  mx: 0,
                }}
              />
            </div>
          </div>
          <p
            style={{
              color: "var(--phs-foreground)",
              marginBottom: "32px",
              marginTop: "8px",
              textAlign: "left",
            }}
          >
            I recently graduated with a degree in Information Science from the
            University of Bergen (2025), and I also hold a bachelor&apos;s
            degree in Social Work with professional experience as a social
            worker. In that role, I worked with guidance, case management, and
            follow-up, which gave me strong skills in problem-solving, teamwork,
            and communication.
            <br />
            <br />
            I became increasingly interested in technology and saw more
            opportunities for growth and creativity in IT than in social work.
            This led me to make the shift, combining my people skills with a
            passion for building digital solutions.
            <br />
            <br />
            Through my studies in Information Science, I developed competencies
            in programming, system development, human-computer interaction
            (HCI), and artificial intelligence. I have a particular interest in
            full-stack development, as it allows me to work with both backend
            and frontend technologies.
          </p>
          {/* divider between About Me and My Stack */}
          <Divider
            sx={{
              my: 4,
              borderColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.10)" // white in dark mode
                  : "rgba(0,0,0,0.12)", // black in light mode
              borderBottomWidth: 1,
            }}
          />
          {/* My Stack */}
          <div id="my-stack" style={{ height: 0, scrollMarginTop: "80px" }} />
          <FadeInOnScroll>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "2rem",
                marginTop: 48,
                marginBottom: 0,
                color: "inherit",
                textAlign: "center",
              }}
            >
              My Stack
            </h2>
          </FadeInOnScroll>
          <StackSelector />
        </section>

        {/* Projects section */}
        <section
          id="projects"
          style={{
            maxWidth: 800,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            padding: "0 16px",
            scrollMarginTop: "80px",
          }}
        >
          <FadeInOnScroll>
            {/* Projects section, with animated star */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginRight: 10,
                  animation: "spinStar 5s linear infinite",
                  transformOrigin: "50% 50%",
                }}
              >
                <polygon
                  points="10,2 12.472,7.236 18,7.764 13.5,11.618 14.944,17 10,14 5.056,17 6.5,11.618 2,7.764 7.528,7.236"
                  fill="var(--phs-star-color)"
                  stroke="var(--phs-star-stroke)"
                  strokeWidth="1.2"
                  style={{
                    filter: "blur(0.2px)",
                    strokeLinejoin: "round",
                    strokeLinecap: "round",
                  }}
                />
              </svg>
              <style>{`@keyframes spinStar { 100% { transform: rotate(360deg); } }`}</style>
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: "2rem",
                  marginBottom: 0,
                  color: "inherit",
                  textAlign: "left",
                }}
              >
                Featured Projects
              </h2>
            </Box>
            {/* Tech filter and dropdown menu */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {mainTechs.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  clickable
                  color={selectedTechs.includes(tech) ? "primary" : "default"}
                  variant={selectedTechs.includes(tech) ? "filled" : "outlined"}
                  onClick={() =>
                    setSelectedTechs((prev) =>
                      prev.includes(tech)
                        ? prev.filter((t) => t !== tech)
                        : [...prev, tech]
                    )
                  }
                />
              ))}
              <Chip
                label="+"
                clickable
                onClick={(e) => setAnchorEl(e.currentTarget)}
                variant="outlined"
              />
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {extraTechs.map((tech) => (
                  <MenuItem
                    key={tech}
                    onClick={() => {
                      setSelectedTechs((prev) =>
                        prev.includes(tech)
                          ? prev.filter((t) => t !== tech)
                          : [...prev, tech]
                      );
                    }}
                  >
                    <Checkbox checked={selectedTechs.includes(tech)} />
                    {tech}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </FadeInOnScroll>
          {/* filtered project cards with fade-in animation */}
          {filteredProjects.map((project, index) => (
            <FadeInOnScroll
              key={project.id}
              delay={index * 100}
              minHeight={120}
            >
              <ProjectCard
                project={project}
                onView={handleProjectView}
                index={index}
                isDimmed={hoveredIndex !== null && hoveredIndex !== index}
                onHover={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              />
            </FadeInOnScroll>
          ))}
          {/* divider at the very end of Featured Projects section */}
          <Divider
            sx={{
              mt: 6,
              borderColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.10)"
                  : "rgba(0,0,0,0.12)",
              borderBottomWidth: 1,
            }}
          />
        </section>

        {/* contact section with email copy-to-clipboard functionality */}
        <section
          id="contact"
          style={{
            maxWidth: 800,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "32px 16px",
          }}
        >
          <FadeInOnScroll>
            <h2
              style={{
                fontWeight: 700,
                fontSize: "1.5rem",
                marginBottom: 0,
                color: "inherit",
                textAlign: "center",
              }}
            >
              Want to get in touch?
            </h2>
          </FadeInOnScroll>
          <div
            style={{
              marginTop: 16,
              fontSize: "1.1rem",
              color: "var(--phs-foreground)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* clickable email address with copy-to-clipboard and feedback icon */}
            <span
              onClick={handleCopyEmail}
              style={{
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: "6px",
                backgroundColor: "var(--phs-background)",
                border: "1px solid var(--phs-border-color)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                fontSize: "1.1rem",
                color: "var(--phs-foreground)",
                textDecoration: "none",
                outline: "none", // remove default outline
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCopyEmail();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Copy email address to clipboard"
              onFocus={(e) => {
                e.target.style.outline = "2px solid #1976d2";
                e.target.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.target.style.outline = "none";
              }}
            >
              pal.hagen.s@gmail.com
              <span
                id="copy-icon"
                aria-hidden="true"
                style={{ fontSize: "1.2em", marginLeft: 4 }}
              >
                ⧉
              </span>
            </span>
            {/* Copyright notice */}
            <span
              style={{
                fontSize: "0.98rem",
                color: "var(--phs-foreground)",
                marginTop: 8,
              }}
            >
              © 2025 - Made by Pål Hagen Størksen
            </span>
          </div>
        </section>
      </main>
      {/* custom styles for profile image (hover) and active states */}
      <style>{`
        .profile-img-hover:hover {
          box-shadow: 0 6px 32px rgba(37,117,252,0.18), 0 2px 16px rgba(0,0,0,0.18);
          transform: scale(1.07);
        }
        .profile-img-hover:active {
          transform: scale(0.98);
        }
      `}</style>
      {/* modal dialog for displaying detailed project information */}
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent dividers sx={{ position: "relative", pt: 4 }}>
          {/* close button for the modal */}
          <IconButton
            onClick={handleModalClose}
            aria-label="Close project details"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10,
              background: "rgba(255,255,255,0.85)",
              boxShadow: 1,
              "&:hover": { background: "rgba(220,220,220,0.95)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          {modalProject && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              {/* Project title */}
              <div
                style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: 8 }}
              >
                {modalProject.title}
              </div>
              {/* Project problem description */}
              <div style={{ marginBottom: 8 }}>
                <strong>Problem:</strong>
                {modalProject.problem}
              </div>
              {/* Project solution description */}
              <div style={{ marginBottom: 8 }}>
                <strong>Solution:</strong>
                {modalProject.solution}
              </div>
              {/* Project role and stack */}
              <div style={{ marginBottom: 8 }}>
                <strong>Role & Stack:</strong>
                <br />
                {modalProject.role}
                <br />
                <strong>Stack:</strong> {modalProject.stack?.join(", ")}
              </div>
              {/* List of key challenges, if any */}
              {modalProject.challenges && (
                <div style={{ marginBottom: 8 }}>
                  <strong>Key Challenges:</strong>
                  <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                    {modalProject.challenges.map((c: string, i: number) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* List of key takeaways, if any */}
              {modalProject.takeaways && (
                <div style={{ marginBottom: 8 }}>
                  <strong>Key Takeaways:</strong>
                  <ul style={{ margin: "6px 0 0 18px", padding: 0 }}>
                    {modalProject.takeaways.map((t: string, i: number) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Project impact, if any */}
              {modalProject.impact && (
                <div style={{ marginBottom: 8 }}>
                  <strong>Impact:</strong>
                  {modalProject.impact}
                </div>
              )}
              {/* Links to GitHub and Live Demo, if available */}
              <div style={{ display: "flex", gap: 12 }}>
                {modalProject.githubUrl && (
                  <a
                    href={modalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
                {modalProject.liveUrl && (
                  <a
                    href={modalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
