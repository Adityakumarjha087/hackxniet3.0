import { motion } from 'framer-motion';
import styles from '../styles/Timeline.module.css';

const Timeline = () => {
  const events = [
    {
      id: 1,
      date: "October 15",
      title: "Registrations Open",
      description: "Sign up for the hackathon begins",
      icon: "📅"
    },
    {
      id: 2,
      date: "November 5",
      title: "Team Formation Deadline",
      description: "Last day to form and register your team",
      icon: "👥"
    },
    {
      id: 3,
      date: "November 15",
      title: "Idea Submission",
      description: "Submit your project proposal",
      icon: "💡"
    },
    {
      id: 4,
      date: "November 20-25",
      title: "Mentorship Sessions",
      description: "Get guidance from industry experts",
      icon: "🧑‍🏫"
    },
    {
      id: 5,
      date: "December 1-3",
      title: "Hackathon Event",
      description: "36 hours of coding and innovation",
      icon: "⌨️"
    },
    {
      id: 6,
      date: "December 5",
      title: "Results Announcement",
      description: "Winners will be announced",
      icon: "🏆"
    }
  ];

  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Hackathon Timeline</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineLine}></div>
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              className={styles.timelineItem}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineIcon}>{event.icon}</div>
                <div className={styles.timelineDate}>{event.date}</div>
                <h3 className={styles.timelineTitle}>{event.title}</h3>
                <p className={styles.timelineDescription}>{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
