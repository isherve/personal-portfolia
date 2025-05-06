
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const About = () => {
  return (
    <section id="about" className="bg-card/30 py-16">
      <div className="section-container">
        <h2 className="heading">About Me</h2>
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-full md:w-1/3 flex justify-center">
            <Avatar className="w-64 h-64 border-4 border-primary">
              <AvatarImage src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop" alt="Profile" />
              <AvatarFallback className="text-4xl">YN</AvatarFallback>
            </Avatar>
          </div>
          <div className="w-full md:w-2/3">
            <h3 className="text-2xl font-bold mb-4">Frontend Developer & UI Designer</h3>
            <p className="text-secondary mb-6">
              I'm a passionate web developer with expertise in creating responsive and dynamic web applications. 
              With a background in both design and development, I bridge the gap between aesthetics and functionality.
            </p>
            <p className="text-secondary mb-6">
              I enjoy turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding or 
              pushing pixels, you'll find me exploring new technologies or working on side projects.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-primary">Location</h4>
                <p className="text-secondary">Kigali , RWANDA</p>
              </div>
              <div>
                <h4 className="font-medium text-primary">Freelance</h4>
                <p className="text-secondary">Available</p>
              </div>
              <div>
                <h4 className="font-medium text-primary">Email</h4>
                <p className="text-secondary">ishimwehervin10@gmail.com</p>
              </div>
              <div>
                <h4 className="font-medium text-primary">Education</h4>
                <p className="text-secondary">Information Technology, University of Rwanda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
