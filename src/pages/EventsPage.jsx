import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import EventCard from "../components/EventCard";

export default function EventsPage() {
  const { currentUser, events, communities, createEvent } = useContext(AppContext);

  // Tab filter: 'all' or 'my_rsvps'
  const [activeTab, setActiveTab] = useState("all");

  // Community selection filter
  const [selectedCommFilter, setSelectedCommFilter] = useState("all");

  // Create Event Form state
  const [showWizard, setShowWizard] = useState(false);
  const [evtTitle, setEvtTitle] = useState("");
  const [evtDesc, setEvtDesc] = useState("");
  const [evtLocation, setEvtLocation] = useState("");
  const [evtDate, setEvtDate] = useState("");
  const [evtTime, setEvtTime] = useState("");
  const [evtImage, setEvtImage] = useState("");
  const [evtCategory, setEvtCategory] = useState("Culture");
  const [evtCommId, setEvtCommId] = useState("");

  // Determine communities where current user has moderation capabilities (Comm Admins or Platform Admins)
  const modCommunities = communities.filter(c => c.adminId === currentUser.id || currentUser.role === "platform_admin");
  const canOrganize = modCommunities.length > 0;

  // Filter events dynamically
  const filteredEvents = events
    .filter(evt => {
      // 1. Tab Filter
      if (activeTab === "my_rsvps") {
        return evt.attendees.includes(currentUser.id);
      }
      return true;
    })
    .filter(evt => {
      // 2. Community Filter
      if (selectedCommFilter !== "all") {
        return evt.communityId === selectedCommFilter;
      }
      return true;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending (soonest first)

  const handleWizardSubmit = (e) => {
    e.preventDefault();
    if (!evtTitle || !evtDesc || !evtLocation || !evtDate || !evtTime || !evtCommId) {
      alert("Please fill in all event registration fields.");
      return;
    }
    
    createEvent(evtCommId, evtTitle, evtDesc, evtLocation, evtDate, evtTime, evtImage, evtCategory);
    
    // Clear state
    setEvtTitle("");
    setEvtDesc("");
    setEvtLocation("");
    setEvtDate("");
    setEvtTime("");
    setEvtImage("");
    setShowWizard(false);
    
    alert(`Successfully launched "${evtTitle}"! Members will receive in-app inbox alerts.`);
  };

  return (
    <div className="events-layout animate-fade">
      {/* Header Area */}
      <div className="events-header-row">
        <div>
          <h1 className="gradient-text">Hometown Reunions & Festivals</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Never miss a native weather discussion, monsoon food feast, or local alumni meetup.
          </p>
        </div>

        {canOrganize && (
          <button onClick={() => {
            setShowWizard(true);
            if (modCommunities.length > 0) setEvtCommId(modCommunities[0].id);
          }} className="btn btn-primary">
            🗓️ Organize Local Event
          </button>
        )}
      </div>

      {/* Filter and Tab Section */}
      <div className="glass-card events-filters-card">
        <div className="events-tabs">
          <button
            onClick={() => setActiveTab("all")}
            className={`event-tab-btn ${activeTab === "all" ? "active" : ""}`}
          >
            All Community Events
          </button>
          <button
            onClick={() => setActiveTab("my_rsvps")}
            className={`event-tab-btn ${activeTab === "my_rsvps" ? "active" : ""}`}
          >
            My RSVP Registrations ({events.filter(e => e.attendees.includes(currentUser.id)).length})
          </button>
        </div>

        <div className="events-select-filter">
          <label className="form-label" style={{ marginBottom: 0, whiteSpace: "nowrap" }}>Filter by Hub:</label>
          <select
            className="form-select"
            value={selectedCommFilter}
            onChange={(e) => setSelectedCommFilter(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="all">All Joined / Proposed Hubs</option>
            {communities.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="events-grid-pane">
        {filteredEvents.length > 0 ? (
          <div className="events-card-grid">
            {filteredEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        ) : (
          <div className="glass-card empty-events-state">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗓️</div>
            <h3>No Scheduled Events Found</h3>
            <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              {activeTab === "my_rsvps"
                ? "You haven't RSVP'd to any hometown meetups yet. Switch to 'All Community Events' to discover gatherings!"
                : "No reunions or festivals are scheduled for your active filters. If you are a Moderator, launch one!"}
            </p>
          </div>
        )}
      </div>

      {/* Event Creator Modal */}
      {showWizard && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <h3>🗓️ Organize a Local Event / Reunion</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0.5rem 0 1.5rem" }}>
              Launch a festival, physical meetup, native food drive, or cultural program. Notifications are broadcasted to all hub members.
            </p>

            <form onSubmit={handleWizardSubmit}>
              <div className="form-group">
                <label className="form-label">Host Community Hub</label>
                <select
                  className="form-select"
                  value={evtCommId}
                  onChange={(e) => setEvtCommId(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Community Admin Hub</option>
                  {modCommunities.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Event Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Wayanad Spices Food Fest & Reunion"
                  required
                  value={evtTitle}
                  onChange={(e) => setEvtTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={evtCategory}
                  onChange={(e) => setEvtCategory(e.target.value)}
                >
                  <option value="Culture">Culture & Heritage</option>
                  <option value="Food & Social">Food Feast & Social</option>
                  <option value="Agriculture">Agriculture & Planting</option>
                  <option value="Meetup">Reunion Meetup</option>
                  <option value="Youth Support">Migrant Youth Support</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Description & Activities</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Describe food menus, folk music details, offline gathering addresses, live streaming link, and entry rules..."
                  required
                  value={evtDesc}
                  onChange={(e) => setEvtDesc(e.target.value)}
                />
              </div>

              <div className="form-row-grid">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-input"
                    required
                    value={evtDate}
                    onChange={(e) => setEvtDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 10:00 AM - 5:00 PM"
                    required
                    value={evtTime}
                    onChange={(e) => setEvtTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Location Address / online details</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Indiranagar Samajam Hall, Bangalore & Live on Kalpetta Link"
                  required
                  value={evtLocation}
                  onChange={(e) => setEvtLocation(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Visual Image Link (Optional)</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="e.g. https://images.unsplash.com/photo-..."
                  value={evtImage}
                  onChange={(e) => setEvtImage(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setShowWizard(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Schedule Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appended Styles for Events Page */}
      <style dangerouslySetInnerHTML={{__html: `
        .events-layout {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .events-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .events-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .events-header-row .btn {
            width: 100%;
          }
        }

        .events-filters-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem !important;
        }

        @media (max-width: 768px) {
          .events-filters-card {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          .events-select-filter {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }

        .events-tabs {
          display: flex;
          gap: 0.5rem;
        }

        .event-tab-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-title);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .event-tab-btn:hover {
          color: var(--text-primary);
        }

        .event-tab-btn.active {
          background: var(--accent-glow);
          color: var(--accent-primary);
        }

        .events-select-filter {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .events-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .empty-events-state {
          text-align: center;
          padding: 4rem !important;
          max-width: 600px;
          margin: 0 auto;
        }

        .form-row-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        @media (max-width: 480px) {
          .form-row-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}} />
    </div>
  );
}
