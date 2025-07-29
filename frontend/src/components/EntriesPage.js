import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
  Search, 
  Calendar, 
  Filter,
  Menu,
  X,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  Zap,
  TrendingUp,
  Archive,
  Users,
  Bell,
  Heart,
  FileText,
  Headphones,
  Gift,
  GraduationCap,
  HelpCircle,
  Code,
  ChevronDown,
  UserPlus,
  Sun,
  Moon,
  CreditCard
} from 'lucide-react';
import { mockEntries } from '../mock';

const EntriesPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredEntries, setFilteredEntries] = useState(mockEntries);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [themeMode, setThemeMode] = useState('dark');

  const getThemeDisplay = () => {
    switch (themeMode) {
      case 'light': return 'Light';
      case 'notebook': return 'Notebook';
      default: return 'Dark';
    }
  };

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light': return Sun;
      case 'notebook': return BookOpen;
      default: return Moon;
    }
  };

  const toggleTheme = () => {
    if (themeMode === 'dark') {
      setThemeMode('light');
    } else if (themeMode === 'light') {
      setThemeMode('notebook');
    } else {
      setThemeMode('dark');
    }
  };

  const handleLogout = () => {
    onLogout();
  };



  // Updated navigation structure to match Dashboard
  const topSectionItems = [
    { 
      icon: Home, 
      label: "Home", 
      active: false,
      onClick: () => navigate('/'),
      gradient: "from-cyan-400 to-blue-500"
    },
    { 
      icon: Users, 
      label: "EchoDiary for Family", 
      active: false,
      onClick: () => navigate('/'),
      gradient: "from-purple-400 to-pink-500",
      badge: "WIP"
    },
    { 
      icon: Bell, 
      label: "Updates", 
      active: false,
      onClick: () => navigate('/'),
      gradient: "from-orange-400 to-red-500",
      badge: "2"
    }
  ];

  const journalingItems = [
    { 
      icon: Edit, 
      label: "Write an Entry", 
      onClick: () => navigate('/'),
      gradient: "from-green-400 to-emerald-500"
    },
    { 
      icon: Calendar, 
      label: "Read Previous Memories", 
      onClick: () => {},
      gradient: "from-blue-400 to-indigo-500",
      active: true
    },
    { 
      icon: Heart, 
      label: "Write to Future Self", 
      onClick: () => navigate('/'),
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
      icon: Settings, 
      label: "Settings", 
      onClick: () => {},
      gradient: "from-gray-400 to-slate-500"
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

  const moods = ['all', 'Reflective', 'Grateful', 'Excited', 'Contemplative', 'Peaceful', 'Energetic'];
  const months = ['all', 'January 2025', 'December 2024', 'November 2024'];

  const moodColors = {
    'Reflective': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300',
    'Grateful': 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300',
    'Excited': 'from-orange-500/20 to-yellow-500/20 border-orange-500/30 text-orange-300',
    'Contemplative': 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300',
    'Peaceful': 'from-teal-500/20 to-cyan-500/20 border-teal-500/30 text-teal-300',
    'Energetic': 'from-pink-500/20 to-red-500/20 border-pink-500/30 text-pink-300'
  };

  React.useEffect(() => {
    let filtered = mockEntries;

    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedMood !== 'all') {
      filtered = filtered.filter(entry => entry.mood === selectedMood);
    }

    setFilteredEntries(filtered);
  }, [searchTerm, selectedMood, selectedMonth]);

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

          {/* Journaling Section */}
          <div className="px-6 py-4 border-b border-purple-500/20">
            <h4 className="tech-font text-sm font-semibold cyber-text-accent mb-3 uppercase tracking-wider">
              Journaling
            </h4>
            <div className="space-y-1">
              {journalingItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 modern-font text-sm group ${
                    item.active 
                      ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/10 border-l-2 border-cyan-400 cyber-text-neon' 
                      : 'cyber-text-secondary nav-hover'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg bg-gradient-to-r ${item.gradient} ${item.active ? 'shadow-lg' : 'group-hover:shadow-md'} transition-all duration-300`}>
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className={item.active ? 'font-semibold' : ''}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subscription & Support Section */}
          <div className="px-6 py-4 border-b border-purple-500/20">
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

          {/* Stats Section */}
          <div className="px-6 py-4 flex-1">
            <div className="cyber-card p-4">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="h-5 w-5 cyber-text-neon" />
                <span className="modern-font font-semibold cyber-text-primary">Your Archive</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center">
                  <div className="cyber-text-neon font-bold text-lg">{filteredEntries.length}</div>
                  <div className="cyber-text-secondary">Entries</div>
                </div>
                <div className="text-center">
                  <div className="cyber-text-accent font-bold text-lg">85%</div>
                  <div className="cyber-text-secondary">Completion</div>
                </div>
              </div>
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
          <h1 className="tech-font text-xl font-bold cyber-text-primary">My Entries</h1>
          <div className="w-8"></div>
        </div>

        {/* Desktop Top Bar */}
        <div className="hidden md:block bg-gradient-to-r from-slate-900/50 to-purple-900/30 border-b border-purple-500/20 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Archive className="h-8 w-8 cyber-text-neon" />
              <div>
                <h1 className="tech-font text-xl font-bold cyber-text-primary">My Entries</h1>
                <p className="modern-font text-sm cyber-text-secondary">Browse, search, and manage your journal entries</p>
              </div>
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
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="cyber-container border-0 w-56">
                  <DropdownMenuItem 
                    className="cyber-text-secondary hover:cyber-text-primary"
                    onClick={toggleTheme}
                  >
                    {React.createElement(getThemeIcon(), { className: "h-4 w-4 mr-2" })}
                    Theme: {getThemeDisplay()}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cyber-text-secondary hover:cyber-text-primary" onClick={() => navigate('/upgrade')}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cyber-text-secondary hover:cyber-text-primary">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cyber-text-secondary hover:cyber-text-primary">
                    <Gift className="h-4 w-4 mr-2" />
                    Earn Free Credits
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-purple-500/20" />
                  <DropdownMenuItem 
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Entries Content */}
        <div className="h-full p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Enhanced Filters and Search */}
            <div className="mb-8 space-y-6">
              <div className="cyber-card p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 cyber-text-secondary" />
                    <Input
                      placeholder="Search entries, tags, or moods..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="cyber-input pl-12 modern-font"
                    />
                  </div>

                  {/* Mood Filter */}
                  <Select value={selectedMood} onValueChange={setSelectedMood}>
                    <SelectTrigger className="w-full lg:w-48 cyber-input modern-font">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by mood" />
                    </SelectTrigger>
                    <SelectContent className="cyber-container border-0">
                      {moods.map((mood) => (
                        <SelectItem key={mood} value={mood} className="cyber-text-secondary hover:cyber-text-primary">
                          {mood === 'all' ? 'All Moods' : mood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Date Filter */}
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-full lg:w-48 cyber-input modern-font">
                      <Calendar className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent className="cyber-container border-0">
                      {months.map((month) => (
                        <SelectItem key={month} value={month} className="cyber-text-secondary hover:cyber-text-primary">
                          {month === 'all' ? 'All Time' : month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Results Count */}
                <div className="mt-4 flex items-center justify-between">
                  <p className="modern-font text-sm cyber-text-secondary">
                    Showing <span className="cyber-text-neon font-semibold">{filteredEntries.length}</span> entries
                  </p>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 cyber-text-accent" />
                    <span className="modern-font text-xs cyber-text-secondary">Auto-saved</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Entries List */}
            <div className="space-y-6">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="cyber-card p-6 fade-in">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <p className="modern-font text-sm cyber-text-secondary">
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <Badge className={`bg-gradient-to-r ${moodColors[entry.mood] || 'from-gray-500/20 to-gray-500/20 border-gray-500/30 text-gray-300'} border`}>
                          {entry.mood}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Zap className="h-3 w-3 cyber-text-accent" />
                          <span className="modern-font text-xs cyber-text-secondary">
                            {entry.duration}
                          </span>
                        </div>
                      </div>
                      
                      <p className="modern-font cyber-text-secondary leading-relaxed mb-4 text-lg">
                        {entry.preview}
                      </p>

                      {/* Enhanced Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {entry.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/30 cyber-text-accent text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Visual indicator */}
                    <div className="flex flex-col items-center space-y-2 ml-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
                      <div className="w-1 h-8 bg-gradient-to-b from-purple-500/50 to-transparent rounded-full"></div>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-purple-500/20">
                    <div className="flex space-x-3">
                      <Button variant="ghost" size="sm" className="cyber-button-secondary">
                        <Eye className="h-4 w-4 mr-2" />
                        <span className="mobile-hidden">Read</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="cyber-button-secondary">
                        <Edit className="h-4 w-4 mr-2" />
                        <span className="mobile-hidden">Edit</span>
                      </Button>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="ghost" size="sm" className="cyber-text-secondary hover:cyber-text-neon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="cyber-text-secondary hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredEntries.length === 0 && (
                <div className="cyber-card p-12 text-center">
                  <BookOpen className="h-16 w-16 mx-auto cyber-text-secondary opacity-50 mb-6" />
                  <h3 className="tech-font text-2xl cyber-text-primary mb-4">No entries found</h3>
                  <p className="modern-font cyber-text-secondary mb-8">
                    Try adjusting your search terms or filters, or create your first entry
                  </p>
                  <Button 
                    onClick={() => navigate('/')}
                    className="cyber-button-primary modern-font"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Your First Entry
                  </Button>
                </div>
              )}
            </div>

            {/* Enhanced Bulk Actions */}
            {filteredEntries.length > 0 && (
              <div className="mt-8 cyber-card p-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                  <div className="flex space-x-3">
                    <Button variant="outline" className="cyber-button-secondary modern-font">
                      <Download className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                    <Button variant="outline" className="cyber-button-secondary modern-font">
                      <Archive className="h-4 w-4 mr-2" />
                      Archive Selected
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
                      <span className="modern-font text-sm cyber-text-secondary">
                        {filteredEntries.length} entries • {user?.plan} plan
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default EntriesPage;