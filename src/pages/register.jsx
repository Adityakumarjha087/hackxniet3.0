import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import styles from '../styles/Register.module.css';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function Register() {
  const [step, setStep] = useState(1);
  const [teamSize, setTeamSize] = useState(3);
  const [showSuccess, setShowSuccess] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    leaderPhone: '',
    leaderEmail: '',
    leaderGithub: '',
    leaderGender: 'male',
    members: Array(2).fill({
      name: '',
      phone: '',
      email: '',
      github: '',
      gender: 'male'
    }),
    hasFemaleMember: false
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const updatedMembers = [...formData.members];
      updatedMembers[index] = {
        ...updatedMembers[index],
        [e.target.name]: e.target.value
      };
      setFormData({...formData, members: updatedMembers});
    } else {
      setFormData({...formData, [e.target.name]: e.target.value});
    }
  };

  const handleGenderChange = (gender, index = null) => {
    if (index === null) {
      // Leader gender change
      const hasFemale = formData.members.some(m => m.gender === 'female') || gender === 'female';
      setFormData({
        ...formData,
        leaderGender: gender,
        hasFemaleMember: hasFemale
      });
    } else {
      // Member gender change
      const updatedMembers = [...formData.members];
      updatedMembers[index] = {
        ...updatedMembers[index],
        gender
      };
      const hasFemale = updatedMembers.some(m => m.gender === 'female') || formData.leaderGender === 'female';
      setFormData({
        ...formData,
        members: updatedMembers,
        hasFemaleMember: hasFemale
      });
    }
  };

  const validateStep1 = () => {
    if (!formData.teamName || !formData.leaderName || 
        !formData.leaderPhone || !formData.leaderEmail || 
        !formData.leaderGithub) {
      alert('Please fill all team leader details');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.hasFemaleMember) {
      alert('At least one female member is required in the team (including leader)');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.hasFemaleMember) {
      alert('At least one female member is required in the team (including leader)');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Check for at least one female participant
    const hasFemaleMember = formData.leaderGender === 'female' || 
      formData.members.some(member => member.gender === 'female');
    
    if (!hasFemaleMember) {
      setError('At least one female participant is required in the team (including leader)');
      return;
    }

    if (!validateStep3()) {
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Registration response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.success) {
        setShowSuccess(true);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={styles.formStep}
    >
      <h2>Team Leader Information</h2>
      
      <div className={styles.inputGroup}>
        <label htmlFor="teamName">Team Name</label>
        <input
          id="teamName"
          type="text"
          name="teamName"
          value={formData.teamName}
          onChange={handleChange}
          placeholder="Enter your team name"
          required
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="leaderName">Leader Full Name</label>
        <input
          id="leaderName"
          type="text"
          name="leaderName"
          value={formData.leaderName}
          onChange={handleChange}
          placeholder="Enter leader's full name"
          required
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="leaderPhone">Phone Number</label>
        <input
          id="leaderPhone"
          type="tel"
          name="leaderPhone"
          value={formData.leaderPhone}
          onChange={handleChange}
          placeholder="Enter leader's phone number"
          required
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="leaderEmail">Email Address</label>
        <input
          id="leaderEmail"
          type="email"
          name="leaderEmail"
          value={formData.leaderEmail}
          onChange={handleChange}
          placeholder="Enter leader's email"
          required
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="leaderGithub">GitHub ID</label>
        <input
          id="leaderGithub"
          type="text"
          name="leaderGithub"
          value={formData.leaderGithub}
          onChange={handleChange}
          placeholder="Enter leader's GitHub ID"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Gender</label>
        <div className={styles.genderOptions}>
          <label className={styles.genderOption}>
            <input
              type="radio"
              name="leaderGender"
              value="male"
              checked={formData.leaderGender === 'male'}
              onChange={() => handleGenderChange('male')}
            />
            <span>Male</span>
          </label>
          <label className={styles.genderOption}>
            <input
              type="radio"
              name="leaderGender"
              value="female"
              checked={formData.leaderGender === 'female'}
              onChange={() => handleGenderChange('female')}
            />
            <span>Female</span>
          </label>
          <label className={styles.genderOption}>
            <input
              type="radio"
              name="leaderGender"
              value="other"
              checked={formData.leaderGender === 'other'}
              onChange={() => handleGenderChange('other')}
            />
            <span>Other</span>
          </label>
        </div>
      </div>
      
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => validateStep1() && setStep(2)}
          className={styles.submitButton}
        >
          Next
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={styles.formStep}
    >
      <h2>Team Composition</h2>
      
      <div className={styles.requirementsBox}>
        <h3>Team Requirements:</h3>
        <ul>
          <li>✓ Minimum 3 members (including leader)</li>
          <li>✓ Maximum 5 members (including leader)</li>
          <li>✓ At least one female member required</li>
        </ul>
      </div>
      
      <div className={styles.teamSizeSelector}>
        <p>Select Team Size:</p>
        <div className={styles.sizeOptions}>
          {[3, 4, 5].map(size => (
            <div
              key={size}
              className={`${styles.sizeCircle} ${teamSize === size ? styles.selected : ''}`}
              onClick={() => {
                setTeamSize(size);
                const newMembers = [...formData.members];
                while (newMembers.length < size-1) {
                  newMembers.push({ name: '', phone: '', email: '', github: '', gender: 'male' });
                }
                while (newMembers.length > size-1) {
                  newMembers.pop();
                }
                const hasFemale = newMembers.some(m => m.gender === 'female') || 
                                (formData.leaderGender === 'female');
                setFormData({
                  ...formData, 
                  members: newMembers,
                  hasFemaleMember: hasFemale
                });
              }}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.genderWarning}>
        {!formData.hasFemaleMember ? (
          <p className={styles.warning}>⚠️ Your team currently has no female members</p>
        ) : (
          <p className={styles.success}>✓ Your team meets the gender requirement</p>
        )}
      </div>
      
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => setStep(1)}
          className={styles.secondaryButton}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => validateStep2() && setStep(3)}
          className={styles.submitButton}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={styles.formStep}
    >
      <h2>Team Members Information</h2>
      <p className={styles.memberNote}>Fill details for {formData.members.length} teammate{formData.members.length > 1 ? 's' : ''}</p>
      
      <div className={styles.scrollableForm}>
        {formData.members.map((member, index) => (
          <div key={index} className={styles.memberForm}>
            <h3>Teammate {index + 1}</h3>
            
            <div className={styles.inputGroup}>
              <label htmlFor={`memberName-${index}`}>Full Name</label>
              <input
                id={`memberName-${index}`}
                type="text"
                name="name"
                value={member.name}
                onChange={(e) => handleChange(e, index)}
                placeholder="Enter full name"
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor={`memberPhone-${index}`}>Phone Number</label>
              <input
                id={`memberPhone-${index}`}
                type="tel"
                name="phone"
                value={member.phone}
                onChange={(e) => handleChange(e, index)}
                placeholder="Enter phone number"
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor={`memberEmail-${index}`}>Email Address</label>
              <input
                id={`memberEmail-${index}`}
                type="email"
                name="email"
                value={member.email}
                onChange={(e) => handleChange(e, index)}
                placeholder="Enter email address"
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor={`memberGithub-${index}`}>GitHub ID</label>
              <input
                id={`memberGithub-${index}`}
                type="text"
                name="github"
                value={member.github}
                onChange={(e) => handleChange(e, index)}
                placeholder="Enter GitHub ID"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Gender</label>
              <div className={styles.genderOptions}>
                <label className={styles.genderOption}>
                  <input
                    type="radio"
                    name={`memberGender-${index}`}
                    value="male"
                    checked={member.gender === 'male'}
                    onChange={() => handleGenderChange('male', index)}
                  />
                  <span>Male</span>
                </label>
                <label className={styles.genderOption}>
                  <input
                    type="radio"
                    name={`memberGender-${index}`}
                    value="female"
                    checked={member.gender === 'female'}
                    onChange={() => handleGenderChange('female', index)}
                  />
                  <span>Female</span>
                </label>
                <label className={styles.genderOption}>
                  <input
                    type="radio"
                    name={`memberGender-${index}`}
                    value="other"
                    checked={member.gender === 'other'}
                    onChange={() => handleGenderChange('other', index)}
                  />
                  <span>Other</span>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!formData.hasFemaleMember && (
        <div className={styles.error}>
          At least one female member is required in the team (including leader)
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={() => setStep(2)}
          className={styles.secondaryButton}
        >
          Back
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          Complete Registration
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className={styles.registerPage}>
      <Head>
        <title>Team Registration | HACKXNIET 3.0</title>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.videoBackground}>
        <video autoPlay loop muted playsInline className={styles.backgroundVideo}>
          <source src="/video/adi.mp4" type="video/mp4" />
        </video>
        <div className={styles.fallbackBackground}></div>
      </div>

      <div className={styles.videoOverlay}></div>

      <div className={styles.formBox}>
        <h1 className={styles.title}>HACKXNIET 3.0</h1>
        
        <div className={styles.progressBar}>
          <div 
            className={styles.progress} 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>

      {/* Success Dialog */}
      {showSuccess && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <h3>You have successfully joined HACKXNIET 3.0! 🎉</h3>
            <p>Join the community here:</p>
            <a 
              href="https://chat.whatsapp.com/YOUR_WHATSAPP_LINK" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.whatsappLink}
            >
              Join WhatsApp Group
            </a>
            <button 
              onClick={() => window.location.href = '/'}
              className={styles.continueButton}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}