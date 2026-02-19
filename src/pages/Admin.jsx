import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';

export default function Admin() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/';
      return;
    }

    async function getData() {
      try {
        const res = await fetch('/api/submissions', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        if (!res.ok) {
          setError('Error loading data');
          return;
        }

        const data = await res.json();
        setEntries(data);
      } catch (error) {
        setError('Error loading data');
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  // Show spinner while loading
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <Navigation />
      <h2>Form Submissions</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {console.log('entries: ', entries)}
      {entries.map((e) => (
        <div
          key={e._id}
          style={{ marginBottom: 20, padding: 10, border: '1px solid #ccc' }}
        >
          <p>
            <strong>Name:</strong> {e.name}
          </p>
          <p>
            <strong>Email:</strong> {e.email}
          </p>
          <p>
            <strong>Message:</strong> {e.project_description}
          </p>
          <p>
            <strong>IP:</strong> {e.ip}
          </p>
        </div>
      ))}
    </div>
  );
}
