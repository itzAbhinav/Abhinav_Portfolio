import { useEffect, useRef, useState } from "react";
import { Code2, Brain, Wrench } from "lucide-react";

const SKILLS = [
  { category: "Languages", icon: Code2, items: [
    { name: "Python", level: 90 },
    { name: "C++", level: 80 },
    { name: "Java", level: 75 },
  ]},
  { category: "ML / AI", icon: Brain, items: [
    { name: "CNNs & Neural Networks", level: 85 },
    { name: "XGBoost & Naive Bayes", level: 80 },
    { name: "PyTorch", level: 78 },
  ]},
  { category: "Tools & Web", icon: Wrench, items: [
    { name: "NumPy & Pandas", level: 88 },
    { name: "Matplotlib", level: 82 },
    { name: "HTML & DBMS", level: 75 },
  ]},
];

const AboutSection = () => {
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
    <section id="about" className="py-24 px-6 relative z-10">
      <div ref={ref} className={`container mx-auto max-w-5xl section-reveal ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          AI enthusiast and software developer pursuing a Master's in Artificial Intelligence at Monash University.
          Passionate about machine learning, computer vision, and building impactful solutions.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {SKILLS.map((group) => (
            <div key={group.category} className="glass-card rounded-xl p-6 hover:border-primary/30 transition-all duration-300">
              <h3 className="font-display text-sm font-semibold mb-5 flex items-center gap-2 text-primary tracking-wider">
                <group.icon size={18} /> {group.category}
              </h3>
              <div className="space-y-4">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-muted-foreground font-mono text-xs">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        style={{ width: visible ? `${skill.level}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
