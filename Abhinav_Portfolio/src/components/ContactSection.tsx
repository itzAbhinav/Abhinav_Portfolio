import { useEffect, useRef, useState } from "react";
import { Send, Github, Linkedin, Mail } from "lucide-react";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative z-10">
      <div ref={ref} className={`container mx-auto max-w-2xl section-reveal ${visible ? "visible" : ""}`}>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-md mx-auto mb-12">
          Feel free to reach out for collaborations, opportunities, or just a friendly chat.
        </p>

        <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-6">
          {[
            { key: "name", label: "Name", type: "text" },
            { key: "email", label: "Email", type: "email" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
              <input
                type={field.type}
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_10px_hsl(190,95%,55%,0.2)] transition-all placeholder:text-muted-foreground/50"
                placeholder={`Your ${field.label.toLowerCase()}`}
              />
              {errors[field.key] && <p className="text-destructive text-xs mt-1">{errors[field.key]}</p>}
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_10px_hsl(190,95%,55%,0.2)] transition-all resize-none placeholder:text-muted-foreground/50"
              placeholder="Your message..."
            />
            {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
          </div>

          <button type="submit" className="gradient-btn w-full py-3 rounded-lg font-display text-sm tracking-wider flex items-center justify-center gap-2">
            <Send size={16} /> Send Message
          </button>

          {submitted && (
            <p className="text-center text-primary text-sm animate-fade-in-up">
              ✓ Message sent successfully!
            </p>
          )}
        </form>

        <div className="flex items-center justify-center gap-6 mt-10">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_hsl(190,95%,55%)]">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_hsl(190,95%,55%)]">
            <Linkedin size={20} />
          </a>
          <a href="mailto:abhisathya2k@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_hsl(190,95%,55%)]">
            <Mail size={20} />
          </a>
        </div>

        <p className="text-center text-muted-foreground/50 text-xs mt-16 font-mono">
          © 2026 Abhinav Sathiyamoorthy. Built with passion.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
