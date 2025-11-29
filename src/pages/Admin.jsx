import { useEffect, useState } from 'react';

export default function Admin() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/';
      return;
    }

    async function getData() {
      const res = await fetch('/api/submissions', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (!res.ok) {
        setError('Error loading data');
        return;
      }

      setEntries(await res.json());
    }

    getData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Submissions</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

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
            <strong>Message:</strong> {e.message}
          </p>
          <p>
            <strong>IP:</strong> {e.ip}
          </p>
          <button className="btn btn-primary">test</button>
          <div className="container">
            <div className="row">
              <div className="col-md-6">Hello</div>
              <div className="col-md-6">World</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
