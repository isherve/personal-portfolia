
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Skills = () => {
  const technicalSkills = [
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "UI/UX Design", level: 85 },
  ];

  const otherSkills = [
    "Responsive Design", "Git", "RESTful APIs", "GraphQL",
    "Tailwind CSS", "Material UI", "Firebase", "AWS",
    "MongoDB", "PostgreSQL", "Jest", "Figma"
  ];

  return (
    <section id="skills" className="py-16">
      <div className="section-container">
        <h2 className="heading">Skills & Experience</h2>
        <p className="subheading">
          With expertise in frontend development and a strong foundation in design principles,
          I create intuitive and visually appealing web applications.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {technicalSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Experience</h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold">Senior Frontend Developer</h4>
                  <span className="text-sm text-secondary">2021 - Present</span>
                </div>
                <p className="text-primary font-medium mb-2">Tech Company Inc.</p>
                <p className="text-secondary text-sm">Led development of the company's flagship product, improving performance metrics by 45%.</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold">UI/UX Designer</h4>
                  <span className="text-sm text-secondary">2018 - 2021</span>
                </div>
                <p className="text-primary font-medium mb-2">Design Studio LLC</p>
                <p className="text-secondary text-sm">Created user experiences for various clients across fintech and healthcare industries.</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold">Web Developer</h4>
                  <span className="text-sm text-secondary">2016 - 2018</span>
                </div>
                <p className="text-primary font-medium mb-2">Startup Co.</p>
                <p className="text-secondary text-sm">Developed responsive websites and maintained company CMS systems.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-bold mb-6">Other Skills & Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {otherSkills.map((skill) => (
              <Badge key={skill} variant="outline" className="bg-card text-foreground border-border px-4 py-1.5">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
