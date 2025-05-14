import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import styles from '../styles/LandingPage.module.css';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import About from '../components/About';
import Themes from '../components/Themes';
import Gallery from '../components/Gallery';
import Timeline from '../components/Timeline';
import Footer from '../components/Footer';

const faqData = [
  {
    question: "What is HACKXNIET 3.0?",
    answer: "HACKXNIET 3.0 is a magical hackathon where students come together to create innovative solutions, just like wizards crafting spells at Hogwarts!"
  },
  {
    question: "Who can participate?",
    answer: "All aspiring wizards (students) from any college can participate in teams of 4-6 members. Like the Triwizard Tournament, at least one witch (female participant) must be part of each team."
  },
  {
    question: "What should I bring?",
    answer: "Your wand (laptop), spellbooks (study materials), and a mind ready for magical innovation! We'll provide the food and refreshments."
  },
  {
    question: "Are there any prizes?",
    answer: "Yes! The Chamber of Secrets holds exciting rewards including cash prizes, internship opportunities, and magical goodies for the winning teams!"
  }
];

const FAQ = () => {
  return (
    <div className={styles.faqSection}>
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
            <h3 className={styles.faqQuestion}>⚡ {faq.question}</h3>
            <p className={styles.faqAnswer}>{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>HACKXNIET 3.0 - National Level Hackathon</title>
        <meta name="description" content="Join HACKXNIET 3.0, a national-level hackathon bringing together innovators, coders, and creators to solve real-world problems." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.cdnfonts.com/css/harry-p" rel="stylesheet" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        {/* Home Section */}
        <section id="home">
          <Home />
        </section>
        
        {/* Transition */}
        <div className={styles.transitionHomeToAbout}></div>

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Transition */}
        <div className={styles.transitionAboutToThemes}></div>

        {/* Themes Section */}
        <section id="themes">
          <Themes />
        </section>

        {/* Transition */}
        <div className={styles.transitionThemesToGallery}></div>

        {/* Timeline Section */}
        <section id="timeline">
          <Timeline />
        </section>

        {/* Transition */}
        <div className={styles.transitionGalleryToTimeline}></div>

        {/* Gallery Section */}
        <section id="gallery">
          <Gallery />
        </section>

        {/* Transition */}
        <div className={styles.transitionTimelineToFaq}></div>

        {/* FAQ Section */}
        <section id="faq">
          <FAQ />
        </section>

        {/* Contact Section with Footer */}
        <section id="contact">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default LandingPage; 
