import React, { useState, useEffect } from "react";
import { Container, Button } from "@mantine/core";
import SearchBar from "../components/SearchBar";
import HistoricSearch from "../components/HistoricSearch";
import DataView from "../routes/DataView";
import MapView from "../routes/MapView";
import { fetchPostcodeData, fetchCrimeData } from "../utils/api";

const Home: React.FC = () => {
  const [crimeData, setCrimeData] = useState<any[]>([]); // Replace `CrimeData` with your actual type
  const [validPostcodes, setValidPostcodes] = useState<string[]>([]);
  const [showDataView, setShowDataView] = useState<boolean>(true); // New state to toggle between DataView and MapView

  const handleSearch = async (newValidPostcodes: string[]) => {
    setValidPostcodes(newValidPostcodes); // Update the valid postcodes state

    try {
      const promises = newValidPostcodes.map(async (postcode) => {
        const postcodeData = await fetchPostcodeData(postcode);
        const { latitude, longitude } = postcodeData.data;
        const crimeData = await fetchCrimeData(latitude, longitude);
        return { postcode, postcodeData, crimeData };
      });

      const results = await Promise.all(promises);

      const mergedCrimeData = results.flatMap((result) => result.crimeData);
      console.log("mergedCrimeData -----", mergedCrimeData);

      setCrimeData(mergedCrimeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container>
      <h1 className="mb-4 text-center">Crime Data by Postcode</h1>
      <SearchBar onSearch={handleSearch} />
      <HistoricSearch validPostcodes={validPostcodes} />
      <Button onClick={() => setShowDataView(!showDataView)}>
        Toggle View
      </Button>
      {showDataView ? (
        <DataView crimeData={crimeData} />
      ) : (
        <MapView crimeData={crimeData} validPostcodes={validPostcodes} />
      )}
    </Container>
  );
};

export default Home;
