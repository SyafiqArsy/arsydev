"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    title: "Design",
    skills: [
      { name: "Figma", level: 88 },
      { name: "UI/UX Design", level: 82 },
      { name: "Motion Design", level: 78 },
      { name: "Prototyping", level: 80 },
    ],
  },
  {
    title: "Backend & Tools",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "PostgreSQL", level: 75 },
      { name: "Git", level: 90 },
      { name: "Docker", level: 72 },
    ],
  },
];

export default function Skills() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="text-sm uppercase tracking-[0.2em] text-purple-400 mb-4 block">
          Expertise
        </span>
        <h2 className="text-5xl md:text-7xl font-bold">
          Skills &{" "}
          <span className="gradient-text">Tools</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <h3 className="text-xl font-semibold mb-8 text-gray-300">
              {category.title}
            </h3>
            <div className="space-y-6">
              {category.skills.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="h-[3px] bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
