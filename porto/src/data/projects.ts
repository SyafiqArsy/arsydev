export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  gradient: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    category: "Web App / SaaS",
    description:
      "A real-time analytics dashboard with interactive data visualizations and AI-powered insights.",
    tech: ["React", "D3.js", "Node.js", "WebSocket"],
    gradient: "from-blue-700 via-blue-800 to-slate-900",
  },
  {
    id: 2,
    title: "Flux E-Commerce",
    category: "Full-Stack / E-Commerce",
    description:
      "Modern e-commerce platform with seamless checkout, inventory management, and personalized recommendations.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"],
    gradient: "from-blue-600 via-blue-700 to-slate-900",
  },
  {
    id: 3,
    title: "Orion Social",
    category: "Mobile / Social",
    description:
      "A minimalist social platform focused on meaningful connections through shared creative experiences.",
    tech: ["React Native", "Firebase", "GraphQL", "Expo"],
    gradient: "from-slate-700 via-blue-800 to-slate-900",
  },
  {
    id: 4,
    title: "Prism Design System",
    category: "Design / Component Library",
    description:
      "Comprehensive design system with 200+ components, accessibility-first approach, and Figma integration.",
    tech: ["Storybook", "React", "Tailwind", "Figma API"],
    gradient: "from-blue-500 via-blue-700 to-blue-900",
  },
  {
    id: 5,
    title: "Aether AI Platform",
    category: "AI / Machine Learning",
    description:
      "No-code AI training platform that lets teams build, deploy, and monitor custom ML models.",
    tech: ["Python", "TensorFlow", "FastAPI", "React"],
    gradient: "from-blue-600 via-blue-800 to-slate-900",
  },
];
