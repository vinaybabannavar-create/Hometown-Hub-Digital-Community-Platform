import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function EventCard({ event }) {
  const { currentUser, joinEvent, users } = useContext(AppContext);

  const isAttending = event.attendees.includes(currentUser.id);

  const handleRSVP = () => {
    joinEvent(event.id);
  };

  // Calculate days remaining dynamically
  const getCountdown = () => {
    const today = new Date("2026-05-27"); // Anchored to system current local time (2026-05-27)
    const eventDate = new Date(event.date);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return `⏰ Starts in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
    } else if (diffDays === 0) {
      return "🎉 Happening Today!";
    } else {
      return "✅ Event Concluded";
    }
  };

  // Get attendee profiles to show their avatars
  const attendeeProfiles = event.attendees.map(attId => users.find(u => u.id === attId)).filter(Boolean);

  return (
    <div className="glass-card event-card hoverable">
      {/* Visual Header Banner */}
      <div className="event-banner-container">
        <img src={event.image} alt={event.title} className="event-banner-img" />
        <span className="badge badge-primary event-category-badge">{event.category}</span>
        <span className="event-countdown-badge">{getCountdown()}</span>
      </div>

      <div className="event-content-body">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-organizer">Organized by <strong style={{ color: "var(--accent-primary)" }}>{event.organizerName}</strong></p>
        <p className="event-description">{event.description}</p>
        
        <div className="event-details-grid">
          <div className="event-detail-item">
            <span className="detail-icon">📅</span>
            <div>
              <div className="detail-label">Date</div>
              <div className="detail-value">{new Date(event.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
            </div>
          </div>

          <div className="event-detail-item">
            <span className="detail-icon">⏰</span>
            <div>
              <div className="detail-label">Time</div>
              <div className="detail-value">{event.time}</div>
            </div>
          </div>

          <div className="event-detail-item" style={{ gridColumn: "span 2" }}>
            <span className="detail-icon">📍</span>
            <div>
              <div className="detail-label">Location</div>
              <div className="detail-value">{event.location}</div>
            </div>
          </div>
        </div>

        {/* Attendees Stack */}
        <div className="event-attendees-row">
          <div className="attendee-avatars-stack">
            {attendeeProfiles.slice(0, 4).map((att) => (
              <img
                key={att.id}
                src={att.avatar}
                alt={att.name}
                className="stack-avatar"
                title={att.name}
              />
            ))}
            {attendeeProfiles.length > 4 && (
              <div className="stack-avatar-more">+{attendeeProfiles.length - 4}</div>
            )}
          </div>
          <span className="attendees-count-text">
            {event.attendees.length} members are attending
          </span>
        </div>

        {/* RSVP Action */}
        <div className="event-action-bar">
          <button
            onClick={handleRSVP}
            className={`btn ${isAttending ? "btn-success" : "btn-primary"}`}
            style={{ width: "100%" }}
          >
            {isAttending ? "✓ Registered (Going)" : "🎟️ Join Event & RSVP"}
          </button>
        </div>
      </div>

      {/* Inline styles for EventCard to make layout pristine */}
      <style dangerouslySetInnerHTML={{__html: `
        .event-card {
          padding: 0 !important;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .event-banner-container {
          position: relative;
          height: 180px;
          overflow: hidden;
          background: var(--bg-tertiary);
        }

        .event-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .event-card:hover .event-banner-img {
          transform: scale(1.05);
        }

        .event-category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 1;
        }

        .event-countdown-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(10, 15, 29, 0.85);
          backdrop-filter: blur(4px);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 1;
        }

        .event-content-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }

        .event-title {
          font-size: 1.25rem;
          line-height: 1.2;
          color: var(--text-primary);
        }

        .event-organizer {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: -0.5rem;
        }

        .event-description {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .event-details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.75rem;
        }

        .event-detail-item {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .detail-icon {
          font-size: 1.1rem;
        }

        .detail-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-value {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 140px;
        }

        .event-attendees-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0.25rem 0;
        }

        .attendee-avatars-stack {
          display: flex;
          align-items: center;
        }

        .stack-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--bg-secondary);
          margin-left: -8px;
        }

        .stack-avatar:first-child {
          margin-left: 0;
        }

        .stack-avatar-more {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: 2px solid var(--bg-secondary);
          color: var(--accent-primary);
          font-size: 0.7rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -8px;
        }

        .attendees-count-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .event-action-bar {
          margin-top: auto;
        }
      `}} />
    </div>
  );
}
