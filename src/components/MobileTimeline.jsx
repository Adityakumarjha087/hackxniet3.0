import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// This will be replaced with actual timeline data
const timelineData = [
  {
    date: 'Date 1',
    title: 'Event 1',
    description: 'Description for event 1'
  },
  // Add more timeline events here
];

export default function MobileTimeline() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative py-8" ref={timelineRef}>
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>
      
      {timelineData.map((event, index) => (
        <motion.div
          key={index}
          className="timeline-item relative mb-8"
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="w-1/2 px-4">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{event.date}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
            <div className="w-1/2 flex justify-center">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 