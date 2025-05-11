import Head from 'next/head';
import styles from '../styles/LandingPage.module.css';

export default function Sponsors() {
  return (
    <div className={`${styles.fullPageContainer} ${styles.sponsorsSection}`}>
      <Head>
        <title>Sponsors | HACKXNIET 3.0</title>
      </Head>
      <main className={styles.sectionContent} style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1rem 6rem 1rem' }}>
        <h1 className={styles.typingEffect} style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#d4af37' }}>Sponsors</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          {/* Sponsor logos/images will go here */}
        </div>
      </main>
    </div>
  );
} 