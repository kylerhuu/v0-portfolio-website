"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  problem: string;
  role: string;
  techStack: string[];
  impact: string;
}

const PROJECTS: Project[] = [
  {
    title: "NeuroSync",
    description: "AI pipeline for real-time neural signal processing",
    tags: ["AI", "Backend", "Research"],
    problem:
      "Existing neural signal processing pipelines had high latency and could not handle real-time streaming data from lab instruments.",
    role: "Lead engineer responsible for architecture design, data pipeline implementation, and model optimization.",
    techStack: ["Python", "TensorFlow", "Apache Kafka", "Docker", "GCP"],
    impact:
      "Reduced processing latency by 85%, enabling real-time neuroscience experiments across 3 research labs.",
  },
  {
    title: "BioGraph",
    description: "Knowledge graph for biological pathway visualization",
    tags: ["Full-Stack", "Data Viz", "Research"],
    problem:
      "Researchers needed a way to explore complex biological pathway relationships without navigating fragmented databases.",
    role: "Full-stack developer. Built the graph engine, API layer, and interactive frontend.",
    techStack: ["React", "D3.js", "Neo4j", "FastAPI", "AWS"],
    impact:
      "Adopted by 200+ researchers. Reduced pathway exploration time from hours to minutes.",
  },
  {
    title: "ScaleKit",
    description: "Auto-scaling infrastructure toolkit for ML workloads",
    tags: ["Infrastructure", "ML", "DevOps"],
    problem:
      "ML teams struggled to efficiently provision and scale GPU resources for training and inference workloads.",
    role: "Core contributor. Designed the scheduling algorithm and resource allocation system.",
    techStack: ["Go", "Kubernetes", "Terraform", "Prometheus", "gRPC"],
    impact:
      "Cut infrastructure costs by 40% while improving job throughput by 3x across the organization.",
  },
  {
    title: "CellMap",
    description: "Spatial transcriptomics analysis platform",
    tags: ["AI", "Biotech", "Full-Stack"],
    problem:
      "No accessible tool existed for interactive spatial transcriptomics data exploration at single-cell resolution.",
    role: "Sole developer. Built end-to-end from data ingestion to interactive visualization.",
    techStack: ["Next.js", "Python", "WebGL", "PostgreSQL", "Vercel"],
    impact:
      "Used in a published Nature Methods paper. Now open-sourced with 500+ GitHub stars.",
  },
  {
    title: "AgentForge",
    description: "Framework for composable AI agent workflows",
    tags: ["AI", "SDK", "Open Source"],
    problem:
      "Building multi-step AI agent workflows required too much boilerplate and lacked composability.",
    role: "Creator and maintainer. Designed the core API, plugin system, and documentation.",
    techStack: ["TypeScript", "LangChain", "Redis", "Node.js", "Vercel AI SDK"],
    impact:
      "1,200+ npm weekly downloads. Featured in AI engineering newsletters.",
  },
  {
    title: "LabOS",
    description: "Operating system for wet-lab experiment tracking",
    tags: ["Full-Stack", "Biotech", "SaaS"],
    problem:
      "Wet labs relied on paper notebooks and spreadsheets, leading to data loss and irreproducible experiments.",
    role: "Co-founder and technical lead. Built MVP, led beta testing with 3 labs.",
    techStack: ["React", "Supabase", "Tailwind", "Stripe", "Vercel"],
    impact:
      "Onboarded 5 labs during beta. Secured $50K in pre-seed funding.",
  },
];

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left p-6 rounded-lg bg-card border border-border hover:border-[hsl(15,80%,55%)]/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-[hsl(15,80%,55%)] transition-colors">
          {project.title}
        </h3>
        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs bg-secondary text-secondary-foreground"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </button>
  );
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative z-10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-[hsl(15,80%,55%)] mb-4">
          Projects
        </h2>
        <p className="text-2xl md:text-3xl font-medium text-foreground mb-12 text-pretty">
          Selected work across AI, infrastructure, and biotech.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {selected?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selected?.description}
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="flex flex-col gap-6 mt-2">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Problem
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selected.problem}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  My Role
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selected.role}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selected.techStack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs text-foreground border-border"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[hsl(15,80%,55%)] mb-2">
                  Impact
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selected.impact}
                </p>
              </div>

              {/* Demo video placeholder */}
              <div className="rounded-lg bg-secondary border border-border flex items-center justify-center h-48">
                <p className="text-sm text-muted-foreground">
                  Demo video coming soon
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
