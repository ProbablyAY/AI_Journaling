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
  Shield
} from 'lucide-react';
import { pricingPlans } from '../mock';

const UpgradePage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Standard');

  const navigationItems = [
    { icon: Home, label: "Today's Entry", active: false, onClick: () => navigate('/') },
    { icon: BookOpen, label: "My Entries", active: false, onClick: () => navigate('/entries') },
    { icon: Download, label: "Export", active: false, onClick: () => {} },
    { icon: Crown, label: "Upgrade", active: true, onClick: () => {} },
    { icon: Settings, label: "Settings", active: false, onClick: () => {} },
    { icon: LogOut, label: "Logout", active: false, onClick: onLogout }
  ];

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
    // Mock subscription process
    console.log(`Selected plan: ${planName}`);
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
          <h1 className="handwritten text-2xl font-bold ink-text">Upgrade</h1>
          <div className="w-8"></div>
        </div>

        {/* Upgrade Content */}
        <div className="h-full p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="hidden md:block">
                <h1 className="serif text-4xl font-semibold ink-text mb-4">
                  Choose Your Plan
                </h1>
                <p className="sans-serif text-lg ink-text opacity-70 max-w-2xl mx-auto">
                  Unlock the full potential of your journaling journey. Choose a plan that fits your needs and helps you capture every meaningful moment.
                </p>
              </div>
              
              <div className="md:hidden">
                <h1 className="serif text-2xl font-semibold ink-text mb-2">
                  Choose Your Plan
                </h1>
                <p className="sans-serif ink-text opacity-70">
                  Unlock the full potential of your journaling journey
                </p>
              </div>
            </div>

            {/* Current Plan Status */}
            <div className="mb-8">
              <Card className="paper-texture journal-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="serif text-lg font-semibold ink-text mb-1">
                        Current Plan: {user?.plan} Plan
                      </h3>
                      <p className="sans-serif text-sm ink-text opacity-70">
                        Member since {user?.joinedDate}
                      </p>
                    </div>
                    <Badge variant="secondary" className="serif">
                      {user?.plan}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {pricingPlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`paper-texture journal-shadow relative transition-all duration-300 hover:scale-105 ${
                    plan.popular ? 'ring-2 ring-slate-400' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-slate-700 text-white serif px-3 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="mb-4">
                      {index === 0 && <Shield className="h-8 w-8 mx-auto ink-text opacity-70" />}
                      {index === 1 && <Zap className="h-8 w-8 mx-auto ink-text opacity-70" />}
                      {index === 2 && <Crown className="h-8 w-8 mx-auto ink-text opacity-70" />}
                    </div>
                    
                    <CardTitle className="serif text-2xl ink-text mb-2">
                      {plan.name}
                    </CardTitle>
                    
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="handwritten text-4xl font-bold ink-text">
                        {plan.price}
                      </span>
                      {plan.period !== 'forever' && (
                        <span className="sans-serif text-sm ink-text opacity-70">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="px-6 pb-6">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="h-4 w-4 ink-text opacity-70 mt-0.5 flex-shrink-0" />
                          <span className="sans-serif text-sm ink-text">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => handlePlanSelect(plan.name)}
                      className={`w-full sans-serif ${
                        plan.name === user?.plan 
                          ? 'btn-secondary' 
                          : plan.popular 
                            ? 'btn-primary' 
                            : 'btn-secondary'
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
                </Card>
              ))}
            </div>

            {/* Features Comparison */}
            <div className="mb-12">
              <h2 className="serif text-2xl font-semibold ink-text mb-6 text-center">
                Feature Comparison
              </h2>
              
              <Card className="paper-texture journal-shadow">
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 sans-serif font-medium ink-text">
                            Feature
                          </th>
                          <th className="text-center py-3 sans-serif font-medium ink-text">
                            Free
                          </th>
                          <th className="text-center py-3 sans-serif font-medium ink-text">
                            Standard
                          </th>
                          <th className="text-center py-3 sans-serif font-medium ink-text">
                            Pro
                          </th>
                        </tr>
                      </thead>
                      <tbody className="sans-serif text-sm">
                        <tr className="border-b border-slate-100">
                          <td className="py-3 ink-text">Entry History</td>
                          <td className="text-center py-3 ink-text opacity-70">7 days</td>
                          <td className="text-center py-3 ink-text opacity-70">365 days</td>
                          <td className="text-center py-3 ink-text opacity-70">Unlimited</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-3 ink-text">AI Journaling</td>
                          <td className="text-center py-3"><Check className="h-4 w-4 mx-auto ink-text" /></td>
                          <td className="text-center py-3"><Check className="h-4 w-4 mx-auto ink-text" /></td>
                          <td className="text-center py-3"><Check className="h-4 w-4 mx-auto ink-text" /></td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-3 ink-text">Export Options</td>
                          <td className="text-center py-3 ink-text opacity-70">None</td>
                          <td className="text-center py-3 ink-text opacity-70">PDF, Word</td>
                          <td className="text-center py-3 ink-text opacity-70">All formats</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-3 ink-text">Mood Tracking</td>
                          <td className="text-center py-3 ink-text opacity-70">Basic</td>
                          <td className="text-center py-3"><Check className="h-4 w-4 mx-auto ink-text" /></td>
                          <td className="text-center py-3"><Check className="h-4 w-4 mx-auto ink-text" /></td>
                        </tr>
                        <tr>
                          <td className="py-3 ink-text">Advanced Analytics</td>
                          <td className="text-center py-3 ink-text opacity-70">-</td>
                          <td className="text-center py-3 ink-text opacity-70">-</td>
                          <td className="text-center py-3"><Check className="h-4 w-4 mx-auto ink-text" /></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ */}
            <div className="text-center">
              <h2 className="serif text-2xl font-semibold ink-text mb-6">
                Questions?
              </h2>
              <p className="sans-serif ink-text opacity-70 mb-6">
                Need help choosing the right plan? We're here to help.
              </p>
              <Button variant="outline" className="btn-secondary sans-serif">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;