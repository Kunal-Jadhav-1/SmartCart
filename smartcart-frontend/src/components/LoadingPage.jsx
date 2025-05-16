import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image2 from "../assets/SmartCart_Logo_Loading.png";

const LoadingPage = ({ onFinish }) => {
  const [startWipe, setStartWipe] = useState(false);
  const [hideFirstImage, setHideFirstImage] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStartWipe(true), 3300);
    const t2 = setTimeout(() => setHideFirstImage(true), 2800);
    const t3 = setTimeout(() => onFinish(), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-dark z-50 overflow-hidden px-4">
      {/* Text Block (SmartCart Name) */}
      <AnimatePresence>
        {!hideFirstImage && (
          <motion.div
            key="img1"
            className="w-[90%] sm:w-[70%] md:w-[40%] text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl sm:text-5xl md:text-7xl font-logo text-secondary">
              SmartCart
            </div>
            <div className="text-xl sm:text-xl md:text-2xl font-logo text-secondary">
              - waiting for the bill to drop -
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliding Image */}
      <AnimatePresence>
        {startWipe && (
          <motion.img
            key="img2"
            src={image2}
            alt="SmartCart Loader"
            className="absolute w-[80%] sm:w-[60%] md:w-[40%] object-contain"
            initial={{ y: "-100%", opacity: 1 }}
            animate={{ y: "180%", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.75, ease: "backOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingPage;
