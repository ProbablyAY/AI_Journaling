import React, { useState } from "react";
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
        <Routes>
          <Route 
            path="/" 
            element={
              isLoggedIn ? (
                <Dashboard user={currentUser} onLogout={handleLogout} />
              ) : (
                <LandingPage onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/entries" 
            element={
              isLoggedIn ? (
                <EntriesPage user={currentUser} onLogout={handleLogout} />
              ) : (
                <LandingPage onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/upgrade" 
            element={
              isLoggedIn ? (
                <UpgradePage user={currentUser} onLogout={handleLogout} />
              ) : (
                <LandingPage onLogin={handleLogin} />
              )
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;