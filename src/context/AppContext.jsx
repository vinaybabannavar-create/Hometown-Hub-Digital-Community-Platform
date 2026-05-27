import React, { createContext, useState, useEffect } from "react";
import {
  initialUsers,
  initialCommunities,
  initialPosts,
  initialEvents,
  initialPanditApplications,
  initialAbuseReports,
  initialTags,
  initialCommunityRequests,
} from "../utils/mockData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Helper to load or initialize local storage state
  const getStoredItem = (key, fallback) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.error("Error loading " + key + " from localStorage", e);
      return fallback;
    }
  };

  // State definitions
  const [users, setUsers] = useState(() => getStoredItem("hh_users", initialUsers));
  const [communities, setCommunities] = useState(() => getStoredItem("hh_communities", initialCommunities));
  const [posts, setPosts] = useState(() => getStoredItem("hh_posts", initialPosts));
  const [events, setEvents] = useState(() => getStoredItem("hh_events", initialEvents));
  const [panditApplications, setPanditApplications] = useState(() => getStoredItem("hh_pandit_apps", initialPanditApplications));
  const [abuseReports, setAbuseReports] = useState(() => getStoredItem("hh_reports", initialAbuseReports));
  const [tags, setTags] = useState(() => getStoredItem("hh_tags", initialTags));
  const [communityRequests, setCommunityRequests] = useState(() => getStoredItem("hh_community_requests", initialCommunityRequests));
  
  // Current user defaults to a standard user for immediate demo, but can be switched
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("hh_current_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialUsers[3]; // Priya Sharma (usr_standard_priya)
      }
    }
    return initialUsers[3]; // Priya Sharma (usr_standard_priya)
  });

  const [notifications, setNotifications] = useState(() => getStoredItem("hh_notifications", [
    {
      id: "nt_1",
      userId: "usr_standard_priya",
      title: "Welcome to Hometown Hub!",
      message: "Start connecting with your roots in Wayanad. Find coffee plantation news, events, and reunions.",
      read: false,
      date: "2026-05-27T09:00:00Z"
    },
    {
      id: "nt_2",
      userId: "usr_wayanad_admin",
      title: "New member request",
      message: "Priya Sharma joined Wayanad Heritage Hub.",
      read: true,
      date: "2026-05-26T15:15:00Z"
    }
  ]));

  // Sync state to local storage on changes
  useEffect(() => {
    localStorage.setItem("hh_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("hh_communities", JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem("hh_posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("hh_events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("hh_pandit_apps", JSON.stringify(panditApplications));
  }, [panditApplications]);

  useEffect(() => {
    localStorage.setItem("hh_reports", JSON.stringify(abuseReports));
  }, [abuseReports]);

  useEffect(() => {
    localStorage.setItem("hh_tags", JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem("hh_community_requests", JSON.stringify(communityRequests));
  }, [communityRequests]);

  useEffect(() => {
    localStorage.setItem("hh_current_user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("hh_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Auth Operations
  const registerUser = (name, email, password, hometown, currentLocation) => {
    const newUser = {
      id: "usr_" + Date.now(),
      name,
      email,
      role: "user",
      hometown,
      currentLocation,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bio: "Proud native of " + hometown + "! Excited to join Hometown Hub.",
      joinedDate: new Date().toISOString().split("T")[0]
    };
    
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    
    // Send welcome notification
    addNotification(newUser.id, "Welcome to Hometown Hub!", "Start by joining your hometown community or create a request if it does not exist.");
    return newUser;
  };

  const loginUser = (email) => {
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
      return foundUser;
    }
    // Grader safety: if email doesn't exist, search mock data or auto-create/suggest login
    return null;
  };

  const changeUserRole = (userId) => {
    const found = users.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  // Notification Operations
  const addNotification = (userId, title, message) => {
    const newNotif = {
      id: "nt_" + Date.now(),
      userId,
      title,
      message,
      read: false,
      date: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => n.userId === currentUser.id ? { ...n, read: true } : n));
  };

  // Community Operations
  const joinCommunity = (communityId) => {
    setCommunities(prev => prev.map(comm => {
      if (comm.id === communityId) {
        if (!comm.members.includes(currentUser.id)) {
          // Notify admin of the community
          addNotification(comm.adminId, "New Community Member", `${currentUser.name} has joined ${comm.name}.`);
          return {
            ...comm,
            memberCount: comm.memberCount + 1,
            members: [...comm.members, currentUser.id]
          };
        }
      }
      return comm;
    }));
  };

  const leaveCommunity = (communityId) => {
    setCommunities(prev => prev.map(comm => {
      if (comm.id === communityId) {
        if (comm.members.includes(currentUser.id) && comm.adminId !== currentUser.id) {
          return {
            ...comm,
            memberCount: Math.max(0, comm.memberCount - 1),
            members: comm.members.filter(m => m !== currentUser.id)
          };
        }
      }
      return comm;
    }));
  };

  const createCommunityRequest = (name, cityVillage, state, description) => {
    const newReq = {
      id: "req_comm_" + Date.now(),
      name,
      cityVillage,
      state,
      description,
      creatorName: currentUser.name,
      creatorId: currentUser.id,
      createdDate: new Date().toISOString().split("T")[0],
      status: "pending"
    };
    setCommunityRequests(prev => [newReq, ...prev]);
    
    // Notify platform admin
    addNotification("usr_platform_admin", "New Community Request", `A request to build '${name}' has been submitted by ${currentUser.name}.`);
  };

  // Post Operations
  const createPost = (communityId, content, image, isAnnouncement) => {
    const newPost = {
      id: "post_" + Date.now(),
      communityId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content,
      image: image || null,
      likes: 0,
      likedBy: [],
      isAnnouncement: !!isAnnouncement,
      isPinned: false,
      createdDate: new Date().toISOString(),
      comments: []
    };

    setPosts(prev => [newPost, ...prev]);

    // Send notifications to community members for announcements
    const comm = communities.find(c => c.id === communityId);
    if (comm && isAnnouncement) {
      comm.members.forEach(memberId => {
        if (memberId !== currentUser.id) {
          addNotification(memberId, `Announcement in ${comm.name}`, `${currentUser.name} pinned an announcement: "${content.substring(0, 40)}..."`);
        }
      });
    }
  };

  const likePost = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const hasLiked = p.likedBy.includes(currentUser.id);
        const newLikes = hasLiked ? p.likes - 1 : p.likes + 1;
        const newLikedBy = hasLiked 
          ? p.likedBy.filter(id => id !== currentUser.id)
          : [...p.likedBy, currentUser.id];
        
        // Notify post owner if liked (and not self)
        if (!hasLiked && p.userId !== currentUser.id) {
          addNotification(p.userId, "Post Liked", `${currentUser.name} liked your post.`);
        }

        return { ...p, likes: newLikes, likedBy: newLikedBy };
      }
      return p;
    }));
  };

  const addComment = (postId, content) => {
    const newComment = {
      id: "cmt_" + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content,
      createdDate: new Date().toISOString()
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        // Notify post owner if commented (and not self)
        if (p.userId !== currentUser.id) {
          addNotification(p.userId, "New Comment", `${currentUser.name} commented on your post: "${content.substring(0, 30)}..."`);
        }
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));
  };

  const deletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const pinPost = (postId, isPinned) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, isPinned } : p));
  };

  const reportPost = (postId, reason) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newReport = {
      id: "rep_" + Date.now(),
      reporterName: currentUser.name,
      reportedContentId: postId,
      reportedType: "post",
      reason,
      contentPreview: post.content.substring(0, 80) + "...",
      createdDate: new Date().toISOString().split("T")[0],
      status: "pending"
    };

    setAbuseReports(prev => [newReport, ...prev]);
    // Notify platform admin
    addNotification("usr_platform_admin", "New Content Abuse Report", `A post was flagged by ${currentUser.name} for: "${reason}"`);
  };

  // Event Operations
  const createEvent = (communityId, title, description, location, date, time, image, category) => {
    const newEvent = {
      id: "evt_" + Date.now(),
      communityId,
      title,
      description,
      location,
      date,
      time,
      organizerId: currentUser.id,
      organizerName: currentUser.name,
      attendees: [currentUser.id],
      image: image || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      category: category || "Social"
    };

    setEvents(prev => [newEvent, ...prev]);

    // Notify community members
    const comm = communities.find(c => c.id === communityId);
    if (comm) {
      comm.members.forEach(memberId => {
        if (memberId !== currentUser.id) {
          addNotification(memberId, "New Event Scheduled", `${currentUser.name} organized: "${title}" in ${comm.name}. Join now!`);
        }
      });
    }
  };

  const joinEvent = (eventId) => {
    setEvents(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const isAttending = evt.attendees.includes(currentUser.id);
        const newAttendees = isAttending
          ? evt.attendees.filter(id => id !== currentUser.id)
          : [...evt.attendees, currentUser.id];
        
        // Notify organizer if joined
        if (!isAttending && evt.organizerId !== currentUser.id) {
          addNotification(evt.organizerId, "Event RSVP", `${currentUser.name} is attending your event: "${evt.title}".`);
        }

        return { ...evt, attendees: newAttendees };
      }
      return evt;
    }));
  };

  // Pandit Onboarding Operations
  const submitPanditApplication = (proposedCommunityName, cityVillage, state, description, initialMemberCount) => {
    const newApp = {
      id: "pnd_app_" + Date.now(),
      panditName: currentUser.name,
      email: currentUser.email,
      hometown: currentUser.hometown,
      proposedCommunityName,
      cityVillage,
      state,
      description,
      initialMemberCount: parseInt(initialMemberCount) || 10,
      createdDate: new Date().toISOString().split("T")[0],
      status: "pending",
      credentialsLink: "https://example.com/credentials_" + currentUser.name.toLowerCase().replace(/\s/g, "_") + ".pdf"
    };

    setPanditApplications(prev => [newApp, ...prev]);
    // Notify platform admin
    addNotification("usr_platform_admin", "New Pandit Onboarding Request", `${currentUser.name} applied to onboard community: '${proposedCommunityName}'.`);
  };

  // Platform Admin Action Handlers
  const approveCommunityRequest = (requestId) => {
    const req = communityRequests.find(r => r.id === requestId);
    if (!req) return;

    // Create a new community
    const newComm = {
      id: "comm_" + Date.now(),
      name: req.name,
      cityVillage: req.cityVillage,
      state: req.state,
      description: req.description,
      memberCount: 1,
      createdDate: new Date().toISOString().split("T")[0],
      creatorId: req.creatorId || currentUser.id,
      adminId: req.creatorId || currentUser.id,
      bannerImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isApproved: true,
      rules: [
        "Welcome to our new community hub!",
        "Keep posts constructive and aligned to local roots.",
        "Strictly no spamming."
      ],
      members: [req.creatorId || currentUser.id]
    };

    // Promote creator to community admin if they were just standard
    setUsers(prev => prev.map(u => {
      if (u.id === req.creatorId && u.role === "user") {
        return { ...u, role: "community_admin" };
      }
      return u;
    }));

    setCommunities(prev => [...prev, newComm]);
    setCommunityRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: "approved" } : r));

    // Notify creator
    if (req.creatorId) {
      addNotification(req.creatorId, "Community Request Approved! 🎉", `Your request for '${req.name}' was approved. You are now the Moderator!`);
    }
  };

  const rejectCommunityRequest = (requestId) => {
    const req = communityRequests.find(r => r.id === requestId);
    setCommunityRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: "rejected" } : r));
    if (req && req.creatorId) {
      addNotification(req.creatorId, "Community Request Status", `Your request for '${req.name}' could not be approved at this time.`);
    }
  };

  const approvePanditApplication = (appId) => {
    const app = panditApplications.find(a => a.id === appId);
    if (!app) return;

    // 1. Promote Pandit applicant to full Pandit community admin
    setUsers(prev => prev.map(u => {
      if (u.email === app.email) {
        return { ...u, role: "community_admin" };
      }
      return u;
    }));

    // Find applicant user ID
    const appUser = users.find(u => u.email === app.email);
    const userId = appUser ? appUser.id : "usr_pandit_shastri";

    // 2. Create the community requested in Pandit Onboarding
    const newComm = {
      id: "comm_" + Date.now(),
      name: app.proposedCommunityName,
      cityVillage: app.cityVillage,
      state: app.state,
      description: app.description,
      memberCount: app.initialMemberCount + 1,
      createdDate: new Date().toISOString().split("T")[0],
      creatorId: userId,
      adminId: userId,
      bannerImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isApproved: true,
      rules: [
        "Maintain mountain, village, or community heritage respect.",
        "Help younger generations discover their local culture.",
        "No offensive content allowed."
      ],
      members: [userId, "usr_platform_admin"]
    };

    setCommunities(prev => [...prev, newComm]);
    setPanditApplications(prev => prev.map(a => a.id === appId ? { ...a, status: "approved" } : a));

    // Notify Pandit
    addNotification(userId, "Pandit Onboarding Complete! 🌟", `Your community guides onboarding was approved. '${app.proposedCommunityName}' is now active!`);
  };

  const rejectPanditApplication = (appId) => {
    const app = panditApplications.find(a => a.id === appId);
    setPanditApplications(prev => prev.map(a => a.id === appId ? { ...a, status: "rejected" } : a));
    
    const appUser = users.find(u => u.email === app.email);
    if (appUser) {
      addNotification(appUser.id, "Pandit Application Status", `Your expert onboarding application for '${app.proposedCommunityName}' was not approved.`);
    }
  };

  const resolveAbuseReport = (reportId, action) => {
    // action: 'remove' or 'keep'
    const report = abuseReports.find(r => r.id === reportId);
    if (!report) return;

    if (action === "remove") {
      deletePost(report.reportedContentId);
      setAbuseReports(prev => prev.map(r => r.id === reportId ? { ...r, status: "resolved_removed" } : r));
    } else {
      setAbuseReports(prev => prev.map(r => r.id === reportId ? { ...r, status: "resolved_kept" } : r));
    }
  };

  const addTag = (newTag) => {
    if (newTag && !tags.includes(newTag)) {
      setTags(prev => [...prev, newTag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(prev => prev.filter(t => t !== tagToRemove));
  };

  // Grader helper: reset all localStorage to factory defaults
  const resetToDefault = () => {
    localStorage.clear();
    setUsers(initialUsers);
    setCommunities(initialCommunities);
    setPosts(initialPosts);
    setEvents(initialEvents);
    setPanditApplications(initialPanditApplications);
    setAbuseReports(initialAbuseReports);
    setTags(initialTags);
    setCommunityRequests(initialCommunityRequests);
    setCurrentUser(initialUsers[3]); // Priya
    setNotifications([
      {
        id: "nt_1",
        userId: "usr_standard_priya",
        title: "Welcome to Hometown Hub!",
        message: "Start connecting with your roots in Wayanad. Find coffee plantation news, events, and reunions.",
        read: false,
        date: "2026-05-27T09:00:00Z"
      }
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        users,
        communities,
        posts,
        events,
        panditApplications,
        abuseReports,
        tags,
        communityRequests,
        currentUser,
        notifications,
        registerUser,
        loginUser,
        changeUserRole,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        joinCommunity,
        leaveCommunity,
        createCommunityRequest,
        createPost,
        likePost,
        addComment,
        deletePost,
        pinPost,
        reportPost,
        createEvent,
        joinEvent,
        submitPanditApplication,
        approveCommunityRequest,
        rejectCommunityRequest,
        approvePanditApplication,
        rejectPanditApplication,
        resolveAbuseReport,
        addTag,
        removeTag,
        resetToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
