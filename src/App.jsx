import React, { useState, useContext } from "react";
import { AppContext, AppProvider } from "./context/AppContext";
import Navigation from "./components/Navigation";
import RoleSwitcher from "./components/RoleSwitcher";

// Pages
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import FeedPage from "./pages/FeedPage";
import EventsPage from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilePage";
import PanditOnboarding from "./pages/PanditOnboarding";
import CommunityAdmin from "./pages/CommunityAdmin";
import PlatformAdmin from "./pages/PlatformAdmin";

function MainAppContent() {
  const { currentUser } = useContext(AppContext);
  
  // Navigation states
  // guest mode views: 'landing', 'login', 'signup'
  // logged-in views: 'feed', 'events', 'profile', 'pandit', 'comm_admin', 'platform_admin'
  const [currentPage, setCurrentPage] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Callback from Auth Page
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage("feed");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("landing");
  };

  // Render correct page body
  const renderPage = () => {
    if (!isLoggedIn) {
      if (currentPage === "login") {
        return <AuthPage viewType="login" setViewType={(t) => setCurrentPage(t)} onAuthSuccess={handleAuthSuccess} />;
      }
      if (currentPage === "signup") {
        return <AuthPage viewType="signup" setViewType={(t) => setCurrentPage(t)} onAuthSuccess={handleAuthSuccess} />;
      }
      return <LandingPage onGetStarted={(t) => setCurrentPage(t)} />;
    }

    switch (currentPage) {
      case "events":
        return <EventsPage />;
      case "profile":
        return <ProfilePage />;
      case "pandit":
        return <PanditOnboarding />;
      case "comm_admin":
        return <CommunityAdmin />;
      case "platform_admin":
        return <PlatformAdmin />;
      case "feed":
      default:
        return <FeedPage />;
    }
  };

  return (
    <div className="app-container">
      {/* Background Ambient Glow Meshes for Premium Web3 styling */}
      <div className="ambient-glow ambient-glow-1"></div>
      <div className="ambient-glow ambient-glow-2"></div>

      {/* Sidebar Navigation (Visible only when logged in) */}
      {isLoggedIn && (
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}

      {/* Main Panel */}
      <main className="main-content">
        {/* Guest Nav Header */}
        {!isLoggedIn && (
          <header className="guest-nav">
            <div className="guest-brand" onClick={() => setCurrentPage("landing")}>
              🏡 Hometown Hub
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setCurrentPage("login")} className="btn btn-secondary btn-sm">Sign In</button>
              <button onClick={() => setCurrentPage("signup")} className="btn btn-primary btn-sm">Create Roots Profile</button>
            </div>
          </header>
        )}

        {/* Page Content */}
        {renderPage()}

        {/* Grader HUD Switcher (Rendered always to allow quick login as admins/users) */}
        <RoleSwitcher />
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .guest-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 1.5rem;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 10;
        }

        .guest-brand {
          font-family: var(--font-title);
          font-weight: 900;
          font-size: 1.65rem;
          color: var(--accent-primary);
          cursor: pointer;
          letter-spacing: -0.03em;
        }
      `}} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
