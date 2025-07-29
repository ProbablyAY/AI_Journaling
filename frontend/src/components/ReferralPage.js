import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { 
  UserPlus, 
  Copy, 
  Share2, 
  Mail, 
  MessageCircle, 
  Users, 
  Gift, 
  Crown,
  Sparkles,
  Check,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';

const ReferralPage = ({ user, onBack }) => {
  const [referralCode] = useState('ECHO' + user?.name?.replace(/\s+/g, '').toUpperCase().slice(0, 4) + '2025');
  const [referralLink] = useState(`https://echodiary.com/join?ref=${referralCode}`);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShare = (platform) => {
    const message = "Check out EchoDiary - an amazing AI-powered journaling app that's transformed how I reflect on my day! Join me and we both get free premium time.";
    const encodedMessage = encodeURIComponent(message);
    const encodedLink = encodeURIComponent(referralLink);
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}&quote=${encodedMessage}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedLink}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Join me on EchoDiary&body=${encodedMessage}%0A%0A${encodedLink}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const benefits = [
    {
      icon: Gift,
      title: "1 Month Free",
      description: "For each friend who joins",
      color: "text-yellow-400"
    },
    {
      icon: Crown,
      title: "Up to 6 Months",
      description: "Maximum free premium time",
      color: "text-purple-400"
    },
    {
      icon: Sparkles,
      title: "Exclusive Features",
      description: "Early access to new features",
      color: "cyber-text-accent"
    }
  ];

  const stats = [
    { label: "Friends Referred", value: "0", target: "Invite your first friend!" },
    { label: "Free Months Earned", value: "0", target: "Start earning today" },
    { label: "Referral Rank", value: "Beginner", target: "Climb the leaderboard" }
  ];

  return (
    <div className="min-h-screen relative z-10 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
            <UserPlus className="h-10 w-10 text-white" />
          </div>
          <h1 className="tech-font text-5xl font-bold gradient-text mb-6">
            Refer & Earn
          </h1>
          <p className="modern-font text-xl cyber-text-secondary max-w-2xl mx-auto leading-relaxed">
            Share EchoDiary with friends and earn free premium time for both of you!
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="cyber-card p-8 text-center">
              <benefit.icon className={`h-12 w-12 mx-auto mb-4 ${benefit.color}`} />
              <h3 className="tech-font text-xl font-semibold cyber-text-primary mb-2">
                {benefit.title}
              </h3>
              <p className="modern-font text-sm cyber-text-secondary">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Referral Link Section */}
        <div className="cyber-card p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="tech-font text-2xl font-bold cyber-text-primary mb-4">
              Your Referral Link
            </h2>
            <p className="modern-font cyber-text-secondary">
              Share this link with friends to start earning rewards
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Referral Code */}
            <div className="text-center">
              <p className="modern-font text-sm cyber-text-secondary mb-2">Your Referral Code:</p>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-lg px-4 py-2">
                <span className="tech-font text-xl font-bold cyber-text-neon">{referralCode}</span>
              </div>
            </div>

            {/* Copy Link */}
            <div className="flex items-center space-x-2">
              <Input
                value={referralLink}
                readOnly
                className="cyber-input modern-font flex-1"
              />
              <Button 
                onClick={handleCopyLink}
                className="cyber-button-primary px-6"
              >
                {copySuccess ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    <span className="text-white">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    <span className="text-white">Copy</span>
                  </>
                )}
              </Button>
            </div>

            {/* Social Share Buttons */}
            <div className="text-center">
              <p className="modern-font text-sm cyber-text-secondary mb-4">Or share directly:</p>
              <div className="flex justify-center space-x-3">
                <Button 
                  variant="outline" 
                  className="cyber-button-secondary"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  className="cyber-button-secondary"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  className="cyber-button-secondary"
                  onClick={() => handleShare('linkedin')}
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  className="cyber-button-secondary"
                  onClick={() => handleShare('email')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="cyber-card p-8 mb-12">
          <h2 className="tech-font text-2xl font-bold cyber-text-primary mb-6 text-center">
            Your Referral Stats
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
                <div className="text-3xl font-bold cyber-text-neon mb-2">{stat.value}</div>
                <div className="modern-font font-semibold cyber-text-primary mb-1">{stat.label}</div>
                <div className="modern-font text-sm cyber-text-secondary">{stat.target}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="cyber-card p-8 mb-12">
          <h2 className="tech-font text-2xl font-bold cyber-text-primary mb-6 text-center">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                <Share2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="tech-font text-lg font-semibold cyber-text-primary mb-2">1. Share Your Link</h3>
              <p className="modern-font text-sm cyber-text-secondary">Send your referral link to friends via social media, email, or messaging</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="tech-font text-lg font-semibold cyber-text-primary mb-2">2. Friend Joins</h3>
              <p className="modern-font text-sm cyber-text-secondary">Your friend signs up using your link and starts their journaling journey</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="tech-font text-lg font-semibold cyber-text-primary mb-2">3. Earn Rewards</h3>
              <p className="modern-font text-sm cyber-text-secondary">Both you and your friend receive 1 month of premium features for free</p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="text-center cyber-text-secondary text-sm">
          <p className="mb-2">Terms & Conditions apply. Maximum 6 months of free premium time per account.</p>
          <p>Referral rewards are applied after your friend completes their first journal entry.</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;