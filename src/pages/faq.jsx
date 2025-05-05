import Head from 'next/head';
import styles from '../styles/LandingPage.module.css';

export default function FAQ() {
  return (
    <div className={styles.fullPageContainer}>
      <Head>
        <title>FAQ | HACKXNIET 3.0</title>
      </Head>
      <main className={styles.sectionContent} style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1rem' }}>
        <h1>Frequently Asked Questions</h1>
        {/* Place your FAQ content here, e.g. Q&A pairs */}
        <div>
          {/* Example: */}
          {/* <h3>What is HACKXNIET 3.0?</h3>
          <p>HACKXNIET 3.0 is ...</p> */}
        </div>
      </main>
    </div>
  );
} 