import { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";

const EXPERIENCES = [
  {
    role: "System Engineer",
    company: "Tata Consultancy Services",
    location: "Trivandrum, India",
    period: "Nov 2024 – Feb 2026",
    description: "Worked as a System Engineer (Grade-CI), gained proficient knowledge in Java, JDBC, Azure Cloud Platform & ServiceNow related tasks.",
    side: "left" as const,
  },
  {
    role: "Project Trainee",
    company: "Indian Space Research Organisation (ISRO)",
    location: "Trivandrum, India",
    period: "Jan 2024 – Mar 2024",
    description: "Worked on a research project entitled 'Automated Identification of Venusian Volcanic Features using Convolutional Neural Networks'.",
    side: "right" as const,
  },
];

const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-24 px-6 relative z-10">
      <div ref={ref} className={`container mx-auto max-w-4xl section-reveal ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          Work <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
          Professional experience across software engineering and AI research.
        </p>

        <div className="relative">
          <div className="timeline-line hidden md:block" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.role}
                className={`relative flex flex-col md:flex-row items-center gap-6 ${
                  exp.side === "right" ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Card */}
                <div className={`w-full md:w-[calc(50%-2rem)] glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-500 ${
                  visible ? (exp.side === "left" ? "animate-slide-in-left" : "animate-slide-in-right") : "opacity-0"
                }`} style={{ animationDelay: `${i * 0.3}s` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase size={16} className="text-primary" />
                    <span className="text-xs font-mono text-primary/70">{exp.period}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">{exp.role}</h3>
                  <p className="text-sm text-primary/80 font-medium mt-1">{exp.company}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{exp.location}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{exp.description}</p>
                </div>

                {/* Dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background animate-pulse-glow" />

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
