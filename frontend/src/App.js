import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import EntriesPage from "./components/EntriesPage";
import UpgradePage from "./components/UpgradePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
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