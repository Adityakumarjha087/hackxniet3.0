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
    themes: useRef(null),
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
              themes: 'THEMES',
              gallery: 'GALLERY',
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
          </ul>          <div className={styles.registerWrapper}>            
            <a href="/register">
              <button className={styles.registerNavButton}>REGISTER</button>
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
      </section>      <div className={styles.transitionHomeToAbout}>
        <div className={styles.magicParticle}></div>
        <div className={styles.magicParticle}></div>
        <div className={styles.magicParticle}></div>
        <div className={styles.magicParticle}></div>
        <div className={styles.magicParticle}></div>
        <h2 className={styles.transitionHeading}>HACKXNIET3.0</h2>
      </div>      {/* About Section */}
      <section ref={sections.about} className={`${styles.pageSection} ${styles.aboutSection}`}>
        <div className={styles.sectionHeading}>
          <h2>About Us</h2>
          <div className={styles.headingUnderline}></div>
        </div>

        <div className={styles.aboutContent}>
          {/* Main Content */}
          <div className={styles.aboutTextContent}>
            <p>
              Get ready to ignite your imagination at <span className={styles.highlightText}>Hack-X-NIET 3.0</span>, 
              the ultimate 36-hour offline coding odyssey, hosted by NIET's <span className={styles.highlightText}>EKUME & Reboot Clubs</span>.
            </p>
            <p>
              HACKXNIET 3.0 brings together over 400 brilliant minds from across the nation, creating a vibrant ecosystem 
              of innovation and collaboration. This is more than just a hackathon – it's a platform where ideas transform 
              into impactful solutions, where creativity meets technology, and where the next generation of tech leaders emerges.
            </p>
            <p>
              Connect with industry veterans, tech visionaries, and seasoned mentors who will guide you throughout your journey. 
              Our expert mentors will provide invaluable insights, helping you refine your ideas and build robust solutions.
            </p>
            <p>
              At HACKXNIET 3.0, we focus on creating solutions that matter. You'll have the opportunity to work on real-world 
              challenges, develop functional prototypes, and present your innovations to a panel of distinguished judges.
            </p>
            <p>
              Form your dream squad (4–6 members, one female mandatory) and turn ideas into solutions that matter.
            </p>
          </div>

          {/* Registration Banner */}
          <div className={styles.registrationBanner}>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <h3 className={styles.registrationText}>
                Registrations Opening Soon — Are you ready to hack the future?
              </h3>
            </motion.div>
          </div>

          {/* Social Section */}
          <div className={styles.socialSection}>
            <h3 className={styles.socialTitle}>Follow Us</h3>
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
          </div>
        </div>
      </section>

      <div className={styles.transitionAboutToThemes}></div>
      
      {/* Themes Section */}
      <section ref={sections.themes} className={`${styles.pageSection} ${styles.themesSection}`}>
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
        <div className={styles.sectionHeading}>
          <h2>Event Gallery</h2>
          <div className={styles.headingUnderline}></div>
        </div>
        <div className={styles.galleryContainer}>
          <div className={styles.galleryGrid}>
            {[
              { id: 1, img: "/images/gallery/g1 (1).jpeg" },
              { id: 2, img: "/images/gallery/g1 (2).jpeg" },
              { id: 3, img: "/images/gallery/g1 (3).jpeg" },
              { id: 4, img: "/images/gallery/g1 (4).jpeg" },
              { id: 5, img: "/images/gallery/g1 (5).jpeg" },
              { id: 6, img: "/images/gallery/g1 (6).jpeg" },
              { id: 7, img: "/images/gallery/g1 (7).jpeg" },
              { id: 8, img: "/images/gallery/g1 (8).jpeg" },
              { id: 9, img: "/images/gallery/g1 (9).jpeg" },
              { id: 10, img: "/images/gallery/g1 (10).jpeg" },
              { id: 11, img: "/images/gallery/g1 (11).jpeg" },
              { id: 12, img: "/images/gallery/g1 (12).jpeg" }
            ].map((item) => (
              <motion.div
                key={item.id}
                className={styles.galleryItem}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: (item.id % 3) * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.galleryImageWrapper}>
                  <img
                    src={item.img}
                    alt={`Gallery Image ${item.id}`}
                    className={styles.galleryImage}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder.jpg";
                    }}
                  />
                </div>
              </motion.div>
            ))}
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

      <div className={styles.transitionTimelineToSponsors}></div>

      {/* Sponsors Section */}
      <section className={styles.sponsorsSection}>
        <div className={styles.sectionHeading}>
          <h2>Sponsors</h2>
          <div className={styles.headingUnderline}></div>
        </div>
        <div className={styles.sponsorGrid}>
          {/* Example sponsors, replace with real data as needed */}
          <div className={styles.sponsorCard}>
            <div className={styles.sponsorImageWrapper}>
              <img src="/images/sponsor1.png" alt="Sponsor 1" className={styles.sponsorImage} />
            </div>
            <div className={styles.sponsorName}>Sponsor One</div>
          </div>
          <div className={styles.sponsorCard}>
            <div className={styles.sponsorImageWrapper}>
              <img src="/images/sponsor2.png" alt="Sponsor 2" className={styles.sponsorImage} />
            </div>
            <div className={styles.sponsorName}>Sponsor Two</div>
          </div>
          <div className={styles.sponsorCard}>
            <div className={styles.sponsorImageWrapper}>
              <img src="/images/sponsor3.png" alt="Sponsor 3" className={styles.sponsorImage} />
            </div>
            <div className={styles.sponsorName}>Sponsor Three</div>
          </div>
        </div>
        <div className={styles.sponsorsBottomContent}>
          <a href="/docs/hackxniet_brochure.pdf" download="HACKXNIET_3.0_Brochure.pdf" target="_blank" rel="noopener noreferrer">
            <button className={styles.sponsorsBrochureButton}>DOWNLOAD BROCHURE</button>
          </a>
        </div>
      </section>

      <div className={styles.transitionSponsorsToFaq}></div>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.sectionHeading}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.headingUnderline}></div>
        </div>
        <div className={styles.faqContainer}>
          {/* Magical floating particles */}
          <div className={styles.faqParticle}></div>
          <div className={styles.faqParticle}></div>
          <div className={styles.faqParticle}></div>
          <div className={styles.faqParticle}></div>
          <div className={styles.faqParticle}></div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What is HACKXNIET 3.0?</h3>
            <p className={styles.faqAnswer}>HACKXNIET 3.0 is a national-level hackathon bringing together innovators, coders, and creators to solve real-world problems.</p>
          </div>
          
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Who can participate?</h3>
            <p className={styles.faqAnswer}>Students from all colleges and backgrounds are welcome to participate in teams of 4-6 members, with at least one female member per team.</p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How do I register for the hackathon?</h3>
            <p className={styles.faqAnswer}>Registration can be done through our official website. Click on the Register button in the navigation bar and follow the instructions to complete your team registration.</p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Is there a registration fee?</h3>
            <p className={styles.faqAnswer}>Yes, there is a nominal registration fee per team. Early bird registrations get special discounts. Details will be announced soon.</p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What should I bring to the hackathon?</h3>
            <p className={styles.faqAnswer}>Bring your laptop, charger, and any other equipment you need for development. Food and refreshments will be provided during the event.</p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Will there be mentors available during the hackathon?</h3>
            <p className={styles.faqAnswer}>Yes, experienced mentors from industry and academia will be available throughout the event to guide teams and provide technical support.</p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What are the judging criteria?</h3>
            <p className={styles.faqAnswer}>Projects will be judged based on innovation, technical complexity, practical implementation, presentation, and potential impact.</p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Are there any prerequisites for participating?</h3>
            <p className={styles.faqAnswer}>Basic programming knowledge and problem-solving skills are recommended. Teams should be familiar with development tools and technologies.</p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What are the prizes?</h3>
            <p className={styles.faqAnswer}>Winners will receive exciting cash prizes, internship opportunities, sponsored goodies, and certificates. Total prize pool details will be announced soon.</p>
          </div>

          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Is accommodation provided?</h3>
            <p className={styles.faqAnswer}>Yes, accommodation will be provided for outstation participants. Details will be shared with registered teams.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={sections.contact} className={styles.footer}>
        {/* Magical sparkles */}
        <div className={styles.sparkle}></div>
        <div className={styles.sparkle}></div>
        <div className={styles.sparkle}></div>
        <div className={styles.sparkle}></div>
        <div className={styles.sparkle}></div>

        <div className={styles.footerColumns}>
          <div className={`${styles.footerColumn} ${styles.footerColumnLinks}`}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/" className={styles.footerLink}>Home</a></li>
              <li><a href="#about" className={styles.footerLink}>About</a></li>
              <li><a href="#timeline" className={styles.footerLink}>Timeline</a></li>
              <li><a href="#faq" className={styles.footerLink}>FAQ</a></li>
              <li><a href="#sponsors" className={styles.footerLink}>Sponsors</a></li>
            </ul>
          </div>

          <div className={`${styles.footerColumn} ${styles.footerColumnContact}`}>
            <h3>Contact Info</h3>
            <div className={styles.address}>
              NIET, Greater Noida<br/>
              Email: ekumeclub@gmail.com<br/>
              Phone: +91-XXXXXXXXXX
            </div>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div className={`${styles.footerColumn} ${styles.footerColumnMap}`}>
            <h3>Find Us</h3>
            <div className={styles.mapContainer}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0011961572512!2d77.49737147538259!3d28.62601337565966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee3d2df45555%3A0xb3b2cc65e46e5eb2!2sNoida%20Institute%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1709726844330!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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