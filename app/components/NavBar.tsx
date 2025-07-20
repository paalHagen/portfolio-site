"use client";
import React from "react";
// MUI components for app bar, toolbar, buttons, menus, etc.
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { useThemeMode } from "../context/ThemeContext";
import NightlightIcon from "@mui/icons-material/Nightlight";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CodeIcon from "@mui/icons-material/Code";

// NavBar.tsx includes:
// - a responsive navbar with toggle (light/dark/system) via icon, open portfolio repo in GitHub via icon
// and menu to navigate sections of the page (e,g About, Featured Projects etc.) via icon

export default function Navbar() {
  const { setThemeMode, rawMode } = useThemeMode(); // from ThemeContext.tsx
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  // open theme (light/dark/system) menu
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // close theme (light/dark/system) menu
  const handleClose = () => {
    setAnchorEl(null);
  };
  // change theme (light/dark/system) and close menu
  const handleSelect = (mode: "light" | "dark" | "system") => {
    setThemeMode(mode);
    handleClose();
  };

  // open nav menu (three horizontal lines)
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  // close nav menu
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  // theme toggle icon (the actual icon used below)
  const icon = <NightlightIcon sx={{ color: theme.palette.text.primary }} />;

  return (
    <nav role="navigation" aria-label="Main navigation">
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          color: theme.palette.text.primary,
          boxShadow: "none",
          border: 0,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "flex-end",
            minHeight: "auto",
            px: 0,
            background: "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: 140,
              justifyContent: "flex-end",
            }}
          >
            {/* styling for buttons: theme toggle, GitHub, nav menu */}
            <Box
              sx={{
                display: "flex",
                width: 156,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* theme toggle */}
              <IconButton
                onClick={handleClick}
                aria-label="toggle theme"
                aria-controls="theme-menu"
                aria-haspopup="true"
              >
                {icon}
              </IconButton>

              {/* GitHub repo link */}
              <IconButton
                component="a"
                href="https://github.com/paalHagen/portfolio-site"
                target="_blank"
                rel="noopener"
                aria-label="GitHub repository"
              >
                <CodeIcon />
              </IconButton>

              {/* nav menu */}
              <IconButton
                onClick={handleMenuClick}
                aria-label="open navigation drawer"
                aria-controls="nav-drawer"
                aria-haspopup="true"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* theme selection menu */}
            <Menu
              id="theme-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                selected={rawMode === "light"}
                onClick={() => handleSelect("light")}
              >
                Light
              </MenuItem>
              <MenuItem
                selected={rawMode === "dark"}
                onClick={() => handleSelect("dark")}
              >
                Dark
              </MenuItem>
              <MenuItem
                selected={rawMode === "system"}
                onClick={() => handleSelect("system")}
              >
                System
              </MenuItem>
            </Menu>

            {/* navigation menu */}
            <Menu
              id="nav-menu"
              anchorEl={menuAnchor}
              open={menuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  minWidth: 200,
                  p: 1,
                },
              }}
            >
              {/* scroll to sections */}
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  const el = document.getElementById("about");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  const el = document.getElementById("projects");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Projects
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Contact
              </MenuItem>

              <Divider sx={{ my: 1 }} />

              {/* external links */}
              <MenuItem
                component="a"
                href="https://www.linkedin.com/in/pål-hagen-størksen-208a5b228"
                target="_blank"
                rel="noopener"
              >
                <LinkedInIcon fontSize="small" /> LinkedIn
              </MenuItem>
              <MenuItem
                component="a"
                href="https://github.com/paalHagen"
                target="_blank"
                rel="noopener"
              >
                <GitHubIcon fontSize="small" /> GitHub
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
