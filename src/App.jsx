import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Erro ao carregar usuários:", err));
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <h1>👤 User Directory</h1>

        <div className="search-group">
          <input
            className={`search ${search ? "active" : ""}`}
            type="text"
            placeholder="🔍 Type to filter by name, email, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="clear-btn" onClick={() => setSearch("")}>
            ❌ Clear
          </button>
        </div>
      </header>

      <hr className="divider" />

      <p className="lenght">
        Showing {filtered.length} of {users.length} users
      </p>

      <ul className="list">
        {filtered.map((u) => (
          <li className="card" key={u.id}>
            <div className="title">👤 {u.name}</div>
            <div className="muted">📧 {u.email}</div>
            <div className="muted">🏢 {u.company.name}</div>
            <div className="muted">📍 {u.address.city}</div>
            <a
              className="link"
              href={`http://${u.website}`}
              target="_blank"
              rel="noreferrer"
            >
              🌐 {u.website}
            </a>
          </li>
        ))}
      </ul>

      <footer className="footer">
        <p>Made with 💙 using React + Vite</p>
      </footer>
    </div>
  );
}

export default App;
