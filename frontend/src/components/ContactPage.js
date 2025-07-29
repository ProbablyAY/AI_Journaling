import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Home, 
  Info, 
  Mail, 
  Mic, 
  Sparkles, 
  Send,
  MessageSquare,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';

const ContactPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Contact form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    // Could show success message here
  };

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
            <Button variant="ghost" className="cyber-text-secondary hover:cyber-text-primary modern-font" onClick={() => onNavigate('about')}>
              <Info className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">About</span>
            </Button>
            <Button variant="ghost" className="cyber-text-neon modern-font">
              <Mail className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Contact</span>
            </Button>
            <Button className="cyber-button-primary modern-font" onClick={() => onNavigate('auth')}>
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
            Get In Touch
          </h1>
          <p className="modern-font text-xl md:text-2xl cyber-text-secondary max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        {/* Floating elements */}
        <div className="relative">
          <div className="absolute -top-10 left-1/4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute -top-6 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side - Information */}
          <div className="cyber-card cyber-card-left p-8 slide-in-left">
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <MessageSquare className="h-8 w-8 cyber-text-neon" />
                  <h2 className="tech-font text-3xl font-bold cyber-text-primary">
                    Let's Start a Conversation
                  </h2>
                </div>
                <p className="modern-font text-lg cyber-text-secondary leading-relaxed">
                  Have questions about our subscription plans, how to use our service, or want to get 
                  involved in any way? We're passionate about ensuring all of our customers have a 
                  seamless experience in documenting their life to the fullest.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-cyan-400">
                  <Mail className="h-6 w-6 cyber-text-neon flex-shrink-0" />
                  <div>
                    <h4 className="modern-font font-semibold cyber-text-primary">Email Support</h4>
                    <p className="modern-font text-sm cyber-text-secondary">Support@SparkCo.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-transparent border-l-2 border-purple-400">
                  <Phone className="h-6 w-6 cyber-text-accent flex-shrink-0" />
                  <div>
                    <h4 className="modern-font font-semibold cyber-text-primary">Phone Support</h4>
                    <p className="modern-font text-sm cyber-text-secondary">Available 24/7 for premium users</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gradient-to-r from-pink-500/10 to-transparent border-l-2 border-pink-400">
                  <MapPin className="h-6 w-6 text-pink-400 flex-shrink-0" />
                  <div>
                    <h4 className="modern-font font-semibold cyber-text-primary">Office Location</h4>
                    <p className="modern-font text-sm cyber-text-secondary">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="modern-font font-semibold cyber-text-primary">Fast Response</span>
                </div>
                <p className="modern-font text-sm cyber-text-secondary">
                  We typically respond within 2-4 hours during business hours, 
                  and within 24 hours on weekends.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="cyber-card cyber-card-right p-8 slide-in-right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="modern-font cyber-text-secondary mb-2 block">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="cyber-input modern-font"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="modern-font cyber-text-secondary mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="cyber-input modern-font"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" className="modern-font cyber-text-secondary mb-2 block">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="cyber-input modern-font min-h-32 resize-none"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <Button type="submit" className="cyber-button-primary modern-font w-full py-3 font-semibold">
                <Send className="h-4 w-4 mr-2" />
                <span className="text-white">Send Message</span>
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-purple-500/20">
              <p className="modern-font text-sm cyber-text-secondary text-center">
                By contacting us, you agree to our privacy policy. 
                We'll never share your information with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Quick Links */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="tech-font text-2xl font-bold cyber-text-primary mb-4">
            Common Questions
          </h2>
          <p className="modern-font cyber-text-secondary">
            Looking for quick answers? Check out these popular topics
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Button variant="outline" className="cyber-button-secondary modern-font justify-start p-4 h-auto">
            <div className="text-left">
              <div className="font-semibold">Getting Started</div>
              <div className="text-sm opacity-70">How to set up your account</div>
            </div>
          </Button>
          
          <Button variant="outline" className="cyber-button-secondary modern-font justify-start p-4 h-auto">
            <div className="text-left">
              <div className="font-semibold">Billing & Plans</div>
              <div className="text-sm opacity-70">Subscription and payment info</div>
            </div>
          </Button>
          
          <Button variant="outline" className="cyber-button-secondary modern-font justify-start p-4 h-auto">
            <div className="text-left">
              <div className="font-semibold">Privacy & Security</div>
              <div className="text-sm opacity-70">How we protect your data</div>
            </div>
          </Button>
          
          <Button variant="outline" className="cyber-button-secondary modern-font justify-start p-4 h-auto">
            <div className="text-left">
              <div className="font-semibold">Technical Support</div>
              <div className="text-sm opacity-70">Troubleshooting help</div>
            </div>
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

export default ContactPage;