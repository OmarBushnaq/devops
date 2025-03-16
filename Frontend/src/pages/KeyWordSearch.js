import React, { useState } from "react"; // Import React and useState hook
import axios from "axios"; // Import Axios for making HTTP requests
import './KeyWordSearch.css'

//Reference: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs

function KeyWordSearch() 
{


  const [keyword, setKeyword] = useState(""); // State to store the keyword input
  const [results, setResults] = useState(null); // State to store the search results

  //Function for search button
  const fetchKeyWordSearchResults = async () => 
  {
    try 
    {
      const response = await axios.get(`https://securesentinels2025.pythonanywhere.com/search-by-keyword`,{ params: { keyword },});
      setResults(response.data); // Set the search results in state
    } 
    catch (error) 
    {
      console.error("Error fetching data:", error); // Log any errors
    }
  };

  
  const handleInputChange = (e) => { // Handle input change and update keyword state
    setKeyword(e.target.value);
  };

  
  const handleKeyDown = (e) => { // Handle keydown event and trigger search on Enter key press
    if (e.key === 'Enter') {
      fetchKeyWordSearchResults();
    }
  };
  
  
  const renderDictionary = (dict) => { /* Render the dictionaries in returned list*/
    return (
      <table className="dictionary-table"> {/*dictinory-table CSS class for styling */}
        <thead>
          <tr>
            <th className= 'thead'>Attribute</th> {/*thead CSS class for styling */}
            <th className= 'thead'>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(dict).map(([key, value]) => ( /* mapping values from returned dictionary into variables */
            <tr key={key}>
              <td><strong>{key}</strong></td>
              <td>
                {typeof value === 'string' && value.match(/^https/) ? ( /*Checking if the returned value is a url */
                  <a href={value} target="_blank" rel="noopener noreferrer">{value}</a> /* display as hyperlink*/
                ) : (
                  value /*display as normal string */ 
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return(
    <div className="search-by-key-word"> {/* Container for the main component */}
      <h2>Search Vulnerabilities with a Key Word</h2> {/* Heading */}
      <p id ="note">*Note: Search is done on published CVEs within last 100 days</p>
      <input type="text" value={keyword} onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Enter keyword" />
      <button onClick={fetchKeyWordSearchResults}>Search</button>
      <br></br>
      <br></br>
      <br></br>
      {results && (
        <div className="key-search-results"> {/* Container for the result component */}
          {typeof results === "string" ? (
            <p>{results}</p>
          ) : (
            Array.isArray(results) && results.length > 0 ? ( /* If the returned data is an array and not empty */ 
              results.map((dict, index) => (
                <div key={index}>   
                  {renderDictionary(dict)} {/* Render each dictionary in the results */}
                </div>
              ))
            ) : (
              <p>No results found.</p> /* Display message if no results are found */
            )
          )}
        </div>
      )}

    
    
    </div> //Main div
        );
}



export default KeyWordSearch; // Export the keyWordSearch function
