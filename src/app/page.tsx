
import FlightSearch from "@/components/FlightSearch";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24 bg-[#fafafa] dark:bg-[#050505] selection:bg-blue-500/30">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light"></div>

      <div className="relative z-10 w-full">
        <FlightSearch />
      </div>

      <footer className="fixed bottom-6 text-xs text-zinc-400 font-medium">
        Flight Lookup System © 2025
      </footer>
    </main>
  );
}
