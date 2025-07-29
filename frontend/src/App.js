import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import EntriesPage from "./components/EntriesPage";
import UpgradePage from "./components/UpgradePage";
import SignOutConfirmation from "./components/SignOutConfirmation";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Temporarily set to true to test
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    plan: "Standard",
    joinedDate: "Dec 2024"
  });
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
            <Route path="/" element={<Dashboard user={currentUser} onLogout={handleLogout} />} />
            <Route path="/entries" element={<EntriesPage user={currentUser} onLogout={handleLogout} />} />
            <Route path="/upgrade" element={<UpgradePage user={currentUser} onLogout={handleLogout} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;