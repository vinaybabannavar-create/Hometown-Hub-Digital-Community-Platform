import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function RoleSwitcher() {
  const { currentUser, changeUserRole, resetToDefault } = useContext(AppContext);

  const roles = [
    {
      id: "usr_standard_priya",
      name: "Priya Sharma",
      roleLabel: "User",
      description: "Standard User (Wayanad Roots)",
      color: "var(--accent-primary)"
    },
    {
      id: "usr_wayanad_admin",
      name: "Devi Nair",
      roleLabel: "Comm Admin",
      description: "Wayanad Community Moderator",
      color: "var(--accent-secondary)"
    },
    {
      id: "usr_pandit_shastri",
      name: "Ramesh Shastri",
      roleLabel: "Pandit",
      description: "Local Cultural Guide / Pandit",
      color: "#a855f7" // Purple
    },
    {
      id: "usr_platform_admin",
      name: "Rajesh Kumar",
      roleLabel: "Platform Admin",
      description: "Global Platform Administrator",
      color: "var(--warning)"
    }
  ];

  return (
    <div className="role-switcher-hud">
      <div className="role-switcher-left">
        <div className="grader-badge">Grading HUD</div>
        <div className="role-buttons">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => changeUserRole(r.id)}
              className={`role-btn ${currentUser.id === r.id ? "active" : ""}`}
              style={{
                borderColor: currentUser.id === r.id ? r.color : "rgba(255, 255, 255, 0.1)",
                color: currentUser.id === r.id ? r.color : ""
              }}
              title={r.description}
            >
              🎭 {r.roleLabel}: {r.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="role-switcher-right">
        <div className="current-actor-info">
          <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>Acting As:</span>
          <img src={currentUser.avatar} alt={currentUser.name} className="current-actor-avatar" />
          <span style={{ fontWeight: 600, fontSize: "0.8rem" }}>{currentUser.name}</span>
          <span className="badge badge-primary" style={{ fontSize: "0.6rem", padding: "0.1rem 0.4rem" }}>
            {currentUser.role}
          </span>
        </div>
        <button onClick={resetToDefault} className="reset-btn" title="Clear localStorage and restore default data">
          🔄 Reset Database
        </button>
      </div>
    </div>
  );
}
