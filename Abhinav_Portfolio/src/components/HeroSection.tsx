import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ChevronDown, Download } from "lucide-react";

const ROLES = [
  "AI Student",
  "System Engineer",
  "ML Enthusiast",
  "Problem Solver",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && text === current) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }
    if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6">
      <div className="text-center z-10 max-w-3xl mx-auto">
        <p className="text-primary font-mono text-sm md:text-base mb-4 tracking-widest uppercase animate-fade-in-up">
          Welcome to my portfolio
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
          <span className="text-foreground">Abhinav</span>{" "}
          <span className="gradient-text">Sathiyamoorthy</span>
        </h1>
        <div className="h-10 md:h-12 flex items-center justify-center mb-8">
          <span className="font-mono text-lg md:text-2xl text-muted-foreground">
            {text}
            <span className="inline-block w-0.5 h-6 md:h-7 bg-primary ml-1 align-middle" style={{ animation: "typing-cursor 1s step-end infinite" }} />
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button onClick={scrollToProjects} className="gradient-btn px-8 py-3 rounded-lg font-display text-sm tracking-wider">
            View Projects
          </button>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all font-display text-sm tracking-wider"
          >
            Get In Touch
          </a>
          <a
            href="https://raw.githubusercontent.com/itzAbhinav/Resume/main/Resume_Abhinav%20(2).pdf"
            download="Resume_Abhinav.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg border border-secondary/30 text-secondary hover:bg-secondary/10 transition-all font-display text-sm tracking-wider inline-flex items-center gap-2"
          >
            <Download size={16} /> Resume
          </a>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_hsl(190,95%,55%)]">
            <Github size={22} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_hsl(190,95%,55%)]">
            <Linkedin size={22} />
          </a>
          <a href="mailto:abhisathya2k@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_hsl(190,95%,55%)]">
            <Mail size={22} />
          </a>
        </div>
      </div>

      <a
        href="#about"
        onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-float"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
};

export default HeroSection;
