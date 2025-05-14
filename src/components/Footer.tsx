import { FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Contact Info</h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <p>NIET, Plot No. 19, Knowledge Park-II Greater Noida, G.B. Nagar (U.P.) - 201306</p>
            </div>
            <div className={styles.contactItem}>
              <FaEnvelope className={styles.contactIcon} />
              <p>Email: ekumeclub@gmail.com</p>
            </div>
            <div className={styles.contactItem}>
              <FaPhone className={styles.contactIcon} />
              <p>Phone: +91-8178110080</p>
            </div>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Connect With Us</h3>
          <div className={styles.socialLinks}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Find Us</h3>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.563147675764!2d77.4560599!3d28.4571702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1df1b4e0517%3A0xcd9f11f4e9e3b49!2sNoida%20Institute%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1647870000000!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>© 2024 HACKXNIET 3.0. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 