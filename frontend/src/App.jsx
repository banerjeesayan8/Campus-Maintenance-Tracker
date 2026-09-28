import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Fan not working",
      location: "Room 204",
      category: "Electrical",
      status: "Pending",
    },
  ]);

  const addComplaint = (complaint) => {
    setComplaints([
      ...complaints,
      {
        ...complaint,
        id: complaints.length + 1,
        status: "Pending",
      },
    ]);

    setPage("dashboard");
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo" onClick={() => setPage("home")}>
          CampusFix
        </div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("login")}>Login</button>
        </div>
      </nav>

      {page === "home" && <Home setPage={setPage} />}

      {page === "login" && <Login setPage={setPage} />}

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
    </div>
  );
}


/* HOME */

function Home({ setPage }) {
  return (
    <main className="hero">
      <div className="hero-content">
        <span className="badge">
          Campus Maintenance Tracker
        </span>

        <h1>
          Report Campus Problems.
          <br />
          <span>Get Them Fixed.</span>
        </h1>

        <p className="hero-description">
          A centralized platform for students and staff
          to report, track and resolve campus maintenance
          complaints.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={() => setPage("report")}
          >
            Report a Problem
          </button>

          <button
            className="secondary-btn"
            onClick={() => setPage("dashboard")}
          >
            Track Complaint
          </button>
        </div>
      </div>

      <div className="hero-card">
        <div className="card-header">
          <span>Recent Complaint</span>
          <span className="status pending">Pending</span>
        </div>

        <h3>Fan not working</h3>

        <p>Room 204 • Electrical</p>

        <div className="progress">
          <div className="progress-line"></div>

          <div className="step active">✓</div>
          <div className="step">2</div>
          <div className="step">3</div>
        </div>

        <div className="progress-labels">
          <span>Submitted</span>
          <span>In Progress</span>
          <span>Resolved</span>
        </div>
      </div>
    </main>
  );
}


/* LOGIN */

function Login({ setPage }) {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>

        <p>Login to your CampusFix account</p>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
        />

        <button
          className="primary-btn full"
          onClick={() => setPage("dashboard")}
        >
          Login
        </button>

        <p className="demo-note">
          Demo login — no database required
        </p>
      </div>
    </div>
  );
}


/* DASHBOARD */

function Dashboard({ complaints, setPage }) {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <span className="badge">Student Dashboard</span>
          <h1>My Complaints</h1>
          <p>Track and manage your campus maintenance requests.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setPage("report")}
        >
          + Report Problem
        </button>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h3>{complaints.length}</h3>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h3>
            {complaints.filter(c => c.status === "Pending").length}
          </h3>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h3>0</h3>
          <p>Resolved</p>
        </div>
      </div>

      <div className="complaint-list">
        {complaints.map((complaint) => (
          <div className="complaint-item" key={complaint.id}>
            <div>
              <span className="complaint-id">
                Complaint #{complaint.id}
              </span>

              <h3>{complaint.title}</h3>

              <p>
                📍 {complaint.location} &nbsp; • &nbsp;
                {complaint.category}
              </p>
            </div>

            <span className="status pending">
              {complaint.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


/* REPORT COMPLAINT */

function ReportComplaint({ addComplaint, setPage }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Electrical");
  const [description, setDescription] = useState("");

  const submitComplaint = (e) => {
    e.preventDefault();

    if (!title || !location || !description) {
      alert("Please fill all required fields.");
      return;
    }

    addComplaint({
      title,
      location,
      category,
      description,
    });
  };

  return (
    <div className="report-container">
      <div className="report-box">
        <span className="badge">New Complaint</span>

        <h1>Report a Campus Problem</h1>

        <p>
          Provide details about the maintenance issue.
        </p>

        <form onSubmit={submitComplaint}>
          <label>Problem Title</label>

          <input
            type="text"
            placeholder="e.g. Fan not working"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Location</label>

          <input
            type="text"
            placeholder="e.g. Block A, Room 204"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Cleaning</option>
            <option>Furniture</option>
            <option>Internet</option>
            <option>Other</option>
          </select>

          <label>Description</label>

          <textarea
            placeholder="Describe the problem..."
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Photo Evidence</label>

          <input type="file" accept="image/*" />

          <button className="primary-btn full">
            Submit Complaint
          </button>
        </form>

        <button
          className="back-btn"
          onClick={() => setPage("dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default App;