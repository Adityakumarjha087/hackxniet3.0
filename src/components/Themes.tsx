import { motion } from 'framer-motion';
import styles from '../styles/Themes.module.css';
import { useState } from 'react';

interface Theme {
  title: string;
  icon: string;
  description: string;
  color: string;
}

const themes: Theme[] = [
  {
    title: "AI & Machine Learning",
    icon: "🤖",
    description: "Create innovative solutions leveraging artificial intelligence and machine learning algorithms to solve real-world problems.",
    color: "#FF6B6B"
  },
  {
    title: "HealthTech",
    icon: "🏥",
    description: "Develop applications that address healthcare challenges, from patient care to medical research and wellness tracking.",
    color: "#4ECDC4"
  },
  {
    title: "Sustainable Technology",
    icon: "🌱",
    description: "Build solutions focusing on environmental sustainability, renewable energy, and reducing carbon footprints.",
    color: "#45B7D1"
  },
  {
    title: "FinTech Revolution",
    icon: "💰",
    description: "Innovate in financial technology, from blockchain applications to personal finance management and secure transactions.",
    color: "#96CEB4"
  },
  {
    title: "Smart Education",
    icon: "📚",
    description: "Create platforms that enhance learning experiences, from personalized education to collaborative virtual classrooms.",
    color: "#D4A373"
  },
  {
    title: "Open Innovation",
    icon: "🚀",
    description: "Your unique idea that doesn't fit the other categories but has the potential to make a significant impact.",
    color: "#FF9F1C"
  }
];

const Themes = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section className={styles.themesSection}>
      <div className={styles.themesOverlay} />
      <div className={styles.themesContainer}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.sectionHeading}
        >
          <h2>Hackathon Themes</h2>
          <div className={styles.headingUnderline}></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className={styles.themesTitle}
        >
         
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.themesGrid}
        >
          {themes.map((theme, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={styles.themeCard}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: hoveredIndex === index 
                  ? `linear-gradient(135deg, ${theme.color}22, ${theme.color}44)`
                  : 'rgba(0, 0, 0, 0.6)'
              }}
            >
              <div className={styles.themeContent}>
                <motion.div 
                  className={styles.themeIconWrapper}
                  animate={{
                    scale: hoveredIndex === index ? 1.2 : 1,
                    y: hoveredIndex === index ? -10 : 0
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className={styles.themeIcon} style={{ 
                    textShadow: hoveredIndex === index 
                      ? `0 0 20px ${theme.color}88` 
                      : 'none'
                  }}>
                    {theme.icon}
                  </span>
                </motion.div>
                <motion.h3 
                  className={styles.themeTitle}
                  animate={{
                    color: hoveredIndex === index ? theme.color : '#d4af37'
                  }}
                >
                  {theme.title}
                </motion.h3>
                <motion.div 
                  className={styles.themeDivider}
                  animate={{
                    width: hoveredIndex === index ? '80%' : '50px',
                    backgroundColor: hoveredIndex === index ? theme.color : '#d4af37'
                  }}
                />
                <motion.p 
                  className={styles.themeDescription}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0.8
                  }}
                >
                  {theme.description}
                </motion.p>
              </div>
              <motion.div 
                className={styles.themeGlow}
                animate={{
                  opacity: hoveredIndex === index ? 0.2 : 0
                }}
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${theme.color}88, transparent)`
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Themes; 