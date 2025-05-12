import Head from 'next/head';
import { motion } from 'framer-motion';
import styles from '../styles/LandingPage.module.css';

const faqData = [
  {
    question: "What is HACKXNIET 3.0?",
    answer: "HACKXNIET 3.0 is a national-level hackathon bringing together innovators, coders, and creators to solve real-world problems."
  },
  {
    question: "Who can participate?",
    answer: "Students from all colleges and backgrounds are welcome to participate in teams of 4-6 members, with at least one female member per team."
  },
  {
    question: "How do I register?",
    answer: "Registration is online via the official website. Form your team and sign up through our registration portal."
  },
  {
    question: "What are the prizes?",
    answer: "Winners will receive exciting prizes including cash rewards, internship opportunities, and sponsored goodies."
  },
  {
    question: "Is there a registration fee?",
    answer: "Yes, there is a nominal registration fee per team. Early bird registrations get special discounts."
  },
  {
    question: "What should I bring?",
    answer: "Bring your laptop, charger, and any other equipment you need for development. Food and refreshments will be provided."
  }
];

export default function FAQ() {
  return (
    <div className={`${styles.fullPageContainer} ${styles.faqSection}`}>
      <Head>
        <title>FAQ | HACKXNIET 3.0</title>
        <meta name="description" content="Frequently Asked Questions about HACKXNIET 3.0" />
      </Head>
      
      <main className={styles.sectionContent}>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.sectionHeading}
        >
          <h2>Frequently Asked Questions</h2>
          <div className={styles.headingUnderline}></div>
        </motion.div>

        <div className={styles.faqContainer}>
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className={styles.faqItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className={styles.faqQuestion}>{faq.question}</h3>
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
} 