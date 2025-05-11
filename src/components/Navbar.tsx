'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Events', path: '/events' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              HackX
            </Link>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative group px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    pathname === item.path
                      ? 'text-purple-600'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {item.name}
                  <motion.span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 transform origin-left transition-transform duration-300 ${
                      pathname === item.path ? 'scale-x-100' : 'scale-x-0'
                    } group-hover:scale-x-100`}
                  />
                </Link>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:block"
          >
            <Link
              href="/register"
              className="relative inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-full overflow-hidden group"
            >
              <span className="relative z-10">Register Now</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar; 