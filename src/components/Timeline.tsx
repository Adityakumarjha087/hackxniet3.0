import { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './Timeline.module.css';
import Image from 'next/image';

const Timeline = () => {
  const timelineRef = useRef(null);

  const timelineData = [
    { title: 'Registration Opens', date: 'May 13, 2025' },
    { title: 'Team Formation', date: 'May 30, 2025' },
    { title: 'Profile Review', date: '16-18 Aug 2025' },
    { title: 'Submit Work', date: '19-20 Aug 2025' },
    { title: 'Mentoring', date: '20-21 Aug 2025' },
    { title: 'Final Round', date: '22 Aug 2025' },
    { title: 'Results', date: '23 Aug 2025' },
  ];

  return (
    <section className={styles.timelineSection}>
      <div className={styles.backgroundImage}>
        <div className={styles.overlay}></div>
        <Image
          src="/images/adi3.png"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />
      </div>
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <h2>Event Timeline</h2>
          <div className={styles.headingUnderline}></div>
        </div>
        <div className={styles.timeline} ref={timelineRef}>
          <motion.div
            className={styles.timelineLine}
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            viewport={{ once: true }}
            style={{ willChange: 'height' }}
          />
          {timelineData.map((item, idx) => (
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
  );
};

export default Timeline; 