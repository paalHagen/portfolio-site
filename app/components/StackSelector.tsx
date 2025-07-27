"use client";
import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import FadeInOnScroll from "./FadeInOnScroll";
import { useTheme } from "@mui/material/styles";

// StackSelector.tsx: defines the StackSelector component, which displays tech stacks (in a tabbed interface) for the portfolio site

// Data for each technology stack category (and their icons)
const stackData = {
  Frontend: [
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Material UI",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    },
  ],
  Backend: [
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Django",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    },
    {
      name: "Flask",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    },
  ],
  Database: [
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "SQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    },
    {
      name: "Neo4j",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg",
    },
  ],
  Tools: [
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Vercel",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    },
    {
      name: "Postman",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
  ],
};

// Get the stack category names as an array
const stackKeys = Object.keys(stackData) as (keyof typeof stackData)[];

// React function component: displays tabs for each stack category and shows the relevant technologies
export default function StackSelector() {
  const [tab, setTab] = useState(0);
  const selectedKey = stackKeys[tab];
  const theme = useTheme(); // Gets the current MUI theme (for color mode)

  // A slightly more visible background in dark mode
  const stackBoxBg =
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.08)" // slightly more visible on dark
      : "rgba(38, 40, 42, 0.08)";

  return (
    // Outer Box: centers the content and adds spacing
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        mt: 4,
        mb: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Tab bar container with background and rounded corners */}
      <Box
        sx={{
          display: "inline-flex",
          alignSelf: "center",
          borderRadius: 3,
          bgcolor: stackBoxBg,
          p: 0.5,
          mb: 2,
          boxShadow: 1,
        }}
      >
        {/* Tabs for each stack category */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)} // Update selected tab
          variant="standard"
          slotProps={{ indicator: { style: { display: "none" } } }} // Remove the visual underline (which is seen when a tab is active)
          sx={{ minHeight: 0 }}
        >
          {stackKeys.map((key, i) => (
            <Tab
              key={key}
              label={key}
              sx={{
                minWidth: 90,
                borderRadius: 2,
                mx: 0.5,
                bgcolor: tab === i ? "#181818" : "transparent",
                color: tab === i ? "#fff !important" : "inherit",
                fontWeight: tab === i ? 700 : 500,
                transition: "background 0.2s, color 0.2s",
                "&:hover": {
                  bgcolor: tab === i ? "#181818" : "rgba(38,40,42,0.08)",
                },
                "&:focus-visible": {
                  outline: "2px solid #1976d2",
                  outlineOffset: "2px",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      {/* Technology icons and names for the selected stack category */}
      <Box
        sx={{
          width: "auto",
          maxWidth: 420,
          borderRadius: 4,
          bgcolor: stackBoxBg,
          boxShadow: 1,
          px: 1.5,
          py: 1,
          display: "flex",
          flexWrap: "nowrap",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          minHeight: 80,
          mx: "auto",
        }}
      >
        {stackData[selectedKey].map((item, i) => (
          <FadeInOnScroll key={item.name} delay={i * 120}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: 60,
              }}
            >
              {/* Technology icon */}
              <img
                src={item.icon}
                alt={item.name}
                width={40}
                height={40}
                style={{ marginBottom: 6 }}
              />
              {/* Technology name */}
              <Typography variant="body2" fontWeight={500} align="center">
                {item.name}
              </Typography>
            </Box>
          </FadeInOnScroll>
        ))}
      </Box>
    </Box>
  );
}
