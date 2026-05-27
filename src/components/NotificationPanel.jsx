import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function NotificationPanel({ isOpen, onClose }) {
  const { currentUser, notifications, markNotificationRead, markAllNotificationsRead } = useContext(AppContext);

  const myNotifications = notifications.filter(n => n.userId === currentUser.id);

  if (!isOpen) return null;

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "Recently";
    }
  };

  return (
    <div className="notif-drawer-overlay animate-fade" onClick={onClose}>
      <div className="notif-drawer glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="notif-header">
          <h3>🔔 Inbox Notifications</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            {myNotifications.some(n => !n.read) && (
              <button onClick={markAllNotificationsRead} className="btn btn-secondary btn-sm" style={{ fontSize: "0.75rem", padding: "0.2rem 0.5rem" }}>
                ✓ Mark all read
              </button>
            )}
            <button onClick={onClose} className="notif-close-btn">✕</button>
          </div>
        </div>

        <div className="notif-list">
          {myNotifications.length > 0 ? (
            myNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`notif-item ${n.read ? "read" : "unread"}`}
              >
                <div className="notif-dot-wrapper">
                  {!n.read && <div className="unread-dot"></div>}
                </div>
                <div className="notif-body">
                  <div className="notif-title">{n.title}</div>
                  <div className="notif-message">{n.message}</div>
                  <div className="notif-time">{formatDate(n.date)}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-notif-state">
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</div>
              <h4>All caught up!</h4>
              <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                When your posts get liked, communities get approved, or new local events are created, they'll appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .notif-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(10, 15, 29, 0.4);
          backdrop-filter: blur(4px);
          z-index: 999;
          display: flex;
          justify-content: flex-end;
        }

        .notif-drawer {
          width: 380px;
          height: 100vh;
          border-radius: 0 !important;
          border-left: 1px solid var(--glass-border) !important;
          border-top: none !important;
          border-bottom: none !important;
          border-right: none !important;
          padding: 1.5rem !important;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          background: var(--bg-secondary) !important;
        }

        @media (max-width: 480px) {
          .notif-drawer {
            width: 100%;
          }
        }

        .notif-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }

        .notif-close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 1.25rem;
          cursor: pointer;
        }

        .notif-close-btn:hover {
          color: var(--text-primary);
        }

        .notif-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-right: 0.25rem;
        }

        .notif-item {
          display: flex;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .notif-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--accent-primary);
        }

        .notif-item.unread {
          border-left: 3px solid var(--accent-primary);
          background: rgba(20, 184, 166, 0.02);
        }

        .notif-dot-wrapper {
          display: flex;
          align-items: flex-start;
          width: 8px;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-primary);
          margin-top: 6px;
          box-shadow: 0 0 8px var(--accent-primary);
        }

        .notif-body {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex: 1;
        }

        .notif-title {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .notif-message {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.3;
        }

        .notif-time {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .no-notif-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 300px;
          padding: 2rem;
        }
      `}} />
    </div>
  );
}
