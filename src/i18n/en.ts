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
      roleKeywords: "Full-Stack Developer | React · TypeScript · Django · Spring Boot · Flutter · AI",
      intro:
        "Full-Stack Developer specializing in React, TypeScript, Django, Spring Boot, Flutter, and Node.js. I build secure, scalable applications — from national football match-day systems and AI-powered mobile apps to telemedicine platforms, inventory tools, and analytics dashboards.",
      viewWork: "View My Work",
      downloadCv: "Download CV",
      preparingPdf: "Preparing PDF…",
      contactMe: "Contact Me",
      scrollAbout: "Scroll to About section",
      features: [
        { title: "Full-Stack Development", subtitle: "React, Django, Spring Boot" },
        { title: "Backend & APIs", subtitle: "REST APIs, JWT, PostgreSQL, MySQL" },
        { title: "Mobile & Modern UI", subtitle: "Flutter, Expo, TypeScript" },
        { title: "Tools & Workflow", subtitle: "Git, Docker, Linux, Maven" },
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
    title: "Full-Stack Developer | React · TypeScript · Django · Spring Boot · Flutter · AI",
    tagline: "I build production-ready full-stack web and mobile applications that solve real business problems.",
    roleLine:
      "Holder of B.Sc. in Information Technology | Full-Stack Developer | React · Django · Spring Boot · Flutter · Node.js · AI",
  },
  summary:
    "Full-Stack Developer holding a B.Sc. in Information Technology with production experience in React, TypeScript, Django, Spring Boot, Flutter, PHP, Node.js, and AI/ML. Experienced in healthcare systems, full-stack web and mobile applications, and enterprise IT support. Strong debugging and delivery discipline from one year at the Ministry of Health. Certified by Cisco, Microsoft, and freeCodeCamp. Seeking a Full-Stack Developer role to deliver scalable, maintainable software.",
  aboutContent: {
    headline: "Software Developer Building Production-Ready Applications",
    paragraphs: [
      "I am a B.Sc. Information Technology graduate from the University of Rwanda and a software developer focused on shipping real applications. I work across the full stack — React and TypeScript frontends, Django, Spring Boot, and PHP backends, and mobile apps with Flutter and Expo — turning project ideas into deployable software.",
      "Beyond coursework, I have built Bwiza Workbench (IBM AI Builders clinic co-pilot), Ubuzima Bwiza (AI healthcare triage), Computer Checks (campus QR gate verification), a FERWAFA match-day platform, telemedicine systems, retail inventory tools, IT analytics dashboards, community websites, and IoT billing solutions. Each project follows clean architecture, role-based access, and production-minded patterns.",
      "A one-year internship at the Ministry of Health gave me enterprise discipline: debugging under pressure, maintaining reliable systems, and handling data with care. I hold certifications from Cisco, Microsoft, and freeCodeCamp, and I am ready to contribute as a Full-Stack Developer.",
    ],
    highlights: [
      { key: "education", value: "B.Sc. in Information Technology", detail: "University of Rwanda · Completed Oct 2026" },
      { key: "experience", value: "IT Intern", detail: "Ministry of Health · 1 year" },
      { key: "location", value: "Kigali, Rwanda", detail: "Open to remote and on-site opportunities" },
    ],
  },
  experience: [
    {
      role: "IT Intern — Systems & Application Support",
      company: "Ministry of Health",
      location: "Kigali, Rwanda",
      period: "Mar 2025 – May 2026",
      highlights: [
        "Supported enterprise systems and digital workflows in a government healthcare environment, strengthening debugging and production-support skills.",
        "Maintained workstation reliability and network connectivity for teams using critical health information systems.",
        "Managed structured digital records and data entry with strong focus on accuracy, integrity, and process consistency.",
        "Coordinated asset tracking and preventive maintenance with senior IT administrators in a security-conscious environment.",
        "Applied security-aware practices when handling user accounts, devices, and sensitive institutional data.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Information Technology (B.Sc. IT)",
      institution: "University of Rwanda",
      location: "Kigali, Rwanda",
      period: "Jun 2022 – Oct 2026",
      detail:
        "Completed degree October 2026. Relevant coursework: software engineering, databases, computer networks, cybersecurity, and systems design.",
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
    "Frontend Development": ["React", "TypeScript", "JavaScript", "Flutter", "React Native", "Tailwind CSS", "HTML/CSS"],
    "Backend & APIs": ["Django", "Spring Boot", "Node.js", "PHP", "Python", "Java", "REST APIs", "PostgreSQL", "MySQL"],
    "Tools & Platforms": ["Git", "Docker", "Linux", "Supabase", "SQLite", "Vite", "Maven"],
    "Specializations": ["Full-Stack Web Apps", "Mobile (Flutter / Expo)", "IoT Systems", "Machine Learning", "RBAC & Auth"],
  },
  coreCompetencies: [
    { name: "Full-Stack Web Development", level: 85 },
    { name: "React & TypeScript", level: 85 },
    { name: "Backend APIs (Django / Spring Boot)", level: 80 },
    { name: "Databases (PostgreSQL / SQL)", level: 82 },
    { name: "Problem Solving & Debugging", level: 88 },
    { name: "Git & Version Control", level: 85 },
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
      repo: "blue-monkey-tours-invoice-system",
      title: "Blue Monkey Tours — Invoice Management System",
      organization: "Personal",
      description:
        "Professional tour-operator invoicing for Blue Monkey Tours Rwanda — quotes, multi-currency invoices (USD/RWF desk rates), customers, Lake Kivu boat & wildlife tour catalog, payments (bank/MoMo), and print/PDF, built with PHP, MySQL/SQLite, and Bootstrap.",
      impact:
        "Gives a Rwandan boat-tour agency a full booking-to-invoice workflow with live FX and bilingual-ready operations UI.",
      status: "Featured",
    },
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
      repo: "matchday-and-transfer-management-",
      title: "FERWAFA Match Day & Transfer Management",
      organization: "Personal",
      description:
        "Production monorepo for the Rwanda Premier League — Spring Boot REST API with Thymeleaf admin UI, Flutter referee mobile app, MySQL, Docker, and Swagger. Digitizes match-day reporting, standings, and player transfer workflows for FERWAFA.",
      impact:
        "Modernizes national football operations by replacing paper-based match reporting and transfer processes with a secure full-stack platform.",
      status: "Featured",
    },
    {
      repo: "ubuzima-bwiza",
      title: "Ubuzima Bwiza — Healthcare Platform",
      organization: "Personal",
      description:
        "Full healthcare platform with patient, doctor, hospital, and admin dashboards — appointments, medications, records, chronic care, messaging, and an AI health assistant for symptom triage and specialist booking suggestions (React, TypeScript, Vite).",
      impact:
        "Delivers an end-to-end digital health experience with role-based workflows and AI-assisted triage for patients and providers.",
      status: "Featured",
    },
    {
      repo: "bwiza-workbench",
      title: "Bwiza Workbench — Clinic AI Co-pilot",
      organization: "Personal",
      description:
        "IBM AI Builders Challenge project — AI co-pilot for clinic front desks in Rwanda with patient symptom chat (EN/Kinyarwanda), rule-based urgency triage, specialty routing, clinician note drafts, and human-in-the-loop review (React, Express, SQLite, optional Groq LLM).",
      impact:
        "Speeds front-desk intake and triage while keeping clinicians in control — built on healthcare experience from Ubuzima Bwiza and Ministry of Health internship.",
      status: "Featured",
    },
    {
      repo: "computer-checks",
      title: "Computer Checks — Campus Gate QR System",
      organization: "Personal",
      description:
        "PHP and MySQL campus gate system for UTB Rubavu — register personal computers, generate QR codes by owner name, and log check-in/check-out for admins and gate officers using Bootstrap, JavaScript, and TCPDF barcodes.",
      impact:
        "Secures campus device entry with QR-based verification and clear audit logs for gate operations.",
      status: "Featured",
    },
    {
      repo: "web-based-telemedicine-platform-",
      title: "Gara — Telemedicine Platform",
      organization: "Personal",
      description:
        "Bilingual (English/Kinyarwanda) telemedicine platform for private practices — patient triage, appointment booking, MTN Mobile Money payments, real-time doctor chat, and PDF prescriptions, built with React, Node/Express, SQLite, and Socket.IO.",
      impact:
        "Expands access to remote healthcare in Rwanda with an offline-capable, clean-architecture full-stack app.",
      status: "Featured",
    },
    {
      repo: "Nyabinaga-Association-Website",
      title: "Nyabinaga Community Association Website",
      organization: "Personal",
      description:
        "Warm, responsive website for a Rwandan community-development association — showcasing its 13 livelihood groups, youth programs, impact metrics with charts, and a photo gallery, built with React, Vite, and Tailwind CSS.",
      impact:
        "Gives a grassroots association a professional online presence to tell its story and share its community impact.",
      status: "Completed",
    },
    {
      repo: "IgiciroHub",
      title: "IgiciroHub — Coffee Price Prediction App",
      organization: "Personal",
      description:
        "University capstone AI mobile app for Rwandan coffee cooperatives — Random Forest price predictions with confidence intervals, marketplace, real-time chat, price alerts, and PDF reports. Django REST API with Expo React Native frontend.",
      impact:
        "Helps coffee cooperatives and buyers make data-driven pricing decisions and access market opportunities through mobile technology.",
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
    languages: ["TypeScript", "JavaScript", "Python", "Java", "PHP", "Dart", "SQL", "HTML/CSS"],
    frameworks: ["React", "Django", "Spring Boot", "Flutter", "Node.js", "Expo", "Bootstrap", "Tailwind CSS", "Vite"],
    tools: ["Git", "PostgreSQL", "MySQL", "Supabase", "Docker", "REST APIs", "JWT", "Socket.IO", "AI / ML", "QR / TCPDF"],
    domains: [
      "Full-Stack Development",
      "REST API Design",
      "Mobile Development",
      "AI & Machine Learning",
      "Database Design",
    ],
  },
};
