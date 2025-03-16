import React, { useState } from "react"; // Import React and useState for managing state - https://codedamn.com/news/reactjs/usestate-and-useeffect-hooks & https://react.dev/reference/react/useState

/**
 * SearchByCategory component allows users to search for vulnerabilities 
 * by selecting a predefined CWE category or entering a custom category.
 * https://developer.mozilla.org/en-US/docs/Web/
                                                * There are various things that were used from this website,
                                                * such as the API documentation, JavaScript referencing and many more
 */
function SearchByCategory() {
  // State variables for selected category, retrieved vulnerabilities, and error messages
  const [category, setCategory] = useState(""); // Stores the selected category
  const [vulnerabilities, setVulnerabilities] = useState([]); // Stores the API results
  const [error, setError] = useState(""); // Stores error messages

  // Predefined list of CWE categories available for selection
  const cweCategories = [
    "Cross-Site Scripting (XSS)",
    "SQL Injection",
    "Buffer Overflow",
    "Improper Authentication",
    "Information Exposure",
    "Cross-Site Request Forgery (CSRF)",
    "Improper Input Validation",
    "Path Traversal",
    "Use of Hard-coded Credentials",
    "Code Injection",
  ];

  /**
   * Function to handle the search request when the user clicks "Search".
   * Sends an API request to the backend and updates the UI with the results.
   */
  const handleSearch = async () => {
    // Check if the user has selected or entered a category
    if (!category) {
      setError("Please select or enter a category."); // Display error if no category is provided
      return;
    }

    // Clear previous errors and search results before making a new request
    setError("");
    setVulnerabilities([]);

    try {
      // Make an API request to fetch vulnerabilities for the selected category
      const response = await fetch(
        `https://securesentinels2025.pythonanywhere.com/search-by-category?category=${encodeURIComponent(category)}`
      );
      const data = await response.json(); // Convert response to JSON

      // Check if the response is successful
      if (response.ok) {
        // If vulnerabilities exist, update the state
        setVulnerabilities(data.length > 0 ? data : []);
      } else {
        setError("Failed to fetch vulnerabilities."); // Handle error responses
      }
    } catch (err) {
      setError("Failed to fetch data. Please check your connection."); // Handle network issues
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h2>Search Vulnerabilities by CWE Category</h2>
      <p>Select a CWE category or enter your own.</p>

      {/* Dropdown menu for selecting a predefined category */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select a category</option>
        {cweCategories.map((cwe, index) => (
          <option key={index} value={cwe}>{cwe}</option>
        ))}
        <option value="Other">Other (Enter Manually)</option>
      </select>

      {/* Input field appears only if "Other" is selected for manual category entry */}
      {category === "Other" && (
        <input
          type="text"
          placeholder="Enter custom category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      )}

      {/* Search button triggers handleSearch() */}
      <button onClick={handleSearch}>Search</button>

      {/* Display error messages if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {vulnerabilities.length > 0 ? (
          <ul>
            {vulnerabilities.map((vuln, index) => (
              <li key={index}>
                <strong>
                  <a href={`https://nvd.nist.gov/vuln/detail/${vuln.cve.id}`} target="_blank" rel="noopener noreferrer">
                    {vuln.cve.id}
                  </a>
                </strong>{" - "}
                {vuln.cve.descriptions[0]?.value || "No description available"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No vulnerabilities found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchByCategory;
