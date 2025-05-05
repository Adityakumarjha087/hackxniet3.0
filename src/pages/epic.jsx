import Head from 'next/head';
import styles from '../styles/LandingPage.module.css';

export default function Epic() {
  return (
    <div className={styles.fullPageContainer}>
      <Head>
        <title>Epic | HACKXNIET 3.0</title>
      </Head>
      <main className={styles.sectionContent} style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1rem 6rem 1rem' }}>
        <h1>Epic</h1>
        <p>Epic content coming soon...</p>
      </main>
    </div>
  );
}
