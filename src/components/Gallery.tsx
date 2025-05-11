'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
}

const Gallery = ({ images }: GalleryProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="relative aspect-square overflow-hidden rounded-lg shadow-lg"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            priority={index < 3}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Gallery; 