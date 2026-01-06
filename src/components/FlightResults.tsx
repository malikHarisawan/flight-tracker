'use client';

import { Flight } from '@/types/flight';
import { motion } from 'framer-motion';
import { Plane, Clock, MapPin, Globe } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface FlightResultsProps {
    flights: Flight[];
}

export default function FlightResults({ flights }: FlightResultsProps) {
    if (flights.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-2xl mt-8 space-y-4">
            {flights.map((flight, index) => (
                <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-shadow"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                                    {flight.airline}
                                </span>
                                <span className="text-zinc-500 font-mono text-sm">{flight.flightNumber}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-zinc-500">Duration</div>
                            <div className="font-semibold">{flight.duration}</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center relative">
                        {/* Origin */}
                        <div className="text-left w-1/3">
                            <div className="text-3xl font-bold mb-1">{flight.origin}</div>
                            <div className="text-zinc-500 text-sm mb-2">{flight.startLocation}</div>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <Clock className="w-4 h-4 text-blue-500" />
                                {format(parseISO(flight.startTime), 'HH:mm')}
                            </div>
                            <div className="text-xs text-zinc-400 mt-1">{flight.timeZoneStart}</div>
                        </div>

                        {/* Flight Path Graphic */}
                        <div className="flex-1 px-4 flex flex-col items-center justify-center relative">
                            <div className="w-full h-[2px] bg-zinc-200 dark:bg-zinc-700 absolute top-1/2 -translate-y-1/2"></div>
                            <div className="bg-white dark:bg-zinc-900 z-10 p-2 rounded-full border border-zinc-200 dark:border-zinc-700">
                                <Plane className="w-5 h-5 text-blue-500 rotate-90" />
                            </div>
                        </div>

                        {/* Destination */}
                        <div className="text-right w-1/3 flex flex-col items-end">
                            <div className="text-3xl font-bold mb-1">{flight.destination}</div>
                            <div className="text-zinc-500 text-sm mb-2">{flight.endLocation}</div>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                {format(parseISO(flight.endTime), 'HH:mm')}
                                <Clock className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="text-xs text-zinc-400 mt-1">{flight.timeZoneEnd}</div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between text-sm text-zinc-500">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{flight.startLocation} to {flight.endLocation}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            <span>International</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
