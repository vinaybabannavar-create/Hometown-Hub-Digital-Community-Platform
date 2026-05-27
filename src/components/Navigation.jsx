import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Navigation({ currentPage, setCurrentPage }) {
  const { currentUser, notifications } = useContext(AppContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const unreadCount = notifications.filter(n => n.userId === currentUser.id && !n.read).length;

  const navItems = [
    { id: "feed", label: "Community Feed", icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
    )},
    { id: "events", label: "Local Events", icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    )},
    { id: "profile", label: "My Roots Profile", icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    )},
    { id: "pandit", label: "Pandit Onboarding", icon: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
    )},
  ];

  // Conditional Admin Panels based on role
  const isCommAdmin = currentUser.role === "community_admin" || currentUser.role === "platform_admin";
  const isPlatformAdmin = currentUser.role === "platform_admin";

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setShowMobileMenu(false);
  };

  return (
    <>
      {/* Sidebar - Desktop */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">🏡</div>
          <div className="brand-text">
            <span>Hometown</span>
            <span className="brand-sub">Hub</span>
          </div>
        </div>

        <div className="user-profile-summary">
          <img src={currentUser.avatar} alt={currentUser.name} className="user-summary-avatar" />
          <div className="user-summary-info">
            <div className="user-summary-name">{currentUser.name}</div>
            <div className="user-summary-roots">📍 {currentUser.hometown.split(",")[0]} Roots</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-link ${currentPage === item.id ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.id === "feed" && unreadCount > 0 && (
                <span className="nav-badge animate-pulse">{unreadCount}</span>
              )}
            </button>
          ))}

          {isCommAdmin && (
            <>
              <div className="nav-section-title">Moderator</div>
              <button
                onClick={() => handleNavClick("comm_admin")}
                className={`nav-link admin-nav-link ${currentPage === "comm_admin" ? "active" : ""}`}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                <span>Community Admin</span>
              </button>
            </>
          )}

          {isPlatformAdmin && (
            <>
              <div className="nav-section-title">System Admin</div>
              <button
                onClick={() => handleNavClick("platform_admin")}
                className={`nav-link platform-nav-link ${currentPage === "platform_admin" ? "active" : ""}`}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
                <span>Platform Admin</span>
              </button>
            </>
          )}
        </nav>
      </aside>

      {/* Header - Mobile */}
      <header className="mobile-header">
        <div className="mobile-brand" onClick={() => setCurrentPage("feed")}>
          🏡 Hometown Hub
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {unreadCount > 0 && (
            <span className="mobile-unread-bubble" onClick={() => setCurrentPage("feed")}>
              {unreadCount}
            </span>
          )}
          <button className="mobile-menu-toggle" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {showMobileMenu && (
        <div className="mobile-drawer animate-fade">
          <div className="drawer-close-row">
            <button className="drawer-close" onClick={() => setShowMobileMenu(false)}>✕ Close</button>
          </div>
          <div className="mobile-user-summary">
            <img src={currentUser.avatar} alt={currentUser.name} className="user-summary-avatar" />
            <div>
              <h3>{currentUser.name}</h3>
              <p>📍 {currentUser.hometown}</p>
            </div>
          </div>
          <nav className="mobile-nav-list">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`mobile-nav-btn ${currentPage === item.id ? "active" : ""}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            {isCommAdmin && (
              <button
                onClick={() => handleNavClick("comm_admin")}
                className={`mobile-nav-btn admin-btn ${currentPage === "comm_admin" ? "active" : ""}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                <span>Community Admin</span>
              </button>
            )}

            {isPlatformAdmin && (
              <button
                onClick={() => handleNavClick("platform_admin")}
                className={`mobile-nav-btn platform-btn ${currentPage === "platform_admin" ? "active" : ""}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>
                <span>Platform Admin</span>
              </button>
            )}
          </nav>
        </div>
      )}

      {/* Modern styles to append inline for the navigation layout in index.css */}
      <style dangerouslySetInnerHTML={{__html: `
        .sidebar {
          width: 280px;
          background: rgba(18, 24, 41, 0.8);
          border-right: 1px solid var(--glass-border);
          backdrop-filter: var(--glass-blur);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          height: 100vh;
          position: sticky;
          top: 0;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .brand-logo {
          font-size: 2rem;
        }

        .brand-text {
          font-family: var(--font-title);
          font-weight: 800;
          font-size: 1.35rem;
          line-height: 1.1;
          display: flex;
          flex-direction: column;
        }

        .brand-sub {
          color: var(--accent-primary);
          font-size: 0.9rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-top: -2px;
        }

        .user-profile-summary {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 0.75rem;
        }

        .user-summary-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--accent-primary);
        }

        .user-summary-info {
          display: flex;
          flex-direction: column;
        }

        .user-summary-name {
          font-weight: 600;
          font-size: 0.9rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 140px;
        }

        .user-summary-roots {
          font-size: 0.75rem;
          color: var(--accent-primary);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          font-family: var(--font-title);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: var(--transition-fast);
          width: 100%;
          text-align: left;
          position: relative;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.04);
          color: var(--text-primary);
        }

        .nav-link.active {
          background: var(--accent-glow);
          color: var(--accent-primary);
          border-left: 3px solid var(--accent-primary);
        }

        .nav-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .nav-badge {
          position: absolute;
          right: 12px;
          background-color: var(--accent-primary);
          color: #0a0f1d;
          font-size: 0.75rem;
          font-weight: bold;
          padding: 0.1rem 0.4rem;
          border-radius: 20px;
        }

        .nav-section-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
        }

        .admin-nav-link.active {
          background: rgba(59, 130, 246, 0.1);
          color: var(--accent-secondary);
          border-left-color: var(--accent-secondary);
        }

        .platform-nav-link.active {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
          border-left-color: var(--warning);
        }

        /* Mobile Header */
        .mobile-header {
          display: none;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--glass-border);
          padding: 1rem;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .mobile-brand {
          font-family: var(--font-title);
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--text-primary);
          cursor: pointer;
        }

        .mobile-unread-bubble {
          background: var(--accent-primary);
          color: #0a0f1d;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: bold;
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu-toggle {
          background: transparent;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 280px;
          height: 100vh;
          background: var(--bg-secondary);
          border-left: 1px solid var(--glass-border);
          z-index: 1001;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: var(--shadow-lg);
        }

        .drawer-close-row {
          display: flex;
          justify-content: flex-end;
        }

        .drawer-close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.9rem;
          cursor: pointer;
        }

        .mobile-user-summary {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 1.5rem;
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mobile-nav-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-title);
          font-weight: 600;
          font-size: 1rem;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }

        .mobile-nav-btn.active {
          background: var(--accent-glow);
          color: var(--accent-primary);
        }

        .mobile-nav-btn.admin-btn.active {
          background: rgba(59, 130, 246, 0.1);
          color: var(--accent-secondary);
        }

        .mobile-nav-btn.platform-btn.active {
          background: rgba(245, 158, 11, 0.1);
          color: var(--warning);
        }

        @media (max-width: 1024px) {
          .sidebar {
            display: none;
          }
          .mobile-header {
            display: flex;
          }
        }
      `}} />
    </>
  );
}
