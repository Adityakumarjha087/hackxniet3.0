import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchUserData(token);
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
      if (err.message === 'Invalid token' || err.message === 'Token expired') {
        localStorage.removeItem('token');
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={() => router.push('/login')}>Back to Login</button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | HACKXNIET 3.0</title>
      </Head>
      <div className={styles.dashboard}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>HACKXNIET 3.0</div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </nav>

        <main className={styles.main}>
          <div className={styles.welcomeSection}>
            <h1>Welcome, {user?.name}!</h1>
            <p className={styles.teamName}>Team: {user?.teamName}</p>
          </div>

          <div className={styles.statusCard}>
            <h2>Application Status</h2>
            <div className={styles.status}>
              <span className={`${styles.statusBadge} ${styles[user?.applicationStatus]}`}>
                {user?.applicationStatus || 'Pending'}
              </span>
            </div>
            <p className={styles.statusMessage}>
              {user?.applicationStatus === 'approved' 
                ? 'Your application has been approved! We look forward to seeing you at the hackathon.'
                : user?.applicationStatus === 'rejected'
                ? 'We regret to inform you that your application has not been selected for this edition.'
                : 'Your application is under review. We will notify you once a decision has been made.'}
            </p>
          </div>

          <div className={styles.infoCard}>
            <h2>Your Information</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Name</label>
                <p>{user?.name}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Email</label>
                <p>{user?.email}</p>
              </div>
              <div className={styles.infoItem}>
                <label>College</label>
                <p>{user?.college}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Phone</label>
                <p>{user?.phone}</p>
              </div>
            </div>
          </div>

          {user?.resumeUrl && (
            <div className={styles.resumeCard}>
              <h2>Resume</h2>
              <a 
                href={user.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.resumeLink}
              >
                View Resume
              </a>
            </div>
          )}
        </main>
      </div>
    </>
  );
} 