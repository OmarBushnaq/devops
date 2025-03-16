import React, { useState, useEffect } from "react"; //The purpose of usestate is add to a 'state' to a component and useEffect is is used to add side effects - https://codedamn.com/news/reactjs/usestate-and-useeffect-hooks
import './SearchByVendor.css';

function VendorSearch() {
  const titleText = "Search By Vendor";
  const [vendor, setVendor] = useState(""); //this outlines the state for the vendor compoenets and the state is that it is an input
  const [product, setProduct] = useState("");//this outlines the state for the product component and the state is that it is an input
  const [version, setVersion] = useState("");//this outlines the state for the version component and the state is that it is an input
  const [vendors, setVendors] = useState([]);//This takes the list of vendors fetched from the API and stores in a state
  const [products, setProducts] = useState([]);//This takes the list of products fetched and stores in a state
  const [versions, setVersions] = useState([]);//This takes the list of versions fetched and stores in a state
  const [vulnerabilities, setVulnerabilities] = useState([]);//This takes the list of vulnerabilties fetched and stores in a state
  const [error, setError] = useState("");//This stores any errors that happen

  useEffect(() => {//this outlines the effect for tje vendors and specifies that it will only run once
    fetch("http://localhost:5000/search-by-vendor/vendors")
      .then((res) => res.json())//this is used to parse the JSON response
      .then((data) => setVendors(data))//this will update the setVendors component defined above
      .catch(() => setError("Failed to load vendors."));
  }, []);

  useEffect(() => {//this does the same but for products
    if (vendor) {//the product will only become avaiable to select from if a vendor has been selected, since each vendor has their set of products, and not doing this would make the product selection a nightmare
      fetch(`http://localhost:5000/search-by-vendor/products?vendor=${vendor}`)
        .then((res) => res.json())//parses the JSON response
        .then((data) => setProducts(data))//updates the setProducts component above
        .catch(() => setError("Failed to load products."));
    }
  }, [vendor]);//This sees that if a different vendor was selected, the product is unselected and now has to select again for the different vendor

  useEffect(() => {
    if (product&&vendor) {//this defines that both product and vendor have to selected
      fetch(`http://localhost:5000/search-by-vendor/versions?vendor=${vendor}&product=${product}`)
        .then((res) => res.json())//parses the JSON response
        .then((data) => setVersions(data))//This does the same as the rest, it updates the setverions component 
        .catch(() => setError("Failed to load versions."));
    }
  }, [product]);//This sees that if a different product was selected, the version is unselected and now has to select again for the different vendor

  const handleSearch = async () => {
    setError(""); 
    try {
        const response = await fetch(
            `http://localhost:5000/search-by-vendor/search?vendor=${vendor}&product=${product}&version=${version}`
        );
        const data = await response.json();

        if (response.ok) {
            setVulnerabilities(data.vulnerabilities || []);
        } else {
            setError(data.error || "An error occurred while fetching vulnerabilities.");
        }
    } catch (error) {
        setError("Failed to connect to the server.");
    }
};
  
  return (
    <div>
      

      <h2>{titleText}</h2>

      <div className="input-container">
        <div className="input-field">
          <p className="input-label">Vendor</p>
          <select value={vendor} onChange={(e) => setVendor(e.target.value)}>
            <option value="">Select a vendor</option>
            {vendors.map((v) => (//this maps the array that has the vendors to the options in the dropdown menu
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="input-field">
          <p className="input-label">Product</p>
          <select value={product} onChange={(e) => setProduct(e.target.value)} disabled={!vendor}>
            <option value="">Select a product</option>
            {products.map((p) => (//this maps the array that has the products to the options in the dropdown menu
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="input-field">
          <p className="input-label">Version</p>
          <select value={version} onChange={(e) => setVersion(e.target.value)} disabled={!product}>
            <option value="">Select a version</option>
            {versions.map((v) => (//this maps the array that has the versions to the options in the dropdown menu
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>
      <br></br>

      <button onClick={handleSearch} disabled={!version}>Search</button> {/* This is for the Search button and specifies that the version must be selected. The version can only be selected if both the product and vendor were selected */}
      

      {error && <p style={{ color: "red" }}>{error}</p>}

      {vulnerabilities.length > 0 && (//this is used to avoid an empty list of vulnerabilities
        <div>
          <h3>Vulnerabilities Found:</h3>
          {vulnerabilities.map((vuln) => (//this maps the array that has the vulnernabilities to the one set above
            <div key={vuln.cve.id}> {/*This displays the cve id as a heading */} 
              <h4>{vuln.cve.id}</h4>
              <p>{vuln.cve.descriptions[0].value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorSearch;