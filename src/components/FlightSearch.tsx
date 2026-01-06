'use client';

import { useState } from 'react';
import { Search, Loader2, Plane } from 'lucide-react';
import { Flight } from '@/types/flight';
import FlightResults from './FlightResults';
import { motion } from 'framer-motion';

export default function FlightSearch() {
    const [query, setQuery] = useState('');
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setHasSearched(true);
        setFlights([]);

        try {
            const res = await fetch(`/api/flights?query=${encodeURIComponent(query)}`);
            const data = await res.json();
            setFlights(data);
        } catch (error) {
            console.error('Failed to fetch flights', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg mb-8"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl mb-4 text-blue-600 dark:text-blue-400">
                        <Plane className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight mb-3 text-zinc-900 dark:text-white">
                        Track Your Flight
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Real-time flight status and details at your fingertips.
                    </p>
                </div>

                <form onSubmit={handleSearch} className="relative group">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center bg-white dark:bg-zinc-800 rounded-full shadow-2xl p-2 border border-zinc-200 dark:border-zinc-700 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all">
                        <Search className="w-5 h-5 text-zinc-400 ml-3" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter flight number (e.g., AA123)"
                            className="flex-1 bg-transparent border-none focus:ring-0 text-zinc-900 dark:text-white placeholder:text-zinc-400 px-4 py-2 font-medium"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full px-6 py-2.5 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
                        </button>
                    </div>
                </form>
            </motion.div>

            <div className="w-full flex flex-col items-center min-h-[200px]">
                {loading ? (
                    <div className="mt-12 flex flex-col items-center text-zinc-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-2 text-blue-500" />
                        <p className="text-sm">Locating flight details...</p>
                    </div>
                ) : hasSearched && flights.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-12 text-zinc-400 text-center"
                    >
                        <p className="font-medium text-lg text-zinc-600 dark:text-zinc-300">No flights found</p>
                        <p className="text-sm">Check the flight number and try again.</p>
                    </motion.div>
                ) : (
                    <FlightResults flights={flights} />
                )}
            </div>
        </div>
    );
}
