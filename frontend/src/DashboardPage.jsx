import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

function DataSection({ title, items, renderItem }) {
  return (
    <section className="card section-card">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>
    </section>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const storedUser = useMemo(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }, []);

  const [data, setData] = useState({ leads: [], tasks: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const response = await api.get('/dashboard');
        setData(response.data.data);
      } catch (err) {
        const status = err.response?.status;
        if (status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }
        setError('Could not load dashboard data.');
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className="page dashboard-page">
      <header className="dashboard-header card">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome, {storedUser?.name || 'User'}</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      {loading ? <p className="status">Loading dashboard...</p> : null}
      {error ? <p className="status error">{error}</p> : null}

      {!loading && !error ? (
        <div className="grid">
          <DataSection
            title="Leads"
            items={data.leads}
            renderItem={(lead) => (
              <>
                <strong>{lead.name}</strong> - {lead.status}
              </>
            )}
          />

          <DataSection
            title="Tasks"
            items={data.tasks}
            renderItem={(task) => (
              <>
                <strong>{task.title}</strong> (Due: {task.dueDate})
              </>
            )}
          />

          <DataSection
            title="Users"
            items={data.users}
            renderItem={(user) => (
              <>
                <strong>{user.name}</strong> - {user.role}
              </>
            )}
          />
        </div>
      ) : null}
    </div>
  );
}
