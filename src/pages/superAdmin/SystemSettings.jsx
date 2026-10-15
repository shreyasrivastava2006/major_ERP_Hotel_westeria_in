import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SuperAdminLayout from "../../components/layout/SuperAdminLayout.jsx";
import "./SystemSettings.css";

// =====================================================
// STORAGE KEY
// =====================================================

const SETTINGS_KEY = "wisteriaSystemSettings";

// =====================================================
// DEFAULT SETTINGS
// =====================================================

const defaultSettings = {
  // General
  systemName: "Wisteria In",
  supportEmail: "shreya2026@westeria.com",
  contactNumber: "9987665433",
  website: "",
  systemDescription:
    "A complete hotel management ERP solution.",

  // Subscription
  trialDays: 14,
  expiryReminderDays: 7,
  gracePeriodDays: 3,
  autoRenewal: false,
  allowTrial: true,

  // Security
  sessionTimeout: 30,
  minimumPasswordLength: 8,
  twoFactorAuth: false,
  strongPassword: true,
  loginAlerts: true,

  // Notifications
  emailNotifications: true,
  subscriptionAlerts: true,
  supportAlerts: true,
  systemAlerts: true,
  weeklyReports: false,

  // Preferences
  currency: "INR",
  timezone: "Asia/Kolkata",
  dateFormat: "DD/MM/YYYY",
  language: "English",

  // Maintenance
  maintenanceMode: false,
  maintenanceMessage:
    "Wisteria In ERP is currently undergoing scheduled maintenance. Please try again later.",
};

// =====================================================
// HELPER - READ SETTINGS
// =====================================================

const getSavedSettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed)
      ) {
        return {
          ...defaultSettings,
          ...parsed,
        };
      }
    }
  } catch (error) {
    console.error("Error loading system settings:", error);
  }

  return { ...defaultSettings };
};

// =====================================================
// REUSABLE TOGGLE COMPONENT
// =====================================================

