import Head from 'next/head';
import { useRef, useState, useEffect } from 'react';
import styles from '../styles/LandingPage.module.css';
import { motion } from 'framer-motion';
import Link from 'next/link';
//import TeamSection from '../components/TeamSection';


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

  // const teamMembers = [
  //   {
  //     name: "John Doe",
  //     role: "Lead Organizer",
  //     image: "/images/team1.jpg"
  //   },
  //   {
  //     name: "Jane Smith",
  //     role: "Technical Head",
  //     image: "/images/team2.jpg"
  //   },
  //   {
  //     name: "Mike Johnson",
  //     role: "Event Coordinator",
  //     image: "/images/team3.jpg"
  //   }
  // ];

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
                {key === 'team' ? (
                  <Link href="/team">
                    <button className={`${styles.navLink} ${activeSection === key ? styles.activeLink : ''}`}>
                      {label}
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(sections[key])}
                    className={`${styles.navLink} ${activeSection === key ? styles.activeLink : ''}`}
                  >
                    {label}
                  </button>
                )}
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
            filter: brightness(1.3);
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
      <section ref={sections.about} className={`${styles.pageSection} ${styles.aboutSection} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-10 z-0"></div>
        
        <motion.div 
          className={styles.sectionContent}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ background: 'none', boxShadow: 'none', border: 'none', padding: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mb-8"
          >
            <h1 style={{ fontFamily: 'Cinzel Decorative, serif', fontWeight: 700, fontSize: '3.5rem', color: '#d4af37', textAlign: 'center', marginBottom: '0.5rem', textShadow: '0 0 10px rgba(212,175,55,0.5)' }}>
              Hack-X-NIET 3.0
            </h1>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl text-center mb-12 text-[#ffd700] relative"
          >
            Fueling Innovation, Forging Impact
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-[#ffd700] to-transparent"
            ></motion.div>
          </motion.h2>

          <motion.div 
            className="max-w-5xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6 mb-12">
              <motion.p 
                className="text-xl md:text-2xl text-white leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                Get ready to ignite your imagination at Hack-X-NIET 3.0, the ultimate 36-hour offline coding odyssey, hosted by NIET's <span className="text-[#d4af37] font-semibold relative group">
                  EKUME & Reboot Clubs
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </span>.
              </motion.p>

              <motion.p 
                className="text-xl md:text-2xl text-white leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
              >
                Join forces with 400+ innovators from across the nation, where lines of code meet groundbreaking ideas and mentorship meets ambition.
              </motion.p>
            </div>

            <div className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-black/40 p-8 rounded-xl border border-[#d4af37]/20 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:border-[#d4af37]/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    {/* <span className="text-5xl mb-4 block transform transition-transform duration-300 group-hover:scale-110">🛠️</span> */}
                    {/* <p className="text-xl text-white">Build real-world prototypes</p> */}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-black/40 p-8 rounded-xl border border-[#d4af37]/20 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:border-[#d4af37]/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    {/* <span className="text-5xl mb-4 block transform transition-transform duration-300 group-hover:scale-110">🤝</span> */}
                    <p className="text-xl text-white">Connect with tech leaders and visionaries</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-black/40 p-8 rounded-xl border border-[#d4af37]/20 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:border-[#d4af37]/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    {/* <span className="text-5xl mb-4 block transform transition-transform duration-300 group-hover:scale-110">🎯</span> */}
                    <p className="text-xl text-white">Showcase your brilliance in a fast-paced, impact-driven coding marathon</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.p 
              className="text-xl md:text-2xl mb-12 text-white leading-relaxed bg-black/30 p-6 rounded-lg border border-[#d4af37]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              viewport={{ once: true }}
            >
              Form your dream squad (4–6 members, one female mandatory) and turn ideas into solutions that matter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.9 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-[#d4af37] flex items-center justify-center gap-3 bg-black/30 p-6 rounded-lg border border-[#d4af37]/20"
            >
              <motion.span 
                className="text-4xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                🌟
              </motion.span>
              <span className="big-animated-text">Registrations Opening Soon — Are you ready to hack the future?</span>
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
              { title: 'Registration Opens', date: 'May 13, 2025' },
              { title: 'Team Formation', date: 'May 30, 2025' },
              { title: 'Profile Review', date: '16-18 Aug 2025'},
              { title: 'Submit Work', date: '19-20 Aug 2025'}, 
              { title: 'Mentoring', date: '20-21 Aug 2025'},
              { title: 'Final Round', date: '22 Aug 2025'},
              { title: 'Results', date: '23 Aug 2025'},
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
      <section className={styles.sponsorsSection}>
        <h1 style={{ fontFamily: 'Cinzel Decorative, serif', fontWeight: 700, fontSize: '2.5rem', color: '#FFD700', textAlign: 'center', marginBottom: '2rem', textShadow: '0 0 10px rgba(212,175,55,0.5)' }}>
          Sponsors
        </h1>
        <div className={styles.sponsorGrid}>
          {/* Example sponsors, replace with real data as needed */}
          <div className={styles.sponsorCard}>
            <img src="/images/sponsor1.png" alt="Sponsor 1" className={styles.sponsorImage} />
            <div className={styles.sponsorName}>Sponsor One</div>
          </div>
          <div className={styles.sponsorCard}>
            <img src="/images/sponsor2.png" alt="Sponsor 2" className={styles.sponsorImage} />
            <div className={styles.sponsorName}>Sponsor Two</div>
          </div>
          <div className={styles.sponsorCard}>
            <img src="/images/sponsor3.png" alt="Sponsor 3" className={styles.sponsorImage} />
            <div className={styles.sponsorName}>Sponsor Three</div>
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
              Email: ekumeclub@gmail.com<br/>
              Phone: +91 00000000
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
