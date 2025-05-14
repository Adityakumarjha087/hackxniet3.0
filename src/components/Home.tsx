import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <motion.section 
      className={styles.homeSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={styles.videoBackground}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.backgroundVideo}
        >
          <source src="/video/adi.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoOverlay}></div>
      </div>

      <motion.div 
        className={styles.titleWrapper}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div 
          className={styles.hack}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Hack
        </motion.div>
        <motion.div 
          className={styles.x}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          x
        </motion.div>
        <motion.div 
          className={styles.niet}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Niet
        </motion.div>
        <motion.div 
          className={styles.version}
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          3.0
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.sectionTitleTop}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {/* <h2>Welcome to HackxNiet 3.0</h2> */}
      </motion.div>
    </motion.section>
  );
};

export default Home; 