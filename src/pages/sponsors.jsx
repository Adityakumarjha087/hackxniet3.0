import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '../styles/LandingPage.module.css';

const sponsorsData = [
  { name: 'Gold Sponsor', image: '/images/sponsor1.png', tier: 'gold' },
  { name: 'Silver Sponsor', image: '/images/sponsor2.png', tier: 'silver' },
  { name: 'Bronze Sponsor', image: '/images/sponsor3.png', tier: 'bronze' },
  // Add more sponsors as needed
];

export default function Sponsors() {
  return (
    <div className={`${styles.fullPageContainer} ${styles.sponsorsSection}`}>
      <Head>
        <title>Sponsors | HACKXNIET 3.0</title>
        <meta name="description" content="Our valued sponsors for HACKXNIET 3.0" />
      </Head>
      
      <main className={styles.sectionContent}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.sectionHeading}
        >
          <h2>Our Sponsors</h2>
          <div className={styles.headingUnderline}></div>
        </motion.div>

        <div className={styles.sponsorGrid}>
          {sponsorsData.map((sponsor, index) => (
            <motion.div
              key={index}
              className={`${styles.sponsorCard} ${styles[sponsor.tier]}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={styles.sponsorImageWrapper}>
                <Image
                  src={sponsor.image}
                  alt={sponsor.name}
                  width={150}
                  height={150}
                  className={styles.sponsorImage}
                />
              </div>
              <motion.h3 
                className={styles.sponsorName}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {sponsor.name}
              </motion.h3>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.sponsorshipCTA}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3>Interested in Sponsoring?</h3>
          <p>Join us in fostering innovation and supporting the next generation of tech leaders.</p>
          <a href="mailto:sponsorship@hackxniet.com" className={styles.ctaButton}>
            Become a Sponsor
          </a>
        </motion.div>
      </main>
    </div>
  );
} 