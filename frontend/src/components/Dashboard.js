import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
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
  MessageCircle
} from 'lucide-react';
import { mockPrompts, mockTranscript } from '../mock';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(mockPrompts[0]);
  const [transcriptText, setTranscriptText] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mockPrompts.length);
      setCurrentPrompt(mockPrompts[randomIndex]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

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

  const navigationItems = [
    { icon: Home, label: "Today's Entry", active: true, onClick: () => {}, gradient: "from-cyan-400 to-blue-500" },
    { icon: BookOpen, label: "My Entries", active: false, onClick: () => navigate('/entries'), gradient: "from-purple-400 to-pink-500" },
    { icon: Download, label: "Export", active: false, onClick: () => {}, gradient: "from-green-400 to-emerald-500" },
    { icon: Crown, label: "Upgrade", active: false, onClick: () => navigate('/upgrade'), gradient: "from-yellow-400 to-orange-500" },
    { icon: Settings, label: "Settings", active: false, onClick: () => {}, gradient: "from-gray-400 to-slate-500" },
    { icon: LogOut, label: "Logout", active: false, onClick: onLogout, gradient: "from-red-400 to-pink-500" }
  ];

  return (
    <div className="min-h-screen relative z-10 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <div className={`fixed md:relative z-50 md:z-10 h-full w-80 sidebar-gradient transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="h-full border-r border-purple-500/20">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="tech-font text-3xl font-bold gradient-text">EchoDiary</h2>
                <p className="modern-font text-sm cyber-text-secondary">Welcome back, {user?.name}</p>
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
            
            <nav className="space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 modern-font group ${
                    item.active 
                      ? 'nav-active' 
                      : 'cyber-text-secondary nav-hover'
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} ${item.active ? 'shadow-lg' : 'group-hover:shadow-md'} transition-all duration-300`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <span className={item.active ? 'font-semibold' : ''}>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* User Stats Card */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
              <div className="flex items-center space-x-3 mb-3">
                <Sparkles className="h-5 w-5 cyber-text-neon" />
                <span className="modern-font font-semibold cyber-text-primary">Your Progress</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="cyber-text-secondary">This week</span>
                  <span className="cyber-text-primary font-semibold">5 entries</span>
                </div>
                <div className="flex justify-between">
                  <span className="cyber-text-secondary">Streak</span>
                  <span className="cyber-text-neon font-semibold">12 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden cyber-container mx-4 mt-4 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
            className="cyber-text-secondary"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="tech-font text-xl font-bold cyber-text-primary">Today's Entry</h1>
          <div className="w-8"></div>
        </div>

        {/* Main Journaling Area */}
        <div className="h-full p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header - Desktop */}
            <div className="hidden md:block mb-12 text-center">
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

            {/* Mobile Header */}
            <div className="md:hidden mb-8 text-center">
              <h2 className="tech-font text-3xl font-bold cyber-text-primary mb-3">
                Let's talk about your day
              </h2>
              <p className="modern-font cyber-text-secondary">
                {currentPrompt}
              </p>
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