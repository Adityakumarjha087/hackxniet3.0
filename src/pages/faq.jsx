import Head from 'next/head';
import styles from '../styles/LandingPage.module.css';

export default function FAQ() {
  return (
    <div className={`${styles.fullPageContainer} ${styles.faqSection}`}>
      <Head>
        <title>FAQ | HACKXNIET 3.0</title>
      </Head>
      <main className={styles.sectionContent} style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1rem' }}>
        <h1 className={styles.typingEffect} style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#d4af37' }}>Frequently Asked Questions</h1>
        <div className={styles.faqContainer}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>What is HACKXNIET 3.0?</h3>
            <p className={styles.faqAnswer}>HACKXNIET 3.0 is a national-level hackathon bringing together innovators, coders, and creators to solve real-world problems.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Who can participate?</h3>
            <p className={styles.faqAnswer}>Students from all colleges and backgrounds are welcome to participate in teams.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>How do I register?</h3>
            <p className={styles.faqAnswer}>Registration is online via the official website. Form your team and sign up!</p>
          </div>
        </div>
      </main>
    </div>
  );
} 