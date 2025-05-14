'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Gallery.module.css';

interface GalleryImage {
  id?: number;
  img?: string;
  src?: string;
  alt: string;
  width?: number;
  height?: number;
}

interface GalleryProps {
  images?: GalleryImage[];
}

interface ModalProps {
  image: GalleryImage;
  onClose: () => void;
}

const ImageModal: React.FC<ModalProps> = ({ image, onClose }) => {
  return (
    <motion.div 
      className={styles.modal}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className={styles.modalContent}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <img src={image.img || image.src} alt={image.alt} className={styles.modalImage} />
      </motion.div>
    </motion.div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const defaultGalleryImages: GalleryImage[] = [
    { id: 1, img: "/images/gallery/g1 (1).jpeg", alt: "HackxNiet Event 1" },
    { id: 2, img: "/images/gallery/g1 (2).jpeg", alt: "HackxNiet Event 2" },
    { id: 3, img: "/images/gallery/g1 (3).jpeg", alt: "HackxNiet Event 3" },
    { id: 4, img: "/images/gallery/g1 (4).jpeg", alt: "HackxNiet Event 4" },
    { id: 5, img: "/images/gallery/g1 (5).jpeg", alt: "HackxNiet Event 5" },
    { id: 6, img: "/images/gallery/g1 (6).jpeg", alt: "HackxNiet Event 6" },
    { id: 7, img: "/images/gallery/g1 (7).jpeg", alt: "HackxNiet Event 7" },
    { id: 8, img: "/images/gallery/g1 (8).jpeg", alt: "HackxNiet Event 8" },
    { id: 9, img: "/images/gallery/g1 (9).jpeg", alt: "HackxNiet Event 9" },
    { id: 10, img: "/images/gallery/g1 (10).jpeg", alt: "HackxNiet Event 10" },
    { id: 11, img: "/images/gallery/g1 (11).jpeg", alt: "HackxNiet Event 11" },
    { id: 12, img: "/images/gallery/g1 (12).jpeg", alt: "HackxNiet Event 12" }
  ];

  const galleryImages = images || defaultGalleryImages;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className={styles.gallerySection}>
      <div className={styles.galleryOverlay} />
      <div className={styles.galleryContainer}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.sectionHeading}
        >
          <h2>Event Gallery</h2>
          <div className={styles.headingUnderline}></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.galleryGrid}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id || index}
              variants={itemVariants}
              className={styles.galleryItem}
              onClick={() => setSelectedImage(image)}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={image.img || image.src}
                  alt={image.alt}
                  className={styles.galleryImage}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/images/placeholder.jpg";
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal 
            image={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery; 