import React, { useState, useEffect } from "react"; // Import React and hooks, https://react.dev/
import axios from "axios"; // Import axios for making HTTP requests, https://axios-http.com/docs/intro

const SearchByCVSS = () => {
  const [severity, setSeverity] = useState("LOW"); // State for selected severity, default is "LOW"
  const [vulnerabilities, setVulnerabilities] = useState([]); // State for storing vulnerabilities
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(""); // State for error messages, https://www.geeksforgeeks.org/difference-between-usestate-and-useeffect-hook-in-reactjs/
  const [currentPage, setCurrentPage] = useState(1); // State for current page number
  const [totalResults, setTotalResults] = useState(0); // State for total number of results
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    if (severity) {
      fetchVulnerabilities(severity, currentPage); // Fetch vulnerabilities when severity or currentPage changes, https://react.dev/
    }
  }, [severity, currentPage]); // Dependency array for useEffect

  const fetchVulnerabilities = async (selectedSeverity, page) => { // https://www.freecodecamp.org/news/how-to-use-axios-with-react, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    setLoading(true); // Set loading to true
    setError(""); // Clear any previous errors

    const startIndex = (page - 1) * itemsPerPage; // Calculate the start index for pagination

    try { // https://www.w3schools.com/js/js_errors.asp
      const response = await axios.get( // https://circleci.com/blog/making-http-requests-with-axios/
        `https://securesentinels2025.pythonanywhere.com/search-by-cvss/?severity=${selectedSeverity}&startIndex=${startIndex}&resultsPerPage=${itemsPerPage}`
      ); // Make a GET request to the backend API
      setVulnerabilities(response.data.vulnerabilities); // Set the vulnerabilities state with the response data
      setTotalResults(response.data.totalResults); // Set the total number of results
    } catch (err) {
      setError("Failed to fetch data. Try again."); // Set error message if request fails
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update the current page number
  };

  return (
    <div> {/* Container for the component */}
      <h2>Search Vulnerabilities by CVSS Severity</h2> {/* Heading */}

      {/* Dropdown for selecting severity */}
      <label htmlFor="severity">Select Severity:</label> {/* Label for dropdown */}
      <select
        id="severity"
        value={severity}
        onChange={(e) => setSeverity(e.target.value)} // Update severity state on change
      >
        <option value="LOW">LOW</option> {/* Option for LOW severity */}
        <option value="MEDIUM">MEDIUM</option> {/* Option for MEDIUM severity */}
        <option value="HIGH">HIGH</option> {/* Option for HIGH severity */}
        <option value="CRITICAL">CRITICAL</option> {/* Option for CRITICAL severity */}
      </select>

      {loading && <p>Loading...</p>} {/* Display loading message if loading */}
      {error && <p className="error">{error}</p>} {/* Display error message if error */}

      {/* Bullet Point List for Vulnerabilities */}
      <ul>
        {vulnerabilities.length > 0 ? (
          vulnerabilities.map((vuln, index) => (
            <li key={index}> {/* List item for each vulnerability */}
              <strong>{vuln.cve.id}:</strong> {vuln.cve.descriptions[0].value} {/* Display CVE ID and description */}
            </li>
          ))
        ) : (
          !loading && <p>No vulnerabilities found.</p> )} {/* Display message if no vulnerabilities found */}
      </ul>

      <div className="pagination"> {/* Pagination container */}
        {Array.from({ length: Math.ceil(totalResults / itemsPerPage) }, (_, i) => (
          <button key={i} onClick={() => handlePageChange(i + 1)}> {/* Button for each page */}
            {i + 1} {/* Display page number */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchByCVSS; // Export the component
