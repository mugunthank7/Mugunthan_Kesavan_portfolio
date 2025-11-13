import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = {
  ml: [
    {
      title: "AI Chatbot with NLP",
      description: "Built an intelligent chatbot using transformer models and deployed on Azure AI Studio",
      tags: ["Python", "Transformers", "Azure", "NLP"],
      github: "#",
      demo: "#"
    },
    {
      title: "Image Classification System",
      description: "Deep learning model for multi-class image classification with 95% accuracy",
      tags: ["TensorFlow", "CNN", "Python"],
      github: "#",
      demo: "#"
    }
  ],
  web: [
    {
      title: "Full Stack E-Commerce Platform",
      description: "Responsive e-commerce application with payment integration and admin dashboard",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "#",
      demo: "#"
    },
    {
      title: "Real-time Chat Application",
      description: "WebSocket-based chat app with room management and file sharing",
      tags: ["React", "Socket.io", "Express"],
      github: "#",
      demo: "#"
    }
  ],
  cloud: [
    {
      title: "Serverless API on Azure",
      description: "Built scalable REST API using Azure Functions and Cosmos DB",
      tags: ["Azure", "Functions", "CosmosDB"],
      github: "#",
      demo: "#"
    },
    {
      title: "Cloud Infrastructure Automation",
      description: "Automated cloud deployment using Terraform and CI/CD pipelines",
      tags: ["Azure", "Terraform", "DevOps"],
      github: "#",
      demo: "#"
    }
  ],
  other: [
    {
      title: "IoT Weather Station",
      description: "Arduino-based weather monitoring system with real-time data visualization",
      tags: ["Arduino", "IoT", "Python"],
      github: "#",
      demo: "#"
    }
  ]
};

export default function ProjectTabs() {
  return (
    <Tabs defaultValue="ml" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-md border border-white/10 mb-8">
        <TabsTrigger value="ml" className="data-[state=active]:bg-blue-500/20">
          Machine Learning
        </TabsTrigger>
        <TabsTrigger value="web" className="data-[state=active]:bg-purple-500/20">
          Web Development
        </TabsTrigger>
        <TabsTrigger value="cloud" className="data-[state=active]:bg-green-500/20">
          Cloud & DevOps
        </TabsTrigger>
        <TabsTrigger value="other" className="data-[state=active]:bg-orange-500/20">
          Other
        </TabsTrigger>
      </TabsList>

      {Object.entries(projects).map(([key, projectList]) => (
        <TabsContent key={key} value={key} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {projectList.map((project, index) => (
              <Card 
                key={index}
                className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <Badge 
                        key={idx}
                        variant="outline" 
                        className="border-blue-500/50 text-blue-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a href={project.github} target="_blank">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-white/20 hover:bg-white/10"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </a>
                    <a href={project.demo} target="_blank">
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}