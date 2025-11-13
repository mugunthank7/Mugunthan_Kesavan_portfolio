import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Settings, Cloud, Shield } from 'lucide-react';

// A simple skills section that showcases technical proficiencies
// grouped into logical categories. Each category is displayed in
// its own card with a heading and a set of badges representing
// individual skills. Feel free to customize or extend this list to
// match your own experience.

const skills = [
  {
    icon: Code,
    title: 'Programming Languages',
    items: ['Python', 'Scala', 'Java', 'C/C++', 'JavaScript']
  },
  {
    icon: Database,
    title: 'Data & Storage',
    items: ['SQL', 'NoSQL', 'PostgreSQL', 'MongoDB', 'Hadoop']
  },
  {
    icon: Cloud,
    title: 'Frameworks & Libraries',
    items: ['React', 'Spark', 'TensorFlow', 'PyTorch', 'Docker']
  },
  {
    icon: Settings,
    title: 'Tools & Platforms',
    items: ['Linux', 'Git', 'AWS', 'Azure', 'Kubernetes']
  },
  {
    icon: Shield,
    title: 'Concepts',
    items: ['Machine Learning', 'NLP', 'Computer Vision', 'Distributed Systems']
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 bg-[#0d1117] relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-1 w-12 bg-gradient-to-r from-[#238636] to-[#58a6ff] rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#c9d1d9]">Skills & Tools</h2>
          <Code className="w-6 h-6 text-[#238636]" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, idx) => {
            const Icon = group.icon;
            return (
              <Card
                key={idx}
                className="bg-[#161b22] border-[#30363d] hover:border-[#58a6ff] transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-[#58a6ff]" />
                    <h3 className="text-xl font-bold text-[#c9d1d9]">{group.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-[#58a6ff]/50 text-[#58a6ff]"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}