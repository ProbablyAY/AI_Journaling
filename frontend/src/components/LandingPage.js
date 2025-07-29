import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Users, FileText, Shield, Play, Eye, Calendar } from 'lucide-react';
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
    // Mock login/signup - normally would call API
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
      {/* Header */}
      <div className="text-center pt-12 pb-8 fade-in">
        <h1 className="handwritten text-6xl md:text-7xl font-bold ink-text mb-4">
          EchoDiary
        </h1>
        <p className="serif text-xl md:text-2xl ink-text opacity-80">
          Your thoughts, captured in conversation. Remember your day, your way.
        </p>
      </div>

      {/* Main Content - Two Page Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left Page */}
          <div className="notebook-texture slide-in-left">
            <Card className="paper-texture journal-shadow border-0">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Mission Statement */}
                  <div>
                    <h2 className="serif text-2xl font-semibold ink-text mb-4">
                      Your Daily Companion
                    </h2>
                    <p className="sans-serif text-lg ink-text leading-relaxed">
                      EchoDiary is your daily companion to reflect, unload, and relive life's moments 
                      through natural conversation. Talk. Record. Revisit — all in your voice.
                    </p>
                  </div>

                  {/* Stats Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Users className="h-8 w-8 ink-text opacity-70" />
                      </div>
                      <div>
                        <p className="serif text-2xl font-semibold ink-text">
                          {mockStats.activeUsers}
                        </p>
                        <p className="sans-serif text-sm ink-text opacity-70">
                          active users daily
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <FileText className="h-8 w-8 ink-text opacity-70" />
                      </div>
                      <div>
                        <p className="serif text-2xl font-semibold ink-text">
                          {mockStats.pagesWritten}
                        </p>
                        <p className="sans-serif text-sm ink-text opacity-70">
                          journal pages written
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Shield className="h-8 w-8 ink-text opacity-70" />
                      </div>
                      <div>
                        <p className="serif text-2xl font-semibold ink-text">
                          {mockStats.encryptionRate}
                        </p>
                        <p className="sans-serif text-sm ink-text opacity-70">
                          end-to-end encrypted entries
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* How It Works Button */}
                  <Button 
                    variant="outline" 
                    className="btn-secondary sans-serif w-full"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    How It Works
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Page */}
          <div className="notebook-texture slide-in-right">
            <Card className="paper-texture journal-shadow border-0">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Demo Video Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                    <div className="text-center">
                      <Eye className="h-12 w-12 mx-auto ink-text opacity-50 mb-4" />
                      <p className="sans-serif text-lg ink-text opacity-70">
                        Demo Video
                      </p>
                      <p className="sans-serif text-sm ink-text opacity-50">
                        Watch how EchoDiary works
                      </p>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="sans-serif ink-text">
                        <strong>Natural Conversation:</strong> Talk to AI like you're talking to a friend
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="sans-serif ink-text">
                        <strong>Auto-Transcription:</strong> Your voice becomes beautifully formatted text
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="sans-serif ink-text">
                        <strong>Export & Share:</strong> Download your thoughts in multiple formats
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
                    <DialogTrigger asChild>
                      <Button className="btn-primary sans-serif w-full text-lg py-6">
                        Start Journaling
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="paper-texture max-w-md">
                      <DialogHeader>
                        <DialogTitle className="serif text-2xl ink-text text-center">
                          {isSignUp ? 'Start Writing' : 'Welcome Back'}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignUp && (
                          <div>
                            <Label htmlFor="fullName" className="sans-serif ink-text">
                              Full Name
                            </Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              type="text"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="paper-texture"
                              required
                            />
                          </div>
                        )}
                        
                        <div>
                          <Label htmlFor="email" className="sans-serif ink-text">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="paper-texture"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="password" className="sans-serif ink-text">
                            Password
                          </Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="paper-texture"
                            required
                          />
                        </div>
                        
                        {isSignUp && (
                          <div>
                            <Label htmlFor="confirmPassword" className="sans-serif ink-text">
                              Confirm Password
                            </Label>
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              className="paper-texture"
                              required
                            />
                          </div>
                        )}
                        
                        <Button type="submit" className="btn-primary sans-serif w-full">
                          {isSignUp ? 'Start Writing' : 'Sign In'}
                        </Button>
                        
                        <Separator className="my-4" />
                        
                        <div className="text-center space-y-2">
                          <p className="sans-serif text-sm ink-text opacity-70">
                            Or continue with
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            <Button variant="outline" className="btn-secondary text-xs">
                              Google
                            </Button>
                            <Button variant="outline" className="btn-secondary text-xs">
                              Apple
                            </Button>
                            <Button variant="outline" className="btn-secondary text-xs">
                              Microsoft
                            </Button>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={toggleAuthMode}
                            className="sans-serif text-sm ink-text hover:underline"
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;