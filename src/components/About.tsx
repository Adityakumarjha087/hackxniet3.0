import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/About.module.css';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const About: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutOverlay} />
      <div className={styles.aboutContainer}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.sectionHeading}
        >
          <h2>About Us</h2>
          <div className={styles.headingUnderline}></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.aboutContent}
        >
          <motion.div variants={itemVariants} className={styles.aboutCard}>
            <div className={styles.cardContent}>
              <h3>Welcome to HackxNiet 3.0</h3>
              <p>
                Get ready to ignite your imagination at <span className={styles.highlight}>Hack-X-NIET 3.0</span>, 
                the ultimate 36-hour offline coding odyssey, hosted by NIET's <span className={styles.highlight}>EKUME & Reboot Clubs</span>.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.aboutCard}>
            <div className={styles.cardContent}>
              <h3>Our Vision</h3>
              <p>
                HACKXNIET 3.0 brings together over 400 brilliant minds from across the nation, creating a vibrant ecosystem 
                of innovation and collaboration. This is more than just a hackathon – it's a platform where ideas transform 
                into impactful solutions.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.aboutCard}>
            <div className={styles.cardContent}>
              <h3>Expert Mentorship</h3>
              <p>
                Connect with industry veterans, tech visionaries, and seasoned mentors who will guide you throughout your journey. 
                Our expert mentors will provide invaluable insights, helping you refine your ideas and build robust solutions.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.aboutCard}>
            <div className={styles.cardContent}>
              <h3>Real Impact</h3>
              <p>
                At HACKXNIET 3.0, we focus on creating solutions that matter. You'll have the opportunity to work on real-world 
                challenges, develop functional prototypes, and present your innovations to a panel of distinguished judges.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.registrationBanner}
        >
          <motion.h3
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className={styles.registrationText}
          >
            Registrations Opening Soon — Are you ready to hack the future?
          </motion.h3>
          {/* <p className={styles.teamInfo}>Form your dream squad (4–6 members, one female mandatory)</p> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.socialSection}
        >
          <h3>Connect With Us</h3>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                whileHover={{ scale: 1.2, rotate: index % 2 === 0 ? 5 : -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 