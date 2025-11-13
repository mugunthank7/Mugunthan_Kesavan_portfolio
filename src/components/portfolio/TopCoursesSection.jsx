import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star } from 'lucide-react';

const topCourses = [
  { name: "Reinforcement Learning", grade: "A+", credits: 3, year: 3 },
  { name: "AI in Natural Language Processing", grade: "A+", credits: 3, year: 3 },
  { name: "Introduction to Cloud Computing", grade: "A+", credits: 3, year: 3 },
  { name: "Formal Language and Automata", grade: "A+", credits: 3, year: 3 },
  { name: "Deep Learning for Signal & Image Processing", grade: "A", credits: 3, year: 3 },
  { name: "Advanced Computer Networks", grade: "A", credits: 3, year: 3 },
  { name: "Signal & Image Processing", grade: "A", credits: 3, year: 3 },
  { name: "AI in Speech Processing", grade: "A", credits: 3, year: 3 },
  { name: "Data Structures & Algorithms 2", grade: "A", credits: 3, year: 2 },
  { name: "Elements of Computing Systems 2", grade: "A+", credits: 3, year: 1 },
  { name: "Data Structures & Algorithms 1", grade: "A", credits: 3, year: 1 },
  { name: "Design and Analysis of Algorithms", grade: "B+", credits: 3, year: 2 },
];

export default function TopCoursesSection() {
  return (
    <section id="top-courses" className="py-20 px-6 bg-[#0d1117] relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-1 w-12 bg-gradient-to-r from-[#d2a8ff] to-[#f778ba] rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#c9d1d9]">Top Courses</h2>
          <Star className="w-6 h-6 text-[#d2a8ff] fill-[#d2a8ff]" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCourses.map((course, index) => {
            const isAPlus = course.grade === "A+";
            return (
              <Card 
                key={index}
                className="bg-[#161b22] border-[#30363d] hover:border-[#d2a8ff] transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge 
                      className={`${
                        isAPlus 
                          ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50' 
                          : 'bg-green-500/20 text-green-300 border-green-500/50'
                      }`}
                    >
                      {course.grade}
                      {isAPlus && <Star className="w-3 h-3 ml-1 fill-yellow-300" />}
                    </Badge>
                    <span className="text-xs text-[#7d8590]">Year {course.year}</span>
                  </div>
                  <h3 className="font-semibold text-[#c9d1d9] text-lg mb-2 group-hover:text-[#d2a8ff] transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-sm text-[#7d8590]">{course.credits} Credits</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* GPA Summary */}
        <div className="grid md:grid-cols-4 gap-4 mt-12">
          <Card className="bg-[#161b22] border-[#30363d]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] bg-clip-text text-transparent mb-2">
                3.7
              </div>
              <div className="text-sm text-[#7d8590]">Cumulative GPA</div>
            </CardContent>
          </Card>
          <Card className="bg-[#161b22] border-[#30363d]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#58a6ff] mb-2">3.628</div>
              <div className="text-sm text-[#7d8590]">Year 3 GPA</div>
            </CardContent>
          </Card>
          <Card className="bg-[#161b22] border-[#30363d]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#bc8cff] mb-2">133</div>
              <div className="text-sm text-[#7d8590]">Graded Credits</div>
            </CardContent>
          </Card>
          <Card className="bg-[#161b22] border-[#30363d]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-[#d2a8ff] mb-2">12+</div>
              <div className="text-sm text-[#7d8590]">A+ Grades</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}