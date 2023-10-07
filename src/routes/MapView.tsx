import React, { FC, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Rectangle,
} from "react-leaflet";
import { LatLngBoundsExpression } from "leaflet";

interface CrimeData {
  postcode: string;
  date: string;
  location: { latitude: number; longitude: number };
  outcomeStatus: string | null;
  type: string;
}

interface MapViewProps {
  crimeData: CrimeData[];
  validPostcodes: string[];
}

// This function is a placeholder. You should replace it with your actual function.
const fetchBoundsForPostcode = (
  postcode: string
): Promise<LatLngBoundsExpression> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Replace this with actual logic to fetch or calculate bounds
      resolve([
        [50.505, -29.09],
        [52.505, 29.09],
      ]);
    }, 1000);
  });
};

const MapView: FC<MapViewProps> = ({ crimeData, validPostcodes }) => {
  const firstPostcode = validPostcodes[0];
  const firstPostcodeData = crimeData.find(
    (data) => data.postcode === firstPostcode
  );
  const [bounds, setBounds] = useState<LatLngBoundsExpression | null>(null);

  useEffect(() => {
    // Async function to fetch bounds
    const getBounds = async () => {
      const fetchedBounds = await fetchBoundsForPostcode(firstPostcode);
      setBounds(fetchedBounds);
    };

    if (firstPostcode) {
      getBounds();
    }
  }, [firstPostcode]);

  return (
    <MapContainer
      center={[
        firstPostcodeData?.location?.latitude ?? 0,
        firstPostcodeData?.location?.longitude ?? 0,
      ]}
      zoom={13}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {crimeData.map((crime, index) => (
        <Marker
          key={index}
          position={[crime.location.latitude, crime.location.longitude]}
        >
          <Popup>
            Postcode: {crime.postcode} <br />
            Category: {crime.type} <br />
            Date: {crime.date} <br />
            Status: {crime.outcomeStatus || "On Going"}
          </Popup>
        </Marker>
      ))}
      {bounds && <Rectangle bounds={bounds} />}
    </MapContainer>
  );
};

export default MapView;
