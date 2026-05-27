import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function CommunityAdmin() {
  const { currentUser, communities, posts, pinPost, deletePost } = useContext(AppContext);

  // Find community moderated by this user (or first community if Platform Admin is viewing)
  const isPlatformAdmin = currentUser.role === "platform_admin";
  const myCommunity = communities.find(c => c.adminId === currentUser.id || (isPlatformAdmin && c.id === "comm_wayanad"));

  // Guidelines rule editing state
  const [ruleInput, setRuleInput] = useState("");
  const [editRules, setEditRules] = useState(myCommunity ? myCommunity.rules : []);

  // Mock pending membership requests
  const [pendingMembers, setPendingMembers] = useState([
    { id: "req_mem_1", name: "Anil Deshmukh", email: "anil@gmail.com", roots: "Kalpetta", joinedDate: "2026-05-26" },
    { id: "req_mem_2", name: "Kiran Hedge", email: "kiran.h@gmail.com", roots: "Mananthavady", joinedDate: "2026-05-27" }
  ]);

  if (!myCommunity) {
    return (
      <div className="glass-card error-admin-pane animate-fade">
        <h3>🛡️ Access Restricted</h3>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
          You do not currently moderate a Hometown Hub. Switch to **Community Admin (Devi Nair)** using the HUD to try these moderator tools!
        </p>
      </div>
    );
  }

  // Filter posts in this community
  const commPosts = posts.filter(p => p.communityId === myCommunity.id);

  const handleApproveMember = (reqId, memberName) => {
    setPendingMembers(prev => prev.filter(r => r.id !== reqId));
    alert(`Approved ${memberName}'s membership request to join ${myCommunity.name}!`);
  };

  const handleRejectMember = (reqId, memberName) => {
    setPendingMembers(prev => prev.filter(r => r.id !== reqId));
    alert(`Rejected ${memberName}'s membership request.`);
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!ruleInput.trim()) return;
    const updated = [...editRules, ruleInput];
    setEditRules(updated);
    myCommunity.rules = updated; // Direct sync
    setRuleInput("");
  };

  const handleRemoveRule = (index) => {
    const updated = editRules.filter((_, idx) => idx !== index);
    setEditRules(updated);
    myCommunity.rules = updated; // Direct sync
  };

  return (
    <div className="comm-admin-layout animate-fade">
      {/* Header */}
      <div className="admin-header-row">
        <div>
          <h1 className="gradient-text">🛡️ Moderator Dashboard</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Managing: <strong>{myCommunity.name}</strong> ({myCommunity.cityVillage}, {myCommunity.state})
          </p>
        </div>
        <span className="badge badge-success">Active Moderator</span>
      </div>

      <div className="admin-grid">
        {/* Left Side: Membership Requests & Content Moderation */}
        <div className="admin-main-pane">
          {/* Member Request Buffer */}
          <div className="glass-card admin-section">
            <h3>👥 Pending Member Requests ({pendingMembers.length})</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: "1rem" }}>
              Verify resident roots/bios of migrated youths before granting access to community discussions.
            </p>

            {pendingMembers.length > 0 ? (
              <div className="req-list">
                {pendingMembers.map((m) => (
                  <div key={m.id} className="req-item glass-card">
                    <div className="req-avatar-mock">👤</div>
                    <div className="req-info">
                      <div className="req-name">{m.name}</div>
                      <div className="req-meta">
                        <span>Email: {m.email}</span>
                        <span>•</span>
                        <span style={{ color: "var(--accent-primary)", fontWeight: "bold" }}>Roots: {m.roots}</span>
                      </div>
                    </div>
                    <div className="req-actions">
                      <button onClick={() => handleApproveMember(m.id, m.name)} className="btn btn-success btn-sm">Approve</button>
                      <button onClick={() => handleRejectMember(m.id, m.name)} className="btn btn-danger btn-sm">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-buf-pane">
                ✓ No pending membership verification requests. All members verified.
              </div>
            )}
          </div>

          {/* Active Post Moderation Queue */}
          <div className="glass-card admin-section" style={{ marginTop: "1.5rem" }}>
            <h3>📝 Feed Moderation Queue ({commPosts.length} posts)</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginBottom: "1rem" }}>
              Pin useful announcements, or delete posts violating native hometown guidelines.
            </p>

            <div className="mod-posts-list">
              {commPosts.map((p) => (
                <div key={p.id} className="mod-post-item glass-card">
                  <div className="mod-post-header">
                    <div>
                      <strong>{p.userName}</strong>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginLeft: "10px" }}>
                        {new Date(p.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mod-post-badges">
                      {p.isPinned && <span className="badge badge-primary">Pinned</span>}
                      {p.isAnnouncement && <span className="badge badge-warning">Announcement</span>}
                    </div>
                  </div>
                  
                  <p className="mod-post-content">{p.content.substring(0, 100)}{p.content.length > 100 ? "..." : ""}</p>
                  
                  <div className="mod-post-actions">
                    <button
                      onClick={() => pinPost(p.id, !p.isPinned)}
                      className="btn btn-secondary btn-sm"
                    >
                      {p.isPinned ? "📌 Unpin from Feed" : "📌 Pin to Feed"}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Delete this post immediately?")) deletePost(p.id);
                      }}
                      className="btn btn-danger btn-sm"
                    >
                      🗑️ Delete Post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Community Rules Customizer */}
        <div className="admin-side-pane">
          <div className="glass-card rules-manager-card">
            <h3>⚖️ Rules & Guidelines Designer</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", margin: "0.5rem 0 1rem" }}>
              Customize guidelines for your community. Clear, respectful guidelines help avoid political spam and promote agricultural/cultural support.
            </p>

            <form onSubmit={handleAddRule} className="add-rule-form">
              <input
                type="text"
                className="form-input"
                placeholder="Add rule (e.g. Respect local customs)"
                required
                value={ruleInput}
                onChange={(e) => setRuleInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">+</button>
            </form>

            <ul className="rules-sort-list">
              {editRules.map((rule, idx) => (
                <li key={idx} className="rule-sort-item">
                  <span className="rule-num">{idx + 1}</span>
                  <span className="rule-txt">{rule}</span>
                  <button onClick={() => handleRemoveRule(idx)} className="rule-del-btn" title="Remove Guideline">✕</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .comm-admin-layout {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .admin-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
        }

        @media (max-width: 960px) {
          .admin-grid {
            grid-template-columns: 1fr;
          }
        }

        .req-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .req-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem !important;
        }

        .req-avatar-mock {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .req-info {
          flex: 1;
        }

        .req-name {
          font-weight: bold;
          font-size: 0.9rem;
        }

        .req-meta {
          display: flex;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .req-actions {
          display: flex;
          gap: 0.5rem;
        }

        .empty-buf-pane {
          background: rgba(16, 185, 129, 0.02);
          border: 1px dashed rgba(16, 185, 129, 0.3);
          color: var(--success);
          padding: 1.5rem;
          text-align: center;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .mod-posts-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .mod-post-item {
          padding: 1rem !important;
        }

        .mod-post-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
        }

        .mod-post-badges {
          display: flex;
          gap: 0.25rem;
        }

        .mod-post-content {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .mod-post-actions {
          display: flex;
          gap: 0.5rem;
        }

        /* Rules Customizer */
        .add-rule-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .rules-sort-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          list-style: none;
        }

        .rule-sort-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
        }

        .rule-txt {
          flex: 1;
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.3;
        }

        .rule-del-btn {
          background: transparent;
          border: none;
          color: var(--danger);
          cursor: pointer;
          font-size: 0.8rem;
          padding: 0.2rem;
        }

        .error-admin-pane {
          text-align: center;
          padding: 4rem !important;
          max-width: 600px;
          margin: 4rem auto;
        }
      `}} />
    </div>
  );
}
