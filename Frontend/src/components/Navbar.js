import React, { useState } from "react"; // Import React and useState hook
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaBars, FaSearch, FaFilter, FaList, FaRss, FaShieldAlt, FaBell, FaFileExport, FaHome, FaCrosshairs } from "react-icons/fa"; // Import icons from react-icons
import "./Navbar.css"; // Import styles

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown open/close

  return (
    <nav className="navbar"> {/* Navbar container */}
      <div className="logo"> {/* Logo container */}
        <img src="/SecureSentinels.png" alt="Secure Sentinels Logo" className="logo" /> {/* Logo image */}
        <h1 className="logo-text">Secure Sentinels</h1> {/* Logo text */}
      </div>

      {/* Clickable Dropdown Button */}
      <button className="menu-icon" onClick={() => setDropdownOpen(!dropdownOpen)}> {/* Toggle dropdown */}
        <FaBars size={30} /> {/* Menu icon */}
      </button>

      {dropdownOpen && ( // Conditional rendering of dropdown menu
        <ul className="dropdown-menu"> {/* Dropdown menu */}
          <li><Link to="/"><FaHome /> Home</Link></li> {/* Home link */}
          <li><Link to="/search-by-date"><FaSearch /> Search by Date</Link></li> {/* Search by Date link */}
          <li><Link to="/search-by-vendor"><FaSearch /> Search by Vendor</Link></li> {/* Search by Vendor link */}
          <li><Link to="/search-by-cvss"><FaFilter /> Search by CVSS</Link></li> {/* Search by CVSS link */}
          <li><Link to="/search-by-category"><FaList /> Search by Category</Link></li> {/* Search by Category link */}
          <li><Link to="/key-word-search"><FaCrosshairs/> Keyword Search</Link></li> {/* key word search link */}
          <li><Link to="/real-time-feed"><FaRss /> Real-Time Feed - BackLog</Link></li> {/* Real-Time Feed link */}
          <li><Link to="/domain-reputation"><FaSearch /> Domain Reputation - BackLog</Link></li> {/* Domain Reputation link */}
          <li><Link to="/vuln-check"><FaFileExport /> Vulnerability Check - Backlog</Link></li> {/* Export Reports link */}
        </ul>
      )}
    </nav>
  );
}

export default Navbar; // Export the Navbar component