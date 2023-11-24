export type ItineraryType = {
  duration: string;
  segments: SegmentType[];
};

export type SegmentType = {
  departure: {
    iataCode: string;
    at: string;
    terminal?: string;
  };
  arrival: {
    iataCode: string;
    at: string;
    terminal?: string;
  };
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
};

export type AirlineType = {
  name: string;
  logoLink: string;
  IATA: string;
  ICAO: string;
  Callsign: string;
  hubs: { name: string; link: string }[];
  website: string;
};

export type AirportType = {
  countryCode: string;
  iata: string;
  country: string;
  name: string;
  city: string;
};
