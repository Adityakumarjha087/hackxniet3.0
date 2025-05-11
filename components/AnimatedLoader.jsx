import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";

const GOLD = "#D4AF37";
const BLACK = "#000";

const logos = [
  "/images/logo1.png", // Replace with your actual logo paths
  "/images/logo2.png",
  "/images/logo3.png"
];

export default function AnimatedLoader({ show }) {
  const [fontChanged, setFontChanged] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [showLogos, setShowLogos] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (show) {
      setFontChanged(false);
      setDoorOpen(false);
      setShowLogos(false);
      setReverse(false);
      setFadeOut(false);

      // Sequence
      setTimeout(() => setFontChanged(true), 1200); // Font morph
      setTimeout(() => setDoorOpen(true), 2000);    // Door opens
      setTimeout(() => setShowLogos(true), 2500);   // Show logos
      setTimeout(() => setReverse(true), 6500);     // Reverse door
      setTimeout(() => setFadeOut(true), 6700);     // Fade out
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: BLACK,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}
        >
          {/* Particle Effects */}
          {(reverse || fadeOut) && (
            <Particles
              id="tsparticles"
              options={{
                fullScreen: { enable: false },
                particles: {
                  number: { value: 60 },
                  color: { value: GOLD },
                  shape: { type: "circle" },
                  opacity: { value: 0.7 },
                  size: { value: 3 },
                  move: { enable: true, speed: 2 }
                }
              }}
              style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                zIndex: 10
              }}
            />
          )}

          {/* Door Panels */}
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50vw",
              height: "100vh",
              background: BLACK,
              zIndex: 20
            }}
            animate={{
              x: doorOpen && !reverse ? "-100vw" : reverse ? 0 : 0
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50vw",
              height: "100vh",
              background: BLACK,
              zIndex: 20
            }}
            animate={{
              x: doorOpen && !reverse ? "100vw" : reverse ? 0 : 0
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Center Content */}
          <div
            style={{
              position: "relative",
              zIndex: 30,
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Title */}
            <motion.h1
              initial={false}
              animate={{
                color: fontChanged ? GOLD : "#fff",
                fontFamily: fontChanged
                  ? "'Harry P', 'Cinzel Decorative', serif"
                  : "inherit",
                fontWeight: fontChanged ? 700 : 400,
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                letterSpacing: "0.1em"
              }}
              transition={{ duration: 0.7 }}
              style={{
                marginBottom: showLogos ? "2.5rem" : 0,
                textAlign: "center",
                textShadow: fontChanged
                  ? `0 0 20px ${GOLD}, 0 0 40px ${GOLD}`
                  : "none"
              }}
            >
              HACK X NIET 3.0
            </motion.h1>

            {/* Logos */}
            {showLogos && (
              <div
                style={{
                  display: "flex",
                  gap: "2vw",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {logos.map((src, i) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt={`logo${i + 1}`}
                    initial={{ scale: 1, opacity: 0.7 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      delay: i * 0.2
                    }}
                    style={{
                      width: "clamp(60px, 12vw, 120px)",
                      height: "auto",
                      filter: `drop-shadow(0 0 10px ${GOLD})`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 