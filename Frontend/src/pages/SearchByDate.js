import React, { useState } from "react"; // Import React and useState hook for state management (Reference: https://react.dev/reference/react/useState)
import "./SearchByDate.css"; // Import external CSS file for styling

const SearchByDate = () => {
  const [date, setDate] = useState(""); // Store the selected date
  const [vulnerabilities, setVulnerabilities] = useState([]); // Store fetched vulnerabilities
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Store any error messages

  /**
   * Fetch vulnerabilities by date from the backend API.
   * Reference:
   * - Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
   * - React State Management: https://react.dev/reference/react/useState
   */
  const handleSearch = async () => {
    if (!date) { // Check if no date is selected
      setError("Please select a date."); // Display error message
      return; // Exit function
    }

    setLoading(true); // Set loading state to true
    setError(""); // Clear previous errors

    try { // Send a GET request to the backend with the selected date Reference: JavaScript Fetch API - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      const response = await fetch(`http://localhost:5000/search-by-date/?date=${date}`);
      const data = await response.json(); // Parse response as JSON

      if (response.ok) { // Check if request was successful
        setVulnerabilities(data.vulnerabilities || []); // Update state with vulnerabilities
      } else {
        setError("Error fetching data. Please try again."); // Handle errors
      }
    } catch (err) {
      console.error("Error:", err); // Log error to console
      setError("Failed to fetch data."); // Set error message
    }

    setLoading(false); // Set loading state to false
  };

  return (
    <div className="search-by-date-container"> {/* Main container for the component */}
      <h2 className="search-by-date-heading">Search Vulnerabilities by Date</h2>

      <div className="search-by-date-input-container"> {/* Container for input and button */}
        <input
          type="date" // Date picker input field
          value={date} // Bind input to state variable
          onChange={(e) => setDate(e.target.value)} // Update state on change
          className="search-by-date-input"
        />
        <button onClick={handleSearch} className="search-by-date-button"> {/* Search button */}
          Search
        </button>
      </div>

      {loading && <p className="search-by-date-loading">Loading...</p>} {/* Show loading message if loading */}

      {error && <p className="search-by-date-error">{error}</p>} {/* Display error message if any */}

      <div className="search-by-date-result-container"> {/* Container for results */}
        {vulnerabilities.length > 0 ? ( // Check if vulnerabilities exist
          <ul className="search-by-date-list">
            {vulnerabilities.map((vuln, index) => ( // Reference: React Lists and Keys - https://react.dev/reference/react/Children/toArray
              <li key={index} className="search-by-date-list-item"> {/* List item for each vulnerability */}
                <strong>{vuln.cve.id}</strong> - {/* Display CVE ID */}
                {vuln.cve.descriptions.find(desc => desc.lang === "en")?.value || "No description available"} {/* Display English description */}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="search-by-date-no-results">No vulnerabilities found.</p> // Show message if no results
        )}
      </div>
    </div>
  );
};

export default SearchByDate; // Export component for use in other parts of the app (Reference: ES6 Modules - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
