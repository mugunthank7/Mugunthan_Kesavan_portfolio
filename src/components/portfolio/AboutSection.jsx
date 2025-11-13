import React from 'react';
import { Sparkles, GraduationCap } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section 
      className="py-20 px-6 bg-[#0d1117] relative overflow-hidden"
      style={{
        backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6914b2c1758116cf1a4ccd06/656bc1125_IMG_60463.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-[#0d1117]/90 backdrop-blur-sm" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-1 w-12 bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
          <Sparkles className="w-6 h-6 text-[#58a6ff] animate-pulse" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Currently Pursuing Card */}
          <Card className="bg-[#161b22]/90 backdrop-blur-md border-[#30363d] hover:border-[#58a6ff] transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#58a6ff]/20 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-[#58a6ff]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Currently Pursuing</h3>
                  <p className="text-sm text-[#8b949e]">Expected May 2027</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6914b2c1758116cf1a4ccd06/a496b535c_uh_red.png"
                    alt="University of Houston"
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <p className="font-semibold text-[#c9d1d9]">Master of Science</p>
                    <p className="text-sm text-[#8b949e]">Engineering Data Science</p>
                    <p className="text-sm text-[#7d8590]">University of Houston</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Text */}
          <div className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-[#c9d1d9] leading-relaxed">
                I'm currently pursuing my <span className="text-[#58a6ff] font-semibold">Master's in Engineering Data Science</span> at 
                the University of Houston, building upon a strong foundation from my undergraduate studies in AI Engineering.
              </p>
              <p className="text-lg text-[#8b949e] leading-relaxed">
                My expertise spans developing <span className="text-[#bc8cff] font-semibold">end-to-end AI systems</span> using Python, 
                Scala, Hadoop, and Spark. I'm passionate about applying AI-driven methods to solve real-world challenges through 
                scalable, research-based approaches.
              </p>
              <p className="text-lg text-[#8b949e] leading-relaxed">
                With experience in deep learning model training, distributed data processing, and model evaluation, I strive to 
                push the boundaries of what's possible with artificial intelligence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-[#161b22]/90 backdrop-blur-md rounded-lg border border-[#30363d]">
                <div className="text-2xl font-bold text-[#58a6ff] mb-1">3.7/4.0</div>
                <div className="text-sm text-[#7d8590]">Undergraduate GPA</div>
              </div>
              <div className="p-4 bg-[#161b22]/90 backdrop-blur-md rounded-lg border border-[#30363d]">
                <div className="text-2xl font-bold text-[#bc8cff] mb-1">166</div>
                <div className="text-sm text-[#7d8590]">Credits Earned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}