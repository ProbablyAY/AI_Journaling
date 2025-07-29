import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ArrowLeft, Sparkles, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { mockUser } from '../mock';

const AuthPage = ({ onLogin, onBack }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    // Mock authentication - normally would call API
    onLogin(mockUser);
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
    <div className="min-h-screen relative z-10 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-purple-900/30"></div>
      
      {/* Back Button */}
      <Button
        variant="ghost"
        className="absolute top-6 left-6 cyber-text-secondary hover:cyber-text-primary"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="cyber-card border-0 overflow-hidden">
          <CardHeader className="text-center pb-8 bg-gradient-to-r from-purple-600/10 to-cyan-600/10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="tech-font text-3xl font-bold cyber-text-primary">
              {isSignUp ? (
                <span className="gradient-text">Join EchoDiary</span>
              ) : (
                <span className="gradient-text">Welcome Back</span>
              )}
            </CardTitle>
            <p className="modern-font cyber-text-secondary mt-2">
              {isSignUp 
                ? 'Start your interactive journaling journey today'
                : 'Continue your journaling journey'
              }
            </p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="modern-font cyber-text-secondary flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="cyber-input modern-font"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="modern-font cyber-text-secondary flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Address
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
              
              <div className="space-y-2">
                <Label htmlFor="password" className="modern-font cyber-text-secondary flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="cyber-input modern-font pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cyber-text-secondary hover:cyber-text-primary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="modern-font cyber-text-secondary flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="cyber-input modern-font pr-10"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cyber-text-secondary hover:cyber-text-primary"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}
              
              <Button type="submit" className="cyber-button-primary modern-font w-full py-3 text-lg font-semibold">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="text-white">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </span>
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-purple-500/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-900 px-4 cyber-text-secondary modern-font">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              <Button type="button" variant="outline" className="cyber-button-secondary text-sm py-2">
                Google
              </Button>
              <Button type="button" variant="outline" className="cyber-button-secondary text-sm py-2">
                Apple
              </Button>
              <Button type="button" variant="outline" className="cyber-button-secondary text-sm py-2">
                GitHub
              </Button>
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

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-purple-500/20">
              <div className="text-center space-y-2">
                <p className="modern-font text-xs cyber-text-secondary">
                  By {isSignUp ? 'creating an account' : 'signing in'}, you agree to our Terms of Service and Privacy Policy.
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs cyber-text-secondary">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Secure & Encrypted
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                    Free to Start
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floating Decorative Elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default AuthPage;