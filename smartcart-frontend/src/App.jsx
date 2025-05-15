import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TrackProduct from "./pages/TrackProduct";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import LoadingPage from "./components/LoadingPage";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence>
        {loading && <LoadingPage onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/track" element={<TrackProduct />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </>
      )}
    </Router>
  );
}
