import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from 'lucide-react';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 bg-[#010409] relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-1 w-12 bg-gradient-to-r from-[#238636] to-[#58a6ff] rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#c9d1d9]">Experience</h2>
          <Briefcase className="w-6 h-6 text-[#238636]" />
        </div>

        <Card className="bg-[#161b22] border-[#30363d] hover:border-[#238636] transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-[#c9d1d9]">Research Intern</h3>
                <p className="text-lg text-[#8b949e]">Flame University</p>
              </div>
              <Badge className="bg-[#238636]/20 text-green-300 border-green-500/50 mt-2 md:mt-0">
                Jan 2025 – Jul 2025
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="min-w-[6px] w-1.5 h-1.5 rounded-full bg-[#58a6ff] mt-2" />
                <p className="text-[#8b949e] leading-relaxed">
                  Optimized predictive ML models on <span className="text-[#58a6ff] font-semibold">30K+ sequences</span> using 
                  <span className="text-[#bc8cff]"> transformer-based embeddings</span> and SVM, achieving 
                  <span className="text-green-400 font-semibold"> 98.3% accuracy</span> and 
                  <span className="text-green-400 font-semibold"> 98% F1-score</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="min-w-[6px] w-1.5 h-1.5 rounded-full bg-[#58a6ff] mt-2" />
                <p className="text-[#8b949e] leading-relaxed">
                  Developed <span className="text-[#d2a8ff] font-semibold">Python/Pandas/NumPy</span> ingestion and preprocessing scripts 
                  to automate dataset generation, reducing manual effort by <span className="text-green-400 font-semibold">50%</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="min-w-[6px] w-1.5 h-1.5 rounded-full bg-[#58a6ff] mt-2" />
                <p className="text-[#8b949e] leading-relaxed">
                  Explored distributed ML workflows using <span className="text-[#58a6ff] font-semibold">Hadoop and Spark</span> for 
                  scalable feature extraction and model training across large-scale biological datasets
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="min-w-[6px] w-1.5 h-1.5 rounded-full bg-[#58a6ff] mt-2" />
                <p className="text-[#8b949e] leading-relaxed">
                  Applied <span className="text-[#bc8cff] font-semibold">unsupervised clustering</span> and feature selection techniques 
                  to identify key attributes, improving dataset quality for downstream prediction tasks
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="min-w-[6px] w-1.5 h-1.5 rounded-full bg-[#58a6ff] mt-2" />
                <p className="text-[#8b949e] leading-relaxed">
                  Conducted <span className="text-[#d2a8ff] font-semibold">10-fold cross-validation with Grid Search</span> for 
                  systematic model tuning and experiment reproducibility, ensuring robust model performance
                </p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#30363d]">
              {['Python', 'Pandas', 'NumPy', 'SVM', 'Transformers', 'Hadoop', 'Spark', 'Grid Search', 'ML Pipelines'].map((tech, i) => (
                <Badge 
                  key={i}
                  variant="outline" 
                  className="border-[#58a6ff]/50 text-[#58a6ff]"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leadership */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card className="bg-[#161b22] border-[#30363d] hover:border-[#58a6ff] transition-colors">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[#58a6ff] mb-2">70+</div>
              <p className="text-[#8b949e]">Led workshops on Python, ML, and Model Optimization</p>
            </CardContent>
          </Card>
          <Card className="bg-[#161b22] border-[#30363d] hover:border-[#bc8cff] transition-colors">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[#bc8cff] mb-2">10+</div>
              <p className="text-[#8b949e]">Mentored juniors on end-to-end AI projects</p>
            </CardContent>
          </Card>
          <Card className="bg-[#161b22] border-[#30363d] hover:border-[#d2a8ff] transition-colors">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-[#d2a8ff] mb-2">Top 20%</div>
              <p className="text-[#8b949e]">Kaggle ML Competitions Ranking</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}