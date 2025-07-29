import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  Home, 
  Info, 
  Mail, 
  Mic, 
  Sparkles, 
  Heart,
  Brain,
  Search,
  BookOpen,
  Shield,
  CreditCard,
  Users,
  Headphones,
  MessageCircle,
  FileText,
  Lock,
  Star,
  CheckCircle
} from 'lucide-react';

const AboutPage = ({ onNavigate, onAuth }) => {
  const features = [
    {
      icon: Mic,
      title: "Voice-First Daily Journaling",
      description: "Transform daily journaling from a chore into an effortless conversation. Our AI companion will vocally guide you through questions about your day, thoughts, and feelings - just like talking to a caring friend who remembers everything.",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: Heart,
      title: "Automatic Gratitude Journaling", 
      description: "Our AI naturally identifies moments of gratitude in your conversations and creates beautiful gratitude journal entries. Build a daily gratitude practice without extra effort.",
      gradient: "from-pink-400 to-red-500"
    },
    {
      icon: Brain,
      title: "Mental Health & Wellness Support",
      description: "Designed for journaling for mental health. Track emotional patterns, process difficult thoughts, and build resilience through guided self-reflection conversations.",
      gradient: "from-purple-400 to-indigo-500"
    },
    {
      icon: Search,
      title: "Self-Discovery Through Reflection",
      description: "Become your own self-discovery journal. Our AI asks thoughtful questions that help you understand yourself better, identify patterns, and unlock personal insights.",
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      icon: BookOpen,
      title: "Beautiful Digital Journal",
      description: "Your conversations become stunning handwritten-style journal entries. Get all the benefits of traditional journaling with the convenience of modern online journaling.",
      gradient: "from-orange-400 to-yellow-500"
    },
    {
      icon: Lock,
      title: "Private Reflection Space",
      description: "Your most personal thoughts deserve complete privacy. Secure, encrypted, and private - create your safe space for honest self-reflection and emotional processing.",
      gradient: "from-slate-400 to-gray-500"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Start Talking",
      description: "Open EchoDiary and our AI companion begins an interactive voice conversation, asking you personalized questions about your day and guiding the discussion naturally.",
      icon: MessageCircle
    },
    {
      step: "2", 
      title: "AI Engages & Listens",
      description: "Experience a real conversation - our AI responds to your answers, asks follow-up questions, and adapts to your mood and topics, just like talking to an understanding friend.",
      icon: Brain
    },
    {
      step: "3",
      title: "Reflect & Review",
      description: "Access your organized thoughts anytime. Review patterns, export entries, and continue your growth journey.",
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen relative z-10">
      {/* Header Navigation */}
      <nav className="relative z-20 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: SparkCo Branding */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="tech-font text-2xl font-bold gradient-text">SparkCo</h1>
              <p className="modern-font text-xs cyber-text-secondary">Empowering Futures</p>
            </div>
          </div>

          {/* Right: Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="cyber-text-secondary hover:cyber-text-primary modern-font" onClick={() => onNavigate('home')}>
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Home</span>
            </Button>
            <Button variant="ghost" className="cyber-text-neon modern-font">
              <Info className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">About</span>
            </Button>
            <Button variant="ghost" className="cyber-text-secondary hover:cyber-text-primary modern-font" onClick={() => onNavigate('contact')}>
              <Mail className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Contact</span>
            </Button>
            <Button className="cyber-button-primary modern-font" onClick={() => onNavigate('home')}>
              <Mic className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Start Journaling</span>
              <span className="md:hidden">Start</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center pt-16 pb-12 fade-in">
        <div className="mb-8">
          <h1 className="tech-font text-6xl md:text-7xl font-bold gradient-text mb-6">
            About EchoDiary
          </h1>
          <p className="modern-font text-xl md:text-2xl cyber-text-secondary max-w-3xl mx-auto leading-relaxed">
            Revolutionizing personal reflection through AI-powered conversational journaling. 
            Discover yourself through natural dialogue and unlock the power of daily reflection.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <CheckCircle className="h-6 w-6 cyber-text-neon" />
            <h2 className="tech-font text-3xl font-bold cyber-text-primary">
              How It Works
            </h2>
          </div>
          <p className="modern-font cyber-text-secondary text-lg">
            Three simple steps to transform your journaling experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {howItWorks.map((item, index) => (
            <div key={index} className="text-center">
              <div className="cyber-card p-8 h-full">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className="mb-4">
                  <span className="tech-font text-4xl font-bold gradient-text">{item.step}</span>
                </div>
                <h3 className="tech-font text-xl font-bold cyber-text-primary mb-4">
                  {item.title}
                </h3>
                <p className="modern-font cyber-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Star className="h-6 w-6 cyber-text-accent" />
            <h2 className="tech-font text-3xl font-bold cyber-text-primary">
              Powerful Features
            </h2>
          </div>
          <p className="modern-font cyber-text-secondary text-lg">
            Everything you need for meaningful self-reflection and growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="cyber-card p-8 fade-in">
              <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="tech-font text-xl font-bold cyber-text-primary mb-4">
                {feature.title}
              </h3>
              <p className="modern-font cyber-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Support & Payment Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="cyber-card p-8 text-center">
            <Headphones className="h-12 w-12 mx-auto mb-4 cyber-text-neon" />
            <h3 className="tech-font text-xl font-bold cyber-text-primary mb-4">
              24/7 Customer Support
            </h3>
            <p className="modern-font cyber-text-secondary mb-4">
              Our dedicated support team is here to help you every step of your journaling journey.
            </p>
            <Button variant="outline" className="cyber-button-secondary">
              Get Support
            </Button>
          </div>

          <div className="cyber-card p-8 text-center">
            <CreditCard className="h-12 w-12 mx-auto mb-4 cyber-text-accent" />
            <h3 className="tech-font text-xl font-bold cyber-text-primary mb-4">
              Flexible Payments
            </h3>
            <p className="modern-font cyber-text-secondary mb-4">
              Multiple payment options, cancel anytime. Start free, upgrade when you're ready.
            </p>
            <Button variant="outline" className="cyber-button-secondary">
              View Plans
            </Button>
          </div>

          <div className="cyber-card p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-green-400" />
            <h3 className="tech-font text-xl font-bold cyber-text-primary mb-4">
              Growing Community
            </h3>
            <p className="modern-font cyber-text-secondary mb-4">
              Join thousands of users transforming their lives through mindful reflection.
            </p>
            <Button variant="outline" className="cyber-button-secondary">
              Join Now
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="cyber-card p-12">
          <h2 className="tech-font text-3xl font-bold gradient-text mb-6">
            Ready to Transform Your Journaling?
          </h2>
          <p className="modern-font text-lg cyber-text-secondary mb-8">
            Start your journey of self-discovery today with interactive AI conversations. No credit card required.
          </p>
          <Button className="cyber-button-primary modern-font text-lg px-8 py-4" onClick={() => setCurrentPage('auth')}>
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-white">Start Your Interactive Journey</span>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-gradient-to-r from-slate-900/50 to-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="modern-font text-sm cyber-text-secondary">
                © 2025 SparkCo. All rights reserved.
              </div>
            </div>
            <div className="modern-font text-sm cyber-text-secondary">
              <Mail className="h-4 w-4 inline mr-2" />
              Support@SparkCo.com
            </div>
            <div className="flex items-center space-x-3">
              {/* Social icons would go here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;