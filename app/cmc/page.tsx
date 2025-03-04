"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DexListings() {
  interface Dex {
    id: string;
    name: string;
    num_market_pairs: number;
    market_share: number;
    quote: {
      volume_24h: number;
      num_transactions_24h?: number;
    }[];
  }

  const [dexes, setDexes] = useState<Dex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDexes() {
      try {
        const res = await fetch("/api/dex-listings");
        const data = await res.json();
        setDexes(data.data || []);
      } catch (err: unknown) {
        setError("Failed to fetch DEX listings.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDexes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🚀 DEX Listings from CoinMarketCap
      </motion.h1>

      {loading && (
        <motion.p
          className="text-lg text-gray-400 animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Loading DEX data...
        </motion.p>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <motion.div
          className="w-full max-w-6xl overflow-x-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
          }}
        >
          <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Market Pairs</th>
                <th className="p-3">Market Share</th>
                <th className="p-3">24h Volume</th>
                <th className="p-3">Transactions</th>
              </tr>
            </thead>
            <tbody>
              {dexes.map((dex) => (
                <motion.tr
                  key={dex.id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="p-3">{dex.name}</td>
                  <td className="p-3">{dex.num_market_pairs}</td>
                  <td className="p-3">
                    {(dex.market_share * 100).toFixed(2)}%
                  </td>
                  <td className="p-3">
                    ${dex.quote[0]?.volume_24h.toLocaleString()}
                  </td>
                  <td className="p-3">
                    {dex.quote[0]?.num_transactions_24h?.toLocaleString() ||
                      "N/A"}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