function SettingToggle({
  title,
  description,
  checked,
  onChange,
  danger = false,
}) {
  return (
    <div className="system-setting-toggle-row">
      <div className="system-setting-toggle-info">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <label
        className={`system-setting-switch ${
          danger ? "danger" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={Boolean(checked)}
          onChange={(event) =>
            onChange(event.target.checked)
          }
        />

        <span className="system-setting-slider"></span>
      </label>
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================

function SystemSettings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(
    getSavedSettings
  );

  const [activeTab, setActiveTab] = useState("general");

  const [savedSettings, setSavedSettings] = useState(
    getSavedSettings
  );

  const [notification, setNotification] = useState("");

  const [showResetConfirm, setShowResetConfirm] =
    useState(false);

  // =====================================================
  // UNSAVED CHANGES
  // =====================================================

  const hasChanges =
    JSON.stringify(settings) !==
    JSON.stringify(savedSettings);

  // =====================================================
  // NOTIFICATION TIMER
  // =====================================================

  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [notification]);

  // =====================================================
  // UPDATE SETTINGS
  // =====================================================

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const handleSaveSettings = () => {
    if (!settings.systemName.trim()) {
      setNotification("System name cannot be empty.");
      setActiveTab("general");
      return;
    }

    if (
      !settings.supportEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        settings.supportEmail
      )
    ) {
      setNotification("Please enter a valid support email.");
      setActiveTab("general");
      return;
    }

    if (
      Number(settings.trialDays) < 0 ||
      Number(settings.expiryReminderDays) < 0 ||
      Number(settings.gracePeriodDays) < 0
    ) {
      setNotification(
        "Subscription days cannot be negative."
      );
      setActiveTab("subscription");
      return;
    }

    if (Number(settings.minimumPasswordLength) < 6) {
      setNotification(
        "Minimum password length must be at least 6."
      );
      setActiveTab("security");
      return;
    }

    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
      );

      setSavedSettings({ ...settings });

      window.dispatchEvent(
        new Event("wisteria-settings-updated")
      );

      setNotification("Settings saved successfully.");
    } catch (error) {
      console.error("Error saving settings:", error);
      setNotification("Unable to save settings.");
    }
  };

  // =====================================================
  // RESET SETTINGS
  // =====================================================

  const handleResetSettings = () => {
    const defaults = { ...defaultSettings };

    try {
      localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(defaults)
      );

      setSettings(defaults);
      setSavedSettings({ ...defaults });

      setShowResetConfirm(false);
      setActiveTab("general");

      window.dispatchEvent(
        new Event("wisteria-settings-updated")
      );

      setNotification(
        "System settings restored to defaults."
      );
    } catch (error) {
      console.error("Error resetting settings:", error);
      setNotification("Unable to reset settings.");
    }
  };

  // =====================================================
  // TABS
  // =====================================================

  const tabs = [
    {
      id: "general",
      label: "General Settings",
      icon: "bi-sliders",
    },
    {
      id: "subscription",
      label: "Subscriptions",
      icon: "bi-credit-card",
    },
    {
      id: "security",
      label: "Security",
      icon: "bi-shield-lock",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "bi-bell",
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: "bi-gear",
    },
    {
      id: "maintenance",
      label: "Maintenance",
      icon: "bi-tools",
    },
  ];

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <SuperAdminLayout>
      <div className="system-settings-page">

        {/* ================= BREADCRUMB ================= */}

        <div className="system-settings-breadcrumb">
          <button
            type="button"
            onClick={() => navigate("/super-admin")}
          >
            Super Admin
          </button>

          <i className="bi bi-chevron-right"></i>

          <span>System</span>

          <i className="bi bi-chevron-right"></i>

          <strong>System Settings</strong>
        </div>

        {/* ================= HEADER ================= */}

        <div className="system-settings-header">
          <div>
            <span className="system-settings-eyebrow">
              SYSTEM CONFIGURATION
            </span>

            <h1>System Settings</h1>

            <p>
              Configure global preferences, security,
              subscriptions and system controls for
              Wisteria In ERP.
            </p>
          </div>

          <div className="system-settings-header-actions">
            <button
              type="button"
              className="system-settings-back-btn"
              onClick={() => navigate("/super-admin")}
            >
              <i className="bi bi-arrow-left"></i>
              Dashboard
            </button>

            <button
              type="button"
              className="system-settings-save-btn"
              onClick={handleSaveSettings}
              disabled={!hasChanges}
            >
              <i className="bi bi-check2-circle"></i>
              Save Changes
            </button>
          </div>
        </div>

        {/* ================= NOTIFICATION ================= */}

        {notification && (
          <div className="system-settings-notification">
            <i className="bi bi-info-circle"></i>
            {notification}
          </div>
        )}

        {/* ================= STATUS BAR ================= */}

        <div className="system-settings-status-bar">
          <div className="system-settings-status-left">
            <div className="system-settings-status-icon">
              <i className="bi bi-gear-wide-connected"></i>
            </div>

            <div>
              <strong>System Configuration</strong>

              <span>
                {hasChanges
                  ? "You have unsaved changes"
                  : "All settings are up to date"}
              </span>
            </div>
          </div>

          <div className="system-settings-status-right">
            <span
              className={`system-settings-status-badge ${
                settings.maintenanceMode
                  ? "maintenance"
                  : "operational"
              }`}
            >
              <span className="status-dot"></span>

              {settings.maintenanceMode
                ? "Maintenance Mode"
                : "System Operational"}
            </span>
          </div>
        </div>

        {/* ================= MAIN LAYOUT ================= */}

        <div className="system-settings-layout">

          {/* ================= LEFT TABS ================= */}

          <aside className="system-settings-sidebar">
            <div className="system-settings-sidebar-heading">
              <span>SETTINGS MENU</span>
            </div>

            <div className="system-settings-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`system-settings-tab ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                >
                  <i className={`bi ${tab.icon}`}></i>
                  <span>{tab.label}</span>
                  <i className="bi bi-chevron-right tab-arrow"></i>
                </button>
              ))}
            </div>

            <div className="system-settings-sidebar-footer">
              <div className="system-settings-help-icon">
                <i className="bi bi-shield-check"></i>
              </div>

              <strong>Global Configuration</strong>

              <p>
                These preferences are stored locally
                until backend integration is enabled.
              </p>
            </div>
          </aside>

          {/* ================= RIGHT CONTENT ================= */}

          <div className="system-settings-content">

            {/* =========================================
                GENERAL SETTINGS
            ========================================= */}

            {activeTab === "general" && (
              <div className="system-settings-card">
                <div className="system-settings-card-header">
                  <div className="system-settings-card-icon">
                    <i className="bi bi-sliders"></i>
                  </div>

                  <div>
                    <span>GENERAL CONFIGURATION</span>
                    <h2>General Settings</h2>
                    <p>
                      Manage ERP identity and contact information.
                    </p>
                  </div>
                </div>

                <div className="system-settings-card-body">
                  <div className="system-settings-form-grid">

                    <div className="system-settings-field">
                      <label>System Name *</label>

                      <input
                        type="text"
                        value={settings.systemName}
                        onChange={(event) =>
                          updateSetting(
                            "systemName",
                            event.target.value
                          )
                        }
                        placeholder="Enter system name"
                      />
                    </div>

                    <div className="system-settings-field">
                      <label>Support Email *</label>

                      <input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(event) =>
                          updateSetting(
                            "supportEmail",
                            event.target.value
                          )
                        }
                        placeholder="Enter support email"
                      />
                    </div>

                    <div className="system-settings-field">
                      <label>Contact Number</label>

                      <input
                        type="tel"
                        value={settings.contactNumber}
                        onChange={(event) =>
                          updateSetting(
                            "contactNumber",
                            event.target.value
                          )
                        }
                        placeholder="Enter contact number"
                      />
                    </div>

                    <div className="system-settings-field">
                      <label>Website</label>

                      <input
                        type="text"
                        value={settings.website}
                        onChange={(event) =>
                          updateSetting(
                            "website",
                            event.target.value
                          )
                        }
                        placeholder="Enter website address"
                      />
                    </div>

                    <div className="system-settings-field full">
                      <label>System Description</label>

                      <textarea
                        rows="4"
                        value={settings.systemDescription}
                        onChange={(event) =>
                          updateSetting(
                            "systemDescription",
                            event.target.value
                          )
                        }
                        placeholder="Enter system description"
                      />
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* =========================================
                SUBSCRIPTION SETTINGS
            ========================================= */}

            {activeTab === "subscription" && (
              <div className="system-settings-card">
                <div className="system-settings-card-header">
                  <div className="system-settings-card-icon">
                    <i className="bi bi-credit-card"></i>
                  </div>

                  <div>
                    <span>SUBSCRIPTION CONFIGURATION</span>
                    <h2>Subscription Settings</h2>
                    <p>
                      Configure subscription trials,
                      renewals and expiry reminders.
                    </p>
                  </div>
                </div>

                <div className="system-settings-card-body">

                  <div className="system-settings-form-grid">

                    <div className="system-settings-field">
                      <label>Free Trial Duration (Days)</label>

                      <input
                        type="number"
                        min="0"
                        value={settings.trialDays}
                        onChange={(event) =>
                          updateSetting(
                            "trialDays",
                            Number(event.target.value)
                          )
                        }
                      />

                      <small>
                        Number of days allowed for free trial.
                      </small>
                    </div>

                    <div className="system-settings-field">
                      <label>Expiry Reminder (Days)</label>

                      <input
                        type="number"
                        min="0"
                        value={settings.expiryReminderDays}
                        onChange={(event) =>
                          updateSetting(
                            "expiryReminderDays",
                            Number(event.target.value)
                          )
                        }
                      />

                      <small>
                        Days before expiry to send reminders.
                      </small>
                    </div>

                    <div className="system-settings-field">
                      <label>Grace Period (Days)</label>

                      <input
                        type="number"
                        min="0"
                        value={settings.gracePeriodDays}
                        onChange={(event) =>
                          updateSetting(
                            "gracePeriodDays",
                            Number(event.target.value)
                          )
                        }
                      />

                      <small>
                        Additional days after subscription expiry.
                      </small>
                    </div>

                  </div>

                  <div className="system-settings-divider"></div>

                  <div className="system-settings-toggle-list">

                    <SettingToggle
                      title="Enable Free Trial"
                      description="Allow new hotels to start with a free trial."
                      checked={settings.allowTrial}
                      onChange={(value) =>
                        updateSetting("allowTrial", value)
                      }
                    />

                    <SettingToggle
                      title="Automatic Renewal"
                      description="Enable the automatic renewal preference for subscriptions."
                      checked={settings.autoRenewal}
                      onChange={(value) =>
                        updateSetting("autoRenewal", value)
                      }
                    />

                  </div>
                </div>
              </div>
            )}

            {/* =========================================
                SECURITY SETTINGS
            ========================================= */}

            {activeTab === "security" && (
              <div className="system-settings-card">
                <div className="system-settings-card-header">
                  <div className="system-settings-card-icon">
                    <i className="bi bi-shield-lock"></i>
                  </div>

                  <div>
                    <span>SECURITY CONFIGURATION</span>
                    <h2>Security Settings</h2>
                    <p>
                      Manage authentication preferences
                      and password policies.
                    </p>
                  </div>
                </div>

                <div className="system-settings-card-body">

                  <div className="system-settings-form-grid">

                    <div className="system-settings-field">
                      <label>Session Timeout (Minutes)</label>

                      <select
                        value={settings.sessionTimeout}
                        onChange={(event) =>
                          updateSetting(
                            "sessionTimeout",
                            Number(event.target.value)
                          )
                        }
                      >
                        <option value={15}>15 Minutes</option>
                        <option value={30}>30 Minutes</option>
                        <option value={60}>1 Hour</option>
                        <option value={120}>2 Hours</option>
                      </select>
                    </div>

                    <div className="system-settings-field">
                      <label>Minimum Password Length</label>

                      <input
                        type="number"
                        min="6"
                        max="32"
                        value={settings.minimumPasswordLength}
                        onChange={(event) =>
                          updateSetting(
                            "minimumPasswordLength",
                            Number(event.target.value)
                          )
                        }
                      />
                    </div>

                  </div>

                  <div className="system-settings-divider"></div>

                  <div className="system-settings-toggle-list">

                    <SettingToggle
                      title="Two-Factor Authentication"
                      description="Require an additional verification step during login."
                      checked={settings.twoFactorAuth}
                      onChange={(value) =>
                        updateSetting("twoFactorAuth", value)
                      }
                    />

                    <SettingToggle
                      title="Strong Password Policy"
                      description="Require stronger passwords for system accounts."
                      checked={settings.strongPassword}
                      onChange={(value) =>
                        updateSetting("strongPassword", value)
                      }
                    />

                    <SettingToggle
                      title="Login Security Alerts"
                      description="Enable alerts for important login activity."
                      checked={settings.loginAlerts}
                      onChange={(value) =>
                        updateSetting("loginAlerts", value)
                      }
                    />

                  </div>

                  <div className="system-settings-info-box">
                    <i className="bi bi-info-circle"></i>

                    <p>
                      These are configuration preferences.
                      Authentication and security enforcement
                      must be implemented in the backend.
                    </p>
                  </div>

                </div>
              </div>
            )}

            {/* =========================================
                NOTIFICATIONS
            ========================================= */}

            {activeTab === "notifications" && (
              <div className="system-settings-card">
                <div className="system-settings-card-header">
                  <div className="system-settings-card-icon">
                    <i className="bi bi-bell"></i>
                  </div>

                  <div>
                    <span>NOTIFICATION CONFIGURATION</span>
                    <h2>Notification Settings</h2>
                    <p>
                      Choose which system events should
                      generate notifications.
                    </p>
                  </div>
                </div>

                <div className="system-settings-card-body">

                  <div className="system-settings-toggle-list">

                    <SettingToggle
                      title="Email Notifications"
                      description="Enable email notification preferences."
                      checked={settings.emailNotifications}
                      onChange={(value) =>
                        updateSetting(
                          "emailNotifications",
                          value
                        )
                      }
                    />

                    <SettingToggle
                      title="Subscription Alerts"
                      description="Receive alerts for subscription expiry and renewal."
                      checked={settings.subscriptionAlerts}
                      onChange={(value) =>
                        updateSetting(
                          "subscriptionAlerts",
                          value
                        )
                      }
                    />

                    <SettingToggle
                      title="Support Ticket Alerts"
                      description="Receive alerts when new support tickets are created."
                      checked={settings.supportAlerts}
                      onChange={(value) =>
                        updateSetting(
                          "supportAlerts",
                          value
                        )
                      }
                    />

                    <SettingToggle
                      title="System Alerts"
                      description="Receive alerts about important system events."
                      checked={settings.systemAlerts}
                      onChange={(value) =>
                        updateSetting(
                          "systemAlerts",
                          value
                        )
                      }
                    />

                    <SettingToggle
                      title="Weekly Reports"
                      description="Enable weekly performance report preferences."
                      checked={settings.weeklyReports}
                      onChange={(value) =>
                        updateSetting(
                          "weeklyReports",
                          value
                        )
                      }
                    />

                  </div>

                </div>
              </div>
            )}

            {/* =========================================
                SYSTEM PREFERENCES
            ========================================= */}

            {activeTab === "preferences" && (
              <div className="system-settings-card">
                <div className="system-settings-card-header">
                  <div className="system-settings-card-icon">
                    <i className="bi bi-gear"></i>
                  </div>

                  <div>
                    <span>SYSTEM PREFERENCES</span>
                    <h2>Preferences</h2>
                    <p>
                      Configure regional and display preferences.
                    </p>
                  </div>
                </div>

                <div className="system-settings-card-body">

                  <div className="system-settings-form-grid">

                    <div className="system-settings-field">
                      <label>Default Currency</label>

                      <select
                        value={settings.currency}
                        onChange={(event) =>
                          updateSetting(
                            "currency",
                            event.target.value
                          )
                        }
                      >
                        <option value="INR">
                          INR - Indian Rupee (₹)
                        </option>

                        <option value="USD">
                          USD - US Dollar ($)
                        </option>

                        <option value="EUR">
                          EUR - Euro (€)
                        </option>

                        <option value="GBP">
                          GBP - British Pound (£)
                        </option>
                      </select>
                    </div>

                    <div className="system-settings-field">
                      <label>Timezone</label>

                      <select
                        value={settings.timezone}
                        onChange={(event) =>
                          updateSetting(
                            "timezone",
                            event.target.value
                          )
                        }
                      >
                        <option value="Asia/Kolkata">
                          Asia/Kolkata (IST)
                        </option>

                        <option value="UTC">
                          UTC
                        </option>

                        <option value="Europe/London">
                          Europe/London
                        </option>

                        <option value="America/New_York">
                          America/New_York
                        </option>
                      </select>
                    </div>

                    <div className="system-settings-field">
                      <label>Date Format</label>

                      <select
                        value={settings.dateFormat}
                        onChange={(event) =>
                          updateSetting(
                            "dateFormat",
                            event.target.value
                          )
                        }
                      >
                        <option value="DD/MM/YYYY">
                          DD/MM/YYYY
                        </option>

                        <option value="MM/DD/YYYY">
                          MM/DD/YYYY
                        </option>

                        <option value="YYYY-MM-DD">
                          YYYY-MM-DD
                        </option>
                      </select>
                    </div>

                    <div className="system-settings-field">
                      <label>Language</label>

                      <select
                        value={settings.language}
                        onChange={(event) =>
                          updateSetting(
                            "language",
                            event.target.value
                          )
                        }
                      >
                        <option value="English">
                          English
                        </option>

                        <option value="Hindi">
                          Hindi
                        </option>
                      </select>
                    </div>

                  </div>

                  <div className="system-settings-info-box">
                    <i className="bi bi-info-circle"></i>

                    <p>
                      These values are saved as preferences.
                      Other modules must read these settings
                      to apply currency, timezone, date format
                      and language changes.
                    </p>
                  </div>

                </div>
              </div>
            )}

            {/* =========================================
                MAINTENANCE SETTINGS
            ========================================= */}

            {activeTab === "maintenance" && (
              <div className="system-settings-card">
                <div className="system-settings-card-header">
                  <div className="system-settings-card-icon">
                    <i className="bi bi-tools"></i>
                  </div>

                  <div>
                    <span>SYSTEM MAINTENANCE</span>
                    <h2>Maintenance Settings</h2>
                    <p>
                      Configure maintenance mode
                      and system availability preferences.
                    </p>
                  </div>
                </div>

                <div className="system-settings-card-body">

                  <div className="system-settings-maintenance-box">
                    <div className="system-settings-maintenance-icon">
                      <i className="bi bi-exclamation-triangle"></i>
                    </div>

                    <div>
                      <strong>Maintenance Mode</strong>

                      <p>
                        This setting indicates whether the
                        system should be in maintenance mode.
                        Access restrictions require backend
                        integration.
                      </p>
                    </div>
                  </div>

                  <div className="system-settings-toggle-list">

                    <SettingToggle
                      title="Enable Maintenance Mode"
                      description="Mark the ERP as being under maintenance."
                      checked={settings.maintenanceMode}
                      onChange={(value) =>
                        updateSetting(
                          "maintenanceMode",
                          value
                        )
                      }
                      danger
                    />

                  </div>

                  <div className="system-settings-divider"></div>

                  <div className="system-settings-form-grid">
                    <div className="system-settings-field full">
                      <label>Maintenance Message</label>

                      <textarea
                        rows="5"
                        value={settings.maintenanceMessage}
                        onChange={(event) =>
                          updateSetting(
                            "maintenanceMessage",
                            event.target.value
                          )
                        }
                        placeholder="Enter maintenance message"
                      />

                      <small>
                        Message to display when maintenance
                        restrictions are implemented.
                      </small>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ================= BOTTOM ACTIONS ================= */}

            <div className="system-settings-bottom-actions">
              <button
                type="button"
                className="system-settings-reset-btn"
                onClick={() =>
                  setShowResetConfirm(true)
                }
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                Reset to Default
              </button>

              <div className="system-settings-bottom-right">
                {hasChanges && (
                  <span className="system-settings-unsaved">
                    <i className="bi bi-exclamation-circle"></i>
                    Unsaved changes
                  </span>
                )}

                <button
                  type="button"
                  className="system-settings-save-btn"
                  onClick={handleSaveSettings}
                  disabled={!hasChanges}
                >
                  <i className="bi bi-check2-circle"></i>
                  Save Changes
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ================= RESET CONFIRMATION ================= */}

        {showResetConfirm && (
          <div
            className="system-settings-modal-overlay"
            onClick={() =>
              setShowResetConfirm(false)
            }
          >
            <div
              className="system-settings-confirm-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Reset System Settings"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div className="system-settings-confirm-icon">
                <i className="bi bi-arrow-counterclockwise"></i>
              </div>

              <h2>Reset System Settings?</h2>

              <p>
                This will restore all system settings
                to their default values. Your current
                configuration will be replaced.
              </p>

              <div className="system-settings-confirm-actions">
                <button
                  type="button"
                  className="system-settings-cancel-btn"
                  onClick={() =>
                    setShowResetConfirm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="system-settings-confirm-reset-btn"
                  onClick={handleResetSettings}
                >
                  Reset Settings
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </SuperAdminLayout>
  );
}

export default SystemSettings;