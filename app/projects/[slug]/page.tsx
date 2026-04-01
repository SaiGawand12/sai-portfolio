import Link from "next/link";
import { notFound } from "next/navigation";

const projects: Record<string, {
  title: string; tags: string[]; year: string; desc: string; color: string; details: string;
}> = {
  "ONDC": {
    title: "High-Scale Interoperable Discovery Engine (ONDC/UHI)",
    tags: ["Distributed Systems", "Golang", "AI Orchestration", "Observability"],
    year: "2025",
    color: "#d4ede4",
    desc: "A complete visual identity for a fintech startup — logo, typography, color system, and component library.",
    details: "This project involved building a full brand identity from scratch. Starting with discovery workshops, competitive analysis, and mood boarding, we developed a visual language that communicates trust, clarity, and innovation. Deliverables included logo suite, color palette, typography scale, iconography, and a Figma component library.",
  },
  "e-commerce-platform": {
    title: "E-Commerce Platform",
    tags: ["Full-Stack", "React", "Node.js"],
    year: "2025",
    color: "#e8e4f5",
    desc: "End-to-end shopping experience with real-time inventory, Stripe payments, and a custom CMS.",
    details: "Built with Next.js, Node.js, and PostgreSQL. Features include real-time inventory management, Stripe checkout integration, order tracking, admin CMS, and a fully responsive storefront. Optimized for Core Web Vitals with SSR and image optimization.",
  },
  "saas-dashboard": {
    title: "SaaS Dashboard",
    tags: ["UI/UX", "Next.js"],
    year: "2024",
    color: "#f5f0e4",
    desc: "Analytics dashboard with live charts, role-based access, and a dark/light mode design system.",
    details: "Designed and developed a data-heavy analytics dashboard for a B2B SaaS product. Includes real-time chart updates via WebSockets, role-based access control, CSV export, and a fully accessible design system supporting both dark and light modes.",
  },
  "mobile-app-design": {
    title: "Mobile App Design",
    tags: ["Figma", "Prototyping"],
    year: "2024",
    color: "#e4f0f5",
    desc: "Health & wellness app — user research, wireframes, high-fidelity prototype, and design handoff.",
    details: "Led the end-to-end UX process for a health tracking mobile app. Conducted 12 user interviews, synthesized findings into personas and journey maps, produced low and high-fidelity wireframes, and delivered a fully interactive Figma prototype with developer handoff documentation.",
  },
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-white">
      {/* Back nav */}
      <div className="fixed top-6 left-8 z-50">
        <Link
          href="/#projects"
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200"
        >
          ← Back
        </Link>
      </div>

      {/* Hero band */}
      <div
        className="w-full pt-32 pb-20 px-8 md:px-20"
        style={{ backgroundColor: project.color }}
      >
        <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-4">{project.year}</p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 leading-none mb-6 max-w-3xl">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span key={tag} className="text-sm px-4 py-1.5 rounded-full border border-gray-400 text-gray-600">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xl text-gray-700 max-w-2xl leading-relaxed">{project.desc}</p>
      </div>

      {/* Content */}
      <div className="px-8 md:px-20 py-20 max-w-4xl">
        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Overview</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-16">{project.details}</p>

        {/* Placeholder image blocks */}
        <div className="grid grid-cols-2 gap-4 mb-16">
          <div className="aspect-video rounded-2xl" style={{ backgroundColor: project.color }} />
          <div className="aspect-video rounded-2xl bg-gray-100" />
          <div className="aspect-video rounded-2xl bg-gray-100" />
          <div className="aspect-video rounded-2xl" style={{ backgroundColor: project.color, opacity: 0.6 }} />
        </div>
      </div>
    </main>
  );
}
