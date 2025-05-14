'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const element = section as HTMLElement;
        const sectionTop = element.offsetTop;
        const sectionHeight = element.clientHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
          setActiveSection(element.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = {
    home: 'home',
    about: 'about',
    themes: 'themes',
    timeline: 'timeline',
    team: '/team',
    faq: 'faq',
    contact: 'contact'
  };

  const scrollToSection = (sectionId: string) => {
    // If it's a page route (starts with '/'), use router navigation
    if (sectionId.startsWith('/')) {
      window.location.href = sectionId;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <nav className={`${styles.navbar} ${navbarScrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.navContent}>
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}></span>
        </button>
        
        <ul className={`${styles.navList} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {Object.entries({
            home: 'HOME',
            about: 'ABOUT US',
            themes: 'THEMES',
            team: 'TEAM',
            faq: 'FAQ',
            contact: 'CONTACT US'
          }).map(([key, label]) => (
            <li key={key}>
              <button
                onClick={() => scrollToSection(sections[key as keyof typeof sections])}
                className={`${styles.navLink} ${activeSection === key ? styles.activeLink : ''}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
        
        <div className={styles.registerWrapper}>            
          <Link href="/register">
            <button className={styles.registerNavButton}>REGISTER</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 