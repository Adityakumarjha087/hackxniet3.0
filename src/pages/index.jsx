import Head from 'next/head';
import { useRef, useState, useEffect } from 'react';
import styles from '../styles/LandingPage.module.css';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timelineRef = useRef(null);

  const sections = {
    home: useRef(null),
    about: useRef(null),
    team: useRef(null),
    contact: useRef(null)
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);
      const scrollPosition = window.scrollY + 100;

      Object.entries(sections).forEach(([key, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition > offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const teamMembers = [
    {
      name: "John Doe",
      role: "Lead Organizer",
      image: "/images/team1.jpg"
    },
    {
      name: "Jane Smith",
      role: "Technical Head",
      image: "/images/team2.jpg"
    },
    {
      name: "Mike Johnson",
      role: "Event Coordinator",
      image: "/images/team3.jpg"
    }
  ];

  return (
    <div className={styles.fullPageContainer}>
      <Head>
        <title>HACKXNIET 3.0 | Unleash Innovation</title>
        <link href="https://fonts.cdnfonts.com/css/harry-p" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Navbar */}
      <nav className={`${styles.navbar} ${navbarScrolled ? styles.navbarScrolled : ''}`}>
        <div className={styles.navContent}>
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}></span>
          </button>
          
          <ul className={`${styles.navList} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
            {Object.entries({
              home: 'HOME',
              about: 'ABOUT US',
              team: 'TEAM',
              contact: 'CONTACT US'
            }).map(([key, label]) => (
              <li key={key}>
                <button
                  onClick={() => scrollToSection(sections[key])}
                  className={`${styles.navLink} ${activeSection === key ? styles.activeLink : ''}`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.registerWrapper}>
            <a href="/register">
              <button className={styles.registerNavButton}>REGISTER</button>
            </a>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section ref={sections.home} className={`${styles.landingSection} ${styles.homeSection}`}>
        <div className={styles.videoBackground}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.backgroundVideo}
          >
            <source src="/video/adi.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className={styles.videoOverlay}></div>
        </div>
        <div className={styles['title-wrapper']}>
          <div className={styles.hack}>Hack</div>
          <div className={styles.x}>x</div>
          <div className={styles.niet}>Niet</div>
          <div className={styles.version}>3.0</div>
        </div>
      </section>

      {/* About Section */}
      <section ref={sections.about} className={`${styles.pageSection} ${styles.aboutSection}`}>
        <motion.div 
          className={styles.sectionContent}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ background: 'none', boxShadow: 'none', border: 'none', padding: 0 }}
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className={styles.typingEffect}>About HACKXNIET 3.0</span>
          </motion.h1>
          
          <motion.div 
            className={styles.animatedAboutText}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className={styles.typingHighlight}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Innovate
            </motion.span>
            <motion.span 
              className={styles.typingHighlight}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Collaborate
            </motion.span>
            <motion.span 
              className={styles.typingHighlight}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ once: true }}
            >
              Compete
            </motion.span>
            <motion.div 
              className={styles.fadeInText}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              Join brilliant minds, solve real-world problems, and unleash your creativity. Whether you are a coding wizard, a design enthusiast, or a tech visionary, HACKXNIET 3.0 is your stage to shine.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              viewport={{ once: true }}
              style={{ marginTop: '1rem' }}
            >
              <b>Are you ready to code the future?</b>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <h1 className={styles.sectionTitle}>Timeline</h1>
          <div className={styles.timeline} ref={timelineRef} style={{ position: 'relative' }}>
            <motion.div
              className={styles.timelineLine}
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              viewport={{ once: true }}
              style={{ willChange: 'height' }}
            />
            {[
              { title: 'Registration Opens', date: 'June 1, 2024' },
              { title: 'Team Formation', date: 'June 5, 2024' },
              { title: 'Idea Submission', date: 'June 10, 2024' },
              { title: 'Shortlisting', date: 'June 15, 2024' },
              { title: 'Hackathon Day 1', date: 'June 20, 2024' },
              { title: 'Hackathon Day 2', date: 'June 21, 2024' },
              { title: 'Final Presentations', date: 'June 22, 2024' },
              { title: 'Winners Announced', date: 'June 23, 2024' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                className={
                  `${styles.timelineItem} ` +
                  (idx % 2 === 0 ? styles.timelineItemLeft : styles.timelineItemRight)
                }
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                style={{ zIndex: 2 }}
              >
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineDate}>{item.date}</div>
                  <div className={styles.timelineTitle}>{item.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.pageSection}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1rem 2rem 1rem', background: 'none', boxShadow: 'none', border: 'none' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#d4af37', textAlign: 'center' }}>Frequently Asked Questions</h1>
          <div style={{ fontSize: '1.1rem', color: '#fff', lineHeight: 1.7 }}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#ffd700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>What is HACKXNIET 3.0?</h3>
              <p>HACKXNIET 3.0 is a national-level hackathon bringing together innovators, coders, and creators to solve real-world problems.</p>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#ffd700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Who can participate?</h3>
              <p>Students from all colleges and backgrounds are welcome to participate in teams.</p>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#ffd700', fontSize: '1.2rem', marginBottom: '0.5rem' }}>How do I register?</h3>
              <p>Registration is online via the official website. Form your team and sign up!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className={styles.pageSection}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1rem 2rem 1rem', background: 'none', boxShadow: 'none', border: 'none' }}>
          <h1 className={styles.typingEffect} style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Sponsors</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            {/* Sponsor logos/images will go here */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#timeline">Timeline</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#sponsors">Sponsors</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Contact Info</h3>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}>MQfX</a>
            </div>
          </div>
          <div className={styles.footerColumn}>
            <h3>Address</h3>
            <div className={styles.address}>
              NIET, Greater Noida<br/>
              Email: hackathon@example.com<br/>
              Phone: +91 1234567890
            </div>
            <div style={{ marginTop: '1rem' }}>
              <a href="/privacy-policy" style={{ color: '#d4af37', textDecoration: 'underline' }}>Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 HACKXNIET 3.0. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
