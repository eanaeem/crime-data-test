export type CrimeType = {
  category: string;
  location_type: string;
  location: {
    latitude: string;
    street: {
      id: number;
      name: string;
    };
    longitude: string;
  };
  context: string;
  outcome_status: null;
  persistent_id: string;
  id: number;
  location_subtype: string;
  month: string;
};
