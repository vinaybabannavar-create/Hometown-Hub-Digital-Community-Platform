import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function PlatformAdmin() {
  const {
    currentUser,
    communityRequests,
    panditApplications,
    abuseReports,
    tags,
    users,
    communities,
    approveCommunityRequest,
    rejectCommunityRequest,
    approvePanditApplication,
    rejectPanditApplication,
    resolveAbuseReport,
    addTag,
    removeTag
  } = useContext(AppContext);

  // Tag manager form state
  const [newTagInput, setNewTagInput] = useState("");

  if (currentUser.role !== "platform_admin") {
    return (
      <div className="glass-card error-admin-pane animate-fade">
        <h3>🛡️ Access Restricted</h3>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>
          You do not possess Global Platform Administrator privileges. Switch to **Platform Admin (Rajesh Kumar)** using the role-switcher HUD at the bottom of the screen to try these dashboards!
        </p>
      </div>
    );
  }

  const handleCreateTag = (e) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    addTag(newTagInput);
    setNewTagInput("");
  };

  // Compute platform-wide KPI statistics
  const activeUsersCount = users.length;
  const activeCommsCount = communities.filter(c => c.isApproved).length;
  const pendingPanditsCount = panditApplications.filter(a => a.status === "pending").length;
  const pendingCommsCount = communityRequests.filter(r => r.status === "pending").length;
  const pendingReportsCount = abuseReports.filter(r => r.status === "pending").length;

  return (
    <div className="platform-admin-layout animate-fade">
      {/* Executive Header */}
      <div className="admin-header-row">
        <div>
          <h1 className="gradient-text">📊 Global Executive Dashboard</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Hometown Hub System Monitoring & Hyperlocal Verifications
          </p>
        </div>
        <span className="badge badge-primary">Platform Administrator</span>
      </div>

      {/* KPI Counters */}
      <div className="admin-metrics-grid">
        <div className="glass-card metric-card">
          <div className="metric-header">
            <span>👥 Registered Users</span>
            <span>+12% MoM</span>
          </div>
          <div className="metric-value">{activeUsersCount}</div>
          <div className="metric-subtext text-success">▲ 3 joined today</div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-header">
            <span>🏡 Active Communities</span>
            <span>Target: 10</span>
          </div>
          <div className="metric-value">{activeCommsCount}</div>
          <div className="metric-subtext text-success">▲ 100% verified roots</div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-header">
            <span> Daily Active Users (DAU)</span>
            <span>Avg Session: 8m</span>
          </div>
          <div className="metric-value">124</div>
          <div className="metric-subtext text-success">▲ 84% engagement rate</div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-header">
            <span>⚠️ Unresolved Incidents</span>
            <span>Action Required</span>
          </div>
          <div className="metric-value" style={{ color: pendingReportsCount > 0 ? "var(--warning)" : "var(--success)" }}>
            {pendingReportsCount}
          </div>
          <div className="metric-subtext text-muted">Flagged by community</div>
        </div>
      </div>

      {/* Visual Analytics Chart Grid */}
      <div className="platform-charts-grid">
        {/* CSS-based Bar Chart */}
        <div className="glass-card kpi-chart-card">
          <div className="chart-title">
            <h3>📈 Community Member Distribution</h3>
            <span style={{ color: "var(--accent-primary)", fontSize: "0.8rem", fontWeight: "bold" }}>Hyperlocal Engagement</span>
          </div>
          
          <div className="bar-chart-container">
            {communities.map((comm) => {
              // Convert memberCount to percentage for height scaling
              const maxMembers = Math.max(...communities.map(c => c.memberCount));
              const heightPercent = Math.max(10, Math.round((comm.memberCount / maxMembers) * 90));
              
              return (
                <div key={comm.id} className="chart-bar-wrapper">
                  <div className="chart-bar" style={{ height: `${heightPercent}%` }}>
                    <span className="bar-value">{comm.memberCount}</span>
                  </div>
                  <span className="bar-label" title={comm.name}>{comm.name.split(" ")[0]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tag & Category Customizer */}
        <div className="glass-card platform-tags-card">
          <h3>🏷️ Global Tags & Categories</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.8rem", margin: "0.25rem 0 1rem" }}>
            Add content tags to organize event boards and community filters.
          </p>

          <form onSubmit={handleCreateTag} className="add-tag-form">
            <input
              type="text"
              className="form-input"
              placeholder="Create tag (e.g. #Weather)"
              required
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">+</button>
          </form>

          <div className="tags-chips-list">
            {tags.map((tag) => (
              <span key={tag} className="badge badge-primary tag-chip">
                #{tag}
                <button onClick={() => removeTag(tag)} className="tag-chip-del">✕</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Verification Queues */}
      <div className="platform-queues-grid" style={{ marginTop: "1.5rem" }}>
        {/* Onboarding Applications Queue */}
        <div className="glass-card platform-queue-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3>🏺 Pandit Coordinator Applications ({pendingPanditsCount})</h3>
            <span className="badge badge-primary">Roots Guides verifications</span>
          </div>

          {panditApplications.filter(a => a.status === "pending").length > 0 ? (
            <div className="queue-list">
              {panditApplications.filter(a => a.status === "pending").map((app) => (
                <div key={app.id} className="queue-card glass-card">
                  <div className="queue-card-header">
                    <h4>{app.proposedCommunityName}</h4>
                    <span className="badge badge-warning">Verification Required</span>
                  </div>
                  <p className="queue-card-meta">
                    Applicant: <strong>{app.panditName}</strong> ({app.email}) | Target: <strong>{app.cityVillage}, {app.state}</strong>
                  </p>
                  <p className="queue-card-desc">"{app.description}"</p>
                  <div className="queue-card-footer">
                    <span>👥 Initial import: {app.initialMemberCount} members</span>
                    <div className="queue-actions">
                      <button onClick={() => approvePanditApplication(app.id)} className="btn btn-success btn-sm">Approve & Launch Hub</button>
                      <button onClick={() => rejectPanditApplication(app.id)} className="btn btn-danger btn-sm">Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="queue-empty-prompt">
              ✓ No pending Pandit onboarding applications. Community coordinators are up to date.
            </div>
          )}
        </div>

        {/* General User Community Requests Queue */}
        <div className="glass-card platform-queue-section" style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3>➕ User Proposed Community Hubs ({pendingCommsCount})</h3>
            <span className="badge badge-primary">Hyperlocal Hub Requests</span>
          </div>

          {communityRequests.filter(r => r.status === "pending").length > 0 ? (
            <div className="queue-list">
              {communityRequests.filter(r => r.status === "pending").map((req) => (
                <div key={req.id} className="queue-card glass-card">
                  <div className="queue-card-header">
                    <h4>{req.name}</h4>
                    <span className="badge badge-warning">Request Pending</span>
                  </div>
                  <p className="queue-card-meta">
                    Requested by: <strong>{req.creatorName}</strong> | Location: <strong>{req.cityVillage}, {req.state}</strong>
                  </p>
                  <p className="queue-card-desc">"{req.description}"</p>
                  <div className="queue-card-footer" style={{ justifyContent: "flex-end" }}>
                    <div className="queue-actions">
                      <button onClick={() => approveCommunityRequest(req.id)} className="btn btn-success btn-sm">Approve & Build Hub</button>
                      <button onClick={() => rejectCommunityRequest(req.id)} className="btn btn-danger btn-sm">Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="queue-empty-prompt">
              ✓ No pending community proposals from users. All hubs approved or resolved.
            </div>
          )}
        </div>

        {/* Content Abuse Reports Queue */}
        <div className="glass-card platform-queue-section" style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3>⚠️ Content Flag Logs & Disputes ({pendingReportsCount})</h3>
            <span className="badge badge-danger">Content Moderation</span>
          </div>

          {abuseReports.filter(r => r.status === "pending").length > 0 ? (
            <div className="queue-list">
              {abuseReports.filter(r => r.status === "pending").map((rep) => (
                <div key={rep.id} className="queue-card glass-card" style={{ borderLeft: "3.5px solid var(--danger)" }}>
                  <div className="queue-card-header">
                    <h4>Report ID: {rep.id}</h4>
                    <span className="badge badge-danger">High Alert</span>
                  </div>
                  <p className="queue-card-meta">
                    Flagged by: <strong>{rep.reporterName}</strong> | Content Type: <strong>{rep.reportedType}</strong>
                  </p>
                  <div className="flagged-preview-card">
                    <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--danger)", display: "block", marginBottom: "2px" }}>FLAGGED CONTENT PREVIEW:</span>
                    <p style={{ fontStyle: "italic", fontSize: "0.85rem", color: "var(--text-muted)" }}>"{rep.contentPreview}"</p>
                  </div>
                  <p style={{ fontSize: "0.85rem", margin: "0.5rem 0" }}>
                    <strong>Reporter's Reason:</strong> <span style={{ color: "var(--warning)" }}>"{rep.reason}"</span>
                  </p>
                  <div className="queue-card-footer" style={{ justifyContent: "flex-end" }}>
                    <div className="queue-actions">
                      <button onClick={() => resolveAbuseReport(rep.id, "remove")} className="btn btn-danger btn-sm">🗑️ Delete Content</button>
                      <button onClick={() => resolveAbuseReport(rep.id, "keep")} className="btn btn-secondary btn-sm">Dismiss & Keep</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="queue-empty-prompt" style={{ borderLeftColor: "var(--success)" }}>
              ✓ No active abuse reports. Platform content is constructive.
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .platform-admin-layout {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .platform-charts-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .platform-charts-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Tag Manager */
        .add-tag-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .tags-chips-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.6rem !important;
          font-size: 0.8rem !important;
        }

        .tag-chip-del {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: bold;
        }

        .tag-chip-del:hover {
          color: var(--danger);
        }

        /* Queues */
        .queue-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .queue-card {
          padding: 1.25rem !important;
        }

        .queue-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .queue-card-meta {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .queue-card-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.5rem;
          margin: 0.5rem 0;
        }

        .queue-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--glass-border);
          padding-top: 0.75rem;
          margin-top: 0.75rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .queue-actions {
          display: flex;
          gap: 0.5rem;
        }

        .queue-empty-prompt {
          background: rgba(255, 255, 255, 0.01);
          border: 1px dashed var(--glass-border);
          color: var(--text-muted);
          padding: 2rem;
          text-align: center;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
        }

        .flagged-preview-card {
          background: rgba(239, 68, 68, 0.03);
          border: 1px solid rgba(239, 68, 68, 0.15);
          border-radius: var(--radius-sm);
          padding: 0.5rem 0.75rem;
          margin: 0.5rem 0;
        }
      `}} />
    </div>
  );
}
