import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Camera, Plane, Heart, Terminal } from 'lucide-react';

// This section highlights interests and extracurricular activities
// outside of coursework and research. Each activity includes a
// descriptive title, a short explanation and optionally tags.

const activities = [
  {
    icon: Music,
    title: 'Music Production',
    description:
      'Produce and compose instrumental tracks across genres; skilled pianist with a passion for blending classical and modern electronic styles.',
    tags: ['Piano', 'DAW', 'Composition']
  },
  {
    icon: Camera,
    title: 'Photography',
    description:
      'Amateur photographer capturing landscapes and street scenes. Enjoy experimenting with low‑light and long‑exposure techniques.',
    tags: ['Street', 'Landscape', 'Editing']
  },
  {
    icon: Plane,
    title: 'Travel & Exploration',
    description:
      'Avid traveler who loves exploring new cultures, cuisines and natural wonders; always seeking the next adventure.',
    tags: ['Culture', 'Food', 'Nature']
  },
  {
    icon: Heart,
    title: 'Community Service',
    description:
      'Volunteer tutor for underprivileged high‑school students, focusing on math and computer science fundamentals.',
    tags: ['Tutoring', 'Community', 'STEM']
  },
  {
    icon: Terminal,
    title: 'Open Source',
    description:
      'Contribute to open‑source projects related to data science and developer tooling; enjoy collaboration and mentoring newcomers.',
    tags: ['GitHub', 'Docs', 'Mentoring']
  }
];

export default function ExtracurricularSection() {
  return (
    <section id="extracurricular" className="py-20 px-6 bg-[#0d1117] relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-1 w-12 bg-gradient-to-r from-[#f778ba] to-[#bc8cff] rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#c9d1d9]">Beyond the Code</h2>
          <Heart className="w-6 h-6 text-[#f778ba]" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, idx) => {
            const Icon = activity.icon;
            return (
              <Card
                key={idx}
                className="bg-[#161b22] border-[#30363d] hover:border-[#bc8cff] transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-[#bc8cff]" />
                    <h3 className="text-lg font-bold text-[#c9d1d9]">{activity.title}</h3>
                  </div>
                  <p className="text-sm text-[#8b949e] leading-relaxed mb-4">
                    {activity.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activity.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-[#f778ba]/50 text-[#f778ba]"
                      >
                        {tag}
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