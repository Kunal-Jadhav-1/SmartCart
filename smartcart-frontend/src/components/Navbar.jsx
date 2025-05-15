import { Link, useLocation } from "react-router-dom";
import SmartCart_Logo from "../assets/SmartCart_Logo.png";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLink = "text-primary hover:text-ascent transition-colors duration-200";

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-dark shadow-md sticky top-0 z-40 bg-secondary">
      <Link to="/">
        <img
          src={SmartCart_Logo}
          alt="SmartCart"
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-contain"
        />
      </Link>
      <div className="space-x-4 sm:space-x-6 text-sm sm:text-base md:text-lg">
        <Link to="/" className={`${navLink} ${currentPath === "/" ? "font-bold" : ""}`}>
          Home
        </Link>
        <Link to="/track" className={`${navLink} ${currentPath === "/track" ? "font-bold" : ""}`}>
          Track
        </Link>
        <Link to="/settings" className={`${navLink} ${currentPath === "/settings" ? "font-bold" : ""}`}>
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
