import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Users, FileText, Shield, Play, Zap, Sparkles, Mic, Home, Info, Mail, Star, TrendingUp, Brain, Heart, Quote, Instagram, Facebook, Twitter, Linkedin, Github } from 'lucide-react';
import { mockStats, mockUser } from '../mock';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';

const LandingPage = ({ onLogin }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(mockUser);
    setShowAuthModal(false);
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleStartJourney = () => {
    onLogin(mockUser);
  };

  if (currentPage === 'about') {
    return <AboutPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'contact') {
    return <ContactPage onNavigate={handleNavigate} />;
  }

  const extendedStats = [
    { icon: Users, value: mockStats.activeUsers, label: "Daily Users", color: "cyan" },
    { icon: FileText, value: mockStats.pagesWritten, label: "Pages Written", color: "purple" },
    { icon: Shield, value: mockStats.encryptionRate, label: "Encrypted", color: "green" },
    { icon: Brain, value: "87%", label: "Mental Health Improvement", color: "blue" },
    { icon: Heart, value: "4.9/5", label: "User Rating", color: "pink" },
    { icon: TrendingUp, value: "92%", label: "Daily Completion Rate", color: "orange" }
  ];

  const reviews = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      content: "EchoDiary has completely transformed my journaling routine. The AI conversations feel so natural, and I love how my scattered thoughts become organized entries.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "Software Engineer",
      content: "As someone who struggled with traditional journaling, the voice-to-text feature is a game-changer. It's like having a therapy session with an AI friend.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Dr. Emily Watson",
      role: "Clinical Psychologist",
      content: "I recommend EchoDiary to my patients. The conversational approach to journaling helps them process emotions more effectively than traditional methods.",
      rating: 5,
      avatar: "EW"
    }
  ];

  const socialIcons = [
    { icon: Instagram, href: "#", color: "from-pink-500 to-purple-500" },
    { icon: Facebook, href: "#", color: "from-blue-600 to-blue-800" },
    { icon: Twitter, href: "#", color: "from-cyan-400 to-blue-500" },
    { icon: Linkedin, href: "#", color: "from-blue-500 to-blue-700" },
    { icon: Github, href: "#", color: "from-gray-600 to-gray-800" },
    { icon: Mail, href: "mailto:support@sparkco.com", color: "from-red-500 to-orange-500" }
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
            <Button variant="ghost" className="cyber-text-secondary hover:cyber-text-primary modern-font">
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Home</span>
            </Button>
            <Button variant="ghost" className="cyber-text-secondary hover:cyber-text-primary modern-font" onClick={() => setCurrentPage('about')}>
              <Info className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">About</span>
            </Button>
            <Button variant="ghost" className="cyber-text-secondary hover:cyber-text-primary modern-font" onClick={() => setCurrentPage('contact')}>
              <Mail className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Contact</span>
            </Button>
            <Button className="cyber-button-primary modern-font" onClick={() => setShowAuthModal(true)}>
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
          <h1 className="tech-font text-7xl md:text-8xl font-bold gradient-text mb-6">
            EchoDiary
          </h1>
          <p className="modern-font text-xl md:text-2xl cyber-text-secondary max-w-2xl mx-auto leading-relaxed">
            Your thoughts, captured in conversation. Remember your day, your way.
          </p>
        </div>
        
        {/* Floating elements */}
        <div className="relative">
          <div className="absolute -top-10 left-1/4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute -top-6 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch mb-16">
          
          {/* Left Section */}
          <div className="slide-in-left">
            <div className="cyber-card cyber-card-left p-8 h-full">
              <div className="space-y-8 h-full flex flex-col justify-between">
                {/* Mission Statement */}
                <div>
                  <h2 className="tech-font text-3xl font-bold cyber-text-primary mb-6 flex items-center">
                    <Sparkles className="h-8 w-8 cyber-text-neon mr-3" />
                    Your AI Companion
                  </h2>
                  <p className="modern-font text-lg cyber-text-secondary leading-relaxed">
                    EchoDiary transforms the way you journal. Speak naturally to AI, watch your thoughts 
                    become beautifully formatted entries, and rediscover the power of reflection through 
                    conversation.
                  </p>
                </div>

                {/* Demo Button */}
                <Button 
                  variant="outline" 
                  className="cyber-button-secondary modern-font w-full py-6 text-lg"
                >
                  <Play className="h-5 w-5 mr-3" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="slide-in-right space-y-6">
            {/* Video Container */}
            <div className="video-container aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-ping opacity-20"></div>
                </div>
                <p className="modern-font text-lg cyber-text-primary mb-2">
                  Interactive Demo
                </p>
                <p className="modern-font text-sm cyber-text-secondary">
                  See how EchoDiary transforms speech to beautiful journal entries
                </p>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="cyber-card cyber-card-right p-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-cyan-400">
                  <Zap className="h-6 w-6 cyber-text-neon mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="modern-font font-semibold cyber-text-primary mb-1">
                      AI-Powered Conversations
                    </h4>
                    <p className="modern-font text-sm cyber-text-secondary">
                      Natural dialogue that adapts to your style and mood
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-transparent border-l-2 border-purple-400">
                  <Sparkles className="h-6 w-6 cyber-text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="modern-font font-semibold cyber-text-primary mb-1">
                      Smart Transcription
                    </h4>
                    <p className="modern-font text-sm cyber-text-secondary">
                      Your voice becomes perfectly formatted, searchable text
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-pink-500/10 to-transparent border-l-2 border-pink-400">
                  <FileText className="h-6 w-6 text-pink-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="modern-font font-semibold cyber-text-primary mb-1">
                      Export & Share
                    </h4>
                    <p className="modern-font text-sm cyber-text-secondary">
                      Download in multiple formats or keep it private
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
                  <DialogTrigger asChild>
                    <Button 
                      className="cyber-button-primary modern-font w-full text-lg py-6 font-semibold"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      <span className="text-white">Start Your Journey</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="cyber-container max-w-md border-0 max-h-[80vh] overflow-y-auto my-8">
                    <div className="flex flex-col h-full">
                      <DialogHeader className="flex-shrink-0">
                        <DialogTitle className="tech-font text-2xl cyber-text-primary text-center mb-4">
                          {isSignUp ? (
                            <span className="gradient-text">Join EchoDiary</span>
                          ) : (
                            <span className="gradient-text">Welcome Back</span>
                          )}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="flex-1 overflow-y-auto px-1">
                        <form onSubmit={handleSubmit} className="space-y-4">
                          {isSignUp && (
                            <div>
                              <Label htmlFor="fullName" className="modern-font cyber-text-secondary mb-2 block">
                                Full Name
                              </Label>
                              <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="cyber-input modern-font"
                                required
                              />
                            </div>
                          )}
                          
                          <div>
                            <Label htmlFor="email" className="modern-font cyber-text-secondary mb-2 block">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="cyber-input modern-font"
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="password" className="modern-font cyber-text-secondary mb-2 block">
                              Password
                            </Label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              className="cyber-input modern-font"
                              required
                            />
                          </div>
                          
                          {isSignUp && (
                            <div>
                              <Label htmlFor="confirmPassword" className="modern-font cyber-text-secondary mb-2 block">
                                Confirm Password
                              </Label>
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="cyber-input modern-font"
                                required
                              />
                            </div>
                          )}
                          
                          <Button type="submit" className="cyber-button-primary modern-font w-full py-3 font-semibold">
                            <span className="text-white">
                              {isSignUp ? 'Create Account' : 'Sign In'}
                            </span>
                          </Button>
                          
                          <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="bg-slate-900 px-2 cyber-text-secondary">Or continue with</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-3">
                            <Button type="button" variant="outline" className="cyber-button-secondary text-xs py-2">
                              Google
                            </Button>
                            <Button type="button" variant="outline" className="cyber-button-secondary text-xs py-2">
                              Apple
                            </Button>
                            <Button type="button" variant="outline" className="cyber-button-secondary text-xs py-2">
                              GitHub
                            </Button>
                          </div>
                          
                          <div className="text-center pt-4">
                            <button
                              type="button"
                              onClick={toggleAuthMode}
                              className="modern-font text-sm cyber-text-neon hover:underline transition-colors"
                            >
                              {isSignUp 
                                ? 'Already have an account? Sign in' 
                                : "Don't have an account? Sign up"
                              }
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section - Moved Below */}
        <div className="text-center mb-8">
          <h2 className="tech-font text-3xl font-bold cyber-text-primary mb-4">
            Trusted by Thousands
          </h2>
          <p className="modern-font cyber-text-secondary">
            Join our growing community of mindful journalers
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {extendedStats.map((stat, index) => (
            <div key={index} className="stats-card p-6 text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-3 ${
                stat.color === 'cyan' ? 'cyber-text-neon' :
                stat.color === 'purple' ? 'cyber-text-accent' :
                stat.color === 'green' ? 'text-green-400' :
                stat.color === 'blue' ? 'text-blue-400' :
                stat.color === 'pink' ? 'text-pink-400' :
                'text-orange-400'
              }`} />
              <p className="tech-font text-xl font-bold cyber-text-primary">
                {stat.value}
              </p>
              <p className="modern-font text-xs cyber-text-secondary">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Quote className="h-6 w-6 cyber-text-neon" />
            <h2 className="tech-font text-3xl font-bold cyber-text-primary">
              Loved by Our Community
            </h2>
          </div>
          <p className="modern-font cyber-text-secondary">
            See what our users are saying about their journaling journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="cyber-card p-6 fade-in">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                  <span className="tech-font font-bold text-white text-sm">{review.avatar}</span>
                </div>
                <div>
                  <h4 className="modern-font font-semibold cyber-text-primary">{review.name}</h4>
                  <p className="modern-font text-sm cyber-text-secondary">{review.role}</p>
                </div>
              </div>
              
              <div className="flex space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="modern-font cyber-text-secondary leading-relaxed">
                "{review.content}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-gradient-to-r from-slate-900/50 to-purple-900/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Left: Copyright */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="modern-font text-sm cyber-text-secondary">
                © 2025 SparkCo. All rights reserved.
              </div>
            </div>

            {/* Center: Email */}
            <div className="modern-font text-sm cyber-text-secondary">
              <Mail className="h-4 w-4 inline mr-2" />
              Support@SparkCo.com
            </div>

            {/* Right: Social Media */}
            <div className="flex items-center space-x-3">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-8 h-8 rounded-lg bg-gradient-to-r ${social.color} flex items-center justify-center hover:scale-110 transition-transform duration-300`}
                >
                  <social.icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;