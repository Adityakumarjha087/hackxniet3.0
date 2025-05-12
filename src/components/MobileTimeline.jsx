import { motion } from 'framer-motion';
import styles from '../styles/LandingPage.module.css';

const timelineData = [
  { date: 'May 13, 2025', title: 'Registration Opens', description: 'Begin your journey with HACKXNIET 3.0' },
  { date: 'May 30, 2025', title: 'Team Formation', description: 'Form your dream team of innovators' },
  { date: '16-18 Aug 2025', title: 'Profile Review', description: 'Initial screening and team verification' },
  { date: '19-20 Aug 2025', title: 'Submit Work', description: 'Present your innovative solutions' },
  { date: '20-21 Aug 2025', title: 'Mentoring', description: 'Get guidance from industry experts' },
  { date: '22 Aug 2025', title: 'Final Round', description: 'Showcase your final project' },
  { date: '23 Aug 2025', title: 'Results', description: 'Winners announcement and prizes' }
];

export default function MobileTimeline() {
  return (
    <div className={styles.mobileTimelineContainer}>
      {timelineData.map((event, index) => (
        <motion.div
          key={index}
          className={styles.mobileTimelineItem}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className={styles.mobileTimelineDot} />
          <div className={styles.mobileTimelineContent}>
            <h3 className={styles.mobileTimelineDate}>{event.date}</h3>
            <h4 className={styles.mobileTimelineTitle}>{event.title}</h4>
            <p className={styles.mobileTimelineDescription}>{event.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 