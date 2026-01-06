export interface Flight {
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
