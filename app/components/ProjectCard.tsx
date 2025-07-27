"use client";
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useTheme } from "@mui/material/styles";
import { Project } from "../context/PortfolioContext";
import Image from "next/image";

// ProjectCard.tsx: defines the ProjectCard component, which displays a summary card for each project

// Props (onView etc.) for the ProjectCard component (controls interactivity)
interface ProjectCardProps {
  project: Project; // The project data to display
  onView?: (project: Project) => void;
  index?: number;
  isDimmed?: boolean; // If true, visually dim the card
  onHover?: () => void;
  onHoverEnd?: () => void;
}

// React function component: ProjectCard component displays a single project (as a styled card)
export default function ProjectCard({
  project,
  onView,
  index,
  isDimmed,
  onHover,
  onHoverEnd,
}: ProjectCardProps) {
  const theme = useTheme(); // Gets the current MUI theme (for color mode)

  // When the card is clicked, it runs onView if the click wasnt on a button
  const handleCardClick = (e: React.MouseEvent) => {
    // Ignore clicks on buttons/links inside the card
    if ((e.target as HTMLElement).closest("button")) return;
    onView?.(project);
  };

  return (
    // Outer Box: handles hover, focus, and dimming styles
    <Box
      sx={{
        position: "relative",
        borderRadius: 3,
        p: 0,
        mb: 2,
        background: "transparent",
        padding: "2px",
        transition:
          "box-shadow 0.2s cubic-bezier(.4,2,.6,1), opacity 0.2s cubic-bezier(.4,2,.6,1), background 0.2s cubic-bezier(.4,2,.6,1)",
        boxShadow: 2,
        opacity: isDimmed ? 0.4 : 1, // Dim if filtered
        "&:hover": {
          opacity: 1,
          boxShadow: 6,
          background: "linear-gradient(90deg, #4a148c 0%, #1565c0 100%)",
        },
        "&:focus-visible": {
          outline: "2px solid #1976d2",
          outlineOffset: "2px",
        },
        cursor: "pointer",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      onClick={handleCardClick}
    >
      {/* Inner Box: card background and border radius */}
      <Box
        sx={{
          borderRadius: 2.5,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* MUI Card: main content container */}
        <Card
          sx={{
            display: "flex",
            boxShadow: "none",
            transition: "transform 0.2s cubic-bezier(.4,2,.6,1)",
            cursor: "pointer",
            borderRadius: 2.5,
            position: "relative",
            zIndex: 2,
            "&:hover": { transform: "scale(1.03)" },
          }}
        >
          {/* Project image: Next.js <Image> for lazy loading and optimization */}
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={140}
            height={140}
            style={{ objectFit: "cover", height: "100%" }}
          />
          {/* Card content: title, description, stack */}
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <CardContent>
              {/* Project title and optional index number */}
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {/* Show index if provided */}
                {index !== undefined ? `${index + 1}. ` : ""}
                {project.title}
                {/* Show launch icon if liveUrl exists */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      marginLeft: 4,
                      color:
                        theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
                      textDecoration: "none",
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevents card click
                    aria-label={`Open ${project.title} live site`}
                  >
                    <LaunchIcon
                      fontSize="small"
                      sx={{
                        color:
                          theme.palette.mode === "dark" ? "#90caf9" : "#1976d2",
                        opacity: 0.85,
                      }}
                    />
                  </a>
                )}
              </Typography>
              {/* Project description */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {project.description}
              </Typography>
              {/* Technology stack badges */}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
                {project.stack?.map((tech) => (
                  <Typography
                    key={tech}
                    variant="caption"
                    sx={{ bgcolor: "rgba(0,0,0,0.04)", px: 1, borderRadius: 1 }}
                  >
                    {tech}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
