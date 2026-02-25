import { useEffect, useRef, useState } from "react";


const PROJECTS = [
  {
    title: "Cloud Security & Data Integrity using Blockchain",
    description: "Implemented blockchain-based integrity verification with Merkle Trees for secure cloud data storage and tamper detection.",
    tags: ["Blockchain", "Merkle Trees", "Security", "Python"],
  },
  {
    title: "Churn Prediction System",
    description: "Built ML models using MLP, Naive Bayes, and XGBoost achieving improved customer churn prediction accuracy.",
    tags: ["Machine Learning", "XGBoost", "MLP", "Python"],
  },
  {
    title: "Movie Recommender System",
    description: "Developed neural collaborative filtering model using PyTorch with high precision for personalized movie recommendations.",
    tags: ["PyTorch", "Deep Learning", "NCF", "Python"],
    
  },
];

const ProjectsSection = () => {
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
    <section id="projects" className="py-24 px-6 relative z-10">
      <div ref={ref} className={`container mx-auto max-w-5xl section-reveal ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          My <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
          A selection of projects showcasing my skills in AI, ML, and software engineering.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className="glass-card rounded-xl p-6 group hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(190,95%,55%,0.15)]"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="font-display text-primary text-sm font-bold">0{i + 1}</span>
              </div>
              <h3 className="font-display text-base font-semibold mb-3 text-foreground group-hover:text-primary transition-colors leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary/80 border border-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
