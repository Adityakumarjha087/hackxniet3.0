import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/AdminDashboard.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    const checkAdmin = async () => {
      try {
        const res = await fetch('/api/auth/check-admin');
        if (!res.ok) {
          router.push('/login');
        }
      } catch (error) {
        router.push('/login');
      }
    };
    checkAdmin();
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      setApplications(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      const res = await fetch(`/api/applications/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchApplications(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Applications</h3>
          <p>{applications.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pending</h3>
          <p>{applications.filter(app => app.applicationStatus === 'pending').length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Approved</h3>
          <p>{applications.filter(app => app.applicationStatus === 'approved').length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Rejected</h3>
          <p>{applications.filter(app => app.applicationStatus === 'rejected').length}</p>
        </div>
      </div>

      <div className={styles.applicationsList}>
        <h2>Applications</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>College</th>
              <th>Team Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.college}</td>
                <td>{app.teamName}</td>
                <td>
                  <span className={`${styles.status} ${styles[app.applicationStatus]}`}>
                    {app.applicationStatus}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      onClick={() => handleStatusUpdate(app._id, 'approved')}
                      className={styles.approveBtn}
                      disabled={app.applicationStatus === 'approved'}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app._id, 'rejected')}
                      className={styles.rejectBtn}
                      disabled={app.applicationStatus === 'rejected'}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 