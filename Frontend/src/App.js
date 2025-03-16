import React from "react"; // Import React
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router
import Navbar from "./components/Navbar"; // Import the Navbar
import Home from "./pages/Home"; // Home Page
import SearchByDate from "./pages/SearchByDate"; // Searching by date feature
import SearchByVendor from "./pages/SearchByVendor"; // Searching by vendor feature
import SearchByCVSS from "./pages/SearchByCVSS"; // Searching by CVSS feature
import SearchByCategory from "./pages/SearchByCategory"; // Searching by category feature
import RealTimeFeed from "./pages/RealTimeFeed"; // Real-time feed feature
import DomainReputation from "./pages/DomainReputation"; // Domain reputation feature
import KeyWordSearch from "./pages/KeyWordSearch"; // key word Search feature
import VulnCheck from "./pages/VulnCheck"; // Export reports feature
import "./App.css"; // Importing styles

function App() {
  return (
    <Router> {/* Wrap the application in a Router */}
      <div className="container"> {/* Main container */}
        <Navbar /> {/* Navbar */}

        <main className="content"> {/* Main Content */}
          <Routes> {/* Define routes */}
            <Route path="/" element={<Home />} /> {/* Home Page */}
            <Route path="/search-by-date" element={<SearchByDate />} /> {/* Search by Date */}
            <Route path="/search-by-vendor" element={<SearchByVendor />} /> {/* Search by Vendor */}
            <Route path="/search-by-cvss" element={<SearchByCVSS />} /> {/* Search by CVSS */}
            <Route path="/search-by-category" element={<SearchByCategory />} /> {/* Search by Category */}
            <Route path="/key-word-search" element={<KeyWordSearch />} /> {/* key word search */}
            <Route path="/real-time-feed" element={<RealTimeFeed />} /> {/* Real-Time Feed */}
            <Route path="/domain-reputation" element={<DomainReputation />} /> {/* Domain Reputation */}
            <Route path="/vuln-check" element={<VulnCheck />} /> {/* Export Reports */}
          </Routes>
        </main>

        <footer className="footer"> {/* Footer */}
          <p>© {new Date().getFullYear()} Secure Sentinels | Keeping You Secure</p> {/* Footer text */}
        </footer>
      </div>
    </Router>
  );
}

export default App; // Export the App component
