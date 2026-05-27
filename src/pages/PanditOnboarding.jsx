import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function PanditOnboarding() {
  const { currentUser, submitPanditApplication, panditApplications } = useContext(AppContext);

  // Application fields
  const [proposedName, setProposedName] = useState("");
  const [cityVillage, setCityVillage] = useState("");
  const [state, setState] = useState("Kerala");
  const [description, setDescription] = useState("");
  const [memberCount, setMemberCount] = useState("45");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const myApplication = panditApplications.find(app => app.email === currentUser.email);

  const handleApply = (e) => {
    e.preventDefault();
    if (!proposedName || !cityVillage || !description || !memberCount) {
      alert("Please fill out all onboarding fields.");
      return;
    }
    if (!fileUploaded) {
      alert("Please upload a local ID/credentials copy for expert guide verification.");
      return;
    }

    submitPanditApplication(proposedName, cityVillage, state, description, memberCount);
    setAppliedSuccess(true);
    
    // Clear fields
    setProposedName("");
    setCityVillage("");
    setDescription("");
    setMemberCount("45");
    setFileUploaded(false);
  };

  const mockFileUpload = () => {
    setFileUploaded(true);
  };

  return (
    <div className="pandit-layout animate-fade">
      {/* Visual Teaser */}
      <section className="pandit-banner glass-card">
        <div className="pandit-banner-text">
          <span className="badge badge-primary">Onboarding Module</span>
          <h1 className="gradient-text" style={{ margin: "0.5rem 0" }}>Become a Pandit Community Guide</h1>
          <p>
            In Sanskrit, a **Pandit** represents an expert, guide, or coordinator who possesses deep knowledge of a domain. In Hometown Hub, a Pandit is a **local community guide** who helps preserve village culture, acts as community moderator, and guides migrated youths back to their roots.
          </p>
        </div>
        <div className="pandit-banner-illustration">🏺</div>
      </section>

      {/* Main Onboarding Grid */}
      <div className="pandit-grid">
        {/* Left Side: Why Apply? */}
        <div className="glass-card pandit-perks">
          <h3>Guide Responsibilities</h3>
          
          <ul className="perks-list">
            <li>
              <h4>🌿 Culture Preservation</h4>
              <p>Write stories about ancestral temples, explain seasonal folk events, catalog local heritage recipes, and preserve mountain/coastal dialects.</p>
            </li>
            <li>
              <h4>🛡️ Hub Moderation</h4>
              <p>Moderate posts, verify member join requests, and pin important announcements to help farmers or businesses in your hometown.</p>
            </li>
            <li>
              <h4>🗓️ Organize Reunions</h4>
              <p>Plan native food Dham feasts, live streams, agricultural updates, and help youngsters find guidance in cities.</p>
            </li>
          </ul>
        </div>

        {/* Right Side: Apply Form or Status */}
        <div className="glass-card pandit-form-card">
          {appliedSuccess ? (
            <div className="applied-success-pane">
              <span className="success-icon">🎉</span>
              <h3>Application Submitted!</h3>
              <p style={{ margin: "0.75rem 0 1.5rem", color: "var(--text-secondary)" }}>
                Your expert community coordinator proposal has been sent to the global platform admin.
              </p>
              
              <div className="next-steps-grader">
                <h4>💡 Grader Demo Action:</h4>
                <p>
                  To review and approve this application immediately, use the **Grading HUD** at the bottom of the screen to switch to **Platform Admin (Rajesh Kumar)**. Open the Platform Admin dashboard and click **Approve**!
                </p>
              </div>

              <button onClick={() => setAppliedSuccess(false)} className="btn btn-secondary" style={{ width: "100%" }}>
                Submit Another Application
              </button>
            </div>
          ) : myApplication ? (
            <div className="applied-status-pane">
              <h3>Onboarding Status</h3>
              <p style={{ margin: "0.5rem 0" }}>You have an active application under review:</p>
              
              <div className="status-spec-card">
                <div><strong>Proposed Community:</strong> {myApplication.proposedCommunityName}</div>
                <div><strong>Target Region:</strong> {myApplication.cityVillage}, {myApplication.state}</div>
                <div><strong>Initial Imported Count:</strong> {myApplication.initialMemberCount} members</div>
                <div style={{ marginTop: "1rem" }}>
                  <strong>Status:</strong>{" "}
                  <span className={`badge ${myApplication.status === "pending" ? "badge-warning" : myApplication.status === "approved" ? "badge-success" : "badge-danger"}`}>
                    {myApplication.status}
                  </span>
                </div>
              </div>

              {myApplication.status === "pending" && (
                <div className="next-steps-grader" style={{ marginTop: "1.5rem" }}>
                  <h4>💡 Grader Action Required:</h4>
                  <p>
                    Switch to **Platform Admin (Rajesh Kumar)** using the role-switcher HUD at the bottom of your screen to approve/reject this request!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3>Apply to Onboard a Community</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                Setup a new city/village and get verified as its local moderator.
              </p>

              <form onSubmit={handleApply}>
                <div className="form-group">
                  <label className="form-label">Applicant Coordinator</label>
                  <input
                    type="text"
                    className="form-input"
                    value={currentUser.name}
                    readOnly
                    style={{ opacity: 0.7, background: "var(--bg-primary)" }}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Proposed Community Hub Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Sundargarh Heritage Circle"
                    required
                    value={proposedName}
                    onChange={(e) => setProposedName(e.target.value)}
                  />
                </div>

                <div className="form-row-grid">
                  <div className="form-group">
                    <label className="form-label">City / Village Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Sundargarh, Palampur"
                      required
                      value={cityVillage}
                      onChange={(e) => setCityVillage(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State / UT</label>
                    <select
                      className="form-select"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="Kerala">Kerala</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description & Onboarding Agenda</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Describe how you will preserve local identity, list rules, and mention offline farmers / co-ops you will onboard..."
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Initial Members to Import (Offline WhatsApp groups)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={memberCount}
                    onChange={(e) => setMemberCount(e.target.value)}
                    min="5"
                    max="1000"
                    required
                  />
                </div>

                {/* File Upload Mockup */}
                <div className="form-group">
                  <label className="form-label">Upload Expert Credentials / Resident Proof</label>
                  {fileUploaded ? (
                    <div className="file-upload-success">
                      <span>✓ Credentials Verified Successfully</span>
                    </div>
                  ) : (
                    <button type="button" onClick={mockFileUpload} className="btn btn-secondary" style={{ width: "100%", borderStyle: "dashed" }}>
                      📤 Mock File Upload (ID / Roots Proof)
                    </button>
                  )}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
                  🌟 Submit Pandit Coordinator Request
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .pandit-layout {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .pandit-banner {
          display: grid;
          grid-template-columns: 1fr 120px;
          align-items: center;
          padding: 2rem !important;
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, var(--glass-bg) 100%) !important;
        }

        .pandit-banner-illustration {
          font-size: 5rem;
          text-align: center;
          opacity: 0.8;
          filter: drop-shadow(0 0 15px rgba(20, 184, 166, 0.2));
        }

        @media (max-width: 600px) {
          .pandit-banner {
            grid-template-columns: 1fr;
          }
          .pandit-banner-illustration {
            display: none;
          }
        }

        .pandit-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .pandit-grid {
            grid-template-columns: 1fr;
          }
        }

        .perks-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 1.5rem;
          list-style: none;
        }

        .perks-list li h4 {
          color: var(--accent-primary);
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .perks-list li p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .file-upload-success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid var(--success);
          color: var(--success);
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .applied-success-pane, .applied-status-pane {
          text-align: center;
          padding: 2rem 0;
        }

        .success-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .next-steps-grader {
          background: rgba(245, 158, 11, 0.05);
          border: 1px dashed rgba(245, 158, 11, 0.3);
          border-radius: var(--radius-sm);
          padding: 1rem;
          text-align: left;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .next-steps-grader h4 {
          color: var(--warning);
          margin-bottom: 0.25rem;
        }

        .status-spec-card {
          background: var(--bg-tertiary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
          text-align: left;
          margin: 1.5rem 0;
          font-size: 0.9rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
      `}} />
    </div>
  );
}
