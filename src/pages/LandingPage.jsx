import React from "react";

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-wrapper animate-fade">
      {/* Hero Header */}
      <section className="hero-section">
        <div className="badge badge-primary animate-pulse" style={{ marginBottom: "1rem" }}>
          🌱 Preserving Local Culture & Reconnecting Roots
        </div>
        <h1 className="hero-title">
          Your Hometown, <span className="gradient-text">Only Closer.</span>
        </h1>
        <p className="hero-subtitle">
          Migrating for work or education shouldn't mean losing touch with your roots. Connect with your city or village, share local news, preserve traditions, and collaborate on community initiatives.
        </p>
        <div className="hero-buttons">
          <button onClick={() => onGetStarted("signup")} className="btn btn-primary btn-lg">
            🏡 Claim Your Hometown Hub
          </button>
          <button onClick={() => onGetStarted("login")} className="btn btn-secondary btn-lg">
            🔑 Log In to Your Roots
          </button>
        </div>
      </section>

      {/* Grid of Key Hyperlocal Challenges & Solutions */}
      <section className="problem-solution-section">
        <h2 className="section-title">Why Hometown Hub?</h2>
        <p className="section-subtitle">Hyperlocal community networks face challenges that broad social media cannot address.</p>
        
        <div className="features-grid">
          <div className="glass-card feature-card">
            <div className="feature-icon-wrapper">🌍</div>
            <h3>Ditch Scattered Groups</h3>
            <p>Say goodbye to cluttered WhatsApp lists. Centralize all village, city, and cultural updates under one structured roof.</p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon-wrapper">📢</div>
            <h3>Local Announcements</h3>
            <p>Pin high-priority agricultural subsidies, local monsoons reports, infrastructure alerts, or village news for global visibility.</p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon-wrapper">📅</div>
            <h3>Reunion & Events</h3>
            <p>Plan native food feasts, community festivals, and online/offline meetups for youngsters who migrated to the same cities.</p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon-wrapper">🏺</div>
            <h3>Preserve Heritage</h3>
            <p>Allow local guides and expert community leaders ("Pandits") to onboard historical villages, catalog folklore, and pass down customs.</p>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="landing-stats glass-card">
        <div className="stat-item">
          <div className="stat-number">720+</div>
          <div className="stat-label">Active Communities</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">45K+</div>
          <div className="stat-label">Migrated Youngsters Reconnected</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">1,200+</div>
          <div className="stat-label">Cultural Events Hosted</div>
        </div>
      </section>

      {/* Pandit Highlight Section */}
      <section className="pandit-teaser-section glass-card">
        <div className="pandit-teaser-content">
          <div className="badge badge-success">Pandit Onboarding</div>
          <h2>Are you a Local Expert or Organizer?</h2>
          <p>
            Help your town or village grow. Apply as a **Pandit (Local Community Guide)** to launch new geographic hubs, verify member requests, maintain guidelines, and lead cultural programs.
          </p>
          <button onClick={() => onGetStarted("signup")} className="btn btn-primary" style={{ marginTop: "1rem" }}>
            🌟 Onboard as a Pandit
          </button>
        </div>
        <div className="pandit-teaser-graphic">
          🏔️
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .landing-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .section-title {
          text-align: center;
          font-size: 2.25rem;
          font-family: var(--font-title);
          margin-top: 4rem;
        }

        .section-subtitle {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .feature-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: var(--transition-smooth);
        }

        .feature-card h3 {
          font-size: 1.2rem;
          margin: 0.75rem 0 0.5rem;
          color: var(--text-primary);
        }

        .feature-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .landing-stats {
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 2.5rem !important;
          margin: 4rem 0;
          text-align: center;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--accent-primary);
          font-family: var(--font-title);
          text-shadow: 0 0 15px rgba(20, 184, 166, 0.15);
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .stat-divider {
          width: 1px;
          height: 60px;
          background: var(--glass-border);
        }

        @media (max-width: 768px) {
          .landing-stats {
            flex-direction: column;
            gap: 2rem;
            padding: 1.5rem !important;
          }
          .stat-divider {
            display: none;
          }
        }

        .pandit-teaser-section {
          display: grid;
          grid-template-columns: 1fr 150px;
          gap: 2rem;
          align-items: center;
          padding: 2.5rem !important;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, var(--glass-bg) 100%) !important;
          border-color: rgba(16, 185, 129, 0.2) !important;
        }

        .pandit-teaser-content h2 {
          font-size: 1.8rem;
          margin: 0.75rem 0 0.5rem;
        }

        .pandit-teaser-content p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .pandit-teaser-graphic {
          font-size: 6rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.2));
        }

        @media (max-width: 600px) {
          .pandit-teaser-section {
            grid-template-columns: 1fr;
          }
          .pandit-teaser-graphic {
            display: none;
          }
        }
      `}} />
    </div>
  );
}
