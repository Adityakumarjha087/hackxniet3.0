import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Redirect if already logged in
  if (session) {
    if (session.user.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/dashboard');
    }
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      // Get user role and redirect accordingly
      const response = await fetch('/api/auth/check-role');
      const data = await response.json();
      
      if (data.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | HACKXNIET 3.0</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.loginBox}>
          <h1>Login</h1>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className={styles.registerLink}>
            <p>Don't have an account? <Link href="/register">Register here</Link></p>
            <p className={styles.adminNote}>Note: Admin accounts cannot be registered through this form.</p>
          </div>
        </div>
      </div>
    </>
  );
} 