import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../styles/Register.module.css';

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
  const [videoError, setVideoError] = useState(false);
  const [step, setStep] = useState(1);
  const [applicationStatus, setApplicationStatus] = useState('pending');

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
          resumeUrl,
          applicationStatus: 'pending'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store the token
      localStorage.setItem('token', data.token);
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
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
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                name="password"
                placeholder="Password"
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
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="teamName"
                placeholder="Team Name"
                value={formData.teamName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="college"
                placeholder="College/Organization"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.buttonGroup}>
              <button 
                type="button" 
                className={styles.secondaryButton}
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
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="github"
                placeholder="GitHub Profile URL"
                value={formData.github}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn Profile URL"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.buttonGroup}>
              <button 
                type="button" 
                className={styles.secondaryButton}
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
    <>
      <Head>
        <title>Register | HACKXNIET 3.0</title>
      </Head>
      <div className={styles.registerPage}>
        <div className={styles.videoBackground}>
          {!videoError ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className={styles.backgroundVideo}
              onError={handleVideoError}
            >
              <source src="/images/adi2.png" type="video/png" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className={styles.fallbackBackground} />
          )}
          <div className={styles.videoOverlay}></div>
        </div>
        <div className={styles.formBox}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progress} 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            {renderStep()}
          </form>
          <p className={styles.loginLink}>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </>
  );
}
