import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface HistoricSearchProps {
  validPostcodes: string[];
}

const HistoricSearch: React.FC<HistoricSearchProps> = ({ validPostcodes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [historicSearches, setHistoricSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem("historicSearch");
    if (storedSearches) {
      setHistoricSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("historicSearch", JSON.stringify(historicSearches));
  }, [historicSearches]);

  const viewCrimeData = (postcode: string) => {
    // Assume this function will set the state to display the crime data
    // for the postcode and trigger the API call to fetch it
    navigate(`?postcodes=${postcode}`);
  };

  const removeSearch = (postcode: string) => {
    const updatedSearches = historicSearches.filter((pc) => pc !== postcode);
    setHistoricSearches(updatedSearches);
    const params = new URLSearchParams(location.search);
    params.set("postcodes", updatedSearches.join(","));
    navigate(`?${params.toString()}`);
  };

  return (
    <div>
      <ul>
        {historicSearches.map((postcode, index) => (
          <li key={index}>
            <span onClick={() => viewCrimeData(postcode)}>{postcode}</span>
            <button onClick={() => removeSearch(postcode)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoricSearch;
