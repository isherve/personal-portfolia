import { publicAsset } from "@/lib/publicAsset";

const personalRepo = (name: string) => `https://github.com/isherve/${encodeURIComponent(name)}`;
const orgRepo = (name: string) => `https://github.com/Pelino-Courses/${encodeURIComponent(name)}`;
const projectImage = (file: string) => publicAsset(`/projects/${file}`);

export const projectAssets = [
  {
    repo: "water-Bill",
    image: projectImage("water-billing.jpg"),
    technologies: ["React", "Vite", "Node.js", "Express", "Supabase", "ESP32", "AI"],
    githubUrl: personalRepo("water-Bill"),
  },
  {
    repo: "smart-flow-prepaid",
    image: projectImage("smart-flow-real.jpg"),
    technologies: ["React", "TypeScript", "Supabase", "Vite", "Tailwind CSS", "shadcn/ui"],
    githubUrl: personalRepo("smart-flow-prepaid"),
  },
  {
    repo: "-IT-Support-Analytics-Dashboard",
    image: projectImage("it-dashboard.jpg"),
    technologies: ["React", "TypeScript", "Supabase", "Zustand", "Recharts", "Tailwind CSS", "Vite"],
    githubUrl: personalRepo("-IT-Support-Analytics-Dashboard"),
  },
  {
    repo: "Hardware-Operations-Inventory-Management-System",
    image: projectImage("property-management.jpg"),
    technologies: ["React", "TypeScript", "Spring Boot", "Java", "PostgreSQL", "JWT", "TanStack Query"],
    githubUrl: personalRepo("Hardware-Operations-Inventory-Management-System"),
  },
  {
    repo: "improved-property-management-system-with-ui-dynamo-team",
    image: projectImage("property-ui-real.jpg"),
    technologies: ["Django", "Python", "HTML", "CSS", "PostgreSQL", "REST API"],
    githubUrl: orgRepo("improved-property-management-system-with-ui-dynamo-team"),
  },
  {
    repo: "django-project-property-management-system-dynamo-team",
    image: projectImage("django-backend.jpg"),
    technologies: ["Django", "Python", "PostgreSQL", "Admin Panel"],
    githubUrl: orgRepo("django-project-property-management-system-dynamo-team"),
  },
  {
    repo: "enhanced-property-management-django-api-dynamo-team",
    image: projectImage("property-management.jpg"),
    technologies: ["Django", "Python", "REST API", "PostgreSQL", "Admin Panel"],
    githubUrl: orgRepo("enhanced-property-management-django-api-dynamo-team"),
  },
  {
    repo: "django-apis-super",
    image: projectImage("newspaper-app.jpg"),
    technologies: ["Django", "Python", "REST API", "Web Development"],
    githubUrl: orgRepo("django-apis-super"),
  },
  {
    repo: "event-locator-app-design-phase-event-organiser",
    image: projectImage("event-locator-real.jpg"),
    technologies: ["Flutter", "Dart", "Mobile Development", "UI Design"],
    githubUrl: orgRepo("event-locator-app-design-phase-event-organiser"),
  },
  {
    repo: "material-comonents-codelabs",
    image: projectImage("flutter-material.jpg"),
    technologies: ["Flutter", "Dart", "Material Design", "Mobile UI"],
    githubUrl: orgRepo("material-comonents-codelabs"),
  },
  {
    repo: "Qr-code-webapp",
    image: projectImage("qr-code.jpg"),
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "qrcode", "shadcn/ui"],
    githubUrl: personalRepo("Qr-code-webapp"),
  },
  {
    repo: "personal-portfolia",
    image: projectImage("portfolio.jpg"),
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "html2pdf"],
    githubUrl: personalRepo("personal-portfolia"),
    liveUrl: "#home",
  },
  {
    repo: "camper-cafe-project",
    image: projectImage("cafe-menu.jpg"),
    technologies: ["HTML", "CSS", "Python", "Responsive Design"],
    githubUrl: personalRepo("camper-cafe-project"),
  },
  {
    repo: "web-design-documentation",
    image: projectImage("web-design-docs.jpg"),
    technologies: ["HTML", "CSS", "Technical Writing", "Responsive Design"],
    githubUrl: personalRepo("web-design-documentation"),
  },
] as const;
