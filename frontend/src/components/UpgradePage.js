import React, { useState } from 'react';
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
  Check,
  Menu,
  X,
  Star,
  Zap,
  Shield,
  Sparkles,
  TrendingUp,
  Rocket,
  Database,
  BarChart3,
  Lock
} from 'lucide-react';
import { pricingPlans } from '../mock';

const UpgradePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Standard');

  const navigationItems = [
    { icon: Home, label: "Today's Entry", active: false, onClick: () => navigate('/'), gradient: "from-cyan-400 to-blue-500" },
    { icon: BookOpen, label: "My Entries", active: false, onClick: () => navigate('/entries'), gradient: "from-purple-400 to-pink-500" },
    { icon: Download, label: "Export", active: false, onClick: () => {}, gradient: "from-green-400 to-emerald-500" },
    { icon: Crown, label: "Upgrade", active: true, onClick: () => {}, gradient: "from-yellow-400 to-orange-500" },
    { icon: Settings, label: "Settings", active: false, onClick: () => {}, gradient: "from-gray-400 to-slate-500" },
    { icon: LogOut, label: "Logout", active: false, onClick: onLogout, gradient: "from-red-400 to-pink-500" }
  ];

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
    // Mock subscription process
    console.log(`Selected plan: ${planName}`);
  };

  const planIcons = {
    'Free Plan': Shield,
    'Standard': Zap,
    'Pro': Crown
  };

  const planGradients = {
    'Free Plan': 'from-gray-400 to-slate-500',
    'Standard': 'from-purple-400 to-pink-500',
    'Pro': 'from-yellow-400 to-orange-500'
  };

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

            {/* Current Plan Info */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <div className="flex items-center space-x-3 mb-3">
                <Crown className="h-5 w-5 text-yellow-400" />
                <span className="modern-font font-semibold cyber-text-primary">Current Plan</span>
              </div>
              <div className="space-y-1">
                <div className="cyber-text-neon font-bold">{user?.plan} Plan</div>
                <div className="cyber-text-secondary text-sm">Member since {user?.joinedDate}</div>
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
          <h1 className="tech-font text-xl font-bold cyber-text-primary">Upgrade</h1>
          <div className="w-8"></div>
        </div>

        {/* Upgrade Content */}
        <div className="h-full p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Rocket className="h-10 w-10 cyber-text-neon" />
                <h1 className="tech-font text-5xl font-bold gradient-text">
                  Choose Your Plan
                </h1>
              </div>
              <p className="modern-font text-xl cyber-text-secondary max-w-3xl mx-auto leading-relaxed">
                Unlock the full potential of your journaling journey. Choose a plan that evolves with your needs and helps you capture every meaningful moment.
              </p>
              
              {/* Floating elements */}
              <div className="relative mt-8">
                <div className="absolute -top-4 left-1/4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute -top-2 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-2 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-700"></div>
              </div>
            </div>

            {/* Current Plan Status Card */}
            <div className="mb-12">
              <div className="cyber-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500">
                      <Crown className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="tech-font text-xl font-semibold cyber-text-primary">
                        Current Plan: {user?.plan} Plan
                      </h3>
                      <p className="modern-font text-sm cyber-text-secondary">
                        Member since {user?.joinedDate} • Next billing: Feb 15, 2025
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-300 tech-font">
                    {user?.plan}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Enhanced Pricing Cards */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {pricingPlans.map((plan, index) => {
                const IconComponent = planIcons[plan.name];
                return (
                  <div 
                    key={index} 
                    className={`pricing-card relative ${plan.popular ? 'scale-105 lg:scale-110' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="popular-badge flex items-center space-x-2">
                          <Star className="h-3 w-3" />
                          <span>Most Popular</span>
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-6">
                      <div className="mb-6">
                        <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${planGradients[plan.name]} flex items-center justify-center mb-4`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        
                        <CardTitle className="tech-font text-2xl cyber-text-primary mb-2">
                          {plan.name}
                        </CardTitle>
                        
                        <div className="flex items-baseline justify-center space-x-2">
                          <span className="tech-font text-5xl font-bold gradient-text">
                            {plan.price}
                          </span>
                          {plan.period !== 'forever' && (
                            <span className="modern-font text-sm cyber-text-secondary">
                              /{plan.period}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="px-6 pb-8">
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mt-0.5">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="modern-font text-sm cyber-text-secondary">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        onClick={() => handlePlanSelect(plan.name)}
                        className={`w-full modern-font py-3 font-semibold transition-all duration-300 ${
                          plan.name === user?.plan 
                            ? 'cyber-button-secondary opacity-60 cursor-not-allowed' 
                            : plan.popular 
                              ? 'cyber-button-primary' 
                              : 'cyber-button-secondary'
                        }`}
                        disabled={plan.name === user?.plan}
                      >
                        {plan.name === user?.plan 
                          ? 'Current Plan' 
                          : plan.name === 'Free Plan' 
                            ? 'Downgrade' 
                            : 'Upgrade Now'
                        }
                      </Button>
                    </CardContent>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Features Comparison */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <BarChart3 className="h-6 w-6 cyber-text-accent" />
                  <h2 className="tech-font text-3xl font-bold cyber-text-primary">
                    Feature Comparison
                  </h2>
                </div>
                <p className="modern-font cyber-text-secondary">
                  See what's included in each plan
                </p>
              </div>
              
              <div className="cyber-card p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/20">
                        <th className="text-left py-4 modern-font font-semibold cyber-text-primary">
                          Feature
                        </th>
                        <th className="text-center py-4 modern-font font-semibold cyber-text-primary">
                          <div className="flex items-center justify-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span>Free</span>
                          </div>
                        </th>
                        <th className="text-center py-4 modern-font font-semibold cyber-text-primary">
                          <div className="flex items-center justify-center space-x-2">
                            <Zap className="h-4 w-4" />
                            <span>Standard</span>
                          </div>
                        </th>
                        <th className="text-center py-4 modern-font font-semibold cyber-text-primary">
                          <div className="flex items-center justify-center space-x-2">
                            <Crown className="h-4 w-4" />
                            <span>Pro</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="modern-font text-sm">
                      {[
                        { feature: 'Entry History', free: '7 days', standard: '365 days', pro: 'Unlimited', icon: Database },
                        { feature: 'AI Journaling', free: true, standard: true, pro: true, icon: Sparkles },
                        { feature: 'Export Options', free: 'None', standard: 'PDF, Word', pro: 'All formats', icon: Download },
                        { feature: 'Mood Tracking', free: 'Basic', standard: true, pro: true, icon: BarChart3 },
                        { feature: 'Advanced Analytics', free: false, standard: false, pro: true, icon: TrendingUp },
                        { feature: 'Priority Support', free: false, standard: false, pro: true, icon: Rocket },
                        { feature: 'End-to-End Encryption', free: true, standard: true, pro: true, icon: Lock }
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-purple-500/10">
                          <td className="py-4 cyber-text-secondary">
                            <div className="flex items-center space-x-3">
                              <row.icon className="h-4 w-4 cyber-text-accent" />
                              <span>{row.feature}</span>
                            </div>
                          </td>
                          <td className="text-center py-4">
                            {typeof row.free === 'boolean' ? (
                              row.free ? (
                                <Check className="h-4 w-4 mx-auto text-green-400" />
                              ) : (
                                <X className="h-4 w-4 mx-auto cyber-text-secondary opacity-50" />
                              )
                            ) : (
                              <span className="cyber-text-secondary">{row.free}</span>
                            )}
                          </td>
                          <td className="text-center py-4">
                            {typeof row.standard === 'boolean' ? (
                              row.standard ? (
                                <Check className="h-4 w-4 mx-auto text-green-400" />
                              ) : (
                                <X className="h-4 w-4 mx-auto cyber-text-secondary opacity-50" />
                              )
                            ) : (
                              <span className="cyber-text-secondary">{row.standard}</span>
                            )}
                          </td>
                          <td className="text-center py-4">
                            {typeof row.pro === 'boolean' ? (
                              row.pro ? (
                                <Check className="h-4 w-4 mx-auto text-green-400" />
                              ) : (
                                <X className="h-4 w-4 mx-auto cyber-text-secondary opacity-50" />
                              )
                            ) : (
                              <span className="cyber-text-secondary">{row.pro}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Enhanced FAQ Section */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Sparkles className="h-6 w-6 cyber-text-neon" />
                <h2 className="tech-font text-3xl font-bold cyber-text-primary">
                  Questions?
                </h2>
              </div>
              <p className="modern-font cyber-text-secondary mb-8 text-lg">
                Need help choosing the right plan? Our team is here to guide you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="cyber-button-secondary modern-font">
                  <Shield className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" className="cyber-button-secondary modern-font">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View FAQ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;