import React, { FC } from "react";

interface CrimeData {
  postcode: string;
  date: string;
  street: string;
  outcomeStatus: string | null;
  type: string;
}

interface DataViewProps {
  crimeData: CrimeData[];
}

const DataView: FC<DataViewProps> = ({ crimeData }) => {
  const crimeTypes = Array.from(new Set(crimeData.map((crime) => crime.type)));

  return (
    <div>
      <div>
        <h2>Navigate by Crime Type</h2>
        <ul>
          {crimeTypes.map((type, index) => (
            <li key={index}>
              <a href={`#${type}`}>{type}</a>
            </li>
          ))}
        </ul>
      </div>

      {crimeTypes.map((type, index) => (
        <div key={index} id={type}>
          <h3>{type}</h3>
          <table>
            <thead>
              <tr>
                <th>Postcode</th>
                <th>Date of Crime</th>
                <th>Approximate Street Name</th>
                <th>Outcome Status</th>
              </tr>
            </thead>
            <tbody>
              {crimeData
                .filter((crime) => crime.type === type)
                .map((crime, i) => (
                  <tr key={i}>
                    <td>{crime.postcode}</td>
                    <td>{crime.date}</td>
                    <td>{crime.street}</td>
                    <td>{crime.outcomeStatus || "On Going"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DataView;
