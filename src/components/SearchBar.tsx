import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextInput, Button } from "@mantine/core";

interface SearchBarProps {
  onSearch: (newValidPostcodes: string[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialPostcodes = params.get("postcodes");
    if (initialPostcodes) {
      setSearch(initialPostcodes);
    }
  }, []);

  const validatePostcodes = (search: string) => {
    const postcodes = search.split(",").map((pc) => pc.trim());
    const validPostcodes = postcodes.filter((pc) =>
      /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$/i.test(pc)
    );

    console.log("validPostcodes -----", validPostcodes);

    if (validPostcodes.length > 0) {
      onSearch(validPostcodes); // Trigger search API here
      navigate(`?postcodes=${validPostcodes.join(",")}`);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex items-center mb-4" style={{ alignItems: "center" }}>
      <TextInput
        value={search}
        onChange={(event) => handleSearch(event)}
        placeholder="Enter postcode(s) separated by commas"
        style={{ flex: 1, maxWidth: "400px", marginRight: "10px" }} // Styles added here
      />
      <Button onClick={() => validatePostcodes(search)}>Search</Button>
    </div>
  );
};

export default SearchBar;
