import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ scrollToSection, refs }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', ref: null },
    { name: 'About', ref: refs.aboutRef },
    { name: 'Education', ref: refs.educationRef },
    { name: 'Experience', ref: refs.experienceRef },
    { name: 'Publications', ref: refs.papersRef },
    { name: 'Projects', ref: refs.projectsRef },
    { name: 'Top Courses', ref: refs.topCoursesRef },
    { name: 'Beyond the Code', ref: refs.extracurricularRef },
    { name: 'Contact', ref: refs.contactRef },
  ];

  const handleClick = (ref) => {
    if (ref === null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToSection(ref);
    }
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d]' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => handleClick(null)}
            className="text-xl font-bold bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Mugunthan Kesavan
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleClick(item.ref)}
                className="text-[#8b949e] hover:text-[#58a6ff] transition-colors text-sm font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#8b949e] hover:text-[#58a6ff] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-[#30363d] pt-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleClick(item.ref)}
                className="block w-full text-left text-[#8b949e] hover:text-[#58a6ff] transition-colors text-sm font-medium py-2"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}