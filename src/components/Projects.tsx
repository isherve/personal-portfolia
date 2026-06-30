
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { personal, organizations, social } from "@/data/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExternalLink, Github, Mail } from "lucide-react";

const Projects = () => {
  const { content, projects } = useLanguage();
  const { projects: ui } = content.ui;
  const orgName = organizations[0].name;

  const scrollToHome = () => {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  };

  const subtitleText = ui.subtitle
    .replace("{count}", String(projects.length))
    .replace("{org}", orgName);

  return (
    <section id="projects" className="bg-card/30 py-16">
      <div className="section-container">
        <h2 className="heading">{ui.title}</h2>
        <p className="subheading">
          {subtitleText.split("GitHub").map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub
                </a>
              </span>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.repo} className="card-hover bg-card border-border overflow-hidden flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {project.status && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                    {ui.status[project.status] ?? project.status}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="absolute top-3 left-3 bg-background/90 text-xs border-primary/40"
                >
                  {ui.organization[project.organization] ?? project.organization}
                </Badge>
              </div>
              <CardHeader className="flex-1">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="text-secondary leading-relaxed">
                  {project.description}
                </CardDescription>
                <p className="text-xs text-primary/80 mt-2 font-medium">{project.impact}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="bg-background text-primary border-primary/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between gap-2">
                {project.githubUrl ? (
                  <Button variant="ghost" size="sm" className="text-secondary hover:text-primary" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={18} className="mr-2" />
                      {ui.code}
                    </a>
                  </Button>
                ) : (
                  <span className="text-xs text-secondary px-2">{ui.sourceOnRequest}</span>
                )}
                {"liveUrl" in project && project.liveUrl ? (
                  project.liveUrl.startsWith("#") ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-secondary hover:text-primary ml-auto"
                      onClick={scrollToHome}
                    >
                      <ExternalLink size={18} className="mr-2" />
                      {project.liveLabel ?? ui.liveDemo}
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-secondary hover:text-primary ml-auto" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={18} className="mr-2" />
                        {project.liveLabel ?? ui.liveDemo}
                      </a>
                    </Button>
                  )
                ) : (
                  <Button variant="ghost" size="sm" className="text-secondary hover:text-primary ml-auto" asChild>
                    <a
                      href={`mailto:${personal.email}?subject=${encodeURIComponent(`Project Inquiry: ${project.title}`)}`}
                    >
                      <Mail size={18} className="mr-2" />
                      {ui.requestDemo}
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
            <a href={`${social.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
              <Github size={18} className="mr-2" />
              {ui.personalRepos}
            </a>
          </Button>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
            <a href={`${organizations[0].url}?tab=repositories`} target="_blank" rel="noopener noreferrer">
              <Github size={18} className="mr-2" />
              {ui.orgRepos.replace("{org}", orgName)}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
