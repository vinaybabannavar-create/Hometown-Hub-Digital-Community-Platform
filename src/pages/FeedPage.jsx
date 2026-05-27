import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import PostCard from "../components/PostCard";
import NotificationPanel from "../components/NotificationPanel";

export default function FeedPage() {
  const {
    currentUser,
    communities,
    posts,
    createPost,
    joinCommunity,
    leaveCommunity,
    createCommunityRequest,
    notifications
  } = useContext(AppContext);

  // Default active community to the first one the user is a member of, or first community
  const myCommunities = communities.filter(c => c.members.includes(currentUser.id));
  const [activeCommId, setActiveCommId] = useState(() => {
    return myCommunities.length > 0 ? myCommunities[0].id : communities[0].id;
  });

  // Post Editor Fields
  const [newPostText, setNewPostText] = useState("");
  const [newPostImage, setNewPostImage] = useState("");
  const [isAnnouncement, setIsAnnouncement] = useState(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Modal triggers
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  // Community Request Fields
  const [reqCommName, setReqCommName] = useState("");
  const [reqCommCity, setReqCommCity] = useState("");
  const [reqCommState, setReqCommState] = useState("Kerala");
  const [reqCommDesc, setReqCommDesc] = useState("");

  const activeCommunity = communities.find(c => c.id === activeCommId);
  const isMemberOfActive = activeCommunity && activeCommunity.members.includes(currentUser.id);
  const isCommAdmin = activeCommunity && (activeCommunity.adminId === currentUser.id);
  const isPlatformAdmin = currentUser.role === "platform_admin";
  const canPostAnnouncement = isCommAdmin || isPlatformAdmin;

  // Filter and sort posts for this community
  const communityPosts = posts
    .filter(p => p.communityId === activeCommId)
    .filter(p => p.content.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      // Sort by pinned first, then by date desc
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdDate) - new Date(a.createdDate);
    });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    createPost(activeCommId, newPostText, newPostImage, isAnnouncement);
    setNewPostText("");
    setNewPostImage("");
    setIsAnnouncement(false);
  };

  const handleCommunityRequestSubmit = (e) => {
    e.preventDefault();
    if (!reqCommName || !reqCommCity || !reqCommDesc) return;
    createCommunityRequest(reqCommName, reqCommCity, reqCommState, reqCommDesc);
    setReqCommName("");
    setReqCommCity("");
    setReqCommDesc("");
    setShowRequestModal(false);
    alert("Your community proposal has been submitted to the platform administrator for approval!");
  };

  const unreadCount = notifications.filter(n => n.userId === currentUser.id && !n.read).length;

  return (
    <div className="feed-layout animate-fade">
      {/* Community Select Grid/Sidebar */}
      <div className="feed-left-pane">
        <button onClick={() => setShowNotifPanel(true)} className="btn btn-secondary inbox-shortcut-btn">
          <span>🔔 My Inbox Alerts</span>
          {unreadCount > 0 && <span className="inbox-count-bubble">{unreadCount}</span>}
        </button>

        <div className="glass-card feed-comm-selector">
          <h3 className="pane-title">🏡 Communities</h3>
          
          <div className="comm-selection-section">
            <h4 className="comm-section-sub">My Joined Hubs</h4>
            {myCommunities.length > 0 ? (
              myCommunities.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCommId(c.id)}
                  className={`comm-selector-btn ${activeCommId === c.id ? "active" : ""}`}
                >
                  <span className="comm-avatar-emoji">📍</span>
                  <div className="comm-selector-info">
                    <div className="comm-selector-name">{c.name}</div>
                    <div className="comm-selector-sub">{c.memberCount} members</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="no-joined-prompt">You haven't joined any hubs yet!</div>
            )}
          </div>

          <div className="comm-selection-section" style={{ marginTop: "1rem" }}>
            <h4 className="comm-section-sub">Explore Other Hubs</h4>
            {communities.filter(c => !c.members.includes(currentUser.id)).map((c) => (
              <div key={c.id} className="explore-comm-row">
                <button
                  onClick={() => setActiveCommId(c.id)}
                  className={`comm-selector-btn explore-btn-part ${activeCommId === c.id ? "active" : ""}`}
                >
                  <span>🌐</span>
                  <div className="comm-selector-info">
                    <div className="comm-selector-name">{c.name}</div>
                    <div className="comm-selector-sub">{c.memberCount} members</div>
                  </div>
                </button>
                <button onClick={() => joinCommunity(c.id)} className="btn btn-primary btn-sm join-quick-btn">
                  Join
                </button>
              </div>
            ))}
          </div>

          <button onClick={() => setShowRequestModal(true)} className="btn btn-secondary comm-propose-btn" style={{ marginTop: "1rem" }}>
            ➕ Propose New Hub
          </button>
        </div>
      </div>

      {/* Main Feed */}
      <div className="feed-center-pane">
        {activeCommunity ? (
          <div>
            {/* Active Community Banner */}
            <div className="glass-card active-comm-header">
              <div className="comm-banner-image-container">
                <img src={activeCommunity.bannerImage} alt={activeCommunity.name} className="comm-banner-img" />
              </div>
              <div className="comm-header-content">
                <div style={{ display: "flex", justifySelf: "space-between", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h2>{activeCommunity.name}</h2>
                    <p style={{ color: "var(--accent-primary)", fontWeight: "600", fontSize: "0.9rem" }}>
                      📍 {activeCommunity.cityVillage}, {activeCommunity.state}
                    </p>
                  </div>
                  <div>
                    {isMemberOfActive ? (
                      activeCommunity.adminId !== currentUser.id && (
                        <button onClick={() => leaveCommunity(activeCommunity.id)} className="btn btn-secondary btn-sm">
                          Leave Community
                        </button>
                      )
                    ) : (
                      <button onClick={() => joinCommunity(activeCommunity.id)} className="btn btn-primary">
                        Join Community Hub
                      </button>
                    )}
                  </div>
                </div>
                <p className="comm-header-desc">{activeCommunity.description}</p>
                <div className="comm-header-stats">
                  <span>👥 <strong>{activeCommunity.memberCount}</strong> Members</span>
                  <span className="divider-bullet">•</span>
                  <span>🗓️ Created {new Date(activeCommunity.createdDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="glass-card search-container" style={{ margin: "1rem 0", padding: "0.75rem 1.5rem" }}>
              <input
                type="text"
                className="form-input search-input-styled"
                placeholder={`🔍 Search posts in ${activeCommunity.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Post Creation Editor */}
            {isMemberOfActive ? (
              <div className="glass-card post-editor-card">
                <form onSubmit={handleCreatePost}>
                  <div className="post-editor-textarea-wrapper">
                    <img src={currentUser.avatar} alt={currentUser.name} className="post-editor-avatar" />
                    <textarea
                      placeholder={`Share native roots news, crop season updates, or plan reunions here in ${activeCommunity.name}...`}
                      className="form-input post-editor-textarea"
                      required
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                    />
                  </div>

                  <div className="post-editor-image-row">
                    <span className="img-icon-label">🖼️ Image Link:</span>
                    <input
                      type="url"
                      placeholder="e.g. https://images.unsplash.com/photo-... (optional)"
                      className="form-input post-editor-image-input"
                      value={newPostImage}
                      onChange={(e) => setNewPostImage(e.target.value)}
                    />
                  </div>

                  <div className="post-editor-footer">
                    {canPostAnnouncement && (
                      <label className="announcement-checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={isAnnouncement}
                          onChange={(e) => setIsAnnouncement(e.target.checked)}
                        />
                        <span>📢 High Priority Announcement</span>
                      </label>
                    )}
                    <button type="submit" className="btn btn-primary">
                      🚀 Share Post
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="glass-card join-feed-prompt">
                <h3>🔒 Community Feed Restricted</h3>
                <p>Join the <strong>{activeCommunity.name}</strong> community to create posts, write comments, interact with hometown friends, and participate in events.</p>
                <button onClick={() => joinCommunity(activeCommunity.id)} className="btn btn-primary" style={{ marginTop: "1rem" }}>
                  Join Community Hub
                </button>
              </div>
            )}

            {/* Post Feed List */}
            <div className="feed-posts-list">
              {communityPosts.length > 0 ? (
                communityPosts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))
              ) : (
                <div className="glass-card no-posts-prompt">
                  <h3>📭 Feed is Quiet</h3>
                  <p>No posts match your keyword or exist in this community yet. Be the first to share an update!</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="glass-card no-comm-selected">
            <h2>Select a Community Hub</h2>
            <p>Choose or join a hometown/village from the left panel to view updates, discussions, and local guidelines.</p>
          </div>
        )}
      </div>

      {/* Community Sidebar Widgets */}
      <div className="feed-right-pane">
        {activeCommunity && (
          <div className="glass-card community-sidebar-card">
            <h3 className="pane-title">⚖️ Rules & Guidelines</h3>
            <ol className="guidelines-list">
              {activeCommunity.rules.map((rule, idx) => (
                <li key={idx} className="guideline-item">
                  <span className="guideline-num">{idx + 1}</span>
                  <span className="guideline-text">{rule}</span>
                </li>
              ))}
            </ol>
            <div className="community-admin-block">
              <span className="admin-block-icon">🛡️</span>
              <div>
                <div className="admin-block-label">Hub Moderator</div>
                <div className="admin-block-value">
                  {activeCommunity.adminId === currentUser.id ? "You (Admin)" : "Devi Nair (Wayanad Admin)"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Community Propose / Creation Request Modal */}
      {showRequestModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <h3>➕ Propose a New Hometown Hub</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0.5rem 0 1.5rem" }}>
              Can't find your village or town? Propose a dedicated hub. Proposals are sent to platform administrators for verification.
            </p>
            
            <form onSubmit={handleCommunityRequestSubmit}>
              <div className="form-group">
                <label className="form-label">Proposed Hub Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Wayanad Spices & Culture Hub"
                  required
                  value={reqCommName}
                  onChange={(e) => setReqCommName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">City / Village / Town</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Wayanad, Palampur"
                  required
                  value={reqCommCity}
                  onChange={(e) => setReqCommCity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">State / Region</label>
                <select
                  className="form-select"
                  value={reqCommState}
                  onChange={(e) => setReqCommState(e.target.value)}
                >
                  <option value="Kerala">Kerala</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description / Goal of Hub</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="e.g. A digital sanctuary connecting tea planter families from Palampur globally to discuss local weather and coordinate traditional feasts..."
                  required
                  value={reqCommDesc}
                  onChange={(e) => setReqCommDesc(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setShowRequestModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Proposal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dynamic Inbox Notification Drawer */}
      <NotificationPanel isOpen={showNotifPanel} onClose={() => setShowNotifPanel(false)} />

      {/* Appended Styles for Feed Layout */}
      <style dangerouslySetInnerHTML={{__html: `
        .feed-layout {
          display: grid;
          grid-template-columns: 280px 1fr 280px;
          gap: 1.5rem;
        }

        @media (max-width: 1200px) {
          .feed-layout {
            grid-template-columns: 260px 1fr;
          }
          .feed-right-pane {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .feed-layout {
            grid-template-columns: 1fr;
          }
          .feed-left-pane {
            display: none;
          }
        }

        .pane-title {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 0.5rem;
        }

        .inbox-shortcut-btn {
          width: 100%;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(20, 184, 166, 0.05);
          border-color: rgba(20, 184, 166, 0.2);
          color: var(--accent-primary);
        }

        .inbox-count-bubble {
          background: var(--accent-primary);
          color: #0a0f1d;
          font-size: 0.75rem;
          font-weight: bold;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .comm-section-sub {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .comm-selector-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          text-align: left;
          transition: var(--transition-fast);
        }

        .comm-selector-btn:hover {
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-primary);
        }

        .comm-selector-btn.active {
          background: var(--glass-highlight);
          border-left: 2.5px solid var(--accent-primary);
          color: var(--accent-primary);
        }

        .comm-avatar-emoji {
          font-size: 1.25rem;
        }

        .comm-selector-info {
          display: flex;
          flex-direction: column;
        }

        .comm-selector-name {
          font-weight: 600;
          font-size: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 180px;
        }

        .comm-selector-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .explore-comm-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.25rem;
        }

        .explore-btn-part {
          flex: 1;
        }

        .join-quick-btn {
          padding: 0.2rem 0.5rem !important;
          font-size: 0.75rem !important;
          flex-shrink: 0;
        }

        .comm-propose-btn {
          width: 100%;
          font-size: 0.85rem !important;
        }

        /* Active Comm Header */
        .active-comm-header {
          padding: 0 !important;
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .comm-banner-image-container {
          height: 140px;
          overflow: hidden;
          background: var(--bg-tertiary);
        }

        .comm-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .comm-header-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .comm-header-content h2 {
          font-size: 1.5rem;
          line-height: 1.2;
        }

        .comm-header-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .comm-header-stats {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          border-top: 1px solid var(--glass-border);
          padding-top: 0.75rem;
          margin-top: 0.25rem;
        }

        .divider-bullet {
          color: var(--text-muted);
        }

        /* Post Editor */
        .post-editor-card {
          margin-bottom: 1.5rem;
        }

        .post-editor-textarea-wrapper {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .post-editor-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }

        .post-editor-textarea {
          flex: 1;
          background: transparent;
          border: none !important;
          box-shadow: none !important;
          min-height: 80px;
          padding: 0.25rem 0;
          font-size: 0.95rem;
          resize: vertical;
        }

        .post-editor-image-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-top: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
          padding: 0.5rem 0;
          margin: 0.75rem 0;
        }

        .img-icon-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .post-editor-image-input {
          background: transparent;
          border: none !important;
          padding: 0.25rem 0 !important;
          font-size: 0.8rem;
        }

        .post-editor-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .announcement-checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          color: var(--warning);
          font-weight: bold;
          cursor: pointer;
        }

        .join-feed-prompt {
          text-align: center;
          padding: 3rem !important;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.02) 0%, var(--glass-bg) 100%) !important;
        }

        .join-feed-prompt h3 {
          margin-bottom: 0.5rem;
        }

        .no-posts-prompt {
          text-align: center;
          padding: 3rem !important;
        }

        .no-posts-prompt h3 {
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }

        .guidelines-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 1rem 0;
        }

        .guideline-item {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }

        .guideline-num {
          background: var(--accent-glow);
          color: var(--accent-primary);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          font-size: 0.65rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .guideline-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.3;
        }

        .community-admin-block {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          border-top: 1px solid var(--glass-border);
          padding-top: 0.75rem;
          margin-top: 1rem;
        }

        .admin-block-icon {
          font-size: 1.25rem;
        }

        .admin-block-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .admin-block-value {
          font-size: 0.82rem;
          font-weight: bold;
          color: var(--text-primary);
        }

        .search-input-styled {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
      `}} />
    </div>
  );
}
