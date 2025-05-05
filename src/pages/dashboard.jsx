import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [teammates, setTeammates] = useState([]);
  const [newTeammate, setNewTeammate] = useState('');
  const [showTeammateForm, setShowTeammateForm] = useState(false);

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
      setTeammates(userData.teammates || []);
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

  const handleAddTeammate = async (e) => {
    e.preventDefault();
    if (teammates.length >= 4) {
      setError('Maximum team size is 4 members');
      return;
    }

    if (!newTeammate.trim()) {
      setError('Please enter a teammate name');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/teammates/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: newTeammate })
      });

      if (!response.ok) {
        throw new Error('Failed to add teammate');
      }

      const updatedUser = await response.json();
      setTeammates(updatedUser.teammates);
      setNewTeammate('');
      setShowTeammateForm(false);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveTeammate = async (index) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/teammates/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ index })
      });

      if (!response.ok) {
        throw new Error('Failed to remove teammate');
      }

      const updatedUser = await response.json();
      setTeammates(updatedUser.teammates);
      setError('');
    } catch (err) {
      setError(err.message);
    }
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

          {/* Teammates Section */}
          <div className={styles.teammatesCard}>
            <h2>Team Members</h2>
            <div className={styles.teammatesList}>
              {teammates.map((teammate, index) => (
                <div key={index} className={styles.teammateItem}>
                  <span>{teammate}</span>
                  <button 
                    onClick={() => handleRemoveTeammate(index)}
                    className={styles.removeTeammate}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            {teammates.length < 4 && (
              <div className={styles.addTeammateSection}>
                {showTeammateForm ? (
                  <form onSubmit={handleAddTeammate} className={styles.teammateForm}>
                    <input
                      type="text"
                      value={newTeammate}
                      onChange={(e) => setNewTeammate(e.target.value)}
                      placeholder="Enter teammate name"
                      className={styles.teammateInput}
                    />
                    <div className={styles.teammateFormButtons}>
                      <button type="submit" className={styles.addTeammateButton}>
                        Add
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setShowTeammateForm(false)}
                        className={styles.cancelButton}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button 
                    onClick={() => setShowTeammateForm(true)}
                    className={styles.showTeammateFormButton}
                  >
                    Add Teammate
                  </button>
                )}
              </div>
            )}
            <p className={styles.teamSizeInfo}>
              Team Size: {teammates.length}/4 members
            </p>
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