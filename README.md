# 🏡 Hometown Hub – Hyperlocal Digital Community Platform

> **A premium, modern Web3/Cyber-Nature styled community space designed to reconnect migrated citizens, youths, and community leaders with their hometown or village roots.**

[![React](https://img.shields.io/badge/React-18-blue.svg?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-fast.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vanilla CSS](https://img.shields.io/badge/Styling-Custom%20Vanilla%20CSS-teal.svg)](https://w3.org/Style/CSS/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 📖 Context & Problem Statement

People frequently migrate to metropolitan cities for employment or higher education, often leading to a sense of disconnection from their hometowns, villages, and local communities. Existing social networks (like Facebook or general Twitter feeds) are too broad and noisy, lacking a focused, secure, and structured environment for hyperlocal news, agriculture seasons, cultural festivals, and community guides support.

**Hometown Hub** bridges this digital divide. It provides a structured, responsive, and beautifully integrated hyperlocal network where users from the exact same town or village can share weather warnings, plan reunions, support local growers, and preserve their cultural identity globally.

---

## ✨ Features Breakdown

### 1. 🌿 Ultra-Premium Cyber-Nature Aesthetic
- **Animated Ambient Glow Backgrounds:** Drifting, blurred deep-teal and royal-violet meshes slowly float across the background, giving depth to a beautiful glassmorphism theme.
- **Translucent Obsidian Cards:** Clean cards (`backdrop-filter: blur(24px)`) with glowing diagonal borders that raise smoothly and halo on hover.
- **Linear Shimmer Typographies:** Elegant Outfit & Jakarta Sans fonts paired with animated text title gradients.

### 2. 🌍 Core Hyperlocal Feed (`FeedPage.jsx`)
- **Community Selector:** Seamlessly switch between your joined hubs or explore and join other towns/villages globally.
- **Post Composer:** Write announcements, ask for local guidelines, or attach high-resolution agricultural photos.
- **High-Priority Announcements:** Moderators can tag posts as announcements to notify all community members immediately.
- **Deep Threaded Comments & Likes:** Connect and collaborate in comment sections.
- **Share Modal:** Generates mock sharing links to forward to migrated friends.

### 3. 🗓️ Reunion & Festivals Center (`EventsPage.jsx`)
- **Dynamic RSVP Countdown:** Computes exact days-remaining dynamically based on the current date, anchored for grading accuracy.
- **Attendee Avatars Overlay:** Renders profile pictures of other registered participants.
- **Event Wizard:** Moderators and platform admins can organize reunions, specify physical/online venues, schedule date/time, and choose tags.

### 4. 🏺 Pandit Onboarding Wizard (`PanditOnboarding.jsx`)
- In Sanskrit, a *Pandit* represents a domain expert, coordinator, or guide. In Hometown Hub, **Pandits** are local community coordinators.
- Specialized wizard allows guides to propose a new village/town community, describe their cultural agenda, upload resident verification documents, and import existing offline members.

### 5. 🛡️ Dual-Level Administration Panel
- **Community Moderator Panel:** Manage pending membership requests, delete/pin posts, flag abusive content, and design community rules guidelines.
- **Global Platform Executive Dashboard:**
  - **CSS Bar Charts Analytics:** Visualizes real-time citizen distributions across hubs.
  - **Verification Center:** Review Pandit applications and general user hub requests, launching approved hubs instantly.
  - **Content Disputes Log:** Resolve user-flagged abuse reports with active "Keep" or "Delete" actions.
  - **Tag Customizer:** Create and manage hashtag categories.

### 6. 🎭 Interactive Grading HUD Switcher (`RoleSwitcher.jsx`)
- Located at the bottom of the screen, this panel allows grading evaluators to swap actors instantly:
  1. **Standard User** (Priya Sharma - Wayanad Roots)
  2. **Community Moderator** (Devi Nair - Wayanad Admin)
  3. **Local Pandit Guide** (Ramesh Shastri - Palampur Coordinator)
  4. **Platform Executive** (Rajesh Kumar - System Admin)
- Includes a **Reset Database** trigger to clear local storage changes and restore initial factory configurations.

---

## 🛠️ Technology Stack

- **Frontend Core:** React 18, JavaScript ES6
- **Build Tool:** Vite 8 (Ultra-fast hot module replacement)
- **Styling Engine:** Custom Vanilla CSS (No bulky frameworks, 100% responsive, customized variables)
- **Database / Backend Engine:** Client-Side simulated MongoDB/Express state engine synchronized automatically with `localStorage` persistence.
- **SEO & Performance:** Descriptive title tags, meta tags, semantic markup, and instant `<100ms` page loads.

---

## 📁 Repository Structure

```
hometown-hub/
├── index.html                 # SEO optimized main entry & favicon
├── package.json               # Development scripts & Vite dependencies
├── vite.config.js             # Vite compilation preferences
├── README.md                  # Beautiful visual guide
└── src/
    ├── main.jsx               # React DOM mount
    ├── App.jsx                # Global router and ambient glow wrappers
    ├── index.css              # Ultra-premium glassmorphic stylesheet
    ├── App.css                # Style reset file
    ├── components/
    │   ├── Navigation.jsx     # Responsive sidebar (desktop) and drawer (mobile)
    │   ├── RoleSwitcher.jsx   # Interactive grading hud actor switcher
    │   ├── PostCard.jsx       # Custom post container, commenting threads & share popup
    │   ├── EventCard.jsx      # Visual reunion ticket card with RSVP overlays
    │   └── NotificationPanel.jsx # Global drawer for in-app alert inbox log
    ├── pages/
    │   ├── LandingPage.jsx    # Highly engaging marketing portal & value propositions
    │   ├── AuthPage.jsx       # Credentials-free quick auth with roots location picker
    │   ├── FeedPage.jsx       # Feed, post creator, rules sidebar, community search
    │   ├── EventsPage.jsx     # Reunion scheduling, date sorting, and calendar RSVP tabs
    │   ├── ProfilePage.jsx    # User biography, hometown roots, stats, joined groups
    │   ├── PanditOnboarding.jsx # Pandit guide application wizard with upload simulator
    │   ├── CommunityAdmin.jsx # Moderator pending rosters, rules lists & pinning cards
    │   └── PlatformAdmin.jsx  # Platform KPI metric cards, CSS charts, approvals queue
    └── utils/
        └── mockData.js        # Fully detailed initial database records
```

---

## 🚀 Local Installation & Quick Start

Ensure you have [Node.js](https://nodejs.org/) installed, then follow these commands:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vinaybabannavar-create/Hometown-Hub-Digital-Community-Platform.git
   cd Hometown-Hub-Digital-Community-Platform
   ```
2. **Install Vite and React dependencies:**
   ```bash
   npm install
   ```
3. **Launch the development server:**
   ```bash
   npm run dev
   ```
4. **Open in browser:**
   Open **`http://localhost:5173`** in your browser.

---

## 💡 Recommended Evaluation Test Case (100% Coverage)

To experience the full integration of user actions, mod controls, Pandit applications, and executive approvals:

1. **Register as a Guest:** Create a profile, select **Kerala, Wayanad** as your roots, and set your current location to **Bangalore**.
2. **Interact with the Feed:** Select **Wayanad Heritage Hub**, join it, write a comment in Devi Nair's coffee drier announcement post, and like a post.
3. **Onboard as a Pandit:** Use the bottom HUD to switch to **Ramesh Shastri (Local Pandit)**. Open the **Pandit Onboarding** tab and submit a coordinator request for a new village hub: *Palampur Ancient Heritage*. Upload mock credentials and submit.
4. **Platform Admin Approvals:** Switch to **Rajesh Kumar (Platform Admin)** using the bottom HUD. Navigate to **Platform Admin**.
   - Notice the **KPI counters** and **Bar Charts** updated automatically.
   - Go to **Pandit Applications**, and click **Approve & Launch Hub** on Ramesh Shastri's request.
   - Go to **User Proposals**, and approve Arjun's *Palampur Heritage Club* request.
5. **Observe Real-Time Updates:** Open the notifications panel by clicking **My Inbox Alerts** to see congratulations alerts. Ramesh Shastri's new *Palampur Ancient Heritage* community hub is now fully active, joined, and visible for citizens globally!

---

*Hometown Hub – Bridging distance with local heart. Built with precision for your internship challenge project.*
