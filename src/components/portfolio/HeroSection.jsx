import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Instagram, ChevronDown, Download } from 'lucide-react';

export default function HeroSection({ scrollToEducation }) {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1117] pt-20"
    >
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: 'linear-gradient(rgba(88, 166, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(88, 166, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating Code Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['{ }', '[ ]', '< />', 'fn()', 'import', 'const'].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-[#388bfd] opacity-5 font-mono text-sm animate-float"
            style={{
              left: `${i * 18}%`,
              top: `${(i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${10 + i * 2}s`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative order-2 md:order-1">
            <div className="relative group">
              {/* Floating animation wrapper */}
              <div className="animate-subtle-float">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#58a6ff] to-[#bc8cff] rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
                
                {/* Circular image with fade */}
                <div className="relative w-80 h-80 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-[#0d1117] opacity-40" />
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6914b2c1758116cf1a4ccd06/e29becde9_image.png"
                    alt="Mugunthan Kesavan"
                    className="w-full h-full object-cover rounded-full border-4 border-[#30363d] group-hover:border-[#58a6ff] transition-colors shadow-2xl"
                    style={{
                      maskImage: 'radial-gradient(circle, black 60%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="space-y-6 order-1 md:order-2">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] backdrop-blur-sm rounded-full border border-[#30363d]">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-[#c9d1d9]">Open to Opportunities</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#58a6ff] via-[#bc8cff] to-[#d2a8ff] bg-clip-text text-transparent">
                Mugunthan Kesavan
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-[#c9d1d9] font-light">
              Data Science Graduate Student & AI Engineer
            </p>

            <p className="text-lg text-[#8b949e] leading-relaxed max-w-xl">
              Pursuing MS in Engineering Data Science at University of Houston. Passionate about Machine Learning, 
              Deep Learning, and Big Data Analytics.
            </p>

            {/* Stats - Above Socials */}
            <div className="flex gap-8 pt-2">
              <div>
                <div className="text-3xl font-bold text-[#58a6ff]">3+</div>
                <div className="text-sm text-[#7d8590]">Publications</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#bc8cff]">15+</div>
                <div className="text-sm text-[#7d8590]">Projects</div>
              </div>
            </div>

            {/* Social Links - Icons Only */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a 
                href="mailto:mkesavan@cougarnet.uh.edu"
                className="p-3 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] transition-all hover:scale-110 shadow-lg"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/mugunthankesavan" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-all hover:scale-110"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/mugunthank7" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#171515] text-white rounded-lg hover:bg-black transition-all hover:scale-110"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com/mugunthan" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white rounded-lg hover:opacity-90 transition-all hover:scale-110"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
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
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToEducation}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#58a6ff] animate-bounce hover:text-[#79c0ff] transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </button>

      <style jsx>{`
        @keyframes subtle-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-subtle-float {
          animation: subtle-float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}