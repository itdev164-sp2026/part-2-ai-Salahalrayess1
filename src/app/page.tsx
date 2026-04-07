import { Code, Layout, Zap, Terminal, Database, Cpu, Server } from "lucide-react";
import { SkillCard } from "@/components/skill-card";

const skills = [
  { title: "JavaScript", icon: Code },
  { title: "React", icon: Zap },
  { title: "Next.js", icon: Layout },
  { title: "Node.js", icon: Server },
  { title: "Databases", icon: Database },
  { title: "DevOps", icon: Cpu },
  { title: "CLI & Tools", icon: Terminal },
];

export default function DeveloperProfile() {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Salah eddin alrayess</h1>
        <p className="text-muted-foreground">
          Web development student focusing on modern full‑stack JavaScript
          workflows and AI-assisted developer tooling.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map(({ title, icon: Icon }) => (
            <SkillCard key={title} title={title} icon={Icon} />
          ))}
        </div>
      </section>

      <div className="mt-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          Setup verified ✓
        </span>
      </div>
    </div>
  );
}
