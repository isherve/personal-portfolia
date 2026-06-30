import type { PortfolioContent } from "./types";

export const en: PortfolioContent = {
  ui: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      certificates: "Certificates",
      projects: "Projects",
      contact: "Contact",
    },
    theme: {
      dark: "Dark mode",
      light: "Light mode",
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",
    },
    language: { switch: "Switch language" },
    hero: {
      badge: "Full-Stack Developer",
      headlinePart1: "Building Modern Web ",
      headlineHighlight: "Applications That Make a Difference",
      roleKeywords: "Full-Stack Developer | React • Django • REST APIs • Networking",
      intro:
        "Full-Stack Developer specializing in React, Django, REST APIs, and Modern Web Technologies. Passionate about creating secure, scalable, and user-centered digital solutions.",
      viewWork: "View My Work",
      downloadCv: "Download CV",
      preparingPdf: "Preparing PDF…",
      contactMe: "Contact Me",
      scrollAbout: "Scroll to About section",
      features: [
        { title: "Full-Stack Development", subtitle: "React, Django, REST APIs" },
        { title: "Databases", subtitle: "PostgreSQL, SQL" },
        { title: "Networking", subtitle: "Routing, Switching, Network Support" },
        { title: "Tools & Technologies", subtitle: "Git, Linux, Docker" },
      ],
    },
    about: {
      title: "About Me",
      subtitle:
        "Software developer focused on dependable systems, clean interfaces, and measurable outcomes.",
    },
    skills: {
      title: "Skills & Experience",
      subtitle:
        "A blend of software engineering, systems administration, and networking — shaped by academic training and hands-on work in a government healthcare environment.",
      coreCompetencies: "Core Competencies",
      professionalExperience: "Professional Experience",
      education: "Education",
      technologyStack: "Technology Stack",
      languages: "Languages",
    },
    certificates: {
      title: "Certifications",
      subtitle:
        "Industry-recognized credentials in networking, programming, web development, AI, and cybersecurity — validating both breadth and depth of technical knowledge.",
    },
    projects: {
      title: "Projects",
      subtitle:
        "{count} projects from my GitHub and the {org} organization — including Django systems, IoT billing, Flutter mobile apps, and React dashboards.",
      code: "Code",
      liveDemo: "Live Demo",
      requestDemo: "Request Demo",
      sourceOnRequest: "Source available on request",
      personalRepos: "Personal Repositories",
      orgRepos: "{org} Organization",
      status: {
        Featured: "Featured",
        Completed: "Completed",
        "In Development": "In Development",
        Live: "Live",
      },
      organization: {
        Personal: "Personal",
        "Pelino-Courses": "Pelino-Courses",
      },
    },
    contact: {
      title: "Get In Touch",
      subtitle:
        "Have a project in mind or an opportunity to discuss? Feel free to reach out. I'd love to hear from you!",
      email: "Email",
      emailHint: "For general inquiries",
      phone: "Phone",
      phoneHint: "Available Mon–Fri",
      location: "Location",
      locationHint: "Based in Kigali",
      references: "References",
      formName: "Your Name",
      formEmail: "Your Email",
      formSubject: "Subject",
      formMessage: "Your Message",
      placeholders: {
        name: "John Doe",
        email: "john@example.com",
        subject: "Project Discussion",
        message: "Tell me about your project...",
      },
      send: "Send Message",
      sending: "Sending...",
      successTitle: "Message Sent!",
      successDesc: "Thank you for your message. I'll get back to you soon!",
      errorTitle: "Failed to send message",
      errorDesc: "Please try again or email me directly at {email}",
    },
    footer: {
      rights: "All Rights Reserved.",
      downloadCv: "Download CV",
    },
    cv: {
      downloadError: "Could not download CV",
      downloadErrorDesc: "Please try again in a moment.",
    },
    resume: {
      professionalSummary: "Professional Summary",
      professionalExperience: "Professional Experience",
      selectedProjects: "Selected Projects",
      education: "Education",
      certifications: "Certifications",
      technicalSkills: "Technical Skills",
      languages: "Languages",
      references: "References",
      also: "Also",
      skillGroups: {
        languages: "Languages",
        frameworks: "Frameworks",
        tools: "Tools & Platforms",
        domains: "Core Competencies",
      },
    },
    highlightLabels: {
      education: "Education",
      experience: "Experience",
      location: "Location",
    },
  },
  personal: {
    title: "Software Developer | Full-Stack (React & Django) | IoT Systems",
    tagline: "I design and build software systems that solve real operational problems.",
    roleLine:
      "Final-Year IT Student | Full-Stack Developer (React, Django) | IoT & Systems Automation",
  },
  summary:
    "Final-year Information Technology student and software developer with one year of enterprise IT experience at the Ministry of Health. Combines full-stack development skills (React, Django, Python) with a strong foundation in system administration, networking, and cybersecurity. Certified by Cisco, Microsoft, and freeCodeCamp. Seeking a software engineering role to deliver secure, maintainable applications with measurable business impact.",
  aboutContent: {
    headline: "Full-Stack Developer with Enterprise IT Experience",
    paragraphs: [
      "I am a final-year Information Technology student at the University of Rwanda and a software developer who bridges code and infrastructure. My work combines modern web development with the operational discipline I built during a one-year internship at the Ministry of Health.",
      "In that role, I resolved daily IT incidents — from network outages to hardware failures — while supporting data management and system maintenance for a large public-sector organization. That experience taught me to build software with reliability, security, and end users in mind.",
      "I now focus on React and Django full-stack development, IoT prototyping, and cybersecurity fundamentals. I hold certifications from Cisco, Microsoft, and freeCodeCamp, and I continuously ship projects that turn technical skills into practical solutions.",
    ],
    highlights: [
      { key: "education", value: "B.Sc. Information Technology", detail: "University of Rwanda · Expected Oct 2026" },
      { key: "experience", value: "IT Intern", detail: "Ministry of Health · 1 year" },
      { key: "location", value: "Kigali, Rwanda", detail: "Open to remote and on-site opportunities" },
    ],
  },
  experience: [
    {
      role: "Information Technology Intern",
      company: "Ministry of Health",
      location: "Kigali, Rwanda",
      period: "Mar 2025 – May 2026",
      highlights: [
        "Delivered tier-1 IT support across departmental offices, resolving hardware faults, software issues, and end-user requests in a government healthcare setting.",
        "Diagnosed and restored network connectivity problems, helping maintain reliable operations for critical health information systems.",
        "Managed structured data entry, digital record organization, and administrative workflows aligned with organizational IT processes.",
        "Supported asset tracking, workstation maintenance, and preventive system upkeep in coordination with senior IT administrators.",
        "Applied security-aware practices when handling user accounts, devices, and sensitive institutional data.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "University of Rwanda",
      location: "Kigali, Rwanda",
      period: "Jun 2022 – Oct 2026 (Expected)",
      detail:
        "Relevant coursework: software engineering, databases, computer networks, cybersecurity, and systems design. Expected graduation: October 2026.",
    },
    {
      degree: "A2 Diploma — Mathematics, Computer Science & Economics",
      institution: "APAPEC Murambi",
      location: "Rulindo, Rwanda",
      period: "Jan 2018 – Jun 2021",
      detail:
        "Developed strong analytical, ICT, and quantitative reasoning skills applicable to software development and data-driven problem solving.",
    },
  ],
  skillGroups: {
    "Frontend Development": ["React", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Responsive UI"],
    "Backend & APIs": ["Django", "Python", "REST APIs", "PostgreSQL", "SQL", "C# / .NET"],
    "Systems & Infrastructure": ["Linux", "Networking", "IT Support", "System Administration", "Git"],
    "Emerging Tech": ["IoT (ESP32)", "MQTT", "Cybersecurity", "AI Fundamentals", "Data Management"],
  },
  coreCompetencies: [
    { name: "Full-Stack Web Development", level: 80 },
    { name: "Programming (Python, JS, C#)", level: 78 },
    { name: "IT Support & Troubleshooting", level: 85 },
    { name: "Networking & Systems", level: 75 },
    { name: "Databases & Data Management", level: 80 },
    { name: "Cybersecurity Fundamentals", level: 55 },
  ],
  spokenLanguages: [
    { name: "Kinyarwanda", level: "Native / Fluent", percent: 100 },
    { name: "English", level: "Professional Proficiency", percent: 85 },
    { name: "Swahili", level: "Professional Proficiency", percent: 85 },
    { name: "French", level: "Elementary", percent: 40 },
  ],
  certifications: [
    {
      name: "Cisco Networking Academy Certificate",
      issuer: "Cisco Networking Academy",
      date: "Dec 2022",
      highlight: true,
      description:
        "Validated knowledge of network architecture, IP addressing, routing, switching, and foundational network security.",
    },
    {
      name: "Responsive Web Design Certification",
      issuer: "freeCodeCamp",
      date: "Dec 2024",
      highlight: true,
      description:
        "Built accessible, mobile-first interfaces using HTML, CSS, Flexbox, CSS Grid, and modern responsive design standards.",
    },
    {
      name: "Foundations of C#",
      issuer: "Microsoft",
      date: "Sep 2024",
      highlight: true,
      description:
        "Demonstrated proficiency in object-oriented programming, C# syntax, control flow, and introductory .NET development.",
    },
    {
      name: "Artificial Intelligence Fundamentals",
      issuer: "Professional Development Program",
      date: "Jan 2025",
      highlight: true,
      description:
        "Covered machine learning basics, data pipelines, practical AI use cases, and responsible AI development principles.",
    },
    {
      name: "Cybersecurity Essentials",
      issuer: "Cisco Networking Academy",
      date: "May 2026",
      highlight: false,
      description: "Network defense, vulnerability management, risk assessment, and security operations fundamentals.",
    },
    {
      name: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      date: "Mar 2026",
      highlight: false,
      description: "Threat landscape awareness, security controls, and data protection best practices.",
    },
  ],
  projects: [
    {
      repo: "water-Bill",
      title: "WASAC Smart Water Billing System",
      organization: "Personal",
      description:
        "Full-stack prepaid water billing platform with leak detection, AI consumption prediction, Brevo email notifications, ESP32 offline sync, and QR/RFID card support.",
      impact:
        "Enables real-time usage monitoring, automated billing, and early leak detection for utilities and property managers.",
      status: "Featured",
    },
    {
      repo: "smart-flow-prepaid",
      title: "Smart Flow Prepaid Platform",
      organization: "Personal",
      description:
        "React and Supabase prepaid flow management application with dashboards, form-driven workflows, and a modern UI built with TypeScript and shadcn/ui.",
      impact:
        "Supports prepaid service workflows with a scalable full-stack architecture and real-time data layer.",
      status: "Featured",
    },
    {
      repo: "-IT-Support-Analytics-Dashboard",
      title: "IT Support & Analytics Dashboard",
      organization: "Personal",
      description:
        "Production-quality React dashboard for IT support tickets, system health metrics, and data workflows — with role-based access, KPI charts, Supabase backend, and a dark mobile-first UI.",
      impact:
        "Turns support and infrastructure data into actionable insights for IT operations teams — directly aligned with Ministry of Health internship experience.",
      status: "Featured",
    },
    {
      repo: "Hardware-Operations-Inventory-Management-System",
      title: "Bettina Hardware — Inventory & Operations System",
      organization: "Personal",
      description:
        "Full-stack hardware store management platform with React and Spring Boot — inventory, sales, customers, employees, financials, RBAC, low-stock alerts, and CSV/PDF reporting.",
      impact:
        "Replaces manual ledgers with automated retail workflows for a real hardware business in Kigali, Rwanda.",
      status: "Featured",
    },
    {
      repo: "improved-property-management-system-with-ui-dynamo-team",
      title: "Property Management System",
      organization: "Pelino-Courses",
      description:
        "Django-based property management platform with landlord and tenant dashboards, lease tracking, and a full front-end UI for managing properties and agreements.",
      impact:
        "Streamlines real-estate operations by centralizing property, tenant, and lease management in one system.",
      status: "Featured",
    },
    {
      repo: "django-project-property-management-system-dynamo-team",
      title: "Property Management Django Backend",
      organization: "Pelino-Courses",
      description:
        "Foundational Django property management backend built with the Dynamo team — models, views, and admin workflows for managing properties, tenants, and leases.",
      impact:
        "Established the core Django architecture later extended into the full UI and REST API property management suite.",
      status: "Completed",
    },
    {
      repo: "enhanced-property-management-django-api-dynamo-team",
      title: "Property Management Django API",
      organization: "Pelino-Courses",
      description:
        "Enhanced Django REST API for property, tenant, and lease management with admin interfaces and CRUD operations for real-estate workflows.",
      impact:
        "Provides a secure backend layer for property management applications and team-based development.",
      status: "Completed",
    },
    {
      repo: "django-apis-super",
      title: "Newspaper Management App",
      organization: "Pelino-Courses",
      description:
        "Django web application for managing newspaper content and publishing workflows, built as a GitHub Classroom assignment with API-focused architecture.",
      impact:
        "Demonstrates Django API design and content management patterns for media publishing use cases.",
      status: "Completed",
    },
    {
      repo: "event-locator-app-design-phase-event-organiser",
      title: "Event Locator App",
      organization: "Pelino-Courses",
      description:
        "Flutter mobile application for campus event discovery and submission in the University of Rwanda community, with navigation shell, routing, and organizer screens.",
      impact:
        "Helps students discover and submit campus events through a mobile-first experience.",
      status: "In Development",
    },
    {
      repo: "material-comonents-codelabs",
      title: "Flutter Material Components Codelab",
      organization: "Pelino-Courses",
      description:
        "Flutter codelab project implementing Material Design components — navigation patterns, theming, and interactive UI widgets across multiple lab modules.",
      impact:
        "Demonstrates mobile UI fundamentals and Material Design best practices in a structured Flutter learning path.",
      status: "Completed",
    },
    {
      repo: "Qr-code-webapp",
      title: "QR Code Generator Web App",
      organization: "Personal",
      description:
        "Modern React application for generating and customizing QR codes with form validation, responsive design, and a polished UI using TypeScript and shadcn/ui.",
      impact: "Delivers a fast, accessible tool for creating shareable QR codes from any device.",
      status: "Completed",
    },
    {
      repo: "personal-portfolia",
      title: "Developer Portfolio",
      organization: "Personal",
      description:
        "Production-grade personal portfolio with responsive UI, downloadable CV, contact form integration, and GitHub-synced project showcase.",
      impact: "Showcases full-stack front-end ability and recruiter-focused presentation of my work.",
      status: "Live",
      liveLabel: "This Site",
    },
    {
      repo: "camper-cafe-project",
      title: "Camper Cafe Menu",
      organization: "Personal",
      description:
        "Responsive digital cafe menu built with HTML and CSS, featuring coffee and dessert sections with pricing — optimized for mobile, tablet, and desktop viewports.",
      impact: "Demonstrates responsive web design fundamentals and clean layout composition.",
      status: "Completed",
    },
    {
      repo: "web-design-documentation",
      title: "Web Design Documentation",
      organization: "Personal",
      description:
        "Technical documentation website covering web design principles, layout techniques, and responsive development practices — aligned with freeCodeCamp standards.",
      impact:
        "Documents core front-end concepts in a clear, structured format for learners and reviewers.",
      status: "Completed",
    },
  ],
  references: [
    { name: "DUNIA Jean Marie Vianney", title: "Head Teacher, GS APAPEC Murambi", phone: "+250 788 501 411" },
    { name: "Mr. HARELIMANA Dominique", title: "Cisco Instructor, University of Rwanda / CST", phone: "+250 785 135 124" },
  ],
  resumeSkills: {
    languages: ["JavaScript", "TypeScript", "Python", "C#", "HTML/CSS", "SQL"],
    frameworks: ["React", "Django", "Vite", "Tailwind CSS", ".NET"],
    tools: ["Git", "REST APIs", "PostgreSQL", "Linux", "Networking", "ESP32 / IoT"],
    domains: [
      "Full-Stack Development",
      "IT Operations & Support",
      "Network Administration",
      "Cybersecurity",
      "Data Management",
    ],
  },
};
