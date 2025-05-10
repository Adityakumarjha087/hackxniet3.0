import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/AuthForm.module.css';

export default function AuthForm({ mode = 'login' }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    teamName: '',
    college: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value || '' // Ensure value is never undefined
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate required fields
      if (mode === 'register') {
        const requiredFields = ['name', 'teamName', 'college', 'phone', 'email', 'password'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        
        if (missingFields.length > 0) {
          throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        }
      }

      const response = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (mode === 'login') {
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        setShowDialog(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 5000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="teamName">Team Name</label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="college">College</label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <div className={styles.switchMode}>
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <a href="/register">Register here</a>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <a href="/login">Login here</a>
            </p>
          )}
        </div>
      </div>

      {/* Registration Success Dialog */}
      {showDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <h3>Registration Successful!</h3>
            <p>Your credentials:</p>
            <div className={styles.credentials}>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Password:</strong> {formData.password}</p>
            </div>
            <p className={styles.redirectMessage}>
              Redirecting to dashboard in 5 seconds...
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 
