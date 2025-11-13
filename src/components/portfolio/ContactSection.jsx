import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram } from 'lucide-react';

export default function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Message sent! (This is a demo)');
  };

  return (
    <section id="contact" className="py-20 px-6 bg-[#0d1117] relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-1 w-12 bg-gradient-to-r from-[#238636] to-[#58a6ff] rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#c9d1d9]">Let's Connect</h2>
          <Mail className="w-6 h-6 text-[#238636]" />
        </div>

        <div className="text-center mb-12">
          <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
            I'm always open to discussing new projects, opportunities, or collaborations in AI and Data Science
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#c9d1d9] mb-6">Get in Touch</h3>
            
            <Card className="bg-[#161b22] border-[#30363d] hover:border-[#238636] transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#238636]/20 rounded-lg">
                    <Mail className="w-6 h-6 text-[#238636]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#c9d1d9] mb-1">Email</p>
                    <a 
                      href="mailto:mkesavan@cougarnet.uh.edu"
                      className="text-[#58a6ff] hover:underline"
                    >
                      mkesavan@cougarnet.uh.edu
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#161b22] border-[#30363d] hover:border-[#58a6ff] transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#58a6ff]/20 rounded-lg">
                    <Phone className="w-6 h-6 text-[#58a6ff]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#c9d1d9] mb-1">Phone</p>
                    <a 
                      href="tel:3462041541"
                      className="text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                    >
                      (346) 204-1541
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#161b22] border-[#30363d] hover:border-[#bc8cff] transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#bc8cff]/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#bc8cff]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#c9d1d9] mb-1">Location</p>
                    <p className="text-[#8b949e]">Houston, TX</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-sm text-[#7d8590] mb-4">Connect on social media</p>
              <div className="flex gap-3">
                <a 
                  href="https://linkedin.com/in/mugunthankesavan" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                </a>
                <a 
                  href="https://github.com/mugunthank7" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#171515] hover:bg-[#171515]/10 transition-colors"
                >
                  <Github className="w-5 h-5 text-[#c9d1d9]" />
                </a>
                <a 
                  href="https://instagram.com/mugunthan" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-pink-500 hover:bg-pink-500/10 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-pink-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-[#161b22] border-[#30363d]">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-[#c9d1d9] mb-6">Quick Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] focus:border-[#58a6ff]"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] focus:border-[#58a6ff]"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Message"
                    rows={5}
                    className="bg-[#0d1117] border-[#30363d] text-[#c9d1d9] focus:border-[#58a6ff] resize-none"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-[#238636] hover:bg-[#2ea043] text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Current Status */}
        <Card className="mt-12 bg-[#161b22] border-[#30363d]">
          <CardContent className="p-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#238636]/20 rounded-full border border-[#238636]/50 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-green-300">Currently Open to Opportunities</span>
            </div>
            <p className="text-[#8b949e]">
              Pursuing MS in Engineering Data Science at University of Houston
            </p>
            <p className="text-sm text-[#7d8590] mt-1">
              Expected Graduation: May 2027
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}