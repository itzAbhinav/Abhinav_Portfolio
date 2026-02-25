import { useEffect, useRef, useState } from "react";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const EDUCATION = [
  {
    degree: "Master of Artificial Intelligence",
    school: "Monash University",
    location: "Clayton, Australia",
    period: "Mar 2026 – Present",
    detail: "Currently pursuing advanced studies in AI and machine learning.",
  },
  {
    degree: "B.Tech in Computer Science & Engineering",
    school: "Amrita Vishwa Vidyapeetham",
    location: "Coimbatore, India",
    period: "Oct 2020 – May 2024",
    detail: "CGPA: 6.98 / 10",
  },
  {
    degree: "Higher Secondary Education (CBSE)",
    school: "The New Tulip International School",
    location: "Ahmedabad, India",
    period: "Apr 2018 – Mar 2020",
    detail: "Score: 85.4%",
  },
  {
    degree: "Secondary Education (CBSE)",
    school: "Kendriya Vidyalaya SAC",
    location: "Ahmedabad, India",
    period: "Apr 2017 – Mar 2018",
    detail: "Score: 76.8%",
  },
];

const EducationSection = () => {
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
    <section id="education" className="py-24 px-6 relative z-10">
      <div ref={ref} className={`container mx-auto max-w-4xl section-reveal ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="gradient-text">Education</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
          Academic journey from school through a Master's in AI.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {EDUCATION.map((edu, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={edu.degree}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${
                    isLeft ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`ml-12 md:ml-0 w-full md:w-[calc(50%-2rem)] glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 ${
                      visible
                        ? isLeft
                          ? "animate-slide-in-left"
                          : "animate-slide-in-right"
                        : "opacity-0"
                    }`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap size={16} className="text-primary" />
                      <span className="text-xs font-mono text-primary/70 flex items-center gap-1">
                        <Calendar size={12} /> {edu.period}
                      </span>
                    </div>
                    <h3 className="font-display text-sm md:text-base font-semibold text-foreground leading-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-primary/80 font-medium mt-1">{edu.school}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <MapPin size={11} /> {edu.location}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{edu.detail}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-5 md:left-1/2 top-6 md:top-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background animate-pulse-glow -translate-x-1/2 md:-translate-y-1/2" />

                  {/* Spacer */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
