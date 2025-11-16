import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Github, ExternalLink } from 'lucide-react';

const projects = {
  ml: [
    {
      title: "Sales Data Analytics with Hadoop and Spark",
      description: "Designed and implemented a distributed data processing pipeline using Hadoop MapReduce and Apache Spark to analyze 15M+ transaction records",
      points: [
        "Executed large-scale data ingestion, transformation, and feature extraction workflows for ML readiness",
        "Applied Spark MLlib for classification and clustering, achieving a 40% reduction in computation time compared to serial processing"
      ],
      tags: ["Hadoop", "Spark", "MapReduce", "Big Data", "MLlib", "Data Engineering", "PowerBI"],
      github: "https://github.com/mugunthank7/Insightful-Sales-Dashboard-PowerBI"
    },
    {
      title: "Identifying Pore-Forming Proteins with Machine Learning",
      description: "Processed 30K+ protein records using ProtBERT/ESM2 embeddings and clustering for structural pattern discovery",
      points: [
        "Benchmarked Random Forest, XGBoost, SVM, achieving 10% higher accuracy vs. baselines",
        "Documented model comparisons and feature importance analysis"
      ],
      tags: ["ProtBERT", "ESM2", "XGBoost", "SVM", "Clustering"],
      github: "https://github.com/mugunthank7/Pore-forming-proteins"
    },
    {
      title: "Protein Methyl Transfer Identification",
      description: "Implementing hybrid pipelines combining embedding-based and physicochemical features for protein analysis",
      points: [
        "Evaluating SVM, Random Forest, and XGBoost under cross-validation to assess predictive robustness",
        "Combining transformer embeddings with domain-specific features"
      ],
      tags: ["SVM", "Random Forest", "XGBoost", "Feature Engineering"],
      github: "#"
    }
  ],
  nlp: [
    {
      title: "Humor Detection in Telugu Social Media",
      description: "Applied IndicBERT, LABSE, and MURIL embeddings for multilingual humor detection in social media data",
      points: [
        "Published work on Humor Detection in Telugu Social Media Text Using Cost-Sensitive Learning",
        "Implemented cost-sensitive learning to handle class imbalance"
      ],
      tags: ["IndicBERT", "LABSE", "MURIL", "NLP", "Social Media"],
      github: "https://link.springer.com/chapter/10.1007/978-981-97-8836-1_5",
      paper: "https://link.springer.com/chapter/10.1007/978-981-97-8836-1_5"
    },
    {
      title: "Speech to Speech Translation for Tamil Sentiment Analysis",
      description: "Created Tamil sentiment corpus via scraping, cleaning, and manual annotation , built speech to speech translation pipeline using pre-trained models",
      points: [
        "Developed a pipeline for speech-to-speech translation leveraging text-to-speech and speech-to-text models",
        "Facilitated multilingual communication by translating Tamil speech inputs to Telugu speech outputs"
      ],
      tags: ["Transformers", "text-to-speech", "Tamil", "translation"],
      github: "https://github.com/mugunthank7/Tamil-to-Telugu-Speech-to-Speech-Translation-for-Multilingual-Communication"
    }
  ],
  cv: [
    {
      title: "Enhanced Segmented Neural Style Transfer",
      description: "Real-time video stylization using segmentation-based neural style transfer with temporal coherence",
      points: [
        "Applies different artistic styles to distinct regions using semantic segmentation",
        "Incorporates temporal loss function for frame coherence and smooth transitions",
        "Real-time performance tracking with TensorBoard"
      ],
      tags: ["PyTorch", "Computer Vision", "Style Transfer", "Video Processing"],
      github: "https://github.com/mugunthank7/Enhanced-Segmented-Neural-Style-Transfer-for-Real-Time-Video-Stylization",
      image: "https://github.com/mugunthank7/Enhanced-Segmented-Neural-Style-Transfer-for-Real-Time-Video-Stylization/blob/main/results/foreground-gif.gif?raw=true"
    }
  ]
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6 bg-[#0d1117] relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-1 w-12 bg-gradient-to-r from-[#f778ba] to-[#bc8cff] rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#c9d1d9]">Featured Projects</h2>
          <Code className="w-6 h-6 text-[#f778ba]" />
        </div>

        <Tabs defaultValue="cv" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#161b22] border border-[#30363d] mb-8">
            <TabsTrigger 
              value="cv" 
              className="data-[state=active]:bg-[#58a6ff]/20 data-[state=active]:text-[#58a6ff]"
            >
              Computer Vision
            </TabsTrigger>
            <TabsTrigger 
              value="ml" 
              className="data-[state=active]:bg-[#bc8cff]/20 data-[state=active]:text-[#bc8cff]"
            >
              Machine Learning
            </TabsTrigger>
            <TabsTrigger 
              value="nlp" 
              className="data-[state=active]:bg-[#d2a8ff]/20 data-[state=active]:text-[#d2a8ff]"
            >
              NLP
            </TabsTrigger>
          </TabsList>

          {Object.entries(projects).map(([key, projectList]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              {projectList.map((project, index) => (
                <Card 
                  key={index}
                  className="bg-[#161b22] border-[#30363d] hover:border-[#58a6ff] transition-all duration-300 group overflow-hidden"
                >
                  {project.image && (
                    <div className="h-64 overflow-hidden bg-[#0d1117]">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#58a6ff] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#8b949e] mb-4 leading-relaxed">{project.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {project.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="min-w-[6px] w-1.5 h-1.5 rounded-full bg-[#58a6ff] mt-2" />
                          <span className="text-[#8b949e] text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, idx) => (
                        <Badge 
                          key={idx}
                          variant="outline" 
                          className="border-[#58a6ff]/50 text-[#58a6ff]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-[#30363d] hover:border-[#58a6ff] hover:bg-[#58a6ff]/10"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            View Code
                          </Button>
                        </a>
                      )}
                      {project.paper && (
                        <a href={project.paper} target="_blank" rel="noopener noreferrer">
                          <Button 
                            size="sm" 
                            className="bg-[#58a6ff] hover:bg-[#1f6feb]"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Read Paper
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}