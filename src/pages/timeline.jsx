import { useState, useEffect } from 'react';
import Head from 'next/head';
import MobileTimeline from '../components/MobileTimeline';
import styles from './timeline.module.css';

// This will be replaced with actual timeline data
const timelineData = [
  {
    date: 'Date 1',
    title: 'Event 1',
    description: 'Description for event 1'
  },
  // Add more timeline events here
];

export default function Timeline() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <>
      <Head>
        <title>Timeline | HackX</title>
        <meta name="description" content="HackX Timeline" />
      </Head>

      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Timeline
          </h1>

          {isMobile ? (
            <MobileTimeline />
          ) : (
            <div className={styles.timeline}>
              {timelineData.map((event, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.timelineContent}>
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{event.date}</p>
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
