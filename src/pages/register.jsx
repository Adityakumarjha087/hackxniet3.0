import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/AuthForm.module.css';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    teamName: '',
    college: '',
    phone: '',
    github: '',
    linkedin: '',
    resume: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, upload resume to Google Drive if provided
      let resumeUrl = '';
      if (formData.resume) {
        const formDataResume = new FormData();
        formDataResume.append('file', formData.resume);
        formDataResume.append('name', `${formData.teamName}_${formData.name}_resume`);
        
        const uploadResponse = await fetch('/api/upload/resume', {
          method: 'POST',
          body: formDataResume
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload resume');
        }

        const uploadData = await uploadResponse.json();
        resumeUrl = uploadData.fileUrl;
      }

      // Then register the user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          resumeUrl
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      router.push('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2>Basic Information</h2>
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
              <label htmlFor="email">Email Address</label>
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
              type="button" 
              className={styles.submitButton}
              onClick={nextStep}
            >
              Next
            </button>
          </>
        );
      case 2:
        return (
          <>
            <h2>Team Information</h2>
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
              <label htmlFor="college">College/Organization</label>
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
            <div className={styles.buttonGroup}>
              <button 
                type="button" 
                className={`${styles.submitButton} ${styles.secondaryButton}`}
                onClick={prevStep}
              >
                Back
              </button>
              <button 
                type="button" 
                className={styles.submitButton}
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2>Additional Information</h2>
            <div className={styles.formGroup}>
              <label htmlFor="github">GitHub Profile URL</label>
              <input
                type="text"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="linkedin">LinkedIn Profile URL</label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="resume">Resume (PDF)</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf"
                onChange={handleChange}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button 
                type="button" 
                className={`${styles.submitButton} ${styles.secondaryButton}`}
                onClick={prevStep}
              >
                Back
              </button>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.authContainer}>
      <Head>
        <title>Register | HACKXNIET 3.0</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.authForm}>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {renderStep()}
        </form>

        <div className={styles.switchForm}>
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
}
