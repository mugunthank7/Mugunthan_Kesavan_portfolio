import React, { useState, useRef, useEffect } from 'react'

import AboutSection from './AboutSection.jsx';
import ContactSection from './ContactSection.jsx';
import CursorEffect from './CursorEffect.jsx';
import EducationSection from './EducationSection.jsx';
import ExperienceSection from './ExperienceSection.jsx';
import ExtracurricularSection from './ExtracurricularSection.jsx';
import FloatingEmojis from './FloatingEmojis.jsx';
import HeroSection from './HeroSection.jsx';
import Navbar from './Navbar.jsx';
import ProjectsSection from './ProjectsSection.jsx';
import ProjectTabs from './ProjectTabs.jsx';
import PublicationsSection from './PublicationsSection.jsx';
import SkillsSection from './SkillsSection.jsx';
import TopCoursesSection from './TopCoursesSection.jsx';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const papersRef = useRef(null);
  const projectsRef = useRef(null);
  const topCoursesRef = useRef(null);
  const extracurricularRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const refs = {
    aboutRef,
    educationRef,
    experienceRef,
    papersRef,
    projectsRef,
    topCoursesRef,
    extracurricularRef,
    skillsRef,
    contactRef
  };

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden">
      {/* Cursor Effect */}
      <div
        className="fixed pointer-events-none z-40 transition-all duration-300 ease-out hidden md:block"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-96 h-96 bg-[#388bfd]/10 rounded-full blur-3xl" />
      </div>

      <div 
        className="fixed inset-0 pointer-events-none opacity-30 hidden md:block"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(56, 139, 253, 0.15), transparent 50%)`,
        }}
      />

      {/* Navigation Bar */}
      <Navbar scrollToSection={scrollToSection} refs={refs} />

      {/* Hero Section */}
      <HeroSection 
        scrollToEducation={() => scrollToSection(educationRef)}
      />

      {/* About Section */}
      <div ref={aboutRef}>
        <AboutSection />
      </div>

      {/* Education Section */}
      <div ref={educationRef}>
        <EducationSection scrollToTopCourses={() => scrollToSection(topCoursesRef)} />
      </div>

      {/* Experience Section */}
      <div ref={experienceRef}>
        <ExperienceSection />
      </div>

      {/* Publications Section */}
      <div ref={papersRef}>
        <PublicationsSection />
      </div>

      {/* Projects Section */}
      <div ref={projectsRef}>
        <ProjectsSection />
      </div>

      {/* Top Courses Section */}
      <div ref={topCoursesRef}>
        <TopCoursesSection />
      </div>

      {/* Extracurricular Section */}
      <div ref={extracurricularRef}>
        <ExtracurricularSection />
      </div>

      {/* Skills Section */}
      <div ref={skillsRef}>
        <SkillsSection />
      </div>

      {/* Contact Section */}
      <div ref={contactRef}>
        <ContactSection />
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#30363d] bg-[#0d1117]">
        <div className="max-w-6xl mx-auto text-center text-[#7d8590]">
          <p className="text-[#8b949e]">© 2025 Mugunthan Kesavan. All rights reserved.</p>
          <p className="mt-2 text-sm text-[#7d8590]">Built with React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}