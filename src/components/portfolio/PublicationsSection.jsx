import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Award } from 'lucide-react';

const publications = [
  {
    title: "Humor Detection in Telugu Social Media Text Using Cost-Sensitive Learning and Indian Language Embeddings",
    authors: "Rupa, N. B., Hima, Y., Mugunthan, K., & Premjith, B.",
    venue: "Proceedings of ICRTC 2024, Springer LNNS 885",
    year: "2025",
    status: "Published",
    link: "https://link.springer.com/chapter/10.1007/978-981-97-8836-1_5",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6914b2c1758116cf1a4ccd06/bd2aead19_CertificateOfCompletion_MicrosoftAzureAIEssentialsProfessionalCertificatebyMicrosoftandLinkedIn.pdf",
    tags: ["NLP", "Social Media", "Telugu", "Cost-Sensitive Learning"]
  },
  {
    title: "Pretrained Models for Zero-Shot Classification and Supervised Learning: A Simulation Study for Tamil Tweet Sentiment Analysis",
    authors: "Mugunthan, K., Jain, R., & Jayaraman, V. K.",
    venue: "6th International Conference on Data Science and Applications",
    year: "2025",
    status: "Accepted (Forthcoming)",
    link: "#",
    image: "https://via.placeholder.com/400x250/161b22/58a6ff?text=Tamil+Sentiment+Analysis",
    tags: ["Sentiment Analysis", "Tamil", "Zero-Shot Learning", "Transformers"]
  },
  {
    title: "Machine Learning Framework for the Prediction of Pore-Forming Proteins",
    authors: "Mugunthan, K., et al.",
    venue: "Springer",
    year: "2025",
    status: "Accepted (In Press)",
    link: "#",
    image: "https://via.placeholder.com/400x250/161b22/bc8cff?text=Protein+Prediction+ML",
    tags: ["Bioinformatics", "Machine Learning", "Protein Analysis"]
  }
];

export default function PublicationsSection() {
  return (
    <section id="publications" className="py-20 px-6 bg-[#010409] relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-1 w-12 bg-gradient-to-r from-[#f778ba] to-[#bc8cff] rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#c9d1d9]">Published Papers</h2>
          <FileText className="w-6 h-6 text-[#f778ba]" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((paper, index) => (
            <Card 
              key={index}
              className="bg-[#161b22] border-[#30363d] hover:border-[#f778ba] transition-all duration-300 hover:scale-[1.02] group overflow-hidden"
            >
              {/* Paper Preview/Screenshot */}
              <div className="h-48 bg-gradient-to-br from-[#58a6ff]/10 to-[#bc8cff]/10 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-[#0d1117]/80 group-hover:bg-[#0d1117]/60 transition-colors" />
                <FileText className="w-16 h-16 text-[#f778ba] relative z-10" />
                <Badge 
                  className={`absolute top-4 right-4 z-10 ${
                    paper.status === "Published" 
                      ? 'bg-green-500/20 text-green-300 border-green-500/50' 
                      : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                  }`}
                >
                  {paper.status}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3 text-[#c9d1d9] group-hover:text-[#f778ba] transition-colors leading-tight">
                  {paper.title}
                </h3>
                
                <p className="text-sm text-[#7d8590] mb-2">
                  {paper.authors}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-[#bc8cff]" />
                  <p className="text-sm text-[#8b949e]">{paper.venue}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {paper.tags.map((tag, idx) => (
                    <Badge 
                      key={idx}
                      variant="outline" 
                      className="border-[#f778ba]/50 text-[#f778ba] text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#30363d]">
                  <span className="text-sm text-[#7d8590]">{paper.year}</span>
                  {paper.link !== "#" && (
                    <a href={paper.link} target="_blank" rel="noopener noreferrer">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-[#30363d] hover:bg-[#f778ba]/10 hover:border-[#f778ba]"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-[#161b22] border-[#30363d] hover:border-[#58a6ff] transition-colors">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#58a6ff] to-[#bc8cff] bg-clip-text text-transparent mb-2">
                3+
              </div>
              <div className="text-sm text-[#7d8590]">Research Publications</div>
            </CardContent>
          </Card>
          <Card className="bg-[#161b22] border-[#30363d] hover:border-[#bc8cff] transition-colors">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-[#bc8cff] mb-2">
                2
              </div>
              <div className="text-sm text-[#7d8590]">Conferences</div>
            </CardContent>
          </Card>
          <Card className="bg-[#161b22] border-[#30363d] hover:border-[#f778ba] transition-colors">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-[#f778ba] mb-2">
                Springer
              </div>
              <div className="text-sm text-[#7d8590]">Publisher</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}