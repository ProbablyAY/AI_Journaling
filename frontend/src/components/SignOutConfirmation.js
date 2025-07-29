import React from 'react';
import { Button } from './ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';

const SignOutConfirmation = ({ onConfirm, onCancel, user }) => {
  return (
    <div className="min-h-screen cyber-bg flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel}></div>
      
      {/* Modal-like Container */}
      <div className="relative z-10 cyber-container max-w-md w-full mx-auto border-0 shadow-2xl">
        <div className="p-8 text-center">
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
              <LogOut className="h-8 w-8 text-white" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="tech-font text-2xl font-bold cyber-text-primary mb-4">
            Sign Out Confirmation
          </h1>
          
          {/* User Info */}
          <div className="mb-6">
            <p className="modern-font cyber-text-secondary mb-2">
              Are you sure you want to sign out of your account?
            </p>
            {user && (
              <div className="cyber-card p-4 mt-4">
                <p className="modern-font text-sm cyber-text-secondary">
                  Signed in as: <span className="cyber-text-primary font-semibold">{user.name}</span>
                </p>
                <p className="modern-font text-xs cyber-text-secondary mt-1">
                  {user.email}
                </p>
              </div>
            )}
          </div>
          
          {/* Warning */}
          <div className="mb-8">
            <p className="modern-font text-sm cyber-text-secondary">
              You'll need to sign in again to access your journal entries and continue your journaling journey.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className="flex-1 cyber-button-secondary"
              onClick={onCancel}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
              onClick={onConfirm}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
          
          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-purple-500/20">
            <p className="modern-font text-xs cyber-text-secondary">
              Your data will remain safe and accessible when you return.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutConfirmation;