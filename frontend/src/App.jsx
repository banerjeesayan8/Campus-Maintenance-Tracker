import { useState } from "react";
import "./App.css";

const initialComplaints = [];

function App() {
  const [page, setPage] = useState("home");
  const [complaints, setComplaints] = useState(initialComplaints);

  const addComplaint = (complaint) => {
    const newComplaint = {
      ...complaint,
      id: `CMP-${String(complaints.length + 1).padStart(4, "0")}`,
      status: "Pending",
      createdAt: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setComplaints((current) => [...current, newComplaint]);
    setPage("dashboard");
  };

  const updateComplaintStatus = (id, status) => {
    setComplaints((current) =>
      current.map((complaint) =>
        complaint.id === id
          ? { ...complaint, status }
          : complaint
      )
    );
  };

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />

      {page === "home" && (
        <Home setPage={setPage} complaints={complaints} />
      )}

      {page === "login" && (
        <Login setPage={setPage} />
      )}

      {page === "dashboard" && (
        <Dashboard
          complaints={complaints}
          setPage={setPage}
        />
      )}

      {page === "report" && (
        <ReportComplaint
          addComplaint={addComplaint}
          setPage={setPage}
        />
      )}

      {page === "track" && (
        <TrackComplaint
          complaints={complaints}
          setPage={setPage}
          updateComplaintStatus={updateComplaintStatus}
        />
      )}
    </div>
  );
}


/* =========================
   NAVBAR
========================= */

function Navbar({ page, setPage }) {
  return (
    <nav className="navbar">
      <div
        className="brand"
        onClick={() => setPage("home")}
      >
        <div className="brand-mark">
          <span>✓</span>
        </div>

        <div>
          <div className="brand-name">CampusFix</div>
          <div className="brand-subtitle">
            Maintenance Portal
          </div>
        </div>
      </div>

      <div className="nav-links">
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => setPage("home")}
        >
          Home
        </button>

        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={page === "track" ? "active" : ""}
          onClick={() => setPage("track")}
        >
          Track Issue
        </button>

        <button
          className="nav-login"
          onClick={() => setPage("login")}
        >
          Login
        </button>
      </div>
    </nav>
  );
}


/* =========================
   HOME
========================= */

function Home({ setPage, complaints }) {
  return (
    <main>
      <section className="hero">

        <div className="hero-inner">

          <div className="hero-copy">

            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              CAMPUS MAINTENANCE PLATFORM
            </div>

            <h1>
               A smarter way to
               <span> maintain your campus.</span>
            </h1>

            <p>
              Report maintenance problems, track their progress,
              and help keep your campus safe, clean and
              comfortable — all from one place.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => setPage("report")}
              >
                Report an issue
                <span>→</span>
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setPage("track")}
              >
                Track a complaint
              </button>
            </div>

            <div className="hero-trust">
              <div className="avatar-stack">
                <span>U</span>
                <span>S</span>
                <span>A</span>
                <span>+</span>
              </div>

              <div>
                <strong>Built for campus communities</strong>
                <small>
                  Students, staff & maintenance teams
                </small>
              </div>
            </div>

          </div>


          <div className="hero-visual">

            <div className="dashboard-window">

              <div className="window-top">
                <div className="window-dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>

                <span>CampusFix Dashboard</span>

                <div className="window-profile">
                  S
                </div>
              </div>


              <div className="mini-dashboard">

                <div className="mini-welcome">
                  <div>
                    <small>STUDENT PORTAL</small>
                    <h3>Wecome to your campus portal</h3>
                  </div>

                  <span className="mini-date">
                    Today
                  </span>
                </div>


                <div className="mini-stats">

                  <div>
                    <small>Total Issues</small>
                    <strong>{complaints.length}</strong>
                  </div>

                  <div>
                    <small>In Progress</small>
                    <strong>
                      {
                        complaints.filter(
                          (c) => c.status === "In Progress"
                        ).length
                      }
                    </strong>
                  </div>

                  <div>
                    <small>Resolved</small>
                    <strong>
                      {
                        complaints.filter(
                          (c) => c.status === "Resolved"
                        ).length
                      }
                    </strong>
                  </div>

                </div>


                <div className="mini-section-title">
                  Recent activity
                </div>

                {complaints.length === 0 ? (
                  <div className="mini-empty">
                    <div className="mini-empty-icon">
                      ✓
                    </div>
                    <span>
                      No complaints submitted yet
                    </span>
                  </div>
                ) : (
                  complaints.slice(0, 2).map((item) => (
                    <div
                      className="mini-complaint"
                      key={item.id}
                    >
                      <div className="mini-issue-icon">
                        {item.category === "Electrical"
                          ? "⚡"
                          : "●"}
                      </div>

                      <div>
                        <strong>{item.title}</strong>
                        <small>
                          {item.location}
                        </small>
                      </div>

                      <StatusBadge
                        status={item.status}
                      />
                    </div>
                  ))
                )}

              </div>
            </div>

            <div className="floating-card floating-one">
              <div className="floating-icon green">
                ✓
              </div>
              <div>
                <strong>Transparent tracking</strong>
                <small>
                  Real-time complaint status
                </small>
              </div>
            </div>

            <div className="floating-card floating-two">
              <div className="floating-icon blue">
                +
              </div>
              <div>
                <strong>Quick reporting</strong>
                <small>
                  Submit in under a minute
                </small>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* STATS */}

      <section className="quick-stats">

        <div>
          <strong>01</strong>
          <span>Report</span>
          <p>
            Submit an issue with location,
            category and details.
          </p>
        </div>

        <div>
          <strong>02</strong>
          <span>Track</span>
          <p>
            Follow your complaint through
            every stage.
          </p>
        </div>

        <div>
          <strong>03</strong>
          <span>Resolve</span>
          <p>
            Get notified when the issue
            has been resolved.
          </p>
        </div>

      </section>


      {/* FEATURES */}

      <section className="features-section">

        <div className="section-heading">
          <div>
            <span>WHY CAMPUSFIX</span>
            <h2>
              Everything in one place.
            </h2>
          </div>

          <p>
            A centralized workflow designed to make
            campus maintenance simpler and more transparent.
          </p>
        </div>


        <div className="feature-grid">

          <Feature
            icon="↗"
            title="Simple reporting"
            text="Report problems with clear details, categories and exact campus locations."
          />

          <Feature
            icon="◉"
            title="Track every request"
            text="Know whether your complaint is pending, being handled or resolved."
          />

          <Feature
            icon="▣"
            title="Centralized records"
            text="Keep maintenance requests organized instead of relying on scattered reports."
          />

          <Feature
            icon="✓"
            title="Better communication"
            text="Give students and maintenance teams a clear view of what needs attention."
          />

        </div>

      </section>

    </main>
  );
}


function Feature({ icon, title, text }) {
  return (
    <div className="feature">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <span className="feature-arrow">
        →
      </span>

    </div>
  );
}


/* =========================
   LOGIN
========================= */

function Login({ setPage }) {
  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <div className="brand-mark">
            ✓
          </div>

          <span>CampusFix</span>
        </div>

        <div className="auth-heading">
          <h1>Welcome back</h1>

          <p>
            Sign in to manage your campus
            maintenance requests.
          </p>
        </div>


        <label>Email address</label>

        <input
          type="email"
          placeholder="you@college.edu"
        />


        <label>Password</label>

        <input
          type="password"
          placeholder="Enter your password"
        />


        <div className="form-row">
          <label className="checkbox-label">
            <input type="checkbox" />
            Remember me
          </label>

          <button className="forgot">
            Forgot password?
          </button>
        </div>


        <button
          className="btn btn-primary auth-submit"
          onClick={() => setPage("dashboard")}
        >
          Sign in
          <span>→</span>
        </button>


        <div className="auth-divider">
          <span>Demo mode</span>
        </div>

        <p className="auth-note">
          Authentication will be connected to the
          backend database.
        </p>

      </div>

    </div>
  );
}


/* =========================
   DASHBOARD
========================= */

function Dashboard({ complaints, setPage }) {

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const progress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;


  return (
    <main className="dashboard-page">

      <div className="dashboard-top">

        <div>
          <span className="page-kicker">
            STUDENT PORTAL
          </span>

          <h1>Good morning, Sayan.</h1>

          <p>
            Here's what's happening with your
            maintenance requests.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setPage("report")}
        >
          + Report an issue
        </button>

      </div>


      <div className="stat-grid">

        <DashboardStat
          label="Total requests"
          value={complaints.length}
          icon="▦"
        />

        <DashboardStat
          label="Pending"
          value={pending}
          icon="◷"
        />

        <DashboardStat
          label="In progress"
          value={progress}
          icon="↗"
        />

        <DashboardStat
          label="Resolved"
          value={resolved}
          icon="✓"
        />

      </div>


      <div className="dashboard-content">

        <section className="complaints-panel">

          <div className="panel-heading">

            <div>
              <span>MAINTENANCE REQUESTS</span>
              <h2>Recent complaints</h2>
            </div>

            <button
              onClick={() => setPage("track")}
            >
              View all →
            </button>

          </div>


          {complaints.length === 0 ? (

            <div className="dashboard-empty">

              <div className="large-empty-icon">
                +
              </div>

              <h3>
                No maintenance requests
              </h3>

              <p>
                You haven't reported any campus
                problems yet.
              </p>

              <button
                className="btn btn-primary"
                onClick={() => setPage("report")}
              >
                Report your first issue
              </button>

            </div>

          ) : (

            <div className="complaint-table">

              <div className="table-head">
                <span>ISSUE</span>
                <span>LOCATION</span>
                <span>STATUS</span>
                <span>DATE</span>
              </div>

              {complaints.map((complaint) => (

                <div
                  className="table-row"
                  key={complaint.id}
                >

                  <div className="issue-cell">

                    <div className="issue-avatar">
                      {complaint.category === "Electrical"
                        ? "⚡"
                        : "•"}
                    </div>

                    <div>
                      <strong>
                        {complaint.title}
                      </strong>

                      <small>
                        {complaint.id}
                      </small>
                    </div>

                  </div>

                  <span>
                    {complaint.location}
                  </span>

                  <StatusBadge
                    status={complaint.status}
                  />

                  <span>
                    {complaint.createdAt}
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>


        <aside className="workflow-panel">

          <span>HOW IT WORKS</span>

          <h2>
            From report to resolution.
          </h2>

          <div className="workflow">

            <WorkflowStep
              number="01"
              title="Submit"
              text="Tell us what's wrong."
              active
            />

            <WorkflowStep
              number="02"
              title="Review"
              text="Maintenance team reviews it."
            />

            <WorkflowStep
              number="03"
              title="Resolve"
              text="Issue gets fixed and closed."
            />

          </div>

        </aside>

      </div>

    </main>
  );
}


function DashboardStat({ label, value, icon }) {
  return (
    <div className="dashboard-stat">

      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>

    </div>
  );
}


function WorkflowStep({
  number,
  title,
  text,
  active
}) {
  return (
    <div className="workflow-step">

      <div className={`workflow-number ${active ? "active" : ""}`}>
        {number}
      </div>

      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>

    </div>
  );
}


/* =========================
   REPORT
========================= */

function ReportComplaint({
  addComplaint,
  setPage
}) {

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] =
    useState("Electrical");
  const [description, setDescription] =
    useState("");
  const [photo, setPhoto] =
    useState(null);


  const submitComplaint = (event) => {

    event.preventDefault();

    if (
      !title.trim() ||
      !location.trim() ||
      !description.trim()
    ) {
      alert(
        "Please complete all required fields."
      );
      return;
    }

    addComplaint({
      title: title.trim(),
      location: location.trim(),
      category,
      description: description.trim(),
      photo,
    });

  };


  return (
    <main className="report-page">

      <div className="report-header">

        <button
          className="back-link"
          onClick={() => setPage("dashboard")}
        >
          ← Back to dashboard
        </button>

        <span className="page-kicker">
          MAINTENANCE REQUEST
        </span>

        <h1>
          Report a campus issue
        </h1>

        <p>
          Give us a few details so the right team
          can take care of it.
        </p>

      </div>


      <form
        className="report-form"
        onSubmit={submitComplaint}
      >

        <div className="form-section">

          <div className="form-section-heading">
            <span>01</span>

            <div>
              <h2>Issue details</h2>
              <p>
                What needs attention?
              </p>
            </div>
          </div>


          <div className="field">

            <label>
              Issue title
              <span>*</span>
            </label>

            <input
              type="text"
              placeholder="e.g. Ceiling fan is not working"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>


          <div className="field">

            <label>
              Category
              <span>*</span>
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Cleaning</option>
              <option>Furniture</option>
              <option>Internet</option>
              <option>Other</option>

            </select>

          </div>


          <div className="field">

            <label>
              Description
              <span>*</span>
            </label>

            <textarea
              rows="5"
              placeholder="Describe what happened and any details that might help..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <small>
              Be as specific as possible.
            </small>

          </div>

        </div>


        <div className="form-section">

          <div className="form-section-heading">
            <span>02</span>

            <div>
              <h2>Location</h2>
              <p>
                Where is the issue?
              </p>
            </div>
          </div>


          <div className="field">

            <label>
              Campus location
              <span>*</span>
            </label>

            <div className="input-with-icon">

              <span>⌖</span>

              <input
                type="text"
                placeholder="e.g. Academic Block A, Room 204"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />

            </div>

          </div>

        </div>


        <div className="form-section">

          <div className="form-section-heading">
            <span>03</span>

            <div>
              <h2>Photo evidence</h2>
              <p>
                A photo can help the maintenance team
                understand the problem faster.
              </p>
            </div>
          </div>


          <label className="upload-box">

            <div className="upload-icon">
              ↑
            </div>

            <strong>
              Upload a photo
            </strong>

            <span>
              PNG, JPG or JPEG
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPhoto(e.target.files[0])
              }
            />

          </label>

          {photo && (
            <div className="file-selected">
              ✓ {photo.name}
            </div>
          )}

        </div>


        <div className="form-footer">

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setPage("dashboard")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit complaint
            <span>→</span>
          </button>

        </div>

      </form>

    </main>
  );
}


/* =========================
   TRACK
========================= */

function TrackComplaint({
  complaints,
  setPage
}) {

  return (
    <main className="track-page">

      <div className="track-header">

        <span className="page-kicker">
          COMPLAINT TRACKING
        </span>

        <h1>
          Your maintenance requests
        </h1>

        <p>
          Follow every issue from submission
          to resolution.
        </p>

      </div>


      {complaints.length === 0 ? (

        <div className="track-empty">

          <div className="large-empty-icon">
            ✓
          </div>

          <h2>
            Nothing to track yet
          </h2>

          <p>
            Once you submit a maintenance complaint,
            its progress will appear here.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => setPage("report")}
          >
            Report an issue
          </button>

        </div>

      ) : (

        <div className="tracking-list">

          {complaints.map((complaint) => (

            <div
              className="tracking-card"
              key={complaint.id}
            >

              <div className="tracking-card-top">

                <div>
                  <small>
                    {complaint.id}
                  </small>

                  <h2>
                    {complaint.title}
                  </h2>

                  <p>
                    {complaint.location}
                    {" • "}
                    {complaint.category}
                  </p>
                </div>

                <StatusBadge
                  status={complaint.status}
                />

              </div>


              <div className="timeline">

                <TimelineStep
                  title="Submitted"
                  active
                  number="✓"
                />

                <TimelineStep
                  title="In Progress"
                  active={
                    complaint.status ===
                    "In Progress" ||
                    complaint.status ===
                    "Resolved"
                  }
                  number="2"
                />

                <TimelineStep
                  title="Resolved"
                  active={
                    complaint.status ===
                    "Resolved"
                  }
                  number="3"
                />

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}


function TimelineStep({
  title,
  active,
  number
}) {
  return (
    <div className="timeline-step">

      <div
        className={`timeline-dot ${
          active ? "active" : ""
        }`}
      >
        {number}
      </div>

      <span>{title}</span>

    </div>
  );
}


function StatusBadge({ status }) {

  const className =
    status.toLowerCase().replace(" ", "-");

  return (
    <span className={`status-badge ${className}`}>
      <i></i>
      {status}
    </span>
  );
}


export default App;