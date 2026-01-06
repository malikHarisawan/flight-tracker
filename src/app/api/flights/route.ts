
import { NextResponse } from 'next/server';

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string; // Code
  destination: string; // Code
  startLocation: string; // City Name
  endLocation: string; // City Name
  startTime: string; // ISO
  endTime: string; // ISO
  timeZoneStart: string;
  timeZoneEnd: string;
  duration: string;
}

const MOCK_FLIGHTS: Flight[] = [
  {
    id: '1',
    flightNumber: 'AA123',
    airline: 'American Airlines',
    origin: 'JFK',
    destination: 'LHR',
    startLocation: 'New York',
    endLocation: 'London',
    startTime: '2025-05-15T18:00:00',
    endTime: '2025-05-16T06:00:00',
    timeZoneStart: 'America/New_York (GMT-4)',
    timeZoneEnd: 'Europe/London (BST)',
    duration: '7h 00m',
  },
  {
    id: '2',
    flightNumber: 'BA189',
    airline: 'British Airways',
    origin: 'LHR',
    destination: 'JFK',
    startLocation: 'London',
    endLocation: 'New York',
    startTime: '2025-05-15T14:00:00',
    endTime: '2025-05-15T17:00:00',
    timeZoneStart: 'Europe/London (BST)',
    timeZoneEnd: 'America/New_York (GMT-4)',
    duration: '8h 00m',
  },
  {
    id: '3',
    flightNumber: 'DL456',
    airline: 'Delta Airlines',
    origin: 'LAX',
    destination: 'HND',
    startLocation: 'Los Angeles',
    endLocation: 'Tokyo',
    startTime: '2025-06-01T10:00:00',
    endTime: '2025-06-02T14:30:00',
    timeZoneStart: 'America/Los_Angeles (PDT)',
    timeZoneEnd: 'Asia/Tokyo (JST)',
    duration: '11h 30m',
  },
  {
    id: '4',
    flightNumber: 'UA88',
    airline: 'United Airlines',
    origin: 'SFO',
    destination: 'PEK',
    startLocation: 'San Francisco',
    endLocation: 'Beijing',
    startTime: '2025-06-10T11:00:00',
    endTime: '2025-06-11T15:20:00',
    timeZoneStart: 'America/Los_Angeles (PDT)',
    timeZoneEnd: 'Asia/Shanghai (CST)',
    duration: '12h 20m',
  },
   {
    id: '5',
    flightNumber: 'EK202',
    airline: 'Emirates',
    origin: 'JFK',
    destination: 'DXB',
    startLocation: 'New York',
    endLocation: 'Dubai',
    startTime: '2025-07-20T23:00:00',
    endTime: '2025-07-21T19:45:00',
    timeZoneStart: 'America/New_York (EDT)',
    timeZoneEnd: 'Asia/Dubai (GST)',
    duration: '12h 45m',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toUpperCase();

  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay

  if (!query) {
    return NextResponse.json(MOCK_FLIGHTS);
  }

  const filteredFlights = MOCK_FLIGHTS.filter((flight) =>
    flight.flightNumber.includes(query) ||
    flight.airline.toUpperCase().includes(query) ||
    flight.origin.includes(query) ||
    flight.destination.includes(query)
  );

  return NextResponse.json(filteredFlights);
}
