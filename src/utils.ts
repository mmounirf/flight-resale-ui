/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import airlines from './assets/airlines.json';
import airports from './assets/airports.json';
import { AirlineType, AirportType, SegmentType } from './types';

export function later(value: any, delay = 1000) {
  return new Promise((resolve) => setTimeout(resolve, delay, value));
}

export const airportsIndex: Record<string, AirportType> = airports.reduce(
  (acc, curr) => ({ ...acc, [curr.iata]: { ...curr, city: curr.city.split('*')[0] } }),
  {}
);

export function getAirlinesIndex(): Record<string, AirlineType> {
  const indexedAirlines: any = {};

  for (const airlineKey in airlines) {
    //@ts-ignore
    const airline = airlines[airlineKey];

    if (airline.IATA !== 'none') {
      indexedAirlines[airline.IATA] = {
        name: airline.name.split('\n')[0],
        logoLink: `https://images.kiwi.com/airlines/64x64/${airline.IATA}.png`,
        ICAO: airline.ICAO,
        Callsign: airline.Callsign,
        hubs: airline.hubs,
        website: airline.website,
      };
    }
  }

  return indexedAirlines;
}

export function formatSegmentsDates(segments: SegmentType[]): string {
  const departure = segments[0].departure;
  const arrival = segments[segments.length - 1].arrival;

  const departureString = dayjs(departure.at).format('ddd, D MMM · h:mm A');
  const arrivalString = dayjs(arrival.at).format('ddd, D MMM · h:mm A');

  return `${departureString} - ${arrivalString}`;
}

export function formatDuration(duration: string) {
  const matches = duration.match(/PT(\d+)H(\d+)M/);

  if (matches && matches[1] !== null && matches[2] !== null) {
    return `${matches[1]} hr ${matches[2]} min`;
  }

  return '';
}

export function formatSegments(segments: SegmentType[]) {
  const departure = segments[0].departure;
  const arrival = segments[segments.length - 1].arrival;

  const arrivalString = arrival.terminal ? `${arrival.iataCode} Terminal ${arrival.terminal}` : arrival.iataCode;
  const departureString = departure.terminal
    ? `${departure.iataCode} Terminal ${departure.terminal}`
    : departure.iataCode;
  return `${departureString} - ${arrivalString}`;
}

export function getStops(segments: SegmentType[]) {
  switch (segments.length - 1) {
    case 0:
      return 'Direct';
    case 1:
      return '1 Stop';
    default:
      return `${segments.length} Stops`;
  }
}

export function calculateTransitTimes(segments: SegmentType[]) {
  const transitTimes = [];

  for (let i = 0; i < segments.length - 1; i++) {
    let duration = '';
    const currentSegment = segments[i];
    const nextSegment = segments[i + 1];

    const diff = dayjs(nextSegment.departure.at).diff(dayjs(currentSegment.arrival.at), 'milliseconds');
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) {
      duration = `${minutes}m`;
    } else if (minutes === 0) {
      duration = `${hours}h`;
    } else {
      duration = `${hours}h ${minutes}m`;
    }

    transitTimes.push({
      at: currentSegment.arrival.iataCode,
      duration,
    });
  }

  return transitTimes;
}

export function formatDateTime(datetime: string) {
  return dayjs(datetime).format('ddd, D MMM · h:mm A');
}
