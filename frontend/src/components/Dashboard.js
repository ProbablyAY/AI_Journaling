import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
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
  X
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
    { icon: Home, label: "Today's Entry", active: true, onClick: () => {} },
    { icon: BookOpen, label: "My Entries", active: false, onClick: () => navigate('/entries') },
    { icon: Download, label: "Export", active: false, onClick: () => {} },
    { icon: Crown, label: "Upgrade", active: false, onClick: () => navigate('/upgrade') },
    { icon: Settings, label: "Settings", active: false, onClick: () => {} },
    { icon: LogOut, label: "Logout", active: false, onClick: onLogout }
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

      {/* Sidebar */}
      <div className={`fixed md:relative z-50 md:z-10 h-full w-80 bg-white journal-shadow transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="notebook-texture h-full">
          <Card className="paper-texture h-full rounded-none border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="handwritten text-3xl font-bold ink-text">EchoDiary</h2>
                  <p className="sans-serif text-sm ink-text opacity-70">Welcome back, {user?.name}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="px-6">
              <nav className="space-y-2">
                {navigationItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors sans-serif ${
                      item.active 
                        ? 'bg-slate-100 ink-text font-medium' 
                        : 'ink-text opacity-70 nav-hover'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-white journal-shadow px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="handwritten text-2xl font-bold ink-text">Today's Entry</h1>
          <div className="w-8"></div>
        </div>

        {/* Journaling Area */}
        <div className="h-full p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header - Desktop */}
            <div className="hidden md:block mb-8">
              <h1 className="serif text-4xl font-semibold ink-text mb-2">
                Let's talk about your day.
              </h1>
              <p className="sans-serif text-lg ink-text opacity-70">
                {currentPrompt}
              </p>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden mb-6">
              <h2 className="serif text-2xl font-semibold ink-text mb-2">
                Let's talk about your day.
              </h2>
              <p className="sans-serif ink-text opacity-70">
                {currentPrompt}
              </p>
            </div>

            {/* Recording Interface */}
            <div className="text-center space-y-8">
              {/* Mic Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleRecord}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isRecording 
                      ? 'bg-red-500 pulse-animation' 
                      : 'bg-slate-700 hover:bg-slate-800 hover:scale-105'
                  }`}
                >
                  <Mic className="h-8 w-8 text-white" />
                </button>
              </div>

              <p className="sans-serif text-lg ink-text">
                {isRecording ? 'Recording... Tap to stop' : 'Tap to start recording'}
              </p>
            </div>

            {/* Transcript Area */}
            {showTranscript && (
              <div className="mt-8 fade-in">
                <Card className="paper-texture journal-shadow">
                  <CardHeader>
                    <CardTitle className="serif text-xl ink-text flex items-center justify-between">
                      Your Entry
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearTranscript}
                        className="opacity-50 hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-slate max-w-none">
                      <p className="sans-serif text-base ink-text leading-relaxed">
                        {transcriptText}
                      </p>
                    </div>
                    
                    {!isRecording && transcriptText && (
                      <div className="mt-6 pt-4 border-t border-slate-200">
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="btn-secondary">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="btn-secondary">
                            <Share className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                          <Button variant="outline" size="sm" className="btn-secondary">
                            <Tag className="h-4 w-4 mr-2" />
                            Tag
                          </Button>
                          <Button variant="outline" size="sm" className="btn-secondary">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recent Entries Preview */}
            {!showTranscript && (
              <div className="mt-12 fade-in">
                <h3 className="serif text-2xl font-semibold ink-text mb-6">
                  Recent Entries
                </h3>
                <div className="grid gap-4">
                  <Card className="paper-texture journal-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <p className="sans-serif text-sm ink-text opacity-70">
                          Yesterday, 7:30 PM
                        </p>
                        <span className="text-xs bg-slate-100 px-2 py-1 rounded-full sans-serif ink-text">
                          Reflective
                        </span>
                      </div>
                      <p className="sans-serif ink-text">
                        Today was actually pretty interesting. I had this meeting with my team and we finally solved that problem we've been working on for weeks...
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Button 
                    variant="outline" 
                    className="btn-secondary sans-serif"
                    onClick={() => navigate('/entries')}
                  >
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