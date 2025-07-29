import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
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
  Trash2
} from 'lucide-react';
import { mockEntries } from '../mock';

const EntriesPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredEntries, setFilteredEntries] = useState(mockEntries);

  const navigationItems = [
    { icon: Home, label: "Today's Entry", active: false, onClick: () => navigate('/') },
    { icon: BookOpen, label: "My Entries", active: true, onClick: () => {} },
    { icon: Download, label: "Export", active: false, onClick: () => {} },
    { icon: Crown, label: "Upgrade", active: false, onClick: () => navigate('/upgrade') },
    { icon: Settings, label: "Settings", active: false, onClick: () => {} },
    { icon: LogOut, label: "Logout", active: false, onClick: onLogout }
  ];

  const moods = ['all', 'Reflective', 'Grateful', 'Excited', 'Contemplative', 'Peaceful', 'Energetic'];
  const months = ['all', 'January 2025', 'December 2024', 'November 2024'];

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
          <h1 className="handwritten text-2xl font-bold ink-text">My Entries</h1>
          <div className="w-8"></div>
        </div>

        {/* Entries Content */}
        <div className="h-full p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header - Desktop */}
            <div className="hidden md:block mb-8">
              <h1 className="serif text-4xl font-semibold ink-text mb-2">
                My Entries
              </h1>
              <p className="sans-serif text-lg ink-text opacity-70">
                Browse and search through your journal entries
              </p>
            </div>

            {/* Filters and Search */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ink-text opacity-50" />
                  <Input
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 paper-texture"
                  />
                </div>

                {/* Mood Filter */}
                <Select value={selectedMood} onValueChange={setSelectedMood}>
                  <SelectTrigger className="w-full md:w-48 paper-texture">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {moods.map((mood) => (
                      <SelectItem key={mood} value={mood}>
                        {mood === 'all' ? 'All Moods' : mood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Date Filter */}
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-full md:w-48 paper-texture">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month === 'all' ? 'All Time' : month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Results Count */}
              <p className="sans-serif text-sm ink-text opacity-70">
                Showing {filteredEntries.length} entries
              </p>
            </div>

            {/* Entries List */}
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <Card key={entry.id} className="paper-texture journal-shadow fade-in">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <p className="sans-serif text-sm ink-text opacity-70">
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {entry.mood}
                          </Badge>
                          <span className="sans-serif text-xs ink-text opacity-50">
                            {entry.duration}
                          </span>
                        </div>
                        
                        <p className="sans-serif ink-text leading-relaxed mb-4">
                          {entry.preview}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {entry.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="nav-hover">
                          <Eye className="h-4 w-4 mr-2" />
                          <span className="mobile-hidden">Read as conversation</span>
                          <span className="md:hidden">Read</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="nav-hover">
                          <Edit className="h-4 w-4 mr-2" />
                          <span className="mobile-hidden">Edit</span>
                        </Button>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="nav-hover">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="nav-hover text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredEntries.length === 0 && (
                <Card className="paper-texture journal-shadow">
                  <CardContent className="p-12 text-center">
                    <BookOpen className="h-12 w-12 mx-auto ink-text opacity-30 mb-4" />
                    <h3 className="serif text-xl ink-text mb-2">No entries found</h3>
                    <p className="sans-serif ink-text opacity-70 mb-6">
                      Try adjusting your search terms or filters
                    </p>
                    <Button 
                      onClick={() => navigate('/')}
                      className="btn-primary sans-serif"
                    >
                      Start Your First Entry
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Bulk Actions */}
            {filteredEntries.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" className="btn-secondary sans-serif">
                      <Download className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                    <Button variant="outline" className="btn-secondary sans-serif">
                      Merge Selected
                    </Button>
                  </div>
                  
                  <p className="sans-serif text-sm ink-text opacity-70">
                    {filteredEntries.length} total entries • {user?.plan} plan
                  </p>
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