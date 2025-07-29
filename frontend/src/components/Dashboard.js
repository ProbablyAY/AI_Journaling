import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Home, 
  BookOpen, 
  Download, 
  Crown, 
  Settings, 
  LogOut, 
  Mic, 
  Edit, 
  Share, 
  Tag, 
  Trash2,
  Menu,
  X,
  Sparkles,
  Zap,
  MessageCircle,
  Users,
  Bell,
  Calendar,
  FileText,
  Headphones,
  Gift,
  GraduationCap,
  Code,
  UserPlus,
  Sun,
  Moon,
  CreditCard,
  HelpCircle,
  ArrowLeft,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Heart,
  Clock
} from 'lucide-react';
import { mockPrompts, mockTranscript, mockEntries } from '../mock';

// AI Companion messages
const aiCompanionMessages = [
  "Hi, I'm Luna! I'd love to talk to you about your day!",
  "Hey there! Did you do something fun today? I'm all ears!",
  "Hello! Did you learn something new? I'm excited to hear about it!",
  "Hi! Something sad on your mind? I'm here to listen.",
  "Welcome back! What's been on your heart today?",
  "Hey! I'm Luna, your journaling companion. Ready to share?",
  "Hi there! Any interesting thoughts you'd like to explore?",
  "Hello! I'm here whenever you need someone to talk to.",
  "Hi! Luna here - what's been the highlight of your day?",
  "Hey! Ready for a heart-to-heart conversation?"
];

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(mockPrompts[0]);
  const [transcriptText, setTranscriptText] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [aiMessage, setAiMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mockPrompts.length);
      setCurrentPrompt(mockPrompts[randomIndex]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // AI Companion typing animation effect
  useEffect(() => {
    const typeMessage = () => {
      const message = aiCompanionMessages[currentMessageIndex];
      setIsTyping(true);
      setAiMessage('');
      
      let currentChar = 0;
      const typingInterval = setInterval(() => {
        if (currentChar < message.length) {
          setAiMessage(prev => prev + message[currentChar]);
          currentChar++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          
          // After showing the message for 4 seconds, start backspacing
          setTimeout(() => {
            setIsTyping(true);
            let backspaceChar = message.length;
            const backspaceInterval = setInterval(() => {
              if (backspaceChar > 0) {
                setAiMessage(message.substring(0, backspaceChar - 1));
                backspaceChar--;
              } else {
                clearInterval(backspaceInterval);
                setIsTyping(false);
                // Move to next message after a brief pause
                setTimeout(() => {
                  setCurrentMessageIndex((prev) => (prev + 1) % aiCompanionMessages.length);
                }, 1000);
              }
            }, 50);
          }, 4000);
        }
      }, 100);
    };

    typeMessage();
  }, [currentMessageIndex]);

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setShowTranscript(true);
      simulateTranscription();
    } else {
      setIsRecording(false);
    }
  };

  const simulateTranscription = () => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < mockTranscript.length) {
        setTranscriptText(prev => prev + ' ' + mockTranscript[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsRecording(false);
      }
    }, 2000);
  };

  const clearTranscript = () => {
    setTranscriptText('');
    setShowTranscript(false);
  };

  const handleLogout = () => {
    if (showLogoutConfirm) {
      onLogout();
    } else {
      setShowLogoutConfirm(true);
      setTimeout(() => setShowLogoutConfirm(false), 5000); // Increased timeout for better UX
    }
  };

  const handlePageNavigation = (page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false); // Close mobile sidebar when navigating
  };

  const renderSpecialPage = () => {
    const commonSidebar = (
      <div className={`fixed md:relative z-50 md:z-10 h-screen w-80 sidebar-gradient transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="h-full border-r border-purple-500/20 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="tech-font text-2xl font-bold gradient-text">EchoDiary</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden cyber-text-secondary hover:cyber-text-primary"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* User Greeting */}
            <div className="space-y-2">
              <h3 className="modern-font text-lg font-semibold cyber-text-primary">
                Hey, {user?.name?.split(' ')[0] || 'there'}! 👋
              </h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start p-2 h-auto cyber-text-secondary hover:cyber-text-primary text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Explore previous entries
                </Button>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto cyber-text-secondary hover:cyber-text-primary text-sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  This date one year ago
                </Button>
                <Button className="cyber-button-primary w-full text-sm py-2 mt-2" onClick={() => handlePageNavigation('home')}>
                  <Edit className="h-4 w-4 mr-2" />
                  Write another entry today
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-6 py-4 border-b border-purple-500/20">
            <div className="space-y-1">
              {topSectionItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handlePageNavigation(item.active ? 'home' : item.label.toLowerCase().replace(' ', ''))}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 modern-font text-sm group ${
                    (currentPage === 'family' && item.label === 'EchoDiary for Family') ||
                    (currentPage === 'updates' && item.label === 'Updates') ||
                    (currentPage === 'home' && item.label === 'Home')
                      ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/10 border-l-2 border-cyan-400 cyber-text-neon' 
                      : 'cyber-text-secondary nav-hover'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-r ${item.gradient} group-hover:shadow-md transition-all duration-300`}>
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className={(currentPage === 'family' && item.label === 'EchoDiary for Family') ||
                    (currentPage === 'updates' && item.label === 'Updates') ||
                    (currentPage === 'home' && item.label === 'Home') ? 'font-semibold' : ''}>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs bg-red-500/20 text-red-300 border-red-500/30">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Rest of sidebar sections */}
          <div className="px-6 py-4 border-b border-purple-500/20">
            <h4 className="tech-font text-sm font-semibold cyber-text-accent mb-3 uppercase tracking-wider">
              Journaling
            </h4>
            <div className="space-y-1">
              {journalingItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 modern-font text-sm group cyber-text-secondary nav-hover"
                >
                  <div className={`p-1.5 rounded-lg bg-gradient-to-r ${item.gradient} group-hover:shadow-md transition-all duration-300`}>
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 flex-1">
            <h4 className="tech-font text-sm font-semibold cyber-text-accent mb-3 uppercase tracking-wider">
              Subscription & Support
            </h4>
            <div className="space-y-1">
              {supportItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 modern-font text-sm group cyber-text-secondary nav-hover"
                >
                  <div className={`p-1.5 rounded-lg bg-gradient-to-r ${item.gradient} group-hover:shadow-md transition-all duration-300`}>
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Referral Section */}
          <div className="px-6 py-4 border-t border-purple-500/20">
            <div className="cyber-card p-4 text-center">
              <UserPlus className="h-6 w-6 mx-auto mb-2 cyber-text-neon" />
              <h4 className="tech-font text-sm font-semibold cyber-text-primary mb-1">
                Refer a Friend
              </h4>
              <p className="modern-font text-xs cyber-text-secondary mb-3">
                Earn up to 6 months free!
              </p>
              <Button size="sm" className="cyber-button-primary text-xs" onClick={() => handlePageNavigation('referral')}>
                Invite Now!
              </Button>
            </div>
          </div>
        </div>
      </div>
    );

    const commonTopBar = (
      <div className="bg-gradient-to-r from-slate-900/50 to-purple-900/30 border-b border-purple-500/20 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden cyber-text-secondary"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlePageNavigation('home')}
            className="cyber-text-secondary hover:cyber-text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Button size="sm" className="cyber-button-primary" onClick={() => navigate('/upgrade')}>
            <Crown className="h-4 w-4 mr-2" />
            Upgrade
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 cyber-text-secondary hover:cyber-text-primary">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline modern-font text-sm">{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="cyber-container border-0 w-56">
              <DropdownMenuItem className="cyber-text-secondary hover:cyber-text-primary">
                <Sun className="h-4 w-4 mr-2" />
                Theme: Dark
              </DropdownMenuItem>
              <DropdownMenuItem className="cyber-text-secondary hover:cyber-text-primary" onClick={() => navigate('/upgrade')}>
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Subscription
              </DropdownMenuItem>
              <DropdownMenuItem className="cyber-text-secondary hover:cyber-text-primary">
                <Gift className="h-4 w-4 mr-2" />
                Earn Free Credits
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-purple-500/20" />
              <DropdownMenuItem 
                className="cyber-text-secondary hover:text-red-400"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {showLogoutConfirm ? 'Confirm Sign Out?' : 'Sign Out'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );

    return { sidebar: commonSidebar, topBar: commonTopBar };
  };

  const topSectionItems = [
    { 
      icon: Home, 
      label: "Home", 
      active: currentPage === 'home',
      onClick: () => handlePageNavigation('home'),
      gradient: "from-cyan-400 to-blue-500"
    },
    { 
      icon: Users, 
      label: "EchoDiary for Family", 
      active: currentPage === 'family',
      onClick: () => handlePageNavigation('family'),
      gradient: "from-purple-400 to-pink-500",
      badge: "WIP"
    },
    { 
      icon: Bell, 
      label: "Updates", 
      active: currentPage === 'updates',
      onClick: () => handlePageNavigation('updates'),
      gradient: "from-orange-400 to-red-500",
      badge: "2"
    }
  ];

  const journalingItems = [
    { 
      icon: Edit, 
      label: "Write an Entry", 
      onClick: () => {},
      gradient: "from-green-400 to-emerald-500"
    },
    { 
      icon: Calendar, 
      label: "Read Previous Memories", 
      onClick: () => navigate('/entries'),
      gradient: "from-blue-400 to-indigo-500"
    },
    { 
      icon: Heart, 
      label: "Write a letter to your future self!", 
      onClick: () => {},
      gradient: "from-pink-400 to-rose-500"
    },
    { 
      icon: FileText, 
      label: "Export Entries", 
      onClick: () => {},
      gradient: "from-teal-400 to-cyan-500"
    }
  ];

  const supportItems = [
    { 
      icon: Crown, 
      label: "Manage Subscription", 
      onClick: () => navigate('/upgrade'),
      gradient: "from-yellow-400 to-orange-500"
    },
    { 
      icon: Headphones, 
      label: "Contact Us", 
      onClick: () => {},
      gradient: "from-pink-400 to-rose-500"
    },
    { 
      icon: Gift, 
      label: "Rewards", 
      onClick: () => {},
      gradient: "from-violet-400 to-purple-500"
    },
    { 
      icon: GraduationCap, 
      label: "Tutorials", 
      onClick: () => {},
      gradient: "from-indigo-400 to-blue-500"
    },
    { 
      icon: HelpCircle, 
      label: "Documentation", 
      onClick: () => {},
      gradient: "from-gray-400 to-slate-500"
    },
    { 
      icon: Code, 
      label: "EchoDiary API", 
      onClick: () => {},
      gradient: "from-slate-400 to-gray-600"
    }
  ];

  if (currentPage === 'family') {
    const { sidebar, topBar } = renderSpecialPage();
    return (
      <div className="min-h-screen relative z-10 flex">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        {sidebar}
        <div className="flex-1 overflow-hidden flex flex-col">
          {topBar}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="cyber-card p-12">
                <Users className="h-16 w-16 mx-auto mb-6 cyber-text-accent" />
                <h1 className="tech-font text-4xl font-bold gradient-text mb-6">
                  EchoDiary for Family
                </h1>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-8">
                  <p className="modern-font text-yellow-300 font-semibold flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    🚧 Work in Progress - Coming Soon!
                  </p>
                </div>
                <p className="modern-font text-lg cyber-text-secondary mb-8 leading-relaxed">
                  Group your family accounts into a cost-effective plan. Family members can read each other's entries for shared memories and support, but can only edit their own personal entries. Perfect for staying connected while maintaining individual privacy.
                </p>
                <div className="space-y-4">
                  <h3 className="tech-font text-xl font-semibold cyber-text-primary">Planned Features:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                      <span className="modern-font cyber-text-secondary">Shared family dashboard</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <span className="modern-font cyber-text-secondary">Privacy controls per entry</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                      <span className="modern-font cyber-text-secondary">Family milestone tracking</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <span className="modern-font cyber-text-secondary">Bulk discount pricing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'updates') {
    const { sidebar, topBar } = renderSpecialPage();
    return (
      <div className="min-h-screen relative z-10 flex">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        {sidebar}
        <div className="flex-1 overflow-hidden flex flex-col">
          {topBar}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="tech-font text-4xl font-bold cyber-text-primary mb-4 flex items-center">
                  <Bell className="h-10 w-10 mr-4 cyber-text-neon" />
                  Updates & Announcements
                </h1>
                <p className="modern-font cyber-text-secondary text-lg">
                  Stay up to date with the latest EchoDiary features and improvements
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="cyber-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="tech-font text-xl font-semibold cyber-text-primary">
                          New Export Features Available
                        </h3>
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">New</Badge>
                      </div>
                      <p className="modern-font cyber-text-secondary mb-3 leading-relaxed">
                        You can now export your entries as PDF with custom formatting options. Choose from multiple templates and styling options to make your journal exports truly yours.
                      </p>
                      <span className="text-xs cyber-text-secondary opacity-70">2 days ago • Product Update</span>
                    </div>
                  </div>
                </div>
                
                <div className="cyber-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="tech-font text-xl font-semibold cyber-text-primary">
                          Improved AI Conversation Quality
                        </h3>
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Enhancement</Badge>
                      </div>
                      <p className="modern-font cyber-text-secondary mb-3 leading-relaxed">
                        Our AI now better understands context and emotions in your conversations. Experience more natural dialogues with improved follow-up questions and emotional intelligence.
                      </p>
                      <span className="text-xs cyber-text-secondary opacity-70">5 days ago • AI Update</span>
                    </div>
                  </div>
                </div>

                <div className="cyber-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="tech-font text-xl font-semibold cyber-text-primary">
                          Mobile App Performance Boost
                        </h3>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Performance</Badge>
                      </div>
                      <p className="modern-font cyber-text-secondary mb-3 leading-relaxed">
                        We've optimized the mobile experience for faster loading times and smoother voice recording. Enjoy a 40% improvement in app responsiveness.
                      </p>
                      <span className="text-xs cyber-text-secondary opacity-70">1 week ago • Technical Update</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'referral') {
    const { sidebar, topBar } = renderSpecialPage();
    return (
      <div className="min-h-screen relative z-10 flex">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        {sidebar}
        <div className="flex-1 overflow-hidden flex flex-col">
          {topBar}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="cyber-card p-12">
                <UserPlus className="h-16 w-16 mx-auto mb-6 cyber-text-neon" />
                <h1 className="tech-font text-4xl font-bold gradient-text mb-6">
                  Refer Friends & Earn Rewards
                </h1>
                <p className="modern-font text-lg cyber-text-secondary mb-8 leading-relaxed">
                  Share the power of AI journaling with friends and family. For every person who joins using your referral link, you both get rewarded!
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="cyber-card p-6">
                    <Gift className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                    <h3 className="tech-font text-xl font-semibold cyber-text-primary mb-2">1 Month Free</h3>
                    <p className="modern-font text-sm cyber-text-secondary">For each successful referral</p>
                  </div>
                  <div className="cyber-card p-6">
                    <Crown className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="tech-font text-xl font-semibold cyber-text-primary mb-2">Up to 6 Months</h3>
                    <p className="modern-font text-sm cyber-text-secondary">Maximum free subscription time</p>
                  </div>
                  <div className="cyber-card p-6">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 cyber-text-accent" />
                    <h3 className="tech-font text-xl font-semibold cyber-text-primary mb-2">Bonus Features</h3>
                    <p className="modern-font text-sm cyber-text-secondary">Unlock premium features early</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="cyber-button-primary text-lg px-8 py-4">
                    <Share className="h-5 w-5 mr-2" />
                    <span className="text-white">Get Your Referral Link</span>
                  </Button>
                  <p className="modern-font text-sm cyber-text-secondary">
                    Share via social media, email, or direct link
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative z-10 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Enhanced Full-Height Sidebar */}
      <div className={`fixed md:relative z-50 md:z-10 h-screen w-80 sidebar-gradient transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="h-full border-r border-purple-500/20 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="tech-font text-2xl font-bold gradient-text">EchoDiary</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden cyber-text-secondary hover:cyber-text-primary"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* User Greeting */}
            <div className="space-y-2">
              <h3 className="modern-font text-lg font-semibold cyber-text-primary">
                Hey, {user?.name?.split(' ')[0] || 'there'}! 👋
              </h3>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start p-2 h-auto cyber-text-secondary hover:cyber-text-primary text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Explore previous entries
                </Button>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto cyber-text-secondary hover:cyber-text-primary text-sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  This date one year ago
                </Button>
                <Button className="cyber-button-primary w-full text-sm py-2 mt-2">
                  <Edit className="h-4 w-4 mr-2" />
                  Write another entry today
                </Button>
              </div>
            </div>
          </div>

          {/* Top Section */}
          <div className="px-6 py-4 border-b border-purple-500/20">
            <div className="space-y-1">
              {topSectionItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 modern-font text-sm group ${
                    item.active 
                      ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/10 border-l-2 border-cyan-400 cyber-text-neon' 
                      : 'cyber-text-secondary nav-hover'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-r ${item.gradient} group-hover:shadow-md transition-all duration-300`}>
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className={item.active ? 'font-semibold' : ''}>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs bg-red-500/20 text-red-300 border-red-500/30">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Middle Section - Journaling */}
          <div className="px-6 py-4 border-b border-purple-500/20">
            <h4 className="tech-font text-sm font-semibold cyber-text-accent mb-3 uppercase tracking-wider">
              Journaling
            </h4>
            <div className="space-y-1">
              {journalingItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 modern-font text-sm group cyber-text-secondary nav-hover"
                >
                  <div className={`p-1.5 rounded-lg bg-gradient-to-r ${item.gradient} group-hover:shadow-md transition-all duration-300`}>
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Section - Support & Subscription */}
          <div className="px-6 py-4 flex-1">
            <h4 className="tech-font text-sm font-semibold cyber-text-accent mb-3 uppercase tracking-wider">
              Subscription & Support
            </h4>
            <div className="space-y-1">
              {supportItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 modern-font text-sm group cyber-text-secondary nav-hover"
                >
                  <div className={`p-1.5 rounded-lg bg-gradient-to-r ${item.gradient} group-hover:shadow-md transition-all duration-300`}>
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Referral Section */}
          <div className="px-6 py-4 border-t border-purple-500/20">
            <div className="cyber-card p-4 text-center">
              <UserPlus className="h-6 w-6 mx-auto mb-2 cyber-text-neon" />
              <h4 className="tech-font text-sm font-semibold cyber-text-primary mb-1">
                Refer a Friend
              </h4>
              <p className="modern-font text-xs cyber-text-secondary mb-3">
                Earn up to 6 months free!
              </p>
              <Button size="sm" className="cyber-button-primary text-xs">
                Invite Now!
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-slate-900/50 to-purple-900/30 border-b border-purple-500/20 px-6 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden cyber-text-secondary"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden md:block">
            <h1 className="tech-font text-xl font-bold cyber-text-primary">Welcome back, {user?.name}!</h1>
          </div>

          <div className="flex items-center space-x-3">
            <Button size="sm" className="cyber-button-primary" onClick={() => navigate('/upgrade')}>
              <Crown className="h-4 w-4 mr-2" />
              Upgrade
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 cyber-text-secondary hover:cyber-text-primary">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline modern-font text-sm">{user?.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cyber-container border-0 w-56">
                <DropdownMenuItem className="cyber-text-secondary hover:cyber-text-primary">
                  <Sun className="h-4 w-4 mr-2" />
                  Theme: Dark
                </DropdownMenuItem>
                <DropdownMenuItem className="cyber-text-secondary hover:cyber-text-primary" onClick={() => navigate('/upgrade')}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Manage Subscription
                </DropdownMenuItem>
                <DropdownMenuItem className="cyber-text-secondary hover:cyber-text-primary">
                  <Gift className="h-4 w-4 mr-2" />
                  Earn Free Credits
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-purple-500/20" />
                <DropdownMenuItem 
                  className="cyber-text-secondary hover:text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {showLogoutConfirm ? 'Confirm Sign Out?' : 'Sign Out'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Journaling Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="tech-font text-5xl font-bold cyber-text-primary mb-4">
                Let's talk about your day
              </h1>
              <div className="flex items-center justify-center space-x-3 mb-6">
                <MessageCircle className="h-6 w-6 cyber-text-neon" />
                <p className="modern-font text-xl cyber-text-secondary writing-animation">
                  {currentPrompt}
                </p>
              </div>
            </div>

            {/* Recording Interface */}
            <div className="text-center space-y-8 mb-12">
              {/* Enhanced Mic Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleRecord}
                  data-testid="mic-button"
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 floating-mic ${
                    isRecording ? 'recording' : ''
                  }`}
                >
                  <Mic className="h-12 w-12 text-white" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="modern-font text-xl cyber-text-primary font-semibold">
                  {isRecording ? 'Recording... Tap to stop' : 'Tap to start recording'}
                </p>
                <p className="modern-font text-sm cyber-text-secondary">
                  Speak naturally, I'll handle the rest
                </p>
              </div>
            </div>

            {/* Enhanced Transcript Area */}
            {showTranscript && (
              <div className="mb-12 fade-in">
                <div className="transcript-card p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <Zap className="h-6 w-6 cyber-text-neon" />
                      <h3 className="tech-font text-xl font-semibold cyber-text-primary">Your Entry</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearTranscript}
                      className="cyber-text-secondary hover:cyber-text-primary"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="modern-font text-lg cyber-text-secondary leading-relaxed">
                      {transcriptText}
                    </p>
                  </div>
                  
                  {!isRecording && transcriptText && (
                    <div className="mt-8 pt-6 border-t border-purple-500/20">
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" size="sm" className="cyber-button-secondary">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="cyber-button-secondary">
                          <Share className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline" size="sm" className="cyber-button-secondary">
                          <Tag className="h-4 w-4 mr-2" />
                          Add Tags
                        </Button>
                        <Button variant="outline" size="sm" className="cyber-button-secondary">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Recent Entries Preview */}
            {!showTranscript && (
              <div className="fade-in">
                <div className="flex items-center space-x-3 mb-6">
                  <BookOpen className="h-6 w-6 cyber-text-accent" />
                  <h3 className="tech-font text-2xl font-semibold cyber-text-primary">
                    Recent Entries
                  </h3>
                </div>
                
                <div className="grid gap-6">
                  <div className="cyber-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="modern-font text-sm cyber-text-secondary mb-2">
                          Yesterday, 7:30 PM
                        </p>
                        <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30 cyber-text-accent">
                          Reflective
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                      </div>
                    </div>
                    
                    <p className="modern-font cyber-text-secondary leading-relaxed">
                      Today was actually pretty interesting. I had this meeting with my team and we finally solved that problem we've been working on for weeks...
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="cyber-button-secondary modern-font"
                    onClick={() => navigate('/entries')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View All Entries
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;