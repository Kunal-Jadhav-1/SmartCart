// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 min-h-screen content-center text-center"
    >
      <h1 className="text-5xl font-bold text-secondary">Welcome to SmartCart</h1>
      <p className="mt-4 text-xl text-secondary">
        Track products and get price drop alerts!
      </p>
      <div className="mt-8">
        <Link
          to="/track"
          className="px-6 py-2 bg-secondary text-primary rounded-lg hover:bg-ascent hover:text-primary transition-colors text-2xl font-logo"
        >
          Start Tracking Products
        </Link>
      </div>
    </motion.div>
  );
}
