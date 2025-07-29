import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import EntriesPage from "./components/EntriesPage";
import UpgradePage from "./components/UpgradePage";
import SignOutConfirmation from "./components/SignOutConfirmation";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false); // Global theme state

  // Apply theme class to body globally
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
      document.documentElement.classList.add('light-mode'); // Also apply to html element
    } else {
      document.body.classList.remove('light-mode');
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setShowSignOutConfirmation(true);
  };

  const confirmLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowSignOutConfirmation(false);
  };

  const cancelLogout = () => {
    setShowSignOutConfirmation(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        {!isLoggedIn ? (
          <LandingPage onLogin={handleLogin} />
        ) : showSignOutConfirmation ? (
          <SignOutConfirmation 
            onConfirm={confirmLogout}
            onCancel={cancelLogout}
            user={currentUser}
          />
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard user={currentUser} onLogout={handleLogout} isLightMode={isLightMode} toggleTheme={toggleTheme} />} />
            <Route path="/entries" element={<EntriesPage user={currentUser} onLogout={handleLogout} isLightMode={isLightMode} toggleTheme={toggleTheme} />} />
            <Route path="/upgrade" element={<UpgradePage user={currentUser} onLogout={handleLogout} isLightMode={isLightMode} toggleTheme={toggleTheme} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;