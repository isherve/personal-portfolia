export type Locale = "en" | "fr";

export interface PortfolioContent {
  ui: {
    nav: {
      home: string;
      about: string;
      skills: string;
      certificates: string;
      projects: string;
      contact: string;
    };
    theme: {
      dark: string;
      light: string;
      switchToDark: string;
      switchToLight: string;
    };
    language: {
      switch: string;
    };
    hero: {
      badge: string;
      headlinePart1: string;
      headlineHighlight: string;
      roleKeywords: string;
      intro: string;
      viewWork: string;
      downloadCv: string;
      preparingPdf: string;
      contactMe: string;
      scrollAbout: string;
      features: Array<{ title: string; subtitle: string }>;
    };
    about: {
      title: string;
      subtitle: string;
    };
    skills: {
      title: string;
      subtitle: string;
      coreCompetencies: string;
      professionalExperience: string;
      education: string;
      technologyStack: string;
      languages: string;
    };
    certificates: {
      title: string;
      subtitle: string;
    };
    projects: {
      title: string;
      subtitle: string;
      code: string;
      liveDemo: string;
      requestDemo: string;
      sourceOnRequest: string;
      personalRepos: string;
      orgRepos: string;
      status: Record<string, string>;
      organization: Record<string, string>;
    };
    contact: {
      title: string;
      subtitle: string;
      email: string;
      emailHint: string;
      phone: string;
      phoneHint: string;
      location: string;
      locationHint: string;
      references: string;
      formName: string;
      formEmail: string;
      formSubject: string;
      formMessage: string;
      placeholders: {
        name: string;
        email: string;
        subject: string;
        message: string;
      };
      send: string;
      sending: string;
      successTitle: string;
      successDesc: string;
      errorTitle: string;
      errorDesc: string;
    };
    footer: {
      rights: string;
      downloadCv: string;
    };
    cv: {
      downloadError: string;
      downloadErrorDesc: string;
    };
    resume: {
      professionalSummary: string;
      professionalExperience: string;
      selectedProjects: string;
      education: string;
      certifications: string;
      technicalSkills: string;
      languages: string;
      references: string;
      also: string;
      skillGroups: {
        languages: string;
        frameworks: string;
        tools: string;
        domains: string;
      };
    };
    highlightLabels: {
      education: string;
      experience: string;
      location: string;
    };
  };
  personal: {
    title: string;
    tagline: string;
    roleLine: string;
  };
  summary: string;
  aboutContent: {
    headline: string;
    paragraphs: string[];
    highlights: Array<{ key: "education" | "experience" | "location"; value: string; detail: string }>;
  };
  experience: Array<{
    role: string;
    company: string;
    location: string;
    period: string;
    highlights: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    period: string;
    detail: string;
  }>;
  skillGroups: Record<string, string[]>;
  coreCompetencies: Array<{ name: string; level: number }>;
  spokenLanguages: Array<{ name: string; level: string; percent: number }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    highlight: boolean;
    description: string;
  }>;
  projects: Array<{
    repo: string;
    title: string;
    description: string;
    impact: string;
    status: string;
    organization: string;
    liveLabel?: string;
  }>;
  references: Array<{ name: string; title: string; phone: string }>;
  resumeSkills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    domains: string[];
  };
}
