import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function ProfilePage() {
  const { currentUser, posts, events, communities } = useContext(AppContext);
  const [bioInput, setBioInput] = useState(currentUser.bio);
  const [showEdit, setShowEdit] = useState(false);

  // Compute profile statistics
  const userPosts = posts.filter(p => p.userId === currentUser.id);
  const joinedHubs = communities.filter(c => c.members.includes(currentUser.id));
  const rsvps = events.filter(e => e.attendees.includes(currentUser.id));

  const handleBioSave = (e) => {
    e.preventDefault();
    currentUser.bio = bioInput; // Sync in-memory directly since currentUser is in context state
    setShowEdit(false);
    alert("Profile bio updated successfully!");
  };

  return (
    <div className="profile-layout animate-fade">
      {/* Profile Card */}
      <div className="glass-card profile-main-card">
        <div className="profile-bg-pattern"></div>
        
        <div className="profile-avatar-row">
          <img src={currentUser.avatar} alt={currentUser.name} className="profile-lg-avatar" />
          <div className="profile-basic-details">
            <h2 className="profile-name">{currentUser.name}</h2>
            <div className="profile-role-badge">
              <span className="badge badge-primary">{currentUser.role}</span>
            </div>
            <p className="profile-joined-txt">Member since {new Date(currentUser.joinedDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>
          </div>
          <button onClick={() => setShowEdit(!showEdit)} className="btn btn-secondary btn-sm profile-edit-btn">
            {showEdit ? "Cancel Edit" : "⚙️ Edit Bio"}
          </button>
        </div>

        {/* Roots Lineage Block */}
        <div className="profile-roots-card glass-card">
          <div className="roots-item">
            <span className="roots-icon">🏡 Roots Hometown</span>
            <span className="roots-value">{currentUser.hometown}</span>
          </div>
          <div className="roots-divider-line"></div>
          <div className="roots-item">
            <span className="roots-icon">📍 Migrated Location</span>
            <span className="roots-value">{currentUser.currentLocation}</span>
          </div>
        </div>

        {/* Bio Section */}
        <div className="profile-bio-block">
          {showEdit ? (
            <form onSubmit={handleBioSave}>
              <div className="form-group">
                <label className="form-label">Customize Your Bio / Story</label>
                <textarea
                  className="form-input form-textarea"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  placeholder="Share your childhood memories, which school you went to, or what you miss most about home..."
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm">Save Bio</button>
            </form>
          ) : (
            <div>
              <h3 className="profile-section-title">My Hometown Story</h3>
              <p className="profile-bio-text">
                {currentUser.bio || "No story cataloged yet. Let your hometown friends know about your journey!"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Profile Stats and Communities */}
      <div className="profile-stats-grid">
        {/* Roster of Stats */}
        <div className="glass-card profile-counters-card">
          <h3 className="profile-section-title">📊 Milestones & Contributions</h3>
          
          <div className="stats-counters-list">
            <div className="counter-row">
              <span className="counter-badge">📝</span>
              <div className="counter-details">
                <div className="counter-val">{userPosts.length}</div>
                <div className="counter-lbl">Hometown Posts Shared</div>
              </div>
            </div>

            <div className="counter-row">
              <span className="counter-badge">🎟️</span>
              <div className="counter-details">
                <div className="counter-val">{rsvps.length}</div>
                <div className="counter-lbl">Reunions & RSVPs Registered</div>
              </div>
            </div>

            <div className="counter-row">
              <span className="counter-badge">🛡️</span>
              <div className="counter-details">
                <div className="counter-val">
                  {currentUser.role === "platform_admin" ? "Global Admin" : currentUser.role === "community_admin" ? "Hub Moderator" : "Hometown Citizen"}
                </div>
                <div className="counter-lbl">Membership Level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Joined Communities List */}
        <div className="glass-card profile-joined-hubs-card">
          <h3 className="profile-section-title">🏡 My Active Hometown Hubs ({joinedHubs.length})</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: "1rem" }}>
            Communities you actively participate in and receive weather/news updates from.
          </p>

          <div className="profile-hubs-roster">
            {joinedHubs.map(c => (
              <div key={c.id} className="profile-hub-chip glass-card">
                <span className="hub-chip-emoji">📍</span>
                <div>
                  <div className="hub-chip-name">{c.name}</div>
                  <div className="hub-chip-meta">{c.memberCount} citizens reconnected</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .profile-layout {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .profile-main-card {
          padding: 0 !important;
          border-radius: var(--radius-md);
          overflow: hidden;
          position: relative;
        }

        .profile-bg-pattern {
          height: 120px;
          background: linear-gradient(135deg, var(--accent-secondary) 0%, var(--accent-primary) 100%);
          opacity: 0.25;
          border-bottom: 1px solid var(--glass-border);
        }

        .profile-avatar-row {
          padding: 0 2rem;
          margin-top: -50px;
          display: flex;
          align-items: flex-end;
          gap: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .profile-lg-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid var(--bg-secondary);
          box-shadow: var(--shadow-md);
        }

        .profile-basic-details {
          flex: 1;
          padding-bottom: 0.5rem;
        }

        .profile-name {
          font-size: 1.5rem;
          line-height: 1.2;
        }

        .profile-role-badge {
          margin: 0.15rem 0;
        }

        .profile-joined-txt {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .profile-edit-btn {
          margin-bottom: 0.5rem;
        }

        @media (max-width: 600px) {
          .profile-avatar-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top: -60px;
          }
          .profile-edit-btn {
            width: 100%;
          }
        }

        .profile-roots-card {
          margin: 1.5rem 2rem !important;
          padding: 1rem !important;
          display: flex;
          justify-content: space-around;
          align-items: center;
          background: rgba(255,255,255,0.01) !important;
        }

        .roots-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .roots-icon {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .roots-value {
          font-weight: bold;
          font-size: 1rem;
          color: var(--accent-primary);
        }

        .roots-divider-line {
          width: 1px;
          height: 40px;
          background: var(--glass-border);
        }

        @media (max-width: 480px) {
          .profile-roots-card {
            flex-direction: column;
            gap: 1rem;
          }
          .roots-divider-line {
            display: none;
          }
        }

        .profile-bio-block {
          padding: 0 2rem 2rem 2rem;
        }

        .profile-section-title {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 0.25rem;
        }

        .profile-bio-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
          white-space: pre-line;
        }

        .profile-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .profile-stats-grid {
            grid-template-columns: 1fr;
          }
        }

        .stats-counters-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .counter-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .counter-badge {
          width: 36px;
          height: 36px;
          background: var(--bg-tertiary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .counter-details {
          display: flex;
          flex-direction: column;
        }

        .counter-val {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .counter-lbl {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .profile-hubs-roster {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .profile-hub-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem !important;
        }

        .hub-chip-emoji {
          font-size: 1.2rem;
        }

        .hub-chip-name {
          font-weight: bold;
          font-size: 0.85rem;
        }

        .hub-chip-meta {
          font-size: 0.7rem;
          color: var(--text-muted);
        }
      `}} />
    </div>
  );
}
