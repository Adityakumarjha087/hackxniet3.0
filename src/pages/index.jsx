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
  const galleryTrackRef = useRef(null);
  const [galleryScroll, setGalleryScroll] = useState(0);

  const sections = {
    home: useRef(null),
    about: useRef(null),
    gallery: useRef(null),
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
            
            // Handle gallery scroll
            if (key === 'gallery' && galleryTrackRef.current) {
              const gallerySection = ref.current;
              const progress = (scrollPosition - offsetTop) / offsetHeight;
              const maxScroll = galleryTrackRef.current.scrollWidth - galleryTrackRef.current.clientWidth;
              setGalleryScroll(progress * maxScroll);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (galleryTrackRef.current) {
      galleryTrackRef.current.style.transform = `translateX(-${galleryScroll}px)`;
    }
  }, [galleryScroll]);

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
          </ul>          <div className={styles.registerWrapper}>            <a href="/register">
              <button className={styles.registerNavButton}>REGISTER</button>
            </a>
            <a href="/docs/hackxniet_brochure.pdf" download="HACKXNIET_3.0_Brochure.pdf" target="_blank" rel="noopener noreferrer" className={styles.brochureLink}>
              <button className={styles.brochureButton}>BROCHURE</button>
            </a>
          </div>
        </div>
      </nav>      {/* Home Section */}
      <section ref={sections.home} className={`${styles.landingSection} ${styles.homeSection}`}>
        <div className={styles.videoBackground}>          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.backgroundVideo}
            style={{ filter: 'brightness(1.3)' }}
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
        <div className={styles.sectionTitleTop}>
          <h2>Welcome to HackxNiet 3.0</h2>
        </div>
      </section>      <div className={styles.transitionHomeToAbout}></div>      {/* About Section */}
      <section ref={sections.about} className={`${styles.pageSection} ${styles.aboutSection} relative overflow-hidden max-w-full`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-10 z-0"></div>
        
        <div className={styles.sectionHeading}>
          <h2>About Us</h2>
          <div className={styles.headingUnderline}></div>
        </div>

        <motion.div 
          className={styles.sectionContent}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ background: 'none', boxShadow: 'none', border: 'none', padding: 0, maxWidth: '100%', overflowX: 'hidden' }}
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
            </div>            <div className="mb-16 w-full px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full">
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
            </motion.p>            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.9 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl font-bold text-[#d4af37] flex items-center justify-center gap-3 bg-black/30 p-6 rounded-lg border border-[#d4af37]/20"
              style={{ maxWidth: '90%', overflow: 'hidden' }}
            >
              <motion.span 
                className="text-3xl"
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
              <span className="big-animated-text" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', wordWrap: 'break-word' }}>Registrations Opening Soon — Are you ready to hack the future?</span>
            </motion.div>
            
            {/* Follow Us Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.1 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <h3 className="text-2xl font-bold text-[#d4af37] mb-6">Follow Us</h3>
              <div className={styles.socialIconsContainer}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className={styles.socialIcon}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </motion.div>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    className={styles.socialIcon}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </motion.div>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className={styles.socialIcon}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </motion.div>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialIconLink}>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    className={styles.socialIcon}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>      </section>      <div className={styles.transitionAboutToThemes}></div>
      
      {/* Themes Section */}
      <section className={`${styles.pageSection} ${styles.themesSection}`}>
        <div className={styles.themesContainer}>
          <div className={styles.sectionHeading}>
            <h2>Hackathon Themes</h2>
            <div className={styles.headingUnderline}></div>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.themesTitle}
          >
            Explore Our Challenge Categories
          </motion.h2>
          
          <div className={styles.themesGrid}>
            {[
              {
                title: "AI & Machine Learning",
                icon: "✨",
                description: "Create innovative solutions leveraging artificial intelligence and machine learning algorithms to solve real-world problems."
              },
              {
                title: "HealthTech",
                icon: "💊",
                description: "Develop applications that address healthcare challenges, from patient care to medical research and wellness tracking."
              },
              {
                title: "Sustainable Technology",
                icon: "🌱",
                description: "Build solutions focusing on environmental sustainability, renewable energy, and reducing carbon footprints."
              },
              {
                title: "FinTech Revolution",
                icon: "💰",
                description: "Innovate in financial technology, from blockchain applications to personal finance management and secure transactions."
              },
              {
                title: "Smart Education",
                icon: "🎓",
                description: "Create platforms that enhance learning experiences, from personalized education to collaborative virtual classrooms."
              },
              {
                title: "Open Innovation",
                icon: "🚀",
                description: "Your unique idea that doesn't fit the other categories but has the potential to make a significant impact."
              }
            ].map((theme, index) => (
              <motion.div
                key={index}
                className={styles.themeCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.themeIconWrapper}>
                  <span className={styles.themeIcon}>{theme.icon}</span>
                </div>
                <h3 className={styles.themeTitle}>{theme.title}</h3>
                <p className={styles.themeDescription}>{theme.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>      <div className={styles.transitionThemesToGallery}></div>      {/* Gallery Section */}
      <section ref={sections.gallery} className={`${styles.pageSection} ${styles.gallerySection}`}>
        <div className={styles.galleryContainer}>
          <div className={styles.sectionHeading}>
            <h2>Past Event Gallery</h2>
            <div className={styles.headingUnderline}></div>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.galleryTitle}
          >
            Highlights from Previous Editions
          </motion.h2>
          
          <div className={styles.galleryWrapper}>
            <div ref={galleryTrackRef} className={styles.galleryTrack}>
              {[
                { id: 1, title: "Opening Ceremony", img: "/images/gallery/hackathon1.jpg" },
                { id: 2, title: "Team Collaboration", img: "/images/gallery/hackathon2.jpg" },
                { id: 3, title: "Mentorship Session", img: "/images/gallery/hackathon3.jpg" },
                { id: 4, title: "Midnight Coding", img: "/images/gallery/hackathon4.jpg" },
                { id: 5, title: "Project Presentation", img: "/images/gallery/hackathon5.jpg" },
                { id: 6, title: "Award Ceremony", img: "/images/gallery/hackathon6.jpg" }
              ].map((item) => (
                <motion.div
                  key={item.id}
                  className={styles.galleryItem}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: item.id * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.galleryImageWrapper}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className={styles.galleryImage}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/gallery/placeholder.jpg";
                      }}
                    />
                    <div className={styles.galleryOverlay}>
                      <span className={styles.galleryCaption}>{item.title}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section><div className={styles.transitionGalleryToTimeline}></div>

      {/* Timeline Section */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <h2>Event Timeline</h2>
            <div className={styles.headingUnderline}></div>
          </div>
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
      </section>      <div className={styles.transitionTimelineToFaq}></div>

      {/* FAQ Section */}
      <section className={styles.pageSection}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1rem 2rem 1rem', background: 'none', boxShadow: 'none', border: 'none' }}>
          <div className={styles.sectionHeading}>
            <h2>Frequently Asked Questions</h2>
            <div className={styles.headingUnderline}></div>
          </div>
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
      </section>      <div className={styles.transitionFaqToSponsors}></div>

      {/* Sponsors Section */}
      <section className={styles.sponsorsSection}>
        <div className={styles.sectionHeading}>
          <h2>Sponsors</h2>
          <div className={styles.headingUnderline}></div>
        </div>
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
      <div className={styles.transitionSponsorsToTeam}></div>

      {/* Team Section
      <section ref={sections.team} className={`${styles.pageSection} ${styles.teamSection}`}>
        <div className={styles.teamContainer}>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={styles.teamTitle}
          >
            Meet Our Team
          </motion.h2>
          
          <div className={styles.teamWrapper}>
            <div className={styles.teamTrack}>
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  className={styles.teamItem}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.teamImageWrapper}>
                    <img
                      src={`/images/team${index}.jpg`}
                      alt={`Team member ${index}`}
                      className={styles.teamImage}
                    />
                  </div>
                  <div className={styles.teamInfo}>
                    <h3 className={styles.teamName}>Team Member {index}</h3>
                    <p className={styles.teamRole}>Role</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}
      <div className={styles.transitionTeamToContact}></div>

      {/* Contact Section */}
      <section ref={sections.contact} className={`${styles.pageSection} ${styles.contactSection}`}>
        {/* Contact form content */}
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
