import React, { useState } from "react";

export default function App() {
  const [active, setActive] = useState("home");
  const [pledge, setPledge] = useState({ name: "", message: "" });
  const [issue, setIssue] = useState({ station: "", problem: "", suggestion: "" });
  const [pledges, setPledges] = useState([]);
  const [issues, setIssues] = useState([]);

  function submitPledge(e) {
    e.preventDefault();
    if (!pledge.name.trim() || !pledge.message.trim()) return alert("Fill all fields");
    setPledges([...pledges, pledge]);
    setPledge({ name: "", message: "" });
  }

  function submitIssue(e) {
    e.preventDefault();
    if (!issue.station.trim() || !issue.problem.trim()) return alert("Fill all fields");
    setIssues([...issues, issue]);
    setIssue({ station: "", problem: "", suggestion: "" });
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>Youth Election Monitoring Portal</h1>
        <nav style={styles.nav}>
          <button onClick={() => setActive("home")} style={styles.navBtn}>Home</button>
          <button onClick={() => setActive("pledge")} style={styles.navBtn}>Get Involved</button>
          <button onClick={() => setActive("issues")} style={styles.navBtn}>System Issues</button>
        </nav>
      </header>

      {active === "home" && (
        <section style={styles.section}>
          <h2>Empowering the Next Generation</h2>
          <p>
            Elections are the heartbeat of democracy. As the younger generation, you have the power
            to make every vote count — by monitoring, reporting, and ensuring transparency.
          </p>
          <p>
            Join hands to build a future where fairness and truth shape leadership.
            Let’s make democracy strong, together.
          </p>
          <img
            src="https://cdn.pixabay.com/photo/2016/11/18/14/36/ballot-box-1836680_1280.png"
            alt="Vote illustration"
            style={{ width: 300, marginTop: 20 }}
          />
        </section>
      )}

      {active === "pledge" && (
        <section style={styles.section}>
          <h2>Make Your Pledge</h2>
          <p>Share your commitment or ideas to strengthen election monitoring.</p>
          <form onSubmit={submitPledge} style={styles.form}>
            <input
              style={styles.input}
              placeholder="Your Name"
              value={pledge.name}
              onChange={(e) => setPledge({ ...pledge, name: e.target.value })}
            />
            <textarea
              style={styles.textarea}
              placeholder="Your inspiring message..."
              value={pledge.message}
              onChange={(e) => setPledge({ ...pledge, message: e.target.value })}
            />
            <button type="submit" style={styles.button}>Submit Pledge</button>
          </form>

          <h3 style={{ marginTop: 20 }}>Community Pledges</h3>
          {pledges.length === 0 && <p>No pledges yet. Be the first!</p>}
          <ul>
            {pledges.map((p, i) => (
              <li key={i} style={styles.card}>
                <strong>{p.name}:</strong> {p.message}
              </li>
            ))}
          </ul>
        </section>
      )}

      {active === "issues" && (
        <section style={styles.section}>
          <h2>Report System Issues</h2>
          <p>If you notice the system not working properly, report it responsibly here.</p>
          <form onSubmit={submitIssue} style={styles.form}>
            <input
              style={styles.input}
              placeholder="Polling Station Name"
              value={issue.station}
              onChange={(e) => setIssue({ ...issue, station: e.target.value })}
            />
            <textarea
              style={styles.textarea}
              placeholder="Describe the issue..."
              value={issue.problem}
              onChange={(e) => setIssue({ ...issue, problem: e.target.value })}
            />
            <textarea
              style={styles.textarea}
              placeholder="Any suggestion to fix it?"
              value={issue.suggestion}
              onChange={(e) => setIssue({ ...issue, suggestion: e.target.value })}
            />
            <button type="submit" style={styles.button}>Submit Report</button>
          </form>

          <h3 style={{ marginTop: 20 }}>Reported Issues</h3>
          {issues.length === 0 && <p>No issues reported yet.</p>}
          {issues.map((r, i) => (
            <div key={i} style={styles.card}>
              <strong>{r.station}</strong>
              <p>{r.problem}</p>
              {r.suggestion && <p><em>Suggestion:</em> {r.suggestion}</p>}
            </div>
          ))}
        </section>
      )}

      <footer style={styles.footer}>
        © 2025 Election Awareness Project | Built to inspire youth participation in democracy.
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    padding: 20,
    maxWidth: 900,
    margin: "auto",
    background: "#f5f7fa",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#0056b3",
    color: "white",
    padding: "12px 20px",
    borderRadius: 8,
  },
  nav: { display: "flex", gap: 10 },
  navBtn: {
    background: "white",
    color: "#0056b3",
    border: "none",
    borderRadius: 4,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  section: {
    background: "white",
    marginTop: 20,
    borderRadius: 8,
    padding: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  form: { display: "flex", flexDirection: "column", gap: 10, marginTop: 10 },
  input: { padding: 10, border: "1px solid #ccc", borderRadius: 4 },
  textarea: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 4,
    minHeight: 80,
    resize: "vertical",
  },
  button: {
    background: "#0056b3",
    color: "white",
    border: "none",
    padding: 10,
    borderRadius: 4,
    cursor: "pointer",
  },
  card: {
    background: "#eef3fc",
    borderRadius: 6,
    padding: 10,
    marginTop: 8,
  },
  footer: { marginTop: 30, textAlign: "center", color: "#555" },
};
