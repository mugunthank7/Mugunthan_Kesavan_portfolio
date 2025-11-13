import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Award, Download, ChevronRight } from 'lucide-react';

export default function EducationSection({ scrollToTopCourses }) {
  return (
    <section 
      id="education" 
      className="py-20 px-6 bg-[#010409] relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-1 w-12 bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">Education</h2>
          <GraduationCap className="w-6 h-6 text-[#58a6ff]" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Master's Degree */}
          <Card className="bg-[#161b22] border-[#30363d] hover:border-[#58a6ff] transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6914b2c1758116cf1a4ccd06/a496b535c_uh_red.png"
                  alt="University of Houston"
                  className="w-16 h-16 object-contain"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#58a6ff] transition-colors">
                        MS - Data Science
                      </h3>
                      <p className="text-[#8b949e]">Engineering Data Science</p>
                      <p className="text-[#7d8590] text-sm mt-1">University of Houston</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                      Current
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[#8b949e]">
                  <span className="font-semibold text-white">Expected:</span> May 2027
                </p>
                <p className="text-[#7d8590] text-sm mt-4">
                  Advanced Machine Learning, Big Data Analytics, Distributed Systems
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Bachelor's Degree */}
          <Card className="bg-[#161b22] border-[#30363d] hover:border-[#bc8cff] transition-all duration-300 group">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6914b2c1758116cf1a4ccd06/e401f0549_idYO9DXBsb_1762969430577.jpeg"
                  alt="Amrita Vishwa Vidyapeetham"
                  className="w-16 h-16 object-contain rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#bc8cff] transition-colors">
                        BTech - AI Engineering
                      </h3>
                      <p className="text-[#8b949e]">Artificial Intelligence</p>
                      <p className="text-[#7d8590] text-sm mt-1">Amrita Vishwa Vidyapeetham</p>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                      2021 - 2025
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[#8b949e]">
                  <span className="font-semibold text-white">GPA:</span> 3.7/4.0 (CGPA: 8.21/10)
                </p>
                <p className="text-[#8b949e]">
                  <span className="font-semibold text-white">Total Credits:</span> 166 (133 graded)
                </p>
                <Button
                  onClick={scrollToTopCourses}
                  variant="outline"
                  size="sm"
                  className="mt-4 border-[#30363d] hover:border-[#bc8cff] hover:bg-[#bc8cff]/10 text-[#c9d1d9]"
                >
                  View Top Courses
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <a 
            href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6914b2c1758116cf1a4ccd06/e2f3fbb59_transcript.pdf" 
            download
            target="_blank"
          >
            <Button className="bg-[#58a6ff] hover:bg-[#1f6feb] text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Transcript
            </Button>
          </a>
          <a 
            href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6914b2c1758116cf1a4ccd06/efd589cb1_ml5.pdf" 
            download
            target="_blank"
          >
            <Button className="bg-[#bc8cff] hover:bg-[#a371f7] text-white">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </a>
        </div>

        {/* Certifications */}
        <Card className="bg-[#161b22] border-[#30363d]">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
              <Award className="w-6 h-6 text-[#d2a8ff]" />
              Certifications
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-[#0d1117] rounded-lg border border-[#30363d] hover:border-[#d2a8ff] transition-colors">
                <Award className="w-5 h-5 text-[#d2a8ff] mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-[#c9d1d9]">Microsoft Azure AI Essentials</p>
                  <p className="text-sm text-[#8b949e]">Professional Certificate by Microsoft and LinkedIn</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="border-[#58a6ff]/50 text-[#58a6ff]">
                      Machine Learning
                    </Badge>
                    <Badge variant="outline" className="border-[#bc8cff]/50 text-[#bc8cff]">
                      Azure AI Studio
                    </Badge>
                    <Badge variant="outline" className="border-[#d2a8ff]/50 text-[#d2a8ff]">
                      Generative AI
                    </Badge>
                  </div>
                  <p className="text-xs text-[#7d8590] mt-2">Nov 2025 • 3h 23min</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}