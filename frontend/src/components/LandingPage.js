import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Users, FileText, Shield, Play, Zap, Sparkles, Mic } from 'lucide-react';
import { mockStats, mockUser } from '../mock';

const LandingPage = ({ onLogin }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

  return (
    <div className="min-h-screen relative z-10">
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
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Section */}
          <div className="slide-in-left space-y-8">
            <div className="cyber-card p-8">
              <div className="space-y-8">
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

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="stats-card p-6 text-center">
                    <Users className="h-8 w-8 cyber-text-neon mx-auto mb-3" />
                    <p className="tech-font text-2xl font-bold cyber-text-primary">
                      {mockStats.activeUsers}
                    </p>
                    <p className="modern-font text-sm cyber-text-secondary">
                      Daily Users
                    </p>
                  </div>

                  <div className="stats-card p-6 text-center">
                    <FileText className="h-8 w-8 cyber-text-accent mx-auto mb-3" />
                    <p className="tech-font text-2xl font-bold cyber-text-primary">
                      {mockStats.pagesWritten}
                    </p>
                    <p className="modern-font text-sm cyber-text-secondary">
                      Pages Written
                    </p>
                  </div>

                  <div className="stats-card p-6 text-center">
                    <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <p className="tech-font text-2xl font-bold cyber-text-primary">
                      {mockStats.encryptionRate}
                    </p>
                    <p className="modern-font text-sm cyber-text-secondary">
                      Encrypted
                    </p>
                  </div>
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
          <div className="slide-in-right space-y-8">
            <div className="cyber-card p-8">
              <div className="space-y-8">
                {/* Interactive Demo Preview */}
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-slate-900/50 to-purple-900/30 rounded-xl border border-purple-500/20 flex items-center justify-center overflow-hidden">
                    <div className="text-center p-8">
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                          <Mic className="h-10 w-10 text-white" />
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
                </div>

                {/* Feature Highlights */}
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
                </div>

                {/* CTA Button */}
                <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
                  <DialogTrigger asChild>
                    <Button className="cyber-button-primary modern-font w-full text-lg py-6 font-semibold">
                      <span className="gradient-text">Start Your Journey</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="cyber-container max-w-md border-0">
                    <DialogHeader>
                      <DialogTitle className="tech-font text-2xl cyber-text-primary text-center mb-4">
                        {isSignUp ? (
                          <span className="gradient-text">Join EchoDiary</span>
                        ) : (
                          <span className="gradient-text">Welcome Back</span>
                        )}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        {isSignUp ? 'Create Account' : 'Sign In'}
                      </Button>
                      
                      <Separator className="my-6 bg-gray-600" />
                      
                      <div className="text-center space-y-4">
                        <p className="modern-font text-sm cyber-text-secondary">
                          Or continue with
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          <Button variant="outline" className="cyber-button-secondary text-xs py-2">
                            Google
                          </Button>
                          <Button variant="outline" className="cyber-button-secondary text-xs py-2">
                            Apple
                          </Button>
                          <Button variant="outline" className="cyber-button-secondary text-xs py-2">
                            GitHub
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-center">
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
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="h-32 bg-gradient-to-t from-transparent to-purple-900/10 mt-16"></div>
    </div>
  );
};

export default LandingPage;