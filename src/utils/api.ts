import { CrimeType } from "./../types/Crime.types";
import { PostcodeType } from "./../types/Postcode.types";
import axios from "axios";

export const fetchPostcodeData = async (
  postcode: string
): Promise<PostcodeType> => {
  const url = `http://api.getthedata.com/postcode/${postcode}`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchCrimeData = async (
  latitude: string,
  longitude: string,
  date?: string
): Promise<CrimeType> => {
  const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}${
    date ? `&date=${date}` : ""
  }`;
  const response = await axios.get(url);
  return response.data;
};
