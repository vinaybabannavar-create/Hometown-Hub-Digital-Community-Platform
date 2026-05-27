import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function PostCard({ post }) {
  const { currentUser, communities, likePost, addComment, deletePost, pinPost, reportPost } = useContext(AppContext);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);

  // Check if current user has permissions in this community
  const community = communities.find(c => c.id === post.communityId);
  const isCommAdmin = community && (community.adminId === currentUser.id);
  const isPlatformAdmin = currentUser.role === "platform_admin";
  const canModerate = isCommAdmin || isPlatformAdmin;
  const isOwner = post.userId === currentUser.id;

  const hasLiked = post.likedBy.includes(currentUser.id);

  const handleLike = () => {
    likePost(post.id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText("");
    setShowComments(true);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post.id);
    }
  };

  const handlePinToggle = () => {
    pinPost(post.id, !post.isPinned);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportReason.trim()) return;
    reportPost(post.id, reportReason);
    setReportReason("");
    setShowReportModal(false);
    alert("Post has been flagged and sent to the platform administrator for review. Thank you for keeping Hometown Hub safe.");
  };

  // Format date nicely
  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "Recently";
    }
  };

  return (
    <div className={`glass-card post-card ${post.isPinned ? "pinned-post" : ""}`}>
      {/* Pinned / Announcement Headers */}
      {(post.isPinned || post.isAnnouncement) && (
        <div className="post-meta-badges">
          {post.isPinned && <span className="badge badge-primary">📌 Pinned</span>}
          {post.isAnnouncement && <span className="badge badge-warning">📢 Announcement</span>}
        </div>
      )}

      {/* Author Row */}
      <div className="post-author-row">
        <div className="author-info">
          <img src={post.userAvatar} alt={post.userName} className="author-avatar" />
          <div>
            <div className="author-name">{post.userName}</div>
            <div className="post-timestamp">{formatDate(post.createdDate)}</div>
          </div>
        </div>

        {/* Post Actions Dropdown Mock */}
        <div className="post-actions-menu">
          {canModerate && (
            <button onClick={handlePinToggle} className="post-action-dot-btn" title={post.isPinned ? "Unpin Post" : "Pin Post"}>
              {post.isPinned ? "📌 Unpin" : "📌 Pin"}
            </button>
          )}
          
          {(canModerate || isOwner) && (
            <button onClick={handleDelete} className="post-action-dot-btn text-danger" title="Delete Post">
              🗑️ Delete
            </button>
          )}

          {!isOwner && (
            <button onClick={() => setShowReportModal(true)} className="post-action-dot-btn text-warning" title="Report Post">
              ⚠️ Report
            </button>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="post-image-container">
          <img src={post.image} alt="Post content" className="post-image" />
        </div>
      )}

      {/* Interaction Row */}
      <div className="post-interactions">
        <button onClick={handleLike} className={`interact-btn ${hasLiked ? "liked" : ""}`}>
          <svg viewBox="0 0 24 24" fill={hasLiked ? "var(--accent-primary)" : "none"} stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{post.likes} Likes</span>
        </button>

        <button onClick={() => setShowComments(!showComments)} className="interact-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{post.comments.length} Comments</span>
        </button>

        <button onClick={() => setShowShareModal(true)} className="interact-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l5.084-2.542m0 7.6l-5.084-2.542m9.884-4.462a3 3 0 11-6 0 3 3 0 016 0zM6 16a3 3 0 11-6 0 3 3 0 016 0zm12 4a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Share</span>
        </button>
      </div>

      {/* Comments Panel */}
      {showComments && (
        <div className="post-comments-section animate-fade">
          <div className="comments-divider"></div>
          
          {post.comments.length > 0 ? (
            <div className="comments-list">
              {post.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <img src={comment.userAvatar} alt={comment.userName} className="comment-avatar" />
                  <div className="comment-bubble">
                    <div className="comment-header">
                      <span className="comment-author">{comment.userName}</span>
                      <span className="comment-time">{formatDate(comment.createdDate)}</span>
                    </div>
                    <p className="comment-text">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-comments">No comments yet. Start the conversation!</div>
          )}

          {/* Add Comment Form */}
          <form onSubmit={handleCommentSubmit} className="add-comment-form">
            <img src={currentUser.avatar} alt={currentUser.name} className="comment-form-avatar" />
            <input
              type="text"
              placeholder="Write a warm comment..."
              className="comment-form-input"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">Post</button>
          </form>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content">
            <h3>⚠️ Report Content to Platform Admin</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0.5rem 0 1.5rem" }}>
              Help keep Hometown Hub constructive. Let us know why this post is inappropriate or violates rules.
            </p>
            <form onSubmit={handleReportSubmit}>
              <div className="form-group">
                <label className="form-label">Reason for Abuse Report</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="e.g. Political arguments, commercial advertising, offensive speech..."
                  required
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setShowReportModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-danger">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-content" style={{ maxWidth: "450px" }}>
            <h3>🔗 Hyperlocal Share Link</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: "0.5rem 0 1.5rem" }}>
              Send this direct link to your friends from Wayanad or Palampur who have migrated!
            </p>
            <div className="form-group">
              <input
                type="text"
                readOnly
                className="form-input"
                value={`https://hometownhub.com/feed/post/${post.id}`}
                onClick={(e) => e.target.select()}
                style={{ textAlign: "center", fontStyle: "italic", color: "var(--accent-primary)" }}
              />
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://hometownhub.com/feed/post/${post.id}`);
                alert("Link copied to clipboard!");
                setShowShareModal(false);
              }}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              📋 Copy Link
            </button>
            <button
              onClick={() => setShowShareModal(false)}
              className="btn btn-secondary"
              style={{ width: "100%", marginTop: "10px" }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Inline styles for PostCard to keep layout pristine */}
      <style dangerouslySetInnerHTML={{__html: `
        .post-card {
          margin-bottom: 1.5rem;
          border-left: 4px solid transparent;
        }

        .post-card.pinned-post {
          border-left-color: var(--accent-primary);
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, var(--glass-bg) 100%);
        }

        .post-meta-badges {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .post-author-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .author-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid var(--glass-border);
        }

        .author-name {
          font-weight: 600;
          font-family: var(--font-title);
        }

        .post-timestamp {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .post-actions-menu {
          display: flex;
          gap: 0.5rem;
        }

        .post-action-dot-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          cursor: pointer;
          font-weight: bold;
          transition: var(--transition-fast);
        }

        .post-action-dot-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
        }

        .post-content {
          margin-bottom: 1rem;
          white-space: pre-line;
          font-size: 0.95rem;
        }

        .post-image-container {
          margin: 0 -1.5rem 1rem -1.5rem;
          border-top: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
          max-height: 400px;
          overflow: hidden;
          background: #000;
          display: flex;
          align-items: center;
        }

        .post-image {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .post-interactions {
          display: flex;
          gap: 1.5rem;
          border-top: 1px solid var(--glass-border);
          padding-top: 0.75rem;
        }

        .interact-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 600;
          transition: var(--transition-fast);
        }

        .interact-btn:hover {
          color: var(--accent-primary);
        }

        .interact-btn.liked {
          color: var(--accent-primary);
        }

        /* Comments Styling */
        .comments-divider {
          height: 1px;
          background: var(--glass-border);
          margin: 1rem 0;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1rem;
          max-height: 250px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .comment-item {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }

        .comment-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
        }

        .comment-bubble {
          background: var(--bg-tertiary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 0.5rem 0.75rem;
          flex: 1;
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.15rem;
        }

        .comment-author {
          font-weight: 600;
          font-size: 0.8rem;
        }

        .comment-time {
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .comment-text {
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .no-comments {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: center;
          margin: 1rem 0;
        }

        .add-comment-form {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .comment-form-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
        }

        .comment-form-input {
          flex: 1;
          background: var(--bg-tertiary);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 0.4rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
        }

        .comment-form-input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }
      `}} />
    </div>
  );
}
